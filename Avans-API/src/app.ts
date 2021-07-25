import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import {Router} from 'express';
import avansAuthRoutes from './api/routes/avansAuthentication';
import localAuthRoutes from './api/routes/localAuthentication';
import middleware from './api/middleware';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import morgan from 'morgan';

var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('../swagger.json');

import './controllers/companiesController';
import './controllers/majorsController';
import './controllers/timeslotsController';
import './controllers/roundsController';
import './controllers/speedmeetController';
import './controllers/studentController';
import './controllers/adminController';

import { RegisterRoutes } from './api/routes/routes';

let app = express();

//Logging
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Mount favicon
app.use(favicon('./favicon.ico'));

// Trust proxy in 'production'
if (app.get('env') === 'production') {
    app.set('trust proxy', true);
}

// Add preflight headers
app.use(cors());

// Load routes
app.use(Router().use('/auth/avans', avansAuthRoutes));
app.use(Router().use('/auth/local', localAuthRoutes));
RegisterRoutes(app);

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle not found
app.use(middleware.notFound);

// Handle errors
app.use(middleware.error);


export default app;