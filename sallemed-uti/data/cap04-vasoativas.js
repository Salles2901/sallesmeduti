// Capítulo 4 — Prescrição de Drogas Vasoativas
// Fonte: Guia Prático de Plantão – Terapia Intensiva (MedRoute, 1ª ed.), p. 22-28

export const vasoativas = {
  id: "vasoativas",
  num: 4,
  titulo: "Drogas Vasoativas",
  intro: "Drogas vasoativas em infusão contínua para suporte hemodinâmico. Todas as diluições assumem ampola comercial brasileira. As tabelas mostram velocidade de infusão (mL/h) calculada para os pesos 50–100 kg.",
  drogas: [
    {
      id: "adrenalina",
      nome: "Adrenalina",
      ampola: "1 mg/mL (ampolas de 1 mL)",
      diluicao: "10 mL de Adrenalina + 90 mL de SF 0,9%",
      volumeTotal_mL: 100,
      concentracao: "100 mcg/mL",
      concentracao_mcg_mL: 100,
      faixa: { min: 0.1, max: 2.0, unidade: "mcg/kg/min" },
      // NOTA: o guia rotula a faixa como "mcg/kg/h" mas as tabelas confirmam mcg/kg/min. // REVISAR
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.1, label: "Mínima (0,1 mcg/kg/min)", valores: [3.0, 3.6, 4.2, 4.8, 5.4, 6.0] },
          { dose: 2.0, label: "Máxima (2,0 mcg/kg/min)", valores: [60.0, 72.0, 84.0, 96.0, 108.0, 120.0] }
        ]
      },
      prescricaoPratica: "Adrenalina (1 mg/mL) 10 mL + 90 mL de SF 0,9% EV em BIC.\nIniciar a 4,2 mL/h (70 kg) até 84,0 mL/h."
    },
    {
      id: "dobutamina-1000",
      nome: "Dobutamina",
      variante: "menos concentrada",
      varianteGrupo: "dobutamina",
      ampola: "250 mg/20 mL (12,5 mg/mL)",
      diluicao: "1 ampola (20 mL) + 230 mL de SF 0,9% ou SG 5%",
      volumeTotal_mL: 250,
      concentracao: "1000 mcg/mL",
      concentracao_mcg_mL: 1000,
      faixa: { min: 2.5, max: 20, unidade: "mcg/kg/min" },
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 2.5, label: "Mínima (2,5 mcg/kg/min)", valores: [7.5, 9.0, 10.5, 12.0, 13.5, 15.0] },
          { dose: 20, label: "Máxima (20 mcg/kg/min)", valores: [60.0, 72.0, 84.0, 96.0, 108.0, 120.0] }
        ]
      },
      prescricaoPratica: "Dobutamina (12,5 mg/mL) 20 mL + 230 mL de SF 0,9% EV em BIC.\nIniciar a 10,5 mL/h (70 kg) até 84,0 mL/h."
    },
    {
      id: "dobutamina-4000",
      nome: "Dobutamina",
      variante: "mais concentrada",
      varianteGrupo: "dobutamina",
      ampola: "250 mg/20 mL (12,5 mg/mL)",
      diluicao: "4 ampolas (80 mL) + 170 mL de SF 0,9% ou SG 5%",
      volumeTotal_mL: 250,
      concentracao: "4000 mcg/mL",
      concentracao_mcg_mL: 4000,
      faixa: { min: 2.5, max: 20, unidade: "mcg/kg/min" },
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 2.5, label: "Mínima (2,5 mcg/kg/min)", valores: [1.9, 2.3, 2.6, 3.0, 3.4, 3.8] },
          { dose: 20, label: "Máxima (20 mcg/kg/min)", valores: [15.0, 18.0, 21.0, 24.0, 27.0, 30.0] }
        ]
      },
      prescricaoPratica: "Dobutamina (12,5 mg/mL) 80 mL + 170 mL de SF 0,9% EV em BIC.\nIniciar a 2,6 mL/h (70 kg) até 21,0 mL/h."
    },
    {
      id: "dopamina",
      nome: "Dopamina",
      ampola: "50 mg/10 mL (5 mg/mL)",
      diluicao: "5 ampolas (50 mL) + 200 mL de SG 5% ou SF 0,9%",
      volumeTotal_mL: 250,
      concentracao: "1000 mcg/mL",
      concentracao_mcg_mL: 1000,
      faixa: { min: 5, max: 20, unidade: "mcg/kg/min" },
      observacoes: "Doses por faixa de receptor:\n• 5–10 mcg/kg/min: efeito β₁ (↑FC e contratilidade)\n• 11–20 mcg/kg/min: efeito α (↑RVS)\n• > 20 mcg/kg/min: não recomendado — preferir noradrenalina.",
      tabela: {
        legenda: "Dose Beta (5–10 mcg/kg/min)",
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 5, label: "Beta mínima (5 mcg/kg/min)", valores: [15.0, 18.0, 21.0, 24.0, 27.0, 30.0] },
          { dose: 10, label: "Beta máxima (10 mcg/kg/min)", valores: [30.0, 36.0, 42.0, 48.0, 54.0, 60.0] }
        ]
      },
      tabelaExtra: {
        legenda: "Dose Alfa (11–20 mcg/kg/min)",
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 11, label: "Alfa mínima (11 mcg/kg/min)", valores: [33.0, 39.6, 46.2, 52.8, 59.4, 64.7] },
          { dose: 20, label: "Alfa máxima (20 mcg/kg/min)", valores: [60.0, 72.0, 84.0, 96.0, 108.0, 120.0] }
        ]
      },
      prescricaoPratica: "Dopamina (5 mg/mL) 50 mL + 200 mL de SG 5% EV em BIC.\nIniciar conforme efeito desejado (β: 5–10 / α: 11–20 mcg/kg/min)."
    },
    {
      id: "noradrenalina-64",
      nome: "Noradrenalina",
      variante: "menos concentrada",
      varianteGrupo: "noradrenalina",
      ampola: "4 mg/4 mL (1 mg/mL)",
      diluicao: "4 ampolas (16 mL) + 234 mL de SG 5%",
      volumeTotal_mL: 250,
      concentracao: "64 mcg/mL",
      concentracao_mcg_mL: 64,
      faixa: { min: 0.01, max: 1.5, unidade: "mcg/kg/min" },
      observacoes: "Não há dose máxima estabelecida. Doses > 0,5 mcg/kg/min na sepse: recomenda-se associar vasopressina.",
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.01, label: "Mínima (0,01 mcg/kg/min)", valores: [0.5, 0.6, 0.7, 0.8, 0.9, 1.0] },
          { dose: 1.5, label: "Máxima (1,5 mcg/kg/min)", valores: [70.3, 84.4, 98.4, 112.5, 126.6, 140.6] }
        ]
      },
      prescricaoPratica: "Noradrenalina (1 mg/mL) 16 mL + 234 mL de SG 5% EV em BIC.\nIniciar a 5 mL/h e titular resposta."
    },
    {
      id: "noradrenalina-128",
      nome: "Noradrenalina",
      variante: "mais concentrada",
      varianteGrupo: "noradrenalina",
      ampola: "4 mg/4 mL (1 mg/mL)",
      diluicao: "8 ampolas (32 mL) + 218 mL de SG 5%",
      volumeTotal_mL: 250,
      concentracao: "128 mcg/mL",
      concentracao_mcg_mL: 128,
      faixa: { min: 0.01, max: 1.5, unidade: "mcg/kg/min" },
      observacoes: "Não há dose máxima estabelecida. Doses > 0,5 mcg/kg/min na sepse: recomenda-se associar vasopressina.",
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.01, label: "Mínima (0,01 mcg/kg/min)", valores: [0.2, 0.3, 0.3, 0.4, 0.4, 0.5] },
          { dose: 1.5, label: "Máxima (1,5 mcg/kg/min)", valores: [35.2, 40.8, 49.2, 56.3, 61.9, 70.3] }
        ]
      },
      prescricaoPratica: "Noradrenalina (1 mg/mL) 32 mL + 218 mL de SG 5% EV em BIC.\nIniciar a 5 mL/h e titular resposta."
    },
    {
      id: "vasopressina",
      nome: "Vasopressina",
      ampola: "20 U/mL (ampolas de 0,5 / 1 / 10 mL)",
      diluicao: "1 mL (20 U) + 99 mL de SG 5%",
      volumeTotal_mL: 100,
      concentracao: "0,2 U/mL",
      concentracao_U_mL: 0.2,
      faixa: { min: 0.01, max: 0.04, unidade: "U/min" },
      unidadeEspecial: "U/min",
      // Tabela é por dose absoluta (sem peso)
      tabela: {
        formato: "dose-direta",
        pesos: null,
        linhas: [
          { dose: 0.01, label: "0,01 U/min", valor: 3 },
          { dose: 0.02, label: "0,02 U/min", valor: 6 },
          { dose: 0.03, label: "0,03 U/min", valor: 9 },
          { dose: 0.04, label: "0,04 U/min (máx)", valor: 12 }
        ]
      },
      prescricaoPratica: "Vasopressina (20 U/mL) 1 mL + 99 mL de SG 5% EV em BIC.\nIniciar a 3 mL/h até 12 mL/h."
    },
    {
      id: "milrinona",
      nome: "Milrinona",
      ampola: "20 mg/20 mL (1 mg/mL)",
      diluicao: "1 ampola (20 mL) + 80 mL de SF 0,9% ou SG 5%",
      volumeTotal_mL: 100,
      concentracao: "200 mcg/mL",
      concentracao_mcg_mL: 200,
      faixa: { min: 0.375, max: 0.750, unidade: "mcg/kg/min" },
      observacoes: "Dose de ataque: 50 mcg/kg em 10 min.\nAjuste renal:\n• ClCr 5 mL/min → 0,2 mcg/kg/min\n• ClCr 30 mL/min → 0,33 mcg/kg/min\n• ClCr 50 mL/min → 0,43 mcg/kg/min",
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.375, label: "Mínima (0,375 mcg/kg/min)", valores: [5.6, 6.8, 7.9, 9.0, 10.1, 11.3] },
          { dose: 0.750, label: "Máxima (0,750 mcg/kg/min)", valores: [11.3, 13.5, 15.8, 18.0, 20.2, 22.5] }
        ]
      },
      prescricaoPratica: "Milrinona (1 mg/mL) 20 mL + 80 mL de SG 5% EV em BIC.\nIniciar a 7,9 mL/h (70 kg) até 15,8 mL/h."
    },
    {
      id: "levosimendana",
      nome: "Levosimendana",
      ampola: "2,5 mg/mL (ampolas de 5 ou 10 mL)",
      diluicao: "Levosimendana 5 mL + 495 mL de SG 5%",
      volumeTotal_mL: 500,
      concentracao: "25 mcg/mL",
      concentracao_mcg_mL: 25,
      faixa: { min: 0.05, max: 0.2, unidade: "mcg/kg/min" },
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.05, label: "Mínima (0,05 mcg/kg/min)", valores: [6.0, 7.2, 8.4, 9.6, 10.8, 12.0] },
          { dose: 0.2, label: "Máxima (0,2 mcg/kg/min)", valores: [24.0, 28.8, 33.6, 38.4, 43.2, 48.0] }
        ]
      },
      prescricaoPratica: "Levosimendana (2,5 mg/mL) 5 mL + 495 mL de SG 5% EV em BIC.\nIniciar a 8,4 mL/h (70 kg) até 33,6 mL/h."
    },
    {
      id: "nitroglicerina",
      nome: "Nitroglicerina",
      ampola: "5 mg/mL (ampolas de 5 e 10 mL)",
      diluicao: "1 ampola (10 mL) + 240 mL de SF 0,9% ou SG 5%",
      volumeTotal_mL: 250,
      concentracao: "200 mcg/mL",
      concentracao_mcg_mL: 200,
      faixa: { min: 5, max: 200, unidade: "mcg/min" },
      unidadeEspecial: "mcg/min",
      observacoes: "Iniciar com 5 mcg/min e aumentar de 5 em 5 (ou 10 em 10) mcg/min a cada 3–5 minutos até dose máxima de 200 mcg/min.",
      tabela: {
        formato: "dose-direta",
        pesos: null,
        linhas: [
          { dose: 3,   label: "3 mcg/min",   valor: 1 },
          { dose: 10,  label: "10 mcg/min",  valor: 3 },
          { dose: 17,  label: "17 mcg/min",  valor: 5 },
          { dose: 20,  label: "20 mcg/min",  valor: 6 },
          { dose: 30,  label: "30 mcg/min",  valor: 9 },
          { dose: 40,  label: "40 mcg/min",  valor: 12 },
          { dose: 50,  label: "50 mcg/min",  valor: 15 },
          { dose: 67,  label: "67 mcg/min",  valor: 20 },
          { dose: 100, label: "100 mcg/min", valor: 30 },
          { dose: 200, label: "200 mcg/min (máx)", valor: 60 }
        ]
      },
      prescricaoPratica: "Nitroglicerina (5 mg/mL) 10 mL + 240 mL de SG 5% EV em BIC.\nIniciar a 10 mL/h e reavaliar até dose máxima de 200 mcg/min."
    },
    {
      id: "nitroprussiato",
      nome: "Nitroprussiato de sódio",
      ampola: "50 mg/2 mL (25 mg/mL)",
      diluicao: "1 ampola (2 mL) + 248 mL de SG 5%",
      volumeTotal_mL: 250,
      concentracao: "200 mcg/mL",
      concentracao_mcg_mL: 200,
      faixa: { min: 0.5, max: 10, unidade: "mcg/kg/min" },
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.5, label: "Mínima (0,5 mcg/kg/min)", valores: [1.5, 1.8, 2.1, 2.4, 2.7, 3.0] },
          { dose: 10, label: "Máxima (10 mcg/kg/min)", valores: [150.0, 180.0, 210.0, 240.0, 270.0, 300.0] }
        ]
      },
      prescricaoPratica: "Nitroprussiato (25 mg/mL) 2 mL + 248 mL de SG 5% EV em BIC.\nIniciar a 2,1 mL/h (70 kg) até 210,0 mL/h."
    }
  ]
};
