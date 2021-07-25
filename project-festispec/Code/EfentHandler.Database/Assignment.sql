CREATE TABLE [dbo].[assignment]
(
	[AssignmentId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Description] VARCHAR(MAX) NOT NULL, 
    [StartDate] DATETIME NOT NULL, 
    [EndDate] DATETIME NOT NULL, 
	[Street] VARCHAR(50) NOT NULL, 
	[HouseNumber] INT NOT NULL, 
    [HouseNumberAddition] VARCHAR NULL, 
    [City] VARCHAR(50) NOT NULL, 
    [ZipCode] VARCHAR(6) NULL, 
    [StatusId] INT NOT NULL, 
	[Request] VARCHAR(MAX) NULL, 
    [Advice] VARCHAR(MAX) NULL, 
    [ClientId] INT NOT NULL, 
	[Lat] FLOAT NULL, 
    [Long] FLOAT NULL,
    CONSTRAINT [FK_assignment_status] FOREIGN KEY ([StatusId]) REFERENCES [status]([StatusId]),
	CONSTRAINT [FK_assignment_client] FOREIGN KEY ([ClientId]) REFERENCES [client]([ClientId])
)
