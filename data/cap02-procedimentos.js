// Capítulo 2 — Procedimentos na UTI
// Fonte: Guia MedRoute, p. 9-14

export const procedimentos = {
  id: "procedimentos",
  num: 2,
  titulo: "Procedimentos na UTI",
  intro: "Procedimentos invasivos comuns na terapia intensiva: PAI e Acesso Venoso Central.",

  itens: [
    {
      id: "pai",
      nome: "Pressão Arterial Invasiva (PAI)",
      descricao: "A canulação arterial é recomendada em pacientes em choque para medições precisas e decisões terapêuticas imediatas. A medição não invasiva apresenta variações significativas em choque e arritmias.",
      indicacoes: [
        "Necessidade de mensuração contínua da PA",
        "Instabilidade hemodinâmica e uso de drogas vasoativas (DVA)",
        "Coleta de ≥ 4 gasometrias arteriais diárias"
      ],
      contraindicacoes: [
        "Coagulopatia",
        "Tromboses (vasculites)",
        "Alterações anatômicas",
        "Sítio de punção infectado",
        "Insuficiência vascular periférica"
      ],
      sitios: [
        {
          nome: "Artéria Radial",
          vantagens: "Fácil acesso, boa circulação colateral, risco mínimo de lesão nervosa, conforto.",
          desvantagens: "Artefatos (periférica e calibre reduzido), exacerbação de síndrome do túnel do carpo.",
          calibre: "20–22 G"
        },
        {
          nome: "Artéria Axilar",
          vantagens: "Boa circulação contralateral, medida fidedigna da raiz da aorta, palpável em pulsos periféricos ausentes durante choque.",
          desvantagens: "Acesso difícil, maior risco de embolia cerebral e lesão nervosa, maior desconforto.",
          calibre: "18–20 G"
        },
        {
          nome: "Artéria Femoral",
          vantagens: "Fácil acesso, palpável durante hipotensão, maior calibre com menor risco de trombose, menor incidência de vasoespasmo.",
          desvantagens: "Hematoma retroperitoneal, risco de lesão nervosa e contaminação.",
          calibre: "16–18 G"
        },
        {
          nome: "Artéria Pediosa",
          vantagens: "Fácil acesso, boa circulação colateral, menor risco de lesão nervosa.",
          desvantagens: "Ausente em ~12%, mais artefatos (periférica e distante da aorta).",
          calibre: "20–22 G"
        }
      ],
      passos: {
        radial: [
          "Posicionamento: mão com leve dorsiflexão do punho, preferencialmente membro não dominante (com coxim).",
          "Palpação da artéria até o retináculo flexor (1 cm proximal à prega do punho).",
          "Introduzir agulha de punção com bisel para cima, em ângulo de 30°–45°.",
          "Após punção da artéria com refluxo, reduzir ângulo para 15°.",
          "Manter a mão firme, retirar a seringa e observar fluxo livre e pulsátil.",
          "Introduzir lentamente o fio-guia sem resistência.",
          "Retirar a agulha, mantendo o fio-guia firme.",
          "Passar o cateter pelo fio-guia, retirar pequeno pedaço do fio por um dos lúmens.",
          "Inserir cateter completamente e retirar o fio-guia.",
          "Conectar ao sistema pressurizado já preenchido com soro.",
          "Observar a curva de pressão arterial no monitor.",
          "Fixar o cateter com sutura.",
          "Curativo e rechecagem da curva."
        ],
        femoral: [
          "Posicionamento: decúbito dorsal horizontal com leve rotação lateral do membro.",
          "Palpação da artéria no triângulo femoral, lateral à veia femoral.",
          "Introduzir agulha com direcionamento cranial, bisel para cima, ângulo 30°–45°.",
          "Após punção, observar fluxo pulsátil vermelho-vivo e introduzir fio-guia.",
          "Pode ser necessária pequena dilatação da pele.",
          "Retirar a agulha mantendo o fio-guia firme.",
          "Passar o cateter pelo fio-guia.",
          "Após inserção completa, retirar o fio-guia.",
          "Conectar ao sistema pressurizado.",
          "Observar curva no monitor.",
          "Fixar com sutura.",
          "Curativo oclusivo.",
          "Rechecar curva."
        ]
      },
      ondaQuadrada: {
        titulo: "Teste da Onda Quadrada",
        descricao: "Avaliação da onda de pressão durante flushing rápido. Subida rápida + interrupção rápida → traçado quadriculado. Normal: 2–3 ondulações negativas antes do zero.",
        amortecida: "Subestima PAs e superestima PAd. Causas: cateter dobrado, coágulo/bolha, pressão reduzida na bolsa pressórica.",
        subamortecida: "Superestima PAs e subestima PAd. Causas: circuito muito extenso, vasoconstrição, sistema defeituoso.",
        orientacoes: [
          "Manter pressão de 300 mmHg",
          "Transdutor no eixo fleboestático (4º EIC linha axilar média)",
          "Trocar a salina se volume < 25%"
        ],
        zerarPAI: [
          "Posicionar no eixo fleboestático",
          "Fechar o circuito para o paciente",
          "Abrir o circuito para o ambiente",
          "Zerar a PAI no monitor",
          "Abrir o circuito para o paciente",
          "Fechar o circuito para o ambiente"
        ]
      }
    },
    {
      id: "cvc",
      nome: "Acesso Venoso Central (CVC)",
      descricao: "Puncionar veia central somente quando o acesso periférico não atender às demandas urgentes.",
      indicacoes: [
        "Monitoração da SvcO₂ na reanimação precoce de sepse grave/choque séptico",
        "Medidas hemodinâmicas e Swan-Ganz",
        "Nutrição parenteral total e uso de drogas vasoativas",
        "Hemodiálise / plasmaférese",
        "Passagem de marca-passo transvenoso",
        "Hipovolemia sem possibilidade de acesso periférico"
      ],
      contraindicacoesRelativas: [
        "Infecção na região do procedimento",
        "Coagulopatia não corrigida (ex.: plaquetas < 20.000/mm³)",
        "Trombose do vaso a ser puncionado"
      ],
      sitios: [
        {
          nome: "Veia Jugular Interna",
          vantagens: "Menor risco de complicações; facilmente compressível.",
          desvantagens: "Acesso difícil em obesos/pescoço curto; colabamento em hipovolêmicos; contaminação em traqueostomizados; risco de pneumotórax."
        },
        {
          nome: "Veia Subclávia",
          vantagens: "Menor variabilidade anatômica; melhor fixação; menor taxa de infecções.",
          desvantagens: "Difícil compressão; risco de pneumotórax; colabamento em hipovolêmicos."
        },
        {
          nome: "Veia Femoral",
          vantagens: "Fácil punção; facilmente compressível; preferência em discrasia sanguínea.",
          desvantagens: "Local com grande mobilidade; dificuldade de curativo e fixação; alto potencial de contaminação."
        }
      ],
      passos: [
        "Avise sobre a assepsia e explique o procedimento.",
        "Colocação do campo cirúrgico estéril.",
        "Botão anestésico, aspirando com seringa e aplicando quantidade adequada.",
        "Se USG disponível, usá-lo para localizar a veia e observar a progressão da agulha.",
        "Inserir a agulha aspirando; após atingir o vaso, verificar se é venoso (cor e pressão).",
        "Introduzir o fio-guia ~20 cm; se não progredir, reduzir levemente o ângulo. Após progressão, retirar a agulha.",
        "Dilatar a pele e o trajeto com o dilatador pelo fio-guia. Pode ser necessária pequena abertura com bisturi.",
        "Manter o fio-guia e retirar o dilatador.",
        "Introduzir o cateter definitivo sem perder a extremidade distal do fio-guia.",
        "Testar fluxo/refluxo e salinizar as vias.",
        "Fixar o cateter com pontos, conforme o fabricante.",
        "Limpeza com clorexidina alcoólica.",
        "Curativo.",
        "Raio-X de tórax para conferir posicionamento, se acesso alto.",
        "Registrar procedimento detalhado no prontuário."
      ],
      alerta: "Após algumas tentativas mal-sucedidas ou punção arterial inadvertida (sempre seguida por compressão local prolongada), considerar interrupção do procedimento."
    }
  ]
};
