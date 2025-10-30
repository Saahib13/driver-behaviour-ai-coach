import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const DriverScoreSchema = new Schema(
  {
    driverId: { type: Schema.Types.ObjectId, ref: 'Driver', index: true, required: true },
    fleetId: { type: Schema.Types.ObjectId, ref: 'Fleet', index: true, required: true },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    safetyScore: { type: Number, required: true },
    efficiencyScore: { type: Number, required: true },
    compositeScore: { type: Number },
    metrics: {
      totalTrips: { type: Number, default: 0 },
      totalDistance: { type: Number, default: 0 },
      totalIdleTime: { type: Number, default: 0 },
      totalHarshBrakes: { type: Number, default: 0 },
      totalOverspeedEvents: { type: Number, default: 0 },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

DriverScoreSchema.index({ driverId: 1, periodStart: 1 });

export type DriverScore = InferSchemaType<typeof DriverScoreSchema> & { _id: mongoose.Types.ObjectId };

export const DriverScoreModel: Model<DriverScore> =
  mongoose.models.DriverScore || mongoose.model<DriverScore>('DriverScore', DriverScoreSchema);


