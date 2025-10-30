import { buildApp } from './app.js';
import { connectToDatabase } from './config/db.js';
import { config } from './config/env.js';
import { createGeotabClient } from './services/geotabClient.js';

async function main() {
  try {
    await connectToDatabase();
    const app = buildApp();
    // Initialize Geotab client and perform a non-fatal connectivity check
    const hasGeotabConfig = Boolean(
      config.geotabServer && config.geotabDatabase && config.geotabUsername && config.geotabPassword,
    );
    if (hasGeotabConfig) {
      const geotab = createGeotabClient({
        server: config.geotabServer,
        database: config.geotabDatabase,
        username: config.geotabUsername,
        password: config.geotabPassword,
      });
      app.locals.geotab = geotab;
      try {
        await geotab.authenticate();
        // eslint-disable-next-line no-console
        console.log('[geotab] Connectivity check succeeded', {
          server: config.geotabServer,
          database: config.geotabDatabase,
          username: config.geotabUsername,
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[geotab] Connectivity check failed (non-fatal):', e);
      }
    } else {
      // eslint-disable-next-line no-console
      console.warn('[geotab] Missing GEOTAB_* config. Skipping Geotab initialization.');
    }
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on http://localhost:${config.port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

main();


