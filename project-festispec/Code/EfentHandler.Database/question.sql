CREATE TABLE [dbo].[question]
(
	[QuestionId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [Question] VARCHAR(MAX) NOT NULL, 
    [Image] VARCHAR(MAX) NULL, 
    [QuestionTypeId] INT NOT NULL, 
    [EditedByEmployee] INT NOT NULL, 
	  [ChartTypeId] INT NULL
    CONSTRAINT [FK_question_questiontype] FOREIGN KEY ([QuestionTypeId]) REFERENCES [questiontype]([QuestionTypeId]),
	  CONSTRAINT [FK_question_chart] FOREIGN KEY ([ChartTypeId]) REFERENCES [chart_type]([ChartTypeId])
)
