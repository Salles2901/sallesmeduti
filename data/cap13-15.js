// Capítulos 13–15: Controle Glicêmico, Delirium, Morte Encefálica
// Fonte: Guia MedRoute, p. 70-78

export const glicemia = {
  id: "glicemia",
  num: 13,
  titulo: "Controle Glicêmico e Insulinização",
  intro: "A hiperglicemia eleva mortalidade em cirúrgicos, TCE, IAM e AVC. Manter glicemia entre 140–180 mg/dL.",

  inicioProtocolo: [
    "Duas medidas de HGT > 180 mg/dL",
    "OU uma medida de HGT > 350 mg/dL",
    "OU HGT > 180 em paciente instável"
  ],

  preparo: "100 U de Insulina Regular + 100 mL de SF 0,9%",

  observacao: "A velocidade de infusão segue protocolo institucional. Sugestão abaixo (Hospital de Clínicas USP-SP).",

  inicio: [
    { gatilho: "Dx > 180 mg/dL", conduta: "Iniciar a 2 mL/h" },
    { gatilho: "Dx > 220 mg/dL", conduta: "Iniciar a 4 mL/h" }
  ],

  manutencao: {
    descricao: "Dx de 1/1 h pela enfermagem até estabilização dos níveis glicêmicos.",
    regras: [
      { dx: "Dx < 60 mg/dL",   conduta: "Desligar bomba; administrar 40 mL de SG 50% e reavaliar." },
      { dx: "Dx < 100 mg/dL",  conduta: "Desligar bomba." },
      { dx: "Dx 101–180 mg/dL", conduta: "Manter velocidade de infusão." },
      { dx: "Dx > 181 mg/dL",  conduta: "Aumentar 2 mL/h." }
    ]
  },

  atencao: "Manter sempre aporte calórico em pacientes do protocolo.",
  disclaimer: "Seguir SEMPRE o protocolo institucional do hospital."
};

export const delirium = {
  id: "delirium",
  num: 14,
  titulo: "Delirium no CTI",
  intro: "Disfunção aguda cerebral com alterações de cognição, percepção, consciência e atenção, com flutuações ao longo do dia. Marcador de gravidade e fator de risco para prejuízo cognitivo de longo prazo.",

  subtipos: [
    { tipo: "Hiperativo", desc: "Aumento da atividade psicomotora, delírios e alucinações." },
    { tipo: "Hipoativo",  desc: "Redução da atividade psicomotora (mais comum em CTI)." },
    { tipo: "Misto",      desc: "Flutuações entre as duas formas com sintomas positivos e negativos." }
  ],

  camIcu: {
    titulo: "CAM-ICU (Confusion Assessment Method for ICU)",
    descricao: "Ferramenta amplamente utilizada para diagnóstico. Paciente deve estar em RASS > −4 para seguir.",
    etapas: [
      {
        passo: "1. Início agudo ou curso flutuante",
        pergunta: "O paciente tem alguma mudança aguda no estado mental? Ou flutuação nas últimas 24 h?",
        resultado: "Não → Negativo para delirium."
      },
      {
        passo: "2. Inatenção",
        pergunta: "Leia em voz alta \"S A V E H A A R T\" e peça para o paciente apertar sua mão apenas ao ouvir \"A\". Erros: não apertar no \"A\" OU apertar em outra letra.",
        resultado: "< 3 erros → Negativo. ≥ 3 → seguir."
      },
      {
        passo: "3. Nível de consciência alterado",
        pergunta: "Se RASS = 0, prosseguir ao próximo passo. Se RASS ≠ 0, positivo para delirium.",
        resultado: "RASS ≠ 0 → Positivo para delirium."
      },
      {
        passo: "4. Pensamento desorganizado",
        pergunta: "Perguntas:\n1) Uma pedra flutua na água?\n2) No mar tem peixe?\n3) Um kilo pesa mais que dois kilos?\n4) Você pode usar um martelo para bater um prego?\n\nComandos:\n1) \"Mostre-me esta quantidade de dedos\" (mostrar 2)\n2) \"Agora mostre essa quantidade na outra mão\" (mostrar 3)",
        resultado: "≥ 2 erros → Positivo. < 2 → Negativo."
      }
    ]
  },

  prevencao: [
    "Estímulo cognitivo (calendários, relógios, janelas)",
    "Evitar imobilidade",
    "Evitar desidratação e distúrbios hidroeletrolíticos",
    "Evitar constipação e retenção urinária",
    "Despertar diário em sedação contínua"
  ],

  tratamento: [
    {
      droga: "Haloperidol",
      dose: "5 mg EV bólus; repetir a cada 30 min até sedação leve",
      obs: "Em idosos, dose de 1 mg pode ser efetiva."
    },
    {
      droga: "Quetiapina",
      dose: "12,5 a 100 mg de 8/8 h",
      obs: "Menos efeitos colaterais que o haloperidol."
    },
    {
      droga: "Risperidona",
      dose: "0,5 a 2 mg VO de 12/12 h",
      obs: "Menos efeitos colaterais que o haloperidol."
    },
    {
      droga: "Ziprasidona",
      dose: "10 a 40 mg VO de 12/12 h",
      obs: "Menos efeitos colaterais que o haloperidol."
    },
    {
      droga: "Dexmedetomidina",
      dose: "0,2 a 1,5 mcg/kg/min EV",
      obs: "Atenção a bradicardia e hipotensão."
    }
  ],

  observacao: "O papel principal dos medicamentos é o controle da agitação — há pouco ou nenhum efeito na redução do tempo de delirium. Contenção mecânica somente em último caso."
};

