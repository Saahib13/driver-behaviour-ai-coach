import { GeotabApi } from 'mg-api-node';
import dotenv from 'dotenv';

dotenv.config();

const api = new GeotabApi({
  credentials: {
    userName: process.env.GEOTAB_USERNAME!,
    password: process.env.GEOTAB_PASSWORD!,
    database: process.env.GEOTAB_DATABASE!,
  },
  server: process.env.GEOTAB_SERVER!,
});

api
  .call('Get', { typeName: 'Device', resultsLimit: 5 })
  .then((result: unknown) => {
    const count = Array.isArray(result) ? result.length : 0;
    // eslint-disable-next-line no-console
    console.log('✅ Connected: fetched devices', { count });
  })
  .catch((err: unknown) => {
    const message = err instanceof Error ? err.message : String(err);
    // eslint-disable-next-line no-console
    console.error('❌ Failed:', message);
    process.exitCode = 1;
  });


