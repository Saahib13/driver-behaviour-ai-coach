import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const FeedbackSchema = new Schema(
  {
    driverId: { type: Schema.Types.ObjectId, ref: 'Driver', index: true, required: true },
    fleetId: { type: Schema.Types.ObjectId, ref: 'Fleet', index: true, required: true },
    tripId: { type: Schema.Types.ObjectId, ref: 'Trip' },
    feedbackText: { type: String, required: true },
    category: { type: String, index: true },
    relevantMetrics: { type: Schema.Types.Mixed },
    isUnread: { type: Boolean, default: true },
    tags: [{ type: String }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type Feedback = InferSchemaType<typeof FeedbackSchema> & { _id: mongoose.Types.ObjectId };

export const FeedbackModel: Model<Feedback> =
  mongoose.models.Feedback || mongoose.model<Feedback>('Feedback', FeedbackSchema);


