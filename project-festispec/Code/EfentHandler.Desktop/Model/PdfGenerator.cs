using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EfentHandler.Desktop.Model;
using EfentHandler.Desktop.ViewModel;
using iTextSharp;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.pdf.draw;

namespace EfentHandler.Model
{
    class PdfGenerator
    {

        public void WriteFile(List<IElement> elementArr, ReportData rp)
        {
            //let reportdata generate filepath using metadata
            rp.CreateFileName();
            //check for path existance and create if not exists
            if (!Directory.Exists(rp.FolderPath))
                Directory.CreateDirectory(rp.FolderPath);

            //create temporary filepath with suffix for later use
            string fileNameStr = rp.FilePath + "_TOMERGE.pdf";
            //create file and add each pdf element
            using (FileStream stream = new FileStream(fileNameStr, FileMode.Create))
            {
                Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);

                PdfWriter.GetInstance(pdfDoc, stream);
                pdfDoc.Open();
                foreach (var element in elementArr)
                {
                    pdfDoc.Add(element);
                }
                pdfDoc.Close();
                stream.Close();
            }
        }

        public void GeneratePdfElements(List<ISaveableCharts> chartsList, List<ISaveableQuestion> questionList, ReportData rp)
        {
            List<IElement> elementArr = new List<IElement>();
            //if advice has been entered create corresponding elements
            LineSeparator line = new LineSeparator(5f, 100f, BaseColor.GRAY, Element.ALIGN_LEFT, 1);
            if (rp.Advice != null && rp.Advice != "")
            {
                string plaintextAdvice;
                using (System.Windows.Forms.RichTextBox rtfTemp = new System.Windows.Forms.RichTextBox())
                {
                    rtfTemp.Rtf = rp.Advice;
                    plaintextAdvice = rtfTemp.Text;
                }


                BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                iTextSharp.text.Font font = new iTextSharp.text.Font(bf, 25, iTextSharp.text.Font.BOLD);
                Paragraph pAdviceTitle = new Paragraph(new Chunk("Advies", font));
                Paragraph advice = new Paragraph(plaintextAdvice);
                advice.SpacingAfter = 10f;
                elementArr.Add(pAdviceTitle);
                elementArr.Add(advice);
                elementArr.Add(line);

            }
            //create an element for each surveyset
            foreach (var surveySet in chartsList)
            {
                PdfPTable wrapperTable = new PdfPTable(1);
                wrapperTable.WidthPercentage = 100;
                wrapperTable.DefaultCell.Border = 0;
                wrapperTable.DefaultCell.VerticalAlignment = Element.ALIGN_MIDDLE;
                wrapperTable.DefaultCell.HorizontalAlignment = Element.ALIGN_MIDDLE;
                wrapperTable.KeepTogether = true;

                PdfPTable table;
                Image gr1 = Image.GetInstance(System.Drawing.Image.FromFile(surveySet.GetViewModel.ImagePath), new BaseColor(0, 0, 0));
                double percentage = Math.Round(gr1.Height / gr1.Width, 2);
                //check wether to put the image in landscape/portrait for better layout
                if (percentage < 0.60)
                {
                    //landscape mode
                    table = new PdfPTable(1);
                }
                else
                {
                    //portrait mode
                    table = new PdfPTable(2);
                }

                table.KeepTogether = true;
                table.DefaultCell.Border = 0;
                table.WidthPercentage = 100;
                table.DefaultCell.FixedHeight = 200f;
                table.DefaultCell.VerticalAlignment = Element.ALIGN_MIDDLE;
                table.DefaultCell.HorizontalAlignment = Element.ALIGN_MIDDLE;


                PdfPTable baseDataTable = new PdfPTable(1);
                baseDataTable.WidthPercentage = 100;

                foreach (var baseDataRow in surveySet.GetViewModel.BaseData)
                    baseDataTable.AddCell(baseDataRow);

                table.AddCell(gr1);
                table.AddCell(baseDataTable);
                BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                iTextSharp.text.Font font = new iTextSharp.text.Font(bf, 15, iTextSharp.text.Font.BOLD);
                Paragraph titlePar = new Paragraph(new Chunk(surveySet.GetViewModel.Question_Id + ". " + surveySet.GetViewModel.Question, font));
                titlePar.Alignment = Element.ALIGN_CENTER;
                wrapperTable.AddCell(titlePar);
                wrapperTable.AddCell(table);

              
                elementArr.Add(wrapperTable);
                elementArr.Add(Chunk.NEWLINE);
                wrapperTable.SpacingBefore = 10f;
                elementArr.Add(line);
            }
          
            foreach (var openQuestion in questionList)
            {
               
                    if (openQuestion.Question != null)
                    {
                        PdfPTable questionTable = new PdfPTable(1);
                        questionTable.DefaultCell.Border = 1;
                        questionTable.WidthPercentage = 100;
                        questionTable.SpacingAfter = 20f;
                        questionTable.SpacingBefore = 20f;

                        BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                        iTextSharp.text.Font font = new iTextSharp.text.Font(bf, 15, iTextSharp.text.Font.BOLD);
                        Paragraph question = new Paragraph(new Chunk(openQuestion.Question_Id + ". " + openQuestion.Question, font));

                        questionTable.AddCell(question);

                        if (openQuestion.Image_URLS != null)
                        {
                            foreach (var image_url in openQuestion.Image_URLS)
                            {
                                Image imgAnswer = Image.GetInstance(image_url);
                                questionTable.AddCell(imgAnswer);
                            }
                        }
                        else
                        {
                            foreach (var answer in openQuestion.GivenAnswers)
                            {
                                Paragraph answerP = new Paragraph(answer);
                                questionTable.AddCell(answerP);
                            }
                        }

                        elementArr.Add(questionTable);
                        elementArr.Add(line);
                    }
            }
            
            //elementArr.Add(questionTable);
            if (elementArr.Count > 0)
            {
                //create the primary report file
                WriteFile(elementArr, rp);
                //create the titlepage using metadata
                CreateTitlePage(rp);
                List<string> filenames = new List<string>();
                filenames.Add("files\\templates\\output.pdf");
                filenames.Add(rp.FilePath + "_TOMERGE.pdf");
                //merge titlepage and report file into final PDF
                MergePDFs(filenames, rp.FilePath + ".pdf");
            }
        }


