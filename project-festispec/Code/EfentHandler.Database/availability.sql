CREATE TABLE [dbo].[availability]
(
	[AvailabilityId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Date] DATE NOT NULL, 
    [UserId] INT NOT NULL, 
    CONSTRAINT [FK_availability_user] FOREIGN KEY ([UserId]) REFERENCES [user]([UserId]) ON DELETE CASCADE
)