import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const ReferenceCodeSchema = new Schema(
  {
    category: { type: String, required: true, index: true },
    code: { type: String, required: true, index: true },
    description: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

ReferenceCodeSchema.index({ category: 1, code: 1 }, { unique: true });

export type ReferenceCode = InferSchemaType<typeof ReferenceCodeSchema> & { _id: mongoose.Types.ObjectId };

export const ReferenceCodeModel: Model<ReferenceCode> =
  mongoose.models.ReferenceCode || mongoose.model<ReferenceCode>('ReferenceCode', ReferenceCodeSchema);


