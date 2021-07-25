# Websocket messages

## Server ➡️ client

- timeslot_change
    - data is de timeslot die veranderd is
    - Als een student zicht inschrijft voor een timeslot moet de server in de room `company_<ID>` het timeslot sturen waabij de student gekoppeld is
    - Als een student zicht uitschrijft voor een timeslot moet de server in de room `company_<ID>` het timeslot sturen waabij de student null is

## Client ➡️ server

- subscribe_company
    - data: `{ company_id }`
    - Als de server dit ontvangt moet de socket worden toegevoegd aan de room `company_<ID>`
    - [Socket.IO Rooms](https://socket.io/docs/rooms-and-namespaces/) (met rooms kun je ervoor zorgen dat niet iedere client de messages ontvangt)
    
- unsubscribe_company
    - data: `{ company_id }`
    - Als de server dit ontvangt moet de socket worden verwijderd uit de room `company_<ID>`
    - [Socket.IO Rooms](https://socket.io/docs/rooms-and-namespaces/) (met rooms kun je ervoor zorgen dat niet iedere client de messages ontvangt)

