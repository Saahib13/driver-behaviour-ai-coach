import { Router } from 'express';
import { TripModel } from '../models/Trip.js';

export const tripsRouter = Router();

tripsRouter.get('/', async (req, res, next) => {
  try {
    const { driverId, vehicleId, fleetId } = req.query;
    const filter: any = {};
    if (driverId) filter.driverId = driverId;
    if (vehicleId) filter.vehicleId = vehicleId;
    if (fleetId) filter.fleetId = fleetId;
    const trips = await TripModel.find(filter).sort({ startTime: -1 }).limit(100).lean();
    res.json(trips);
  } catch (err) {
    next(err);
  }
});


