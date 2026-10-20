import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';

export interface ActivityDocxData {
  title: string;
  subject: string;
  grade: string;
  originalFileName: string;
  instructions?: string;
  questions: Array<{
    number: string | number;
    statement: string;
    subItems?: string[];
    hasAnswerBox?: boolean;
    hasLines?: number;
  }>;
}

export async function generateActivityDocx(data: ActivityDocxData): Promise<Blob> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header box for School, Student, Date
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "KIT 115 ATIVIDADES DE MATEMÁTICA",
                bold: true,
                size: 24, // 12pt
                color: "1E293B",
              }),
            ],
            spacing: { after: 120 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${data.title.toUpperCase()} · ${data.grade.toUpperCase()}`,
                bold: true,
                size: 28, // 14pt
                color: "0F172A",
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Escola: __________________________________________________________________  Turma: ________", size: 20 }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Nome do Aluno(a): _______________________________________________________  Data: ___/___/______", size: 20 }),
            ],
            spacing: { after: 240 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Tema / Assunto: ", bold: true, size: 20 }),
              new TextRun({ text: `${data.subject} | Arquivo de Origem: ${data.originalFileName}`, size: 20 }),
            ],
            spacing: { after: 200 },
          }),
          ...(data.instructions
            ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: data.instructions,
                      italics: true,
                      size: 22,
                      bold: true,
                    }),
                  ],
                  spacing: { after: 200 },
                }),
              ]
            : []),
          ...data.questions.flatMap((q) => {
            const paragraphs: Paragraph[] = [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${q.number}. ${q.statement}`,
                    bold: true,
                    size: 22,
                  }),
                ],
                spacing: { before: 180, after: 100 },
              }),
            ];

            if (q.subItems && q.subItems.length > 0) {
              q.subItems.forEach((item) => {
                paragraphs.push(
                  new Paragraph({
                    children: [new TextRun({ text: `    ${item}`, size: 20 })],
                    spacing: { after: 60 },
                  })
                );
              });
            }

            const linesCount = q.hasLines ?? 3;
            for (let i = 0; i < linesCount; i++) {
              paragraphs.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Resposta: ____________________________________________________________________________________",
                      color: "94A3B8",
                      size: 20,
                    }),
                  ],
                  spacing: { after: 80 },
                })
              );
            }

            return paragraphs;
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}
