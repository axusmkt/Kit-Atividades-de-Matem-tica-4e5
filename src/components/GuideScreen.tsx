import React from 'react';
import { Printer, FileEdit, CheckCircle2, AlertCircle, FileText, Download } from 'lucide-react';
import { ACTIVITIES_DATA } from '../data/activities';

export const GuideScreen: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Guia de Impressão e Edição de Atividades
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Orientações práticas para aproveitar o material com máxima qualidade na sua rotina pedagógica.
        </p>
      </div>

      {/* Grid: Print Guide & Word Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Print Guide */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Como Imprimir com Alta Fidelidade</h2>
              <span className="text-xs text-slate-500">Configurações recomendadas da impressora</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">1. Selecione o papel A4 (padrão escolar)</span>
              <p className="text-slate-600">
                Todas as atividades foram dimensionadas para o padrão A4 (210 × 297 mm), garantindo que os quadros de cálculo e respostas fiquem com excelente legibilidade.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">2. Escala: "Ajustar à página" ou "100%"</span>
              <p className="text-slate-600">
                Na janela de impressão do seu navegador ou leitor de PDF, marque <em>"Ajustar à área de impressão"</em> para evitar cortes de margens.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">3. Oculte cabeçalhos e rodapés do navegador</span>
              <p className="text-slate-600">
                Desmarque a opção <em>"Cabeçalhos e rodapés"</em> nas configurações de impressão para que a URL do site ou a data da web não saiam na folha do aluno.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">4. Impressão Econômica em Preto e Branco</span>
              <p className="text-slate-600">
                As fichas ilustradas possuem alto contraste e são perfeitamente nítidas tanto em cópias coloridas quanto em fotocópias preto e branco.
              </p>
            </div>
          </div>
        </div>

        {/* Word / Google Docs Guide */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800">
              <FileEdit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Como Adaptar e Editar no Word</h2>
              <span className="text-xs text-slate-500">Flexibilidade para personalizar o material</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">1. Baixe o arquivo Word (.docx)</span>
              <p className="text-slate-600">
                Em qualquer atividade da biblioteca, clique no botão azul <em>"Word"</em> ou <em>"Baixar Word (.docx)"</em> para gerar o arquivo aberto.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">2. Abra no Microsoft Word, Google Docs ou LibreOffice</span>
              <p className="text-slate-600">
                O arquivo gerado é 100% compatível com todos os editores de texto populares sem perda de formatação ou caracteres especiais.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">3. Personalize com o cabeçalho da sua escola</span>
              <p className="text-slate-600">
                Insira o logotipo da sua escola, o nome do professor(a), a turma exata ou adapte valores dos problemas para reforço com alunos que precisam de apoio.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">4. O documento original permanece preservado</span>
              <p className="text-slate-600">
                As versões originais em PDF e imagem continuam sempre disponíveis e intactas na biblioteca para consulta a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Relatório do Inventário Técnico do Acervo */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Inventário Oficial dos Documentos Fornecidos no Kit
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          Conforme diretriz do projeto, todos os materiais foram catalogados a partir dos documentos reais anexados ao kit, evitando duplicatas e garantindo acesso direto aos arquivos legítimos:
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
              <tr>
                <th className="py-2.5 px-4">Documento Fonte</th>
                <th className="py-2.5 px-4">Formato Original</th>
                <th className="py-2.5 px-4">Conteúdo / Abrangência</th>
                <th className="py-2.5 px-4">Ano Escolar</th>
                <th className="py-2.5 px-4">Versão Word (.docx)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-slate-800">
                  caderno-com-atividades-de-matematica-4-ano_abaecfff.pdf
                </td>
                <td className="py-2.5 px-4">PDF (39 páginas)</td>
                <td className="py-2.5 px-4">
                  36 atividades completas (páginas 4 a 39) com operações, perímetro, medidas, frações, decomposição, gabarito e avaliação diagnóstica
                </td>
                <td className="py-2.5 px-4 font-semibold text-slate-700">4º Ano</td>
                <td className="py-2.5 px-4 text-emerald-700 font-medium">Disponível em 100% das atividades</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-slate-800">
                  PROBLEMAS-DE-MULTIPLICACAO_d6c48244.pdf
                </td>
                <td className="py-2.5 px-4">PDF (3 páginas)</td>
                <td className="py-2.5 px-4">
                  10 situações-problema com combinatória, cardápios, proporção, cédulas e orçamentos comerciais
                </td>
                <td className="py-2.5 px-4 font-semibold text-slate-700">4º e 5º Ano</td>
                <td className="py-2.5 px-4 text-emerald-700 font-medium">Disponível em 100% das atividades</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-slate-800">
                  9 Fichas Didáticas em Alta Resolução (PNG)
                </td>
                <td className="py-2.5 px-4">PNG alta definição</td>
                <td className="py-2.5 px-4">
                  Desafio dos Campeões, Múltiplos e Divisores, Porcentagem, Simulado SAEB/BNCC, Divisões, Frações, Sistema Monetário e Multiplicações Desafiadoras
                </td>
                <td className="py-2.5 px-4 font-semibold text-slate-700">4º e 5º Ano</td>
                <td className="py-2.5 px-4 text-emerald-700 font-medium">Disponível em 100% das atividades</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
