import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'manager' },
    fleetId: { type: Schema.Types.ObjectId, ref: 'Fleet', index: true },
    status: { type: String, default: 'active' },
    settings: { type: Schema.Types.Mixed },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

export const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', UserSchema);


