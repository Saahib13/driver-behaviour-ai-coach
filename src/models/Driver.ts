import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const DriverSchema = new Schema(
  {
    fleetId: { type: Schema.Types.ObjectId, ref: 'Fleet', index: true, required: true },
    driverCode: { type: String, index: true },
    name: { type: String, required: true },
    hireDate: { type: Date },
    active: { type: Boolean, default: true },
    assignedVehicleIds: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }],
    email: { type: String },
    phone: { type: String },
    metadata: {
      licenseNumber: { type: String },
      licenseExpiry: { type: Date },
    },
  },
  { timestamps: true }
);

export type Driver = InferSchemaType<typeof DriverSchema> & { _id: mongoose.Types.ObjectId };

export const DriverModel: Model<Driver> =
  mongoose.models.Driver || mongoose.model<Driver>('Driver', DriverSchema);


