CREATE TABLE [dbo].[schedule]
(
	[ScheduleId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Inspector] INT NOT NULL, 
    [Confirmed] INT NOT NULL, 
    [AssignmentId] INT NOT NULL, 
    CONSTRAINT [FK_schedule_user] FOREIGN KEY ([Inspector]) REFERENCES [user]([UserId]) ON DELETE CASCADE,
	CONSTRAINT [FK_schedule_assignment] FOREIGN KEY ([AssignmentId]) REFERENCES [assignment]([AssignmentId]) ON DELETE CASCADE
)
