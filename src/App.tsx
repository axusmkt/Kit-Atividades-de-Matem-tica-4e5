/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { ActivityViewModal } from './components/ActivityViewModal';
import { EditActivityModal } from './components/EditActivityModal';
import { ComplementaryScreen } from './components/ComplementaryScreen';
import { GuideScreen } from './components/GuideScreen';
import { ActivityItem } from './data/activities';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'library' | 'complementary' | 'guide'>('home');
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const [initialLibrarySearch, setInitialLibrarySearch] = useState<string>('');
  const [initialLibrarySubject, setInitialLibrarySubject] = useState<string>('all');
  const [initialLibraryGrade, setInitialLibraryGrade] = useState<string>('all');
  const [selectedComplementaryId, setSelectedComplementaryId] = useState<string>('mat-comp-checklist');

  const handleSearchSubmit = (searchTerm: string) => {
    setInitialLibrarySearch(searchTerm);
    setInitialLibrarySubject('all');
    setInitialLibraryGrade('all');
    setSelectedActivity(null);
    setCurrentTab('library');
  };

  const handleSelectShortcut = (
    filterType: 'all' | 'grade4' | 'grade5' | 'operacoes' | 'fracoes' | 'geometria' | 'problemas'
  ) => {
    setInitialLibrarySearch('');
    setSelectedActivity(null);

    switch (filterType) {
      case 'all':
        setInitialLibrarySubject('all');
        setInitialLibraryGrade('all');
        break;
      case 'grade4':
        setInitialLibrarySubject('all');
        setInitialLibraryGrade('4º Ano');
        break;
      case 'grade5':
        setInitialLibrarySubject('all');
        setInitialLibraryGrade('5º Ano');
        break;
      case 'operacoes':
        setInitialLibrarySubject('Operações Matemáticas');
        setInitialLibraryGrade('all');
        break;
      case 'fracoes':
        setInitialLibrarySubject('Frações e Números Decimais');
        setInitialLibraryGrade('all');
        break;
      case 'geometria':
        setInitialLibrarySubject('Geometria e Medidas');
        setInitialLibraryGrade('all');
        break;
      case 'problemas':
        setInitialLibrarySubject('Problemas e Desafios');
        setInitialLibraryGrade('all');
        break;
    }

    setCurrentTab('library');
  };

  const handleOpenComplementary = (materialId?: string) => {
    if (materialId) {
      setSelectedComplementaryId(materialId);
    }
    setSelectedActivity(null);
    setCurrentTab('complementary');
  };

  const handleSelectActivity = (activity: ActivityItem) => {
    setSelectedActivity(activity);
  };

  const handleBackToLibrary = () => {
    setSelectedActivity(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Universal Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setSelectedActivity(null);
          setCurrentTab(tab);
        }}
        onOpenQuickLibrary={() => {
          setInitialLibrarySearch('');
          setInitialLibrarySubject('all');
          setInitialLibraryGrade('all');
          setSelectedActivity(null);
          setCurrentTab('library');
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {selectedActivity ? (
          <ActivityViewModal
            activity={selectedActivity}
            onBack={handleBackToLibrary}
            onOpenEditModal={(act) => setEditingActivity(act)}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeScreen
                onSearchSubmit={handleSearchSubmit}
                onSelectShortcut={handleSelectShortcut}
                onSelectActivity={handleSelectActivity}
                onOpenComplementary={handleOpenComplementary}
                onNavigateToLibrary={() => {
                  setInitialLibrarySearch('');
                  setInitialLibrarySubject('all');
                  setInitialLibraryGrade('all');
                  setCurrentTab('library');
                }}
              />
            )}

            {currentTab === 'library' && (
              <LibraryScreen
                key={`${initialLibrarySearch}-${initialLibrarySubject}-${initialLibraryGrade}`}
                initialSearch={initialLibrarySearch}
                initialSubjectFilter={initialLibrarySubject}
                initialGradeFilter={initialLibraryGrade}
                onSelectActivity={handleSelectActivity}
                onOpenEditModal={(act) => setEditingActivity(act)}
              />
            )}

            {currentTab === 'complementary' && (
              <ComplementaryScreen
                initialSelectedId={selectedComplementaryId}
                onSelectActivityFromIndex={handleSelectActivity}
                onNavigateToLibrary={() => {
                  setInitialLibrarySearch('');
                  setInitialLibrarySubject('all');
                  setInitialLibraryGrade('all');
                  setCurrentTab('library');
                }}
              />
            )}

            {currentTab === 'guide' && <GuideScreen />}
          </>
        )}
      </main>

      {/* Edit Word (.docx) Modal */}
      {editingActivity && (
        <EditActivityModal
          activity={editingActivity}
          onClose={() => setEditingActivity(null)}
        />
      )}

      {/* Footer (No print, clean unboxed prose) */}
      <footer className="no-print border-t border-slate-200 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 text-center sm:text-left text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-semibold text-slate-700">
              Kit 115 Atividades de Matemática · 4º e 5º Ano do Ensino Fundamental
            </p>
            <p className="text-slate-500">
              Acervo digital para consulta, visualização, adaptação e impressão pedagógica.
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <button
              onClick={() => {
                setSelectedActivity(null);
                setCurrentTab('home');
              }}
              className="hover:text-slate-800 transition-colors"
            >
              Início
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setSelectedActivity(null);
                setCurrentTab('library');
              }}
              className="hover:text-slate-800 transition-colors"
            >
              Biblioteca
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setSelectedActivity(null);
                setCurrentTab('complementary');
              }}
              className="hover:text-slate-800 transition-colors"
            >
              Materiais Complementares
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setSelectedActivity(null);
                setCurrentTab('guide');
              }}
              className="hover:text-slate-800 transition-colors"
            >
              Guia
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
