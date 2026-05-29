// src/data/references.ts
import { ReferenceArticle } from '../types';

export const INITIAL_REFERENCES: ReferenceArticle[] = [
  {
    id: 'renal_abx',
    category: 'antibioticos',
    title: 'Ajuste de Antibióticos pela Função Renal',
    subtitle: 'Redução de dose e intervalos baseados no Clearance de Creatinina (ClCr)',
    lastUpdated: 'Atualizado em 2026',
    tags: ['Nefrologia', 'Infectologia', 'UTI', 'Antibióticos'],
    sections: [
      {
        title: 'Introdução e Cuidados Básicos',
        content: 'A adequação da dose de antimicrobianos em pacientes com disfunção renal é vital para evitar toxicidades neurológicas, hematológicas ou renais secundárias e, ao mesmo tempo, garantir a eficácia terapêutica máxima. Use sempre a **fórmula de Cockcroft-Gault** para calcular o ClCr estimado.'
      },
      {
        title: 'Tabela Prática de Ajuste de Antimicrobianos',
        content: 'Prescrever a dose inicial cheia (dose de ataque) para atingir os níveis séricos terapêuticos rapidamente, independente da função renal. Realizar os seguintes ajustes nas doses subsequentes de manutenção:',
        table: {
          headers: ['Medicamento', 'ClCr > 50 mL/min (Normal)', 'ClCr 10 - 50 mL/min (Moderado)', 'ClCr < 10 mL/min (Grave / Diálise)'],
          rows: [
            ['Piperacilina/Tazobactam (Tazocin)', '4,5g IV a cada 6h', '2,25g a 3,375g IV a cada 8h', '2,25g IV a cada 8h ou 12h (Em hemodiálise regular, dose extra de 2,25g pós-sessão)'],
            ['Meropenem', '1g a 2g IV a cada 8h', '1g IV a cada 12h (ClCr 26-50); 500mg IV a cada 12h (ClCr 10-25)', '500mg IV a cada 24h (Administrar pós-diálise nos dias de sessão)'],
            ['Vancomicina', '15-20 mg/kg IV a cada 12h (Fazer dose de ataque de 25-30 mg/kg)', 'Monitorar nível sérico (vancomicinemia) e ajustar intervalo para cada 24-48h', 'Apenas por nível sérico terapêutico (idealmente coletar vale e infundir nova dose se < 15-20 mcg/mL)'],
            ['Imipenem', '500mg a 1g IV a cada 6h', '250mg a 500mg IV a cada 8-12h', '125mg a 250mg IV a cada 24h (Forte associação com convulsões se acumulado)'],
            ['Ceftriaxone', '1g a 2g IV a cada 12h a 24h', 'Não requer ajuste de dose', 'Sem ajuste mandatório. Limitar dose máxima diaria a 2g/dia.'],
            ['Levofloxacino', '500mg a 750mg IV/VO a cada 24h', 'Dose única de ataque de 500mg/750mg, seguida por 250mg ou 500mg a cada 48h', 'Dose única de ataque seguida por 250mg IV/VO a cada 48h']
          ]
        }
      },
      {
        title: 'Nefrotoxicidade Aditiva',
        content: 'Evitar o uso associado de Aminoglicosídeos (Amicacina/Gentamicina), Anfotericina B de oxicolato, Polimixina B, ou contraste iodado em pacientes limítrofes sem severa urgência. Manter hidratação adequada para minimizar perdas agudas de função renal (LRA).'
      }
    ]
  },
  {
    id: 'mech_vent',
    category: 'ventilacao',
    title: 'Parâmetros Iniciais de Ventilação Mecânica',
    subtitle: 'Protocolo de ventilação mecânica protetora em UTI',
    lastUpdated: 'Atualizado em 2026',
    tags: ['Pneumologia', 'UTI', 'Adulto', 'Guia de Emergência'],
    sections: [
      {
        title: 'Cálculo do Volume Corrente Protetor (VC)',
        content: 'O volume do pulmão é determinado pela altura do paciente, **nunca** pelo peso real aferido (devido ao risco de volutrauma em obesos). Deve-se programar de **4 a 6 mL/kg de Peso Corporal Predito (PBW)**.\n\n**Fórmula de Devine para Peso Ideal:**\n*   **Masculino:** 50.0 + 2.3 × (Altura em cm − 152.4)\n*   **Feminino:** 45.5 + 2.3 × (Altura em cm − 152.4)'
      },
      {
        title: 'Ajustes Iniciais Recomendados',
        content: 'Ao acoplar o paciente em ventilação invasiva por insuficiência respiratória normocápnica, inicie com as seguintes referências:',
        table: {
          headers: ['Parâmetro', 'Valor Padrão Inicial', 'Observações / Ajustes Dirigidos'],
          rows: [
            ['Modo Ventilatório', 'PCV (Pressão Controlada) ou VCV (Volume Controlado)', 'PCV é preferível por limitar a pressão de via aérea de forma contínua.'],
            ['Volume Corrente (VC)', '6 mL/kg (Peso Predito)', 'Reduzir para 4-5 mL/kg em caso de SARA (Síndrome do Desconforto Respiratório Agudo).'],
            ['Alvo de Pressão (PCV)', 'Acima da PEEP para atingir VC desejado', 'Manter pressão inspiratória padrão inicial de delta 10 a 14 cmH₂O.'],
            ['PEEP (Pressão Positiva)', '5 a 8 cmH₂O', 'Aumentar gradualmente em SARA para recrutar alvéolos e otimizar oxigenação.'],
            ['Frequência Respiratória (FR)', '12 a 16 incursões/min', 'Ajustar para manter pCO₂ arterial entre 35-45 mmHg (ou 40-50 em retentores crônicos).'],
            ['Fração Inspirada de O₂ (FiO₂)', '100% de início para estabilização', 'Desmamar rapidamente para < 60% assim que SpO₂ atingir 92-96% para prevenir lesão por radicais de oxigênio.'],
            ['Relação I:E', '1:2 a 1:3', 'Aumentar o tempo expiratório (1:4) em pacientes obstrutivos (DPOC / Asma) para evitar empilhamento de ar (Auto-PEEP).']
          ]
        }
      },
      {
        title: 'Metas Fisiológicas de Segurança Pulmonar',
        content: '1.  **Pressão de Platô (Plateau Pressure):** ≤ 30 cmH₂O (previne lesão física nos alvéolos).\n2.  **Driving Pressure (Diferença entre Pressão de Platô e PEEP):** < 15 cmH₂O (fator prognóstico mais importante para sobrevida).\n3.  **SpO₂ alvo:** 92% a 96% (ou 88% a 92% em DPOC hipercapnicos).'
      }
    ]
  },
  {
    id: 'sodium_mng',
    category: 'eletrolitos',
    title: 'Manejo de Distúrbios Rápidos de Sódio',
    subtitle: 'Tratamento de Hiponatremia e Hipernatremia agudas e crônicas',
    lastUpdated: 'Atualizado em 2026',
    tags: ['Nefrologia', 'Eletrólitos', 'ICU', 'Segurança do Paciente'],
    sections: [
      {
        title: 'Hiponatremia Grave / Sintomática (Na < 125 mEq/L)',
        content: 'Pacientes com sintomas neurológicos severos (convulsão, letargia intensa, coma, herniação encefálica iminente) necessitam de reposição imediata de **Solução Salina Hipertônica a 3% (NaCl 3%)**.'
      },
      {
        title: 'Protocolo de Emergência - NaCl 3%',
        content: 'O objetivo principal imediato é cessar os sintomas neurológicos graves, necessitando de uma elevação de apenas 4-6 mEq/L do sódio sérico rápido nas primeiras horas.\n\n*   **Conduta rápida (Sem cálculo demorado):** Infundir **100 mL de NaCl 3% IV em 10 a 20 minutos**.\n*   Se refratário a convulsões, repetir até 3 vezes (totalizando 300 mL de NaCl 3%).',
        table: {
          headers: ['Estágio da Correção', 'Limites Máximos Seguros', 'Risco Clínico Crítico'],
          rows: [
            ['Em 24 horas', 'Máximo de 8 a 10 mEq/L de elevação total', '**Mielinólise Pontina Central** (Desmielinização Osmótica - paralisia irreversível, coma) se corrigido rapidamente.'],
            ['Em 48 horas', 'Máximo de 18 mEq/L de elevação total', 'Coletar gasometria/eletrólitos a cada 4 horas para prever e interromper se extrapolar velocidade.'],
            ['Hiponatremia Crônica (>48h)', 'Velocidade ideal lenta de 0.5 mEq/L por hora', 'Utilizar comitivas com restrição hídrica se assintomático moderado.'],
            ['Fórmula de Adrogué-Madias', 'Delt_Na = (Na_soro - Na_pac) / (ACT + 1)', 'Mapeia a alteração gerada por 1 litro de infusão específica. ACT = Peso × Fator (Homens: 0.6, Mulheres: 0.5)']
          ]
        }
      },
      {
        title: 'Hipernatremia (Na > 145 mEq/L) - Reposição de Água Livre',
        content: 'O tratamento consiste em infusão enteral de água mineral pelo cateter nasogástrico ou soro glicosado 5% (SG5%) intravenoso.\n\n**Cálculo do Déficit de Água Livre (L):**\n`Déficit = ACT × ((Na_atual / Na_desejado) - 1)`\n*Exemplo:* Para um paciente de 80kg com sódio de 160 mEq/L, o déficit hídrico de reposição lenta em 24-48 horas aproximado é de ~6,5 litros de água.'
      }
    ]
  },
  {
    id: 'acls_alg',
    category: 'cardiaco',
    title: 'Suporte Avançado de Vida (ACLS) - Guia Prático',
    subtitle: 'Sequenciamento clínico para Parada Cardiorrespiratória (PCR)',
    lastUpdated: 'Atualizado em 2026',
    tags: ['ACLS', 'Cardiologia', 'Emergência', 'Ressuscitação'],
    sections: [
      {
        title: 'Fluxograma de Atendimento Imediato (CAB)',
        content: 'Foco inicial em compressões torácicas de alta qualidade (100-120/min), profundidade de 5 a 6 cm com retorno completo do tórax e interrupções mínimas.'
      },
      {
        title: 'Ritmos Chocáveis vs. Não Chocáveis',
        content: 'Instalar o monitor ou desfibrilador manual e avaliar o ritmo:',
        table: {
          headers: ['Tipo de Ritmo', 'Raciocínio Clínico', 'Medicamentos e Choques'],
          rows: [
            ['Fibrilação Ventricular (FV) ou Taquicardia Ventricular Sem Pulso (TVSP)', '**Chocável!** Proceder despolarização rápida.', '1º Choque (200J Bifásico) -> 2 min RCP -> 2º Choque -> Adrenalina 1mg (repetir cada 3-5 min) -> 3º Choque -> Amiodarona 300mg (2ª dose 150mg p/ 5º ciclo) ou Lidocaína 1-1,5 mg/kg.'],
            ['Assistolia ou Atividade Elétrica Sem Pulso (AESP)', '**Não-Chocável!** Buscar causas reversíveis.', 'Administração rápida extrema de **Adrenalina 1mg IV/IO** de imediato -> 2 minutos de RCP de alto rendimento -> Checar ritmo/pulso -> Corrigir e buscar as causas de 5H e 5T.']
          ]
        }
      },
      {
        title: 'Diagnósticos Reversíveis (Os 5Hs e 5Ts)',
        content: 'Investigar agressivamente durante a ressurreição cardiopulmonar ativa:\n\n*   **5Hs:** Hipovolemia, Hipóxia, Hidrogênio (Acidose), Hipo/Hipercalemia, Hipotermia.\n*   **5Ts:** Tensão no tórax (Pneumotórax Hipertensivo), Tamponamento cardíaco, Toxinas (overdose, opioides...), Trombose coronária (IAM), Trombose pulmonar (TEP massivo).'
      }
    ]
  }
];
