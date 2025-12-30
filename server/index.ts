import express, { type Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
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

// ---------------------- FIXED CORS ----------------------
const ALLOWED_ORIGINS = [
  "https://moonstone-cabs.vercel.app",       // Vercel frontend (production)
  "https://moonstonecabs.vercel.app",        // Alternative Vercel URL
  "http://localhost:5173",                   // Local Vite
  "http://127.0.0.1:5173",
  "http://localhost:3000",                   // Local Next.js
  "http://127.0.0.1:3000",
  "http://localhost:5000",                   // Local Express dev
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow server-to-server
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);

      console.warn("❌ CORS BLOCKED ORIGIN:", origin);
      return callback(new Error("CORS policy: Origin not allowed"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// FIX OPTIONS ERRORS
app.options("*", cors());

// ---------------- PARSERS ----------------
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

// ---------------- LOGGER ----------------
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

// ---------------- SERVER INIT ----------------
(async () => {
  let server;
  try {
    server = await registerRoutes(app);
  } catch (routeError) {
    console.error("❌ Error registering routes:", routeError);
    console.log("⚠️  Server may have limited functionality");
    // Create a basic HTTP server anyway
    const { createServer } = await import("http");
    server = createServer(app);
  }

  // Health check
  app.get("/", (_req, res) => {
    res
      .status(200)
      .json({ ok: true, message: "🚗 Moonstone Cabs API - Supabase Edition" });
  });

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Server Error" });
    console.error("Server Error:", err);
  });

  const port = parseInt(process.env.PORT || "5000");

  server.listen(port, () => {
    log(`🚀 Server running at http://localhost:${port}`);
  });
})();
