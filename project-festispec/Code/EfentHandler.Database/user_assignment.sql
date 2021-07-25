CREATE TABLE [dbo].[user_assignment]
(
	[User_AssignmentId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
	[UserId] INT NOT NULL,
	[AssignmentId] INT NOT NULL,
    CONSTRAINT [FK_User_User_Assignment] FOREIGN KEY ([UserId]) REFERENCES [user]([UserId]) ON DELETE CASCADE, 
    CONSTRAINT [FK_Assignment_User_Assignment] FOREIGN KEY ([AssignmentId]) REFERENCES [assignment]([AssignmentId]) ON DELETE CASCADE
)