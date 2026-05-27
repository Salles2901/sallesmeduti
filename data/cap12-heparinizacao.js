// Capítulo 12 — Heparinização (HNF e HBPM)
// Fonte: Guia MedRoute, p. 66-69

export const heparinizacao = {
  id: "heparinizacao",
  num: 12,
  titulo: "Heparinização (HNF e HBPM)",
  intro: "Esquemas de anticoagulação plena com heparina de baixo peso (Enoxaparina) e heparina não fracionada (HNF), e protocolos de reversão.",

  hbpm: {
    titulo: "Heparinização Plena com Heparina de Baixo Peso (Enoxaparina)",
    esquemas: [
      {
        cenario: "TVP/TEP ou SCA sem Supra-ST",
        esquema: "Enoxaparina 1 mg/kg SC de 12/12 h.",
        ajustes: [
          "Idade > 75 anos: dose é 0,75 mg/kg",
          "IRC com ClCr < 30 mL/min: 1 mg/kg de 24/24 h"
        ]
      },
      {
        cenario: "SCA com Supra-ST — Se < 75 anos",
        esquema: "Ataque 30 mg EV + Manutenção 1 mg/kg SC de 12/12 h (dose máxima 100 mg)."
      },
      {
        cenario: "SCA com Supra-ST — Se > 75 anos",
        esquema: "Não fazer ataque. Manutenção 0,75 mg/kg SC de 12/12 h."
      },
      {
        cenario: "ClCr < 30 mL/min",
        esquema: "1 mg/kg SC de 24/24 h."
      }
    ],
    contraindicacoes: [
      "Sangramento ativo",
      "INR > 3 | PTT > 120 s | Plaquetas < 40.000 | Hb < 6",
      "AVC isquêmico em fase aguda",
      "AVCh (avaliar risco-benefício)",
      "Hipersensibilidade à heparina",
      "Trombocitopenia induzida por Heparina prévia"
    ]
  },

  hnf: {
    titulo: "Heparinização Plena com Heparina Não Fracionada",
    preparo: {
      ampola: "5.000 unidades/mL (5 mL)",
      solucao: "HNF 5 mL (25.000 UI) + 245 mL de SG 5% EV em BIC → solução com 100 UI/mL"
    },
    esquemas: [
      {
        cenario: "TVP ou TEP",
        bolus: "Bólus inicial de 80 UI/kg (máx 5000 UI)",
        manutencao: "Infusão contínua a 18 UI/kg/h"
      },
      {
        cenario: "Síndrome Coronariana Aguda",
        bolus: "Bólus inicial de 60 UI/kg (máx 5000 UI)",
        manutencao: "Infusão contínua a 12 UI/kg/h"
      }
    ],
    monitorizacao: "Solicitar PTTa a cada 6 horas e ajustar conforme tabela.",
    tabelaAjuste: [
      { ptta: "< 35 s",   bolus: "80 U/kg",  interrupcao: "—",                       mudanca: "↑ 4 U/kg/h" },
      { ptta: "35–45 s",  bolus: "40 U/kg",  interrupcao: "—",                       mudanca: "↑ 3 U/kg/h" },
      { ptta: "46–60 s",  bolus: "40 U/kg",  interrupcao: "—",                       mudanca: "↑ 2 U/kg/h" },
      { ptta: "61–85 s",  bolus: "Não",      interrupcao: "—",                       mudanca: "Manter" },
      { ptta: "86–110 s", bolus: "Não",      interrupcao: "—",                       mudanca: "↓ 2 U/kg/h" },
      { ptta: "> 110 s",  bolus: "Não",      interrupcao: "Interromper infusão 1 h", mudanca: "↓ 4 U/kg/h" }
    ]
  },

  reversao: {
    titulo: "Reversão de Anticoagulação com Protamina",
    hnf: {
      titulo: "HNF",
      regras: [
        "Cada 1 mg de Protamina neutraliza 100 U de HNF",
        "Meia-vida da HNF: 60–90 min — considerar dose realizada nas últimas 2–3 h",
        "Diluir em 100 mL de SF 0,9%",
        "Administração lenta EV (5 mg/min)",
        "Dose máxima: 50 mg",
        "Exemplo: paciente com 1250 U/h de HNF → fazer 30 mg de Protamina"
      ]
    },
    hbpm: {
      titulo: "HBPM (Enoxaparina)",
      regras: [
        "Cada 1 mg de Protamina reverte cerca de 70% de HBPM",
        "Diluir em 100 mL de SF 0,9%",
        "Administração lenta EV (5 mg/min)",
        "Dose máxima: 50 mg"
      ],
      tempoDose: [
        { tempo: "Enoxaparina feita < 8 h", dose: "1 mg de Protamina para cada 1 mg de Enoxaparina" },
        { tempo: "Enoxaparina feita em 8–12 h", dose: "0,5 mg de Protamina para cada 1 mg de Enoxaparina" },
        { tempo: "Enoxaparina feita > 12 h", dose: "Em geral não há indicação do uso da Protamina" }
      ]
    },
    apresentacao: "Protamina (10 mg/mL) — Ampola de 5 mL"
  }
};
