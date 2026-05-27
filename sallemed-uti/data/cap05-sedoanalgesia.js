// Capítulo 5 — Sedoanalgesia Contínua
// Fonte: Guia MedRoute, p. 29-33

export const sedoanalgesia = {
  id: "sedoanalgesia",
  num: 5,
  titulo: "Sedoanalgesia Contínua",
  intro: "Drogas para sedação e analgesia em infusão contínua. Avaliar grau de sedação com a Escala de RASS e ajustar.",

  rass: {
    titulo: "Escala de RASS (Richmond Agitation–Sedation Scale)",
    descricao: "Avalia grau de sedação/agitação em pacientes da UTI. Guia ajustes na sedação contínua.",
    linhas: [
      { pontos: "+4", classe: "Combativo", desc: "Violento, risco para a equipe." },
      { pontos: "+3", classe: "Muito agitado", desc: "Agressivo; puxa ou remove tubos/cateteres." },
      { pontos: "+2", classe: "Agitado", desc: "Movimentos despropositados frequentes; briga com o ventilador." },
      { pontos: "+1", classe: "Inquieto", desc: "Intranquilo, ansioso, sem movimentos agressivos." },
      { pontos: "0",  classe: "Alerta e calmo", desc: "" },
      { pontos: "−1", classe: "Sonolento", desc: "Facilmente despertável; mantém contato visual > 10 s." },
      { pontos: "−2", classe: "Sedação leve", desc: "Desperta ao estímulo verbal; contato visual < 10 s." },
      { pontos: "−3", classe: "Sedação moderada", desc: "Movimentos e abertura ocular ao estímulo verbal, sem contato visual." },
      { pontos: "−4", classe: "Sedação intensa", desc: "Sem resposta verbal; movimentos ao estímulo tátil." },
      { pontos: "−5", classe: "Não desperta", desc: "Sem resposta a qualquer estímulo." }
    ]
  },

  drogas: [
    {
      id: "fentanil",
      nome: "Fentanil",
      ampola: "500 mcg/10 mL (50 mcg/mL)",
      diluicao: "Não é necessária diluição",
      volumeTotal_mL: 50,
      concentracao: "50 mcg/mL",
      concentracao_mcg_mL: 50,
      faixa: { min: 1.2, max: 4.2, unidade: "mcg/kg/h" },
      observacoes: "Geralmente 1 a 4 mL/h são suficientes para analgesia adequada.",
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 1.2, label: "Mínima (1,2 mcg/kg/h)", valores: [1.2, 1.4, 1.7, 1.9, 2.2, 2.4] },
          { dose: 4.2, label: "Máxima (4,2 mcg/kg/h)", valores: [4.2, 5.0, 5.9, 6.7, 7.6, 8.4] }
        ]
      },
      prescricaoPratica: "Fentanil (50 mcg/mL) 50 mL EV em BIC.\nIniciar a 2 mL/h e reavaliar."
    },
    {
      id: "midazolam",
      nome: "Midazolam",
      ampola: "15 mg/3 mL (5 mg/mL)",
      diluicao: "10 ampolas (30 mL) + 120 mL de SG 5%",
      volumeTotal_mL: 150,
      concentracao: "1 mg/mL",
      concentracao_mcg_mL: 1000,
      faixa: { min: 0.05, max: 0.1, unidade: "mg/kg/h" },
      // REVISAR: PDF lista "µg/kg/h" mas os números da tabela confirmam mg/kg/h
      observacaoUnidade: "Unidade corrigida: o PDF imprime µg/kg/h, mas os valores da tabela só batem com mg/kg/h.",
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.05, label: "Mínima (0,05 mg/kg/h)", valores: [2.5, 3.0, 3.5, 4.0, 4.5, 5.0] },
          { dose: 0.1,  label: "Máxima (0,1 mg/kg/h)",  valores: [5.0, 6.0, 7.0, 8.0, 9.0, 10.0] }
        ]
      },
      prescricaoPratica: "Midazolam (5 mg/mL) 30 mL + 120 mL de SG 5% EV em BIC.\nIniciar a 4 mL/h (70 kg) e reavaliar."
    },
    {
      id: "dexmedetomidina",
      nome: "Dexmedetomidina",
      ampola: "100 mcg/mL (ampola de 2 mL)",
      diluicao: "4 mL (200 mcg) + 96 mL de SF 0,9%",
      volumeTotal_mL: 100,
      concentracao: "4 mcg/mL",
      concentracao_mcg_mL: 4,
      faixa: { min: 0.2, max: 0.7, unidade: "mcg/kg/h" },
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.2, label: "Mínima (0,2 mcg/kg/h)", valores: [2.5, 3.0, 3.5, 4.0, 4.5, 5.0] },
          { dose: 0.7, label: "Máxima (0,7 mcg/kg/h)", valores: [8.75, 10.5, 12.25, 14.0, 15.8, 17.5] }
        ]
      },
      prescricaoPratica: "Dexmedetomidina (100 mcg/mL) 4 mL + 96 mL de SF 0,9% EV em BIC.\nIniciar a 3,5 mL/h (70 kg) até 12,25 mL/h."
    },
    {
      id: "propofol",
      nome: "Propofol 1%",
      ampola: "10 mg/mL (ampola de 20 mL)",
      diluicao: "Não é necessária diluição",
      volumeTotal_mL: 100,
      concentracao: "10 mg/mL",
      concentracao_mcg_mL: 10000,
      faixa: { min: 0.5, max: 5.0, unidade: "mg/kg/h" },
      // REVISAR: PDF lista "µg/kg/h" — números da tabela só batem com mg/kg/h
      observacaoUnidade: "Unidade corrigida: o PDF imprime µg/kg/h, mas os valores da tabela só batem com mg/kg/h.",
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.5, label: "Mínima (0,5 mg/kg/h)", valores: [2.5, 3.0, 3.5, 4.0, 4.5, 5.0] },
          { dose: 5.0, label: "Máxima (5,0 mg/kg/h)", valores: [25.0, 30.0, 35.0, 40.0, 45.0, 50.0] }
        ]
      },
      prescricaoPratica: "Propofol 1% (10 mg/mL) 100 mL EV em BIC.\nIniciar a 3,5 mL/h (70 kg) e reavaliar."
    },
    {
      id: "cetamina",
      nome: "Cetamina / Ketamina",
      ampola: "50 mg/mL (ampola de 10 mL)",
      diluicao: "10 mL + 240 mL de SF 0,9%",
      volumeTotal_mL: 250,
      concentracao: "2 mg/mL",
      concentracao_mcg_mL: 2000,
      faixa: { min: 0.5, max: 1.0, unidade: "mg/kg/h" },
      // REVISAR: PDF lista "µg/kg/h" — números da tabela só batem com mg/kg/h
      observacaoUnidade: "Unidade corrigida: o PDF imprime µg/kg/h, mas os valores da tabela só batem com mg/kg/h.",
      tabela: {
        pesos: [50, 60, 70, 80, 90, 100],
        linhas: [
          { dose: 0.5, label: "Mínima (0,5 mg/kg/h)", valores: [12.5, 15.0, 17.5, 20.0, 22.5, 25.0] },
          { dose: 1.0, label: "Máxima (1,0 mg/kg/h)", valores: [25.0, 30.0, 35.0, 40.0, 45.0, 50.0] }
        ]
      },
      prescricaoPratica: "Cetamina (50 mg/mL) 10 mL + 240 mL de SF 0,9% EV em BIC.\nIniciar a 17,5 mL/h (70 kg) até 35,0 mL/h."
    },
    {
      id: "morfina",
      nome: "Morfina (Ataque + Manutenção)",
      ampola: "10 mg/mL",
      diluicao: "Ataque: 1 mL (10 mg) + 10 mL de água destilada (solução 1 mg/mL); administrar 2 mg (2 mL) EV em bólus.\nManutenção: 10 mL (100 mg) + 90 mL de SF 0,9% (concentração 1 mg/mL) EV em BIC.",
      volumeTotal_mL: 100,
      concentracao: "1 mg/mL (manutenção)",
      concentracao_mcg_mL: 1000,
      faixa: { min: 2, max: 20, unidade: "mL/h" },
      unidadeEspecial: "mL/h",
      observacoes: "Esquema de dripping para cuidados paliativos. Iniciar a 2 mL/h e titular até 20 mL/h.",
      tabela: null,
      prescricaoPratica: "Morfina (10 mg/mL) 10 mL + 90 mL de SF 0,9% EV em BIC.\nIniciar a 2,0 mL/h até 20,0 mL/h."
    }
  ]
};
