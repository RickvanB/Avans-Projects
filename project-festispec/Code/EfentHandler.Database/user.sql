CREATE TABLE [dbo].[user]
(
	[UserId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Email] VARCHAR(50) NOT NULL, 
    [Password] VARCHAR(MAX) NOT NULL, 
    [FirstName] VARCHAR(50) NOT NULL, 
    [LastName] VARCHAR(50) NOT NULL, 
    [Street] VARCHAR(50) NOT NULL, 
    [City] VARCHAR(50) NOT NULL, 
    [HouseNumber] INT NOT NULL, 
    [HouseNumberAddition] CHAR NULL, 
	[ZipCode] VARCHAR(6) NOT NULL, 
    [Phone] INT NOT NULL, 
    [ServiceDate] DATE NULL, 
    [Certified] BIT NOT NULL, 
    [CertificationEndDate] DATE NULL, 
    [IBAN] VARCHAR(18) NULL, 
    [UserTypeId] INT NOT NULL, 
	[Lat] FLOAT NULL, 
    [Long] FLOAT NULL,
    CONSTRAINT [FK_user_usertype] FOREIGN KEY ([UserTypeId]) REFERENCES [usertype]([UserTypeId])
)
