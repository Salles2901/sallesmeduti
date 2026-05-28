// src/components/ScoreCalculator.tsx
import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Check, 
  RotateCcw, 
  HelpCircle, 
  BookOpen, 
  Save, 
  Info,
  Calendar,
  AlertOctagon,
  ChevronsRight,
  Stethoscope
} from 'lucide-react';
import { ScoreConfig, ScoreQuestion, CalculationHistoryItem } from '../types';
import { INITIAL_SCORES } from '../data/scores';

interface ScoreCalculatorProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  selectedScoreId?: string;
  setSelectedScoreId?: (scoreId: string) => void;
}

export default function ScoreCalculator({ 
  onAddHistory,
  selectedScoreId: propSelectedScoreId,
  setSelectedScoreId: propSetSelectedScoreId
}: ScoreCalculatorProps) {
  const [scores] = useState<ScoreConfig[]>(INITIAL_SCORES);
  const [localSelectedScoreId, setLocalSelectedScoreId] = useState<string>(INITIAL_SCORES[0].id);

  const currentSelectedScoreId = propSelectedScoreId ?? localSelectedScoreId;
  const selectedScore = scores.find(s => s.id === currentSelectedScoreId) ?? scores[0];

  const setSelectedScore = (score: ScoreConfig) => {
    if (propSetSelectedScoreId) {
      propSetSelectedScoreId(score.id);
    } else {
      setLocalSelectedScoreId(score.id);
    }
  };

  const [selectedQuestions, setSelectedQuestions] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Initialize selected values for unique categories (e.g. exclusive options in Glasgow or Child-Pugh)
  // Categories in GCS/Child-Pugh have exclusive options.
  // We'll manage exclusive select questions in states.
  useEffect(() => {
    // Reset selections on score change
    const initialSelections: Record<string, boolean> = {};
    
    // For general checklists like CURB-65, Wells, CHA2DS2-VASc, HAS-BLED, everything starts false.
    // For exclusive groups, let's select first option or none.
    if (selectedScore.id === 'gcs') {
      // Glasgow defaults to normal:
      // Eye: 4 (espontanea), Verbal: 5 (orientado), Motor: 6 (obedece), Pupil: 0 (reage)
      initialSelections['eye_4'] = true;
      initialSelections['verbal_5'] = true;
      initialSelections['motor_6'] = true;
      initialSelections['pupil_0'] = true;
    } else if (selectedScore.id === 'child_pugh') {
      // Child-Pugh defaults:
      // Encephalopathy: 1 (none), Ascite: 1 (none), Bilirrubina: 1 (<2), Albumina: 1 (>3.5), INR: 1 (<1.7)
      initialSelections['child_enceph_none'] = true;
      initialSelections['child_ascit_none'] = true;
      initialSelections['child_bili_1'] = true;
      initialSelections['child_alb_1'] = true;
      initialSelections['child_inr_1'] = true;
    } else if (selectedScore.id === 'rass') {
      // RASS defaults to alert and calm (0)
      initialSelections['rass_0'] = true;
    }
    
    setSelectedQuestions(initialSelections);
    setSaveSuccess(false);
  }, [selectedScore]);

  // Is this score category exclusive?
  const isExclusiveCategory = (scoreId: string) => {
    return scoreId === 'gcs' || scoreId === 'child_pugh' || scoreId === 'rass';
  };

  const handleToggleQuestion = (categoryId: string, questionId: string) => {
    const isExclusive = isExclusiveCategory(selectedScore.id);
    
    if (isExclusive) {
      // In exclusive models (GCS or Child-Pugh), clicking an option
      // must uncheck other options in the *same* category.
      const categoryObj = selectedScore.categories.find(cat => cat.title === categoryId);
      if (!categoryObj) return;

      const updated = { ...selectedQuestions };
      // Turn off all other questions in this category
      categoryObj.questions.forEach((q) => {
        updated[q.id] = q.id === questionId;
      });
      setSelectedQuestions(updated);
    } else {
      // Simple checklists: simple toggle
      setSelectedQuestions(prev => ({
        ...prev,
        [questionId]: !prev[questionId]
      }));
    }
  };

  // Calculate current point totals
  const computeTotalScore = () => {
    let sum = 0;
    selectedScore.categories.forEach((cat) => {
      cat.questions.forEach((q) => {
        if (selectedQuestions[q.id]) {
          sum += q.points;
        }
      });
    });
    return sum;
  };

  // Find active interpretation
  const getInterpretation = (total: number) => {
    const sorted = [...selectedScore.interpretations];
    const match = sorted.find(interp => total >= interp.min && total <= interp.max);
    return match || { title: 'Não estratificado', class: 'medium' as const, action: 'Rever critérios preenchidos.' };
  };

  // UI styling based on severity class
  const getSeverityBadgeClass = (severityClass: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severityClass) {
      case 'low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSeverityBgColor = (severityClass: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severityClass) {
      case 'low':
        return 'bg-emerald-500';
      case 'medium':
        return 'bg-amber-500';
      case 'high':
        return 'bg-orange-500';
      case 'critical':
        return 'bg-rose-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleReset = () => {
    // Reset selected questions based on defaults
    const initialSelections: Record<string, boolean> = {};
    if (selectedScore.id === 'gcs') {
      initialSelections['eye_4'] = true;
      initialSelections['verbal_5'] = true;
      initialSelections['motor_6'] = true;
      initialSelections['pupil_0'] = true;
    } else if (selectedScore.id === 'child_pugh') {
      initialSelections['child_enceph_none'] = true;
      initialSelections['child_ascit_none'] = true;
      initialSelections['child_bili_1'] = true;
      initialSelections['child_alb_1'] = true;
      initialSelections['child_inr_1'] = true;
    } else if (selectedScore.id === 'rass') {
      initialSelections['rass_0'] = true;
    }
    setSelectedQuestions(initialSelections);
  };

  const saveScoreToHistory = () => {
    const total = computeTotalScore();
    const interp = getInterpretation(total);

    // List checked options to keep as summary details
    const selectedLabels: string[] = [];
    selectedScore.categories.forEach((cat) => {
      cat.questions.forEach((q) => {
        if (selectedQuestions[q.id] && q.points !== 0) {
          selectedLabels.push(`${q.text.split('(')[0].trim()}`);
        }
      });
    });

    onAddHistory({
      title: `Escore: ${selectedScore.name}`,
      description: `Estratificação clínica realizada`,
      inputs: {
        'Fatores Selecionados': selectedLabels.length > 0 ? selectedLabels.join(', ') : 'Nenhum sintoma relevante',
        'Pontuação Total': `${total} pontos`
      },
      outputs: {
        'Resultado Médio': interp.title,
        'Conduta Proposta': interp.action
      }
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const activePoints = computeTotalScore();
  const evaluation = getInterpretation(activePoints);

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Core Question Layout Form - 7 columns */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
                  Critérios de Estratificação
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{selectedScore.name}</h3>
              </div>
              <button
                id="reset-score-btn"
                onClick={handleReset}
                className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition"
                title="Limpar seleções"
              >
                <RotateCcw className="w-4.5 h-4.5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-6 italic leading-relaxed">
              {selectedScore.description}
            </p>

            {/* Questions loop */}
            <div className="space-y-6">
              {selectedScore.categories.map((category) => (
                <div key={category.title} className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {category.title}
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {category.questions.map((question) => {
                      const isChecked = !!selectedQuestions[question.id];
                      const isExclusive = isExclusiveCategory(selectedScore.id);
                      return (
                        <button
                          key={question.id}
                          id={`question-${question.id}`}
                          onClick={() => handleToggleQuestion(category.title, question.id)}
                          className={`w-full flex items-center justify-between text-left p-3.5 rounded-xl border text-sm transition-all duration-150 ${
                            isChecked 
                              ? 'bg-blue-50/50 border-blue-300 text-blue-900 font-semibold' 
                              : 'border-gray-200 bg-white hover:bg-blue-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Circle radio or square checkbox */}
                            <div className={`w-5 h-5 shrink-0 flex items-center justify-center border transition-all ${
                              isChecked 
                                ? 'bg-blue-600 border-blue-600 text-white shadow shadow-blue-200' 
                                : 'border-gray-300 bg-white'
                            } ${isExclusive ? 'rounded-full' : 'rounded-md'}`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="leading-snug text-xs">{question.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating live score summary - 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0f172a] rounded-2xl shadow-xl overflow-hidden border border-slate-800 sticky top-4">
            
            <div className="p-6 text-center text-white bg-radial-gradient from-slate-900 to-slate-950 border-b border-slate-800">
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 font-mono">
                TOTAL COMPUTADO
              </span>
              
              {/* Point circle display */}
              <div className="relative inline-flex items-center justify-center w-28 h-28 my-4">
                <div className={`absolute inset-0 rounded-full opacity-10 animate-pulse ${getSeverityBgColor(evaluation.class)}`} />
                <div className="text-center">
                  <span className="text-5xl font-black font-mono tracking-tight text-white block">
                    {activePoints}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold font-sans">
                    {activePoints === 1 ? 'ponto' : 'pontos'}
                  </span>
                </div>
              </div>

              {/* Dynamic recommendation alert */}
              <div className={`mt-2 py-2 px-4 rounded-full border text-xs font-bold inline-block ${getSeverityBadgeClass(evaluation.class)}`}>
                {evaluation.title}
              </div>
            </div>

            {/* Recommendations detail panel */}
            <div className="p-6 bg-slate-900 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold font-mono">
                  Conduta Clinica Proposta
                </span>
                <p className="text-white text-xs leading-relaxed font-sans bg-slate-950 p-4 rounded-xl border border-slate-850/80">
                  {evaluation.action}
                </p>
              </div>

              {/* Bibliographic reference citation */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
                <div className="flex gap-1.5 text-[10px] text-slate-400 italic bg-slate-950/40 p-2.5 rounded-lg">
                  <BookOpen className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{selectedScore.reference}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
