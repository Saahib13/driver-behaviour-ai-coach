import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const DiagnosticSchema = new Schema(
  {
    driverId: { type: Schema.Types.ObjectId, ref: 'Driver', index: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', index: true },
    fleetId: { type: Schema.Types.ObjectId, ref: 'Fleet', index: true },
    tripId: { type: Schema.Types.ObjectId, ref: 'Trip' },
    timestamp: { type: Date, required: true, index: true },
    faultCode: { type: String, required: true, index: true },
    description: { type: String },
    severity: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type Diagnostic = InferSchemaType<typeof DiagnosticSchema> & { _id: mongoose.Types.ObjectId };

export const DiagnosticModel: Model<Diagnostic> =
  mongoose.models.Diagnostic || mongoose.model<Diagnostic>('Diagnostic', DiagnosticSchema);


