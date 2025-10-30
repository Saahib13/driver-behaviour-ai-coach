import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const StatusDataSchema = new Schema(
  {
    tripId: { type: Schema.Types.ObjectId, ref: 'Trip', index: true },
    driverId: { type: Schema.Types.ObjectId, ref: 'Driver', index: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', index: true },
    fleetId: { type: Schema.Types.ObjectId, ref: 'Fleet', index: true },
    timestamp: { type: Date, index: true, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    speed: { type: Number },
    rpm: { type: Number },
    throttlePct: { type: Number },
    engineLoad: { type: Number },
    fuelRate: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

StatusDataSchema.index({ tripId: 1, timestamp: 1 });

export type StatusData = InferSchemaType<typeof StatusDataSchema> & { _id: mongoose.Types.ObjectId };

export const StatusDataModel: Model<StatusData> =
  mongoose.models.StatusData || mongoose.model<StatusData>('StatusData', StatusDataSchema);


