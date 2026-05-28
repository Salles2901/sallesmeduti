// src/data/scores.ts
import { ScoreConfig } from '../types';

export const INITIAL_SCORES: ScoreConfig[] = [
  {
    id: 'gcs',
    name: 'Escala de Coma de Glasgow (GCS)',
    description: 'Avaliação clínica neurológica objetiva do nível de consciência de pacientes com lesão cerebral aguda.',
    categories: [
      {
        title: 'Abertura Ocular',
        questions: [
          { id: 'eye_4', text: 'Espontânea (+4 pontos)', points: 4 },
          { id: 'eye_3', text: 'Ao comando verbal (+3 pontos)', points: 3 },
          { id: 'eye_2', text: 'À estimulação física/dor (+2 pontos)', points: 2 },
          { id: 'eye_1', text: 'Ausente (+1 ponto)', points: 1 },
        ]
      },
      {
        title: 'Resposta Verbal',
        questions: [
          { id: 'verbal_5', text: 'Orientado / Conversa coerente (+5 pontos)', points: 5 },
          { id: 'verbal_4', text: 'Confuso (+4 pontos)', points: 4 },
          { id: 'verbal_3', text: 'Palavras inapropriadas (+3 pontos)', points: 3 },
          { id: 'verbal_2', text: 'Sons incompreensíveis (+2 pontos)', points: 2 },
          { id: 'verbal_1', text: 'Ausente (+1 ponto)', points: 1 },
          { id: 'verbal_nt', text: 'Não Testável (ex: Tubo Orotraqueal) (0 pontos)', points: 0 },
        ]
      },
      {
        title: 'Resposta Motora',
        questions: [
          { id: 'motor_6', text: 'Obedece a comandos (+6 pontos)', points: 6 },
          { id: 'motor_5', text: 'Localiza estímulo doloroso (+5 pontos)', points: 5 },
          { id: 'motor_4', text: 'Flexão normal / Retirada à dor (+4 pontos)', points: 4 },
          { id: 'motor_3', text: 'Flexão anormal / Postura de decorticação (+3 pontos)', points: 3 },
          { id: 'motor_2', text: 'Extensão anormal / Postura de descerebração (+2 pontos)', points: 2 },
          { id: 'motor_1', text: 'Ausente (+1 ponto)', points: 1 },
        ]
      },
      {
        title: 'Reatividade Pupilar (GCS-P)',
        questions: [
          { id: 'pupil_0', text: 'Duas pupilas reagem ao estímulo fotomotor (0 pontos)', points: 0 },
          { id: 'pupil_minus1', text: 'Apenas uma pupila reage (-1 ponto)', points: -1 },
          { id: 'pupil_minus2', text: 'Nenhuma das pupilas reage (-2 pontos)', points: -2 },
        ]
      }
    ],
    interpretations: [
      { min: 13, max: 15, title: 'TC Leve / Consciência Preservada', class: 'low', action: 'Monitorar sinais vitais, avaliar necessidade de tomografia sob critérios de TC leve (ex: New Orleans ou Canadian rules).' },
      { min: 9, max: 12, title: 'TC Moderado', class: 'medium', action: 'Internação hospitalar imediata, estabilização clínica rápida e realização de tomografia computadorizada de crânio urgente.' },
      { min: 3, max: 8, title: 'TC Grave (Coma)', class: 'critical', action: 'Indicação imediata de intubação orotraqueal protetora para salvaguardar a via aérea, ventilação mecânica invasiva e vigilância neurológica estrita em UTI.' }
    ],
    reference: 'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. A practical scale. Lancet. 1974.'
  },
  {
    id: 'curb65',
    name: 'CURB-65 para Pneumonia',
    description: 'Determina a gravidade e o local do tratamento apropriado em pacientes com Pneumonia Adquirida na Comunidade (PAC).',
    categories: [
      {
        title: 'Fatores de Risco de CURB-65',
        questions: [
          { id: 'curb_c', text: 'Confusão mental aguda (desorientação em tempo, espaço ou pessoa) (+1 ponto)', points: 1 },
          { id: 'curb_u', text: 'Ureia sérica sérica ≥ 43 mg/dL (ou uremia > 7 mmol/L) (+1 ponto)', points: 1 },
          { id: 'curb_r', text: 'Frequência respiratória FR ≥ 30 incursões/min (+1 ponto)', points: 1 },
          { id: 'curb_b', text: 'Pressão arterial sistólica < 90 mmHg ou diastólica ≤ 60 mmHg (+1 ponto)', points: 1 },
          { id: 'curb_65', text: 'Idade ≥ 65 anos (+1 ponto)', points: 1 }
        ]
      }
    ],
    interpretations: [
      { min: 0, max: 1, title: 'Grupo 1 - Risco Baixo (Mortalidade < 1.5%)', class: 'low', action: 'Tratamento ambulatorial seguro com antibióticos por via oral. Repouso domiciliar.' },
      { min: 2, max: 2, title: 'Grupo 2 - Risco Moderado (Mortalidade ~9.2%)', class: 'medium', action: 'Considerar internação hospitalar curta ou observação em enfermaria para administração de antibióticos venosos ou monitoramento.' },
      { min: 3, max: 5, title: 'Grupo 3 - Risco Elevado (Mortalidade 15% - 40%)', class: 'high', action: 'Internação hospitalar obrigatória. Avaliar prontamente necessidade de admissão em Unidade de Terapia Intensiva (UTI) se choque ou insuficiência respiratória iminente.' }
    ],
    reference: 'Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003.'
  },
  {
    id: 'wells_tep',
    name: 'Critérios de Wells para Embolia Pulmonar',
    description: 'Escore de probabilidade pré-teste para Embolia Pulmonar Aguda (TEP) em ambiente de urgência.',
    categories: [
      {
        title: 'Fatores Clínicos',
        questions: [
          { id: 'tep_symptoms', text: 'Sinais clínicos de Trombose Venosa Profunda (TVP) com edema assimétrico e dor à palpação (+3 pontos)', points: 3 },
          { id: 'tep_alt_dx', text: 'Diagnóstico alternativo é menos provável que tromboembolismo pulmonar (+3 pontos)', points: 3 },
          { id: 'tep_hr', text: 'Frequência cardíaca > 100 batimentos por minuto (+1.5 ponto)', points: 1.5 },
          { id: 'tep_immobil', text: 'Imobilização voluntária ou cirurgia nas últimas 4 semanas (+1.5 ponto)', points: 1.5 },
          { id: 'tep_history', text: 'Histórico prévio diagnosticado de TVP ou TEP (+1.5 ponto)', points: 1.5 },
          { id: 'tep_hemoptysis', text: 'Hemoptise recente (+1 ponto)', points: 1 },
          { id: 'tep_cancer', text: 'Tratamento oncológico ativo ou nos últimos 6 meses (+1 ponto)', points: 1 }
        ]
      }
    ],
    interpretations: [
      { min: 0, max: 4, title: 'Baixa Probabilidade de TEP (Duas Categorias: TEP improvável)', class: 'low', action: 'Solicitar D-Dímero quantitativo. Se D-dímero for normal (< 500 ng/mL ou ajustado por idade), TEP está clinicamente excluído. Não necessita de Angiotomografia.' },
      { min: 4.5, max: 12, title: 'Alta Probabilidade de TEP (Duas Categorias: TEP Provável)', class: 'high', action: 'Angiotomografia computadorizada de artérias pulmonares (Angio-TC de tórax) direta está indicada de imediato. Considerar anticoagulação empírica plena enquanto aguarda imagem se não houver contraindicação.' }
    ],
    reference: 'Wells PS, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: cohort study. Thromb Haemost. 2000.'
  },
  {
    id: 'wells_tvp',
    name: 'Critérios de Wells para TVP',
    description: 'Escore de probabilidade pré-teste para suspeita de Trombose Venosa Profunda em membros inferiores.',
    categories: [
      {
        title: 'Achados Clínicos',
        questions: [
          { id: 'tvp_cancer', text: 'Câncer ativo (tratamento em andamento, recente ou paliativo nas últimas semanas) (+1 ponto)', points: 1 },
          { id: 'tvp_paralysis', text: 'Paralisia, paresia ou imobilização gessada recente dos membros inferiores (+1 ponto)', points: 1 },
          { id: 'tvp_bedridden', text: 'Acamado por mais de 3 dias ou cirurgia de grande porte nas últimas 12 semanas (+1 ponto)', points: 1 },
          { id: 'tvp_tenderness', text: 'Dor ou sensibilidade localizada ao longo do trajeto venoso profundo (+1 ponto)', points: 1 },
          { id: 'tvp_swelling_leg', text: 'Inchaço generalizado de toda a perna afetada (+1 ponto)', points: 1 },
          { id: 'tvp_swelling_calf', text: 'Assimetria de panturrilha ≥ 3 cm em relação à perna não afetada (+1 ponto)', points: 1 },
          { id: 'tvp_pitting', text: 'Edema depressivo (cacifo venoso) limitado à perna sintomática (+1 ponto)', points: 1 },
          { id: 'tvp_collateral', text: 'Veias colaterais superficiais não varicosas visíveis (+1 ponto)', points: 1 },
          { id: 'tvp_prev', text: 'Antigo diagnóstico comprovado de TVP documentado nas pernas (+1 ponto)', points: 1 },
          { id: 'tvp_alt', text: 'Diagnóstico alternativo tão provável ou mais provável que TVP (-2 pontos)', points: -2 }
        ]
      }
    ],
    interpretations: [
      { min: -2, max: 0, title: 'Probabilidade Baixa de TVP (Incidência ~3%)', class: 'low', action: 'Solicitar D-Dímero. Se negativo, TVP está excluído de forma extremamente segura. Se positivo, prosseguir para Ultrassonografia com Doppler.' },
      { min: 1, max: 2, title: 'Probabilidade Moderada de TVP (Incidência ~17%)', class: 'medium', action: 'Solicitar D-Dímero ou ir diretamente para Ultrassonografia venosa de membros inferiores.' },
      { min: 3, max: 9, title: 'Probabilidade Alta de TVP (Incidência ~75%)', class: 'high', action: 'Realizar Ultrassonografia com Doppler venoso de membros inferiores em caráter de urgência. Em caso de exame inicial negativo ou inconclusivo mas suspeita firme, repetir ecografia em 5-7 dias ou investigar pelve.' }
    ],
    reference: 'Wells PS, et al. Determination of clinical toxicity of deep vein thrombosis. Lancet. 1997.'
  },
  {
    id: 'cha2ds2vasc',
    name: 'CHA₂DS₂-VASc Score',
    description: 'Estima o risco anual de acidente vascular cerebral (AVC) isquêmico em portadores de Fibrilação Atrial (FA) não-valvar.',
    categories: [
      {
        title: 'Fatores Clínicos de Risco',
        questions: [
          { id: 'cha_c', text: 'C - Insuficiência Cardíaca Congestiva (ou disfunção do VE moderada a grave) (+1 ponto)', points: 1 },
          { id: 'cha_h', text: 'H - Hipertensão Arterial Sistêmica crônica (+1 ponto)', points: 1 },
          { id: 'cha_a2', text: 'A₂ - Idade ≥ 75 anos (+2 pontos)', points: 2 },
          { id: 'cha_d', text: 'D - Diabetes Mellitus (+1 ponto)', points: 1 },
          { id: 'cha_s2', text: 'S₂ - Histórico prévio de AVC / AIT / Tromboembolismo periférico (+2 pontos)', points: 2 },
          { id: 'cha_v', text: 'V - Doença Vascular diagnosticada (Infarto do Miocárdio prévio, DAP ou placa na aorta) (+1 ponto)', points: 1 },
          { id: 'cha_a1', text: 'A₁ - Idade entre 65 e 74 anos (+1 ponto)', points: 1 },
          { id: 'cha_sc', text: 'Sc - Sexo Biológico Feminino (+1 ponto)', points: 1 }
        ]
      }
    ],
    interpretations: [
      { min: 0, max: 0, title: 'Escore 0 (Homens) ou Escore 1 (Mulheres) - Risco Muito Baixo', class: 'low', action: 'Não reter indicação para anticoagulação preventiva. Uso de antiplaquetário não está indicado.' },
      { min: 1, max: 1, title: 'Escore 1 (Homens) - Risco Baixo a Moderado (~0.6-1.3% risco de AVC/ano)', class: 'medium', action: 'Considerar anticoagulação oral individualizada (preferência pelos anticoagulantes orais diretos - DOACs). Analisar risco-benefício.' },
      { min: 2, max: 9, title: 'Escore ≥ 2 (Homens) ou ≥ 3 (Mulheres) - Risco Elevado (>2.2% risco de AVC/ano)', class: 'high', action: 'Anticoagulação preventiva oral com DOACs (Apixabana, Rivaroxabana, Dabigatrana) ou Varfarina está ALTAMENTE indicada e recomendada pelas diretrizes internacionais.' }
    ],
    reference: 'Lip GY, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation. Chest. 2010.'
  },
  {
    id: 'hasbled',
    name: 'HAS-BLED Bleeding Score',
    description: 'Estima o risco anual de sangramento maior em pacientes em uso de anticoagulantes orais para Fibrilação Atrial.',
    categories: [
      {
        title: 'Fatores de Sangramento',
        questions: [
          { id: 'has_h', text: 'H - Hipertensão arterial não controlada (Sistólica > 160 mmHg) (+1 ponto)', points: 1 },
          { id: 'has_a', text: 'A - Função renal severa alterada (Creatinina >2.26 mg/dL, diálise) ou função hepática cirrótica (+1 ou +2 pontos)', points: 1 }, // Simplificado para score
          { id: 'has_s', text: 'S - Acidente Vascular Cerebral prévio (+1 ponto)', points: 1 },
          { id: 'has_b', text: 'B - Tendência prévia ao sangramento ou anemia severa (+1 ponto)', points: 1 },
          { id: 'has_l', text: 'L - RNI Lábil / Instável (flutuações frequentes na varfarina, TTR < 60%) (+1 ponto)', points: 1 },
          { id: 'has_e', text: 'E - Idade avançada (Idade > 65 anos) (+1 ponto)', points: 1 },
          { id: 'has_d', text: 'D - Drogas (AINEs, antiplaquetários concomitantes) ou abuso ativo de álcool (+1 ou +2 pontos)', points: 1 }
        ]
      }
    ],
    interpretations: [
      { min: 0, max: 2, title: 'Risco Baixo a Moderado de Sangramento (~1-1.8% sangramento maior/ano)', class: 'low', action: 'Anticoagulação segura recomendada se indicada pelo CHA2DS2-VASc.' },
      { min: 3, max: 9, title: 'Risco Elevado de Sangramento (≥ 3.7% sangramento maior/ano)', class: 'high', action: 'Atenção especial recomendada! Identificar e remover fatores de risco modificáveis (controlar PA, suspender anti-inflamatórios nocivos, diminuir etilismo). NÃO contraindica por si só a anticoagulação se houver benefício líquido, mas requer acompanhamento médico frequente.' }
    ],
    reference: 'Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation. Chest. 2010.'
  },
  {
    id: 'child_pugh',
    name: 'Escore de Child-Pugh',
    description: 'Classifica o prognóstico de gravidade e taxa de sobrevida de portadores de Cirrose Hepática e insuficiência hepatocelular crônica.',
    categories: [
      {
        title: 'Critérios Clínicos',
        questions: [
          { id: 'child_enceph_none', text: 'Encefalopatia Hepática: Ausente/Grau 0 (+1 ponto)', points: 1 },
          { id: 'child_enceph_mod', text: 'Encefalopatia Hepática: Grau I-II (Leve / Confusão, Flapping) (+2 pontos)', points: 2 },
          { id: 'child_enceph_sev', text: 'Encefalopatia Hepática: Grau III-IV (Grave / Estupor, Coma) (+3 pontos)', points: 3 },
          
          { id: 'child_ascit_none', text: 'Ascite: Ausente (+1 ponto)', points: 1 },
          { id: 'child_ascit_mod', text: 'Ascite: Leve ou controlável farmacologicamente (+2 pontos)', points: 2 },
          { id: 'child_ascit_sev', text: 'Ascite: Moderada a Grave / Refratária (+3 pontos)', points: 3 },
        ]
      },
      {
        title: 'Dados Laboratoriais',
        questions: [
          { id: 'child_bili_1', text: 'Bilirrubina total sérica: < 2.0 mg/dL (+1 ponto)', points: 1 },
          { id: 'child_bili_2', text: 'Bilirrubina total sérica: 2.0 a 3.0 mg/dL (+2 pontos)', points: 2 },
          { id: 'child_bili_3', text: 'Bilirrubina total sérica: > 3.0 mg/dL (+3 pontos)', points: 3 },

          { id: 'child_alb_1', text: 'Albumina plasmática: > 3.5 g/dL (+1 ponto)', points: 1 },
          { id: 'child_alb_2', text: 'Albumina plasmática: 2.8 a 3.5 g/dL (+2 pontos)', points: 2 },
          { id: 'child_alb_3', text: 'Albumina plasmática: < 2.8 g/dL (+3 pontos)', points: 3 },

          { id: 'child_inr_1', text: 'INR: < 1.7 (+1 ponto)', points: 1 },
          { id: 'child_inr_2', text: 'INR: 1.7 a 2.3 (+2 pontos)', points: 2 },
          { id: 'child_inr_3', text: 'INR: > 2.3 (+3 pontos)', points: 3 },
        ]
      }
    ],
    interpretations: [
      { min: 5, max: 6, title: 'Classe A (Sobrevida de 1 ano ~100%, 2 anos ~85%)', class: 'low', action: 'Doença hepática compensada bem controlada. Tratar causa primária de forma conservadora.' },
      { min: 7, max: 9, title: 'Classe B (Sobrevida de 1 ano ~80%, 2 anos ~60%)', class: 'medium', action: 'Comprometimento funcional hepático moderado. Avaliar necessidade de transplante de fígado e rastrear complicações como varizes esofágicas.' },
      { min: 10, max: 15, title: 'Classe C (Sobrevida de 1 ano ~45%, 2 anos ~35%)', class: 'high', action: 'Insuficiência hepática crônica grave (descompensada). Encaminhamento à consulta para transplante hepático prioritário. Triagem rigorosa de Peritonite Bacteriana Espontânea (PBE) e Encefalopatia crônica.' }
    ],
    reference: 'Pugh RN, et al. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg. 1973.'
  },
  {
    id: 'rass',
    name: 'Escala de Agitação-Sedação de Richmond (RASS)',
    description: 'Muito utilizada em Terapia Intensiva (UTI) para avaliar o grau de sedação e agitação de forma quantitativa e qualitativa.',
    categories: [
      {
        title: 'Pontuação de Agitação ou Sedação',
        questions: [
          { id: 'rass_4', text: '+4 Combativo: Violento e combatido; risco imediato para a equipe profissional', points: 4 },
          { id: 'rass_3', text: '+3 Muito Agitado: Agressivo; puxa ou tenta remover tubos orotraqueais ou cateteres', points: 3 },
          { id: 'rass_2', text: '+2 Agitado: Movimentos despropositados frequentes; briga ou assincronia com o ventilador mecânico', points: 2 },
          { id: 'rass_1', text: '+1 Inquieto: Intranquilo, ansioso; movimentação sem caráter agressivo ou vigoroso', points: 1 },
          { id: 'rass_0', text: '0 Alerta e Calmo', points: 0 },
          { id: 'rass_m1', text: '-1 Sonolento: Desperta facilmente ao comando verbal; mantém contato visual sustentado (> 10 segundos)', points: -1 },
          { id: 'rass_m2', text: '-2 Sedação Leve: Desperta ao chamado verbal; contato visual breve (< 10 segundos)', points: -2 },
          { id: 'rass_m3', text: '-3 Sedação Moderada: Apresenta movimentos ou abertura ocular ao chamado verbal; sem contato visual', points: -3 },
          { id: 'rass_m4', text: '-4 Sedação Intensa: Sem resposta ao estímulo verbal; apresenta abertura ocular ou movimentos ao estímulo físico/tátil', points: -4 },
          { id: 'rass_m5', text: '-5 Não Desperta: Nenhuma resposta ao estímulo verbal ou tátil/físico', points: -5 }
        ]
      }
    ],
    interpretations: [
      { min: 1, max: 4, title: 'Agitação / Risco de Auto-Extubação', class: 'critical', action: 'Paciente agitado com alto risco. Avalie controle da dor e otimização das infusões sedativas. Considere triagem de Delirium.' },
      { min: 0, max: 0, title: 'Alerta e Calmo (Estado Fisiológico Ideal)', class: 'low', action: 'Estado hemodinâmico e neurológico ideal na ausência de sedação profunda. Seguir com protocolo de desmame ou despertar diário.' },
      { min: -3, max: -1, title: 'Sedação Leve a Moderada', class: 'medium', action: 'Nível de sedação ideal recomendado para a maioria dos pacientes em ventilação mecânica (-1 a -2). Avalie despertar diário se estável.' },
      { min: -5, max: -4, title: 'Sedação Profunda a Muito Profunda', class: 'high', action: 'Indicado para bloqueio neuromuscular, SARA grave ou hipertensão intracraniana. Monitorar acúmulo e metabolização de sedativos, especialmente renais.' }
    ],
    reference: 'Sessler CN, et al. The Richmond Agitation-Sedation Scale: validity and reliability in adult intensive care unit patients. Am J Respir Crit Care Med. 2002.'
  }
];
