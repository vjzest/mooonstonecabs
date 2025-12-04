import express, { type Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });
import mongoose from "mongoose";
import cors from "cors";
import { registerRoutes } from "./routes";

// -------------------- SIMPLE LOG FUNCTION --------------------
function log(msg: string) {
  console.log(msg);
}
// -------------------------------------------------------------

const app = express();

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// CORS
// Configure CORS. When the frontend sends requests with credentials (cookies or
// Authorization with `fetch(..., { credentials: 'include' })`), the Access-Control-Allow-Origin
// header must NOT be '*' and Access-Control-Allow-Credentials must be true. Use an allowlist
// of origins (frontend production + local dev) and reflect the origin for allowed requests.
const allowedOrigins = [
  'https://moonstone-cabs.vercel.app', // production frontend
  'http://localhost:5174', // local frontend dev
  'http://127.0.0.1:5174',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., server-to-server or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS policy: Origin not allowed'));
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
  })
);

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let bodyJson: any;

  const originalJson = res.json;
  res.json = function (data) {
    bodyJson = data;
    return originalJson.call(this, data);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });

  next();
});

(async () => {
  // ---------------- MONGO CONNECTION ----------------
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri);
      log("✅ Connected to MongoDB");
    } catch (err) {
      console.error("❌ Failed to connect to MongoDB:", err);
    }
  }

  // Register API Routes
  const server = await registerRoutes(app);

  // Basic root route / health check
  app.get("/", (_req, res) => {
    res.status(200).send("<html><body><h1>Moonstone Cabs API</h1><p>Server is running. Use /api routes for the API.</p></body></html>");
  });

  // Error Handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Server Error" });
    console.error("Server Error:", err);
  });

  // ---------------- START SERVER ----------------
  const port = parseInt(process.env.PORT || "5000");

  server.listen(port, () => {
    log(`🚀 Server running at http://localhost:${port}`);
  });
})();
