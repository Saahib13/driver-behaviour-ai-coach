import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const FleetSchema = new Schema(
  {
    name: { type: String, required: true },
    contactInfo: {
      address: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    settings: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export type Fleet = InferSchemaType<typeof FleetSchema> & { _id: mongoose.Types.ObjectId };

export const FleetModel: Model<Fleet> =
  mongoose.models.Fleet || mongoose.model<Fleet>('Fleet', FleetSchema);


