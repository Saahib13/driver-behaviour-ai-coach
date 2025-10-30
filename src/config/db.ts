import mongoose from 'mongoose';
import { config } from './env.js';

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!config.mongoUri) {
    throw new Error('MONGODB_URI is not configured');
  }

  mongoose.set('strictQuery', true);

  return mongoose.connect(config.mongoUri, {
    // You can set options here if needed; mongoose v8 handles modern defaults
  });
}

export function getDbConnectionState(): 'disconnected' | 'connected' | 'connecting' | 'disconnecting' {
  switch (mongoose.connection.readyState) {
    case 0:
      return 'disconnected';
    case 1:
      return 'connected';
    case 2:
      return 'connecting';
    case 3:
      return 'disconnecting';
    default:
      return 'disconnected';
  }
}


