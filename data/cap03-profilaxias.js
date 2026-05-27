// Capítulo 3 — Profilaxias na UTI (TVP, LAMG, LPP)
// Fonte: Guia MedRoute, p. 15-20

export const profilaxias = {
  id: "profilaxias",
  num: 3,
  titulo: "Profilaxias na UTI",
  intro: "Profilaxias essenciais ao paciente crítico: trombose venosa profunda, lesão aguda de mucosa gástrica e lesão por pressão.",

  itens: [
    {
      id: "tvp",
      nome: "Profilaxia de Trombose Venosa Profunda (TVP)",
      descricao: "A TVP é uma das entidades clínicas de maior impacto em pacientes internados. A embolia pulmonar é uma das principais causas de morte hospitalar.",

      escorePadua: {
        titulo: "Estratificação de Risco (modelo de Pádua / Kucher adaptado)",
        fatores: [
          { fator: "Câncer ativo", pontos: 3 },
          { fator: "Histórico pessoal de TEV", pontos: 3 },
          { fator: "Redução da mobilidade > 24 h", pontos: 3 },
          { fator: "Condições de trombofilia", pontos: 3 },
          { fator: "Cirurgia ou trauma recente (< 1 mês)", pontos: 2 },
          { fator: "Idade ≥ 70 anos", pontos: 1 },
          { fator: "Insuficiência pulmonar ou cardíaca", pontos: 1 },
          { fator: "IAM ou AVC recente (< 1 mês)", pontos: 1 },
          { fator: "Obesidade (IMC ≥ 30)", pontos: 1 },
          { fator: "Infecção aguda e/ou doença reumatológica", pontos: 1 },
          { fator: "Uso de contraceptivo ou TRH", pontos: 1 },
          { fator: "COVID-19", pontos: "Alto risco" }
        ],
        interpretacao: "0–3 pontos: Baixo Risco · ≥ 4 pontos: Alto Risco"
      },

      farmacologica: [
        {
          droga: "Heparina Não Fracionada (HNF)",
          dose: "5000 U SC de 8/8 h",
          obs: "Preferir em insuficiência renal grave (menor eliminação renal)."
        },
        {
          droga: "Enoxaparina (HBPM)",
          dose: "40 mg SC 1×/dia",
          obs: "Se ClCr < 30 mL/min: 20 mg SC 1×/dia."
        },
        {
          droga: "Fondaparinux",
          dose: "2,5 mg SC 1×/dia",
          obs: "Sem ajuste renal."
        }
      ],

      mecanica: [
        "Compressor Pneumático Intermitente (CPI) de membros inferiores",
        "Meias elásticas, deambulação precoce, exercícios ativos e passivos com fisioterapia"
      ],

      contraindicacoes: [
        "Sangramento ativo clinicamente significativo",
        "Hipersensibilidade / Trombocitopenia induzida por Heparina",
        "Hemorragia do SNC",
        "Antes de procedimentos cirúrgicos ou punção liquórica",
        "Coagulopatias importantes"
      ]
    },

    {
      id: "lamg",
      nome: "Profilaxia de Lesão Aguda de Mucosa Gástrica (LAMG)",
      descricao: "Profilaxia indicada quando houver fatores de risco para sangramento digestivo agudo.",

      fluxograma: {
        gatilhoSempre: [
          "Uso prévio de IBP",
          "Dupla antiagregação ou anticoagulação plena",
          "História de sangramento digestivo < 1 ano"
        ],
        fatoresMaiores: [
          "Ventilação Mecânica > 48 horas",
          "Coagulopatia (INR > 1,5 | Plaquetas < 50.000 | TTPa > 2,0)",
          "ECMO"
        ],
        fatoresMenores: [
          "Insuficiência hepática aguda ou crônica",
          "Insuficiência renal aguda ou crônica",
          "Sepse",
          "Coma | TCE grave",
          "Politrauma grave ou TRM",
          "Grandes queimados (SCQ > 20%)",
          "Altas doses de corticoides (> 250 mg/dia hidrocortisona)",
          "Uso de anticoagulantes, antiplaquetários ou AINEs"
        ],
        regra: "Fator maior → Iniciar profilaxia. Apenas fator menor → considerar. Nenhum → não fazer."
      },

      medicacoes: {
        ibp: [
          { droga: "Omeprazol", enteral: "20–40 mg/dia", ev: "20–40 mg/dia" },
          { droga: "Lansoprazol", enteral: "15–30 mg/dia", ev: "—" },
          { droga: "Pantoprazol", enteral: "40 mg/dia", ev: "40 mg/dia" }
        ],
        h2: [
          { droga: "Cimetidina", enteral: "200–400 mg 12/12 h", ev: "300 mg 6/6 h" },
          { droga: "Ranitidina", enteral: "150 mg 12/12 h", ev: "50 mg 8/8 h" },
          { droga: "Famotidina", enteral: "20–40 mg/dia", ev: "—" }
        ],
        outros: [
          { droga: "Sucralfato", enteral: "1 g 6/6 h", ev: "—" }
        ],
        complementar: "Iniciar precocemente nutrição enteral ou oral."
      }
    },

    {
      id: "lpp",
      nome: "Profilaxia de Lesão / Úlcera por Pressão (LPP)",
      descricao: "Lesão por contato prolongado com superfícies rígidas. Porta de entrada para microrganismos, dor, prolonga internação. Predomínio de cuidado da enfermagem, mas o médico deve reconhecer e participar.",

      escala: "Escala de Braden",
      regras: [
        { escore: "Escore > 13", conduta: "Sem risco de LPP — medidas gerais e reavaliação." },
        { escore: "Escore ≤ 13", conduta: "Iniciar Protocolo de Prevenção." },
        { escore: "LPP já presente", conduta: "Tratamento dirigido ao estágio da lesão (equipe multidisciplinar)." }
      ],

      medidas: [
        "Inspeção diária da pele",
        "Manutenção do paciente seco e pele hidratada",
        "Otimização nutricional",
        "Minimizar a pressão",
        "Mudança de decúbito de 2/2 h",
        "Prevenção de fricção e cisalhamento"
      ]
    }
  ]
};
