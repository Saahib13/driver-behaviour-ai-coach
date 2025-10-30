import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const VehicleSchema = new Schema(
  {
    fleetId: { type: Schema.Types.ObjectId, ref: 'Fleet', index: true, required: true },
    geotabDeviceId: { type: String, unique: true, index: true, required: true },
    vin: { type: String },
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    licensePlate: { type: String },
    assignedDriverId: { type: Schema.Types.ObjectId, ref: 'Driver', index: true },
    active: { type: Boolean, default: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export type Vehicle = InferSchemaType<typeof VehicleSchema> & { _id: mongoose.Types.ObjectId };

export const VehicleModel: Model<Vehicle> =
  mongoose.models.Vehicle || mongoose.model<Vehicle>('Vehicle', VehicleSchema);


