import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || '',
  geotabServer: process.env.GEOTAB_SERVER || '',
  geotabDatabase: process.env.GEOTAB_DATABASE || '',
  geotabUsername: process.env.GEOTAB_USERNAME || '',
  geotabPassword: process.env.GEOTAB_PASSWORD || '',
};

if (!config.mongoUri) {
  // Intentionally throw early to avoid silent misconfigurations in dev
  // Keep it simple; production can handle differently later
  // eslint-disable-next-line no-console
  console.warn('[config] MONGODB_URI is not set. Set it in .env');
}

// Geotab configuration warnings are non-fatal for now
if (!config.geotabServer || !config.geotabDatabase || !config.geotabUsername || !config.geotabPassword) {
  // eslint-disable-next-line no-console
  console.warn('[config] One or more GEOTAB_* environment variables are missing. Geotab integration will be inactive.');
}


