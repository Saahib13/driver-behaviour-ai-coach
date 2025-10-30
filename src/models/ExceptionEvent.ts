import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const ExceptionEventSchema = new Schema(
  {
    tripId: { type: Schema.Types.ObjectId, ref: 'Trip', index: true },
    driverId: { type: Schema.Types.ObjectId, ref: 'Driver', index: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', index: true },
    fleetId: { type: Schema.Types.ObjectId, ref: 'Fleet', index: true },
    eventType: { type: String, required: true, index: true },
    timestamp: { type: Date, required: true, index: true },
    latitude: { type: Number },
    longitude: { type: Number },
    severity: { type: Number },
    relatedMetricValue: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type ExceptionEvent = InferSchemaType<typeof ExceptionEventSchema> & { _id: mongoose.Types.ObjectId };

export const ExceptionEventModel: Model<ExceptionEvent> =
  mongoose.models.ExceptionEvent || mongoose.model<ExceptionEvent>('ExceptionEvent', ExceptionEventSchema);


