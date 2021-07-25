CREATE TABLE [dbo].[question_choice]
(
	[QuestionChoiceId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [QuestionId] INT NULL, 
    [Name] VARCHAR(MAX) NOT NULL, 
    CONSTRAINT [FK_question_choice_question] FOREIGN KEY ([QuestionId]) REFERENCES [question]([QuestionId]) ON DELETE CASCADE
)
