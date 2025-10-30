import { Router } from 'express';
import { DriverModel } from '../models/Driver.js';

export const driversRouter = Router();

driversRouter.get('/', async (req, res, next) => {
  try {
    const { fleetId } = req.query;
    const filter: any = {};
    if (fleetId) filter.fleetId = fleetId;
    const drivers = await DriverModel.find(filter).limit(100).lean();
    res.json(drivers);
  } catch (err) {
    next(err);
  }
});

driversRouter.post('/', async (req, res, next) => {
  try {
    const driver = await DriverModel.create(req.body);
    res.status(201).json(driver);
  } catch (err) {
    next(err);
  }
});

driversRouter.get('/:id', async (req, res, next) => {
  try {
    const driver = await DriverModel.findById(req.params.id).lean();
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (err) {
    next(err);
  }
});


