import React, { useState } from 'react';
import { X, FileDown, Check, Info, FileText, Sparkles, RefreshCw } from 'lucide-react';
import { ActivityItem } from '../data/activities';
import { generateActivityDocx } from '../utils/docxGenerator';

interface EditActivityModalProps {
  activity: ActivityItem;
  onClose: () => void;
}

export const EditActivityModal: React.FC<EditActivityModalProps> = ({
  activity,
  onClose,
}) => {
  const [schoolName, setSchoolName] = useState('Escola Municipal de Ensino Fundamental');
  const [gradeLevel, setGradeLevel] = useState(activity.grade);
  const [customInstructions, setCustomInstructions] = useState(activity.instructions || '');
  const [editableQuestions, setEditableQuestions] = useState(
    activity.questions.map((q) => ({ ...q }))
  );
  const [isExporting, setIsExporting] = useState(false);
  const [successExport, setSuccessExport] = useState(false);

  const handleQuestionChange = (index: number, newStatement: string) => {
    setEditableQuestions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], statement: newStatement };
      return copy;
    });
  };

  const handleResetToOriginal = () => {
    setEditableQuestions(activity.questions.map((q) => ({ ...q })));
    setCustomInstructions(activity.instructions || '');
  };

  const handleDownloadDocx = async () => {
    setIsExporting(true);
    setSuccessExport(false);
    try {
      const blob = await generateActivityDocx({
        title: activity.title,
        subject: activity.subject,
        grade: gradeLevel,
        originalFileName: activity.originalFileName,
        instructions: customInstructions,
        questions: editableQuestions,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activity.id}-editada-${activity.title.toLowerCase().replace(/\s+/g, '-')}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccessExport(true);
      setTimeout(() => setSuccessExport(false), 4000);
    } catch (err) {
      console.error('Erro ao gerar DOCX:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Versão Editável (.docx)
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Adaptar e Baixar: {activity.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          {/* Explanation banner */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 space-y-1">
              <p className="font-semibold text-blue-950">
                Como funciona a versão editável em Word (.docx):
              </p>
              <p className="text-blue-800 leading-relaxed">
                Ao clicar em <strong>"Baixar arquivo Word (.docx)"</strong>, o sistema exporta um documento autêntico do Microsoft Word. Você pode abri-lo e alterá-lo livremente no <strong>Word, Google Docs ou LibreOffice</strong>. Se preferir, ajuste o cabeçalho e os enunciados abaixo antes do download.
              </p>
            </div>
          </div>

          {/* School & Grade Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome da Escola no Cabeçalho
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ano Escolar / Turma
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value as any)}
                className="w-full py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              >
                <option value="4º Ano">4º Ano do Ensino Fundamental</option>
                <option value="5º Ano">5º Ano do Ensino Fundamental</option>
                <option value="4º e 5º Ano">4º e 5º Ano (Misto)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Instruções ou Orientação Pedagógica (Opcional)
              </label>
              <input
                type="text"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Ex: Leia os enunciados com atenção e registre todo o cálculo."
                className="w-full py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              />
            </div>
          </div>

          {/* Editable questions section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Ajuste fino dos enunciados ({editableQuestions.length} questões)
              </h3>
              <button
                onClick={handleResetToOriginal}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar texto original</span>
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {editableQuestions.map((q, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-lg bg-white space-y-1.5">
                  <span className="text-xs font-semibold text-slate-800">
                    Questão {q.number}
                  </span>
                  <textarea
                    rows={2}
                    value={q.statement}
                    onChange={(e) => handleQuestionChange(idx, e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            Cancelar
          </button>

          <div className="flex items-center gap-3">
            {successExport && (
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <Check className="w-4 h-4" />
                Arquivo Word baixado com sucesso!
              </span>
            )}

            <button
              onClick={handleDownloadDocx}
              disabled={isExporting}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              <span>{isExporting ? 'Gerando .docx...' : 'Baixar arquivo Word (.docx)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
