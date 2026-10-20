import React from 'react';
import { BookOpen, Sparkles, FolderDown } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'library' | 'complementary' | 'guide';
  onSelectTab: (tab: 'home' | 'library' | 'complementary' | 'guide') => void;
  onOpenQuickLibrary: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuickLibrary,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left text-slate-900 hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-md py-1"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base sm:text-lg tracking-tight text-slate-900 leading-tight">
              Kit 115 Atividades de Matemática
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              4º e 5º Ano do Ensino Fundamental
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap py-1 border-b-2 transition-colors ${
              currentTab === 'home'
                ? 'border-emerald-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => onSelectTab('library')}
            className={`whitespace-nowrap py-1 border-b-2 transition-colors ${
              currentTab === 'library'
                ? 'border-emerald-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Todas as Atividades
          </button>
          <button
            onClick={() => onSelectTab('complementary')}
            className={`whitespace-nowrap py-1 border-b-2 transition-colors ${
              currentTab === 'complementary'
                ? 'border-emerald-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Materiais Complementares
          </button>
          <button
            onClick={() => onSelectTab('guide')}
            className={`whitespace-nowrap py-1 border-b-2 transition-colors ${
              currentTab === 'guide'
                ? 'border-emerald-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Guia de Impressão e Edição
          </button>
        </nav>

        {/* Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuickLibrary}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Consultar Acervo</span>
          </button>
        </div>
      </div>

      {/* Mobile Subnav */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 py-2 px-2 text-xs font-medium text-slate-600 bg-slate-50 overflow-x-auto">
        <button
          onClick={() => onSelectTab('home')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            currentTab === 'home' ? 'text-emerald-700 font-semibold bg-emerald-50' : ''
          }`}
        >
          Início
        </button>
        <button
          onClick={() => onSelectTab('library')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            currentTab === 'library' ? 'text-emerald-700 font-semibold bg-emerald-50' : ''
          }`}
        >
          Biblioteca
        </button>
        <button
          onClick={() => onSelectTab('complementary')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            currentTab === 'complementary' ? 'text-emerald-700 font-semibold bg-emerald-50' : ''
          }`}
        >
          Materiais
        </button>
        <button
          onClick={() => onSelectTab('guide')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            currentTab === 'guide' ? 'text-emerald-700 font-semibold bg-emerald-50' : ''
          }`}
        >
          Guia
        </button>
      </div>
    </header>
  );
};
