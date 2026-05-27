// Capítulo 1 — Evolução Médica no CTI
// Fonte: Guia MedRoute, p. 6-8

export const evolucao = {
  id: "evolucao",
  num: 1,
  titulo: "Evolução Médica no CTI",
  intro: "A evolução médica deve ser realizada duas vezes ao dia, pela manhã e à noite. Objetiva, mas sem perder a visão holística do paciente — abordando intercorrências, pendências, estratégias diagnósticas e terapêuticas.",

  mnemonico: {
    titulo: "FASTED HUG CMME",
    descricao: "Mnemônico para garantir cobertura de todos os cuidados essenciais no acompanhamento diário do paciente em UTI.",
    itens: [
      { letra: "F", nome: "Feeding / Dieta", desc: "Verificar tipo de dieta: oral, enteral, parenteral, mista ou jejum." },
      { letra: "A", nome: "Analgesia", desc: "Avaliar controle da dor com escala apropriada." },
      { letra: "S", nome: "Sedação", desc: "Monitorar pela escala RASS e realizar interrupção diária quando viável." },
      { letra: "T", nome: "Tromboprofilaxia (TVP/TEP)", desc: "Indicar ou contraindicar conforme o quadro clínico." },
      { letra: "E", nome: "Evacuações", desc: "Observar padrão: normal, diarreia ou ausência de evacuações." },
      { letra: "D", nome: "Diurese", desc: "Checar aspecto e volume urinário diário." },
      { letra: "H", nome: "Head of the Bed (Cabeceira)", desc: "30° em neurocríticos; 45° nos demais." },
      { letra: "U", nome: "Úlcera de pressão / estresse", desc: "Mudança de decúbito, colchão de ar, sedestação diária; profilaxia de úlceras." },
      { letra: "G", nome: "Glicemia", desc: "Monitorar conforme protocolo do hospital." },
      { letra: "C", nome: "Cateteres e Sondas", desc: "Observar necessidade e aspecto de todos os dispositivos." },
      { letra: "M", nome: "Mucosas", desc: "Higiene oral e proteção ocular adequada." },
      { letra: "M", nome: "Medicações", desc: "Ajustar, incluir ou suspender conforme necessário." },
      { letra: "E", nome: "Exames Diários", desc: "Ajustar eletrólitos, avaliar transfusões e identificar disfunções." }
    ]
  },

  modeloEvolucao: {
    titulo: "Sugestão de modelo de evolução médica (centrada nos problemas)",
    template: `# EVOLUÇÃO MÉDICA CTI #
# LEITO XX | Prontuário: XXXX
# IDENTIFICAÇÃO
Nome:
IH em xx/xx/xx

# Motivo da Internação

# HDA

# Problemas atuais
-

# Problemas prévios
-

# Exames complementares

# Invasões / Dispositivos

# ATB

# Culturas

# Exame Físico

# Conduta`
  }
};
