import axios, { AxiosInstance } from 'axios';

export type GeotabClientConfig = {
  server: string;
  database: string;
  username: string;
  password: string;
};

export type JsonRpcRequest = {
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
  jsonrpc: '2.0';
};

export type JsonRpcResponse<T = unknown> = {
  id: string | number;
  jsonrpc: '2.0';
  result?: T;
  error?: { code: number; message: string; data?: unknown };
};

export type GeotabClient = {
  authenticate: () => Promise<unknown>;
  call: <T = unknown>(method: string, params?: Record<string, unknown>) => Promise<T>;
};

function ensureOrigin(server: string): string {
  if (!server) return '';
  if (server.startsWith('http://') || server.startsWith('https://')) return server.replace(/\/$/, '');
  return `https://${server.replace(/\/$/, '')}`;
}

export function createGeotabClient(cfg: GeotabClientConfig): GeotabClient {
  const origin = ensureOrigin(cfg.server);
  const baseUrl = origin ? `${origin}/apiv1` : '';
  const http: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    // A reasonable overall timeout; individual calls can override if needed
    timeout: 30000,
  });

  let requestCounter = 0;

  async function send<T = unknown>(method: string, params: Record<string, unknown> = {}): Promise<T> {
    const id = ++requestCounter;

    const payload: any = {
      id,
      method,
      jsonrpc: '2.0',
      params: { ...params },
    };

    // For testing: include credentials on every non-Authenticate request (TOP-LEVEL per MyGeotab spec)
    if (method !== 'Authenticate' && !payload.credentials) {
      payload.credentials = {
        database: cfg.database,
        userName: cfg.username,
        password: cfg.password,
      };
    }

    const { data } = await http.post<JsonRpcResponse<T>>('', payload);
    if (data.error) {
      const err = data.error;
      throw new Error(`Geotab RPC error ${err.code}: ${err.message}`);
    }
    return data.result as T;
  }

  async function authenticate(): Promise<unknown> {
    // Authenticate expects userName, password, database in params (no credentials wrapper)
    return await send('Authenticate', {
      userName: cfg.username,
      password: cfg.password,
      database: cfg.database,
    });
  }

  return {
    authenticate,
    call: send,
  };
}


