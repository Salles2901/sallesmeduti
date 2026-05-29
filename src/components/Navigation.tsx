// src/components/Navigation.tsx
import React, { useState } from 'react';
import { 
  Activity, 
  Calculator, 
  ShieldAlert, 
  BookOpen, 
  Menu, 
  X,
  Stethoscope,
  ChevronDown,
  ChevronRight,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowRight
} from 'lucide-react';
import { CargoCategory } from '../types';

interface NavigationProps {
  currentTab: CargoCategory | 'dashboard';
  setTab: (tab: CargoCategory | 'dashboard') => void;
  selectedDrugId?: string;
  setSelectedDrugId?: (id: string) => void;
  activeCalc?: string;
  setActiveCalc?: (calc: any) => void;
  selectedScoreId?: string;
  setSelectedScoreId?: (scoreId: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export default function Navigation({ 
  currentTab, 
  setTab,
  selectedDrugId,
  setSelectedDrugId,
  activeCalc,
  setActiveCalc,
  selectedScoreId,
  setSelectedScoreId,
  sidebarCollapsed,
  setSidebarCollapsed
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');

  const menuItems = [
    { id: 'dashboard' as const, label: 'Painel Geral', icon: Activity },
    { id: 'infusion' as const, label: 'Medicamentos / Infusões', icon: Stethoscope },
    { id: 'calculator' as const, label: 'Calculadoras Gerais', icon: Calculator },
    { id: 'score' as const, label: 'Escores de Decisão', icon: ShieldAlert },
    { id: 'reference' as const, label: 'Materiais Rápidos', icon: BookOpen },
  ];

  // Specific highly subdivided structures for submenus grouped by classes
  const drugSubmenus = [
    {
      group: 'Vasopressores & Inotrópicos',
      items: [
        { id: 'noradrenaline', label: 'Noradrenalina' },
        { id: 'adrenaline', label: 'Adrenalina' },
        { id: 'vasopressin', label: 'Vasopressina' },
        { id: 'dobutamine', label: 'Dobutamina' },
        { id: 'dopamine', label: 'Dopamina' },
        { id: 'milrinone', label: 'Milrinona' },
        { id: 'levosimendan', label: 'Levosimendana' }
      ]
    },
    {
      group: 'Vasodilatadores & anti-hipertensivos',
      items: [
        { id: 'nitroglycerine', label: 'Nitroglicerina (Tridil)' },
        { id: 'nitroprusside', label: 'Nitroprussiato de Sódio' }
      ]
    },
    {
      group: 'Sedação, Analgesia & Neurologia',
      items: [
        { id: 'fentanyl', label: 'Fentanil' },
        { id: 'morphine', label: 'Morfina' },
        { id: 'propofol', label: 'Propofol 1%' },
        { id: 'midazolam', label: 'Midazolam' },
        { id: 'dexmedetomidine', label: 'Dexmedetomidina' },
        { id: 'ketamine', label: 'Cetamina' },
        { id: 'phenytoin', label: 'Fenitoína EV (Ataque)' }
      ]
    },
    {
      group: 'Bloqueadores Neuromusculares',
      items: [
        { id: 'cisatracurium', label: 'Cisatracúrio' },
        { id: 'atracurium', label: 'Atracúrio' },
        { id: 'rocuronium', label: 'Rocurônio' },
        { id: 'pancuronium', label: 'Pancurônio' }
      ]
    },
    {
      group: 'Controle Metabólico & Antiarrítmicos',
      items: [
        { id: 'insulin', label: 'Insulina Regular' },
        { id: 'glycemic_control', label: 'Controle Glicêmico (CGI)' },
        { id: 'polarizing_sol', label: 'Solução Polarizante (Hipercalemia)' },
        { id: 'amiodarone', label: 'Amiodarona' }
      ]
    },
    {
      group: 'Anticoagulação',
      items: [
        { id: 'heparin_infusion', label: 'Heparinização (HNF)' }
      ]
    }
  ];

  const calcSubmenus = [
    {
      group: 'Eletrólitos, Hidratação & Renal',
      items: [
        { id: 'maintenance_fluid', label: 'Dieta Zero / Manutenção' },
        { id: 'sodium_correction', label: 'Cálculo de Sódio (Adrogué)' },
        { id: 'eletrolitos_repo', label: 'Reposição de Potássio & Magnésio' },
        { id: 'insulina_ev', label: 'Controle de Insulina Regular EV' },
        { id: 'bicarbonate', label: 'Déficit de Bicarbonato' },
        { id: 'tfg', label: 'Função Renal (TFG ClCr)' },
        { id: 'furosemide', label: 'Furosemida EV (Congestão)' }
      ]
    },
    {
      group: 'Respiração & Fisiologia',
      items: [
        { id: 'vent_pbw', label: 'Ventilação Mecânica / PBW' },
        { id: 'intubacao_sri', label: 'Intubação em Sequência Rápida (SRI)' },
        { id: 'heparina_infusion', label: 'Heparinização Plena (HNF)' },
        { id: 'transfusao', label: 'Transfusão de Hemoderivados' },
        { id: 'parkland', label: 'Parkland (Queimados)' },
        { id: 'qtc', label: 'Intervalo QTc' },
        { id: 'imc_bsa', label: 'IMC / Superfície Corporal' }
      ]
    }
  ];

  const scoreSubmenus = [
    {
      group: 'Neurologia & Sedação',
      items: [
        { id: 'gcs', label: 'GCS (Glasgow)' },
        { id: 'rass', label: 'RASS (Sedação)' }
      ]
    },
    {
      group: 'Cardiologia & Trombose',
      items: [
        { id: 'wells_tep', label: 'Wells TEP' },
        { id: 'wells_tvp', label: 'Wells TVP' },
        { id: 'cha2ds2vasc', label: 'CHA₂DS₂-VASc' },
        { id: 'hasbled', label: 'HAS-Bled' }
      ]
    },
    {
      group: 'Pneumo & Gastrologia',
      items: [
        { id: 'curb65', label: 'CURB-65 (Pneumonia)' },
        { id: 'child_pugh', label: 'Child-Pugh (Cirrose)' }
      ]
    }
  ];

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    infusion: currentTab === 'infusion',
    calculator: currentTab === 'calculator',
    score: currentTab === 'score'
  });

  // Auto-expand when tab changes externally (e.g. from dashboard quick links)
  React.useEffect(() => {
    if (currentTab === 'infusion' || currentTab === 'calculator' || currentTab === 'score') {
      setExpandedMenus(prev => ({
        ...prev,
        [currentTab]: true
      }));
    }
  }, [currentTab]);

  const handleTabChange = (tabId: CargoCategory | 'dashboard') => {
    setTab(tabId);
    setMobileMenuOpen(false);
  };

  const toggleMenu = (tabId: CargoCategory | 'dashboard') => {
    if (tabId === 'infusion' || tabId === 'calculator' || tabId === 'score') {
      setExpandedMenus(prev => {
        const wasOpen = prev[tabId];
        const targetState = currentTab === tabId ? !wasOpen : true;
        return {
          ...prev,
          [tabId]: targetState
        };
      });
    }
    handleTabChange(tabId);
  };

  const selectDrug = (id: string) => {
    if (setSelectedDrugId) setSelectedDrugId(id);
    handleTabChange('infusion');
    setMobileMenuOpen(false);
  };

  const selectCalc = (id: string) => {
    if (setActiveCalc) setActiveCalc(id);
    handleTabChange('calculator');
    setMobileMenuOpen(false);
  };

  const selectScore = (id: string) => {
    if (setSelectedScoreId) setSelectedScoreId(id);
    handleTabChange('score');
    setMobileMenuOpen(false);
  };

  // Safe checks for filtering submenus via search
  const matchesSearch = (text: string) => text.toLowerCase().includes(sidebarSearch.toLowerCase());

  return (
    <>
      {/* Desktop Sidebar (visible on md+ when not collapsed) */}
      <aside 
        className={`hidden md:flex flex-col bg-white border-r border-[#e5e7eb] h-screen sticky top-0 shrink-0 transition-all duration-300 z-40 shadow-sm ${
          sidebarCollapsed ? 'w-0 overflow-hidden border-r-0' : 'w-80'
        }`}
      >
        {/* Banner Head */}
        <div className="p-5 border-b border-[#e5e7eb] flex items-center justify-between bg-slate-55/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-lg text-white flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-blue-900 tracking-tight font-sans">
                SallesMED PRO
              </h1>
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none mt-0.5">
                Suporte Clínico Avançado
              </p>
            </div>
          </div>
          {/* Collapse sidebar button */}
          <button
            onClick={() => setSidebarCollapsed(true)}
            title="Ocultar menu lateral"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition duration-150"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Search Bar */}
        <div className="p-3 border-b border-gray-100 bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar nos menus..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400"
            />
            {sidebarSearch && (
              <button 
                onClick={() => setSidebarSearch('')} 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-gray-200 hover:bg-gray-300 rounded px-1 text-gray-600"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Navigation links with expandable subdivided submenus - Desktop */}
        <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isTabActive = currentTab === item.id;
            const isExpanded = !!expandedMenus[item.id] || sidebarSearch.trim().length > 0;

            return (
              <div key={item.id} className="space-y-1 mb-2">
                <button
                  id={`nav-${item.id}`}
                  onClick={() => toggleMenu(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 text-left ${
                    isTabActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {/* Chevron indicators */}
                  {(item.id === 'infusion' || item.id === 'calculator' || item.id === 'score') && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Submenus for Medicamentos / Infusões with Groups */}
                {item.id === 'infusion' && isExpanded && (
                  <div className="pl-3.5 pr-1 py-1.5 space-y-3 bg-slate-50/50 rounded-lg border-l-2 border-blue-500/30">
                    {drugSubmenus.map((group, gIdx) => {
                      const matchingItems = group.items.filter(sub => !sidebarSearch || matchesSearch(sub.label));
                      if (matchingItems.length === 0) return null;

                      return (
                        <div key={gIdx} className="space-y-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">
                            {group.group}
                          </span>
                          <div className="space-y-0.5">
                            {matchingItems.map(sub => {
                              const isSubActive = selectedDrugId === sub.id && isTabActive;
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => selectDrug(sub.id)}
                                  className={`w-full text-left py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all duration-150 flex items-center justify-between group/drug ${
                                    isSubActive 
                                      ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600' 
                                      : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                                  }`}
                                >
                                  <span>{sub.label}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover/drug:opacity-100 transition-opacity" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Submenus for Calculadoras Gerais with Groups */}
                {item.id === 'calculator' && isExpanded && (
                  <div className="pl-3.5 pr-1 py-1.5 space-y-3 bg-slate-50/50 rounded-lg border-l-2 border-sky-500/30">
                    {calcSubmenus.map((group, gIdx) => {
                      // Filter items matching the search
                      const matchingItems = group.items.filter(sub => !sidebarSearch || matchesSearch(sub.label));
                      if (matchingItems.length === 0) return null;

                      return (
                        <div key={gIdx} className="space-y-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">
                            {group.group}
                          </span>
                          <div className="space-y-0.5">
                            {matchingItems.map(sub => {
                              const isSubActive = activeCalc === sub.id && isTabActive;
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => selectCalc(sub.id)}
                                  className={`w-full text-left py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all duration-150 flex items-center justify-between group/calc ${
                                    isSubActive 
                                      ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600' 
                                      : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                                  }`}
                                >
                                  <span>{sub.label}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover/calc:opacity-100 transition-opacity" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Submenus for Escores with Groups */}
                {item.id === 'score' && isExpanded && (
                  <div className="pl-3.5 pr-1 py-1.5 space-y-3 bg-slate-50/50 rounded-lg border-l-2 border-amber-500/30">
                    {scoreSubmenus.map((group, gIdx) => {
                      const matchingItems = group.items.filter(sub => !sidebarSearch || matchesSearch(sub.label));
                      if (matchingItems.length === 0) return null;

                      return (
                        <div key={gIdx} className="space-y-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">
                            {group.group}
                          </span>
                          <div className="space-y-0.5">
                            {matchingItems.map(sub => {
                              const isSubActive = selectedScoreId === sub.id && isTabActive;
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => selectScore(sub.id)}
                                  className={`w-full text-left py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all duration-150 flex items-center justify-between group/score ${
                                    isSubActive 
                                      ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600' 
                                      : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                                  }`}
                                >
                                  <span>{sub.label}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover/score:opacity-100 transition-opacity" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom profile / SallesMed branding box */}
        <div className="p-4 border-t border-[#e5e7eb] bg-slate-50/70">
          <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
            <p className="text-xs font-bold text-gray-950 font-sans">SallesMED PRO</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Medicina de Alta Performance & UTI</p>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header (visible on screens < md) */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-gray-200 h-16 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-blue-600 rounded-md text-white flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-md font-extrabold text-blue-900 tracking-tight leading-none">
              SallesMED PRO
            </h1>
            <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase">Portal Clinico</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-50 text-gray-750 hover:bg-gray-100 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden fixed inset-y-0 right-0 w-11/12 max-w-sm bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded text-white flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-900 font-sans">SallesMED PRO</span>
          </div>
          <button 
            id="close-mobile-menu"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Sidebar Search Bar */}
        <div className="p-4 border-b border-gray-100 bg-slate-50/50 block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar nos menus..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full pl-9 pr-14 py-2.5 text-xs font-semibold bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400 text-gray-950 text-left"
            />
            {sidebarSearch && (
              <button 
                onClick={() => setSidebarSearch('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-gray-200 hover:bg-gray-300 rounded px-1.5 py-0.5 text-gray-650 font-sans"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isTabActive = currentTab === item.id;
            const isExpanded = !!expandedMenus[item.id] || sidebarSearch.trim().length > 0;
            const hasSubmenu = item.id === 'infusion' || item.id === 'calculator' || item.id === 'score';

            return (
              <div key={item.id} className="space-y-1.5 mb-2.5">
                <button
                  id={`mob-nav-${item.id}`}
                  onClick={() => {
                    if (hasSubmenu) {
                      setExpandedMenus(prev => ({
                        ...prev,
                        [item.id]: !prev[item.id]
                      }));
                      setTab(item.id);
                    } else {
                      handleTabChange(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all duration-200 text-left ${
                    isTabActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1 rounded-lg ${isTabActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {hasSubmenu && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Submenus for Medicamentos / Infusões with Groups - Mobile */}
                {item.id === 'infusion' && isExpanded && (
                  <div className="pl-3 pr-1 py-1.5 space-y-3.5 bg-slate-50/60 rounded-xl border-l-2 border-blue-500/30">
                    {drugSubmenus.map((group, gIdx) => {
                      const matchingItems = group.items.filter(sub => !sidebarSearch || matchesSearch(sub.label));
                      if (matchingItems.length === 0) return null;

                      return (
                        <div key={gIdx} className="space-y-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1 leading-none mb-1">
                            {group.group}
                          </span>
                          <div className="space-y-0.5">
                            {matchingItems.map(sub => {
                              const isSubActive = selectedDrugId === sub.id && isTabActive;
                              return (
                                <button
                                  key={sub.id}
                                  id={`mob-submenu-${sub.id}`}
                                  onClick={() => selectDrug(sub.id)}
                                  className={`w-full text-left py-2 px-2.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-between group/drug ${
                                    isSubActive 
                                      ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 shadow-2xs' 
                                      : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                                  }`}
                                >
                                  <span>{sub.label}</span>
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/drug:opacity-100 transition-opacity" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Submenus for Calculadoras Gerais with Groups - Mobile */}
                {item.id === 'calculator' && isExpanded && (
                  <div className="pl-3 pr-1 py-1.5 space-y-3.5 bg-slate-50/60 rounded-xl border-l-2 border-sky-500/30">
                    {calcSubmenus.map((group, gIdx) => {
                      const matchingItems = group.items.filter(sub => !sidebarSearch || matchesSearch(sub.label));
                      if (matchingItems.length === 0) return null;

                      return (
                        <div key={gIdx} className="space-y-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1 leading-none mb-1">
                            {group.group}
                          </span>
                          <div className="space-y-0.5">
                            {matchingItems.map(sub => {
                              const isSubActive = activeCalc === sub.id && isTabActive;
                              return (
                                <button
                                  key={sub.id}
                                  id={`mob-submenu-${sub.id}`}
                                  onClick={() => selectCalc(sub.id)}
                                  className={`w-full text-left py-2 px-2.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-between group/calc ${
                                    isSubActive 
                                      ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 shadow-2xs' 
                                      : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                                  }`}
                                >
                                  <span>{sub.label}</span>
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/calc:opacity-100 transition-opacity" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Submenus for Escores with Groups - Mobile */}
                {item.id === 'score' && isExpanded && (
                  <div className="pl-3 pr-1 py-1.5 space-y-3.5 bg-slate-50/60 rounded-xl border-l-2 border-amber-500/30">
                    {scoreSubmenus.map((group, gIdx) => {
                      const matchingItems = group.items.filter(sub => !sidebarSearch || matchesSearch(sub.label));
                      if (matchingItems.length === 0) return null;

                      return (
                        <div key={gIdx} className="space-y-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1 leading-none mb-1">
                            {group.group}
                          </span>
                          <div className="space-y-0.5">
                            {matchingItems.map(sub => {
                              const isSubActive = selectedScoreId === sub.id && isTabActive;
                              return (
                                <button
                                  key={sub.id}
                                  id={`mob-submenu-${sub.id}`}
                                  onClick={() => selectScore(sub.id)}
                                  className={`w-full text-left py-2 px-2.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-between group/score ${
                                    isSubActive 
                                      ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 shadow-2xs' 
                                      : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                                  }`}
                                >
                                  <span>{sub.label}</span>
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/score:opacity-100 transition-opacity" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50">
          <div className="text-center text-[10px] font-mono text-gray-400">
            SallesMED PRO • Suporte de Decisão Médica
          </div>
        </div>
      </div>
    </>
  );
}
