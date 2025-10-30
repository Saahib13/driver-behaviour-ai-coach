import { Router } from 'express';
import { driversRouter } from './drivers.routes.js';
import { vehiclesRouter } from './vehicles.routes.js';
import { tripsRouter } from './trips.routes.js';
import { testRouter } from './test.routes.js';

export function buildApiRouter(): Router {
  const router = Router();
  router.use('/drivers', driversRouter);
  router.use('/vehicles', vehiclesRouter);
  router.use('/trips', tripsRouter);
  router.use('/test', testRouter);
  return router;
}


