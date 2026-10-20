import React, { useState } from 'react';
import { CheckSquare, ListOrdered, Printer, FileDown, ArrowRight, Check, Eye } from 'lucide-react';
import { COMPLEMENTARY_MATERIALS, ComplementaryMaterial, ActivityItem, ACTIVITIES_DATA } from '../data/activities';

interface ComplementaryScreenProps {
  initialSelectedId?: string;
  onSelectActivityFromIndex: (activity: ActivityItem) => void;
  onNavigateToLibrary: () => void;
}

export const ComplementaryScreen: React.FC<ComplementaryScreenProps> = ({
  initialSelectedId,
  onSelectActivityFromIndex,
  onNavigateToLibrary,
}) => {
  const [activeMaterialId, setActiveMaterialId] = useState<string>(
    initialSelectedId || 'mat-comp-checklist'
  );
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const activeMaterial =
    COMPLEMENTARY_MATERIALS.find((m) => m.id === activeMaterialId) ||
    COMPLEMENTARY_MATERIALS[0];

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDoc = () => {
    // Generate text document / printable version
    let content = `${activeMaterial.title.toUpperCase()}\n`;
    content += `Categoria: ${activeMaterial.category}\n`;
    content += `Descrição: ${activeMaterial.description}\n\n`;
    content += `==========================================\n\n`;

    activeMaterial.sections.forEach((sec, idx) => {
      content += `${idx + 1}. ${sec.title}\n`;
      sec.items.forEach((item) => {
        content += `   [ ] ${item}\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeMaterial.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Materiais complementares
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Acesse os recursos de organização e planejamento escolar inclusos no seu kit.
        </p>
      </div>

      {/* Two Main Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COMPLEMENTARY_MATERIALS.map((material) => {
          const isSelected = activeMaterialId === material.id;
          return (
            <div
              key={material.id}
              onClick={() => setActiveMaterialId(material.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/20 shadow-xs ring-1 ring-emerald-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  {material.id.includes('checklist') ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ListOrdered className="w-4 h-4 text-emerald-600" />
                  )}
                  <span>{material.category}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">{material.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {material.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {isSelected ? 'Material selecionado' : 'Clique para visualizar'}
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Visualizar ou baixar
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Material Viewer Panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 printable-sheet">
        {/* Panel Header */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
              {activeMaterial.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeMaterial.title}
            </h2>
            <p className="text-xs text-slate-500">{activeMaterial.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Imprimir material</span>
            </button>
            <button
              onClick={handleDownloadDoc}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <FileDown className="w-4 h-4" />
              <span>Baixar arquivo</span>
            </button>
          </div>
        </div>

        {/* Content depending on Checklist or Indice */}
        {activeMaterial.id.includes('checklist') ? (
          <div className="space-y-6">
            <div className="no-print p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
              <strong>Como utilizar:</strong> Utilize os itens abaixo como roteiro semanal para preparar suas aulas de Matemática, selecionar os exercícios adequados e acompanhar os alunos com dúvidas. Você pode marcar os itens concluídos diretamente na tela ou imprimir para uso físico.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeMaterial.sections.map((section, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                >
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                      {sIdx + 1}
                    </span>
                    <span>{section.title}</span>
                  </h3>

                  <div className="space-y-2 pt-1">
                    {section.items.map((item, iIdx) => {
                      const itemKey = `${sIdx}-${iIdx}`;
                      const isDone = !!checkedItems[itemKey];
                      return (
                        <label
                          key={iIdx}
                          className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleCheck(itemKey)}
                            className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span
                            className={`text-xs leading-relaxed ${
                              isDone ? 'line-through text-slate-400' : 'text-slate-700'
                            }`}
                          >
                            {item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Indice de Conteúdos Curricular Map */
          <div className="space-y-6">
            <div className="no-print p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
              <strong>Mapeamento Curricular BNCC:</strong> Todas as atividades do acervo estão agrupadas por Unidade Temática. Clique em qualquer assunto para consultar e filtrar na biblioteca.
            </div>

            <div className="space-y-6">
              {activeMaterial.sections.map((section, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900">{section.title}</h3>
                  </div>
                  <div className="divide-y divide-slate-100 bg-white">
                    {section.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="px-5 py-3 text-xs text-slate-700 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="leading-relaxed font-medium">{item}</span>
                        <button
                          onClick={onNavigateToLibrary}
                          className="no-print text-emerald-700 hover:text-emerald-800 text-xs font-semibold flex items-center gap-1 shrink-0"
                        >
                          <span>Localizar na biblioteca</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
