CREATE TABLE [dbo].[contactperson]
(
	[ContactPersonId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [FirstName] VARCHAR(50) NOT NULL, 
    [LastName] VARCHAR(50) NOT NULL, 
	[Role] VARCHAR(50) NOT NULL, 
    [Email] VARCHAR(MAX) NOT NULL, 
    [Phone] INT NOT NULL, 
    [Notes] VARCHAR(MAX) NULL, 
    [ClientId] INT NOT NULL,
	CONSTRAINT [FK_contactperson_client] FOREIGN KEY ([ClientId]) REFERENCES [client]([ClientId])
)
