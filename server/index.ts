import express, { type Request, Response, NextFunction } from "express";
// Load environment variables from .env (if present)
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });
import mongoose from 'mongoose';
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// ⭐ ADD THIS BLOCK
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // If MONGODB_URI provided, connect to MongoDB FIRST
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri);
      log('✅ Connected to MongoDB');
    } catch (err) {
      console.error('❌ Failed to connect to MongoDB:', err);
    }
  }

  // NOW register routes (which will initialize storage after Mongo is connected)
  const server = await registerRoutes(app);

  // 🔥 Centralized error handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error("Server Error:", err);
  });

  // ⚙️ Setup Vite only in development mode
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ✅ Safe port and host setup (cross-platform)
  const port = parseInt(process.env.PORT || "5000", 10);
  // Helper: try listening on `port`, if EADDRINUSE try next ports up to `maxAttempts`.
  async function listenWithFallback(srv: import('http').Server, startPort: number, maxAttempts = 10) {
    let attempt = 0;
    let currentPort = startPort;

    return new Promise<number>((resolve, reject) => {
      const tryPort = () => {
        attempt += 1;

        // Attach one-time error handler before calling listen
        const onError = (err: any) => {
          srv.removeListener('listening', onListening);
          if (err && err.code === 'EADDRINUSE') {
            log(`⚠️ Port ${currentPort} in use, trying next port...`);
            attempt < maxAttempts ? (currentPort += 1, setTimeout(tryPort, 150)) : reject(err);
          } else {
            reject(err);
          }
        };

        const onListening = () => {
          srv.removeListener('error', onError);
          resolve(currentPort);
        };

        srv.once('error', onError);
        srv.once('listening', onListening);

        try {
          // Start listening on current port
          srv.listen(currentPort);
        } catch (err) {
          // In case listen throws synchronously
          srv.removeListener('listening', onListening);
          srv.removeListener('error', onError);
          if ((err as any).code === 'EADDRINUSE' && attempt < maxAttempts) {
            currentPort += 1;
            setTimeout(tryPort, 150);
          } else {
            reject(err);
          }
        }
      };

      tryPort();
    });
  }

  try {
    const boundPort = await listenWithFallback(server, port, 10);
    log(`✅ Server running on http://localhost:${boundPort}`);
  } catch (err: any) {
    console.error('Fatal: failed to bind server port:', err);
    process.exit(1);
  }
})();
