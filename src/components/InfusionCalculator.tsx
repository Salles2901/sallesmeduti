// src/components/InfusionCalculator.tsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Minus, 
  Info, 
  AlertTriangle, 
  Sliders, 
  ArrowRightLeft, 
  Database, 
  Stethoscope, 
  Scale,
  Gauge
} from 'lucide-react';
import { DrugConfig, CalculationHistoryItem } from '../types';
import { INITIAL_DRUGS } from '../data/drugs';

interface InfusionCalculatorProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  selectedDrugId?: string;
  setSelectedDrugId?: (id: string) => void;
}

export default function InfusionCalculator({ 
  onAddHistory,
  selectedDrugId: propSelectedDrugId,
  setSelectedDrugId: propSetSelectedDrugId
}: InfusionCalculatorProps) {
  // Available drugs
  const [drugs] = useState<DrugConfig[]>(INITIAL_DRUGS);
  const [localSelectedDrugId, setLocalSelectedDrugId] = useState<string>(INITIAL_DRUGS[0].id);

  const currentSelectedDrugId = propSelectedDrugId ?? localSelectedDrugId;
  const selectedDrug = drugs.find(d => d.id === currentSelectedDrugId) ?? drugs[0];

  // Main client weight parameter
  const [weight, setWeight] = useState<number>(70);

  // Custom preparations parameters (preloaded with selected drug standard configuration)
  const [ampoules, setAmpoules] = useState<number>(selectedDrug.ampoules);
  const [mgPerAmpoule, setMgPerAmpoule] = useState<number>(selectedDrug.mgPerAmpoule);
  const [mlPerAmpoule, setMlPerAmpoule] = useState<number>(selectedDrug.mlPerAmpoule);
  const [diluentVolume, setDiluentVolume] = useState<number>(selectedDrug.diluentVolume);

  // Calculated Concentration
  const [totalVolume, setTotalVolume] = useState<number>(selectedDrug.totalVolume);
  const [totalDrugMg, setTotalDrugMg] = useState<number>(selectedDrug.totalDrugMg);
  const [concentrationMcgMl, setConcentrationMcgMl] = useState<number>(selectedDrug.concentrationMcgMl);

  // Active inputs
  const [rateMlH, setRateMlH] = useState<string>('5');
  const [clinicalDose, setClinicalDose] = useState<string>('0.1');
  const [lastUpdatedField, setLastUpdatedField] = useState<'rate' | 'dose'>('dose');

  // Update preparations parameters when a new drug is selected from the sidebar
  useEffect(() => {
    if (selectedDrug) {
      setAmpoules(selectedDrug.ampoules);
      setMgPerAmpoule(selectedDrug.mgPerAmpoule);
      setMlPerAmpoule(selectedDrug.mlPerAmpoule);
      setDiluentVolume(selectedDrug.diluentVolume);
      
      // Set initial values for dose & rate according to the drug defaults
      if (selectedDrug.id === 'insulin') {
        setClinicalDose('2'); // 2 UI/h
        setRateMlH('2');
      } else if (selectedDrug.id === 'vasopressin') {
        setClinicalDose('0.01'); // 0.01 U/min
        setRateMlH('3');
      } else if (selectedDrug.id === 'fentanyl') {
        setClinicalDose('1.5'); // 1.5 mcg/kg/h
        setRateMlH('10.5');
      } else if (selectedDrug.id === 'midazolam') {
        setClinicalDose('0.05'); // 0.05 mg/kg/h
        setRateMlH('3.5');
      } else if (selectedDrug.id === 'amiodarone') {
        setClinicalDose('37.5'); // 37.5 mg/h (standard)
        setRateMlH('31.2');
      } else if (selectedDrug.id === 'nitroglycerine') {
        setClinicalDose('20'); // 20 mcg/min
        setRateMlH('6');
      } else {
        setClinicalDose('0.1'); // 0.1 mcg/kg/min
        setRateMlH('6.5');
      }
      setLastUpdatedField('dose');
    }
  }, [selectedDrug.id]);

  // Load preset dilution
  const handleLoadRecipe = (recipe: typeof selectedDrug.standardRecipies[0]) => {
    setAmpoules(recipe.ampoules);
    setMgPerAmpoule(recipe.mgPerAmpoule);
    setMlPerAmpoule(recipe.mlPerAmpoule);
    setDiluentVolume(recipe.diluentVolume);
  };

  // Compute calculated values when components change
  useEffect(() => {
    const totalVol = (ampoules * mlPerAmpoule) + diluentVolume;
    const drugMg = ampoules * mgPerAmpoule;
    // Concentration in mcg / mL
    const conc = totalVol > 0 ? (drugMg * 1000) / totalVol : 0;

    setTotalVolume(totalVol);
    setTotalDrugMg(drugMg);
    setConcentrationMcgMl(conc);
  }, [ampoules, mgPerAmpoule, mlPerAmpoule, diluentVolume]);

  // Recalculate parameters when Concentration, Weight, Clinical Dose or mL/h Rate change
  useEffect(() => {
    const conc = concentrationMcgMl;
    const w = weight > 0 ? weight : 70;
    const unit = selectedDrug.defaultDoseUnit;

    if (conc <= 0) return;

    if (lastUpdatedField === 'dose') {
      const doseVal = parseFloat(clinicalDose);
      if (!isNaN(doseVal) && doseVal >= 0) {
        let calculatedRate = 0;

        if (unit === 'mcg/kg/min') {
          // Rate (ml/h) = (Dose * Weight * 60) / Conc
          calculatedRate = (doseVal * w * 60) / conc;
        } else if (unit === 'mcg/kg/h') {
          // Rate (ml/h) = (Dose * Weight) / Conc
          calculatedRate = (doseVal * w) / conc;
        } else if (unit === 'mg/kg/h') {
          // Rate (ml/h) = (Dose * Weight) / (Conc / 1000)
          calculatedRate = (doseVal * w) / (conc / 1000);
        } else if (unit === 'mcg/min') {
          // Rate (ml/h) = (Dose * 60) / Conc
          calculatedRate = (doseVal * 60) / conc;
        } else if (unit === 'mg/h') {
          // Rate (ml/h) = Dose / (Conc / 1000)
          calculatedRate = doseVal / (conc / 1000);
        } else if (unit === 'UI/h') {
          // Rate (ml/h) = Dose / (Conc / 1000 because DrugMg was UI, meaning conc is UI/mL)
          calculatedRate = doseVal / (conc / 1000); 
        } else if (unit === 'U/min') {
          // Rate (ml/h) = (Dose * 60) / (Conc / 1000)
          calculatedRate = (doseVal * 60) / (conc / 1000);
        }

        const formatted = calculatedRate.toFixed(1);
        if (parseFloat(rateMlH).toFixed(1) !== formatted && !isNaN(calculatedRate)) {
          setRateMlH(formatted);
        }
      }
    } else if (lastUpdatedField === 'rate') {
      const rateVal = parseFloat(rateMlH);
      if (!isNaN(rateVal) && rateVal >= 0) {
        let calculatedDose = 0;

        if (unit === 'mcg/kg/min') {
          // Dose = (Rate * Conc) / (Weight * 60)
          calculatedDose = (rateVal * conc) / (w * 60);
        } else if (unit === 'mcg/kg/h') {
          // Dose = (Rate * Conc) / Weight
          calculatedDose = (rateVal * conc) / w;
        } else if (unit === 'mg/kg/h') {
          // Dose = (Rate * (Conc / 1000)) / Weight
          calculatedDose = (rateVal * (conc / 1000)) / w;
        } else if (unit === 'mcg/min') {
          // Dose = (Rate * Conc) / 60
          calculatedDose = (rateVal * conc) / 60;
        } else if (unit === 'mg/h') {
          // Dose = Rate * (Conc / 1000)
          calculatedDose = rateVal * (conc / 1000);
        } else if (unit === 'UI/h') {
          // Dose = Rate * (Conc / 1000)
          calculatedDose = rateVal * (conc / 1000);
        } else if (unit === 'U/min') {
          // Dose = (Rate * (Conc / 1000)) / 60
          calculatedDose = (rateVal * (conc / 1000)) / 60;
        }

        const formatted = calculatedDose.toFixed(3);
        if (parseFloat(clinicalDose).toFixed(3) !== formatted && !isNaN(calculatedDose)) {
          // For display purposes, format beautifully
          let displayDecimals = 2;
          if (calculatedDose < 0.1) displayDecimals = 3;
          if (calculatedDose >= 10) displayDecimals = 1;
          setClinicalDose(calculatedDose.toFixed(displayDecimals));
        }
      }
    }
  }, [concentrationMcgMl, weight, clinicalDose, rateMlH, lastUpdatedField, selectedDrug]);

  const handleRateChange = (valStr: string) => {
    const cleanStr = valStr.replace(',', '.');
    setRateMlH(cleanStr);
    setLastUpdatedField('rate');
  };

  const handleDoseChange = (valStr: string) => {
    const cleanStr = valStr.replace(',', '.');
    setClinicalDose(cleanStr);
    setLastUpdatedField('dose');
  };

  const handleApplyPresetDose = (doseVal: number) => {
    setClinicalDose(String(doseVal));
    setLastUpdatedField('dose');
  };

  // Safety checks vs drug boundaries
  const parsedDose = parseFloat(clinicalDose);
  const isDoseHigh = !isNaN(parsedDose) && parsedDose > selectedDrug.maxStandardDose;
  const isDoseLow = !isNaN(parsedDose) && parsedDose < selectedDrug.minStandardDose && parsedDose > 0;

  return (
    <div className="space-y-6">
      {/* Search Header Info (Displays selected drug info dynamically) */}
      <div className="bg-[#1e293b] text-white p-6 rounded-2xl shadow-md border border-slate-700 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <span className="px-2.5 py-1 text-[10px] uppercase font-mono font-black tracking-widest rounded bg-blue-600/20 text-blue-300 border border-blue-600/30 inline-block">
              Módulo de Emergência / CTI
            </span>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
                  Infusão de {selectedDrug.name}
                </h2>
                <p className="text-blue-300 text-[10px] sm:text-xs font-semibold font-mono mt-0.5 uppercase tracking-wider">
                  {selectedDrug.chemicalName} • {
                    selectedDrug.category === 'vasoactive' || selectedDrug.category === 'inotope' || selectedDrug.category === 'antihypertensive'
                      ? 'Suporte Vasoativo' 
                      : selectedDrug.category === 'sedative' 
                        ? 'Sedativo / Analgésico' 
                        : selectedDrug.category === 'neuroblocker'
                          ? 'Bloqueador Neuromuscular'
                          : 'Controle Metabólico / Outro'
                  }
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Diluição e infusão contínua ajustável em tempo real. Altere o peso do paciente, aplique diretrizes oficiais ou defina parâmetros de ampola customizados.
            </p>
          </div>
          
          <div className="bg-slate-800/80 px-5 py-3 rounded-xl border border-slate-700/60 text-center lg:shrink-0 self-start lg:self-center w-full lg:w-auto">
            <span className="text-[10px] uppercase font-bold text-blue-400 font-mono tracking-wider">Metas Clínicas Alvo</span>
            <p className="text-xl font-black text-white mt-1">
              {selectedDrug.minStandardDose} a {selectedDrug.maxStandardDose}
            </p>
            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{selectedDrug.defaultDoseUnit}</span>
          </div>
        </div>
      </div>

      {/* Main Core Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Weight, Recipes, Dilution Parameters (5 columns wide) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 1: WEIGHT (Peso do Paciente) */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-950 uppercase tracking-wider">
                  Peso do Paciente
                </h3>
                <p className="text-[11px] text-gray-500">Parâmetro essencial para dosagens ponderais</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 justify-center w-full sm:w-auto">
                <button
                  type="button"
                  id="weight-minus-btn"
                  onClick={() => setWeight(prev => Math.max(1, prev - 5))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-250 hover:bg-gray-100 text-slate-700 active:scale-95 text-md font-bold transition select-none shadow-xs"
                >
                  -
                </button>
                <div className="relative">
                  <input
                    id="weight-input-field"
                    type="number"
                    value={weight || ''}
                    onChange={(e) => setWeight(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-20 text-center h-10 text-md font-mono font-bold text-slate-900 bg-white border border-gray-250 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 font-bold font-mono pointer-events-none">kg</span>
                </div>
                <button
                  type="button"
                  id="weight-plus-btn"
                  onClick={() => setWeight(prev => Math.min(300, prev + 5))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-250 hover:bg-gray-100 text-slate-700 active:scale-95 text-md font-bold transition select-none shadow-xs"
                >
                  +
                </button>
              </div>

              <div className="text-center sm:text-right shrink-0">
                <span className="block text-[9px] font-bold text-slate-400 font-mono tracking-wider uppercase">Fator de Cálculo</span>
                <span className="text-lg font-mono font-extrabold text-blue-600">
                  {weight} <span className="text-xs font-normal text-slate-500">kg</span>
                </span>
              </div>
            </div>

            {/* Quick Weight Select Pager */}
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-1.5">
              {[50, 60, 70, 80, 90, 100, 110, 120].map((w) => (
                <button
                  type="button"
                  key={w}
                  id={`weight-shortcut-${w}`}
                  onClick={() => setWeight(w)}
                  className={`py-2 text-xs font-bold rounded-lg border transition active:scale-95 ${
                    weight === w
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm font-extrabold'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {w}kg
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: RECIPES (Receitas Clínicas Padrão) */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-950 uppercase tracking-wider">
                  Receitas Clínicas Padrão
                </h3>
                <p className="text-[11px] text-gray-500">Fórmulas preconizadas de acordo com diretrizes de CTI</p>
              </div>
            </div>

            {selectedDrug.standardRecipies.length > 0 ? (
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {selectedDrug.standardRecipies.map((recipe, index) => {
                  const isActive = 
                    ampoules === recipe.ampoules && 
                    mgPerAmpoule === recipe.mgPerAmpoule && 
                    mlPerAmpoule === recipe.mlPerAmpoule && 
                    diluentVolume === recipe.diluentVolume;

                  return (
                    <button
                      key={index}
                      type="button"
                      id={`recipe-preset-item-${index}`}
                      onClick={() => handleLoadRecipe(recipe)}
                      className={`w-full text-left p-3 rounded-xl border transition duration-150 active:scale-98 ${
                        isActive 
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-900 shadow-xs' 
                          : 'border-gray-200 bg-white hover:bg-indigo-50/20 hover:border-indigo-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-extrabold ${isActive ? 'text-indigo-950' : 'text-gray-800'}`}>
                          {recipe.name}
                        </span>
                        {isActive && (
                          <span className="text-[9px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                            Ativo
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1 leading-normal font-sans font-medium">
                        {recipe.ampoules} amp. de {recipe.mgPerAmpoule}{selectedDrug.id === 'insulin' ? 'UI' : 'mg'} ({recipe.mlPerAmpoule}mL) + {recipe.diluentVolume}mL de soro/diluente
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-gray-200 text-center">
                <p className="text-xs font-semibold text-gray-500">Preparo exclusivo padronizado</p>
                <p className="text-[10px] text-gray-400 mt-1 leading-normal font-sans">
                  Este fármaco possui diluição e preparo padrão fixo. Use os parâmetros abaixo para customizações adicionais.
                </p>
              </div>
            )}
          </div>

          {/* Card 3: DILUTION PARAMETERS (Parâmetros de Diluição) */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-950 uppercase tracking-wider">
                  Parâmetros de Diluição
                </h3>
                <p className="text-[11px] text-gray-500">Customização fina de volume e massa ativa</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Stepper for Ampoules */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <label htmlFor="ampoules-range">Número de Ampolas</label>
                  <span className="font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md">{ampoules} {ampoules === 1 ? 'ampola' : 'ampolas'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    id="ampoules-minus-btn"
                    disabled={ampoules <= 1}
                    onClick={() => setAmpoules(prev => Math.max(1, prev - 1))}
                    className="w-11 h-11 flex items-center justify-center bg-gray-100 disabled:opacity-40 hover:bg-gray-250 active:scale-95 rounded-lg text-md font-bold text-gray-700 transition"
                  >
                    -
                  </button>
                  <input
                    id="ampoules-range"
                    type="range"
                    min="1"
                    max="20"
                    value={ampoules}
                    onChange={(e) => setAmpoules(parseInt(e.target.value) || 1)}
                    className="flex-1 accent-blue-600 py-2 cursor-pointer h-2 bg-gray-150 rounded"
                  />
                  <button
                    type="button"
                    id="ampoules-plus-btn"
                    onClick={() => setAmpoules(prev => Math.min(50, prev + 1))}
                    className="w-11 h-11 flex items-center justify-center bg-gray-100 hover:bg-gray-250 active:scale-95 rounded-lg text-md font-bold text-gray-700 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Mg and Ml per Ampoule Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block" htmlFor="mg-per-amp-field">
                    {selectedDrug.id === 'insulin' ? 'UI por Ampola' : 'Ativo por Ampola'}
                  </label>
                  <div className="relative">
                    <input
                      id="mg-per-amp-field"
                      type="number"
                      value={mgPerAmpoule || ''}
                      onChange={(e) => setMgPerAmpoule(parseFloat(e.target.value) || 0)}
                      className="w-full text-sm font-mono font-bold text-gray-900 bg-white border border-gray-300 rounded-xl p-2.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-extrabold font-mono uppercase">
                      {selectedDrug.id === 'insulin' ? 'UI' : 'mg'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block" htmlFor="ml-per-amp-field">
                    Volume por Ampola
                  </label>
                  <div className="relative">
                    <input
                      id="ml-per-amp-field"
                      type="number"
                      value={mlPerAmpoule || ''}
                      disabled={selectedDrug.id === 'propofol'}
                      onChange={(e) => setMlPerAmpoule(parseFloat(e.target.value) || 0)}
                      className="w-full text-sm font-mono font-bold text-gray-900 bg-white border border-gray-300 rounded-xl p-2.5 disabled:bg-gray-100 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-extrabold font-mono uppercase">mL</span>
                  </div>
                </div>
              </div>

              {/* Diluent Volume Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block" htmlFor="diluent-volume-field">
                  Soro / Diluente Adicionado
                </label>
                <div className="relative">
                  <input
                    id="diluent-volume-field"
                    type="number"
                    value={diluentVolume || '0'}
                    onChange={(e) => setDiluentVolume(parseFloat(e.target.value) || 0)}
                    className="w-full text-sm font-mono font-bold text-gray-900 bg-white border border-gray-300 rounded-xl p-2.5 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Ex: 250"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-extrabold font-mono uppercase">mL</span>
                </div>
              </div>

              {/* Dilution Summary Badge card */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 space-y-3 shadow-2xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 block font-mono">
                  Solução Resultante Calculada
                </span>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500 block leading-none font-medium mb-0.5">Massa do Ativo</span>
                    <strong className="font-extrabold text-slate-850 text-md">
                      {totalDrugMg.toFixed(1)} {selectedDrug.id === 'insulin' ? 'UI' : 'mg'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block leading-none font-medium mb-0.5">Volume Total</span>
                    <strong className="font-extrabold text-slate-850 text-md">
                      {totalVolume.toFixed(1)} mL
                    </strong>
                  </div>
                </div>
                
                <div className="pt-2.5 border-t border-blue-100 flex justify-between items-center">
                  <span className="text-xs text-slate-700 font-bold">Concentração Real:</span>
                  <span className="font-mono text-xs font-black text-blue-700 bg-blue-100 px-3 py-1 rounded-lg">
                    {selectedDrug.id === 'insulin' 
                      ? `${concentrationMcgMl.toFixed(1)} UI/mL`
                      : concentrationMcgMl >= 1000 
                        ? `${(concentrationMcgMl / 1000).toFixed(2)} mg/mL`
                        : `${concentrationMcgMl.toFixed(1)} mcg/mL`
                     }
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Virtual Syringe Infusion Pump and References (7 columns wide) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 4: VIRTUAL INFUSION PUMP */}
          <div className="bg-[#0f172a] rounded-2xl shadow-xl overflow-hidden border border-slate-800 relative">
            <div className="absolute top-0 left-0 bg-blue-600 text-white font-mono text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-br-xl shadow z-10">
              PAINEL DIAL DA BOMBA DE INFUSÃO
            </div>

            {/* Glowing dashboard cockpit main screen */}
            <div className="p-6 md:p-8 pt-12 text-center bg-radial-gradient from-slate-900 to-slate-950 border-b border-slate-800">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>BOMBA SENSORIZADA ATIVA</span>
              </div>

              {/* Dual inputs grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 xl:gap-8 items-stretch max-w-2xl mx-auto py-2 relative">
                
                {/* INTERACTIVE CLINICAL DOSE SLIDER */}
                <div className="space-y-2 bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80 relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider font-mono">Dose Clínica</span>
                      <span className="text-[9px] sm:text-[10px] font-mono bg-slate-800 text-blue-300 px-1.5 py-0.5 rounded">CONVERSOR</span>
                    </div>
                    
                    <div className="flex items-baseline justify-center gap-1.5 my-2">
                      <input
                        id="clinical-dose-input"
                        type="text"
                        className="w-full text-center text-2xl sm:text-3xl xl:text-4xl font-mono font-black tracking-tight text-white bg-transparent border-b-2 border-slate-700/65 focus:border-blue-500 focus:outline-none transition py-1"
                        value={clinicalDose}
                        onChange={(e) => handleDoseChange(e.target.value)}
                      />
                    </div>

                    <p className="text-slate-400 font-mono text-[10px] sm:text-xs font-semibold">
                      {selectedDrug.defaultDoseUnit}
                    </p>
                  </div>

                  <div className="pt-2 flex justify-center gap-1.5 mt-auto">
                    <button
                      type="button"
                      id="dose-step-minus"
                      onClick={() => {
                        const step = selectedDrug.defaultDoseUnit === 'mcg/kg/min' ? 0.05 : 1;
                        setClinicalDose(prev => String(Math.max(0, Number((Number(prev) - step).toFixed(3)))));
                        setLastUpdatedField('dose');
                      }}
                      className="p-1 px-3 bg-slate-800 text-slate-300 active:scale-95 hover:bg-slate-700 rounded text-xs font-bold font-mono transition"
                    >
                      -{selectedDrug.defaultDoseUnit === 'mcg/kg/min' ? '0.05' : '1'}
                    </button>
                    <button
                      type="button"
                      id="dose-step-plus"
                      onClick={() => {
                        const step = selectedDrug.defaultDoseUnit === 'mcg/kg/min' ? 0.05 : 1;
                        setClinicalDose(prev => String(Number((Number(prev) + step).toFixed(3))));
                        setLastUpdatedField('dose');
                      }}
                      className="p-1 px-3 bg-slate-800 text-slate-300 active:scale-95 hover:bg-slate-700 rounded text-xs font-bold font-mono transition"
                    >
                      +{selectedDrug.defaultDoseUnit === 'mcg/kg/min' ? '0.05' : '1'}
                    </button>
                  </div>
                </div>

                {/* Arrow crossover icon */}
                <div className="hidden xl:flex xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2 items-center justify-center pointer-events-none z-10">
                  <div className="p-3 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-950 border-4 border-[#0f172a] transform animate-pulse-subtle">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>
                </div>

                {/* INTERACTIVE RATE SLIDER (mL/hora) */}
                <div className="space-y-2 bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider font-mono">Vazão da Bomba</span>
                      <span className="text-[9px] sm:text-[10px] font-mono bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded">RAZÃO EV</span>
                    </div>

                    <div className="flex items-baseline justify-center gap-1.5 my-2">
                      <input
                        id="rate-mlh-input"
                        type="text"
                        className="w-full text-center text-2xl sm:text-3xl xl:text-4xl font-mono font-black tracking-tight text-emerald-400 bg-transparent border-b-2 border-slate-700 border-dashed focus:border-emerald-500 focus:outline-none transition py-1"
                        value={rateMlH}
                        onChange={(e) => handleRateChange(e.target.value)}
                      />
                    </div>

                    <p className="text-slate-400 font-mono text-[10px] sm:text-xs font-semibold">
                      mL / hora
                    </p>
                  </div>

                  <div className="pt-2 flex justify-center gap-1.5 mt-auto">
                    <button
                      type="button"
                      id="rate-step-minus"
                      onClick={() => {
                        setRateMlH(prev => String(Math.max(0, Number((Number(prev) - 1).toFixed(1)))));
                        setLastUpdatedField('rate');
                      }}
                      className="p-1 px-3 bg-slate-800 text-slate-300 active:scale-95 hover:bg-slate-700 rounded text-xs font-bold font-mono transition"
                    >
                      -1 mL/h
                    </button>
                    <button
                      type="button"
                      id="rate-step-plus"
                      onClick={() => {
                        setRateMlH(prev => String(Number((Number(prev) + 1).toFixed(1))));
                        setLastUpdatedField('rate');
                      }}
                      className="p-1 px-3 bg-slate-800 text-slate-300 active:scale-95 hover:bg-slate-700 rounded text-xs font-bold font-mono transition"
                    >
                      +1 mL/h
                    </button>
                  </div>
                </div>

              </div>

              {/* Safety alerts based on dosage levels */}
              {isDoseHigh && (
                <div className="mt-8 mx-auto max-w-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 p-4 rounded-xl text-xs text-left flex gap-3 items-start animate-fade-in">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wider block">ALERTA CLINICO: DOSAGEM EXCEDENTE!</span>
                    <p className="mt-1 leading-relaxed text-slate-300">A dose ativa de {parsedDose} {selectedDrug.defaultDoseUnit} excede o limite terapêutico padrão comum recomendável de ({selectedDrug.maxStandardDose} {selectedDrug.defaultDoseUnit}). Mantenha vigília constante de sinais hemodinâmicos.</p>
                  </div>
                </div>
              )}

              {isDoseLow && !isNaN(parsedDose) && (
                <div className="mt-8 mx-auto max-w-xl bg-slate-800/80 border border-slate-700 text-slate-300 p-4 rounded-xl text-xs text-left flex gap-3 items-start animate-fade-in">
                  <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wider block text-slate-200">DOSAGEM SUBCLÍNICA / DESMAME</span>
                    <p className="mt-1 leading-relaxed text-slate-450">A dose ativa de {parsedDose} {selectedDrug.defaultDoseUnit} está abaixo das diretrizes convencionais ({selectedDrug.minStandardDose} {selectedDrug.defaultDoseUnit}). Adequado para etapas finais de infusão ou titulação de desmame parcial.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom presets action bar */}
            <div className="p-5 bg-slate-950 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start w-full sm:w-auto">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block w-full text-center sm:text-left mb-1.5 font-mono">
                  Atalhos Rápidos de Titulação
                </span>
                <button
                  type="button"
                  id="preset-min"
                  onClick={() => handleApplyPresetDose(selectedDrug.minStandardDose)}
                  className="bg-slate-800 hover:bg-slate-750 text-white font-mono text-xs px-3.5 py-2 rounded-lg transition active:scale-95"
                >
                  Dose Mínima ({selectedDrug.minStandardDose})
                </button>
                <button
                  type="button"
                  id="preset-mid"
                  onClick={() => handleApplyPresetDose(Number(((selectedDrug.minStandardDose + selectedDrug.maxStandardDose) / 2).toFixed(2)))}
                  className="bg-slate-800 hover:bg-slate-750 text-white font-mono text-xs px-3.5 py-2 rounded-lg transition active:scale-95"
                >
                  Dose Média
                </button>
                <button
                  type="button"
                  id="preset-max"
                  onClick={() => handleApplyPresetDose(selectedDrug.maxStandardDose)}
                  className="bg-slate-800 hover:bg-slate-750 text-blue-300 border border-blue-900/40 hover:border-blue-700/60 font-mono text-xs px-3.5 py-2 rounded-lg transition active:scale-95"
                >
                  Dose Máxima ({selectedDrug.maxStandardDose})
                </button>
              </div>

              {/* Option to record to calculation history is disabled as per current workspace rules */}
            </div>
          </div>

          {/* Card 5: PRACTICAL INFRASTRUCTURE NOTES (Aspectos Práticos) */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h4 className="font-extrabold text-gray-900 border-b border-gray-100 pb-2.5 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Aspectos Práticos e Farmacologia: {selectedDrug.name}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-650 uppercase tracking-wider font-mono block">
                  Cuidados de Enfermagem e Administração
                </span>
                <p className="text-gray-600 leading-relaxed text-xs p-3.5 bg-blue-50/40 rounded-xl border border-blue-100/60 font-medium">
                  {selectedDrug.note}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                  Mecanismo de Ação e Indicações
                </span>
                <p className="text-gray-600 leading-relaxed text-xs p-3.5 bg-slate-50 rounded-xl border border-slate-100 font-medium">
                  {selectedDrug.pharmacology}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
