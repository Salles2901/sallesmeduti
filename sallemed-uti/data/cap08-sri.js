// Capítulo 8 — Intubação Orotraqueal (SRI)
// Fonte: Guia MedRoute, p. 41-47

export const sri = {
  id: "sri",
  num: 8,
  titulo: "Intubação Orotraqueal (SRI)",
  intro: "Sequência Rápida de Intubação: protocolo padronizado para intubação segura no paciente crítico.",

  fluxograma: [
    {
      etapa: "Preparação",
      itens: [
        "Garantir acesso venoso pérvio e testado",
        "Expansão volêmica e push-dose de adrenalina disponíveis",
        "Monitorização completa",
        "Medicações já prontas nas seringas",
        "Materiais testados: tubo e cuff, laringoscópio, AMBU, aspiração, máscara laríngea"
      ]
    },
    {
      etapa: "Pré-oxigenação",
      itens: [
        "Ofertar 100% de O₂ por 3–5 minutos",
        "Recursos: AMBU, MNR, VNI ou CNAF",
        "Só ventilar se perder drive respiratório"
      ]
    },
    {
      etapa: "Posicionamento",
      itens: [
        "Coxim posicionado no occipício",
        "Em obesos: coxim interescapular",
        "Sniffing position"
      ]
    },
    {
      etapa: "Pré-tratamento",
      itens: [
        "Fase NÃO obrigatória — usar com cautela",
        "Realizada com Fentanil ou Lidocaína"
      ]
    },
    {
      etapa: "Paralisia e Indução",
      itens: [
        "Etapa obrigatória: hipnose, amnésia e relaxamento muscular",
        "Escolher drogas conforme perfil clínico do paciente (ver tabela)"
      ]
    },
    {
      etapa: "Posição do Tubo",
      itens: [
        "Fixação da cânula em 23–24 cm da rima labial nos homens",
        "21–22 cm nas mulheres",
        "Confirmar com ausculta"
      ]
    },
    {
      etapa: "Pós-intubação",
      itens: [
        "Confirmar posicionamento com Rx de tórax",
        "Parte distal a 4–7 cm da carina",
        "Iniciar sedoanalgesia contínua"
      ]
    }
  ],

  drogas: [
    {
      nome: "Etomidato",
      dose: "0,3 mg/kg",
      duracao: "3–12 min",
      vantagens: "Um dos mais cardioestáveis. Não cursa com hipotensão.",
      desvantagens: "Insuficiência adrenal transitória.",
      categoria: "Indução"
    },
    {
      nome: "Cetamina",
      dose: "1,5 mg/kg",
      duracao: "10–20 min",
      vantagens: "Efeito broncodilatador. Não cursa com hipotensão.",
      desvantagens: "Ativação adrenérgica: ↑PA, ↑FC, ↑PIC.",
      categoria: "Indução"
    },
    {
      nome: "Midazolam",
      dose: "0,1 a 0,3 mg/kg",
      duracao: "10–20 min",
      vantagens: "Forte indutor amnestésico.",
      desvantagens: "Causa hipotensão. Evitar em pacientes instáveis.",
      categoria: "Indução"
    },
    {
      nome: "Propofol",
      dose: "1,5 mg/kg",
      duracao: "5–10 min",
      vantagens: "Efeito broncodilatador.",
      desvantagens: "Hipotensão dose-dependente. Evitar em pacientes graves.",
      categoria: "Indução"
    },
    {
      nome: "Succinilcolina",
      dose: "1,5 mg/kg",
      duracao: "6–10 min",
      vantagens: "Meia-vida curta.",
      desvantagens: "Hipercalemia transitória; histórico de hipertermia maligna.",
      categoria: "Bloqueador"
    },
    {
      nome: "Rocurônio",
      dose: "1,2 a 1,5 mg/kg",
      duracao: "30–40 min",
      vantagens: "Possui antídoto (Sugammadex) e menos contraindicações.",
      desvantagens: "Meia-vida mais longa.",
      categoria: "Bloqueador"
    }
  ],

  cenarios: [
    { perfil: "Choque / Hipotensão", sugestao: "Não usar Fentanil. Usar Etomidato + Succinilcolina. Push-doses de Adrenalina se hipotensão." },
    { perfil: "Asmáticos / DPOC", sugestao: "Prefira Cetamina ou Propofol + Succinilcolina." },
    { perfil: "Cardiopatia Grave", sugestao: "Prefira Etomidato ou Cetamina." },
    { perfil: "Idosos", sugestao: "Prefira Etomidato ou Cetamina." },
    { perfil: "Status Epilepticus", sugestao: "Prefira Propofol ou Midazolam." }
  ],

  // Tabela Doses × Peso (em mL conforme apresentação comercial padrão)
  tabelaDosesPeso: {
    preMedicacao: {
      titulo: "Pré-medicação (em desuso atualmente)",
      pesos: [50, 60, 70, 80, 90, 100],
      drogas: [
        { nome: "Fentanil 50 mcg/mL", valores: ["2 mL", "2,4 mL", "2,8 mL", "3,2 mL", "3,6 mL", "4 mL"] },
        { nome: "Lidocaína 2% s/vc", valores: ["3,8 mL", "4,5 mL", "5,3 mL", "6,0 mL", "6,8 mL", "7,5 mL"] }
      ]
    },
    sedacao: {
      titulo: "Sedação",
      pesos: [50, 60, 70, 80, 90, 100],
      drogas: [
        { nome: "Etomidato 2 mg/mL",  valores: ["7,5 mL", "9,0 mL", "10,5 mL", "12,0 mL", "13,5 mL", "15,0 mL"] },
        { nome: "Cetamina 50 mg/mL",  valores: ["1,5 mL", "1,8 mL", "2,1 mL", "2,4 mL", "2,7 mL", "3,0 mL"] },
        { nome: "Propofol 10 mg/mL",  valores: ["7,5 mL", "9,0 mL", "10,5 mL", "12,0 mL", "13,5 mL", "15,0 mL"] },
        { nome: "Midazolam 5 mg/mL",  valores: ["2,0 mL", "2,4 mL", "2,8 mL", "3,2 mL", "3,6 mL", "4,0 mL"] }
      ]
    },
    bloqueio: {
      titulo: "Bloqueio Neuromuscular",
      pesos: [50, 60, 70, 80, 90, 100],
      drogas: [
        { nome: "Rocurônio 10 mg/mL",     valores: ["6,0 mL", "7,2 mL", "8,4 mL", "9,6 mL", "10,8 mL", "12,0 mL"] },
        { nome: "Succinilcolina 10 mg/mL", valores: ["7,5 mL", "9,0 mL", "10,5 mL", "12,0 mL", "13,5 mL", "15,0 mL"] }
      ]
    }
  },

  dope: {
    titulo: "Protocolo D.O.P.E.",
    descricao: "Mnemônico para paciente intubado em dessaturação. Primeiro: certificar oxímetro ajustado/capturando saturação; aquecer a mão e verificar melhora.",
    itens: [
      { letra: "D", nome: "Deslocamento", desc: "Checar seletividade do tubo ou extubação acidental." },
      { letra: "O", nome: "Obstrução", desc: "Presença de rolhas, secreções ou acotovelamento do tubo." },
      { letra: "P", nome: "Pneumotórax", desc: "Complicação da VM. Ausculte e use Rx ou POCUS." },
      { letra: "E", nome: "Equipamento", desc: "Desconexão no circuito; checar configurações e parâmetros do ventilador." }
    ]
  }
};
