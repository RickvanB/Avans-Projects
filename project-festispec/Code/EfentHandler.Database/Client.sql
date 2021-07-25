CREATE TABLE [dbo].[client]
(
	[ClientId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [CompanyName] VARCHAR(MAX) NOT NULL, 
    [KvKNumber] INT NULL, 
    [EstablishmentNumber] INT NULL, 
    [Street] VARCHAR(50) NOT NULL, 
	[HouseNumber] INT NOT NULL, 
    [HouseNumberAddition] CHAR NULL, 
    [City] VARCHAR(50) NOT NULL, 
    [ZipCode] VARCHAR(6) NOT NULL, 
    [Phone] INT NOT NULL, 
    [Email] VARCHAR(MAX) NOT NULL, 
    [Website] VARCHAR(MAX) NULL, 
    [Lat] FLOAT NULL, 
    [Long] FLOAT NULL
)
