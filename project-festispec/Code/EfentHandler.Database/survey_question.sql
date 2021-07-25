CREATE TABLE [dbo].[survey_question]
(
	[SurveyQuestionId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [SurveyId] INT NOT NULL, 
    [QuestionId] INT NOT NULL, 
    CONSTRAINT [FK_survey_question_survey] FOREIGN KEY ([SurveyId]) REFERENCES [survey]([SurveyId]) ON DELETE CASCADE,
	CONSTRAINT [FK_survey_question_question] FOREIGN KEY ([QuestionId]) REFERENCES [question]([QuestionId]) ON DELETE CASCADE
)
