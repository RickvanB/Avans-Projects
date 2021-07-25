CREATE TABLE [dbo].[multiplechoiceanswer]
(
	[MultipleChoiceId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Answer] VARCHAR(MAX) NOT NULL, 
    [QuestionId] INT NOT NULL, 
    CONSTRAINT [FK_multiplechoiceanswer_question] FOREIGN KEY ([QuestionId]) REFERENCES [question]([QuestionId]) ON DELETE CASCADE
)
