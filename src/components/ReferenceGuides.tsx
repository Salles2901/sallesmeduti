// src/components/ReferenceGuides.tsx
import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Hash, 
  ArrowRight, 
  Check, 
  Copy,
  FolderMinus,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Tag,
  Stethoscope,
  Info
} from 'lucide-react';
import { ReferenceArticle } from '../types';
import { INITIAL_REFERENCES } from '../data/references';

export default function ReferenceGuides() {
  const [articles] = useState<ReferenceArticle[]>(INITIAL_REFERENCES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedArticle, setExpandedArticle] = useState<string | null>(INITIAL_REFERENCES[0].id);

  // Copying helper state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Category tags mapping
  const categories = [
    { id: 'all', label: 'Todos os Manuais' },
    { id: 'antibioticos', label: 'Antibióticos & Rim' },
    { id: 'ventilacao', label: 'Ventilação Mecânica' },
    { id: 'eletrolitos', label: 'Eletrólitos / Sódio' },
    { id: 'cardiaco', label: 'ACLS / Cardiologia' }
  ];

  // Filter articles based on query and selected category
  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesQuery = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Search and filter controls panel */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            id="reference-search"
            type="text"
            placeholder="Pesquisar por termo, especialidade ou palavra-chave (ex: Tazocin, Sódio)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm text-gray-950 font-medium bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category toggler selector */}
        <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 border transition ${
                selectedCategory === cat.id 
                  ? 'bg-blue-600 text-white border-blue-600 font-bold' 
                  : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Pocket Article Layout Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: List Index of filtration - 5 columns */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
            Lista de Guias Disponíveis ({filteredArticles.length})
          </span>

          {filteredArticles.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-sm">
              Nenhum guia de consulta compatível encontrado. Tente redefinir a busca.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredArticles.map((art) => {
                const isSelected = expandedArticle === art.id;
                return (
                  <button
                    key={art.id}
                    id={`art-index-${art.id}`}
                    onClick={() => setExpandedArticle(art.id)}
                    className={`w-full text-left p-4 rounded-xl border transition duration-150 ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {art.category === 'antibioticos' ? 'Antibióticos' : 
                         art.category === 'ventilacao' ? 'Ventilação' : 
                         art.category === 'eletrolitos' ? 'Eletrólitos' : 'Cardiologia'}
                      </span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>
                        {art.lastUpdated}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold mt-2 font-sans tracking-tight leading-snug">
                      {art.title}
                    </h4>
                    <p className={`text-xs mt-1 truncate ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                      {art.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {art.tags.slice(0, 3).map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className={`text-[9px] font-semibold px-1.5 py-0.5 rounded tracking-wide font-sans ${
                            isSelected ? 'bg-blue-600/40 text-blue-100' : 'bg-gray-150/70 text-gray-600'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Display Expanded Manual Sheet - 7 columns */}
        <div className="lg:col-span-7">
          {expandedArticle ? (
            (() => {
              const article = articles.find(art => art.id === expandedArticle);
              if (!article) return null;
              return (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[500px] flex flex-col justify-between">
                  <div>
                     {/* Header bar colored as clinical category */}
                    <div className="bg-[#1e293b] text-white p-6 border-b border-slate-800">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="p-1.5 bg-blue-600 rounded text-white flex items-center justify-center">
                          <Stethoscope className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                          Guia Médico de Bolso • {article.lastUpdated}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold tracking-tight font-sans">
                        {article.title}
                      </h3>
                      <p className="text-slate-300 text-xs mt-1">
                        {article.subtitle}
                      </p>
                    </div>

                    {/* Content Section Blocks */}
                    <div className="p-6 space-y-6">
                      {article.sections.map((sec, sIdx) => (
                        <div key={sIdx} className="space-y-2.5">
                          <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            {sec.title}
                          </h4>
                          
                          <p className="text-xs text-gray-700 leading-relaxed font-sans whitespace-pre-line bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                            {sec.content}
                          </p>

                          {/* Inner Table if available */}
                          {sec.table && (
                            <div className="overflow-x-auto border border-gray-250/70 rounded-xl mt-3.5 bg-white shadow-sm">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 font-bold shrink-0">
                                    {sec.table.headers.map((h, hIdx) => (
                                      <th key={hIdx} className="p-3 font-semibold text-gray-800 font-sans whitespace-nowrap">
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {sec.table.rows.map((row, rIdx) => (
                                    <tr 
                                      key={rIdx} 
                                      className={`border-b border-gray-150 hover:bg-gray-50/40 transition shrink-0 ${
                                        rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                      }`}
                                    >
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="p-3 text-[11px] font-medium font-sans leading-relaxed text-gray-700">
                                          {cell.includes('(') ? (
                                            <>
                                              <span className="font-bold text-gray-900 block">{cell.split('(')[0].trim()}</span>
                                              <span className="text-[10px] text-gray-500 font-normal leading-tight">({cell.split('(')[1].trim()}</span>
                                            </>
                                          ) : (
                                            cell
                                          )}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Footer of card */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex gap-1">
                      {article.tags.map((t, index) => (
                        <span key={index} className="text-[9px] font-bold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      id="copy-article-btn"
                      onClick={() => handleCopyText(
                        `${article.title}\n${article.subtitle}\n\n` + 
                        article.sections.map(s => `[${s.title}]\n${s.content}`).join('\n\n'), 
                        article.id
                      )}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border hover:bg-gray-100 rounded-lg text-xs font-bold text-gray-700 shadow-sm transition"
                    >
                      {copiedId === article.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                      {copiedId === article.id ? 'Copiado!' : 'Copiar Texto'}
                    </button>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 border border-dashed border-gray-300 rounded-2xl text-gray-400">
              <BookOpen className="w-12 h-12 mb-3.5 stroke-1" />
              <p className="text-sm font-semibold">Nenhum Guia Selecionado</p>
              <p className="text-xs text-gray-450 mt-1">Escolha um item da coluna esquerda para expandir e ler as diretrizes clínicas.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
