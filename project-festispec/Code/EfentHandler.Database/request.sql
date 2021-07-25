CREATE TABLE [dbo].[request]
(
	[RequestId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Description] VARCHAR(MAX) NOT NULL, 
    [ClientId] INT NOT NULL,
	CONSTRAINT [FK_request_client] FOREIGN KEY ([ClientId]) REFERENCES [client]([ClientId])
)
