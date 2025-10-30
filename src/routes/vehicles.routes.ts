import { Router } from 'express';
import { VehicleModel } from '../models/Vehicle.js';

export const vehiclesRouter = Router();

vehiclesRouter.get('/', async (req, res, next) => {
  try {
    const { fleetId } = req.query;
    const filter: any = {};
    if (fleetId) filter.fleetId = fleetId;
    const vehicles = await VehicleModel.find(filter).limit(100).lean();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
});

vehiclesRouter.post('/', async (req, res, next) => {
  try {
    const vehicle = await VehicleModel.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
});

vehiclesRouter.get('/:id', async (req, res, next) => {
  try {
    const vehicle = await VehicleModel.findById(req.params.id).lean();
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
});


