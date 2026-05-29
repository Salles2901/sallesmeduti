// src/data/drugs.ts
import { DrugConfig } from '../types';

export const INITIAL_DRUGS: DrugConfig[] = [
  {
    id: 'noradrenaline',
    name: 'Noradrenalina',
    chemicalName: 'Norepinephrine',
    category: 'vasoactive',
    ampoules: 4,
    mgPerAmpoule: 4,
    mlPerAmpoule: 4,
    diluentVolume: 234, // SG 5% standard
    totalVolume: 250,
    totalDrugMg: 16,
    concentrationMcgMl: 64, // (16 * 1000) / 250
    defaultDoseUnit: 'mcg/kg/min',
    minStandardDose: 0.01,
    maxStandardDose: 1.5,
    standardRecipies: [
      {
        name: 'Solução Menos Concentrada (4 ampolas + SG5% 234mL)',
        ampoules: 4,
        mgPerAmpoule: 4,
        mlPerAmpoule: 4,
        diluentVolume: 234,
        totalVolume: 250,
      },
      {
        name: 'Solução Mais Concentrada (8 ampolas + SG5% 218mL)',
        ampoules: 8,
        mgPerAmpoule: 4,
        mlPerAmpoule: 4,
        diluentVolume: 218,
        totalVolume: 250,
      }
    ],
    note: 'Diluir preferencialmente em Soro Glicosado 5% (SG5%) para prevenir a oxidação. Doses > de 0,5 mcg/kg/min na sepse recomenda-se associar vasopressina. Administração exclusiva em acesso venoso central por bomba de infusão contínua.',
    pharmacology: 'Catecolamina com forte efeito alfa-1 adrenérgico (vasoconstrição sistêmica periférica) e moderado efeito beta-1 (inotropismo positivo). Indicada no choque distributivo (especialmente choque séptico) refratário.'
  },
  {
    id: 'adrenaline',
    name: 'Adrenalina',
    chemicalName: 'Epinephrine',
    category: 'vasoactive',
    ampoules: 10,
    mgPerAmpoule: 1, // 1mg/mL
    mlPerAmpoule: 1,
    diluentVolume: 90, // SF0.9% 90ml
    totalVolume: 100,
    totalDrugMg: 10,
    concentrationMcgMl: 100, // 10mg / 100ml = 100 mcg/ml
    defaultDoseUnit: 'mcg/kg/min',
    minStandardDose: 0.1,
    maxStandardDose: 2.0,
    standardRecipies: [
      {
        name: 'Solução Padrão (10 mL de Adrenalina + 90 mL de SF 0,9%)',
        ampoules: 10,
        mgPerAmpoule: 1,
        mlPerAmpoule: 1,
        diluentVolume: 90,
        totalVolume: 100,
      }
    ],
    note: 'Diluição: 10 mL de Adrenalina + 90 mL de SF 0,9% (Concentração 100 mcg/mL). Infundir idealmente em acesso central. Prescrição na Prática: Adrenalina 10 mL + 90 mL SF0.9% em BIC, iniciar a 4.2 mL/h até 84.0 mL/h (para 70kg).',
    pharmacology: 'Catecolamina endógena de extrema potência com efeito potente sobre receptores alfa-1 (vasoconstrição), beta-1 (inotropismo e cronotropismo) e beta-2 (broncodilatação).'
  },
  {
    id: 'dobutamine',
    name: 'Dobutamina',
    chemicalName: 'Dobutamine Hydrochloride',
    category: 'inotope',
    ampoules: 1,
    mgPerAmpoule: 250,
    mlPerAmpoule: 20,
    diluentVolume: 230, // SF 0.9% or SG 5%
    totalVolume: 250,
    totalDrugMg: 250,
    concentrationMcgMl: 1000,
    defaultDoseUnit: 'mcg/kg/min',
    minStandardDose: 2.5,
    maxStandardDose: 20.0,
    standardRecipies: [
      {
        name: 'Dobutamina Menos Concentrada (1 ampola + 230 mL SF0.9%/SG5%)',
        ampoules: 1,
        mgPerAmpoule: 250,
        mlPerAmpoule: 20,
        diluentVolume: 230,
        totalVolume: 250,
      },
      {
        name: 'Dobutamina Padrão Clínico (2 ampolas + 210 mL SF0.9%/SG5%)',
        ampoules: 2,
        mgPerAmpoule: 250,
        mlPerAmpoule: 20,
        diluentVolume: 210,
        totalVolume: 250,
      },
      {
        name: 'Dobutamina Mais Concentrada (4 ampolas + 170 mL SF0.9%/SG5%)',
        ampoules: 4,
        mgPerAmpoule: 250,
        mlPerAmpoule: 20,
        diluentVolume: 170,
        totalVolume: 250,
      }
    ],
    note: 'Menos Concentrada: 1000 mcg/mL (prescrição prática para 70kg: iniciar a 10.5 mL/h até 84.0 mL/h). Mais Concentrada: 4000 mcg/mL (prescrição prática para 70kg: iniciar a 2.6 mL/h até 21.0 mL/h). Evitar misturar com bicarbonato de sódio na mesma via.',
    pharmacology: 'Agente simpatomimético sintético. Estimula predominantemente os receptores beta-1 adrenérgicos (inotropismo cardíaco significativo e aumento modesto do cronotropismo). Indicado no choque cardiogênico.'
  },
  {
    id: 'dopamine',
    name: 'Dopamina',
    chemicalName: 'Dopamine Hydrochloride',
    category: 'inotope',
    ampoules: 5,
    mgPerAmpoule: 50, // 50mg/10mL
    mlPerAmpoule: 10,
    diluentVolume: 200, // SG5% or SF0.9%
    totalVolume: 250,
    totalDrugMg: 250,
    concentrationMcgMl: 1000, // 250mg / 250ml = 1000 mcg/ml
    defaultDoseUnit: 'mcg/kg/min',
    minStandardDose: 5.0,
    maxStandardDose: 20.0,
    standardRecipies: [
      {
        name: 'Solução Padrão (5 ampolas + 200 mL SG5%/SF0.9%)',
        ampoules: 5,
        mgPerAmpoule: 50,
        mlPerAmpoule: 10,
        diluentVolume: 200,
        totalVolume: 250,
      }
    ],
    note: 'Ação Beta-1 (Aumento FC e contratilidade cardíaca): 5 a 10 mcg/kg/min. Ação Alfa-1 (Aumento de resistência vascular sistêmica e pulmonar): 11 a 20 mcg/kg/min. Doses > 20 mcg/kg/min não recomendadas. Preferir noradrenalina.',
    pharmacology: 'Catecolamina simpatomimética natural que atua como precursor imediato da noradrenalina, com efeitos cardíacos e vasculares dose-dependentes importantes.'
  },
  {
    id: 'vasopressin',
    name: 'Vasopressina',
    chemicalName: 'Vasopressin',
    category: 'vasoactive',
    ampoules: 1,
    mgPerAmpoule: 20, // 20 U/mL (we map UI directly to mg for calculation engine)
    mlPerAmpoule: 1,
    diluentVolume: 99, // SG5%
    totalVolume: 100,
    totalDrugMg: 20, // 20 U
    concentrationMcgMl: 0.2, // 20U / 100mL = 0.2 U/mL
    defaultDoseUnit: 'U/min',
    minStandardDose: 0.01,
    maxStandardDose: 0.04,
    standardRecipies: [
      {
        name: 'Preparo Clássico (1 mL (20U) em 99 mL de SG5%)',
        ampoules: 1,
        mgPerAmpoule: 20,
        mlPerAmpoule: 1,
        diluentVolume: 99,
        totalVolume: 100,
      }
    ],
    note: 'Não há correção por peso. Dose mínima de 0.01 U/min corresponde a 3 mL/h de vazão em bomba. Dose máxima de 0.04 U/min corresponde a 12 mL/h de vazão. Indicado como segunda linha no choque séptico.',
    pharmacology: 'Hormônio endógeno com potente efeito vasoconstritor periférico direto mediado por receptores V1 nas células musculares lisas da vasculatura sistêmica.'
  },
  {
    id: 'milrinone',
    name: 'Milrinona',
    chemicalName: 'Milrinone Lactate',
    category: 'inotope',
    ampoules: 1,
    mgPerAmpoule: 20, // 20mg/20mL
    mlPerAmpoule: 20,
    diluentVolume: 80, // SF0.9% or SG5%
    totalVolume: 100,
    totalDrugMg: 20,
    concentrationMcgMl: 200, // 20mg / 100ml = 200 mcg/ml
    defaultDoseUnit: 'mcg/kg/min',
    minStandardDose: 0.375,
    maxStandardDose: 0.75,
    standardRecipies: [
      {
        name: 'Solução Padrão (1 ampola de 20mL em 80mL diluente)',
        ampoules: 1,
        mgPerAmpoule: 20,
        mlPerAmpoule: 20,
        diluentVolume: 80,
        totalVolume: 100,
      }
    ],
    note: 'Dose de ataque: 50 mcg/kg em 10 min. Manutenção: 0.375 a 0.750 mcg/kg/min (prática 70kg: 7.9 a 15.8 mL/h). Ajuste Renal ClCr (mL/min): se 5,0 -> 0.2 mcg/kg/min; se 30 -> 0.33 mcg/kg/min; se 50 -> 0.43 mcg/kg/min.',
    pharmacology: 'Inibidor seletivo da fosfodiesterase tipo III (PDE-3) no miocárdio e musculatura lisa vascular. Apresenta potente efeito inotrópico positivo e vasodilatador sistêmico/pulmonar.'
  },
  {
    id: 'levosimendan',
    name: 'Levosimendana',
    chemicalName: 'Levosimendan',
    category: 'inotope',
    ampoules: 1,
    mgPerAmpoule: 12.5, // 2.5mg/mL over 5mL = 12.5mg
    mlPerAmpoule: 5,
    diluentVolume: 495, // SG5%
    totalVolume: 500,
    totalDrugMg: 12.5,
    concentrationMcgMl: 25, // 12.5mg / 500ml = 0.025mg/ml = 25 mcg/ml
    defaultDoseUnit: 'mcg/kg/min',
    minStandardDose: 0.05,
    maxStandardDose: 0.2,
    standardRecipies: [
      {
        name: 'Solução Padrão (2.5 mg/mL) 5 mL + 495 mL SG 5%',
        ampoules: 1,
        mgPerAmpoule: 12.5,
        mlPerAmpoule: 5,
        diluentVolume: 495,
        totalVolume: 500,
      }
    ],
    note: 'Prescrição na prática para paciente de 70kg: iniciar a 8,4 mL/h até 33,6 mL/h. Excelente para choque cardiogênico agudizado pois não aumenta o consumo de Oxigênio miocárdico significativamente.',
    pharmacology: 'Sensibilizador de cálcio cardíaco. Liga-se à troponina C miocárdica de forma dependente do cálcio, promovendo contração robusta associada à abertura de canais de potássio vasculares (vasodilatação).'
  },
  {
    id: 'nitroglycerine',
    name: 'Nitroglicerina (Tridil)',
    chemicalName: 'Nitroglycerin',
    category: 'antihypertensive',
    ampoules: 1,
    mgPerAmpoule: 50, // 5mg/mL over 10mL = 50mg
    mlPerAmpoule: 10,
    diluentVolume: 240, // SF0.9% or SG5%
    totalVolume: 250,
    totalDrugMg: 50,
    concentrationMcgMl: 200, // 200 mcg/ml
    defaultDoseUnit: 'mcg/min',
    minStandardDose: 5.0,
    maxStandardDose: 200.0,
    standardRecipies: [
      {
        name: 'Solução Padrão (1 ampola de 10mL em 240mL diluente)',
        ampoules: 1,
        mgPerAmpoule: 50,
        mlPerAmpoule: 10,
        diluentVolume: 240,
        totalVolume: 250,
      }
    ],
    note: 'Iniciar com 5 a 10 mcg/min e titular por resposta clínica a cada 3-5 minutos. Iniciar a 10 mL/h e reavaliar até dose máxima de 200 mcg/min (60 mL/h). Evitar equipos tradicionais de PVC por adsorção plasmática.',
    pharmacology: 'Vasodilatador venoso proeminente. Atua via síntese de óxido nítrico e guanilatociclase, relaxando o leito venoso, reduzindo a pré-carga cardíaca e dilatando artérias coronárias sadias.'
  },
  {
    id: 'nitroprusside',
    name: 'Nitroprussiato de Sódio',
    chemicalName: 'Sodium Nitroprusside',
    category: 'antihypertensive',
    ampoules: 1,
    mgPerAmpoule: 50, // 50mg/2mL
    mlPerAmpoule: 2,
    diluentVolume: 248, // SG5% is required for stability
    totalVolume: 250,
    totalDrugMg: 50,
    concentrationMcgMl: 200, // 200 mcg/ml
    defaultDoseUnit: 'mcg/kg/min',
    minStandardDose: 0.5,
    maxStandardDose: 10.0,
    standardRecipies: [
      {
        name: 'Solução Padrão (1 ampola em SG5% 248mL)',
        ampoules: 1,
        mgPerAmpoule: 50,
        mlPerAmpoule: 2,
        diluentVolume: 248,
        totalVolume: 250,
      }
    ],
    note: 'Prescrição prática para 70kg: iniciar a 2,1 mL/h até 210,0 mL/h. Solução FOTOSSENSÍVEL. Proteger obrigatoriamente a solução e o equipo com invólucros opacos/UV para evitar a fotólise em cianeto livre.',
    pharmacology: 'Vasodilatador misto arterial e venoso de ação rápida ultra-curta. Atua liberando óxido nítrico no músculo liso vascular, reduzindo bruscamente a pré-carga e a pós-carga miocárdica.'
  },
  {
    id: 'fentanyl',
    name: 'Fentanil',
    chemicalName: 'Fentanyl Citrate',
    category: 'sedative',
    ampoules: 1,
    mgPerAmpoule: 2.5, // 500 mcg/10mL (50mcg/mL), standard 50ml bottle is 2.5mg
    mlPerAmpoule: 50,
    diluentVolume: 0, // Administered pure
    totalVolume: 50,
    totalDrugMg: 2.5,
    concentrationMcgMl: 50, // 50 mcg/mL
    defaultDoseUnit: 'mcg/kg/h',
    minStandardDose: 1.2,
    maxStandardDose: 4.2,
    standardRecipies: [
      {
        name: 'Infusão Pura / Sem Diluição (Estojo de 50 mL)',
        ampoules: 1,
        mgPerAmpoule: 2.5,
        mlPerAmpoule: 50,
        diluentVolume: 0,
        totalVolume: 50,
      },
      {
        name: 'Fentanil Padrão Clínico (5 ampolas [250mL] + SF0.9% 200mL)',
        ampoules: 1,
        mgPerAmpoule: 2.5,
        mlPerAmpoule: 50,
        diluentVolume: 200,
        totalVolume: 250,
      }
    ],
    note: 'Não requer diluição. Prescrição na prática para 70kg: fentanil puro 50 mL, iniciar a 2 mL/h e reavaliar. Geralmente entre 1 a 4 mL/h são suficientes para analgesia sistêmica contínua.',
    pharmacology: 'Analgésico opióide sintético de extrema potência (~100x mais potente que a morfina). Agonista seletivo de receptores mu-opióides centrais e periféricos.'
  },
  {
    id: 'midazolam',
    name: 'Midazolam',
    chemicalName: 'Midazolam Maleate',
    category: 'sedative',
    ampoules: 10,
    mgPerAmpoule: 15, // 15mg/3mL (5mg/mL)
    mlPerAmpoule: 3,
    diluentVolume: 120, // SG5%
    totalVolume: 150,
    totalDrugMg: 150,
    concentrationMcgMl: 1000, // 150mg / 150ml = 1 mg/ml = 1000 mcg/ml
    defaultDoseUnit: 'mg/kg/h',
    minStandardDose: 0.05,
    maxStandardDose: 0.1,
    standardRecipies: [
      {
        name: 'Solução Padrão (10 ampolas + SG5% 120mL)',
        ampoules: 10,
        mgPerAmpoule: 15,
        mlPerAmpoule: 3,
        diluentVolume: 120,
        totalVolume: 150,
      },
      {
        name: 'Midazolam Padrão Clinico (5 ampolas [75mg/15mL] + SF0.9%/SG5% 110mL)',
        ampoules: 5,
        mgPerAmpoule: 15,
        mlPerAmpoule: 3,
        diluentVolume: 110,
        totalVolume: 125,
      }
    ],
    note: 'Prescrição prática para 70kg: iniciar a 4 mL/h e reavaliar. Benzodiazepínico de prolongada ação acumulativa secundária em pacientes obesos, hepatopatas e com insuficiência renal crônica.',
    pharmacology: 'Benzodiazepínico clássico de ação rápida. Potencializa a facilitação de vias do ácido gama-aminobutírico (GABA-A), resultando em sedação profunda, hipnose, ansiólise e efeito anticonvulsivante.'
  },
  {
    id: 'dexmedetomidine',
    name: 'Dexmedetomidina (Precedex)',
    chemicalName: 'Dexmedetomidine hydrochloride',
    category: 'sedative',
    ampoules: 2,
    mgPerAmpoule: 0.2, // 200 mcg over 2mL ampolas
    mlPerAmpoule: 2,
    diluentVolume: 96, // SF0.9%
    totalVolume: 100,
    totalDrugMg: 0.4, // 400 mcg
    concentrationMcgMl: 4, // 4 mcg/ml
    defaultDoseUnit: 'mcg/kg/h',
    minStandardDose: 0.2,
    maxStandardDose: 0.7,
    standardRecipies: [
      {
        name: 'Solução Padrão (2 ampolas de 2mL + SF0.9% 96mL)',
        ampoules: 2,
        mgPerAmpoule: 0.2,
        mlPerAmpoule: 2,
        diluentVolume: 96,
        totalVolume: 100,
      }
    ],
    note: 'Prescrição na prática para 70kg: iniciar a 3,5 mL/h até 12,25 mL/h de vazão. Excelente sedativo de fácil despertar de cooperação (sedação consciente) sem depressão respiratória nociva em desmames.',
    pharmacology: 'Agonista seletivo dos receptores alfa-2 adrenérgicos de localização central, inibindo a descarga simpática neuronal e o tônus central noradrenérgico.'
  },
  {
    id: 'propofol',
    name: 'Propofol 1%',
    chemicalName: 'Propofol',
    category: 'sedative',
    ampoules: 1,
    mgPerAmpoule: 1000, // 10 mg/ml over 100ml
    mlPerAmpoule: 100,
    diluentVolume: 0, // No diluent, administered pure
    totalVolume: 100,
    totalDrugMg: 1000,
    concentrationMcgMl: 10000, // 10 mg/mL = 10,000 mcg/mL
    defaultDoseUnit: 'mg/kg/h', // Propofol customized value in mg/kg/h
    minStandardDose: 0.5,
    maxStandardDose: 5.0,
    standardRecipies: [
      {
        name: 'Infusão Pura 1% (Frasco de 100 mL)',
        ampoules: 1,
        mgPerAmpoule: 1000,
        mlPerAmpoule: 100,
        diluentVolume: 0,
        totalVolume: 100,
      }
    ],
    note: 'Prescrição prática para 70kg: iniciar a 3,5 mL/h e reavaliar. Emulsão lipídica. Trocar equipo estritamente a cada 12 horas para prevenir colonização bacteriana. Monitorar síndrome de infusão (PRIS).',
    pharmacology: 'Anestésico venoso de ação rápida ultra-curta. Atua facilitando os efeitos inibitórios pós-sinápticos mediados pelo GABA nos canais de cloro centrais.'
  },
  {
    id: 'ketamine',
    name: 'Cetamina / Ketamina',
    chemicalName: 'Ketamine Hydrochloride',
    category: 'sedative',
    ampoules: 1,
    mgPerAmpoule: 500, // 50mg/mL over 10mL = 500mg
    mlPerAmpoule: 10,
    diluentVolume: 240, // SF0.9%
    totalVolume: 250,
    totalDrugMg: 500,
    concentrationMcgMl: 2000, // 2000 mcg/ml = 2 mg/ml
    defaultDoseUnit: 'mg/kg/h',
    minStandardDose: 0.5,
    maxStandardDose: 1.0,
    standardRecipies: [
      {
        name: 'Solução Padrão (1 ampola de 10mL + SF0.9% 240mL)',
        ampoules: 1,
        mgPerAmpoule: 500,
        mlPerAmpoule: 10,
        diluentVolume: 240,
        totalVolume: 250,
      }
    ],
    note: 'Prescrição prática para 70kg: iniciar a 17,5 mL/h até 35,0 mL/h. Excelente para broncodilatação ou estabilidade pressórica no idoso e choque séptico grave.',
    pharmacology: 'Agente anestésico dissociativo rápido. Age como um potente bloqueador de canais e antagonista não-competitivo de receptores NMDA centrais.'
  },
  {
    id: 'morphine',
    name: 'Morfina',
    chemicalName: 'Morphine Sulfate',
    category: 'sedative',
    ampoules: 10,
    mgPerAmpoule: 10, // 10 ampolas de 10mg
    mlPerAmpoule: 1,
    diluentVolume: 90, // SF0.9%
    totalVolume: 100,
    totalDrugMg: 100,
    concentrationMcgMl: 1000, // 1000 mcg/mL = 1 mg/mL
    defaultDoseUnit: 'mg/h',
    minStandardDose: 2.0,
    maxStandardDose: 20.0,
    standardRecipies: [
      {
        name: 'Dripping em Cuidados Paliativos (10 mL Morfina + 90 mL SF0,9%)',
        ampoules: 10,
        mgPerAmpoule: 10,
        mlPerAmpoule: 1,
        diluentVolume: 90,
        totalVolume: 100,
      }
    ],
    note: 'Ataque: 1mL (10mg) + 10mL AD (água destilada) administrando 2 mg (2 mL) em bólus EV. Manutenção por bomba de infusão (Dripping): iniciar a 2,0 mL/h até 20,0 mL/h.',
    pharmacology: 'Opióide natural fenantrênico de alta absorção central do SNC. Agonista primário dos receptores mu-opióides supraespinhais e espinhais.'
  },
  {
    id: 'cisatracurium',
    name: 'Cisatracúrio',
    chemicalName: 'Cisatracurium besilate',
    category: 'neuroblocker',
    ampoules: 5,
    mgPerAmpoule: 20, // 5 ampolas (50mL) com 20mg cada = 100mg
    mlPerAmpoule: 10,
    diluentVolume: 50, // SF0.9%
    totalVolume: 100,
    totalDrugMg: 100,
    concentrationMcgMl: 1000, // 1 mg/mL = 1000 mcg/mL
    defaultDoseUnit: 'mcg/kg/min',
    minStandardDose: 1.0,
    maxStandardDose: 3.0,
    standardRecipies: [
      {
        name: 'Solução Padrão (2 mg/mL) 5 ampolas (50mL) + 50 mL SF 0,9%',
        ampoules: 5,
        mgPerAmpoule: 20,
        mlPerAmpoule: 10,
        diluentVolume: 50,
        totalVolume: 100,
      }
    ],
    note: 'Prescrição de manutenção no choque e SARA (70kg): iniciar a 4.2 mL/h até 12.6 mL/h. Eliminação peculiar por degradação espontânea plasmática pH/Temperatura dependente (Reação de Hofmann).',
    pharmacology: 'Bloqueador neuromuscular não-despolarizante de duração intermediária da classe dos compostos bisester-benzilisoquinolínicos.'
  },
  {
    id: 'atracurium',
    name: 'Atracúrio',
    chemicalName: 'Atracurium besilate',
    category: 'neuroblocker',
    ampoules: 2,
    mgPerAmpoule: 50, // 2 ampolas de 5mL com 50mg cada (10mg/mL) = 100mg
    mlPerAmpoule: 5,
    diluentVolume: 90, // SF0.9% ou SG5%
    totalVolume: 100,
    totalDrugMg: 100,
    concentrationMcgMl: 1000, // 1 mg/mL = 1000 mcg/mL
    defaultDoseUnit: 'mcg/kg/min',
    minStandardDose: 5.0,
    maxStandardDose: 10.0,
    standardRecipies: [
      {
        name: 'Solução Padrão (10 mL de Atracúrio em 90 mL de SF0.9% ou SG5%)',
        ampoules: 2,
        mgPerAmpoule: 50,
        mlPerAmpoule: 5,
        diluentVolume: 90,
        totalVolume: 100,
      }
    ],
    note: 'Prescrição clínica na prática (70kg): iniciar a 21,0 mL/h até 42,0 mL/h. Eliminação parcial de Hofmann com leve liberação histórica de histamina (risco alergia periférica local de fluxo e rubor).',
    pharmacology: 'Bloqueador neuromuscular não-despolarizante de duração média que atua bloqueando competitivamente a ligação da acetilcolina nos receptores nicotínicos pós-sinápticos.'
  },
  {
    id: 'rocuronium',
    name: 'Rocurônio',
    chemicalName: 'Rocuronium bromide',
    category: 'neuroblocker',
    ampoules: 2,
    mgPerAmpoule: 50, // 50mg/5mL (10mg/mL) ampolas
    mlPerAmpoule: 5,
    diluentVolume: 90, // SF0.9%
    totalVolume: 100,
    totalDrugMg: 100,
    concentrationMcgMl: 1000, // 1 mg/mL = 1000 mcg/mL
    defaultDoseUnit: 'mg/kg/h',
    minStandardDose: 0.3,
    maxStandardDose: 0.6,
    standardRecipies: [
      {
        name: 'Solução Padrão (10 mL em 90 mL de SF0,9%)',
        ampoules: 2,
        mgPerAmpoule: 50,
        mlPerAmpoule: 5,
        diluentVolume: 90,
        totalVolume: 100,
      }
    ],
    note: 'Prescrição clínica na prática (70kg): iniciar a 21,0 mL/h até 42,0 mL/h. Excelente alternativa para intubação de sequência rápida (ISR). Desprovido de efeito acumulativo, eliminação biliar principal.',
    pharmacology: 'Bloqueador neuromuscular esteroide não-despolarizante com tempo de latência rápido e tempo de ação clínica intermediário.'
  },
  {
    id: 'pancuronium',
    name: 'Pancurônio',
    chemicalName: 'Pancuronium bromide',
    category: 'neuroblocker',
    ampoules: 10,
    mgPerAmpoule: 4, // 2mg/mL over 2mL ampolas = 4mg
    mlPerAmpoule: 2,
    diluentVolume: 80, // SF0,9%
    totalVolume: 100,
    totalDrugMg: 40,
    concentrationMcgMl: 400, // 40mg / 100mL = 400 mcg/mL = 0.4 mg/mL
    defaultDoseUnit: 'mg/kg/h',
    minStandardDose: 0.02,
    maxStandardDose: 0.07,
    standardRecipies: [
      {
        name: 'Solução Padrão (20 mL em 80 mL de SF0,9%)',
        ampoules: 10,
        mgPerAmpoule: 4,
        mlPerAmpoule: 2,
        diluentVolume: 80,
        totalVolume: 100,
      }
    ],
    note: 'Prescrição de bloqueio contínuo (70kg): iniciar a 3,5 mL/h até 12,3 mL/h de vazão. Longa duração de ação. Acumula consideravelmente na presença de falência renal crônica grave.',
    pharmacology: 'Bloqueador neuromuscular de longa duração amônio-bisquaternário esteroidal clásico com efeitos vagolíticos de taquicardia associados.'
  },
  {
    id: 'insulin',
    name: 'Insulina Regular',
    chemicalName: 'Regular Soluble Insulin',
    category: 'other',
    ampoules: 1, // 1 ml injected
    mgPerAmpoule: 100, // 100 UI per mL (we map UI directly to mg for calculation engine)
    mlPerAmpoule: 1,
    diluentVolume: 99, // SF0.9% 99ml
    totalVolume: 100,
    totalDrugMg: 100, // In UI
    concentrationMcgMl: 1, // 1 UI / mL
    defaultDoseUnit: 'UI/h',
    minStandardDose: 0.5,
    maxStandardDose: 20,
    standardRecipies: [
      {
        name: 'Padrão (100 UI em 100mL de SF0.9%)',
        ampoules: 1,
        mgPerAmpoule: 100, // In UI
        mlPerAmpoule: 1,
        diluentVolume: 99,
        totalVolume: 100,
      }
    ],
    note: 'Desprezar os primeiros 20 mL da solução do equipo para saturar os sítios de ligação ao plástico de PVC antes de ligar ao paciente. Monitorar glicemia capilar de hora em hora.',
    pharmacology: 'Hormônio pancreático exógeno que facilita a captação intracelular de glicose e repõe potássio ao espaço intracelular. Indicada em cetoacidose diabética (CAD), estado hiperosmolar e controle glicêmico intensivo.'
  },
  {
    id: 'amiodarone',
    name: 'Amiodarona',
    chemicalName: 'Amiodarone Hydrochloride',
    category: 'other',
    ampoules: 6,
    mgPerAmpoule: 150, // 150mg/3mL
    mlPerAmpoule: 3,
    diluentVolume: 432, // SG5% (6 ampolas = 18mL + 432mL SG5% = 450mL)
    totalVolume: 450,
    totalDrugMg: 900,
    concentrationMcgMl: 2000, // 900mg / 450mL = 2 mg/mL = 2000 mcg/mL
    defaultDoseUnit: 'mg/h',
    minStandardDose: 30, // 15 mL/h = 30 mg/h
    maxStandardDose: 100,
    standardRecipies: [
      {
        name: 'Infusão de Manutenção (6 ampolas + 432mL SG5% em 24h)',
        ampoules: 6,
        mgPerAmpoule: 150,
        mlPerAmpoule: 3,
        diluentVolume: 432,
        totalVolume: 450,
      }
    ],
    note: 'Ataque: Amiodarona 150 mg (1 ampola) + 100 mL SG5% em 20 min. Manutenção: Iniciar a 30 mL/h (60 mg/h) nas primeiras 6 horas; reduzir para 15 mL/h (30 mg/h) nas próximas 18 horas. REQUER SG5% exclusão de flebite.',
    pharmacology: 'Antiarrítmico de classe III (prolonga o potencial de ação e o período refratário por bloqueio dos canais de potássio), possuindo também leve bloqueio nos canais de sódio, cálcio de receptores beta.'
  },
  {
    id: 'glycemic_control',
    name: 'Controle Glicêmico (CGI)',
    chemicalName: 'Protocolo de Insulina Regular Contínua',
    category: 'other',
    ampoules: 1,
    mgPerAmpoule: 100, // 100 UI = 1 mL
    mlPerAmpoule: 1,
    diluentVolume: 99,
    totalVolume: 100,
    totalDrugMg: 100,
    concentrationMcgMl: 1, // 1 UI/mL
    defaultDoseUnit: 'UI/h',
    minStandardDose: 0.5,
    maxStandardDose: 20,
    standardRecipies: [
      {
        name: 'Solução CGI Clássica (100 UI de Insulina Regular + 99 mL de SF 0,9%)',
        ampoules: 1,
        mgPerAmpoule: 100,
        mlPerAmpoule: 1,
        diluentVolume: 99,
        totalVolume: 100
      }
    ],
    note: 'Protocolo dinâmico de ajuste horário de insulina regular por HGT. Realizar trocas ou aferições de glicemia capilar de hora em hora. Desprezar os primeiros 20 mL de solução para saturar os sítios plásticos.',
    pharmacology: 'Controle glicêmico intensivo que foca em taxas dinâmicas de queda e metas seguras de euglicemia (140-180 mg/dL), evitando hipoglicemia severa em pacientes críticos.'
  },
  {
    id: 'polarizing_sol',
    name: 'Solução Polarizante (Hipercalemia)',
    chemicalName: 'Solução Glico-Insulina (G0+IR)',
    category: 'other',
    ampoules: 1,
    mgPerAmpoule: 10, // 10 UI
    mlPerAmpoule: 1,
    diluentVolume: 100, // 100mL de SG50%
    totalVolume: 100,
    totalDrugMg: 10,
    concentrationMcgMl: 0.1, // 10 UI / 100 mL
    defaultDoseUnit: 'UI/h',
    minStandardDose: 10,
    maxStandardDose: 10,
    standardRecipies: [
      {
        name: 'Protocolo Clássico Rápido (100 mL de SG 50% + 10 UI de Insulina Regular)',
        ampoules: 1,
        mgPerAmpoule: 10,
        mlPerAmpoule: 1,
        diluentVolume: 100,
        totalVolume: 100
      },
      {
        name: 'Protocolo Intermediário (500 mL de SG 10% + 10 UI de Insulina Regular)',
        ampoules: 1,
        mgPerAmpoule: 10,
        mlPerAmpoule: 1,
        diluentVolume: 500,
        totalVolume: 501
      }
    ],
    note: 'Utilizado no tratamento imediato da hipercalemia aguda (K > 6,0 mEq/L ou alterações de ECG). Sempre monitorar glicemia capilar a cada 30-60 minutos para evitar hipoglicemia iatrogênica tardia.',
    pharmacology: 'A insulina estimula os receptores de membrana celular para ativar o co-transportador Na+/K+ ATPase, promovendo a entrada rápida de potássio intracelular, diminuindo a calemia plasmática por algumas horas.'
  },
  {
    id: 'phenytoin',
    name: 'Fenitoína EV',
    chemicalName: 'Hidantal / Anticonvulsivante',
    category: 'other',
    ampoules: 4,
    mgPerAmpoule: 250, // 250mg por ampola de 5mL
    mlPerAmpoule: 5,
    diluentVolume: 250,
    totalVolume: 270,
    totalDrugMg: 1000,
    concentrationMcgMl: 3.7,
    defaultDoseUnit: 'mg/kg/h',
    minStandardDose: 15,
    maxStandardDose: 20,
    standardRecipies: [
      {
        name: 'Dose de Ataque Padrão (Diluição em 250 mL de SF 0,9%)',
        ampoules: 4,
        mgPerAmpoule: 250,
        mlPerAmpoule: 5,
        diluentVolume: 250,
        totalVolume: 270
      }
    ],
    note: 'SÓ DEVE SER DILUÍDA EM SORO FISIOLÓGICO (SF 0,9%). Há alto risco de precipitação se diluído em Soro Glicosado (SG). Administrar com velocidade máxima de 50 mg/min (idosos/cardiopatas: 25 mg/min) sob monitorização.',
    pharmacology: 'Bloqueador de canais de sódio voltagem-dependentes, limitando disparos repetitivos e estabilizando membranas celulares neuronais no tálamo e córtex.'
  },
  {
    id: 'heparin_infusion',
    name: 'Heparinização (HNF)',
    chemicalName: 'Heparina Sódica Não Fracionada',
    category: 'other',
    ampoules: 1,
    mgPerAmpoule: 25000, // 25.000 UI em 5 mL
    mlPerAmpoule: 5,
    diluentVolume: 245,
    totalVolume: 250,
    totalDrugMg: 25000,
    concentrationMcgMl: 100, // 100 UI / mL
    defaultDoseUnit: 'UI/h',
    minStandardDose: 1000,
    maxStandardDose: 2000,
    standardRecipies: [
      {
        name: 'Diluição Clássica (25.000 UI [5 mL] + 245 mL SF 0,9%)',
        ampoules: 1,
        mgPerAmpoule: 25000,
        mlPerAmpoule: 5,
        diluentVolume: 245,
        totalVolume: 250
      }
    ],
    note: 'Infundido exclusivamente em bomba de infusão contínua. Alvo terapêutico medido via relação de TTPA (geralmente entre 1.5 e 2.5). Monitorar plaquetas a cada 2-3 dias devido ao risco de bicitopenia induzida (HIT).',
    pharmacology: 'Liga-se e acelera a atividade da antitrombina III em até 1000 vezes, inibindo as serino-proteases da cascata de coagulação, especialmente Trombina (IIa) e Fator Xa.'
  }
];
