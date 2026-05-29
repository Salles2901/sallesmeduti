// src/components/GeneralCalculators.tsx
import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  ChevronRight, 
  Scale, 
  Flame, 
  Activity, 
  Droplet, 
  Percent, 
  Check, 
  Info,
  Clock,
  Save
} from 'lucide-react';
import { CalculationHistoryItem } from '../types';

interface GeneralCalculatorsProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  activeCalc?: CalculatorType;
  setActiveCalc?: (calc: CalculatorType) => void;
}

type CalculatorType = 'tfg' | 'imc_bsa' | 'parkland' | 'qtc' | 'bicarbonate' | 'maintenance_fluid' | 'sodium_correction' | 'vent_pbw' | 'intubacao_sri' | 'eletrolitos_repo' | 'insulina_ev' | 'heparina_infusion' | 'transfusao' | 'furosemide';

export default function GeneralCalculators({ 
  onAddHistory,
  activeCalc: propActiveCalc,
  setActiveCalc: propSetActiveCalc
}: GeneralCalculatorsProps) {
  const [localActiveCalc, setLocalActiveCalc] = useState<CalculatorType>('tfg');

  const activeCalc = propActiveCalc ?? localActiveCalc;
  const setActiveCalc = propSetActiveCalc ?? setLocalActiveCalc;
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // States for Sodium Correction (Adrogue-Madias)
  const [sodiumActual, setSodiumActual] = useState<string>('125');
  const [sodiumTarget, setSodiumTarget] = useState<string>('135');
  const [sodiumWeight, setSodiumWeight] = useState<number>(70);
  const [sodiumGender, setSodiumGender] = useState<'male' | 'female'>('male');
  const [sodiumAgeGroup, setSodiumAgeGroup] = useState<'adult' | 'elderly'>('adult');
  const [sodiumInfusate, setSodiumInfusate] = useState<'nacl3' | 'nacl09' | 'sg5' | 'water'>('nacl3');

  // States for Ventilator PBW Setups
  const [ventGender, setVentGender] = useState<'male' | 'female'>('male');
  const [ventHeight, setVentHeight] = useState<number>(170);
  const [ventVolFactor, setVentVolFactor] = useState<number>(6);
  const [ventMode, setVentMode] = useState<'vcv' | 'pcv'>('vcv');

  // States for SRI (Intubacao)
  const [sriWeight, setSriWeight] = useState<number>(70);
  const [sriScenario, setSriScenario] = useState<'choque' | 'asma' | 'status' | 'tce' | 'cardio' | 'idoso' | 'padrão'>('padrão');
  const [sriSedativeOverride, setSriSedativeOverride] = useState<string>('etomidato'); // 'etomidato', 'etomidato_idoso', 'cetamina', 'propofol', 'midazolam'
  const [sriBlockerOverride, setSriBlockerOverride] = useState<string>('succinilcolina'); // 'succinilcolina', 'rocuronio'
  const [sriFentanilDose, setSriFentanilDose] = useState<number>(0); // 0, 2 mcg/kg (matches standard 2 mcg/kg in manual)
  const [sriUseLidocaina, setSriUseLidocaina] = useState<boolean>(false);

  // States for Electrolytes Reposition (K / Mg)
  const [electrolyteType, setElectrolyteType] = useState<'K' | 'Mg'>('K');
  const [kValue, setKValue] = useState<string>('2.9');
  const [mgValue, setMgValue] = useState<string>('1.3');
  const [electrolyteWeight, setElectrolyteWeight] = useState<number>(70);
  const [kAmpouleConc, setKAmpouleConc] = useState<string>('19.1%'); // '19.1%', '10%'
  const [mgAmpouleConc, setMgAmpouleConc] = useState<string>('10%'); // '10%', '50%'

  // States for Insulina EV
  const [hgtValue, setHgtValue] = useState<string>('240');
  const [insulinProtocol, setInsulinProtocol] = useState<'uti' | 'cad'>('uti'); // 'uti' or 'cad' (ketoacidosis)
  const [insulinDilution, setInsulinDilution] = useState<string>('100ui_100ml'); // '100ui_100ml', '100ui_250ml'

  // States for Heparina Infusion
  const [heparinWeight, setHeparinWeight] = useState<number>(70);
  const [heparinIndication, setHeparinIndication] = useState<'tep_tvp' | 'sca'>('tep_tvp');
  const [heparinClCr, setHeparinClCr] = useState<number>(80);
  const [heparinPtta, setHeparinPtta] = useState<number>(40);
  const [heparinType, setHeparinType] = useState<'hnf' | 'clexane'>('hnf'); // 'hnf' vs 'clexane' (enoxaparina)

  // States for Transfusoes
  const [transfusionWeight, setTransfusionWeight] = useState<number>(70);
  const [transfusionHb, setTransfusionHb] = useState<string>('6.8');
  const [transfusionPlt, setTransfusionPlt] = useState<string>('15000');
  const [transfusionFib, setTransfusionFib] = useState<string>('120');
  const [transfusionInr, setTransfusionInr] = useState<string>('1.8');
  const [transfusionCardio, setTransfusionCardio] = useState<boolean>(false);
  const [transfusionBleeding, setTransfusionBleeding] = useState<boolean>(false);

  // States for Furosemide EV
  const [furosemidePriorUse, setFurosemidePriorUse] = useState<boolean>(false);
  const [furosemideVoDose, setFurosemideVoDose] = useState<number>(40);
  const [furosemideCongestion, setFurosemideCongestion] = useState<'moderate' | 'severe'>('moderate');
  const [furosemideWeight, setFurosemideWeight] = useState<number>(70);

  // States for Maintenance fluid
  const [fluidRestriction, setFluidRestriction] = useState<'none' | 'restricted'>('none');
  const [fluidIncludeK, setFluidIncludeK] = useState<boolean>(true);

  // States for TFG Calculator
  const [tfgAge, setTfgAge] = useState<number>(45);
  const [tfgGender, setTfgGender] = useState<'male' | 'female'>('male');
  const [tfgCreatinine, setTfgCreatinine] = useState<string>('1.2');
  const [tfgWeight, setTfgWeight] = useState<number>(75);

  // States for IMC / BSA Calculator
  const [imcWeight, setImcWeight] = useState<number>(72);
  const [imcHeight, setImcHeight] = useState<number>(175);

  // States for Parkland Calculator
  const [parklandWeight, setParklandWeight] = useState<number>(80);
  const [parklandPercent, setParklandPercent] = useState<number>(30); // Rule of Nines %

  // States for QTc Calculator
  const [qtcQtMs, setQtcQtMs] = useState<number>(380);
  const [qtcHr, setQtcHr] = useState<number>(75);

  // States for Bicarbonate Calculator
  const [bicWeight, setBicWeight] = useState<number>(70);
  const [bicGender, setBicGender] = useState<'male' | 'female'>('male');
  const [bicActual, setBicActual] = useState<string>('15');
  const [bicTarget, setBicTarget] = useState<string>('24');

  // Trigger temporary save indicator
  const triggerSaveNotification = (calcName: string) => {
    setSaveSuccess(calcName);
    setTimeout(() => setSaveSuccess(null), 2500);
  };

  // --- SRI (Intubação em Sequência Rápida) ---
  const calculateSri = () => {
    const weight = sriWeight || 70;
    const scenario = sriScenario;

    // Default sedative & blocker based on scenario guidelines (Image 1)
    let defaultSedType = 'etomidato';
    let defaultBlockType = 'succinilcolina';

    if (scenario === 'choque') {
      defaultSedType = 'etomidato';
      defaultBlockType = 'succinilcolina'; // Guideline explicit: "Usar Etomidato + Succinilcolina"
    } else if (scenario === 'asma') {
      defaultSedType = 'cetamina';
      defaultBlockType = 'succinilcolina'; // Guideline explicit: "Prefira Cetamina ou Propofol + Succinilcolina"
    } else if (scenario === 'status') {
      defaultSedType = 'propofol';
      defaultBlockType = 'succinilcolina'; // Guideline explicit: "Prefira Propofol ou Midazolam + Succinilcolina"
    } else if (scenario === 'tce') {
      defaultSedType = 'etomidato';
      defaultBlockType = 'rocuronio';
    } else if (scenario === 'cardio') {
      defaultSedType = 'etomidato';
      defaultBlockType = 'rocuronio';
    } else if (scenario === 'idoso') {
      defaultSedType = 'etomidato_idoso';
      defaultBlockType = 'succinilcolina';
    }

    const sedType = sriSedativeOverride;
    const blockType = sriBlockerOverride;

    // Calculates sedative parameters based on "Tabela Prática" (Image 2)
    let sedative = 'Etomidato';
    let sedativeConc = '2 mg/mL';
    let sedativeDoseMg = weight * 0.3; // 0.3 mg/kg
    let sedativeVolMl = sedativeDoseMg / 2;
    let sedativeDoseRate = '0.3 mg/kg';
    let sedativeDesc = 'ETOMIDATO (2 mg/mL - 0.3 mg/kg): Sedativo de escolha pela excelente estabilidade hemodinâmica (não causa depressão miocárdica ou dilação sistêmica importante).';

    if (sedType === 'etomidato') {
      sedative = 'Etomidato';
      sedativeConc = '2 mg/mL';
      sedativeDoseMg = weight * 0.3;
      sedativeVolMl = sedativeDoseMg / 2;
      sedativeDoseRate = '0.3 mg/kg';
      sedativeDesc = 'ETOMIDATO (2 mg/mL - 0.3 mg/kg): Excelente estabilidade cardiovascular (droga padrão-ouro de estabilidade no doente crítico ou de plantão).';
    } else if (sedType === 'etomidato_idoso') {
      sedative = 'Etomidato (Ajuste Idoso)';
      sedativeConc = '2 mg/mL';
      sedativeDoseMg = weight * 0.15; // 50% adjustment for geriatric profile
      sedativeVolMl = sedativeDoseMg / 2;
      sedativeDoseRate = '0.15 mg/kg';
      sedativeDesc = 'ETOMIDATO IDOSO (2 mg/mL - 0.15 mg/kg): Dose reduzida em 50% para idosos frágeis, sarcopênicos ou doentes criticamente limítrofes para evitar choque ou sedação demasiadamente lenta.';
    } else if (sedType === 'cetamina') {
      sedative = 'Cetamina (Ketamina)';
      sedativeConc = '50 mg/mL';
      sedativeDoseMg = weight * 1.5; // 1.5 mg/kg
      sedativeVolMl = sedativeDoseMg / 50;
      sedativeDoseRate = '1.5 mg/kg';
      sedativeDesc = 'CETAMINA (50 mg/mL - 1.5 mg/kg): Indutor dissociativo simpaticomimético indireto. Provoca broncodilatação mecânica vigorosa (indicado na asma/DPOC) e mantém pressão arterial sistêmica.';
    } else if (sedType === 'propofol') {
      sedative = 'Propofol';
      sedativeConc = '10 mg/mL';
      sedativeDoseMg = weight * 1.5; // 1.5 mg/kg
      sedativeVolMl = sedativeDoseMg / 10;
      sedativeDoseRate = '1.5 mg/kg';
      sedativeDesc = 'PROPOFOL (10 mg/mL - 1.5 mg/kg): Hipnótico ultrarrápido com forte ação anticonvulsivante (indicado no Status) e redutor de PIC. Contraindicado se hipotensão severa/choque.';
    } else if (sedType === 'midazolam') {
      sedative = 'Midazolam';
      sedativeConc = '5 mg/mL';
      sedativeDoseMg = weight * 0.2; // 0.2 mg/kg
      sedativeVolMl = sedativeDoseMg / 5;
      sedativeDoseRate = '0.2 mg/kg';
      sedativeDesc = 'MIDAZOLAM (5 mg/mL - 0.2 mg/kg): Importante benzodiazepínico com latência de 1-2 min. Ação prolongada. Causa vasodilatação e hipotensão residual se houver hipovolemia.';
    }

    // Calculates blocker parameters based on "Tabela Prática" (Image 2)
    let blocker = 'Succinilcolina';
    let blockerConc = '10 mg/mL';
    let blockerDoseMg = weight * 1.5; // 1.5 mg/kg
    let blockerVolMl = blockerDoseMg / 10;
    let blockerDoseRate = '1.5 mg/kg';
    let blockerDesc = 'SUCCINILCOLINA (10 mg/mL - 1.5 mg/kg): Bloqueador neuromuscular despolarizante de latência ultraveloz (45s) e ação fugaz (5-10 min). Evitar se K+ > 5.5, grandes queimados > 24h.';

    if (blockType === 'succinilcolina') {
      blocker = 'Succinilcolina';
      blockerConc = '10 mg/mL';
      blockerDoseMg = weight * 1.5;
      blockerVolMl = blockerDoseMg / 10;
      blockerDoseRate = '1.5 mg/kg';
      blockerDesc = 'SUCCINILCOLINA (10 mg/mL - 1.5 mg/kg): Despolarizante de ação ultraveloz (45s). Evitar se potássio elevado (K+ > 5.5), queimaduras graves / traumas corporais há mais de 24h ou hipertermia maligna.';
    } else if (blockType === 'rocuronio') {
      blocker = 'Rocurônio';
      blockerConc = '10 mg/mL';
      blockerDoseMg = weight * 1.2; // 1.2 mg/kg
      blockerVolMl = blockerDoseMg / 10;
      blockerDoseRate = '1.2 mg/kg';
      blockerDesc = 'ROCURÔNIO (10 mg/mL - 1.2 mg/kg): Bloqueador não-despolarizante de longa duração (45-60 min). Indicado se contraindicação à succinilcolina.';
    }

    // Pre-medications calculations (Image 2)
    const fentanilContraindicated = (scenario === 'choque');
    const fentanilDoseMcs = fentanilContraindicated ? 0 : Math.round(weight * sriFentanilDose);
    const fentanilVolMl = fentanilDoseMcs / 50; // 50 mcg/mL

    const lidocainaDoseMg = sriUseLidocaina ? Math.round(weight * 1.5) : 0; // 1.5 mg/kg
    const lidocainaVolMl = lidocainaDoseMg / 20; // 20 mg/mL (2% concentration)

    // Adrenaline Push-Dose recommendation for 'choque' (Image 1)
    const adrenalinePushPrompt = scenario === 'choque';

    return {
      sedative,
      sedativeConc,
      sedativeMg: Math.round(sedativeDoseMg),
      sedativeMl: sedativeVolMl.toFixed(1),
      sedativeDoseRate,
      sedativeDesc,
      blocker,
      blockerConc,
      blockerMg: Math.round(blockerDoseMg),
      blockerMl: blockerVolMl.toFixed(1),
      blockerDoseRate,
      blockerDesc,
      fentanilDoseMcs,
      fentanilVolMl: fentanilVolMl.toFixed(1),
      fentanilContraindicated,
      lidocainaDoseMg,
      lidocainaVolMl: lidocainaVolMl.toFixed(1),
      adrenalinePushPrompt,
    };
  };

  const saveSriToHistory = () => {
    const res = calculateSri();
    const isFentanilActive = res.fentanilDoseMcs > 0;
    const isLidocainaActive = res.lidocainaDoseMg > 0;
    
    onAddHistory({
      title: 'Sequência Rápida de Intubação (SRI)',
      description: `Paciente: ${sriWeight} kg | Protocolo: ${sriScenario.toUpperCase()}`,
      inputs: {
        'Peso do Paciente': `${sriWeight} kg`,
        'Cenário Fisiológico': sriScenario.toUpperCase(),
        'Opção Manual Sedativo': sriSedativeOverride.toUpperCase(),
        'Opção Manual Bloqueador': sriBlockerOverride.toUpperCase(),
        'Fentanil Adjunto': isFentanilActive ? `${sriFentanilDose} mcg/kg` : 'Não utilizado',
        'Lidocaína Adjunta': isLidocainaActive ? '1.5 mg/kg' : 'Não utilizada'
      },
      outputs: {
        'Sedação (Indução)': `${res.sedative} - ${res.sedativeMg} mg (${res.sedativeMl} mL)`,
        'Bloqueio muscular': `${res.blocker} - ${res.blockerMg} mg (${res.blockerMl} mL)`,
        'Pré-Medicações': [
          isFentanilActive ? `Fentanil: ${res.fentanilDoseMcs} mcg (${res.fentanilVolMl} mL)` : null,
          isLidocainaActive ? `Lidocaína: ${res.lidocainaDoseMg} mg (${res.lidocainaVolMl} mL)` : null
        ].filter(Boolean).join(' | ') || 'Sem adjuvantes'
      }
    });
    triggerSaveNotification('intubacao_sri');
  };

  // --- Reposição de Eletrólitos (Potássio / Magnésio) ---
  const calculateElectrolytes = () => {
    const weight = electrolyteWeight || 70;
    
    if (electrolyteType === 'K') {
      const kVal = parseFloat(kValue) || 3.0;
      let severityLabel = 'Hipocalemia Grave';
      let route = 'Acesso Venoso Central (Preferencia)';
      let maxSpeed = '20 mEq/h';
      let action = '';
      let composition = '';
      let infusionTime = '4 horas';
      let rateBic = '125 mL/h';
      let oralAlternative = 'KCl Repósito VO: Xarope de KCl 6% (15 mL de 8/8h ou de 6/6h). Cada 15 mL contém 12 mEq de Potássio (900 mg).';

      const isK19 = kAmpouleConc === '19.1%';
      const multiplier = isK19 ? 2.5 : 1.34; // mEq/mL

      if (kVal >= 3.5) {
        severityLabel = 'Potássio dentro da Normalidade / Faixa Terapêutica';
        route = 'Qualquer via';
        maxSpeed = 'N/A';
        action = 'Manter monitoramento de eletrólitos habitual. Reposição imediata não indicada.';
        composition = 'N/A';
        infusionTime = 'N/A';
        rateBic = 'N/A';
      } else if (kVal >= 3.0) {
        severityLabel = 'Hipocalemia Leve a Moderada';
        route = 'Via Periférica (Excelente aceitação) ou VO';
        maxSpeed = '10 mEq/h';
        action = 'Pode ser corrigido por via oral ou por punção venosa periférica padrão, evitando velocidades de infusão altas.';
        
        // K+ mild repositions around 37.5 mEq
        const kNeeded = 37.5;
        const volAmp = Math.round(kNeeded / multiplier);
        const sfVol = 500 - volAmp;
        composition = `Solução Fisiológica (SF 0,9%) ${sfVol} mL + Cloreto de Potássio ${kAmpouleConc} (KCl) ${volAmp} mL (Volume total: 500 mL) [Equivale a 37.5 mEq K+]`;
        infusionTime = '4 horas';
        rateBic = '125 mL/h';
      } else {
        severityLabel = 'Hipocalemia Grave (Crítica)';
        route = 'Acesso Venoso Central Obrigatório (Alto risco de flebite e dor extrema em periférica)';
        maxSpeed = '25 mEq/h';
        action = 'Alto risco de arritmias malignas graves (torsades de pointes, FV) e paralisia bulbar muscular. Realizar reposição rápida calibrada em acesso central monitorado.';
        
        // K+ severe repositions around 100 mEq K+
        const kNeeded = 100;
        const volAmp = Math.round(kNeeded / multiplier);
        const sfVol = 500 - volAmp;
        composition = `Solução Fisiológica (SF 0,9%) ${sfVol} mL + Cloreto de Potássio ${kAmpouleConc} (KCl) ${volAmp} mL (Volume total: 500 mL) [Contém 100 mEq K+]`;
        infusionTime = '4 a 5 horas';
        rateBic = `${Math.round(500 / 4)} mL/h (velocidade calibrada para correr em ~4 horas)`;
      }

      return {
        severityLabel,
        route,
        maxSpeed,
        action,
        composition,
        infusionTime,
        rateBic,
        oralAlternative,
        warnings: '⚠️ PERIGO DE PARADA EM SÍSTOLE: NUNCA administrar KCl em bólus direto! Toda reposição de potássio deve ser amplamente diluída e realizada obrigatoriamente através de bomba de infusão contínua em ritmo seguro.'
      };
    } else {
      const mgVal = parseFloat(mgValue) || 1.3;
      let severityLabel = 'Hipomagnesemia Grave';
      let route = 'Via Periférica ou Central';
      let maxSpeed = '4g de MgSO4 em 30 min';
      let action = '';
      let composition = '';
      let infusionTime = '60 minutos';
      let rateBic = '120 mL/h';

      const isMg10 = mgAmpouleConc === '10%';
      const mgMultiplier = isMg10 ? 0.1 : 0.5; // g/mL

      if (mgVal >= 1.6) {
        severityLabel = 'Magnésio dentro dos Limites Normais';
        route = 'Qualquer via';
        maxSpeed = 'N/A';
        action = 'Manter vigilância periódica. Reposição ativa não é indicada no momento.';
        composition = 'N/A';
        infusionTime = 'N/A';
        rateBic = 'N/A';
      } else if (mgVal >= 1.0) {
        severityLabel = 'Hipomagnesemia Leve a Moderada';
        route = 'Via Venosa Periférica';
        maxSpeed = '2g de MgSO4 por hora';
        action = 'Corrigir para evitar espasmos secundários, tetania reativa e facilitar a absorção celular concomitante do Potássio.';
        
        // 2g of magnesium
        const mgNeeded = 2; // grams
        const volAmp = Math.round(mgNeeded / mgMultiplier);
        composition = `Solução Fisiológica (SF 0,9%) 100 mL + Sulfato de Magnésio ${mgAmpouleConc} (MgSO4) ${volAmp} mL (Diluição equivale a 2 gramas de MgSO4 ativo)`;
        infusionTime = '1 hora (60 minutos)';
        rateBic = `${100 + volAmp} mL/h`;
      } else {
        severityLabel = 'Hipomagnesemia Grave (Crítica)';
        route = 'Via Venosa (Periférica ou Central)';
        maxSpeed = '4g de MgSO4 em 30-60 min';
        action = 'Forte risco de arritmias cardíacas severas e prolongamento do intervalo QT (risco de Torsades). Correção rápida coordenada de ataque com sulfato.';
        
        // 4g of magnesium
        const mgNeeded = 4; // grams
        const volAmp = Math.round(mgNeeded / mgMultiplier);
        composition = `Solução Fisiológica (SF 0,9%) 100 mL + Sulfato de Magnésio ${mgAmpouleConc} (MgSO4) ${volAmp} mL (Diluição equivale a 4 gramas de MgSO4 ativo)`;
        infusionTime = '30 a 60 minutos';
        rateBic = `${Math.round((100 + volAmp) * 2)} mL/h para infundir em 30 minutos, ou ${100 + volAmp} mL/h para 1 hora`;
      }

      return {
        severityLabel,
        route,
        maxSpeed,
        action,
        composition,
        infusionTime,
        rateBic,
        oralAlternative: 'MgSO4 Repósito Oral: Monohidrato de Magnésio (PoliMag) ou pidolato de magnésio por via oral se assintomático leve.',
        warnings: '⚠️ SINAIS DE TOXICIDADE: Monitore com frequência clínicas o reflexo patelar profundo, a frequência respiratória e a pressão arterial. Se houver hiporreflexia ou rebaixamento, suspenda imediatamente.'
      };
    }
  };

  const saveElectrolytesToHistory = () => {
    const res = calculateElectrolytes();
    onAddHistory({
      title: `Reposição de ${electrolyteType === 'K' ? 'Potássio (KCl)' : 'Magnésio (MgSO4)'}`,
      description: `Valor Sérico: ${electrolyteType === 'K' ? kValue : mgValue} mEq/L | Concentração: ${electrolyteType === 'K' ? kAmpouleConc : mgAmpouleConc}`,
      inputs: {
        'Elemento': electrolyteType === 'K' ? 'Potássio [K+]' : 'Magnésio [Mg2+]',
        'Nível no Sangue': `${electrolyteType === 'K' ? kValue : mgValue} mEq/L`,
        'Concentração da Ampola': electrolyteType === 'K' ? kAmpouleConc : mgAmpouleConc
      },
      outputs: {
        'Veredicto': res.severityLabel,
        'Prescrição Sugerida': `${res.composition} em ${res.infusionTime} (${res.rateBic})`
      }
    });
    triggerSaveNotification('eletrolitos_repo');
  };

  // --- Insulina Regular EV (Controle Glicêmico) ---
  const calculateInsulin = () => {
    const hgt = parseFloat(hgtValue) || 150;
    const weight = electrolyteWeight || 70; // uses electrolyteWeight or default 70
    
    // Choose dilution
    const isConc = insulinDilution === '100ui_100ml';
    const concentration = isConc ? 1.0 : 0.4; // UI/mL
    const composition = isConc 
      ? 'Insulina Regular 100 UI + Solução Fisiológica 0,9% (SF 100 mL). Concentração final: 1 UI/mL.'
      : 'Insulina Regular 100 UI + Solução Fisiológica 0,9% (SF 250 mL). Concentração final: 0.4 UI/mL.';

    let shouldStart = false;
    let rateUiH = 0;
    let recommendation = '';
    let actionColor = 'text-green-600 bg-green-50 border-green-200';
    let recheckInterval = '4 em 4 horas (Estável)';
    let dkaBolusUi = 0;

    if (hgt < 70) {
      shouldStart = false;
      rateUiH = 0;
      recommendation = '🚫 HIPOGLICEMIA SEVERA: Desligar bomba de insulina imediatamente. Injetar de 40 a 60 mL de Glicose 50% (SG 50%) EV em bólus de emergência. Reavaliar HGT de 15 em 15 minutos até ultrapassar 100 mg/dL.';
      actionColor = 'text-rose-700 bg-rose-50 border-rose-300 animate-pulse';
      recheckInterval = 'De 15 em 15 minutos';
    } else if (insulinProtocol === 'cad') {
      // DKA Protocol: 0.1 UI/kg/h
      shouldStart = true;
      rateUiH = weight * 0.1; // 0.1 UI/kg/h
      dkaBolusUi = Math.round(weight * 0.1); // optional 0.1 UI/kg bolus
      recommendation = `PROTOCOLO DE CETOACIDOSE DIABÉTICA (CAD) / ESTADO HIPEROSMOLAR (EHH): Fazer ataque opcional de ${dkaBolusUi} UI de Insulina Regular EV puro em bólus, seguido por infusão contínua em bomba na taxa de 0.1 UI/kg/h (${rateUiH.toFixed(1)} UI/h). Quando glicemia cair abaixo de 200-250 mg/dL na CAD (ou 300 mg/dL no EHH), associar soro glicosado 5% periférico e reduzir velocidade da insulina pela metade (0.05 UI/kg/h) para evitar edema cerebral iminente.`;
      actionColor = 'text-indigo-800 bg-indigo-50 border-indigo-200';
      recheckInterval = 'De 1 em 1 hora (Obrigatório)';
    } else {
      // Standard UTI control
      if (hgt < 140) {
        shouldStart = false;
        rateUiH = 0;
        recommendation = 'Glicemia Baixa a Estável (Ideal para não diabético, mas baixa para UTI crítica). Se estiver em bomba de insulina, desligue ou diminua consideravelmente a vazão.';
        actionColor = 'text-amber-700 bg-amber-50 border-amber-200';
        recheckInterval = 'De 1 em 1 hora';
      } else if (hgt <= 180) {
        shouldStart = true;
        rateUiH = 1.0;
        recommendation = 'FAIXA DE META DE SUCESSO (140-180 mg/dL): Excelente controle glicêmico na UTI. Se a bomba estiver ligada, manter vazão estável sem alterações de velocidade.';
        actionColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
        recheckInterval = 'De 2 em 2 horas';
      } else if (hgt < 240) {
        shouldStart = true;
        rateUiH = 2.0;
        recommendation = 'Hiperglicemia Leve: Iniciar bomba de infusão de insulina a 2 UI/h se houver duas aferições consecutivas maiores que 180 mg/dL.';
        actionColor = 'text-orange-700 bg-orange-50 border-orange-200';
        recheckInterval = 'De 1 em 1 hora';
      } else if (hgt < 350) {
        shouldStart = true;
        rateUiH = 4.0;
        recommendation = 'Hiperglicemia Moderada a Elevada: Inicie a infusão da bomba de insulina a 4 UI/h em bomba de infusão contínua. Solicitar gasometria para rastrear Cetoacidose Diabética se suspeito.';
        actionColor = 'text-red-700 bg-red-50 border-red-200';
        recheckInterval = 'De 1 em 1 hora';
      } else {
        shouldStart = true;
        rateUiH = 6.0;
        recommendation = 'Hiperglicemia Crítica Grave: Iniciar infusão a 6 UI/h e realizar bólus inicial EV opcional de 4 a 6 UI de insulina regular pura. Alerta máximo para cetoacidose diabética (CAD) ou estado hiperosmolar.';
        actionColor = 'text-rose-800 bg-rose-50 border-rose-300 font-bold';
        recheckInterval = 'De 1 em 1 hora de extrema vigilância';
      }
    }

    // Convert UI/h to mL/h based on concentration
    const rateMlHr = rateUiH / concentration;

    return {
      hgt,
      shouldStart,
      rateUiH,
      rateMlHr: parseFloat(rateMlHr.toFixed(1)),
      composition,
      recommendation,
      actionColor,
      recheckInterval,
      dkaBolusUi,
      targets: insulinProtocol === 'cad' 
        ? 'Meta CAD/EHH: Redução gradual de glicemia em taxa de 50 a 75 mg/dL por hora, evitando quedas bruscas para prevenir edema cerebral.'
        : 'A meta glicêmica ideal no paciente grave em ambiente de UTI é de 140 a 180 mg/dL.'
    };
  };

  const saveInsulinToHistory = () => {
    const res = calculateInsulin();
    onAddHistory({
      title: 'Bomba de Insulina Regular EV',
      description: `HGT Aferido: ${hgtValue} mg/dL | Protocolo: ${insulinProtocol === 'cad' ? 'Cetoacidose (CAD)' : 'Controle UTI'}`,
      inputs: {
        'Glicemia Capilar (HGT)': `${hgtValue} mg/dL`,
        'Protocolo Clínico': insulinProtocol === 'cad' ? 'CAD / Cetoacidose' : 'UTI Normal',
        'Diluição Escolhida': insulinDilution === '100ui_100ml' ? '100 UI em 100 mL SF (1 UI/mL)' : '100 UI em 250 mL SF (0.4 UI/mL)'
      },
      outputs: {
        'Conduta Proposta': res.recommendation,
        'Dose Horária Alvo': `${res.rateUiH} UI/hora`,
        'Velocidade na Bomba': `${res.rateMlHr} mL/hora`
      }
    });
    triggerSaveNotification('insulina_ev');
  };

  // --- Heparinização Plena (Heparina Não Fracionada - HNF vs Enoxaparina - Clexane) ---
  const calculateHeparin = () => {
    const w = heparinWeight || 70;
    const isTep = heparinIndication === 'tep_tvp';
    const isClexane = heparinType === 'clexane';

    if (isClexane) {
      // Enoxaparin Clexane calculations
      let doseSchedule = '12/12h';
      let factor = 1.0; // 1 mg/kg
      
      const isKidneyFailure = heparinClCr < 30;
      if (isKidneyFailure) {
        factor = 1.0;
        doseSchedule = '24/24h (Ajuste por ClCr < 30 mL/min para prevenir acúmulo e sangramento)';
      }

      const rawDose = w * factor;
      const roundedDose = Math.round(rawDose);
      // Clexane syringes standard sizes in Brazil/LatinAmerica: 20mg (0.2ml), 40mg (0.4ml), 60mg (0.6ml), 80mg (0.8ml), 100mg (1.0ml)
      // Concentration is 100 mg/mL (so 1mg = 0.01 mL)
      const syringeVolMl = rawDose / 100;

      let clexaneNotes = `ENOXAPARINA (CLEXANE) PLENO: Administrar via subcutânea (SC) profunda em flancos. Não massagear local pós-injeção. `;
      if (isKidneyFailure) {
        clexaneNotes += '⚠️ ALERTA: Em pacientes com ClCr < 30 mL/min, há alto risco de sangramentos severos por diminuição da depuração. Prefira usar Heparina Não Fracionada (HNF) se o paciente estiver altamente instável ou com iminência de cirurgia.';
      } else if (heparinIndication === 'sca') {
        clexaneNotes += 'Nota SCA Idoso (>75 anos): Reduzir a dose para 0.75 mg/kg SC de 12/12h e NÃO realizar o bólus inicial EV de 30mg.';
      }

      return {
        isClexane: true,
        clexaneDoseMg: roundedDose,
        clexaneVolMl: syringeVolMl.toFixed(2),
        clexaneSchedule: doseSchedule,
        composition: 'Enoxaparina Sódica (Clexane) 100 mg/mL pronto para uso em seringa preenchida.',
        renalWarning: isKidneyFailure 
          ? '⚠️ CLCR MENOR QUE 30: Ajuste de dose mandatório de 12/12h para 24/24h. Monitoramento de atividade anti-Xa recomendado se disponível.'
          : 'Dose plena padrão de 1 mg/kg SC de 12/12h para ClCr normal.',
        pttaAction: `Prescrição Prática: Clexane ${roundedDose} mg Subcutâneo de a cada ${isKidneyFailure ? '24' : '12'} horas (${syringeVolMl.toFixed(2)} mL por dose).`,
        pttaDoseChange: 'Subcutâneo',
        reversal: '⚠️ REVERSÃO PARCIAL (~60%): Se houver sangramento agudo grave nas últimas 8 horas, reverter com Sulfato de Protamina 1%. Administrar 1 mg de Protamina EV lento para cada 1 mg de Enoxaparina ativo.'
      };
    }

    // Diluent standard: HNF 25.000 UI (5 mL de 5.000 UI/mL) + SG 5% 245 mL. Total 250 mL. Conc 100 UI/mL.
    const composition = 'Heparina Sódica HNF 25.000 UI (5 mL) + Soro Glicosado 5% (SG 5%) 245 mL (Solução Final: 100 UI/mL)';

    // Bolus calculations
    let bolusFator = isTep ? 80 : 60; // 80 UI/kg for TEP, 60 UI/kg for SCA/Infarct
    let maxBolus = isTep ? 5000 : 4000;
    let bolusDose = w * bolusFator;
    if (bolusDose > maxBolus) bolusDose = maxBolus;
    const bolusVolume = bolusDose / 5000; // Frasco contem 5.000 UI/mL

    // Maintenance calculations
    let maintFator = isTep ? 18 : 12; // 18 UI/kg/h for TEP, 12 UI/kg/h for SCA
    let maxMaint = isTep ? 1660 : 1000;
    let maintDose = w * maintFator;
    if (maintDose > maxMaint) maintDose = maxMaint;
    const pumpRateMlHr = maintDose / 100; // Solution is 100 UI/mL

    // Renal warnings
    let renalWarning = '';
    if (heparinClCr < 30) {
      renalWarning = '⚠️ IMPORTANTE (ClCr < 30 mL/min): A Heparina Não Fracionada (HNF) é ALTAMENTE RECOMENDADA e SEGURA sobre as heparinas de baixo peso molecular (Clexane/Enoxaparina) neste paciente. Ela possui excreção renal mínima, meia-vida curta e pode ser 100% revertida de emergência.';
    } else {
      renalWarning = 'ClCr normal. Em pacientes sem fragilidade, Enoxaparina (Clexane) 1mg/kg SQ 12/12h é uma alternativa comum se não houver previsão de procedimentos imediatos.';
    }

    // PTTa titration adjustment table results
    let targetPttaLabel = 'Ajuste com base no PTTa Atual';
    let pttaAction = '';
    let pttaDoseChange = '';

    if (heparinPtta < 35) {
      pttaAction = `Dose sub-terapêutica severa! Aplicar bólus de reforço de ${80 * w} UI (${((80 * w) / 5000).toFixed(2)} mL EV) e aumentar vazão da bomba em +4 UI/kg/h (+4 mL/h em BIC).`;
      pttaDoseChange = '+4 mL/h';
    } else if (heparinPtta <= 45) {
      pttaAction = `Dose sub-terapêutica moderada. Aplicar bólus de reforço de ${40 * w} UI (${((40 * w) / 5000).toFixed(2)} mL EV) e aumentar vazão da bomba em +3 UI/kg/h (+3 mL/h em BIC).`;
      pttaDoseChange = '+3 mL/h';
    } else if (heparinPtta <= 60) {
      pttaAction = `Glicosilação parcial. Sem bólus de reforço necessário. Aumentar vazão da bomba em +2 UI/kg/h (+2 mL/h em BIC).`;
      pttaDoseChange = '+2 mL/h';
    } else if (heparinPtta <= 85) {
      pttaAction = '✅ FAIXA TERAPÊUTICA ALVO ALCANÇADA (INR/PTTa Ideal). Não realizar alterações. Manter taxa de infusão corrente e checar PTTa a cada 12 ou 24 horas.';
      pttaDoseChange = 'Manter taxa atual';
    } else if (heparinPtta <= 110) {
      pttaAction = 'Dose elevada. Não fazer bólus. Reduzir velocidade de infusão contínua da bomba de heparina em -2 UI/kg/h (-2 mL/h em BIC).';
      pttaDoseChange = '-2 mL/h';
    } else {
      pttaAction = '❌ RISCO EXTREMO DE SANGRAMENTO: Pausar a bomba de heparina imediatamente por 1 hora. Apagar alarmes. Retomar a infusão após 1 hora reduzindo a velocidade inicial em -4 UI/kg/h (-4 mL/h em BIC).';
      pttaDoseChange = 'Pausar 1h e reduzir-4 mL/h';
    }

    return {
      bolusUI: Math.round(bolusDose),
      bolusMl: bolusVolume.toFixed(2),
      maintUI: Math.round(maintDose),
      maintMl: pumpRateMlHr.toFixed(1),
      composition,
      renalWarning,
      pttaAction,
      pttaDoseChange,
      isClexane: false,
      reversal: `Em caso de sangramento agudo grave ou necessidade de cirurgia imediata, reverter com Sulfato de Protamina 1%. Cada 1 mg de Protamina neutraliza 100 UI de HNF infusão ativa nas últimas 2 horas. Dose máxima sugerida de 50 mg EV lento.`
    };
  };

  const saveHeparinToHistory = () => {
    const res = calculateHeparin();
    onAddHistory({
      title: res.isClexane ? 'Anticoagulação Enoxaparina (Clexane) Plena' : 'Anticoagulação Plena HNF',
      description: `Paciente: ${heparinWeight} kg | Indicação: ${heparinIndication === 'tep_tvp' ? 'TEP/TVP' : 'SCA'}`,
      inputs: {
        'Paciente Peso': `${heparinWeight} kg`,
        'Fármaco Selecionado': res.isClexane ? 'Enoxaparina (Clexane)' : 'Heparina Não Fracionada (HNF)',
        'Indicação': heparinIndication === 'tep_tvp' ? 'TEP / TVP' : 'SCA / Coronária',
        'ClCr Estimado': `${heparinClCr} mL/min`
      },
      outputs: res.isClexane ? {
        'Dose MG': `${res.clexaneDoseMg} mg SC (Subcutâneo)`,
        'Volume Seringa': `${res.clexaneVolMl} mL`,
        'Frequência': `A cada ${heparinClCr < 30 ? '24' : '12'} horas`
      } : {
        'HNF Ataque Bólus': `${res.bolusUI} UI (${res.bolusMl} mL ampola pura)`,
        'BIC Manutenção Inicial': `${res.maintMl} mL/h`
      }
    });
    triggerSaveNotification('heparina_infusion');
  };

  // --- Transfusão de Hemoderivados ---
  const calculateTransfusion = () => {
    const w = transfusionWeight || 70;
    const hb = parseFloat(transfusionHb) || 12;
    const plt = parseFloat(transfusionPlt) || 200000;
    const fib = parseFloat(transfusionFib) || 200;
    const inr = parseFloat(transfusionInr) || 1.0;

    let chIndicator = 'NÃO INDICADO';
    let chColor = 'text-gray-500 bg-gray-50 border-gray-200';
    let chDoseStr = 'Restringir transfusão pela estratégia conservadora.';
    let chRef = 'Meta é manter Hb > 7,0 g/dL para todos os pacientes graves de UTI de acordo com estudos clínicos robustos.';

    if (hb < 7) {
      chIndicator = 'INDICAÇÃO ABSOLUTA / CLASSE I';
      chColor = 'text-rose-700 bg-rose-50 border-rose-300 font-bold';
      chDoseStr = 'Prescrever de 1 a 2 Concentrados de Hemácias (CH). Cada unidade (CH) de ~250-300mL eleva a hemoglobina do adulto em cerca de 1,0 g/dL.';
    } else if (hb < 8 && (transfusionCardio || transfusionBleeding)) {
      chIndicator = 'INDICAÇÃO PARCIAL (Coronariopata ou Choque Hemorrágico)';
      chColor = 'text-orange-700 bg-orange-50 border-orange-200';
      chDoseStr = 'Prescrever 1 Concentrado de Hemácias (CH) devido a hipóxia miocárdica no IAM ou choque ativo.';
      chRef = 'IAM agudo e isquemia ativa toleram metas de Hb de 8,0 a 9,0 g/dL para garantir perfusão coronariana.';
    }

    let pltIndicator = 'NÃO INDICADO';
    let pltColor = 'text-gray-500 bg-gray-50 border-gray-200';
    let pltDoseStr = 'Preservar plaquetas se ausência de sangramento ou procedimentos invasivos imediatos.';

    if (plt < 10000) {
      pltIndicator = 'INDICADO (Prevenção Profilática de Sangramento Espontâneo)';
      pltColor = 'text-rose-700 bg-rose-50 border-rose-300 font-bold animate-pulse';
      pltDoseStr = `Prescrever plaquetas: ${Math.round(w / 10)} unidades de Concentrado de Plaquetas (ou 1 unidade de Plaquetas por Aférese).`;
    } else if (plt < 20000 && transfusionBleeding) {
      pltIndicator = 'INDICADO (Sangramento ativo severo ou SEPSE de alto risco)';
      pltColor = 'text-orange-700 bg-orange-50 border-orange-200';
      pltDoseStr = `Prescrever plaquetas: ${Math.round(w / 10)} unidades (1U para cada 10kg).`;
    } else if (plt < 50000 && (transfusionBleeding || transfusionCardio)) {
      pltIndicator = 'INDICADO se procedimento invasivo profundo planejado ou punção de CVC';
      pltColor = 'text-amber-750 bg-amber-50 border-amber-200';
      pltDoseStr = `Prescrever plaquetas: ${Math.round(w / 10)} unidades para preencher segurança pré-procedimento imediato.`;
    }

    let fibIndicator = 'NÃO INDICADO';
    let fibColor = 'text-gray-500 bg-gray-50 border-gray-200';
    let fibDoseStr = 'Manter dosagens periódicas de coagulograma.';

    if (fib < 150 && transfusionBleeding) {
      fibIndicator = 'INDICADO (CRIOPRECIPITADO na Coagulopatia Ativa)';
      fibColor = 'text-rose-700 bg-rose-50 border-rose-200 font-bold';
      fibDoseStr = `Prescrever Crioprecipitado: ${Math.round(w / 10)} bolsas (1U a cada 10kg). Fornece excelente reposição de Fibrinogênio e fator VIII.`;
    }

    // Plasma Fresco Congelado (PFC)
    let pfcIndicator = 'NÃO INDICADO';
    let pfcColor = 'text-gray-500 bg-gray-50 border-gray-200';
    let pfcDoseStr = 'Restringir plasma se INR normal ou ausência de sangramento hemodinâmico.';

    if (inr > 1.5 && transfusionBleeding) {
      pfcIndicator = 'INDICADO (Correção de Fatores de Coagulação no Sangramento Ativo)';
      pfcColor = 'text-rose-700 bg-rose-50 border-rose-300 font-bold animate-pulse';
      const pfcVol = Math.round(w * 15);
      const pfcBags = Math.round(pfcVol / 250);
      pfcDoseStr = `Prescrever PFC: Dose de 15 mL/kg, resultando em cerca de ${pfcVol} mL, correspondente a ${pfcBags} bolsas de PFC (~250 mL cada unidades). Correr em bólus rápido para preservar validade de fatores lábeis (fator V e VIII).`;
    } else if (inr >= 1.7 && !transfusionBleeding) {
      pfcIndicator = 'INDICADO SE PROCEDIMENTO CIRÚRGICO URGENTE PROGRAMADO';
      pfcColor = 'text-amber-755 bg-amber-50 border-amber-250';
      pfcDoseStr = 'Infundir apenas se houver biópsia programada, CVC de alto risco ou cirurgia de grande porte. INR alto isolado e assintomático não justifica uso profilático de plasma.';
    }

    return {
      chIndicator,
      chColor,
      chDoseStr,
      chRef,
      pltIndicator,
      pltColor,
      pltDoseStr,
      fibIndicator,
      fibColor,
      fibDoseStr,
      pfcIndicator,
      pfcColor,
      pfcDoseStr,
      warnings: '⚠️ PERIGO DE SOBRECARGA: Monitore reação transfusional (febre, TRALI, reação anafilática, TACO) de hora em hora. Correr concentrados de hemácias em até 120 minutos por bolsa; plaquetas e plasma devem ser infundidos rapidamente (30-45min de forma rápida).'
    };
  };

  const saveTransfusionToHistory = () => {
    const res = calculateTransfusion();
    onAddHistory({
      title: 'Transfusão de Hemoderivados',
      description: `Hb: ${transfusionHb} g/dL | Plaquetas: ${transfusionPlt}/mm³ | INR: ${transfusionInr}`,
      inputs: {
        'Hemoglobina': `${transfusionHb} g/dL`,
        'Plaquetas': `${transfusionPlt} /mm³`,
        'Fibrinogênio': `${transfusionFib} mg/dL`,
        'Relação Coagulação (INR)': `${transfusionInr}`,
        'IAM ou Choque Ativo': transfusionCardio || transfusionBleeding ? 'Sim' : 'Não'
      },
      outputs: {
        'Hemácias': res.chIndicator,
        'Plaquetas': res.pltIndicator,
        'Concentrado Fibrinogênio (Crio)': res.fibIndicator,
        'Plasma Fresco Congelado': res.pfcIndicator
      }
    });
    triggerSaveNotification('transfusao');
  };

  // --- Furosemida EV (Lasix em Congestão Congestiva) ---
  const calculateFurosemide = () => {
    const w = furosemideWeight || 70;
    const priorUse = furosemidePriorUse;
    const voDose = furosemideVoDose;
    const isSevere = furosemideCongestion === 'severe';

    let attackDoseMg = 40;
    let attackAmpoules = 2; // Each is 20 mg/ 2 mL
    let reasoning = '';
    let maintenanceSugg = '';

    if (!priorUse) {
      // Dose standard: 0.5 to 1.0 mg/kg
      attackDoseMg = w * 0.5;
      if (attackDoseMg < 20) attackDoseMg = 20;
      if (attackDoseMg > 40) attackDoseMg = 40;
      attackAmpoules = Math.ceil(attackDoseMg / 20);
      attackDoseMg = attackAmpoules * 20;

      reasoning = `PACIENTE VIRGEM DE TRATAMENTO OU USO CRÔNICO: Dose de ataque inicial conservadora de ${attackDoseMg} mg EV bolus (${attackAmpoules} ampolas).`;
      
      maintenanceSugg = isSevere 
        ? 'Furosemida 20 mg a 40 mg EV (1 a 2 ampolas) de 12/12h ou de 8/8h conforme balanço hídrico diário.' 
        : 'Furosemida 20 mg EV (1 ampola) de 12/12h.';
    } else {
      // Dose standard 2x to 2.5x VO daily dose convert to EV
      const mult = isSevere ? 2.5 : 2.0;
      const targetMg = voDose * mult;
      attackAmpoules = Math.ceil(targetMg / 20);
      attackDoseMg = attackAmpoules * 20;

      reasoning = `PACIENTE EM INFUSÃO HABITUAL VO (${voDose} mg/dia): Regra consagrada de 2 a 2,5 vezes a dose crônica em bólus EV. Ataque calculado: ${attackDoseMg} mg EV bolus (${attackAmpoules} ampolas).`;

      maintenanceSugg = isSevere
        ? `Furosemida Infusão Contínua em BIC recomendada para otimizar alça renal: dilatar 10 ampolas (200 mg) de Furosemida pura em 160 mL de SF 0,9% (volume total: 200 mL, conc 1 mg/mL). Iniciar vazão na bomba a 10 a 20 mL/h.`
        : `Furosemida ${Math.min(attackDoseMg, 80)} mg EV (4 ampolas) de 12/12h ou de 8/8h.`;
    }

    // Urine targets
    const responseTarget = 'Aferir diurese nas primeiras 2 a 6 horas. Sucesso esperado: diurese > 100 mL/hora ou urina volumosa > 500 mL em 2 horas após bólus.';
    const balanceTarget = 'Meta de balanço hídrico diário: perda nítida de 1.000 a 2.000 mL (1kg a 2kg de peso hídrico corporal) nas primeiras 24h.';

    return {
      attackMg: attackDoseMg,
      attackAmp: attackAmpoules,
      reasoning,
      maintenanceSugg,
      responseTarget,
      balanceTarget,
      warnings: '⚠️ PERIGO DE DISTORÇÃO ELETROLÍTICA EV: Furosemida agressiva espolia potássio e magnésio severamente, gerando hipofunção, hipotensão e cãibras. Acompanhar potássio rigorosamente mantendo K > 4,0 mEq/L durante a fase de esvaziamento volêmico ativa.'
    };
  };

  const saveFurosemideToHistory = () => {
    const res = calculateFurosemide();
    onAddHistory({
      title: 'Furosemida EV (Lasix)',
      description: `Uso prévio: ${furosemidePriorUse ? 'Sim' : 'Não'} | Congestão: ${furosemideCongestion.toUpperCase()}`,
      inputs: {
        'Uso prévio': furosemidePriorUse ? 'Sim' : 'Não',
        'Dose VO crônica': `${furosemideVoDose} mg/dia`,
        'Nível de Congestão': furosemideCongestion.toUpperCase()
      },
      outputs: {
        'Bólus de Ataque': `${res.attackMg} mg EV (${res.attackAmp} ampolas)`,
        'Esquema de Manuntenção': res.maintenanceSugg
      }
    });
    triggerSaveNotification('furosemide');
  };

  // --- TFG (Glomerular Filtration Rate) Calculation ---
  const calculateTFG = () => {
    const scr = parseFloat(tfgCreatinine) || 1.0;
    const age = tfgAge;
    
    // CKD-EPI 2021 Update Formula
    let ckdEpi = 0;
    if (tfgGender === 'female') {
      const k = 0.7;
      const alpha = -0.241;
      const firstPart = scr <= k ? Math.pow(scr / k, alpha) : Math.pow(scr / k, -1.2);
      ckdEpi = 142 * firstPart * Math.pow(0.9938, age) * 1.012;
    } else {
      const k = 0.9;
      const alpha = -0.302;
      const firstPart = scr <= k ? Math.pow(scr / k, alpha) : Math.pow(scr / k, -1.2);
      ckdEpi = 142 * firstPart * Math.pow(0.9938, age);
    }

    // Cockcroft-Gault Formula
    const cg = ((140 - age) * tfgWeight * (tfgGender === 'female' ? 0.85 : 1)) / (72 * scr);

    return { ckdEpi: ckdEpi.toFixed(1), cg: cg.toFixed(1) };
  };

  const getTFGStage = (val: number) => {
    if (val >= 90) return { label: 'G1 - Função Normal ou Elevada', class: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val >= 60) return { label: 'G2 - Redução Leve', class: 'text-teal-700 bg-teal-50 border-teal-200' };
    if (val >= 45) return { label: 'G3a - Redução Leve a Moderada', class: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (val >= 30) return { label: 'G3b - Redução Moderada a Grave', class: 'text-orange-700 bg-orange-50 border-orange-200' };
    if (val >= 15) return { label: 'G4 - Redução Grave / Pré-falência', class: 'text-red-700 bg-red-50 border-red-200' };
    return { label: 'G5 - Falência Renal Crônica (Estágio Terminal)', class: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const saveTFGToHistory = () => {
    const results = calculateTFG();
    onAddHistory({
      title: 'TFG ClCr Estimada',
      description: `Paciente de ${tfgAge} anos, Cr ${tfgCreatinine} mg/dL`,
      inputs: {
        'Idade': tfgAge,
        'Sexo': tfgGender === 'male' ? 'Masculino' : 'Feminino',
        'Creatinina': `${tfgCreatinine} mg/dL`,
        'Peso': `${tfgWeight} kg`
      },
      outputs: {
        'CKD-EPI 2021': `${results.ckdEpi} mL/min/1.73m²`,
        'Cockcroft-Gault': `${results.cg} mL/min`
      }
    });
    triggerSaveNotification('tfg');
  };

  // --- IMC / BSA Calculation ---
  const calculateIMCAndBSA = () => {
    const heightM = imcHeight / 100;
    const imc = imcWeight / (heightM * heightM);
    // Mosteller formula: BSA = sqrt(W * H / 3600)
    const bsa = Math.sqrt((imcWeight * imcHeight) / 3600);

    return { imc: imc.toFixed(1), bsa: bsa.toFixed(2) };
  };

  const getIMCClassification = (val: number) => {
    if (val < 18.5) return { label: 'Abaixo do peso', class: 'bg-indigo-50 border-indigo-100 text-indigo-700' };
    if (val < 25.0) return { label: 'Eutrófico (Peso Saudável)', class: 'bg-emerald-50 border-emerald-100 text-emerald-700' };
    if (val < 30.0) return { label: 'Sobrepeso (Pré-obesidade)', class: 'bg-amber-50 border-amber-100 text-amber-700' };
    if (val < 35.0) return { label: 'Obesidade Grau I', class: 'bg-orange-50 border-orange-100 text-orange-700' };
    if (val < 40.0) return { label: 'Obesidade Grau II (Grave)', class: 'bg-red-50 border-red-100 text-red-700' };
    return { label: 'Obesidade Grau III (Mórbida / Crítica)', class: 'bg-rose-50 border-rose-100 text-rose-700' };
  };

  const saveIMCToHistory = () => {
    const { imc, bsa } = calculateIMCAndBSA();
    onAddHistory({
      title: 'Antropometria (IMC e BSA)',
      description: `Peso: ${imcWeight}kg | Altura: ${imcHeight}cm`,
      inputs: {
        'Peso': `${imcWeight} kg`,
        'Altura': `${imcHeight} cm`
      },
      outputs: {
        'IMC': `${imc} kg/m²`,
        'Superfície Corporal (BSA)': `${bsa} m²`
      }
    });
    triggerSaveNotification('imc_bsa');
  };

  // --- Parkland formula calculation ---
  const calculateParkland = () => {
    const totalMl = 4 * parklandWeight * parklandPercent;
    const first8h = totalMl / 2;
    const rate8h = first8h / 8;
    const next16h = totalMl / 2;
    const rate16h = next16h / 16;

    return {
      totalMl: totalMl.toLocaleString('pt-BR'),
      first8h: first8h.toLocaleString('pt-BR'),
      rate8h: rate8h.toFixed(1),
      next16h: next16h.toLocaleString('pt-BR'),
      rate16h: rate16h.toFixed(1)
    };
  };

  const saveParklandToHistory = () => {
    const res = calculateParkland();
    onAddHistory({
      title: 'Fórmula de Parkland (Grande Queimado)',
      description: `Queima de ${parklandPercent}% em paciente de ${parklandWeight}kg`,
      inputs: {
        'Peso': `${parklandWeight} kg`,
        'Superfície Queimada': `${parklandPercent}%`
      },
      outputs: {
        'Soro Total (24h)': `${res.totalMl} mL (Cristaloide)`,
        'Volume primeiras 8h': `${res.first8h} mL (Vazão: ${res.rate8h} mL/h)`,
        'Volume 16h seguintes': `${res.next16h} mL (Vazão: ${res.rate16h} mL/h)`
      }
    });
    triggerSaveNotification('parkland');
  };

  // --- QTc Interval Calculation ---
  const calculateQTc = () => {
    // Bazett formula: QTc = QT (seconds) / sqrt(RR (seconds))
    // RR (seconds) = 60 / FC
    const rrSeconds = 60 / (qtcHr || 60);
    const qtSeconds = qtcQtMs / 1000;
    const qtcSeconds = qtSeconds / Math.sqrt(rrSeconds);
    const qtcMs = qtcSeconds * 1000;

    return qtcMs.toFixed(0);
  };

  const getQTcClassification = (val: number) => {
    if (val < 350) return { label: 'Intervalo QT Encurtado', class: 'bg-amber-50 border-amber-200 text-amber-700' };
    if (val <= 440) return { label: 'Normal (Masculino & Feminino)', class: 'bg-emerald-50 border-emerald-200 text-emerald-700' };
    if (val <= 460) return { label: 'Normal Alto (Feminino)', class: 'bg-teal-50 border-teal-200 text-teal-700' };
    if (val < 500) return { label: 'QT Longo Prolongado (Acompanhar)', class: 'bg-orange-50 border-orange-200 text-orange-700' };
    return { label: 'QT Crítico / Alto Risco de Torsades de Pointes', class: 'bg-rose-50 border-rose-200 text-rose-700' };
  };

  const saveQTcToHistory = () => {
    const qtc = calculateQTc();
    onAddHistory({
      title: 'Intervalo QT Corrigido (QTc)',
      description: `QT aferido: ${qtcQtMs}ms | FC: ${qtcHr}bpm`,
      inputs: {
        'QT original': `${qtcQtMs} ms`,
        'Frequência Cardíaca': `${qtcHr} bpm`
      },
      outputs: {
        'QTc Corrigido (Bazett)': `${qtc} ms`
      }
    });
    triggerSaveNotification('qtc');
  };

  // --- Bicarbonate deficit calculation ---
  const calculateBicarbonate = () => {
    const actFactor = bicGender === 'male' ? 0.6 : 0.5;
    const act = bicWeight * actFactor;
    const actVal = parseFloat(bicActual) || 15;
    const targetVal = parseFloat(bicTarget) || 24;

    const deficitMeq = act * (targetVal - actVal);
    // Standard ampoule of sodium bicarbonate 8.4%: 1 mEq / mL
    // Standard presentation is 10mL (10 mEq) or 250mL (250 mEq) bottles
    const ampoules10ml = deficitMeq / 10;

    return {
      deficitMeq: deficitMeq < 0 ? '0' : deficitMeq.toFixed(1),
      ampoules10ml: deficitMeq < 0 ? '0' : ampoules10ml.toFixed(1)
    };
  };

  const saveBicToHistory = () => {
    const res = calculateBicarbonate();
    onAddHistory({
      title: 'Déficit de Bicarbonato',
      description: `Alvo: ${bicTarget} mEq/L | Atual: ${bicActual} mEq/L`,
      inputs: {
        'Peso': `${bicWeight} kg`,
        'Gênero': bicGender === 'male' ? 'Masculino' : 'Feminino',
        'Bic Soro Atual': `${bicActual} mEq/L`,
        'Bic Alvo': `${bicTarget} mEq/L`
      },
      outputs: {
        'Déficit Estimado de HCO₃': `${res.deficitMeq} mEq`,
        'Envase equivalente (am. 10ml)': `${res.ampoules10ml} ampolas`
      }
    });
    triggerSaveNotification('bicarbonate');
  };

  // --- Maintenance Fluid Calculation ---
  const calculateMaintenanceFluid = () => {
    const isRestricted = fluidRestriction === 'restricted';
    const rate = isRestricted ? 41.7 : 83.3;
    const frequency = isRestricted ? 'a cada 24 horas' : 'a cada 12 horas';
    const volumeTotalDay = isRestricted ? 1000 : 2000;
    
    return {
      composition: `SG 5% 1000 mL + NaCl 20% 40 mL${fluidIncludeK ? ' + KCl 19,1% 10 mL' : ''}`,
      rate: rate.toFixed(1),
      frequency,
      volumeTotalDay
    };
  };

  const saveMaintenanceFluidToHistory = () => {
    const res = calculateMaintenanceFluid();
    onAddHistory({
      title: 'Soro de Manutenção | Dieta Zero',
      description: `Composição: ${res.composition}`,
      inputs: {
        'Restrição hídrica': fluidRestriction === 'restricted' ? 'Sim' : 'Não',
        'Incluir Potássio': fluidIncludeK ? 'Sim (KCl 19,1% 10mL)' : 'Não'
      },
      outputs: {
        'Prescrição Recomendada': `Correr a ${res.rate} mL/h (${res.frequency})`,
        'Meta Volêmica diária': `${res.volumeTotalDay} mL/dia de Soro`
      }
    });
    triggerSaveNotification('maintenance_fluid');
  };



  // --- Sodium Correction (Adrogué-Madias) ---
  const calculateSodiumCorrection = () => {
    const naActual = parseFloat(sodiumActual) || 125;
    const naTarget = parseFloat(sodiumTarget) || 135;
    const weight = sodiumWeight;
    
    // Total Body Water factor
    let actFactor = 0.6;
    if (sodiumGender === 'female') {
      actFactor = sodiumAgeGroup === 'elderly' ? 0.45 : 0.5;
    } else {
      actFactor = sodiumAgeGroup === 'elderly' ? 0.5 : 0.6;
    }
    const act = weight * actFactor;

    // Infusate sodium values in mEq/L
    let naInfusate = 513; // NaCl 3%
    let infusateLabel = 'NaCl 3% (513 mEq/L)';
    if (sodiumInfusate === 'nacl09') {
      naInfusate = 154;
      infusateLabel = 'NaCl 0,9% (154 mEq/L)';
    } else if (sodiumInfusate === 'sg5') {
      naInfusate = 0;
      infusateLabel = 'Soro Glicosado 5% (0 mEq/L)';
    } else if (sodiumInfusate === 'water') {
      naInfusate = 0;
      infusateLabel = 'Água Livre Enteral (0 mEq/L)';
    }

    // Adrogué-Madias Formula for Delta Na per 1L of fluid infusion
    const deltaNa = (naInfusate - naActual) / (act + 1);

    // Target change in serum sodium
    const targetChange = naTarget - naActual;

    // Volume of infusate needed (in Liters)
    let volumeLiters = 0;
    if (deltaNa !== 0) {
      volumeLiters = targetChange / deltaNa;
    }

    const volumeML = Math.round(Math.abs(volumeLiters) * 1000);
    const max24h_NaChange = 8; // standard safe maximum change of 8 mEq in 24h
    const volumeSafe24h = deltaNa !== 0 ? Math.round(Math.abs((targetChange > 0 ? Math.min(targetChange, max24h_NaChange) : Math.max(targetChange, -max24h_NaChange)) / deltaNa) * 1000) : 0;

    return {
      act: act.toFixed(1),
      deltaNa: deltaNa.toFixed(2),
      infusateLabel,
      volumeTotal: volumeML,
      volumeSafe24h,
      targetChange: targetChange.toFixed(0),
      isInfusion: naInfusate > naActual,
      isWater: sodiumInfusate === 'sg5' || sodiumInfusate === 'water'
    };
  };

  const saveSodiumCorrectionToHistory = () => {
    const res = calculateSodiumCorrection();
    onAddHistory({
      title: 'Correção de Sódio (Adrogué-Madias)',
      description: `Sódio Atual: ${sodiumActual} mEq/L | Alvo: ${sodiumTarget} mEq/L`,
      inputs: {
        'Sódio Sérico Inicial': `${sodiumActual} mEq/L`,
        'Sódio Sérico Alvo': `${sodiumTarget} mEq/L`,
        'Peso do Paciente': `${sodiumWeight} kg`,
        'Solução Escolhida': res.infusateLabel
      },
      outputs: {
        'Água Corporal Total (ACT)': `${res.act} L`,
        'Variação de Sódio por Litro': `${res.deltaNa} mEq/L por Litro infusionado`,
        'Volume Sugerido (24h limite seguro 8mEq)': `${res.volumeSafe24h} mL`
      }
    });
    triggerSaveNotification('sodium_correction');
  };

  // --- PBW & Tidal Volume Protetor ---
  const [ventScenario, setVentScenario] = useState<'padrao' | 'obstrutivo' | 'sara'>('padrao');

  const getVentScenarioSpecs = (scen: 'padrao' | 'obstrutivo' | 'sara', pbw: number, currentVol: number) => {
    let fr = 14; 
    let peepVal = '5 - 8';
    let peepDesc = 'PEEP fisiológica / inicial padrão.';
    let fio2 = '100% inicial';
    let fio2Target = 'Titular rápido para menor FiO₂ possível visando SpO₂ de 92-96%.';
    let fluxo = '40 - 60 L/min';
    let fluxoDesc = 'Fluxo inspiratório padrão em VCV.';
    let ieRatio = '1:2';
    let ieRatioDesc = 'Relação Inspiração:Expiração padrão de repouso.';
    let sens = '2.0 L/min';
    let sensDesc = 'Disparo por fluxo (mais sensível e reduz o trabalho muscular inicial).';
    let ti = '1.0 - 1.2s';
    
    let title = 'Perfil Clínico Standard (Pulmão Normal)';
    let desc = 'Indicado para pacientes sem patologias mecânicas pulmonares intrínsecas graves (ex: pós-operatório imediato, coma neurológico sem aspiração primária).';
    let aviso = 'Focar em manter proteção pulmonar inicial com Driving Pressure < 15 cmH₂O e Pressão de Platô ≤ 30 cmH₂O.';

    if (scen === 'obstrutivo') {
      fr = 10; 
      peepVal = '3 - 5';
      peepDesc = 'Baixa PEEP para evitar aprisionamento e auto-PEEP. No DPOC hipercapnico, pode-se usar de 50% a 80% da auto-PEEP medida.';
      fio2 = '100% inicial';
      fio2Target = 'Titular rápido para alvo de SpO₂ de 88-92% (DPOC retentores crônicos) ou 92-95% (Asma severa).';
      fluxo = '60 - 80 L/min';
      fluxoDesc = 'Alto fluxo inspiratório para reduzir o tempo inspiratório e fornecer ciclo expiratório mais longo (prevenindo hiperinsuflação e auto-PEEP).';
      ieRatio = '1:3 a 1:4';
      ieRatioDesc = 'Permite expiração prolongada, essencial para esvaziar alvéolos hiperinsuflados antes do próximo ciclo.';
      sens = '2.0 L/min (Fluxo)';
      sensDesc = 'Evitar disparo por pressão se houver auto-PEEP instalada (exige esforço excessivo para disparar).';
      ti = '0.7 - 0.9s';
      title = 'Perfil Obstrutivo Grave (Asma / DPOC)';
      desc = 'Risco crítico de aprisionamento de ar, auto-PEEP e choque obstrutivo (barotrauma). A estratégia principal é maximizar o tempo expiratório.';
      aviso = 'PERIGO: Se houver elevação aguda de pressão nas vias aéreas ou hipotensão súbita, desconecte temporariamente o circuito do tubo para esvaziar o pulmão (suspeita de Auto-PEEP severa).';
    } else if (scen === 'sara') {
      fr = 20; 
      peepVal = '10 - 16';
      peepDesc = 'PEEP alta de recrutamento alveolar protetor. Ajustar de acordo com a tabela PEEP x FiO₂ do ARDSNet ou titulação de melhor complacência.';
      fio2 = '100% inicial';
      fio2Target = 'Titular para manter alvo de SpO₂ de 88-93% (estratégia permissiva para evitar toxicidade por excesso de oxigênio).';
      fluxo = '45 - 55 L/min';
      fluxoDesc = 'Início suave (rampa curta) adaptado à complacência diminuída.';
      ieRatio = '1:2 ou 1:1.5';
      ieRatioDesc = 'Ajustado para estabilizar recrutamento e otimizar a oxigenação alveolar.';
      sens = '1.5 - 2.0 L/min';
      sensDesc = 'Ajustar para evitar autodisparos causados por oscilações no circuito ou tremores do doente.';
      ti = '0.9 - 1.1s';
      title = 'Perfil SARA / Restritivo / Edema Pulmonar (ARDS)';
      desc = 'Pulmões duros, com áreas significativas de colapso e shunt. Requer ventilação altamente protetora com volumes baixos e pressões alveolares controladas.';
      aviso = 'CRÍTICO: Manter Driving Pressure estritamente < 15 cmH₂O (se possível < 13 cmH₂O) e Pressão de Platô ≤ 30 cmH₂O. Aceitar hipercapnia permissiva (pH ≥ 7.20) para evitar o volutrauma.';
    }

    const volumeMinuto = ((fr * currentVol) / 1000).toFixed(1);

    return {
      fr,
      peepVal,
      peepDesc,
      fio2,
      fio2Target,
      fluxo,
      fluxoDesc,
      ieRatio,
      ieRatioDesc,
      sens,
      sensDesc,
      ti,
      volumeMinuto,
      title,
      desc,
      aviso
    };
  };

  const calculateVentPbw = () => {
    const heightCm = ventHeight;
    const base = ventGender === 'male' ? 50.0 : 45.5;
    const heightDiff = heightCm - 152.4;
    const pbw = base + (heightDiff > 0 ? 0.9055 * heightDiff : 0);

    const tidal4 = Math.round(pbw * 4);
    const tidal5 = Math.round(pbw * 5);
    const tidal6 = Math.round(pbw * 6);
    const tidal7 = Math.round(pbw * 7);
    const tidal8 = Math.round(pbw * 8);

    const activeTidal = Math.round(pbw * ventVolFactor);
    const specs = getVentScenarioSpecs(ventScenario, pbw, activeTidal);

    return {
      pbw: pbw.toFixed(1),
      tidal4,
      tidal5,
      tidal6,
      tidal7,
      tidal8,
      activeTidal,
      specs
    };
  };

  const saveVentPbwToHistory = () => {
    const res = calculateVentPbw();
    onAddHistory({
      title: 'PBW e Ventilação Protetora',
      description: `Altura: ${ventHeight} cm | Gênero: ${ventGender === 'male' ? 'Masculino' : 'Feminino'} | Perfil: ${ventScenario.toUpperCase()}`,
      inputs: {
        'Altura': `${ventHeight} cm`,
        'Gênero': ventGender === 'male' ? 'Masculino' : 'Feminino',
        'Fator Volume Corrente': `${ventVolFactor} mL/kg`,
        'Perfil Clínico': ventScenario.toUpperCase()
      },
      outputs: {
        'Peso Corporal Predito (PBW)': `${res.pbw} kg`,
        'Volume Corrente Alvo': `${res.activeTidal} mL (com ${ventVolFactor} mL/kg)`,
        'Frequência Respiratória': `${res.specs.fr} ipm`,
        'PEEP Recomendada': `${res.specs.peepVal} cmH₂O`,
        'Volume Minuto Estimado': `${res.specs.volumeMinuto} L/min`
      }
    });
    triggerSaveNotification('vent_pbw');
  };



  return (
    <div className="space-y-6">
      {/* Painel de Exibição da Calculadora Ativa */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        
        {/* TAB 1: TFG / Kidney clearance */}
        {activeCalc === 'tfg' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Entradas Clínicas
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Taxa de Filtração Glomerular</h3>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">Gênero Biológico</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="gender-tfg-male"
                      onClick={() => setTfgGender('male')}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition ${
                        tfgGender === 'male' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      Masculino
                    </button>
                    <button
                      id="gender-tfg-female"
                      onClick={() => setTfgGender('female')}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition ${
                        tfgGender === 'female' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      Feminino
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Idade (anos)</label>
                    <input
                      id="tfg-age-input"
                      type="number"
                      value={tfgAge}
                      onChange={(e) => setTfgAge(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full text-sm font-bold text-gray-900 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Peso (kg)</label>
                    <input
                      id="tfg-weight-input"
                      type="number"
                      value={tfgWeight}
                      onChange={(e) => setTfgWeight(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full text-sm font-bold text-gray-900 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Creatinina Sérica (mg/dL)</label>
                  <input
                    id="tfg-creatinine-input"
                    type="text"
                    value={tfgCreatinine}
                    onChange={(e) => setTfgCreatinine(e.target.value.replace(',', '.'))}
                    className="w-full text-sm font-bold text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Ex: 1.1"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Use ponto como separador decimal.
                  </span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Resultados ClCr Estimados
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                      CKD-EPI (2021)
                    </span>
                    <p className="text-3xl font-black text-blue-600 font-mono mt-1">
                      {calculateTFG().ckdEpi}
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium">mL/min/1.73m²</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                      COCKCROFT-GAULT
                    </span>
                    <p className="text-3xl font-black text-gray-800 font-mono mt-1">
                      {calculateTFG().cg}
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium">mL/min</span>
                  </div>
                </div>

                {/* Severity evaluation */}
                <div className={`p-4 rounded-xl border text-sm flex gap-3 items-center ${
                  getTFGStage(parseFloat(calculateTFG().ckdEpi)).class
                }`}>
                  <Info className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold">Avaliação do Clearance GFR:</span>
                    <p className="text-xs font-semibold mt-0.5">
                      {getTFGStage(parseFloat(calculateTFG().ckdEpi)).label}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-500 leading-relaxed font-sans bg-white p-3 rounded-lg border border-gray-100">
                  <strong>Aviso Clinico:</strong> A nova diretriz de 2021 CKD-EPI removeu a variável etônica/raciais para garantir uma prescrição neutra de nefrotóxicos em conformidade com as diretivas internacionais de equidade.
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-400">EFICAZ EM AJUSTE FARMACOLÓGICO</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IMC & BSA (BMI & Body Surface Area) */}
        {activeCalc === 'imc_bsa' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Medidas Antropométricas
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">IMC e Superfície Corporal</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Peso Corporal (kg)</label>
                  <input
                    id="imc-weight"
                    type="range"
                    min="30"
                    max="180"
                    value={imcWeight}
                    onChange={(e) => setImcWeight(parseInt(e.target.value) || 70)}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between items-center text-xs mt-1 font-semibold text-gray-700">
                    <span>30 kg</span>
                    <span className="bg-blue-50 text-blue-700 text-sm font-bold px-2 py-0.5 rounded border border-blue-100">{imcWeight} kg</span>
                    <span>180 kg</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Altura do Paciente (cm)</label>
                  <input
                    id="imc-height"
                    type="range"
                    min="100"
                    max="220"
                    value={imcHeight}
                    onChange={(e) => setImcHeight(parseInt(e.target.value) || 170)}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between items-center text-xs mt-1 font-semibold text-gray-700">
                    <span>100 cm (1m)</span>
                    <span className="bg-blue-50 text-blue-700 text-sm font-bold px-2 py-0.5 rounded border border-blue-100">{imcHeight} cm</span>
                    <span>220 cm (2.2m)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Índices Corpóreos Calculados
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                      IMC (Índice de Massa Corporal)
                    </span>
                    <p className="text-3xl font-black text-blue-600 font-mono mt-1">
                      {calculateIMCAndBSA().imc}
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium font-sans">kg / m²</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                      Superfície Corporal (BSA)
                    </span>
                    <p className="text-3xl font-black text-gray-800 font-mono mt-1">
                      {calculateIMCAndBSA().bsa}
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium font-sans">m² (Mosteller)</span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border text-xs font-bold text-center ${
                  getIMCClassification(parseFloat(calculateIMCAndBSA().imc)).class
                }`}>
                  Classificação de Risco: {getIMCClassification(parseFloat(calculateIMCAndBSA().imc)).label}
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-sans bg-white p-2.5 rounded-lg border border-gray-100 mt-1">
                  💡 A <strong>Superfície Corporal (BSA)</strong> é amplamente utilizada no cálculo e refinamento de quimioterápicos, imunobiológicos e no ajuste hemodinâmico por índice cardíaco na UTI.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-400">ANTROPOMETRIA INTERATIVA</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Parkland Formula for burns */}
        {activeCalc === 'parkland' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Parâmetros de Emergência
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Fórmula de Parkland para Queimados</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Peso do Paciente (kg)</label>
                  <input
                    id="parkland-weight-input"
                    type="number"
                    value={parklandWeight}
                    onChange={(e) => setParklandWeight(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full text-sm font-bold text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">
                    Superfície Corporal Queimada (SCQ): <span className="text-blue-600 font-bold">{parklandPercent}%</span>
                  </label>
                  <input
                    id="parkland-percent-range"
                    type="range"
                    min="1"
                    max="100"
                    value={parklandPercent}
                    onChange={(e) => setParklandPercent(parseInt(e.target.value) || 0)}
                    className="w-full accent-blue-600"
                  />
                  <span className="text-[10px] text-gray-400 block mt-1 leading-normal">
                    Área total acometida com queimaduras de 2º e 3º graus (estimada pela Regra dos Nove de Wallace ou Tabela de Lund-Browder).
                  </span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Volume de Hidratação 24h
                </span>

                <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">
                    Volume Total Cristaloide (Ringer Lactato)
                  </span>
                  <p className="text-3xl font-black text-blue-400 mt-1 font-mono">
                    {calculateParkland().totalMl} <span className="text-sm font-normal text-white">mL / 24h</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/70">
                    <span className="font-bold text-slate-800 block uppercase text-[9px] tracking-wider text-blue-600">
                      Primeiras 8 horas
                    </span>
                    <p className="font-black text-lg text-gray-900 font-mono mt-1">
                      {calculateParkland().first8h} mL
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium">Vazão da Bomba: <strong>{calculateParkland().rate8h} mL/h</strong></span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/70">
                    <span className="font-bold text-slate-800 block uppercase text-[9px] tracking-wider text-gray-500">
                      16 horas seguintes
                    </span>
                    <p className="font-black text-lg text-gray-900 font-mono mt-1">
                      {calculateParkland().next16h} mL
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium">Vazão da Bomba: <strong>{calculateParkland().rate16h} mL/h</strong></span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-normal bg-amber-50/40 p-2.5 rounded-lg border border-amber-100 text-left">
                  ⚠️ <strong>Atenção Clínica:</strong> O tempo é contado a partir do <strong>momento da queimadura</strong> (lesão), e não da entrada no hospital do acidentado. Ajuste a infusão de acordo com o débito urinário alvo (0,5 mL/kg/h).
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-400">EMERGÊNCIA E RESTAURAÇÃO VOLÊMICA</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: QTc Corrected Interval */}
        {activeCalc === 'qtc' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Cardiologia & Eletrocardiograma
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Intervalo QTc Corrigido</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Intervalo QT Original (milisegundos - ms)</label>
                  <input
                    id="qt-input"
                    type="number"
                    value={qtcQtMs}
                    onChange={(e) => setQtcQtMs(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full text-sm font-bold text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Ex: 380"
                  />
                  <span className="text-[10px] text-gray-400 block mt-1">
                    Defina o valor em ms medido do início da onda Q ao final da onda T no ECG.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Frequência Cardíaca (bpm)</label>
                  <input
                    id="qtc-hr-input"
                    type="number"
                    value={qtcHr}
                    onChange={(e) => setQtcHr(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full text-sm font-bold text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Ex: 75"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Valor Corrigido do Eletrocardiógrafo
                </span>

                <div className="bg-white p-5 rounded-xl border border-gray-200/60 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                    QTc Corrigido (Fórmula de Bazett)
                  </span>
                  <p className="text-4xl font-black text-blue-600 font-mono mt-1.5">
                    {calculateQTc()} <span className="text-base font-normal text-gray-500 font-sans">ms</span>
                  </p>
                </div>

                <div className={`p-3.5 rounded-xl border text-xs font-bold text-center ${
                  getQTcClassification(parseFloat(calculateQTc())).class
                }`}>
                  {getQTcClassification(parseFloat(calculateQTc())).label}
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-sans bg-white p-3 rounded-lg border border-gray-100">
                  ⚠️ <strong>Risco de Arritmias:</strong> Um intervalo QTc prolongado (e.g. &gt; 500ms) aumenta consideravelmente o risco de induzir taquicardia ventricular polimórfica (Torsades de Pointes). Vigiar e suspender medicamentos prolongadores de QT (Amiodarona, Haloperidol, Azitromicina).
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-400">ECG CRÍTICO INTERATIVO</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Bicarbonate Deficit */}
        {activeCalc === 'bicarbonate' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Gasometria & Equilíbrio Ácido-Básico
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Déficit de Bicarbonato</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Gênero do Paciente</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="gender-bic-male"
                      onClick={() => setBicGender('male')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition ${
                        bicGender === 'male' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 font-sans' 
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      Masculino (fator 0.6)
                    </button>
                    <button
                      id="gender-bic-female"
                      onClick={() => setBicGender('female')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition ${
                        bicGender === 'female' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 font-sans' 
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      Feminino (fator 0.5)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Peso (kg)</label>
                    <input
                      id="bic-weight-input"
                      type="number"
                      value={bicWeight}
                      onChange={(e) => setBicWeight(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full text-sm font-bold text-gray-900 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Bic Atual (mEq/L)</label>
                    <input
                      id="bic-actual"
                      type="text"
                      value={bicActual}
                      onChange={(e) => setBicActual(e.target.value.replace(',', '.'))}
                      className="w-full text-sm font-bold text-gray-900 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Bic Alvo (padrão mEq/L)</label>
                  <input
                    id="bic-target-input"
                    type="text"
                    value={bicTarget}
                    onChange={(e) => setBicTarget(e.target.value.replace(',', '.'))}
                    className="w-full text-sm font-bold text-gray-900 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Resultados Estimados de Amortecimento
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wide block">
                      Déficit Estimado Total
                    </span>
                    <p className="text-3xl font-black text-blue-600 font-mono mt-1">
                      {calculateBicarbonate().deficitMeq}
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium">mEq de HCO₃⁻</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wide block">
                      Bicarbonato Sódio 8.4%
                    </span>
                    <p className="text-3xl font-black text-gray-800 font-mono mt-1">
                      {calculateBicarbonate().ampoules10ml}
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium font-sans">Ampolas de 10mL (10 mEq)</span>
                  </div>
                </div>

                <div className="text-xs text-gray-600 leading-relaxed font-sans bg-white p-3.5 rounded-lg border border-gray-100 space-y-1.5">
                  <p><strong>Orientação de Reposição Segura:</strong></p>
                  <p>Não reponha o déficit total agressivamente de uma só vez devido ao risco de alcalose paradoxal do LCR e hipernatremia severa. Geralmente, infunde-se apenas <strong>metade do total calculado</strong> de forma lenta (1 a 2 horas) e reavalia-se em nova gasometria arterial.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-400">ACOMPANHAMENTO METABÓLICO</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Maintenance fluid / Dieta zero */}
        {activeCalc === 'maintenance_fluid' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Prescrições e Soluções Basais
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Soro de Manutenção | Dieta Zero</h3>
                <p className="text-gray-500 text-xs mt-1 leading-normal">
                  Ideal para hidratação basal fisiológica segura nas primeiras 24 horas de internamento refratário.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1.5">Restrição Hídrica do Paciente</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="fluid-rest-none"
                      onClick={() => setFluidRestriction('none')}
                      className={`py-2.5 px-3 text-xs font-bold rounded-lg border text-center transition ${
                        fluidRestriction === 'none' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700' 
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      Sem Restrição (Padrão)
                    </button>
                    <button
                      id="fluid-rest-restricted"
                      onClick={() => setFluidRestriction('restricted')}
                      className={`py-2.5 px-3 text-xs font-bold rounded-lg border text-center transition ${
                        fluidRestriction === 'restricted' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700' 
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      Com Restrição (ICC / IR)
                    </button>
                  </div>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg border border-gray-150 flex items-center justify-between">
                  <div className="pr-3">
                    <span className="text-xs font-bold text-gray-800 block">Adicionar Potássio (KCl 19,1%)?</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5 leading-normal">
                      Inclui 1 ampola (10mL = 25mEq) para prevenção de hipocalemia iatrogênica em jejum.
                    </span>
                  </div>
                  <input
                    id="checkbox-fluid-potassium"
                    type="checkbox"
                    checked={fluidIncludeK}
                    onChange={(e) => setFluidIncludeK(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-350 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Prescrição Médica Prática
                </span>

                <div className="bg-white p-4.5 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    COMPOSIÇÃO DO SORO
                  </span>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-white font-mono text-xs mt-2 leading-relaxed">
                    <p className="text-blue-300 font-bold font-sans"># Dieta Zero + Hidratação Basal:</p>
                    <p className="mt-1">● Soro Glicosado 5% (SG 5%) ------ 1000 mL</p>
                    <p>● Cloreto de Sódio 20% (NaCl 20%) -- 40 mL</p>
                    {fluidIncludeK && <p className="text-yellow-250">● Cloreto de Potássio 19.1% (KCl 19.1%) - 10 mL</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wide">
                      VAZÃO DA BOMBA (BIC)
                    </span>
                    <p className="text-2xl font-black text-blue-600 font-mono mt-1">
                      {calculateMaintenanceFluid().rate} <span className="text-xs font-bold text-gray-500">mL/h</span>
                    </p>
                    <span className="text-[10px] text-gray-500 font-semibold">{calculateMaintenanceFluid().frequency}</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wide">
                      META DIÁRIA TOTAL
                    </span>
                    <p className="text-2xl font-black text-gray-800 font-mono mt-1">
                      {calculateMaintenanceFluid().volumeTotalDay} <span className="text-xs font-bold text-gray-500">mL/dia</span>
                    </p>
                    <span className="text-[10px] text-gray-500 font-semibold">Volume fisiológico basal</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-normal bg-blue-50/40 p-2.5 rounded-lg border border-blue-100">
                  ⚡ <strong>Aviso Clínico:</strong> Soro glicosado a 5% garante calorias essenciais para silenciar o catabolismo proteico durante o jejum. NaCl a 20% combate a hiponatremia dilucional secundária. KCl 19,1% opcional é evitado em insuficiência renal aguda oligúrica ou hipercalemia de base.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-400">SORO BASAL HIDRATAÇÃO</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: Sodium Correction (Adrogué-Madias) */}
        {activeCalc === 'sodium_correction' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
            <div className="md:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Distúrbios Eletrolíticos Graves
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Correção de Sódio (Adrogué-Madias)</h3>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                  Calculadora baseada na consagrada fórmula de Adrogué-Madias para orientar a infusão de soluções salinas hipertônicas ou reposições de água livre em hiponatremia/hipernatremia.
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">Gênero Biológico</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        id="gender-na-male"
                        onClick={() => setSodiumGender('male')}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition ${
                          sodiumGender === 'male' 
                            ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        Masc
                      </button>
                      <button
                        id="gender-na-female"
                        onClick={() => setSodiumGender('female')}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition ${
                          sodiumGender === 'female' 
                            ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        Fem
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">Grupo de Idade</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        id="age-na-adult"
                        onClick={() => setSodiumAgeGroup('adult')}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition ${
                          sodiumAgeGroup === 'adult' 
                            ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        Adulto
                      </button>
                      <button
                        id="age-na-elderly"
                        onClick={() => setSodiumAgeGroup('elderly')}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition ${
                          sodiumAgeGroup === 'elderly' 
                            ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        Idoso
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-650 block mb-1">Peso (kg)</label>
                    <input
                      id="sodium-weight-input"
                      type="number"
                      value={sodiumWeight}
                      onChange={(e) => setSodiumWeight(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full text-xs font-bold text-gray-950 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-650 block mb-1">Na⁺ Soro (mEq/L)</label>
                    <input
                      id="sodium-actual-input"
                      type="number"
                      value={sodiumActual}
                      onChange={(e) => setSodiumActual(e.target.value)}
                      className="w-full text-xs font-bold text-gray-950 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-650 block mb-1">Na⁺ Alvo (mEq/L)</label>
                    <input
                      id="sodium-target-input"
                      type="number"
                      value={sodiumTarget}
                      onChange={(e) => setSodiumTarget(e.target.value)}
                      className="w-full text-xs font-bold text-gray-950 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1.5">Solução de Reposição Escolhida</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'nacl3', label: 'NaCl 3% (Hipertônica)', desc: '513 mEq/L • Alvo Hiponatremia' },
                      { id: 'nacl09', label: 'NaCl 0,9% (Fisiológica)', desc: '154 mEq/L • Alvo Hipovolemia' },
                      { id: 'sg5', label: 'Soro Glicosado 5% (SG5%)', desc: '0 mEq/L • Alvo Hipernatremia' },
                      { id: 'water', label: 'Água Livre (Enteral/SNG)', desc: '0 mEq/L • Alvo Hipernatremia' }
                    ].map((sol) => (
                      <button
                        key={sol.id}
                        id={`sodium-sol-${sol.id}`}
                        onClick={() => setSodiumInfusate(sol.id as any)}
                        className={`p-2 rounded-lg border text-left transition ${
                          sodiumInfusate === sol.id 
                            ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold' 
                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <p className="font-bold text-[11px] leading-tight">{sol.label}</p>
                        <p className="text-[9.5px] text-gray-400 mt-0.5 leading-none font-sans font-normal">{sol.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Resultados e Metas de Infusão
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <div className="bg-white p-3 border border-gray-200/60 rounded-xl shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 block font-mono">ÁGUA CORPORAL TOTAL (ACT)</span>
                    <p className="text-2xl font-black text-gray-800 font-mono mt-0.5">
                      {calculateSodiumCorrection().act}
                    </p>
                    <span className="text-[9.5px] text-gray-500 font-medium font-sans">Litros de líquido total</span>
                  </div>

                  <div className="bg-white p-3 border border-gray-200/60 rounded-xl shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 block font-mono">Δ NA⁺ POR 1 LITER DE SOLUÇÃO</span>
                    <p className="text-2xl font-black text-blue-600 font-mono mt-0.5">
                      {calculateSodiumCorrection().deltaNa}
                    </p>
                    <span className="text-[9.5px] text-gray-500 font-medium font-sans">mEq/L de variação de Sódio</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3.5">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block font-mono">VOLUME SUGERIDO DE SOLUÇÃO (TOTAL)</span>
                    <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                      {calculateSodiumCorrection().volumeTotal} <span className="text-sm font-medium font-sans text-gray-500">mL de {calculateSodiumCorrection().infusateLabel.split('(')[0]}</span>
                    </p>
                  </div>

                  <div className="border-t border-gray-150 pt-2.5">
                    <span className="text-[10px] font-bold text-blue-600 block font-mono">LIMITE SEGURO DE SEGURANÇA 24h (Meta max. 8 mEq/L)</span>
                    <p className="text-lg font-black text-blue-800 font-mono mt-0.5">
                      {calculateSodiumCorrection().volumeSafe24h} mL <span className="text-xs font-semibold font-sans text-blue-600">em 24 horas</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-sans">
                      Calculado automaticamente para respeitar o limite conservador de variação de sódio em 24h para prevenir mielinólise pontina. correr a vasão correspondente a <strong className="text-gray-900 font-mono">{(calculateSodiumCorrection().volumeSafe24h / 24).toFixed(1)} mL/h</strong> em BIC.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-xl text-rose-900 text-xs space-y-1">
                  <p className="font-bold uppercase font-mono text-[10px] text-rose-700">🚫 PRINCÍPIOS DE EXTREMA VIGILÂNCIA</p>
                  <p className="font-medium font-sans leading-relaxed">
                    A velocidade de infusão máxima para NaCl 3% recomendada em condições gerais é de **50 a 100 mL/h** em central. Coletar eletrólitos de controle estritamente de **4 em 4 horas** e interromper imediatamente a solução caso atinja o limite ou cessem os sintomas neurológicos agudos graves.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-400">VARIAÇÃO ADROGUÉ-MADIAS</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: Ventilator Setup & PBW Calculations */}
        {activeCalc === 'vent_pbw' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
            <div className="md:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Suporte Ventilatório UTI
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">PBW e Ventilação Protetora</h3>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed border-b pb-3 border-gray-100">
                  Evite o volutrauma em pacientes obesos ou de pequena estatura. Programe os volumes correntes do ventilador mecânico baseados estritamente em **Peso Corporal Predito (PBW)** calculado a partir da altura, e nunca pelo peso real.
                </p>
              </div>

              <div className="space-y-4 pt-1">
                {/* 1. GENDER Selector */}
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">Gênero Biológico do Paciente</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="gender-vent-male"
                      onClick={() => setVentGender('male')}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition ${
                        ventGender === 'male' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Masculino (Base 50kg)
                    </button>
                    <button
                      id="gender-vent-female"
                      onClick={() => setVentGender('female')}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition ${
                        ventGender === 'female' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Feminino (Base 45.5kg)
                    </button>
                  </div>
                </div>

                {/* 2. HEIGHT Selector */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-650 block">Altura do Paciente (cm)</label>
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {ventHeight} cm ({(ventHeight / 100).toFixed(2)} m)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      id="vent-height-slider"
                      type="range"
                      min="130"
                      max="210"
                      value={ventHeight}
                      onChange={(e) => setVentHeight(parseInt(e.target.value))}
                      className="flex-1 accent-blue-600 cursor-pointer"
                    />
                    <input
                      id="vent-height-input"
                      type="number"
                      min="130"
                      max="210"
                      value={ventHeight}
                      onChange={(e) => setVentHeight(Math.max(130, Math.min(210, parseInt(e.target.value) || 170)))}
                      className="w-16 text-center text-xs font-bold text-slate-900 border p-1.5 focus:outline-none rounded-lg"
                    />
                  </div>
                </div>

                {/* 3. CLINICAL SCENARIO PROFILE */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-600 block">Perfil Clínico de Ventilação</label>
                    <span className="text-[9px] font-mono text-emerald-650 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase">
                      Manual Atualizado
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'padrao', label: 'Padrão', desc: 'Pulmão Normal', color: 'blue' },
                      { id: 'obstrutivo', label: 'Asma / DPOC', desc: 'Prevenir AutoPEEP', color: 'amber' },
                      { id: 'sara', label: 'SARA / ARDS', desc: 'Pulmão Duro', color: 'rose' }
                    ].map((scen) => (
                      <button
                        key={scen.id}
                        onClick={() => {
                          setVentScenario(scen.id as any);
                          // Auto sets standard recommended starting volume factors
                          if (scen.id === 'sara') {
                            setVentVolFactor(5);
                          } else {
                            setVentVolFactor(6);
                          }
                        }}
                        className={`p-2 rounded-xl border text-center transition flex flex-col justify-center items-center h-16 ${
                          ventScenario === scen.id 
                            ? scen.id === 'padrao' 
                              ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold ring-1 ring-blue-105'
                              : scen.id === 'obstrutivo'
                                ? 'bg-amber-50 border-amber-300 text-amber-950 font-bold ring-1 ring-amber-105'
                                : 'bg-rose-50 border-rose-300 text-rose-950 font-bold ring-1 ring-rose-105'
                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-55 shadow-sm'
                        }`}
                      >
                        <span className="font-bold text-[11px] leading-tight shrink-0">{scen.label}</span>
                        <span className="text-[9px] text-gray-400 mt-0.5 leading-none font-sans font-normal">{scen.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. MODE Selector */}
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">Modo de Programação Principal</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setVentMode('vcv')}
                      className={`py-1.5 px-3 text-xs font-bold rounded-lg border text-center transition ${
                        ventMode === 'vcv' 
                          ? 'bg-slate-800 border-slate-800 text-white shadow shadow-slate-300' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      VCV (Volume Controlado)
                    </button>
                    <button
                      onClick={() => setVentMode('pcv')}
                      className={`py-1.5 px-3 text-xs font-bold rounded-lg border text-center transition ${
                        ventMode === 'pcv' 
                          ? 'bg-slate-800 border-slate-800 text-white shadow shadow-slate-300' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      PCV (Pressão Controlada)
                    </button>
                  </div>
                </div>

                {/* 5. VOLUME FACTOR Selector */}
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">Ajuste Corrente Alvo (mL/kg PBW)</label>
                  <div className="grid grid-cols-5 gap-1 select-none">
                    {[4, 5, 6, 7, 8].map((factor) => (
                      <button
                        key={factor}
                        id={`vent-factor-${factor}`}
                        onClick={() => setVentVolFactor(factor)}
                        className={`py-2 text-xs font-bold rounded-lg border text-center transition ${
                          ventVolFactor === factor 
                            ? 'bg-blue-600 border-blue-600 text-white shadow shadow-blue-200' 
                            : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        {factor}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block leading-tight">
                    Geralmente indica-se **4 a 5 mL/kg** em SARA, e **6 mL/kg** em condições gerais (Padrão e Obstrutivo).
                  </span>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="md:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Configurações Protetoras de Volume
                </span>

                {/* PBW and Target Volume cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <div className="bg-white p-3 border border-gray-200/60 rounded-xl shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 block font-mono">PESO PREDITO (PBW)</span>
                    <p className="text-3xl font-black text-slate-850 font-mono mt-0.5">
                      {calculateVentPbw().pbw}
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium">kg de peso ideal predito</span>
                  </div>

                  <div className="bg-white p-3 border border-orange-200 rounded-xl shadow-sm bg-orange-50/20">
                    <span className="text-[10px] font-bold text-orange-650 block font-mono uppercase">VOLUME CORRENTE ALVO (VC)</span>
                    <p className="text-3xl font-black text-orange-600 font-mono mt-0.5">
                      {calculateVentPbw().activeTidal}
                    </p>
                    <span className="text-[10px] text-orange-500 font-semibold">mL (com {ventVolFactor} mL/kg)</span>
                  </div>
                </div>

                {/* Ventilation Parameters Display according to the selected clinical profile */}
                <div className="bg-white p-4.5 rounded-xl border border-blue-100 shadow-sm space-y-4">
                  <div className="border-b pb-2 flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-blue-500 font-mono p-1 bg-blue-50/70 rounded leading-none">
                        ⚙️ PARÂMETROS DO VENTILADOR MECÂNICO
                      </span>
                      <h4 className="text-xs font-bold text-slate-850 mt-1 font-sans">
                        {calculateVentPbw().specs.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-650 border border-slate-200 rounded-full px-2 py-0.5 uppercase bg-slate-50">
                      Modo {ventMode.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-550 leading-relaxed font-sans mt-1.5 italic">
                    {calculateVentPbw().specs.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {/* Volume Corrente */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="text-[9.5px] font-bold text-slate-400 block uppercase font-mono">1. Volume Corrente (VC)</span>
                      <p className="text-base font-extrabold text-slate-800 font-sans mt-0.5">
                        {calculateVentPbw().activeTidal} mL
                      </p>
                      <span className="text-[9.5px] text-slate-500 block leading-tight font-sans mt-1">
                        {ventMode === 'pcv' 
                          ? 'Ajustar a Pressão de Trabalho (ΔPinsp) para atingir este volume programado.'
                          : `Volume fixo regulado no ventilador (~${ventVolFactor} mL/kg).`
                        }
                      </span>
                    </div>

                    {/* Frequência Respiratória */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="text-[9.5px] font-bold text-slate-400 block uppercase font-mono">2. Freq. Respiratória (FR)</span>
                      <p className="text-base font-extrabold text-slate-800 font-sans mt-0.5">
                        {calculateVentPbw().specs.fr} ipm
                      </p>
                      <span className="text-[9.5px] text-slate-500 block leading-tight font-sans mt-1">
                        Estimativa de Volume Minuto (VM) Alvo: <strong className="text-slate-800 font-mono font-black">{calculateVentPbw().specs.volumeMinuto} L/min</strong>. Adjustar conforme gasometria.
                      </span>
                    </div>

                    {/* PEEP inicial */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="text-[9.5px] font-bold text-slate-400 block uppercase font-mono">3. PEEP Recomendada</span>
                      <p className="text-base font-extrabold text-slate-800 font-sans mt-0.5">
                        {calculateVentPbw().specs.peepVal} cmH₂O
                      </p>
                      <span className="text-[9.5px] text-slate-500 block leading-tight font-sans mt-1">
                        {calculateVentPbw().specs.peepDesc}
                      </span>
                    </div>

                    {/* Fluxo ou Ti */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="text-[9.5px] font-bold text-slate-400 block uppercase font-mono">4. Dinâmica Inspiratória</span>
                      <p className="text-base font-extrabold text-slate-800 font-sans mt-0.5">
                        {ventMode === 'vcv' ? calculateVentPbw().specs.fluxo : `Ti: ${calculateVentPbw().specs.ti}`}
                      </p>
                      <span className="text-[10px] text-slate-800 font-black block font-mono">
                        Relação I:E desejada ~ {calculateVentPbw().specs.ieRatio}
                      </span>
                      <span className="text-[9.5px] text-slate-500 block leading-tight font-sans mt-1.5">
                        {calculateVentPbw().specs.fluxoDesc}
                      </span>
                    </div>

                    {/* FiO2 Inicial */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="text-[9.5px] font-bold text-slate-400 block uppercase font-mono">5. FiO₂ Inicial</span>
                      <p className="text-base font-extrabold text-slate-800 font-sans mt-0.5">
                        {calculateVentPbw().specs.fio2}
                      </p>
                      <span className="text-[9.5px] text-slate-500 block leading-tight font-sans mt-1">
                        {calculateVentPbw().specs.fio2Target}
                      </span>
                    </div>

                    {/* Sensibilidade */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <span className="text-[9.5px] font-bold text-slate-400 block uppercase font-mono">6. Sensibilidade (Disparo)</span>
                      <p className="text-base font-extrabold text-slate-800 font-sans mt-0.5">
                        {calculateVentPbw().specs.sens}
                      </p>
                      <span className="text-[9.5px] text-slate-500 block leading-tight font-sans mt-1">
                        {calculateVentPbw().specs.sensDesc}
                      </span>
                    </div>
                  </div>

                  {/* Critical warning banner */}
                  <div className={`p-3 rounded-lg border text-xs leading-relaxed space-y-1 ${
                    ventScenario === 'sara' 
                      ? 'bg-rose-50 border-rose-200 text-rose-955'
                      : ventScenario === 'obstrutivo'
                        ? 'bg-amber-50 border-amber-200 text-amber-955'
                        : 'bg-blue-50 border-blue-200 text-blue-955'
                  }`}>
                    <p className="font-bold flex items-center gap-1.5 uppercase font-mono text-[9.5px]">
                      <Info className="w-3.5 h-3.5" /> ⚠️ Diretrizes importantes do Manual:
                    </p>
                    <p className="font-medium font-sans text-[10.5px]">
                      {calculateVentPbw().specs.aviso}
                    </p>
                  </div>
                </div>

                {/* Safety targets reminders */}
                <div className="bg-blue-50/40 border border-blue-100 p-3.5 rounded-xl text-xs leading-relaxed space-y-1">
                  <p className="font-bold text-blue-800">💡 Alvos de Proteção Alveolar:</p>
                  <p className="font-medium text-slate-700">
                    Mantenha a **Pressão de Platô ≤ 30 cmH₂O** e a **Driving Pressure (DP = Platô − PEEP) &lt; 15 cmH₂O**. Se estes alvos forem ultrapassados, reduza obrigatoriamente o volume corrente em incrementos adicionais (-0.5 a -1 mL/kg PBW).
                  </p>
                </div>

                {/* Reference standard factors table */}
                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-100 px-3.5 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                    Tabela de Referência de Volumes (VC) por Fator Alvo
                  </div>
                  <table className="w-full text-left text-[11px] text-slate-700">
                    <thead>
                      <tr className="border-b bg-gray-50 font-bold">
                        <th className="p-2 pl-3">Fator Alvo</th>
                        <th className="p-2">Volume Alvo</th>
                        <th className="p-2 pr-3">Indicação Clínica Standard</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={`border-b hover:bg-slate-50 ${ventVolFactor === 4 ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-2 pl-3 font-semibold font-mono">4 mL/kg</td>
                        <td className="p-2 font-mono font-bold text-slate-900">{calculateVentPbw().tidal4} mL</td>
                        <td className="p-2 text-rose-650 font-medium leading-tight text-[10.5px]">SARA Severa / Protocolo de Hipercapnia Permissiva Extrema</td>
                      </tr>
                      <tr className={`border-b hover:bg-slate-50 ${ventVolFactor === 5 ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-2 pl-3 font-semibold font-mono">5 mL/kg</td>
                        <td className="p-2 font-mono font-bold text-slate-900">{calculateVentPbw().tidal5} mL</td>
                        <td className="p-2 text-amber-650 font-medium leading-tight text-[10.5px]">SARA Moderada / Pulmões de complacência severamente reduzida</td>
                      </tr>
                      <tr className={`border-b hover:bg-slate-50 ${ventVolFactor === 6 ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-2 pl-3 font-semibold font-mono">6 mL/kg</td>
                        <td className="p-2 font-mono font-bold text-slate-900">{calculateVentPbw().tidal6} mL</td>
                        <td className="p-2 text-emerald-650 font-bold leading-tight text-[10.5px]">Padrão Ouro de início para proteção de quase todos os perfis</td>
                      </tr>
                      <tr className={`border-b hover:bg-slate-50 ${ventVolFactor === 7 ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-2 pl-3 font-semibold font-mono">7 mL/kg</td>
                        <td className="p-2 font-mono font-bold text-slate-900">{calculateVentPbw().tidal7} mL</td>
                        <td className="p-2 text-slate-500 leading-tight text-[10.5px]">Volumes limítrofes / Adaptação ou desmame gradual do respirador</td>
                      </tr>
                      <tr className={`hover:bg-slate-50 ${ventVolFactor === 8 ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-2 pl-3 font-semibold font-mono">8 mL/kg</td>
                        <td className="p-2 font-mono font-bold text-slate-900">{calculateVentPbw().tidal8} mL</td>
                        <td className="p-2 text-slate-405 leading-tight text-[10.5px]">Limite fisiológico superior de segurança. Evitar uso prolongado ou na SARA.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action buttons (Prescription Copy & Saved parameters) */}
              <div className="pt-4 border-t border-gray-200 mt-5 flex flex-col sm:flex-row gap-2.5 justify-between items-center bg-gray-50/40 p-2.5 rounded-xl">
                <button
                  id="save-vent-to-history"
                  onClick={saveVentPbwToHistory}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-xl shadow transition duration-150 flex items-center justify-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Salvar de Plantão
                </button>

                <button
                  id="copy-vent-prescription"
                  onClick={() => handleCopyText('vent', 
`# CONFIGURAÇÃO DE VENTILADOR MECÂNICO - UTI
- Altura: ${ventHeight} cm | Gênero: ${ventGender === 'male' ? 'MASCULINO' : 'FEMININO'}
- Peso Predito (PBW): ${calculateVentPbw().pbw} kg
- Perfil Clínico Ventilatório: ${calculateVentPbw().specs.title}
- Modo Programado: ${ventMode.toUpperCase()}

[PARÂMETROS COGENTADOS]
1. Volume Corrente (VC): ${calculateVentPbw().activeTidal} mL (Fator: ${ventVolFactor} mL/kg PBW)
2. Frequência Respiratória (FR): ${calculateVentPbw().specs.fr} ipm (Volume Minuto: ${calculateVentPbw().specs.volumeMinuto} L/min)
3. PEEP Alvo: ${calculateVentPbw().specs.peepVal} cmH₂O
4. Dinâmica Insp.: ${ventMode === 'vcv' ? `Fluxo de ${calculateVentPbw().specs.fluxo}` : `Tempo Insp. de ${calculateVentPbw().specs.ti}`} (Sensibilidade: ${calculateVentPbw().specs.sens})
5. FiO₂ Inicial: ${calculateVentPbw().specs.fio2} (${calculateVentPbw().specs.fio2Target})

[METAS DE PROTEÇÃO PULMONAR]
* Pressão de Platô: ≤ 30 cmH₂O (Manter obrigatoriamente)
* Driving Pressure (Platô - PEEP): < 15 cmH₂O (Alvo < 13 cmH₂O se complacência diminuída)
* SpO₂ de controle: ${calculateVentPbw().specs.fio2Target.split('SpO₂')[1] || 'de acordo com o perfil clínico.'}

* Alerta Clínico Importante: ${calculateVentPbw().specs.aviso}`
                  )}
                  className={`w-full sm:w-auto py-2 px-4 rounded-xl text-xs font-bold font-sans text-center transition shadow-sm ${
                    copiedId === 'vent' 
                      ? 'bg-emerald-600 border border-emerald-600 text-white animate-pulse' 
                      : 'bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {copiedId === 'vent' ? '✓ Configuração Copiada!' : '📋 Copiar Prescrição/Configuração'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 11: Intubação em Sequência Rápida (SRI) */}
        {activeCalc === 'intubacao_sri' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
            <div className="md:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Emergência & Vias Aéreas Críticas
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Sequência Rápida de Intubação (SRI)</h3>
                <p className="text-gray-500 text-xs mt-1 leading-normal">
                  Reduza os riscos de broncoaspiração, hipóxia severa e instabilidade hemodinâmica pós-indução. Selecione o cenário fisiológico correto e o peso para o cálculo das doses exatas.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-655 block">Peso Estimado do Paciente (kg)</label>
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {sriWeight} kg
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      id="sri-weight-slider"
                      type="range"
                      min="35"
                      max="150"
                      value={sriWeight}
                      onChange={(e) => setSriWeight(parseInt(e.target.value))}
                      className="flex-1 accent-blue-600 cursor-pointer"
                    />
                    <input
                      id="sri-weight-input"
                      type="number"
                      value={sriWeight}
                      onChange={(e) => setSriWeight(Math.max(1, parseInt(e.target.value) || 70))}
                      className="w-16 text-center text-xs font-bold text-slate-900 border p-1 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-gray-655 block">Cenário Fisiológico do Paciente</label>
                    <span className="text-[9px] font-mono text-blue-650 bg-blue-50 px-1.5 py-0.5 rounded font-bold uppercase">
                      Drogas Inteligentes
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'padrão', label: 'Padrão / Estável', desc: 'Etomidato + Succinilcolina', color: 'blue' },
                      { id: 'choque', label: 'Choque / Hipotensão', desc: 'Etomidato + Succinilcolina (Não usar Fentanil! Push-Dose)', color: 'rose' },
                      { id: 'asma', label: 'Asmáticos / DPOC', desc: 'Prefira Cetamina ou Propofol + Succinilcolina', color: 'amber' },
                      { id: 'status', label: 'Status Epilepticus', desc: 'Prefira Propofol ou Midazolam', color: 'purple' },
                      { id: 'tce', label: 'TCE / Neuroproteção', desc: 'Etomidato + Rocurônio p/ evitar picos de PIC', color: 'teal' },
                      { id: 'cardio', label: 'Cardiopatia Grave', desc: 'Prefira Etomidato ou Cetamina', color: 'indigo' },
                      { id: 'idoso', label: 'Idosos (Frágil / Sarcopênico)', desc: 'Prefira Etomidato ou Cetamina com dose ajustada', color: 'slate' }
                    ].map((scen) => (
                      <button
                        key={scen.id}
                        id={`sri-scen-${scen.id}`}
                        onClick={() => {
                          setSriScenario(scen.id as any);
                          if (scen.id === 'padrão') {
                            setSriSedativeOverride('etomidato');
                            setSriBlockerOverride('succinilcolina');
                          } else if (scen.id === 'choque') {
                            setSriSedativeOverride('etomidato');
                            setSriBlockerOverride('succinilcolina');
                            setSriFentanilDose(0); // "Não usar Fentanil" from Image 1
                          } else if (scen.id === 'asma') {
                            setSriSedativeOverride('cetamina');
                            setSriBlockerOverride('succinilcolina');
                          } else if (scen.id === 'status') {
                            setSriSedativeOverride('propofol');
                            setSriBlockerOverride('succinilcolina');
                          } else if (scen.id === 'tce') {
                            setSriSedativeOverride('etomidato');
                            setSriBlockerOverride('rocuronio');
                          } else if (scen.id === 'cardio') {
                            setSriSedativeOverride('etomidato');
                            setSriBlockerOverride('rocuronio');
                          } else if (scen.id === 'idoso') {
                            setSriSedativeOverride('etomidato_idoso');
                            setSriBlockerOverride('succinilcolina');
                          }
                        }}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between min-h-[76px] h-auto ${
                          sriScenario === scen.id 
                            ? scen.color === 'blue'
                              ? 'bg-blue-50 border-blue-300 text-blue-955 font-bold ring-1 ring-blue-105 shadow-xs'
                              : scen.color === 'rose'
                                ? 'bg-rose-50 border-rose-300 text-rose-955 font-bold ring-1 ring-rose-105 shadow-xs'
                                : scen.color === 'amber'
                                  ? 'bg-amber-50 border-amber-300 text-amber-955 font-bold ring-1 ring-amber-105 shadow-xs'
                                  : scen.color === 'purple'
                                    ? 'bg-purple-50 border-purple-300 text-purple-955 font-bold ring-1 ring-purple-105 shadow-xs'
                                    : scen.color === 'teal'
                                      ? 'bg-teal-50 border-teal-300 text-teal-955 font-bold ring-1 ring-teal-105 shadow-xs'
                                      : scen.color === 'indigo'
                                        ? 'bg-indigo-50 border-indigo-300 text-indigo-955 font-bold ring-1 ring-indigo-105 shadow-xs'
                                        : 'bg-slate-100 border-slate-350 text-slate-900 font-bold ring-1 ring-slate-105 shadow-xs'
                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-xs'
                        }`}
                      >
                        <span className="font-bold text-[11px] leading-tight text-slate-805">{scen.label}</span>
                        <span className="text-[9.5px] text-gray-400 leading-tight mt-1 font-sans font-normal">{scen.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* PRÉ-MEDICAÇÃO SECTION (Image 2) */}
                <div id="sri-pre-med-section" className="bg-white p-3.5 rounded-xl border border-gray-250/80 space-y-2.5 shadow-xs">
                  <div className="flex justify-between items-center border-b pb-1.5 border-gray-150">
                    <span className="text-xs font-bold text-slate-805">
                      Pré-Medicações Coadjuvantes <span className="text-gray-400 font-normal font-sans">(opcional)</span>
                    </span>
                    <Info className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2.5 mt-1.5">
                    {/* Fentanil Checkbox */}
                    <label id="sri-premed-fentanil" className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer text-xs transition ${
                      sriScenario === 'choque' 
                        ? 'border-gray-100 bg-gray-50/50 text-gray-400 cursor-not-allowed'
                        : sriFentanilDose > 0
                          ? 'border-blue-200 bg-blue-50/20 text-blue-900 font-bold'
                          : 'border-gray-200 bg-white text-gray-750 hover:bg-gray-50'
                    }`}>
                      <input
                        type="checkbox"
                        checked={sriScenario !== 'choque' && sriFentanilDose > 0}
                        disabled={sriScenario === 'choque'}
                        onChange={(e) => {
                          setSriFentanilDose(e.target.checked ? 2 : 0);
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">Fentanil (50 mcg/mL)</span>
                        <span className="text-[10px] text-gray-450 font-sans font-normal leading-tight mt-0.5">Dose: 2 mcg/kg. Fazer lento se hemodinâmica estável. Contraindicado no choque!</span>
                      </div>
                    </label>

                    {/* Lidocaine Checkbox */}
                    <label id="sri-premed-lidocaina" className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer text-xs transition ${
                      sriUseLidocaina
                        ? 'border-blue-200 bg-blue-50/20 text-blue-900 font-bold'
                        : 'border-gray-200 bg-white text-gray-750 hover:bg-gray-50'
                    }`}>
                      <input
                        type="checkbox"
                        checked={sriUseLidocaina}
                        onChange={(e) => setSriUseLidocaina(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">Lidocaína 2% sem vasoconstritor (20 mg/mL)</span>
                        <span className="text-[10px] text-gray-450 font-sans font-normal leading-tight mt-0.5">Dose: 1.5 mg/kg. Mitiga picos pressóricos, reflexo de tosse e hipertensão intracraniana.</span>
                      </div>
                    </label>
                  </div>
                  {sriScenario === 'choque' && (
                    <p className="text-[10px] text-red-650 bg-red-50 p-2.5 rounded border border-red-105 font-medium leading-tight mt-1.5">
                      ⚠️ <strong>Fentanil Contraindicado:</strong> Não utilizar no choque/hipotensão devido ao alto risco de vasoplegia imediata e instabilidade mecânica.
                    </p>
                  )}
                </div>
              </div>

              {/* MANUAL DRUG OVERRIDES SECTION */}
              <div id="sri-manual-drug-override-section" className="bg-white p-3.5 rounded-xl border border-gray-250/80 space-y-2 shadow-xs">
                <div className="flex justify-between items-center border-b pb-1.5 border-gray-100">
                  <span className="text-xs font-bold text-slate-805">
                    Ajuste de Drogas Personalizadas 
                  </span>
                  <span className="text-[9.5px] font-mono text-emerald-650 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    Sincronizado
                  </span>
                </div>

                <div className="flex flex-col gap-3.5 mt-2">
                  {/* Sedative Selector */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-550 block mb-1 font-sans">
                      1. INDUTOR (SEDATIVO)
                    </label>
                    <select
                      id="sri-sedative-override-select"
                      value={sriSedativeOverride}
                      onChange={(e) => setSriSedativeOverride(e.target.value)}
                      className="w-full text-xs font-bold text-slate-850 border border-gray-250 p-2.5 rounded-lg bg-white hover:bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none transition cursor-pointer"
                    >
                      <option value="etomidato">Etomidato (0.3 mg/kg)</option>
                      <option value="etomidato_idoso">Etomidato Ajuste Idosos (0.15 mg/kg)</option>
                      <option value="cetamina">Cetamina (1.5 mg/kg)</option>
                      <option value="propofol">Propofol (1.5 mg/kg)</option>
                      <option value="midazolam">Midazolam (0.2 mg/kg)</option>
                    </select>
                  </div>

                  {/* Blocker Selector */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-550 block mb-1 font-sans">
                      2. BLOQUEADOR NEUROMUSCULAR
                    </label>
                    <select
                      id="sri-blocker-override-select"
                      value={sriBlockerOverride}
                      onChange={(e) => setSriBlockerOverride(e.target.value)}
                      className="w-full text-xs font-bold text-slate-850 border border-gray-250 p-2.5 rounded-lg bg-white hover:bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none transition cursor-pointer"
                    >
                      <option value="succinilcolina">Succinilcolina (1.5 mg/kg)</option>
                      <option value="rocuronio">Rocurônio (1.2 mg/kg)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* General Results for SRI */}
            <div className="md:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                    Plano Farmacológico e Conduta
                  </span>
                  <button
                    id="save-sri-hist"
                    onClick={saveSriToHistory}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white border px-2.5 py-1 rounded-lg shadow-sm hover:bg-gray-50 transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Salvar Histórico
                  </button>
                </div>

                {/* Passo 0: Coadjuvantes / Pré-Medicação (Image 2) */}
                {(calculateSri().fentanilDoseMcs > 0 || calculateSri().lidocainaDoseMg > 0) && (
                  <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                    <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider block font-mono">
                      PASSO 0: COADJUVANTES / PRÉ-MEDICAÇÃO (Opcional)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 border-t border-gray-100 pt-2 text-xs">
                      {calculateSri().fentanilDoseMcs > 0 && (
                        <div className="space-y-1">
                          <p className="font-bold text-slate-800">Fentanil (50 mcg/mL):</p>
                          <p className="font-mono text-sm font-black text-slate-900">
                            Dose: {calculateSri().fentanilDoseMcs} mcg <span className="text-blue-600 font-bold">({calculateSri().fentanilVolMl} mL)</span>
                          </p>
                          <span className="text-[9.5px] text-gray-400 block leading-tight font-sans">Fornece analgesia e bloqueio reflexo de hiperatividade autonômica.</span>
                        </div>
                      )}
                      {calculateSri().lidocainaDoseMg > 0 && (
                        <div className="space-y-1">
                          <p className="font-bold text-slate-800">Lidocaína 2% s/vc (20 mg/mL):</p>
                          <p className="font-mono text-sm font-black text-slate-900">
                            Dose: {calculateSri().lidocainaDoseMg} mg <span className="text-blue-600 font-bold">({calculateSri().lidocainaVolMl} mL)</span>
                          </p>
                          <span className="text-[9.5px] text-gray-400 block leading-tight font-sans">Opção adjuvante para controle de reflexos de tosse (TCE e Asma).</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sedation */}
                  <div className="bg-white p-4.5 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                    <span className="text-[10px] font-bold text-slate-400 block font-mono uppercase tracking-widest">
                      PASSO 1: INDUÇÃO (SEDATIVO)
                    </span>
                    <p className="text-xl font-extrabold text-blue-700 font-sans mt-1">
                      {calculateSri().sedative}
                    </p>
                    <span className="text-[10px] text-gray-400 font-mono">Concentração: {calculateSri().sedativeConc} | {calculateSri().sedativeDoseRate}</span>
                    
                    <div className="mt-3.5 flex items-baseline gap-1.5 border-t border-gray-100 pt-2.5">
                      <span className="text-xs text-gray-500 font-medium">Dose:</span>
                      <p className="text-2xl font-black text-gray-900 font-mono">
                        {calculateSri().sedativeMg} <span className="text-sm font-semibold">mg</span>
                      </p>
                    </div>
                    <p className="text-sm font-black text-blue-600 font-mono">
                      ➔ Volume: {calculateSri().sedativeMl} mL EV <span className="text-xs font-medium font-sans text-gray-400">(Seringa)</span>
                    </p>

                    <p className="text-[10px] text-gray-550 mt-3 font-medium bg-gray-50 p-2 rounded-lg border border-gray-100/60 leading-relaxed font-sans">
                      {calculateSri().sedativeDesc}
                    </p>
                  </div>

                  {/* Muscle Blocker */}
                  <div className="bg-white p-4.5 rounded-xl border border-rose-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                    <span className="text-[10px] font-bold text-rose-400 block font-mono uppercase tracking-widest">
                      PASSO 2: BLOQUEIO NEUROMUSCULAR
                    </span>
                    <p className="text-xl font-extrabold text-rose-700 font-sans mt-1">
                      {calculateSri().blocker}
                    </p>
                    <span className="text-[10px] text-gray-400 font-mono">Concentração: {calculateSri().blockerConc} | {calculateSri().blockerDoseRate}</span>
                    
                    <div className="mt-3.5 flex items-baseline gap-1.5 border-t border-gray-100 pt-2.5">
                      <span className="text-xs text-gray-500 font-medium">Dose:</span>
                      <p className="text-2xl font-black text-gray-900 font-mono">
                        {calculateSri().blockerMg} <span className="text-sm font-semibold">mg</span>
                      </p>
                    </div>
                    <p className="text-sm font-black text-rose-600 font-mono">
                      ➔ Volume: {calculateSri().blockerMl} mL EV <span className="text-xs font-medium font-sans text-gray-400">(Seringa)</span>
                    </p>

                    <p className="text-[10px] text-gray-550 mt-3 font-medium bg-gray-50 p-2 rounded-lg border border-gray-100/60 leading-relaxed font-sans">
                      {calculateSri().blockerDesc}
                    </p>
                  </div>
                </div>

                {/* Adrenaline Push-Dose recommendation for Choque/Instável (Image 1) */}
                {calculateSri().adrenalinePushPrompt && (
                  <div id="sri-adrenaline-push-card" className="bg-rose-50 border border-rose-205 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-rose-800">
                      <Flame className="w-4 h-4 text-rose-600 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-wider font-mono">
                        PUSH-DOSES DE ADRENALINA (Hemodinâmica do Choque)
                      </span>
                    </div>
                    <p className="text-[11px] text-rose-950 font-medium leading-relaxed font-sans">
                      O paciente encontra-se no perfil de <strong>Choque / Hipotensão</strong>. Conforme as diretrizes, providencie Push-Doses de Adrenalina na cabeceira de imediato para resgate em caso de hipotensão induzida:
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-rose-100 text-[10.5px] text-slate-800 space-y-1.5 font-sans leading-normal">
                      <p className="font-bold text-rose-700">🩺 Preparação da Solução Calibrada (10 mcg/mL):</p>
                      <ol className="list-decimal pl-4 text-slate-650 space-y-1">
                        <li>Aspire <strong>1 mL (1 Ampola = 1 mg)</strong> de Adrenalina pura e complete com <strong>9 mL de SF 0,9%</strong> em uma seringa de 10 mL (Concentração de 100 mcg/mL).</li>
                        <li>Dessa seringa, aspire apenas <strong>1 mL</strong> e transfira para outra seringa de 10 mL, completando-a novamente com mais <strong>9 mL de SF 0,9%</strong>.</li>
                        <li>A seringa final possui uma concentração terapêutica ideal de <strong>10 mcg / mL</strong>.</li>
                      </ol>
                      <p className="font-bold text-slate-900 mt-1">
                        ➔ Aplicação Reativa: Fazer de <span className="text-rose-600 font-mono font-bold">0.5 a 2.0 mL EV</span> (equivalente a 5 a 20 mcg) a cada 2 a 5 minutos conforme necessário para estabilizar PAM.
                      </p>
                    </div>
                  </div>
                )}

                {/* Checklist de IOT */}
                <div className="bg-slate-900 text-white rounded-xl p-4.5 font-sans border border-slate-800 shadow-sm">
                  <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider block font-mono">
                    CHECKLIST OPERACIONAL SEGURO DE PLANTÃO (7 Ps da IOT)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5 text-xs text-slate-300 font-sans">
                    <p>● <strong>Preparação:</strong> Laringo testado, Cânulas (7.5-8.0), Fio guia, Aspiração e Ambu operacionais.</p>
                    <p>● <strong>Pré-oxigenação:</strong> 3 a 5 min em O2 a 100% (evite hiperventilação de bochechas se estômago cheio).</p>
                    <p>● <strong>Pré-otimização:</strong> Tratar choque vigorosamente com fluidos/drogas vasoativas antes do bólus.</p>
                    <p>● <strong>Posicionamento:</strong> Coxim occipital para alinhamento dos eixos (Olhar "snifando").</p>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 text-[11px] text-slate-700 leading-normal font-sans">
                  🛡️ <strong>Pós-Intubação Obrigatório:</strong> Confirmar posicionamento pelo capnógrafo ou asculta simétrica bilateral. Fixar o tubo e iniciar sedoanalgesia de manutenção contínua, mantendo cabeceira suspensa a 30° para prevenção de PAV (Pneumonia Associada à Ventilação).
                </div>
              </div>

              {/* Action trigger copy */}
              <div className="pt-4 border-t border-gray-200/60 mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <span className="text-[10px] font-mono text-gray-400 uppercase">DOSEAMENTO CALIBRADO DE VIAS AÉREAS</span>
                <button
                  id="copy-sri-prescription"
                  onClick={() => handleCopyText('sri', 
`# PRESCRIÇÃO MÉDICA - PROTOCOLO DE IOT SEQUÊNCIA RÁPIDA (SRI)
- Peso estimado: ${sriWeight} kg | Cenário do Perfil: ${(sriScenario || 'PADRAO').toUpperCase()}
${calculateSri().fentanilDoseMcs > 0 ? `0. Fentanil (50 mcg/mL): Fazer ${calculateSri().fentanilDoseMcs} mcg (${calculateSri().fentanilVolMl} mL) EV lento opcional de pré-medicação.\n` : ''}${calculateSri().lidocainaDoseMg > 0 ? `0. Lidocaína 2% s/vc (20 mg/mL): Fazer ${calculateSri().lidocainaDoseMg} mg (${calculateSri().lidocainaVolMl} mL) EV lento opcional de pré-medicação.\n` : ''}1. ${calculateSri().sedative} (Indução anestésica): Fazer ${calculateSri().sedativeMg} mg (${calculateSri().sedativeMl} mL) EV em bólus rápido imediato na laringoscopia.
2. ${calculateSri().blocker} (Bloqueio neuromuscular): Fazer ${calculateSri().blockerMg} mg (${calculateSri().blockerMl} mL) EV em bólus rápido injetado logo em seguida.
${calculateSri().adrenalinePushPrompt ? `* ATENÇÃO: Preparar e manter Adrenalina Push-Dose (10 mcg/mL) na cabeceira para uso imediato em caso de hipotensão (fazer 0.5 a 2.0 mL EV reativo).\n` : ''}3. Sedação de Manutenção: Iniciar infusão contínua após a confirmação correta do posicionamento endotraqueal.`
                  )}
                  className={`py-2 px-4 rounded-xl text-xs font-bold font-sans text-center transition shadow-sm ${
                    copiedId === 'sri' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {copiedId === 'sri' ? '✓ Prescrição Copiada!' : 'Copiar Prescrição da Intubação'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 12: Reposição de Potássio e Magnésio */}
        {activeCalc === 'eletrolitos_repo' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
            <div className="md:col-span-12 lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Correção de Distúrbios Iônicos
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Reposição de Potássio / Magnésio</h3>
                <p className="text-gray-500 text-xs mt-1 leading-normal">
                  Corrija hipocalemias e hipomagnesemias críticas que predispõem o paciente à instabilidade elétrica do miocárdio, arritmias helicoidais graves (torsades de pointes) e fraqueza ventilatória.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1.5">Qual Eletrólito Corrigir?</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      id="elec-type-k"
                      onClick={() => setElectrolyteType('K')}
                      className={`py-2.5 px-3 rounded-lg border text-center font-bold tracking-wide transition ${
                        electrolyteType === 'K' 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Potássio (K⁺)
                    </button>
                    <button
                      id="elec-type-mg"
                      onClick={() => setElectrolyteType('Mg')}
                      className={`py-2.5 px-3 rounded-lg border text-center font-bold tracking-wide transition ${
                        electrolyteType === 'Mg' 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Magnésio (Mg²⁺)
                    </button>
                  </div>
                </div>

                {electrolyteType === 'K' ? (
                  <div>
                    <label className="text-xs font-bold text-gray-650 block mb-1">Potássio Sérico Atual (mEq/L)</label>
                    <input
                      id="k-value-input"
                      type="text"
                      value={kValue}
                      onChange={(e) => setKValue(e.target.value.replace(',', '.'))}
                      placeholder="e.g. 2.8"
                      className="w-full text-sm font-bold text-slate-900 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-gray-400 leading-tight mt-1 block font-sans">
                      Faixa normal: **3,5 a 5,0 mEq/L**. Valores abaixo de 3,0 mEq/L sutilmente geram alto risco de parada cardiorrespiratória em UTI.
                    </span>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold text-gray-650 block mb-1">Magnésio Sérico Atual (mEq/L)</label>
                    <input
                      id="mg-value-input"
                      type="text"
                      value={mgValue}
                      onChange={(e) => setMgValue(e.target.value.replace(',', '.'))}
                      placeholder="e.g. 1.2"
                      className="w-full text-sm font-bold text-slate-900 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-gray-400 leading-tight mt-1 block font-sans">
                      Faixa normal: **1,6 a 2,3 mEq/L**. Hipomagnesemia refratária impede a absorção e correção celular do potássio.
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-650 block">Peso do Paciente (kg)</label>
                    <span className="text-xs font-mono font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      {electrolyteWeight} kg
                    </span>
                  </div>
                  <input
                    id="elec-weight-slider"
                    type="range"
                    min="40"
                    max="140"
                    value={electrolyteWeight}
                    onChange={(e) => setElectrolyteWeight(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Electrolytes Results layout */}
            <div className="md:col-span-12 lg:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                    Protocolo de Infusão Segura
                  </span>
                  <button
                    id="save-elec-hist"
                    onClick={saveElectrolytesToHistory}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white border px-2.5 py-1 rounded-lg shadow-sm hover:bg-gray-50 transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Salvar Histórico
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Verdict */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">CLASSIFICAÇÃO DO GRAU</span>
                    <p className="text-lg font-bold text-slate-800 font-sans mt-1">
                      {calculateElectrolytes().severityLabel}
                    </p>
                  </div>

                  {/* Via de escolha */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">VIA SUGERIDA</span>
                    <p className="text-xs font-bold text-blue-800 font-sans mt-2 bg-blue-50/50 p-1 rounded-md border border-blue-100">
                      {calculateElectrolytes().route}
                    </p>
                  </div>
                </div>

                {/* Recipe Prescription */}
                {calculateElectrolytes().composition !== 'N/A' ? (
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 block font-mono uppercase tracking-widest">RECEITA DE PRESCRIÇÃO DILUÍDA</span>
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-white font-mono text-xs mt-2 leading-relaxed">
                      <p className="text-blue-300 font-bold font-sans"># Reposição parenteral de {electrolyteType === 'K' ? 'Potássio' : 'Magnésio'}:</p>
                      <p className="mt-1 font-bold text-yellow-250">➔ {calculateElectrolytes().composition}</p>
                      <p className="mt-1">● Infundir em bomba em <strong>{calculateElectrolytes().infusionTime}</strong> ({calculateElectrolytes().rateBic})</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-150 rounded-xl p-3 text-green-800 text-xs font-sans font-medium text-center">
                    Eletrólito dentro da faixa de normalidade. Nenhuma reposição de ataque indicada pelo protocolo no momento.
                  </div>
                )}

                {/* Oral alternative details */}
                <div className="bg-white p-3.5 rounded-lg border border-gray-100 text-xs text-slate-600 font-sans leading-relaxed">
                  <span className="font-bold text-slate-800 block text-[11.5px] mb-0.5">Alternativa por Via Oral (se estável/alimentando):</span>
                  {calculateElectrolytes().oralAlternative}
                </div>

                <div className="bg-rose-50 border border-rose-100 p-3 rounded-lg text-[10.5px] font-sans text-rose-900 leading-normal">
                  {calculateElectrolytes().warnings}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <span className="text-[10px] font-mono text-gray-400 uppercase">REPOSIÇÃO INTENSIVA SECTORIAL</span>
                {calculateElectrolytes().composition !== 'N/A' && (
                  <button
                    id="copy-elec-prescription"
                    onClick={() => handleCopyText('elec', 
electrolyteType === 'K' ? 
`# PRESCRIÇÃO MÉDICA - REPOSIÇÃO DE POTÁSSIO
- Paciente: ${electrolyteWeight} kg | K+ atual: ${kValue} mEq/L
1. ${calculateElectrolytes().composition}
- Via: ${calculateElectrolytes().route}
- Vazão: Correr a ${calculateElectrolytes().rateBic} em BIC de forma lenta (Tempo: ${calculateElectrolytes().infusionTime}).
- Vigilância: Coletar K+ sérico de controle após o término.` :
`# PRESCRIÇÃO MÉDICA - REPOSIÇÃO DE MAGNÉSIO
- Paciente: ${electrolyteWeight} kg | Mg2+ atual: ${mgValue} mEq/L
1. ${calculateElectrolytes().composition}
- Via: Venosa padrão periférica ou central
- Vazão: Correr a ${calculateElectrolytes().rateBic} em Bomba de Infusão Contínua (Tempo: ${calculateElectrolytes().infusionTime}).`
                    )}
                    className={`py-2 px-4 rounded-xl text-xs font-bold font-sans text-center transition shadow-sm ${
                      copiedId === 'elec' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {copiedId === 'elec' ? '✓ Prescrição Copiada!' : 'Copiar Prescrição de Reposição'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 13: Insulina Regular EV (Controle Glicêmico) */}
        {activeCalc === 'insulina_ev' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
            <div className="md:col-span-12 lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Glicemias & Metabologia Crítica
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Bomba de Insulina Regular EV</h3>
                <p className="text-gray-500 text-xs mt-1 leading-normal">
                  Mantenha o controle estrito da glicose em ambiente de terapia intensiva. Ajuste a infusão de insulina regular por via endovenosa reativa baseando-se estritamente na glicemia capilar horária (HGT).
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-650 block">Glicemia Capilar Atual / HGT (mg/dL)</label>
                    <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded">
                      {hgtValue} mg/dL
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      id="insulin-hgt-slider"
                      type="range"
                      min="40"
                      max="500"
                      value={hgtValue}
                      onChange={(e) => setHgtValue(e.target.value)}
                      className="flex-1 accent-blue-600 cursor-pointer"
                    />
                    <input
                      id="insulin-hgt-input"
                      type="number"
                      value={hgtValue}
                      onChange={(e) => setHgtValue(e.target.value)}
                      className="w-16 text-center text-xs font-bold text-slate-900 border p-1 rounded-lg"
                    />
                  </div>
                </div>

                {/* Protocol Selector */}
                <div>
                  <label className="text-xs font-bold text-gray-650 block mb-1">Protocolo Clínico Alvo</label>
                  <select
                    id="insulin-protocol-select"
                    value={insulinProtocol}
                    onChange={(e) => setInsulinProtocol(e.target.value)}
                    className="w-full text-xs font-medium text-slate-800 border p-2 rounded-lg bg-white"
                  >
                    <option value="uti">Escala Móvel Geral UTI (Meta: 140-180 mg/dL)</option>
                    <option value="cad">Cetoacidose Diabética / EHH (Contínuo: 0.1 UI/kg/h)</option>
                  </select>
                </div>

                {/* Dilution Selector */}
                <div>
                  <label className="text-xs font-bold text-gray-650 block mb-1">Preparação da Diluição</label>
                  <select
                    id="insulin-dilution-select"
                    value={insulinDilution}
                    onChange={(e) => setInsulinDilution(e.target.value)}
                    className="w-full text-xs font-medium text-slate-800 border p-2 rounded-lg bg-white"
                  >
                    <option value="100ui_100ml">100 UI Insulina Regular + 100 mL SF (1 UI/mL)</option>
                    <option value="100ui_250ml">100 UI Insulina Regular + 250 mL SF (0.4 UI/mL)</option>
                  </select>
                </div>

                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-105/50 text-[11px] text-slate-700 leading-normal font-sans space-y-1">
                  <div>🎯 <strong>Meta de UTI Geral:</strong> 140 a 180 mg/dL. Evite a tentação de corrigir agressivamente glicemias abaixo de 140 mg/dL com insulina, devido ao grave risco iatrogênico de neuroglicopenia letal por hipoglicemia rápida de transição.</div>
                  <div className="text-slate-400 text-[10px] font-mono">➔ Direcionado pelo Guia SallesMED PRO de Terapia Intensiva.</div>
                </div>
              </div>
            </div>

            {/* Insulin Results Layout */}
            <div className="md:col-span-12 lg:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                    Protocolo de Bombas e Alarmes
                  </span>
                  <button
                    id="save-insulin-hist"
                    onClick={saveInsulinToHistory}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white border px-2.5 py-1 rounded-lg shadow-sm hover:bg-gray-50 transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Salvar Histórico
                  </button>
                </div>

                {/* Big output display rate of BIC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4.5 rounded-xl border border-gray-200 text-center flex flex-col justify-between shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider font-mono">VAZÃO NA BOMBA (BIC)</span>
                    <p className="text-3xl font-black text-blue-600 font-mono mt-1.5">
                      {calculateInsulin().rateMlHr} <span className="text-sm font-semibold">mL/h</span>
                    </p>
                    <span className="text-[10.5px] text-gray-400 mt-1 block leading-none font-sans font-normal">(Equivale a {calculateInsulin().rateUiH} UI/hora)</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-center flex flex-col justify-between shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider font-mono">VIGILÂNCIA DE SNG</span>
                    <p className="text-[11px] font-bold text-slate-800 font-sans mt-2 bg-gray-150 py-1.5 px-2 rounded-lg leading-tight">
                      Reavaliar de: <br /> <strong className="text-blue-700 font-bold">{calculateInsulin().recheckInterval}</strong>
                    </p>
                  </div>
                </div>

                {/* Actions banner */}
                <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${calculateInsulin().actionColor}`}>
                  <p className="font-bold text-[11.5px] font-sans">➔ Conduta do Protocolo:</p>
                  <p className="font-medium font-sans leading-relaxed">{calculateInsulin().recommendation}</p>
                </div>

                {/* Standard Solution */}
                <div className="bg-white p-3.5 rounded-xl border border-gray-150 shadow-xs">
                  <span className="text-[10px] font-bold text-slate-400 block font-mono">DILUIÇÃO PADRONIZADA EM BOMBA (RECEPÇÃO)</span>
                  <p className="text-xs text-slate-800 font-mono font-medium mt-1">
                    {calculateInsulin().composition}
                  </p>
                  <span className="text-[9.5px] text-gray-400 mt-0.5 block leading-normal font-sans">
                    Utilizar equipo específico de baixa adsorção ou preencher a linha (desprezando os primeiros 20 mL de fluxo no ralo para saturar as paredes plásticas do equipo antes de conectar ao doente).
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <span className="text-[10px] font-mono text-gray-400 uppercase">TIAGEM DE ATENÇÃO METABÓLICA</span>
                <button
                  id="copy-insulin-prescription"
                  onClick={() => handleCopyText('insulin', 
`# PRESCRIÇÃO MÉDICA - PROTOCOLO DE CONTROLE GLICÊMICO (INSULINA CONFIG)
- HGT capilar atual: ${hgtValue} mg/dL
1. Insulina Regular -- 100 UI (1 mL)
2. Soro Fisiológico 0,9% -- ${insulinDilution === '100ui_100ml' ? '100 mL' : '250 mL'}
- Vazão recomendada: Iniciar a ${calculateInsulin().rateMlHr} mL/h em Bomba de Infusão Contínua (vazão programada do protocolo).
- Dose horária ativa correspondente: ${calculateInsulin().rateUiH} UI/h.
- Aferir HGT de 1/1h ou de 2/2h de acordo com metas.`
                  )}
                  className={`py-2 px-4 rounded-xl text-xs font-bold font-sans text-center transition shadow-sm ${
                    copiedId === 'insulin' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {copiedId === 'insulin' ? '✓ Prescrição Copiada!' : 'Copiar Prescrição de Insulina EV'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 14: Heparinização Plena HNF */}
        {activeCalc === 'heparina_infusion' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
            <div className="md:col-span-12 lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Cardiopatia & Hemostasia de Plantão
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Plano de Anticoagulação Plena</h3>
                <p className="text-gray-500 text-xs mt-1 leading-normal">
                  Indicado para anticoagulação terapêutica na Síndrome Coronariana Aguda (SCA) ou TEP/TVP massivo de plantão. Permite rápida reversão com Protamine se sangramento severo de acordo com diretrizes.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-650 block mb-1.5">Fármaco de Escolha</label>
                  <select
                    id="heparin-type-select-ui"
                    value={heparinType}
                    onChange={(e) => setHeparinType(e.target.value)}
                    className="w-full text-xs font-bold text-slate-800 border border-gray-300 rounded-lg p-2 bg-white"
                  >
                    <option value="hnf">Heparina Não Fracionada (HNF) - Bomba de Infusão EV</option>
                    <option value="clexane">Enoxaparina (Clexane) - Subcutâneo SC</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-gray-650 block">Peso (kg)</label>
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-1 py-0.5 rounded">
                        {heparinWeight}kg
                      </span>
                    </div>
                    <input
                      id="heparin-weight-input"
                      type="number"
                      value={heparinWeight}
                      onChange={(e) => setHeparinWeight(Math.max(1, parseInt(e.target.value) || 70))}
                      className="w-full text-xs font-bold text-slate-1000 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-650 block mb-1">Fração ClCr (mL/min)</label>
                    <input
                      id="heparin-clcr-input"
                      type="number"
                      value={heparinClCr}
                      onChange={(e) => setHeparinClCr(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full text-xs font-bold text-slate-1000 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-650 block mb-1.5">Indicação Clínica Fundamental</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      id="hep-ind-tep"
                      onClick={() => setHeparinIndication('tep_tvp')}
                      className={`p-2 rounded-xl border text-center transition flex flex-col justify-center h-14 ${
                        heparinIndication === 'tep_tvp' 
                          ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-[11px]">TEP / TVP Massivo</span>
                      <span className="text-[9px] text-gray-400 font-normal mt-0.5 font-sans">(Ataque 80 UI/kg • Manut 18/h)</span>
                    </button>
                    <button
                      id="hep-ind-sca"
                      onClick={() => setHeparinIndication('sca')}
                      className={`p-2 rounded-xl border text-center transition flex flex-col justify-center h-14 ${
                        heparinIndication === 'sca' 
                          ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-[11px]">SCA / IAM Isquêmico</span>
                      <span className="text-[9px] text-gray-400 font-normal mt-0.5 font-sans">(Ataque 60 UI/kg • Manut 12/h)</span>
                    </button>
                  </div>
                </div>

                {heparinType === 'hnf' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-gray-650 block">Último Controle PTTa (segundos)</label>
                      <span className="text-xs font-mono font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        {heparinPtta}s
                      </span>
                    </div>
                    <input
                      id="heparin-ptta-slider"
                      type="range"
                      min="20"
                      max="150"
                      value={heparinPtta}
                      onChange={(e) => setHeparinPtta(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block font-sans">
                      Intervalo de meta ideal para a maioria dos pacientes em UTI: **60 to 85 segundos**.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Heparin results col */}
            <div className="md:col-span-12 lg:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                    Plano de Anticoagulação Misto
                  </span>
                  <button
                    id="save-heparin-hist"
                    onClick={saveHeparinToHistory}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white border px-2.5 py-1 rounded-lg shadow-sm hover:bg-gray-50 transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Salvar Histórico
                  </button>
                </div>

                {calculateHeparin().isClexane ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Clexane dose */}
                    <div className="bg-white p-4.5 rounded-xl border border-gray-200/60 shadow-sm relative overflow-hidden">
                      <span className="text-[10px] font-bold text-emerald-600 block font-mono">DOSE SUBCUTÂNEA PLENA</span>
                      <p className="text-3xl font-black text-emerald-600 font-mono mt-1">
                        {calculateHeparin().clexaneDoseMg} <span className="text-xs font-bold text-gray-550">mg SC</span>
                      </p>
                      <p className="text-xs font-black text-emerald-500 font-mono mt-0.5">
                        ➔ Volume: {calculateHeparin().clexaneVolMl} mL de seringa SC
                      </p>
                    </div>

                    {/* Clexane schedule */}
                    <div className="bg-white p-4.5 rounded-xl border border-gray-200/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-slate-400 block font-mono">EQUILÍBRIO METABÓLICO CLCR</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-snug">
                          Intervalo: <span className="text-blue-600 font-black font-mono">a cada {heparinClCr < 30 ? '24' : '12'}h</span>
                        </p>
                        <p className="text-[9.5px] text-gray-400 mt-1 leading-normal font-sans">
                          {heparinClCr < 30 ? 'Reduzido 24h para ClCr < 30 mL/min para evitar toxicidade.' : 'Padrão 12h de anticoagulação farmacológica.'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Bólus ataque puro */}
                    <div className="bg-white p-4.5 rounded-xl border border-gray-200/60 shadow-sm relative overflow-hidden">
                      <span className="text-[10px] font-bold text-slate-400 block font-mono">1. ATAQUE EM BÓLUS EV DIRETO</span>
                      <p className="text-3xl font-black text-rose-600 font-mono mt-1">
                        {calculateHeparin().bolusUI} <span className="text-xs font-bold text-gray-550">UI</span>
                      </p>
                      <p className="text-xs font-black text-rose-500 font-mono mt-0.5">
                        ➔ Volume: {calculateHeparin().bolusMl} mL EV <span className="text-[10px] font-sans font-medium text-gray-400">(Da ampola pura)</span>
                      </p>
                    </div>

                    {/* Vazão inicial BIC */}
                    <div className="bg-white p-4.5 rounded-xl border border-gray-200/60 shadow-sm relative overflow-hidden">
                      <span className="text-[10px] font-bold text-slate-400 block font-mono">2. VAZÃO INICIAL NA BOMBA (BIC)</span>
                      <p className="text-3xl font-black text-blue-600 font-mono mt-1">
                        {calculateHeparin().maintMl} <span className="text-xs font-bold text-gray-550">mL/h</span>
                      </p>
                      <p className="text-xs font-black text-blue-500 font-mono mt-0.5">
                        ➔ Concentração: {calculateHeparin().maintUI} UI/h
                      </p>
                    </div>
                  </div>
                )}

                {/* Dilution recipe HNF / Clexane */}
                <div className="bg-white p-3.5 rounded-xl border border-gray-150 shadow-xs">
                  <span className="text-[10px] font-bold text-slate-400 block font-mono uppercase">RECEITA DO FÁRMACO SELECIONADO</span>
                  <p className="text-xs text-slate-800 font-sans font-medium mt-1 leading-normal font-mono">
                    {calculateHeparin().composition}
                  </p>
                </div>

                {/* Titration block */}
                <div className="bg-white p-4 rounded-xl border border-yellow-105 shadow-sm space-y-1 bg-yellow-50/15">
                  <span className="text-[10px] font-bold text-slate-400 block font-mono uppercase tracking-widest">
                    {calculateHeparin().isClexane ? 'RECOMENDAÇÃO CLÍNICA SECUNDÁRIA:' : `Conduta Baseada no PTTa de ${heparinPtta}s :`}
                  </span>
                  <p className="text-[11.5px] text-slate-800 leading-normal font-sans font-medium bg-white p-2 border border-gray-100 rounded">
                    {calculateHeparin().pttaAction}
                  </p>
                </div>

                {/* Renal validation alerts */}
                {calculateHeparin().renalWarning !== '' && (
                  <div className="bg-blue-50/40 border border-blue-105 p-3 rounded-lg text-xs font-sans text-blue-900 leading-normal">
                    {calculateHeparin().renalWarning}
                  </div>
                )}

                <div className="bg-rose-50 border border-rose-100 p-3 rounded-lg text-[10.5px] font-sans text-rose-900 leading-normal">
                  💡 <strong>Antídoto de Emergência:</strong> {calculateHeparin().reversal}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <span className="text-[10px] font-mono text-gray-400 uppercase">TITRAÇÃO DINÂMICA DE HEMOFILTRADO</span>
                <button
                  id="copy-heparin-prescription"
                  onClick={() => handleCopyText('heparin', 
                    calculateHeparin().isClexane ?
`# PRESCRIÇÃO MÉDICA - ANTICOAGULAÇÃO PLANO CLEXANE (ENOXAPARINA)
- Peso: ${heparinWeight} kg | ClCr: ${heparinClCr} mL/min | Diagnóstico: ${heparinIndication === 'tep_tvp' ? 'TEP/TVP Massivo' : 'SCA (Coronariopata)'}
1. Enoxaparina Sódica (Clexane) -- Administrar ${calculateHeparin().clexaneDoseMg} mg via subcutânea (SC) profunda em flancos a cada ${heparinClCr < 30 ? '24' : '12'} horas (Volume: ${calculateHeparin().clexaneVolMl} mL).
- Atenção: Não massagear a região após a infusão subcutânea. Monitorar sangramento agudo de mucosas.`
                    :
`# PRESCRIÇÃO MÉDICA - HEPARINIZAÇÃO PLENA (HNF)
- Peso: ${heparinWeight} kg | Indicação: ${heparinIndication === 'tep_tvp' ? 'TEP/TVP' : 'SCA (Clerence Renal)'}
1. ATAQUE BÓLUS: Heparina Sódica pura (5.000 UI/mL) -- Fazer ${calculateHeparin().bolusUI} UI (${calculateHeparin().bolusMl} mL) EV em bólus imediato agora.
2. MANUTENÇÃO CONTÍNUA BIC:
   - Heparina Sódica HNF -- 25.000 UI (5 mL)
   - Soro Glicosado 5% (SG 5%) -- 245 mL (Solução final: 100 UI/mL)
   - Vazão na Bomba de Infusão: Iniciar a ${calculateHeparin().maintMl} mL/hora (equivale a ${calculateHeparin().maintUI} UI/hora).
3. AJUSTAR de acordo com a tabela de PTTa a cada 6 ou 12 horas.`
                  )}
                  className={`py-2 px-4 rounded-xl text-xs font-bold font-sans text-center transition shadow-sm ${
                    copiedId === 'heparin' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {copiedId === 'heparin' ? '✓ Prescrição Copiada!' : 'Copiar Prescrição de Anticoagulação'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 15: Transfusão de Hemoderivados */}
        {activeCalc === 'transfusao' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
            <div className="md:col-span-12 lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Hematologia Crítica & Coagulopatia
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Transfusão de Hemoderivados</h3>
                <p className="text-gray-500 text-xs mt-1 leading-normal">
                  Calcule a indicação correta de reposição de hemoderivados (Concentrado de Hemácias, Plaquetas e Crioprecipitado), otimizando a estratégia restritiva recomendada na terapia intensiva moderna.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-650 block mb-1">Peso (kg)</label>
                    <input
                      id="transf-weight-input"
                      type="number"
                      value={transfusionWeight}
                      onChange={(e) => setTransfusionWeight(Math.max(1, parseInt(e.target.value) || 70))}
                      className="w-full text-xs font-bold text-slate-1000 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-650 block mb-1">Hemoglobina (g/dL)</label>
                    <input
                      id="transf-hb-input"
                      type="text"
                      value={transfusionHb}
                      onChange={(e) => setTransfusionHb(e.target.value.replace(',', '.'))}
                      placeholder="e.g. 6.8"
                      className="w-full text-xs font-bold text-slate-1000 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-650 block mb-1">Plaquetas (/mm³)</label>
                    <input
                      id="transf-plt-input"
                      type="number"
                      value={transfusionPlt}
                      onChange={(e) => setTransfusionPlt(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="e.g. 15000"
                      className="w-full text-xs font-bold text-slate-1000 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-650 block mb-1">Fibrinogênio (mg/dL)</label>
                    <input
                      id="transf-fib-input"
                      type="number"
                      value={transfusionFib}
                      onChange={(e) => setTransfusionFib(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="e.g. 210"
                      className="w-full text-xs font-bold text-slate-1000 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2 border-t border-gray-150 pt-2 bg-slate-50 p-2.5 rounded-lg border border-gray-200">
                  <span className="text-[10px] font-bold text-slate-400 block font-mono">QUALIFICADORES PEDIÁTRICOS / EXCLUÍDOS</span>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700">Cardiopata Isquêmico / IAM Ativo?</span>
                    <input
                      id="checkbox-transf-cardio"
                      type="checkbox"
                      checked={transfusionCardio}
                      onChange={(e) => setTransfusionCardio(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-350 cursor-pointer focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/60 pt-1.5 mt-1.5">
                    <span className="text-xs font-medium text-slate-700">Sangramento Ativo Grave / Coagulopatia?</span>
                    <input
                      id="checkbox-transf-bleed"
                      type="checkbox"
                      checked={transfusionBleeding}
                      onChange={(e) => setTransfusionBleeding(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-350 cursor-pointer focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results of Hematology transfusion */}
            <div className="md:col-span-12 lg:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                    Critérios e Recomendações de Transfusão
                  </span>
                  <button
                    id="save-transf-hist"
                    onClick={saveTransfusionToHistory}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white border px-2.5 py-1 rounded-lg shadow-sm hover:bg-gray-50 transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Salvar Histórico
                  </button>
                </div>

                <div className="space-y-3">
                  {/* RBC evaluation */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 font-mono">➔ REPOSIÇÃO DE HEMÁCIAS (CH)</span>
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${calculateTransfusion().chColor}`}>
                        {calculateTransfusion().chIndicator}
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-sans font-medium mt-1.5">
                      {calculateTransfusion().chDoseStr}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 leading-normal font-sans">
                      {calculateTransfusion().chRef}
                    </p>
                  </div>

                  {/* Platelets evaluation */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 font-mono">➔ REPOSIÇÃO DE PLAQUETAS</span>
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${calculateTransfusion().pltColor}`}>
                        {calculateTransfusion().pltIndicator}
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-sans font-medium mt-1.5">
                      {calculateTransfusion().pltDoseStr}
                    </p>
                  </div>

                  {/* Fibrinogen evaluation */}
                  {calculateTransfusion().fibIndicator !== 'NÃO INDICADO' && (
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 font-mono">➔ REPOSIÇÃO DE CRIOPRECIPITADO</span>
                        <span className="text-[9.5px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                          {calculateTransfusion().fibIndicator}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 font-sans font-medium mt-1.5">
                        {calculateTransfusion().fibDoseStr}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-rose-50 border border-rose-100 p-3 rounded-lg text-[10.5px] font-sans text-rose-950 leading-normal">
                  {calculateTransfusion().warnings}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <span className="text-[10px] font-mono text-gray-400 uppercase">HEMOCONTROLE DE SEGURANÇA</span>
                <button
                  id="copy-transf-prescription"
                  onClick={() => handleCopyText('transf', 
`# PRESCRIÇÃO MÉDICA - HEMODERIVADOS
- Peso: ${transfusionWeight} kg | Hb: ${transfusionHb} g/dL | Plaquetas: ${transfusionPlt} /mm³
1. Concentrado de Hemácias: ${calculateTransfusion().chDoseStr}
2. Concentrado de Plaquetas: ${calculateTransfusion().pltDoseStr} (Correr via filtro de hemotransfusão standard rápido).
3. Monitoração: Aferição térmica e vigilância de rash/urticária/febre trans-transfusional.`
                  )}
                  className={`py-2 px-4 rounded-xl text-xs font-bold font-sans text-center transition shadow-sm ${
                    copiedId === 'transf' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {copiedId === 'transf' ? '✓ Prescrição Copiada!' : 'Copiar Prescrição de Transfusão'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 16: Furosemida EV em Congestão */}
        {activeCalc === 'furosemide' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
            <div className="md:col-span-12 lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Balanço Hídrico & Nefrologia Crítica
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Furosemida EV (Manuseio Congestivo)</h3>
                <p className="text-gray-500 text-xs mt-1 leading-normal">
                  Gerencie a hipervolemia e o congestionamento venoso sistêmico/pulmonar em pacientes com Insuficiência Cardíaca Congestiva (ICC) ou Síndrome Cardiorrenal na UTI de forma otimizada.
                </p>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-650 block">Peso do Paciente (kg)</label>
                    <span className="text-xs font-mono font-bold text-slate-800 bg-gray-100 px-2 py-0.5 rounded">
                      {furosemideWeight} kg
                    </span>
                  </div>
                  <input
                    id="furo-weight-slider"
                    type="range"
                    min="35"
                    max="150"
                    value={furosemideWeight}
                    onChange={(e) => setFurosemideWeight(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="bg-gray-100 p-3 rounded-lg border border-gray-150 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Usuário de Furosemida Crônica em Casa?</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5 leading-normal">
                      Ativa a regra de 2 a 2,5 vezes a dose diária oral para calibrar a taxa de bólus EV reativa.
                    </span>
                  </div>
                  <input
                    id="checkbox-furo-prior"
                    type="checkbox"
                    checked={furosemidePriorUse}
                    onChange={(e) => setFurosemidePriorUse(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-350 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                {furosemidePriorUse && (
                  <div>
                    <label className="text-xs font-bold text-gray-650 block mb-1">Dose Oral Diária Habitual (mg/dia)</label>
                    <input
                      id="furo-vodose-input"
                      type="number"
                      value={furosemideVoDose}
                      onChange={(e) => setFurosemideVoDose(Math.max(10, parseInt(e.target.value) || 40))}
                      className="w-full text-sm font-bold text-slate-900 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-gray-400 leading-tight mt-1 block">
                      Exemplo comum: 1 comprimido de Lasix = **40 mg**, 2 cps = **80 mg**.
                    </span>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-gray-650 block mb-1.5">Severidade de Congestão do Paciente</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      id="furo-cong-mod"
                      onClick={() => setFurosemideCongestion('moderate')}
                      className={`py-2 px-3 rounded-lg border text-center transition ${
                        furosemideCongestion === 'moderate' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Moderada (Estertores basais)
                    </button>
                    <button
                      id="furo-cong-sev"
                      onClick={() => setFurosemideCongestion('severe')}
                      className={`py-2 px-3 rounded-lg border text-center transition ${
                        furosemideCongestion === 'severe' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Grave (Anasarca / Edema Pulmão)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results col loop of Furosemide */}
            <div className="md:col-span-12 lg:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                    Esquema de Descongestionamento Alvo
                  </span>
                  <button
                    id="save-furo-hist"
                    onClick={saveFurosemideToHistory}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white border px-2.5 py-1 rounded-lg shadow-sm hover:bg-gray-50 transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Salvar Histórico
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Bólus ataque EV */}
                  <div className="bg-white p-4 rounded-xl border border-blue-105/65 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                    <span className="text-[10px] font-bold text-slate-400 block font-mono">BÓLUS DE ATAQUE INICIAL EV</span>
                    <p className="text-3xl font-black text-blue-700 font-mono mt-1">
                      {calculateFurosemide().attackMg} <span className="text-sm font-semibold">mg</span>
                    </p>
                    <p className="text-xs font-black text-blue-500 font-mono mt-0.5">
                      ➔ {calculateFurosemide().attackAmp} ampolas EV <span className="text-[10px] font-sans font-medium text-gray-400">(20mg/2mL pura)</span>
                    </p>
                  </div>

                  {/* Resposta esperada */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-slate-400 block font-mono">ALVO DE RESPOSTA (URINA)</span>
                    <p className="text-xs font-bold text-slate-800 leading-normal font-sans mt-1">
                      {calculateFurosemide().responseTarget.split('Esperado:')[1] || calculateFurosemide().responseTarget}
                    </p>
                  </div>
                </div>

                {/* Maintenance suggestions details */}
                <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 block font-mono">ESQUEMA COMPLEMENTAR DE SEGUIMENTO (MANUTENÇÃO)</span>
                  <p className="text-xs text-slate-900 font-sans font-medium bg-gray-100 p-2.5 rounded-lg border border-gray-200 border-dashed">
                    {calculateFurosemide().maintenanceSugg}
                  </p>
                </div>

                {/* Scientific reasoning justification */}
                <div className="bg-white p-3 rounded border text-[11px] text-gray-500 leading-relaxed font-sans mt-2">
                  <strong>Justificativa do Algoritmo:</strong> {calculateFurosemide().reasoning}
                </div>

                <div className="bg-rose-50 border border-rose-100 p-3 rounded-lg text-[10.5px] font-sans text-rose-900 leading-normal">
                  {calculateFurosemide().warnings}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <span className="text-[10px] font-mono text-gray-400 uppercase">DIURESE AJUSTADA EM ALÇA RENAL</span>
                <button
                  id="copy-furo-prescription"
                  onClick={() => handleCopyText('furo', 
`# PRESCRIÇÃO MÉDICA - PROTOCOLO CONGESTIVO FUROSEMIDA EV
- Peso estimado: ${furosemideWeight} kg | Congestão: ${(furosemideCongestion || 'moderada').toUpperCase()}
1. ATAQUE: Furosemida (Lasix 20mg/2mL) -- Fazer ${calculateFurosemide().attackMg} mg (${calculateFurosemide().attackAmp} ampolas) EV em bólus rápido imediato agora.
2. MANUTENÇÃO COMPLEMENTAR:
   - ${calculateFurosemide().maintenanceSugg}
3. Monitoramento: Medir diurese de 2h em 2h e buscar balanço negativo.`
                  )}
                  className={`py-2 px-4 rounded-xl text-xs font-bold font-sans text-center transition shadow-sm ${
                    copiedId === 'furo' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {copiedId === 'furo' ? '✓ Prescrição Copiada!' : 'Copiar Prescrição de Furosemida'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
