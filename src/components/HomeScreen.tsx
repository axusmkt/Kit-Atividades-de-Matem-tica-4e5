import React, { useState } from 'react';
import { Search, ArrowRight, BookOpen, Layers, CheckSquare, ListOrdered, FileText, Printer, FileDown } from 'lucide-react';
import { ActivityItem, ACTIVITIES_DATA, COMPLEMENTARY_MATERIALS } from '../data/activities';

interface HomeScreenProps {
  onSearchSubmit: (searchTerm: string) => void;
  onSelectShortcut: (filterType: 'all' | 'grade4' | 'grade5' | 'operacoes' | 'fracoes' | 'geometria' | 'problemas') => void;
  onSelectActivity: (activity: ActivityItem) => void;
  onOpenComplementary: (materialId?: string) => void;
  onNavigateToLibrary: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSearchSubmit,
  onSelectShortcut,
  onSelectActivity,
  onOpenComplementary,
  onNavigateToLibrary,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchInput.trim());
  };

  // Curated highlights from the real catalog (varied themes and grades)
  const featuredActivities = ACTIVITIES_DATA.slice(0, 6);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200/80 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold tracking-wider text-emerald-800 uppercase">
            Seu acervo de atividades para o 4º e 5º ano
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            O que você precisa preparar hoje?
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Encontre uma atividade, confira o material e prepare sua próxima aula.
          </p>

          {/* Functional Search Bar */}
          <form onSubmit={handleSearch} className="pt-2 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-sm rounded-xl overflow-hidden border border-slate-300 bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" aria-hidden="true" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Busque por assunto, conteúdo ou nome da atividade..."
                className="w-full py-3.5 px-3 text-slate-900 text-sm sm:text-base placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="mr-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
              >
                Buscar
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-left sm:text-center">
              Dica: busque por <em>frações</em>, <em>divisão</em>, <em>perímetro</em>, <em>sistema monetário</em> ou <em>porcentagem</em>.
            </p>
          </form>
        </div>
      </section>

      {/* Acesso Rápido (Quick Access Shortcuts) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">Acesso rápido</h2>
          <p className="text-xs text-slate-500">Selecione uma categoria para filtrar o acervo imediatamente.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => onSelectShortcut('all')}
            className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <span className="text-xs text-slate-500 mb-1">Acervo completo</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
              Todas as atividades
            </span>
          </button>

          <button
            onClick={() => onSelectShortcut('grade4')}
            className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <span className="text-xs text-slate-500 mb-1">Por ano escolar</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
              Atividades do 4º ano
            </span>
          </button>

          <button
            onClick={() => onSelectShortcut('grade5')}
            className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <span className="text-xs text-slate-500 mb-1">Por ano escolar</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
              Atividades do 5º ano
            </span>
          </button>

          <button
            onClick={() => onSelectShortcut('operacoes')}
            className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <span className="text-xs text-slate-500 mb-1">Cálculo e algoritmos</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
              Operações matemáticas
            </span>
          </button>

          <button
            onClick={() => onSelectShortcut('fracoes')}
            className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <span className="text-xs text-slate-500 mb-1">Representação e cálculo</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
              Frações e decimais
            </span>
          </button>

          <button
            onClick={() => onSelectShortcut('geometria')}
            className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <span className="text-xs text-slate-500 mb-1">Formas e grandezas</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
              Geometria e medidas
            </span>
          </button>

          <button
            onClick={() => onSelectShortcut('problemas')}
            className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <span className="text-xs text-slate-500 mb-1">Raciocínio lógico</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
              Problemas e desafios
            </span>
          </button>

          <button
            onClick={() => onOpenComplementary('mat-comp-checklist')}
            className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <span className="text-xs text-slate-500 mb-1">Material de apoio</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
              Checklist de Planejamento
            </span>
          </button>

          <button
            onClick={() => onOpenComplementary('mat-comp-indice')}
            className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group sm:col-span-2 lg:col-span-2"
          >
            <span className="text-xs text-slate-500 mb-1">Mapeamento temático</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
              Índice de Conteúdos
            </span>
          </button>
        </div>
      </section>

      {/* Atividades em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Atividades em destaque</h2>
            <p className="text-xs text-slate-500">Seleção prática de atividades prontas para aplicar em sala de aula.</p>
          </div>
          <button
            onClick={onNavigateToLibrary}
            className="text-xs sm:text-sm font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>Ver todas as atividades</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col"
            >
              {/* Preview banner */}
              <div
                onClick={() => onSelectActivity(activity)}
                className="aspect-4/3 bg-slate-100 relative overflow-hidden cursor-pointer group border-b border-slate-100 flex items-center justify-center"
              >
                {activity.sourceType === 'png' ? (
                  <img
                    src={activity.previewUrl}
                    alt={activity.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-200"
                  />
                ) : (
                  <div className="p-4 text-center space-y-2">
                    <FileText className="w-10 h-10 text-emerald-700 mx-auto" />
                    <span className="text-xs font-medium text-slate-600 block">
                      Página {activity.pageNumber} do Caderno Oficial
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate max-w-[200px]">
                      {activity.originalFileName}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors" />
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>{activity.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-slate-700">{activity.grade}</span>
                  </div>

                  <h3
                    onClick={() => onSelectActivity(activity)}
                    className="text-base font-semibold text-slate-900 hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
                  >
                    {activity.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                    {activity.originalFileName}
                  </span>
                  <button
                    onClick={() => onSelectActivity(activity)}
                    className="px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors whitespace-nowrap"
                  >
                    Visualizar atividade
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Materiais Complementares Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 rounded-2xl bg-slate-50/80 p-6 sm:p-8">
          <div className="max-w-3xl space-y-2 mb-6">
            <h2 className="text-xl font-bold text-slate-900">Materiais complementares do seu kit</h2>
            <p className="text-sm text-slate-600">
              Recursos de apoio inclusos para acelerar seu planejamento semanal e mapear as atividades por assunto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPLEMENTARY_MATERIALS.map((material) => (
              <div
                key={material.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium">
                    {material.id.includes('checklist') ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ListOrdered className="w-4 h-4 text-emerald-600" />
                    )}
                    <span>{material.category}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{material.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{material.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => onOpenComplementary(material.id)}
                    className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    Visualizar ou consultar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
