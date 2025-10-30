import { Router } from 'express';

export const testRouter = Router();

testRouter.get('/devices', async (req, res) => {
  const geotab = req.app.locals.geotab as
    | { call: <T = unknown>(method: string, params?: Record<string, unknown>) => Promise<T> }
    | undefined;
  if (!geotab) {
    return res.status(503).json({ ok: false, error: 'Geotab not configured' });
  }
  const limit = Number(req.query.limit ?? 5);
  try {
    const devices = (await geotab.call('Get', { typeName: 'Device', resultsLimit: limit })) as unknown[];
    res.json({ ok: true, count: Array.isArray(devices) ? devices.length : 0, devices });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ ok: false, error: message });
  }
});

testRouter.get('/trips', async (req, res) => {
  const geotab = req.app.locals.geotab as
    | { call: <T = unknown>(method: string, params?: Record<string, unknown>) => Promise<T> }
    | undefined;
  if (!geotab) {
    return res.status(503).json({ ok: false, error: 'Geotab not configured' });
  }
  const limit = Number(req.query.limit ?? 5);
  try {
    const trips = (await geotab.call('Get', { typeName: 'Trip', resultsLimit: limit })) as unknown[];
    res.json({ ok: true, count: Array.isArray(trips) ? trips.length : 0, trips });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ ok: false, error: message });
  }
});


