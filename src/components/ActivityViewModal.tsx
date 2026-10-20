import React, { useState } from 'react';
import {
  ArrowLeft,
  FileDown,
  Printer,
  FileText,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
  Edit3,
  Copy,
  Check,
  HelpCircle,
} from 'lucide-react';
import { ActivityItem } from '../data/activities';
import { generateActivityDocx } from '../utils/docxGenerator';

interface ActivityViewModalProps {
  activity: ActivityItem;
  onBack: () => void;
  onOpenEditModal: (activity: ActivityItem) => void;
}

export const ActivityViewModal: React.FC<ActivityViewModalProps> = ({
  activity,
  onBack,
  onOpenEditModal,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copiedQuestionIndex, setCopiedQuestionIndex] = useState<number | null>(null);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [activeTab, setActiveTab] = useState<'document' | 'questions'>('document');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadOriginal = () => {
    const a = document.createElement('a');
    a.href = activity.downloadPdfUrl;
    a.download = activity.originalFileName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadDocx = async () => {
    setIsExportingDocx(true);
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
      a.download = `${activity.id}-${activity.title.toLowerCase().replace(/\s+/g, '-')}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erro ao gerar documento Word:', err);
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handleCopyQuestion = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionIndex(index);
    setTimeout(() => setCopiedQuestionIndex(null), 2000);
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      {/* Top Header / Action Toolbar */}
      <div className="no-print sticky top-16 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Back button and metadata */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para a biblioteca</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">{activity.subject}</span>
              <span aria-hidden="true">·</span>
              <span>{activity.grade}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-500">{activity.originalFileName}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            {/* View switcher on mobile */}
            <div className="flex md:hidden border border-slate-200 rounded-lg p-0.5 bg-slate-50 text-xs">
              <button
                onClick={() => setActiveTab('document')}
                className={`px-2.5 py-1 rounded font-medium ${
                  activeTab === 'document' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Documento
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`px-2.5 py-1 rounded font-medium ${
                  activeTab === 'questions' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Questões ({activity.questions.length})
              </button>
            </div>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Imprimir</span>
            </button>

            {/* Download Original (PDF / PNG) */}
            <button
              onClick={handleDownloadOriginal}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <FileDown className="w-4 h-4 text-emerald-600" />
              <span>{activity.sourceType === 'pdf' ? 'Baixar PDF original' : 'Baixar Imagem original'}</span>
            </button>

            {/* Download Word (.docx) */}
            <button
              onClick={handleDownloadDocx}
              disabled={isExportingDocx}
              className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              <span>{isExportingDocx ? 'Gerando Word...' : 'Baixar Word (.docx)'}</span>
            </button>

            {/* Customize / Edit modal */}
            <button
              onClick={() => onOpenEditModal(activity)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4 text-emerald-600" />
              <span>Personalizar cabeçalho / questões</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Info card above the document */}
        <div className="no-print bg-white border border-slate-200 rounded-xl p-5 mb-6 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono text-emerald-700 uppercase tracking-wide">
                Atividade nº {activity.number} · {activity.grade}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                {activity.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80">
              <span>Arquivo:</span>
              <strong className="text-slate-700 font-mono">{activity.originalFileName}</strong>
              {activity.pageNumber && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Página <strong>{activity.pageNumber}</strong></span>
                </>
              )}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            {activity.description}
          </p>
        </div>

        {/* Dual Column or Single Centered Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Document Viewer (Dominant Area: 8 or 12 cols) */}
          <div
            className={`lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden printable-sheet ${
              activeTab === 'document' ? 'block' : 'hidden md:block'
            }`}
          >
            {/* Viewer Toolbar */}
            <div className="no-print flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-slate-50 text-xs">
              <span className="font-medium text-slate-600">
                Visualização do documento original
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
                  className="p-1 hover:bg-slate-200 rounded text-slate-600"
                  title="Diminuir zoom"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-slate-700 w-12 text-center">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(200, z + 15))}
                  className="p-1 hover:bg-slate-200 rounded text-slate-600"
                  title="Aumentar zoom"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(100)}
                  className="px-2 py-0.5 hover:bg-slate-200 rounded text-slate-600 ml-1"
                  title="Tamanho padrão"
                >
                  100%
                </button>
              </div>
            </div>

            {/* Document Render Canvas */}
            <div className="p-4 sm:p-8 flex justify-center bg-slate-100/50 min-h-[500px] overflow-auto">
              {activity.sourceType === 'png' ? (
                <div
                  style={{ width: `${zoomLevel}%` }}
                  className="transition-all duration-150 max-w-4xl bg-white shadow-sm border border-slate-200 rounded-sm"
                >
                  <img
                    src={activity.previewUrl}
                    alt={activity.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto block"
                  />
                </div>
              ) : (
                <div
                  style={{ width: `${zoomLevel}%` }}
                  className="w-full max-w-4xl bg-white shadow-sm border border-slate-200 rounded-lg p-2 sm:p-4 flex flex-col items-center"
                >
                  <iframe
                    src={`${activity.previewUrl}#page=${activity.pageNumber || 1}`}
                    title={activity.title}
                    className="w-full h-[750px] border border-slate-200 rounded-md bg-white"
                  />
                  <div className="no-print mt-3 text-center">
                    <a
                      href={activity.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                    >
                      <span>Abrir PDF em tela cheia no leitor nativo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Questions & Textual Structure for easy reading / copying */}
          <div
            className={`no-print lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 ${
              activeTab === 'questions' ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Estrutura e questões ({activity.questions.length})
                </h2>
                <p className="text-[11px] text-slate-500">
                  Conteúdo fiel para consulta ou cópia rápida.
                </p>
              </div>
            </div>

            {activity.instructions && (
              <div className="p-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 border border-slate-200/60">
                {activity.instructions}
              </div>
            )}

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {activity.questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-2 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-800 shrink-0">
                      Questão {q.number}
                    </span>
                    <button
                      onClick={() => handleCopyQuestion(q.statement, idx)}
                      className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1 p-1 rounded"
                      title="Copiar texto da questão"
                    >
                      {copiedQuestionIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {q.statement}
                  </p>

                  {q.subItems && q.subItems.length > 0 && (
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      {q.subItems.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="text-[11px] text-slate-600 bg-white px-2 py-1 rounded border border-slate-200/60"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.hasAnswerBox && (
                    <div className="text-[11px] text-slate-400 border border-dashed border-slate-300 p-2 text-center rounded bg-white">
                      [Espaço delimitado para cálculo e resposta]
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Word edit callout */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => onOpenEditModal(activity)}
                className="w-full py-2 px-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>Adaptar perguntas antes de baixar Word</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
