CREATE TABLE [dbo].[survey]
(
	[SurveyId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Name] VARCHAR(50) NOT NULL, 
	[Date] DATE NULL, 
    [ConfirmedByEmployee] BIT NULL DEFAULT 0, 
    [ConfirmedByInspector] BIT NULL DEFAULT 0, 
    [IsTemplate] BIT NOT NULL DEFAULT 0, 
	[ParentSurvey] INT NULL DEFAULT NULL, 
    [AssignmentId] INT NULL,
	[AssignedEmployee] INT NULL, 
    CONSTRAINT [FK_survey_assignment] FOREIGN KEY ([AssignmentId]) REFERENCES [assignment]([AssignmentId]),
	CONSTRAINT [FK_survey_user] FOREIGN KEY ([AssignedEmployee]) REFERENCES [user]([UserId]) ON DELETE CASCADE,
	CONSTRAINT [FK_survey_survey] FOREIGN KEY ([ParentSurvey]) REFERENCES [survey]([SurveyId])
)
