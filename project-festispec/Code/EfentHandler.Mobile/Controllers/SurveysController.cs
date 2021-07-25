using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EfentHandler.Domain.Model;
using EfentHandler.Domain.Repository;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace EfentHandler.Mobile.Controllers
{
    public class SurveysController : Controller
    {
        private EfentHandlerEntities db = new EfentHandlerEntities();
        private SurveyRepository _surveyRepository;

        public SurveysController()
        {
            _surveyRepository = new SurveyRepository();
        }

        // GET: Surveys
        public ActionResult Index()
        {
            List<survey> surveys = _surveyRepository.GetSurveyByUser((user)Session["User"]);

            return View(surveys);
        }

        // GET: Surveys/Answer/5
        public ActionResult Answer(int id)
        {
            List<survey_question> questions = _surveyRepository.GetQuestionsAndAnswers(id);
            ViewBag.Survey = _surveyRepository.GetSurveyById(id);
            ViewBag.Questions = questions;

            return View(questions);
        }

        // POST: Surveys/Answer/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Answer(ICollection<string> text, ICollection<int> textid,
                                   ICollection<int> scale, ICollection<int> scaleid,
                                   ICollection<int> count, ICollection<int> countid,
                                   IEnumerable<HttpPostedFileBase> img, ICollection<int> imgid, ICollection<int> imgAnsId,
                                   IEnumerable<HttpPostedFileBase> drawing, ICollection<int> drawingid,
                                   ICollection<int> dist1, ICollection<int> dist2, ICollection<int> distid, 
                                   ICollection<int> distans, ICollection<int> distAnsId,
                                   ICollection<int> multiple, ICollection<int> multipleAns, 
                                   ICollection<int> multipleid, ICollection<int> multipleAnsId,
                                   ICollection<int> estid, ICollection<int> est, 
                                   ICollection<int> estAns, ICollection<int> estAnsId,
                                   ICollection<int> fiveid, ICollection<int> five,
                                   ICollection<int> fiveAns, ICollection<int> fiveAnsId
            )
        {

            // For every scale-answers
            if (scale != null)
            {
                for (int i = 0; i < scale.Count; i++)
                {
                    answer ans = new answer
                    {
                        IntAnswer = scale.ToList()[i],
                        SurveyQuestionId = scaleid.ToList()[i]
                    };

                    answer existingAnswer = _surveyRepository.CheckAnswerExist(ans);
                    if (existingAnswer != null)
                    {
                        if (scale.ToList()[i] != 0)
                        {
                            existingAnswer.IntAnswer = scale.ToList()[i];
                            existingAnswer.SurveyQuestionId = scaleid.ToList()[i];
                            _surveyRepository.UpdateAnswer(existingAnswer);
                        }
                        else
                            _surveyRepository.RemoveAnswer(existingAnswer);
                    }
                    else
                        if (scale.ToList()[i] != 0)
                            _surveyRepository.AddAnswer(ans);
                }
            }

            // For every text-answers
            if (text != null)
            {
                for (int i = 0; i < text.Count; i++)
                {
                    answer ans = new answer
                    {
                        TextAnswer = text.ToList()[i],
                        SurveyQuestionId = textid.ToList()[i]
                    };

                    var existingAnswer = db.answer.Where(a => a.SurveyQuestionId == ans.SurveyQuestionId).FirstOrDefault();
                    if (existingAnswer != null)
                    {
                        if (!string.IsNullOrEmpty(text.ToList()[i]))
                        {
                            existingAnswer.TextAnswer = text.ToList()[i];
                            existingAnswer.SurveyQuestionId = textid.ToList()[i];
                        }
                        else
                            db.Entry(existingAnswer).State = EntityState.Deleted;
                    }
                    else
                        if (!string.IsNullOrEmpty(text.ToList()[i]))
                            db.answer.Add(ans);

                    db.SaveChanges();
                }
            }

            // For every image answer
            if (imgAnsId != null)
            {
                for (int i = 0; i < imgAnsId.Count; i++)
                {
                    if (imgid.ToList()[i] == -1)
                        db.Entry(db.answer.Find(imgAnsId.ToList()[i])).State = EntityState.Deleted;

                    db.SaveChanges();
                }
            }

            if (img != null)
            {
                for (int i = 0; i < img.Count(); i++)
                {
                    if (img.ToList()[i] != null)
                    {
                        string url = AzureUpload(img.ToList()[i]);
                        //string url = "https://nos.nl/data/image/2017/09/12/416754/1008x567.jpg";
                        answer ans = new answer
                        {
                            TextAnswer = url,
                            SurveyQuestionId = imgid.ToList()[i]
                        };
                        db.answer.Add(ans);
                        db.SaveChanges();
                    }
                }
            }            

            // For every drawing answer
            if (drawing != null)
            {
                // For every drawing answer
                for (int i = 0; i < drawing.Count(); i++)
                {
                    if (drawing.ToList()[i] != null)
                    {
                        string url = AzureUpload(drawing.ToList()[i]);
                        answer ans = new answer
                        {
                            TextAnswer = url,
                            SurveyQuestionId = drawingid.ToList()[i]
                        };

                        var existingAnswer = db.answer.Where(a => a.SurveyQuestionId == ans.SurveyQuestionId).FirstOrDefault();
                        if (existingAnswer != null)
                        {
                            existingAnswer.TextAnswer = url;
                            existingAnswer.SurveyQuestionId = drawingid.ToList()[i];
                        }
                        else
                            db.answer.Add(ans);
                        db.SaveChanges();
                    }
                }
            }

            // For every count-answers
            if (count != null)
            {
                for (int i = 0; i < count.Count; i++)
                {
                    answer ans = new answer
                    {
                        IntAnswer = count.ToList()[i],
                        SurveyQuestionId = countid.ToList()[i]
                    };

                    var existingAnswer = db.answer.Where(a => a.SurveyQuestionId == ans.SurveyQuestionId).FirstOrDefault();
                    if (existingAnswer != null)
                    {
                        existingAnswer.IntAnswer = count.ToList()[i];
                        existingAnswer.SurveyQuestionId = countid.ToList()[i];
                    }
                    else
                        db.answer.Add(ans);
                    db.SaveChanges();
                }
            }

            // For each distance answer
            if (distid != null)
            {
                for (int i = 0; i < distid.Count; i++)
                {
                    int id = distAnsId.ToList()[i];

                    if (distid.ToList()[i] == -1)
                    {
                        db.answer.Remove(db.answer.Where(a => a.AnswerId == id).FirstOrDefault());
                    }
                    else
                    {
                        if (distans.ToList()[i] != 0)
                        {
                            answer ans = new answer
                            {
                                SurveyQuestionId = distid.ToList()[i],
                                QuestionChoiceId = dist1.ToList()[i],
                                QuestionChoiceId2 = dist2.ToList()[i],
                                IntAnswer = distans.ToList()[i]
                            };

                            var existingAnswer = db.answer.Where(a => a.AnswerId == id).FirstOrDefault();

                            if (existingAnswer != null)
                            {
                                existingAnswer.IntAnswer = distans.ToList()[i];
                                existingAnswer.QuestionChoiceId = dist1.ToList()[i];
                                existingAnswer.QuestionChoiceId2 = dist2.ToList()[i];
                            }
                            else
                            {
                                db.answer.Add(ans);
                            }
                        }

                        db.SaveChanges();
                    }
                }
            }

            // For each multiplechoice answer
            if (multipleAnsId != null)
            {
                for (int i = 0; i < multipleAnsId.Count; i++)
                {
                    int id = multipleAnsId.ToList()[i];

                    if (multipleid.ToList()[i] == -1)
                    {
                        db.answer.Remove(db.answer.Where(a => a.AnswerId == id).FirstOrDefault());
                    }
                    else
                    {
                        answer ans = new answer
                        {
                            SurveyQuestionId = multipleid.ToList()[i],
                            QuestionChoiceId = multiple.ToList()[i],
                            MultipleChoiceAnswer = multipleAns.ToList()[i]
                        };

                        var existingAnswer = db.answer.Where(a => a.AnswerId == id).FirstOrDefault();

                        if (existingAnswer != null)
                        {
                            existingAnswer.QuestionChoiceId = multiple.ToList()[i];
                            existingAnswer.MultipleChoiceAnswer = multipleAns.ToList()[i];
                        }
                        else if (multipleAns.ToList()[i] != 0)
                        {
                            db.answer.Add(ans);
                        }
                    }

                    db.SaveChanges();
                }
            }

            // For each time-estimation answer
            if (estid != null)
            {
                for (int i = 0; i < estid.Count; i++)
                {
                    int id = estAnsId.ToList()[i];

                    if (estid.ToList()[i] == -1)
                    {
                        db.answer.Remove(db.answer.Where(a => a.AnswerId == id).FirstOrDefault());
                    }
                    else
                    {
                        answer ans = new answer
                        {
                            SurveyQuestionId = estid.ToList()[i],
                            QuestionChoiceId = est.ToList()[i],
                            IntAnswer = estAns.ToList()[i]
                        };

                        var existingAnswer = db.answer.Where(a => a.AnswerId == id).FirstOrDefault();

                        if (existingAnswer != null)
                        {
                            existingAnswer.SurveyQuestionId = estid.ToList()[i];
                            existingAnswer.QuestionChoiceId = est.ToList()[i];
                            existingAnswer.IntAnswer = estAns.ToList()[i];
                        }
                        else if (estAns.ToList()[i] != 0)
                        {
                            db.answer.Add(ans);
                        }
                    }

                    db.SaveChanges();
                }
            }

            // For each 5 minute answer
            if (fiveid != null)
            {
                for (int i = 0; i < fiveid.Count; i++)
                {
                    int id = fiveAnsId.ToList()[i];

                    if (fiveid.ToList()[i] == -1)
                    {
                        db.answer.Remove(db.answer.Where(a => a.AnswerId == id).FirstOrDefault());
                    }
                    else
                    {
                        answer ans = new answer
                        {
                            SurveyQuestionId = fiveid.ToList()[i],
                            QuestionChoiceId = five.ToList()[i],
                            IntAnswer = fiveAns.ToList()[i]
                        };

                        var existingAnswer = db.answer.Where(a => a.AnswerId == id).FirstOrDefault();

                        if (existingAnswer != null)
                        {
                            existingAnswer.SurveyQuestionId = fiveid.ToList()[i];
                            existingAnswer.QuestionChoiceId = five.ToList()[i];
                            existingAnswer.IntAnswer = fiveAns.ToList()[i];
                        }
                        else if (fiveAns.ToList()[i] != 0)
                        {
                            db.answer.Add(ans);
                        }
                    }

                    db.SaveChanges();
                }
            }

            // Confirm or unconfirm Survey
            survey survey = db.survey.Find(Int32.Parse(Request.Form["SurveyId"]));
            if (Request.Form["confirmed"] == "on")
                survey.ConfirmedByInspector = true;
            else if (Request.Form["confirmed"] == null)
                survey.ConfirmedByInspector = false;
            db.SaveChanges();

            // Return
            return RedirectToAction("Index");
        }

        public string AzureUpload(HttpPostedFileBase file)
        {
            // Upload to Azure and return URL as string
            // Get connection-strings from App.config
            string connString = ConfigurationManager.ConnectionStrings["AzureStorageAccount"].ConnectionString;
            string localFolder = ConfigurationManager.AppSettings["sourceFolder"];
            string destContainer = "images";

            // Get a reference to the storage account
            CloudStorageAccount sa = CloudStorageAccount.Parse(connString);
            CloudBlobClient bc = sa.CreateCloudBlobClient();

            // Get a reference to the container
            CloudBlobContainer container = bc.GetContainerReference(destContainer);

            // Create if it doesn't exist yet
            container.CreateIfNotExists();

            // Generate a unique key based on filename and current timestamp
            string key = DateTime.UtcNow.ToString("yyyy-MM-dd-HH:mm:ss") + "-" + file.FileName;

            // Upload Blob
            // Get a blob reference to write the file to
            CloudBlockBlob blob = container.GetBlockBlobReference(key);

            // Start uploading it
            blob.UploadFromStream(file.InputStream);

            return blob.Uri.ToString();
        }
    }
}
