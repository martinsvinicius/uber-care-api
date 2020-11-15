import { Router } from 'express';
import HospitalsController from './controllers/HospitalsController';
import UsersController from './controllers/UsersController';

const routes = Router();

//Hospital routes
routes.get('/hospitals', HospitalsController.index);
routes.get('/hospitals/:id', HospitalsController.show);
routes.post('/hospitals', HospitalsController.create);
routes.delete('/hospitals/:id', HospitalsController.delete);

//User routes
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

export default routes;
