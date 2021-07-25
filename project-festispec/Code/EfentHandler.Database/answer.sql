CREATE TABLE [dbo].[answer]
(
	[AnswerId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Time] TIME(4) NULL, 
    [IntAnswer] INT NULL, 
    [TextAnswer] VARCHAR(MAX) NULL, 
    [MultipleChoiceAnswer] INT NULL, 
	[SurveyQuestionId] INT NOT NULL,
    [QuestionChoiceId] INT NULL, 
    [QuestionChoiceId2] INT NULL, 
    CONSTRAINT [FK_answer_multiplechoiceanswer] FOREIGN KEY ([MultipleChoiceAnswer]) REFERENCES [multiplechoiceanswer]([MultipleChoiceId]),
    CONSTRAINT [FK_answer_survey_question] FOREIGN KEY ([SurveyQuestionId]) REFERENCES [survey_question]([SurveyQuestionId]) ON DELETE CASCADE,
    CONSTRAINT [FK_answer_question_choice] FOREIGN KEY ([QuestionChoiceId]) REFERENCES [question_choice]([QuestionChoiceId]),
    CONSTRAINT [FK_answer_question_choice2] FOREIGN KEY ([QuestionChoiceId2]) REFERENCES [question_choice]([QuestionChoiceId]),
)
