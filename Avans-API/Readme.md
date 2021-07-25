# Speedmeet Rest API

## Commands

Run tests:
```shell script
$ npm run test
```

Run ESLint:
```shell script
$ npm run lint
```

Let ESLint fix problems:
```shell script
$ npm run lint -- --fix
```

Run development mode (auto reload server):
```shell script
$ npm run dev
```

Transpile TS to JS:
```shell script
$ npm run tsc
```

## Structure

### Folder structure
```
src                 # All the Typescript source files
|   app.ts          # App entry point
└---api
    └---routes      # Express routes
    └---middlware   # Express middleware
    └---websocket   # Socket.io handlers
└---config          # Environment variables and other configuration
└---models          # Typeorm models/entities
    └---interfaces  # Interfaces for non sql models
└---services        # All business logic here

build               # All the transpiled .js files (not in git)

test                # All the mocha tests
```

### Typeorm models/entities

Only **one** model/entity per file. Give the file the same name as the model. For example if you model name is `User` the filename is `user.ts`.

See `src/models/user.ts` for an example model.

### Services

Don't write the business logic in the express routes, but create a service file for it. For example:

**DON'T DO THIS**
```typescript
route.post('/', async (req, res, next) => {

  // This should be a middleware or should be handled by a library like Joi.
  const userDTO = req.body;
  const isUserValid = validators.user(userDTO)
  if(!isUserValid) {
    return res.status(400).end();
  }

  // Lot of business logic here...
  const userRecord = await UserModel.create(userDTO);
  delete userRecord.password;
  delete userRecord.salt;
  const companyRecord = await CompanyModel.create(userRecord);
  const companyDashboard = await CompanyDashboard.create(userRecord, companyRecord);

  ...whatever...


  // And here is the 'optimization' that mess up everything.
  // The response is sent to client...
  res.json({ user: userRecord, company: companyRecord });

  // But code execution continues :(
  const salaryRecord = await SalaryModel.create(userRecord, companyRecord);
  eventTracker.track('user_signup',userRecord,companyRecord,salaryRecord);
  intercom.createUser(userRecord);
  gaAnalytics.event('user_signup',userRecord);
  await EmailService.startSignupSequence(userRecord)
});
```

**DO THIS**
```typescript
// routes/example.ts
route.post('/', 
  validators.userSignup, // this middleware take care of validation
  async (req, res, next) => {
    // The actual responsability of the route layer.
    const userDTO = req.body;

    // Call to service layer.
    // Abstraction on how to access the data layer and the business logic.
    const { user, company } = await UserService.Signup(userDTO);

    // Return a response to client.
    return res.json({ user, company });
  });

// services/UserService.ts
import UserModel from '../models/user';
import CompanyModel from '../models/company';

export default class UserService() {

  async Signup(user) {
    const userRecord = await UserModel.create(user);
    const companyRecord = await CompanyModel.create(userRecord); // needs userRecord to have the database id 
    const salaryRecord = await SalaryModel.create(userRecord, companyRecord); // depends on user and company to be created
    
    ...whatever
    
    await EmailService.startSignupSequence(userRecord)

    ...do more stuff

    return { user: userRecord, company: companyRecord };
  }
}
```

### Dependency injection

In this project we use [TypeDI](https://github.com/typestack/typedi#usage-with-typescript) for dependency injection.

Getting service in express route:
```typescript
import {Container} from "typedi";

let coffeeMaker = Container.get(CoffeeMaker);
coffeeMaker.make();
``` 

Defining service with dependencies:
```typescript
import {Service} from "typedi";

@Service()
class CoffeeMaker {

    // Define your dependencies in the constructor, typedi will take care of the rest
    constructor(private beanFactory: BeanFactory,
                private sugarFactory: SugarFactory,
                private waterFactory: WaterFactory) {}

    make() {
        this.beanFactory.create();
        this.sugarFactory.create();
        this.waterFactory.create();
    }

}
```

## Migrations

DB + Entity synchonization is true, changes in the model will be applied to the database on runtime.
Changes must be added to migration. Use synchonization for development only.

Synchonization should NOT be used in production. in production only use migrations.

To modify the database use typeorm migrations
Use .env.dev

Create a new migration
```shell script
npm run typeorm-migrate migration:create -- -n migrationName
```

Run all migrations migrations with up methods
```shell script
npm run typeorm-migrate migration:run
```

Revert latest migration with down method
```shell script
npm run typeorm-migrate migration:revert
```

## Query Builder typeorm

Foreign keys MUST be written in camel case in the database and models to ensure the querybuilder correctly generates the sql syntax

right:
companyId

Wrong:
company_id

## Sockets.io Sockets
Note: Zit altijd in de global room!

Room name
broadcast message, object

```
global
speedmeet_change, speedmeet
```

```
companies/:id 
timeslot_change, timeslot
```

```
companies
company_change, company
```


### Socket Broadcast Ontvangen
Eerst Subscriben
```javascript
socket.emit("subscribe", { room: "companies/1" });

```

Vervolgens de listener
```javascript
socket.on('timeslot_change', data => {
    console.log(data);
});
```



## Other repositories

Web: https://github.com/AvansMartijn/Avans-Web

iOS: https://github.com/AvansMartijn/Avans-iOS

Android: https://github.com/AvansMartijn/Avans-Android

## Reference and information

- https://github.com/lukeautry/tsoa (Controllers, Routes, Architecture, Documentation)
- https://github.com/typestack/typedi#usage-with-typescript (Dependency injection)
- https://softwareontheroad.com/ideal-nodejs-project-structure/ (Good structure in nodejs)
- https://github.com/typeorm/typeorm (ORM)
- https://github.com/typeorm/typescript-express-example (ORM example with express)
- https://medium.com/better-programming/typeorm-migrations-explained-fdb4f27cb1b3 (ORM migrations explained)

