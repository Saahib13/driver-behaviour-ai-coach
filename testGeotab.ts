import { GeotabApi } from 'mg-api-node';
import dotenv from 'dotenv';

dotenv.config();

// Validate that .env variables are loaded
const requiredVars = [
  'GEOTAB_USERNAME',
  'GEOTAB_PASSWORD',
  'GEOTAB_DATABASE',
  'GEOTAB_SERVER',
];

const missing = requiredVars.filter((v) => !process.env[v]);
if (missing.length > 0) {
  console.error('⚠️ Missing environment variables:', missing.join(', '));
  process.exit(1);
}

const credentials = {
  userName: process.env.GEOTAB_USERNAME!,
  password: process.env.GEOTAB_PASSWORD!,
  database: process.env.GEOTAB_DATABASE!,
};
const server = process.env.GEOTAB_SERVER!;

// Clean, safe console log
console.log('🔍 Geotab Connection Params:', {
  credentials: {
    userName: credentials.userName,
    password: credentials.password ? '*** (hidden)' : '(missing)',
    database: credentials.database,
  },
  server,
});

const api = new GeotabApi({ credentials, server });

api
  .call('Get', { typeName: 'Device', resultsLimit: 5 })
  .then((result: unknown) => {
    const count = Array.isArray(result) ? result.length : 0;
    console.log('✅ Connected to Geotab API successfully!');
    console.log('📦 Devices fetched:', count);
  })
  .catch((err: unknown) => {
    const message = err instanceof Error ? err.message : String(err);
    console.error('❌ Geotab API connection failed:', message);
    process.exitCode = 1;
  });

  