        public static bool MergePDFs(List<string> fileNames, string targetPdf)
        {
            bool merged = true;
            using (FileStream stream = new FileStream(targetPdf, FileMode.Create))
            {
                Document document = new Document();
                PdfCopy pdf = new PdfCopy(document, stream);
                PdfReader reader = null;
                try
                {
                    document.Open();
                    foreach (string file in fileNames)
                    {
                        reader = new PdfReader(file);
                        pdf.AddDocument(reader);
                        reader.Close();
                    }
                }
                catch (Exception)
                {
                    merged = false;

                    if (reader != null)
                        reader.Close();
                }
                finally
                {
                    if (document != null)
                    {
                        document.Close();
                        foreach (var pdffile in fileNames)
                        {
                            if (File.Exists(pdffile))
                            {
                                File.Delete(pdffile);
                            }
                        }
                    }
                }
            }
            return merged;
        }

        public void CreateTitlePage(ReportData rp)
        {
            //use template file for titlepage
            string pathin = @"files\templates\template.pdf";
            //create temporary output file to use in a later merge
            string pathout = @"files\templates\Output.pdf";
            var directories = Directory.GetDirectories(@"files\");

            PdfReader reader = new PdfReader(pathin);
            PdfStamper stamper = new PdfStamper(reader, new FileStream(pathout, FileMode.Create));
            Paragraph ch = new Paragraph("test");
            PdfPTable ta = new PdfPTable(2);
            ta.DefaultCell.Border = 0;
            //create titlepage information elements
            ta.AddCell("Klant:");
            ta.AddCell(rp.CustomerName);
            ta.AddCell("Event:");
            ta.AddCell(rp.EventName);
            ta.AddCell("Festispec contactpersoon:");
            if (rp.EmployeeName == null || rp.EmployeeName == "")
            {
                ta.AddCell("-");
            }
            else
            {
                ta.AddCell(rp.EmployeeName);
            }
            ta.AddCell("Datum:");
            ta.AddCell(DateTime.Today.ToString("dd-MM-yyyy"));

            if (ch != null)
            {
                ColumnText ct = new ColumnText(stamper.GetOverContent(1));
                ct.AddElement(ta);

                Rectangle rect = new Rectangle(46, 190, 530, 36);
                ct.SetSimpleColumn(36, 36, PageSize.A4.Width - 36, PageSize.A4.Height - 175);
                ct.Go();
                stamper.Close();
                reader.Close();
            }
        }
    }
}