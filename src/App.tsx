/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Activity, 
  Stethoscope, 
  Calculator, 
  ShieldAlert, 
  BookOpen, 
  Search, 
  ChevronRight,
  Info,
  Sparkles,
  ArrowRight,
  PanelLeftOpen,
  PanelLeftClose
} from 'lucide-react';
import { CargoCategory } from './types';
import Navigation from './components/Navigation';
import InfusionCalculator from './components/InfusionCalculator';
import GeneralCalculators from './components/GeneralCalculators';
import ScoreCalculator from './components/ScoreCalculator';
import ReferenceGuides from './components/ReferenceGuides';

export default function App() {
  const [currentTab, setTab] = useState<CargoCategory | 'dashboard'>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // States for sub-preset selections from Sidebar menu
  const [selectedDrugId, setSelectedDrugId] = useState<string>('noradrenaline');
  const [activeCalc, setActiveCalc] = useState<string>('tfg');
  const [selectedScoreId, setSelectedScoreId] = useState<string>('gcs');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // No-op history handler to keep compatibility with children props without breaking types
  const addHistoryItem = () => {
    // History is disabled per user request
  };

  // Search shortcuts inside the clinical portal
  const toolsMenu = [
    { title: 'Calculadora de Noradrenalina', category: 'infusion', searchKeywords: ['nora', 'noradrenalina', 'vasoativo', 'choque'] },
    { title: 'Dosagem de Dobutamina', category: 'infusion', searchKeywords: ['dobuta', 'dobutamina', 'inotropico', 'ic', 'cardiologia'] },
    { title: 'Sedação com Propofol', category: 'infusion', searchKeywords: ['propofol', 'sedacao', 'uti', 'ventilacao'] },
    { title: 'Clearence de Creatinina (TFG CKD-EPI)', category: 'calculator', searchKeywords: ['tfg', 'rim', 'creatinina', 'cockcroft', 'ckd', 'nefro'] },
    { title: 'Índice de Massa Corporal (IMC / BSA)', category: 'calculator', searchKeywords: ['imc', 'peso', 'altura', 'bsa', 'antropometria'] },
    { title: 'Parkland para Grande Queimado', category: 'calculator', searchKeywords: ['queimado', 'parkland', 'soro', 'hidratacao', 'emergencia'] },
    { title: 'Escore de Coma de Glasgow (GCS)', category: 'score', searchKeywords: ['glasgow', 'coma', 'neurologia', 'trauma', 'gcs'] },
    { title: 'Gravidade Pneumonia (CURB-65)', category: 'score', searchKeywords: ['curb', 'pneumonia', 'pac', 'infecto', 'gravidade'] },
    { title: 'Escores de Wells para Embolia (TEP/TVP)', category: 'score', searchKeywords: ['wells', 'tep', 'tvp', 'trombo', 'pulmao', 'embolia'] },
    { title: 'Perfil FA (CHA₂DS₂-VASc e HAS-BLED)', category: 'score', searchKeywords: ['fa', 'fibrilacao', 'avc', 'sangramento', 'hasbled', 'chads'] },
    { title: 'Classe de Child-Pugh Hepática', category: 'score', searchKeywords: ['child', 'pugh', 'cirrose', 'figado', 'hepatite', 'ascite'] },
    { title: 'Cálculo e Correção de Sódio (Adrogué-Madias)', category: 'calculator', searchKeywords: ['sodio', 'sódio', 'natremia', 'hiponatremia', 'hipernatremia', 'adrogue', 'madias', 'mecanic', 'eletrolitos'] },
    { title: 'Peso Predito e Ventilação Protetora (PBW)', category: 'calculator', searchKeywords: ['ventilacao', 'pbw', 'altura', 'peso', 'corrente', 'fisiologico', 'sara', 'pulmao'] },
    { title: 'Controle Glicêmico Intensivo (CGI)', category: 'calculator', searchKeywords: ['insulina', 'glicemia', 'glicemico', 'cgi', 'hgt', 'regular', 'controle', 'diabetes'] },
    { title: 'Heparinização Venosa (HNF) de Raschke', category: 'calculator', searchKeywords: ['heparina', 'hnf', 'coagulacao', 'ttpa', 'anticoagulacao', 'raschke', 'embolia', 'trombose'] },
    { title: 'Ajuste Renal de Antibióticos', category: 'reference', searchKeywords: ['antibiotico', 'renal', 'rim', 'vancomicina', 'meropenem', 'tazocin'] },
    { title: 'Guia de Ventilação Mecânica Protetora', category: 'reference', searchKeywords: ['ventilacao', 'pulmao', 'tubo', 'peep', 'mecânica', 'sara'] }
  ];

  const searchResults = searchQuery.trim() 
    ? toolsMenu.filter(tool => 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.searchKeywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800 antialiased font-sans">
      
      {/* Sidebar Navigation */}
      <Navigation 
        currentTab={currentTab} 
        setTab={setTab} 
        selectedDrugId={selectedDrugId}
        setSelectedDrugId={setSelectedDrugId}
        activeCalc={activeCalc}
        setActiveCalc={setActiveCalc}
        selectedScoreId={selectedScoreId}
        setSelectedScoreId={setSelectedScoreId}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
        
        {/* Top bar with Search bar */}
        <div className="bg-white border-b border-gray-200 py-3.5 px-6 hidden md:flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                title="Exibir menu lateral"
                className="p-1.5 rounded-lg bg-slate-50 border border-gray-200 text-gray-600 hover:text-blue-600 hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                <PanelLeftOpen className="w-5 h-5 text-gray-700 hover:text-blue-600" />
                <span className="text-xs font-black font-sans text-blue-900 pr-1">SallesMED PRO</span>
              </button>
            )}
            <div className="relative w-80 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              id="topbar-search"
              type="text"
              placeholder="Pesquisar calculadoras ou escores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm text-gray-950 font-medium bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150"
            />
            
            {/* Search autocomplete preview card */}
            {searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto z-50 p-2 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block px-3 py-1 bg-gray-50 rounded">
                  Atalhos Encontrados ({searchResults.length})
                </span>
                {searchResults.length === 0 ? (
                  <p className="text-xs text-gray-500 p-3 italic">Nenhum atalho clínico correspondente.</p>
                ) : (
                  searchResults.map((tool, idx) => (
                    <button
                      key={idx}
                      id={`search-res-${idx}`}
                      onClick={() => {
                        setTab(tool.category as any);
                        setSearchQuery('');
                      }}
                      className="w-full text-left font-sans font-semibold text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 p-2.5 rounded-lg transition-all duration-150 flex items-center justify-between"
                    >
                      <span>{tool.title}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          </div>
        </div>

        {/* Dynamic content view pages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          
          {currentTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Giant Clinical Welcome Hero banner */}
              <div className="relative overflow-hidden rounded-2xl bg-[#0f172a] text-white p-8 md:p-10 border border-slate-800 shadow-xl">
                
                {/* Decorative medical pulses */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute bottom-0 left-10 w-60 h-60 rounded-full bg-teal-500/5 blur-3xl animate-pulse" />

                <div className="relative z-10 max-w-3xl space-y-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-black uppercase tracking-wider border border-blue-500/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      SallesMED PRO
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans leading-none">
                    Central de Apoio Clínico de Terapia Intensiva
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed md:text-base font-medium">
                    Plataforma unificada para o cálculo de bombas de infusão contínua em UTI, escores de gravidade, ferramentas e diretrizes médicas para suporte clínico.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <button
                      id="hero-goto-infusion"
                      onClick={() => setTab('infusion')}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-tight shadow-md shadow-blue-950/20 flex items-center gap-2 transition duration-200"
                    >
                      <Stethoscope className="w-4.5 h-4.5" />
                      Calculadora de Infusão
                    </button>
                    <button
                      id="hero-goto-scores"
                      onClick={() => setTab('score')}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm tracking-tight shadow-md border border-slate-700 flex items-center gap-2 transition duration-200"
                    >
                      <ShieldAlert className="w-4.5 h-4.5" />
                      Escores de Risco
                    </button>
                  </div>
                </div>
              </div>

              {/* Module cards grid */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono block pl-1">
                  Módulos de Trabalho Rápidos
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Module 1 */}
                  <button
                    id="dash-card-infusion"
                    onClick={() => setTab('infusion')}
                    className="w-full text-left p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm transition hover:scale-102 flex flex-col justify-between items-start h-52 group"
                  >
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all w-fit">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-snug font-sans text-md group-hover:text-blue-600 transition-colors">Medicamentos / Infusões</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-3">
                        Controle e calculadora de infusão reversa (mcg/kg/min para mL/h) agrupada por classes com receitas clínicas prontas de preparação rápida.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-blue-600 flex items-center gap-1 mt-2">
                      Acessar Calculadora <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  {/* Module 2 */}
                  <button
                    id="dash-card-calculators"
                    onClick={() => setTab('calculator')}
                    className="w-full text-left p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm transition hover:scale-102 flex flex-col justify-between items-start h-52 group"
                  >
                    <div className="p-2.5 rounded-xl bg-sky-50 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all w-fit">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-snug font-sans text-md group-hover:text-sky-600 transition-colors">Calculadoras Gerais</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-3">
                        Calibração de Heparina HNF, Controle Glicêmico (CGI), Sódio, Clm de Creatinina e Ventilação Mecânica (PBW).
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-sky-500 flex items-center gap-1 mt-2">
                      Acessar Biblioteca <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  {/* Module 3 */}
                  <button
                    id="dash-card-scores"
                    onClick={() => setTab('score')}
                    className="w-full text-left p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm transition hover:scale-102 flex flex-col justify-between items-start h-52 group"
                  >
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all w-fit">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-snug font-sans text-md group-hover:text-amber-600 transition-colors">Escores de Decisão</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-3">
                        Glasgow coma, RASS, CURB-65 pneumonia, Wells TEP/TVP, CHA₂DS₂-VASc para estratificação de risco.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-500 flex items-center gap-1 mt-2">
                      Estratificar Risco <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  {/* Module 4 */}
                  <button
                    id="dash-card-references"
                    onClick={() => setTab('reference')}
                    className="w-full text-left p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm transition hover:scale-102 flex flex-col justify-between items-start h-52 group"
                  >
                    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all w-fit">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-snug font-sans text-md group-hover:text-indigo-600 transition-colors">Materiais Rápidos</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-3">
                        Ajuste de doses renais de antibióticos comuns, guias de gasometria, eletrólitos e parâmetros protetores.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-500 flex items-center gap-1 mt-2">
                      Consultar Guias <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                </div>
              </div>

              {/* Informational warning notes banner */}
              <div className="bg-orange-50 border border-orange-200 p-5 rounded-2xl text-xs leading-relaxed text-orange-850 flex gap-3.5 select-none items-start">
                <Info className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase block text-sm">TERMO DE USO E RESPONSABILIDADE MÉDICA (AVISO LEGAL):</span>
                  <p className="mt-1 font-medium font-sans">
                    Este software e suas calculadoras clínicas são fornecidos puramente como ferramentas adicionais de apoio e conferência rápida. O SallesMED PRO não substitui sob nenhuma circunstância o raciocínio médico individualizado ou as condutas assistenciais hospitalares oficiais. Sempre confirme as diluições e volumes calculados antes do início de qualquer infusão vasoativa contínua.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'infusion' && (
            <InfusionCalculator 
              onAddHistory={addHistoryItem} 
              selectedDrugId={selectedDrugId} 
              setSelectedDrugId={setSelectedDrugId} 
            />
          )}
          {currentTab === 'calculator' && (
            <GeneralCalculators 
              onAddHistory={addHistoryItem} 
              activeCalc={activeCalc as any}
              setActiveCalc={setActiveCalc}
            />
          )}
          {currentTab === 'score' && (
            <ScoreCalculator 
              onAddHistory={addHistoryItem} 
              selectedScoreId={selectedScoreId}
              setSelectedScoreId={setSelectedScoreId}
            />
          )}
          {currentTab === 'reference' && <ReferenceGuides />}

        </div>
      </main>

    </div>
  );
}