export const morteEncefalica = {
  id: "morte-encefalica",
  num: 15,
  titulo: "Protocolo de Morte Encefálica",
  intro: "Perda irreversível e completa das funções cerebrais por causa identificável compatível. Constatada a ME, o paciente está legalmente morto.",

  preRequisitos: [
    "Lesão encefálica de causa conhecida, irreversível e capaz de causar ME",
    "Ausência de fatores tratáveis (sedação, distúrbios metabólicos, intoxicações)",
    "Temperatura corporal > 35°C (esofagiana, vesical ou retal — axilar > 35°C é válida na indisponibilidade)",
    "PAs > 100 mmHg OU PAM > 65 mmHg",
    "Saturação de O₂ > 94%"
  ],

  tempoObservacao: [
    "Causas gerais: mínimo de 6 horas",
    "Encefalopatia hipóxico-isquêmica: mínimo de 24 horas"
  ],

  intervaloAvaliacoes: [
    "Idade > 2 anos: 1 hora",
    "Idade 2 meses–2 anos: 12 horas",
    "Idade 7 dias–2 meses: 24 horas"
  ],

  passos: [
    "Dois exames clínicos por dois médicos diferentes (nenhum da equipe de transplante) capacitados (Neuro, Neurocir, Emergencista, Intensivista) confirmando coma não perceptivo (Glasgow 3) e ausência de função do tronco.",
    "Teste de apneia.",
    "Um exame complementar comprovando ausência de atividade encefálica (Doppler Transcraniano, Cintilografia/SPECT cerebral ou EEG)."
  ],

  testeApneia: {
    procedimento: [
      "Ventilar com FiO₂ 100% por ao menos 10 min. Objetivo: PaO₂ > 200 mmHg e PaCO₂ 35–45 mmHg",
      "Instalar oxímetro e coletar gasometria arterial",
      "Desconectar da VM",
      "Estabelecer fluxo contínuo de O₂ por cateter intratraqueal ao nível da carina (6 L/min), tubo T (12 L/min) ou CPAP (até 12 L/min + 10 cmH₂O)",
      "Observar movimentos respiratórios por 10 min (ausência ou presença)",
      "Prever ↑ PaCO₂ de 3 mmHg/min para estimar tempo de desconexão",
      "Colher nova gasometria arterial ao final",
      "Reconectar à VM"
    ],
    interpretacao: [
      { resultado: "Positivo", criterio: "PaCO₂ > 55 mmHg e ausência de movimentos respiratórios" },
      { resultado: "Inconclusivo", criterio: "PaCO₂ final < 55 mmHg e sem movimentos" },
      { resultado: "Negativo", criterio: "Presença de movimentos respiratórios (mesmo débeis), com qualquer PaCO₂" }
    ],
    quandoInterromper: "Em hipotensão (PAs < 100 mmHg ou PAM < 65 mmHg), hipoxemia significativa ou arritmia. Coletar GA e reconectar à VM."
  },

  reflexos: [
    {
      nome: "Reflexo Pupilar (Fotomotor)",
      teste: "Abrir pálpebras e incidir feixe de luz sobre a pupila.",
      negativo: "Ausência de miose direta e consensual."
    },
    {
      nome: "Reflexo Córneo-palpebral",
      teste: "Tocar a córnea com algodão embebido em soro/água destilada.",
      negativo: "Ausência de piscar."
    },
    {
      nome: "Reflexo Óculo-cefálico (Olhos de Boneca)",
      teste: "Movimentação brusca da cabeça para direita e esquerda.",
      negativo: "Olhos acompanham o movimento (sem reflexo). Contraindicado se suspeita de trauma raquimedular."
    },
    {
      nome: "Reflexo Vestíbulo-ocular (Prova Calórica)",
      teste: "Otoscopia para verificar conduto. Instilar 50 mL de salina a 4°C no CAE. Aguardar 5 min entre lados.",
      negativo: "Ausência de desvio do olhar conjugado para o lado estimulado."
    },
    {
      nome: "Reflexo da Tosse / Esgasgo",
      teste: "Estimular traqueia ou hipofaringe com sonda de aspiração pelo TOT ou cânula de TQT.",
      negativo: "Sem resposta."
    }
  ],

  meiasVidas: {
    titulo: "Tempo mínimo desde a interrupção de sedativos para iniciar o protocolo",
    aviso: "Esperar 4 a 5 meias-vidas após a interrupção. Sedativos interferem no exame neurológico.",
    drogas: [
      { droga: "Atracúrio",       tempo: "1 h 40 min", meiaVida: "20 min" },
      { droga: "Cetamina",        tempo: "12 h 30 min", meiaVida: "2,5 h" },
      { droga: "Cisatracúrio",    tempo: "1 h 50 min", meiaVida: "22 min" },
      { droga: "Dexmedetomidina", tempo: "10 h",       meiaVida: "2 h" },
      { droga: "Etomidato",       tempo: "15 h",       meiaVida: "3 h" },
      { droga: "Fentanil",        tempo: "10 h",       meiaVida: "2 h" },
      { droga: "Midazolam",       tempo: "10 h",       meiaVida: "2 h" },
      { droga: "Propofol",        tempo: "10 h",       meiaVida: "2 h" },
      { droga: "Rocurônio",       tempo: "5 h",        meiaVida: "1 h" },
      { droga: "Succinilcolina",  tempo: "50 min",     meiaVida: "10 min" },
      { droga: "Tiopental",       tempo: "60 h",       meiaVida: "12 h" }
    ]
  }
};
