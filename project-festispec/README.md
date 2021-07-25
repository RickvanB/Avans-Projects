## Welkom nieuwe ontwikkelaar bij AvansIT!

Om snel aan de slag te kunnen met de activiteit die je het liefst doet, programmeren natuurlijk, is het aan te raden om de onderstaande stappen zorgvuldig te volgen.

_<span style="text-decoration:underline;">Ontwikkelomgeving</span>_
1.  Installeer Microsoft Visual Studio Enterprise 2017 version 15.8.1;
    1. Gebruik version 4.7.03190 van het .NET Framework;
    1. Gebruik version 7.0 van C#.
1.  Lees ondertussen alle informatie op de [Wiki](https://github.com/daanvissers/festispec/wiki) zorgvuldig door om inzicht te krijgen in de scope van het project;
1.  Installeer SourceTree en clone vervolgens de repository van Festispec;
    1.  Wanneer je niet weet hoe die moet, vraag je hulp aan een teamlid of Google je het even.
1.  De master branch bevat de laatste stabiele en werkende versie van het systeem en daarom mogen hier <span style="text-decoration:underline;">geen</span> aanpassingen aan worden gedaan. Check daarom in op de branch waarin jij moet gaan werken. Zie hiervoor ook de [versiebeheerregels](https://github.com/daanvissers/festispec/wiki/2.2-Versiebeheer). 

_<span style="text-decoration:underline;">Database</span>_\
De Visual Studio Solution maakt gebruik van een verbinding met een online database om daar gegevens naartoe te sturen en vanaf te halen. Om met de database verbinding te maken en de database te beheren, volg je de volgende stappen: 

1.  Installeer Microsoft SQL Management Studio;
1.  Start het programma, in het "Connect to Server"-venster, druk op de knop "Options";
1.  Gebruik de volgende gegevens:
    1. Server type: "Database Engine";
    1. Server name: `efenthandler.database.windows.net`
    1. Authentication: "SQL Server Authentication"
    1. Login: `efentadmin`. Password: `2PuntjesopdeF`.
1.  Ga naar het tabblad "Connection Properties";
1.  Vul bij "Connect To Database" `Festispec` in;
1.  Vink "Trust server certificate" aan;

Als alles goed is ingevuld, kun je nu een verbinding leggen met de gehoste database.

Wil je in Visual Studio de online database toevoegen aan je Server Explorer-venster? Volg dan deze stappen:

1.  In Visual Studio, ga in het menu naar Tools > Connect To Database... ;
1.  Vul bij Server Name weer `efenthandler.database.windows.net` in;
1.  Gebruik bij Authentication weer "SQL Server Authentication";
1.  Gebruik dezelfde inloggegevens als bovenstaand;
1.  Vul bij Database Name wederom `Festispec` in;

Wanneer alles goed is ingevuld, zal de database server worden toegevoegd aan je Server Explorer-venster. Je kunt nu vanuit Visual Studio werken met de online gehoste database.

_<span style="text-decoration:underline;">Frameworks</span>_\
Er wordt gebruik gemaakt van meerdere frameworks van een bepaalde versie. Een overzicht van deze frameworks en bijbehorende versie is [hier](https://github.com/daanvissers/festispec/wiki/2.4-Software-architectuur,-frameworks-en-patronen#frameworks) te bekijken.

> [bekijk de coding guidelines](https://github.com/daanvissers/festispec/wiki/2.1-Coding-guidelines)

> [bekijk de regels met betrekking op versiebeheer](https://github.com/daanvissers/festispec/wiki/2.2-Versiebeheer)
