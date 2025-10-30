# Driver Behavior AI Coach

Backend (Node.js + TypeScript + Express + Mongoose)

## Quick start

1. Copy env and set your MongoDB URI:

```
cp .env.example .env
# edit .env to set MONGODB_URI
```

2. Install dependencies:

```
npm install
```

3. Run in development (hot reload):

```
npm run dev
```

4. Build and run production:

```
npm run build
npm start
```

## Environment variables

- MONGODB_URI: your Atlas connection string
- PORT (optional): default 4000

## API Endpoints

- GET /health → { status, db, version }
- Drivers: GET /api/v1/drivers, POST /api/v1/drivers, GET /api/v1/drivers/:id
- Vehicles: GET /api/v1/vehicles, POST /api/v1/vehicles, GET /api/v1/vehicles/:id
- Trips: GET /api/v1/trips

