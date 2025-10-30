import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const AuthSessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    sessionToken: { type: String, required: true, index: true },
    issuedAt: { type: Date, default: () => new Date() },
    expiresAt: { type: Date, required: true, index: true },
    lastUsedAt: { type: Date },
    userAgent: { type: String },
    ipAddress: { type: String },
  },
  { timestamps: false }
);

export type AuthSession = InferSchemaType<typeof AuthSessionSchema> & { _id: mongoose.Types.ObjectId };

export const AuthSessionModel: Model<AuthSession> =
  mongoose.models.AuthSession || mongoose.model<AuthSession>('AuthSession', AuthSessionSchema);


