import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const TripSchema = new Schema(
  {
    driverId: { type: Schema.Types.ObjectId, ref: 'Driver', index: true, required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', index: true, required: true },
    fleetId: { type: Schema.Types.ObjectId, ref: 'Fleet', index: true, required: true },
    geotabTripId: { type: String, index: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    startLocation: { lat: { type: Number }, lon: { type: Number } },
    endLocation: { lat: { type: Number }, lon: { type: Number } },
    distance: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    averageSpeed: { type: Number, default: 0 },
    metrics: {
      idleTime: { type: Number, default: 0 },
      harshBrakesCount: { type: Number, default: 0 },
      overspeedCount: { type: Number, default: 0 },
      fuelConsumed: { type: Number, default: 0 },
    },
    statusDataCount: { type: Number, default: 0 },
    exceptionEventCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TripSchema.index({ fleetId: 1, startTime: -1 });

export type Trip = InferSchemaType<typeof TripSchema> & { _id: mongoose.Types.ObjectId };

export const TripModel: Model<Trip> =
  mongoose.models.Trip || mongoose.model<Trip>('Trip', TripSchema);


