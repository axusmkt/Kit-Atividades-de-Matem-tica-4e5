import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, FileDown, Eye, FileText, Printer, ArrowUpDown } from 'lucide-react';
import { ActivityItem, ACTIVITIES_DATA } from '../data/activities';
import { generateActivityDocx } from '../utils/docxGenerator';

interface LibraryScreenProps {
  initialSearch?: string;
  initialSubjectFilter?: string;
  initialGradeFilter?: string;
  onSelectActivity: (activity: ActivityItem) => void;
  onOpenEditModal: (activity: ActivityItem) => void;
}

// Helper to remove accents for fuzzy search
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  initialSearch = '',
  initialSubjectFilter = 'all',
  initialGradeFilter = 'all',
  onSelectActivity,
  onOpenEditModal,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [subjectFilter, setSubjectFilter] = useState(initialSubjectFilter);
  const [gradeFilter, setGradeFilter] = useState(initialGradeFilter);
  const [formatFilter, setFormatFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'number' | 'asc' | 'desc'>('number');
  const [isExportingDocx, setIsExportingDocx] = useState<string | null>(null);

  // Subject options matching real content
  const subjects = [
    { value: 'all', label: 'Todos os assuntos' },
    { value: 'Operações Matemáticas', label: 'Operações Matemáticas' },
    { value: 'Frações e Números Decimais', label: 'Frações e Decimais' },
    { value: 'Geometria e Medidas', label: 'Geometria e Medidas' },
    { value: 'Problemas e Desafios', label: 'Problemas e Desafios' },
    { value: 'Sistema Monetário', label: 'Sistema Monetário' },
    { value: 'Múltiplos e Divisores', label: 'Múltiplos e Divisores' },
    { value: 'Porcentagem', label: 'Porcentagem' },
  ];

  const grades = [
    { value: 'all', label: 'Todos os anos' },
    { value: '4º Ano', label: '4º Ano' },
    { value: '5º Ano', label: '5º Ano' },
    { value: '4º e 5º Ano', label: '4º e 5º Ano' },
  ];

  // Filtering and sorting logic
  const filteredActivities = useMemo(() => {
    return ACTIVITIES_DATA.filter((item) => {
      // Search text match (title, description, tags, original file name, question statements)
      if (searchTerm.trim()) {
        const query = normalizeText(searchTerm);
        const titleMatch = normalizeText(item.title).includes(query);
        const descMatch = normalizeText(item.description).includes(query);
        const subjectMatch = normalizeText(item.subject).includes(query);
        const fileMatch = normalizeText(item.originalFileName).includes(query);
        const tagsMatch = item.tags.some((tag) => normalizeText(tag).includes(query));
        const questionsMatch = item.questions.some((q) =>
          normalizeText(q.statement).includes(query)
        );

        if (!titleMatch && !descMatch && !subjectMatch && !fileMatch && !tagsMatch && !questionsMatch) {
          return false;
        }
      }

      // Subject filter
      if (subjectFilter !== 'all' && item.subject !== subjectFilter) {
        return false;
      }

      // Grade filter
      if (gradeFilter !== 'all') {
        if (gradeFilter === '4º Ano' && item.grade !== '4º Ano' && item.grade !== '4º e 5º Ano') {
          return false;
        }
        if (gradeFilter === '5º Ano' && item.grade !== '5º Ano' && item.grade !== '4º e 5º Ano') {
          return false;
        }
      }

      // Format filter
      if (formatFilter === 'docx') {
        // all activities in our catalog have real structured question data and can be downloaded as docx
        return true;
      }
      if (formatFilter === 'pdf' && item.sourceType !== 'pdf') {
        return false;
      }
      if (formatFilter === 'png' && item.sourceType !== 'png') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title, 'pt-BR');
      }
      if (sortOrder === 'desc') {
        return b.title.localeCompare(a.title, 'pt-BR');
      }
      return a.number - b.number;
    });
  }, [searchTerm, subjectFilter, gradeFilter, formatFilter, sortOrder]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSubjectFilter('all');
    setGradeFilter('all');
    setFormatFilter('all');
    setSortOrder('number');
  };

  const handleDownloadDocx = async (activity: ActivityItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExportingDocx(activity.id);
    try {
      const blob = await generateActivityDocx({
        title: activity.title,
        subject: activity.subject,
        grade: activity.grade,
        originalFileName: activity.originalFileName,
        instructions: activity.instructions,
        questions: activity.questions,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activity.id}-${normalizeText(activity.title).replace(/\s+/g, '-')}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erro ao gerar documento Word:', err);
    } finally {
      setIsExportingDocx(null);
    }
  };

  const handleDownloadOriginalPdf = (activity: ActivityItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = activity.downloadPdfUrl;
    link.download = activity.originalFileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Count Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Todas as atividades
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Consulte as atividades de Matemática disponíveis no seu kit.
          </p>
        </div>
        <div className="text-xs sm:text-sm text-slate-500 font-medium">
          Exibindo <span className="text-slate-900 font-semibold">{filteredActivities.length}</span> de{' '}
          <span className="text-slate-900 font-semibold">{ACTIVITIES_DATA.length}</span> atividades catalogadas no acervo
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
        {/* Top row: search + sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por título, assunto, palavra-chave ou questão..."
              className="w-full pl-9 pr-9 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="py-2 pl-3 pr-8 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              >
                <option value="number">Ordem original do kit</option>
                <option value="asc">Título (A a Z)</option>
                <option value="desc">Título (Z a A)</option>
              </select>
            </div>

            {(searchTerm || subjectFilter !== 'all' || gradeFilter !== 'all' || formatFilter !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Filter Selectors Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Assunto
            </label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            >
              {subjects.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Ano escolar
            </label>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            >
              {grades.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Tipo de formato
            </label>
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            >
              <option value="all">Todos os formatos (PDF e Word)</option>
              <option value="docx">Disponível em Word editável (.docx)</option>
              <option value="pdf">Original em Caderno PDF</option>
              <option value="png">Fichas em Alta Resolução (PNG)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50 p-8 space-y-3">
          <p className="text-base font-medium text-slate-700">
            Nenhuma atividade encontrada para os critérios selecionados.
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Experimente alterar as palavras-chave na busca ou utilize o botão abaixo para redefinir os filtros.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              onClick={() => onSelectActivity(activity)}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col cursor-pointer group"
            >
              {/* Preview Thumbnail */}
              <div className="aspect-4/3 bg-slate-100 relative overflow-hidden border-b border-slate-100 flex items-center justify-center">
                {activity.sourceType === 'png' ? (
                  <img
                    src={activity.previewUrl}
                    alt={activity.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-200"
                  />
                ) : (
                  <div className="p-4 text-center space-y-1.5">
                    <FileText className="w-10 h-10 text-emerald-700 mx-auto" />
                    <span className="text-xs font-semibold text-slate-700 block">
                      Página {activity.pageNumber}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate max-w-[220px]">
                      {activity.originalFileName}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors" />

                {/* Subtle indicator of activity number */}
                <span className="absolute top-2.5 left-2.5 text-[11px] font-mono text-slate-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
                  Ativ. {activity.number}
                </span>
              </div>

              {/* Information */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>{activity.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-slate-700">{activity.grade}</span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {activity.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDownloadOriginalPdf(activity, e)}
                      title="Baixar arquivo original"
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors flex items-center gap-1"
                    >
                      <FileDown className="w-3.5 h-3.5 text-slate-500" />
                      <span>{activity.sourceType === 'pdf' ? 'PDF' : 'Arquivo'}</span>
                    </button>

                    <button
                      onClick={(e) => handleDownloadDocx(activity, e)}
                      disabled={isExportingDocx === activity.id}
                      title="Baixar versão Word (.docx) pronta para editar"
                      className="px-2.5 py-1 text-xs font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>{isExportingDocx === activity.id ? 'Gerando...' : 'Word'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onSelectActivity(activity)}
                    className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visualizar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
