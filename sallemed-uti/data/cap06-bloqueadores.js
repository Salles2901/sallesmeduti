// Capítulo 6 — Bloqueadores Neuromusculares
// Fonte: Guia MedRoute, p. 34-36

export const bloqueadores = {
  id: "bloqueadores",
  num: 6,
  titulo: "Bloqueadores Neuromusculares",
  intro: "Bloqueadores neuromusculares em infusão contínua. Sempre acompanhar de sedação plena.",
  drogas: [
    {
      id: "cisatracurio",
      nome: "Cisatracúrio",
      ampola: "10 mg/5 mL (2 mg/mL)",
      diluicao: "5 ampolas (50 mL) + 50 mL de SF 0,9%",
      volumeTotal_mL: 100,
      concentracao: "1 mg/mL",
      concentracao_mcg_mL: 1000,
      faixa: { min: 1.0, max: 3.0, unidade: "mcg/kg/min" },
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 1.0, label: "Mínima (1,0 mcg/kg/min)", valores: [3.0, 3.6, 4.2, 4.8, 5.4, 6.0] },
          { dose: 3.0, label: "Máxima (3,0 mcg/kg/min)", valores: [9.0, 10.8, 12.6, 14.4, 16.2, 18.0] }
        ]
      },
      prescricaoPratica: "Cisatracúrio (2 mg/mL) 50 mL + 50 mL de SF 0,9% EV em BIC.\nIniciar a 4,2 mL/h (70 kg) até 12,6 mL/h."
    },
    {
      id: "atracurio",
      nome: "Atracúrio",
      ampola: "10 mg/mL (ampola de 5 mL)",
      diluicao: "10 mL + 90 mL de SF 0,9% ou SG 5%",
      volumeTotal_mL: 100,
      concentracao: "1 mg/mL",
      concentracao_mcg_mL: 1000,
      faixa: { min: 5.0, max: 10.0, unidade: "mcg/kg/min" },
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 5.0,  label: "Mínima (5 mcg/kg/min)",  valores: [15.0, 18.0, 21.0, 24.0, 27.0, 30.0] },
          { dose: 10.0, label: "Máxima (10 mcg/kg/min)", valores: [30.0, 36.0, 42.0, 48.0, 54.0, 60.0] }
        ]
      },
      prescricaoPratica: "Atracúrio (10 mg/mL) 10 mL + 90 mL de SF 0,9% EV em BIC.\nIniciar a 21,0 mL/h (70 kg) até 42,0 mL/h."
    },
    {
      id: "rocuronio",
      nome: "Rocurônio",
      ampola: "10 mg/mL (ampola de 5 mL)",
      diluicao: "10 mL + 90 mL de SF 0,9%",
      volumeTotal_mL: 100,
      concentracao: "1 mg/mL",
      concentracao_mcg_mL: 1000,
      faixa: { min: 0.3, max: 0.6, unidade: "mg/kg/h" },
      // REVISAR: PDF lista "µg/kg/h" — números da tabela só batem com mg/kg/h
      observacaoUnidade: "Unidade corrigida: o PDF imprime µg/kg/h, mas os valores da tabela só batem com mg/kg/h.",
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.3, label: "Mínima (0,3 mg/kg/h)", valores: [15.0, 18.0, 21.0, 24.0, 27.0, 30.0] },
          { dose: 0.6, label: "Máxima (0,6 mg/kg/h)", valores: [30.0, 36.0, 42.0, 48.0, 54.0, 60.0] }
        ]
      },
      prescricaoPratica: "Rocurônio (10 mg/mL) 10 mL + 90 mL de SF 0,9% EV em BIC.\nIniciar a 21,0 mL/h (70 kg) até 42,0 mL/h."
    },
    {
      id: "pancuronio",
      nome: "Pancurônio",
      ampola: "2 mg/mL (ampola de 2 mL)",
      diluicao: "20 mL + 80 mL de SF 0,9%",
      volumeTotal_mL: 100,
      concentracao: "0,4 mg/mL",
      concentracao_mcg_mL: 400,
      faixa: { min: 0.02, max: 0.07, unidade: "mg/kg/h" },
      // REVISAR: PDF lista "µg/kg/h" — números da tabela só batem com mg/kg/h
      observacaoUnidade: "Unidade corrigida: o PDF imprime µg/kg/h, mas os valores da tabela só batem com mg/kg/h.",
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.02, label: "Mínima (0,02 mg/kg/h)", valores: [2.5, 3.0, 3.5, 4.0, 4.5, 5.0] },
          { dose: 0.07, label: "Máxima (0,07 mg/kg/h)", valores: [8.8, 10.5, 12.3, 14.0, 15.8, 17.5] }
        ]
      },
      prescricaoPratica: "Pancurônio (2 mg/mL) 20 mL + 80 mL de SF 0,9% EV em BIC.\nIniciar a 3,5 mL/h (70 kg) até 12,3 mL/h."
    }
  ]
};
