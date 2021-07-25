/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
:r .\Seed\usertype.sql
:r .\Seed\user.sql
:r .\Seed\availability.sql

:r .\Seed\client.sql
:r .\Seed\contactperson.sql
:r .\Seed\request.sql

:r .\Seed\chart_type.sql
:r .\Seed\status.sql
:r .\Seed\assignment.sql
:r .\Seed\questiontype.sql
:r .\Seed\question.sql
:r .\Seed\question_choice.sql

:r .\Seed\survey.sql
:r .\Seed\multiplechoiceanswer.sql
:r .\Seed\survey_question.sql
:r .\Seed\answer.sql

:r .\Seed\schedule.sql
:r .\Seed\user_assignment.sql