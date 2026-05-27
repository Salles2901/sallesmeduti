// Capítulo 7 — Outras Infusões e Drogas Importantes
// Fonte: Guia MedRoute, p. 37-39

export const outrasInfusoes = {
  id: "outras-infusoes",
  num: 7,
  titulo: "Outras Infusões e Drogas Importantes",
  intro: "Soluções e drogas frequentes na UTI que não se encaixam no padrão de infusão contínua vasoativa/sedativa.",

  items: [
    {
      id: "solucao-polarizante",
      nome: "Solução Polarizante (Glicoinsulina)",
      tipo: "preparo",
      preparo: [
        "100 mL de SG 50% + 10 U de Insulina Regular",
        "ou 500 mL de SG 10% + 10 U de Insulina Regular",
        "ou 1000 mL de SG 5% + 10 U de Insulina Regular"
      ],
      concentracao: "5 g de glicose por unidade de IR",
      tempoInfusao: "Infundir em 30 a 60 minutos",
      prescricaoPratica: "10 U de Insulina Regular + 100 mL de SG 50% em BIC.\nCorrer em 30 minutos."
    },
    {
      id: "amiodarona",
      nome: "Amiodarona (Ataque + Manutenção)",
      tipo: "preparo",
      indicacao: "Controle de ritmo cardíaco",
      ampola: "150 mg/3 mL (50 mg/mL)",
      preparo: [
        "Ataque: 150 mg (1 ampola) + 100 mL de SG 5% em 20 minutos.",
        "Manutenção: 900 mg (6 ampolas) + 432 mL de SG 5% em 24 h.",
        "  • Iniciar a 30 mL/h nas primeiras 6 horas.",
        "  • Reduzir para 15 mL/h nas próximas 18 horas."
      ],
      prescricaoPratica: "Ataque\nAmiodarona (50 mg/mL) 3 mL + 100 mL de SG 5% EV em BIC\nCorrer em 20 minutos.\n\nManutenção\nAmiodarona (50 mg/mL) 18 mL + 432 mL de SG 5% EV em BIC.\n• Iniciar a 30 mL/h nas primeiras 6 h.\n• Próximas 18 h reduzir para 15 mL/h."
    },
    {
      id: "soro-manutencao",
      nome: "Soro de Manutenção (Dieta Zero)",
      tipo: "preparo",
      variantes: [
        {
          titulo: "Paciente sem restrição de volume",
          preparo: [
            "SG 5% 1000 mL",
            "NaCl 20% 40 mL",
            "KCl 19,1% 10 mL (opcional)"
          ],
          taxa: "83,3 mL/h ou a cada 12 horas"
        },
        {
          titulo: "Paciente com restrição de volume",
          preparo: [
            "SG 5% 1000 mL",
            "NaCl 20% 40 mL",
            "KCl 19,1% 10 mL (opcional)"
          ],
          taxa: "41,7 mL/h ou a cada 24 horas"
        }
      ]
    },
    {
      id: "fenitoina",
      nome: "Fenitoína (Ataque + Manutenção)",
      tipo: "preparo",
      ampola: "50 mg/mL (ampolas de 5 mL)",
      doses: [
        "Ataque: 15 a 20 mg/kg",
        "Manutenção: 100 mg de 8/8 h"
      ],
      preparo: [
        "Ataque: Fenitoína 15–20 mg/kg + 250 mL de SF 0,9%",
        "Manutenção: Fenitoína 100 mg + 100 mL de SF 0,9%"
      ],
      atencao: "Velocidade máxima de infusão: 50 mg/min (25 mg/min em idosos). Administração rápida (> 50 mg/min) eleva risco de hipotensão grave e arritmias.",
      prescricaoPratica: "Ataque (70 kg):\nFenitoína (50 mg/mL) 20 mL + 250 mL de SF 0,9% EV em BIC. Correr em 1 hora.\n\nManutenção:\nFenitoína (50 mg/mL) 2 mL + 100 mL de SF 0,9% EV em BIC. Correr em 20 minutos."
    },
    {
      id: "furosemida",
      nome: "Furosemida (Lasix)",
      tipo: "preparo",
      ampola: "20 mg/2 mL (10 mg/mL)",
      concentracao: "10 mg/mL — não diluir",
      doseMaxima: "600 mg/dia",
      esquemas: [
        {
          titulo: "Em paciente sem uso prévio",
          itens: [
            "Bólus EV 0,5 a 1 mg/kg (1 a 4 ampolas)",
            "Manter 1 a 2 ampolas de 12/12 h"
          ]
        },
        {
          titulo: "Em paciente com uso prévio",
          itens: [
            "Bólus EV 2 a 2,5× a dose total diária VO",
            "Manter 2 ampolas 8/8 h e aumentar até 6/6 h se necessário"
          ]
        }
      ],
      objetivo: "Perda de 1 L nas primeiras 6 h até melhora da congestão."
    }
  ]
};
