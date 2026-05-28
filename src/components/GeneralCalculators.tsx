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

type CalculatorType = 'tfg' | 'imc_bsa' | 'parkland' | 'qtc' | 'bicarbonate' | 'maintenance_fluid' | 'phenytoin' | 'polarizing_sol' | 'sodium_correction' | 'vent_pbw' | 'glycemic_control' | 'heparin_infusion';

export default function GeneralCalculators({ 
  onAddHistory,
  activeCalc: propActiveCalc,
  setActiveCalc: propSetActiveCalc
}: GeneralCalculatorsProps) {
  const [localActiveCalc, setLocalActiveCalc] = useState<CalculatorType>('tfg');

  const activeCalc = propActiveCalc ?? localActiveCalc;
  const setActiveCalc = propSetActiveCalc ?? setLocalActiveCalc;
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

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

    return {
      pbw: pbw.toFixed(1),
      tidal4,
      tidal5,
      tidal6,
      tidal7,
      tidal8,
      activeTidal
    };
  };

  const saveVentPbwToHistory = () => {
    const res = calculateVentPbw();
    onAddHistory({
      title: 'PBW e Ventilação Protetora',
      description: `Altura: ${ventHeight} cm | Gênero: ${ventGender === 'male' ? 'Masculino' : 'Feminino'}`,
      inputs: {
        'Altura': `${ventHeight} cm`,
        'Gênero': ventGender === 'male' ? 'Masculino' : 'Feminino',
        'Fator Volume Corrente': `${ventVolFactor} mL/kg`
      },
      outputs: {
        'Peso Corporal Predito (PBW)': `${res.pbw} kg`,
        'Volume Corrente Alvo': `${res.activeTidal} mL (com ${ventVolFactor} mL/kg)`
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
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                  Evite o volutrauma em pacientes obesos ou de pequena estatura. Programe os volumes correntes do ventilador mecânico baseados estritamente no **Peso Corporal Predito (PBW)** calculado a partir da altura, e nunca pelo peso real.
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
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

                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1">Fator de Volume Corrente Alvo (mL/kg)</label>
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
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Geralmente indica-se **4 a 5 mL/kg** em pulmão com SARA, e **6 mL/kg** em condições gerais ou proteção inicial.
                  </span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Configurações Protetoras de Volume
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <div className="bg-white p-3 border border-gray-200/60 rounded-xl shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 block font-mono">PESO PREDITO CALCULADO (PBW)</span>
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

                {/* Safety targets table */}
                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-100 px-3.5 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                    Escala de Volume Corrente (VC) por Fator Alvo
                  </div>
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead>
                      <tr className="border-b bg-gray-50 font-bold shrink-0">
                        <th className="p-2 pl-3">Fator Alvo</th>
                        <th className="p-2">Volume Alvo</th>
                        <th className="p-2 pr-3">Indicação Clínica Standard</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={`border-b hover:bg-slate-50 ${ventVolFactor === 4 ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-2 pl-3 font-semibold font-mono">4 mL/kg</td>
                        <td className="p-2 font-mono font-bold">{calculateVentPbw().tidal4} mL</td>
                        <td className="p-2 text-rose-600 font-medium">SARA Severa / Protocolo de Hipercapnia permissiva</td>
                      </tr>
                      <tr className={`border-b hover:bg-slate-50 ${ventVolFactor === 5 ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-2 pl-3 font-semibold font-mono">5 mL/kg</td>
                        <td className="p-2 font-mono font-bold">{calculateVentPbw().tidal5} mL</td>
                        <td className="p-2 text-amber-600 font-medium">SARA Moderada / Pulmões de complacência reduzida</td>
                      </tr>
                      <tr className={`border-b hover:bg-slate-50 ${ventVolFactor === 6 ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-2 pl-3 font-semibold font-mono">6 mL/kg</td>
                        <td className="p-2 font-mono font-bold">{calculateVentPbw().tidal6} mL</td>
                        <td className="p-2 text-emerald-600 font-bold">Padrão Ouro de início para ventilação protetora</td>
                      </tr>
                      <tr className={`border-b hover:bg-slate-50 ${ventVolFactor === 7 ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-2 pl-3 font-semibold font-mono">7 mL/kg</td>
                        <td className="p-2 font-mono font-bold">{calculateVentPbw().tidal7} mL</td>
                        <td className="p-2 text-gray-550">Volumes limítrofes / Desmame gradual ventilatório</td>
                      </tr>
                      <tr className={`hover:bg-slate-50 ${ventVolFactor === 8 ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-2 pl-3 font-semibold font-mono">8 mL/kg</td>
                        <td className="p-2 font-mono font-bold">{calculateVentPbw().tidal8} mL</td>
                        <td className="p-2 text-gray-400">Limite fisiológico superior absoluto. Evitar na SARA.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50/40 border border-blue-100 p-3 rounded-lg text-xs leading-relaxed space-y-1">
                  <p className="font-bold text-blue-800">💡 Lembrete de Segurança Pulmonar:</p>
                  <p className="font-medium text-slate-700">
                    Sempre avalie nos canais do ventilador a **Pressão de Platô** (manter obrigatoriamente **≤ 30 cmH₂O**) e a **Driving Pressure** (Platô − PEEP, manter **&lt; 15 cmH₂O**). Caso extrapolem, as metas de volume corrente devem ser reduzidas de forma proeminente.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-400">AJUSTE DE PESO PREDITO (DEVINE)</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
