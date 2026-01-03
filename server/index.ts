import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { registerRoutes } from "./routes";
import { createServer } from "http";

dotenv.config();

const app = express();

/* -------------------- RAW BODY -------------------- */
declare module "http" {
  interface IncomingMessage {
    rawBody?: Buffer;
  }
}

/* -------------------- CORS -------------------- */
const ALLOWED_ORIGINS = [
  "https://moonstone-cabs.vercel.app",
  "https://moonstonecabs.vercel.app",
  "https://mooonstonecabs-ls9t.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        ALLOWED_ORIGINS.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      console.log("CORS blocked:", origin);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

/* -------------------- BODY PARSERS -------------------- */
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

/* -------------------- LOGGER -------------------- */
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    if (req.path.startsWith("/api")) {
      console.log(
        `${req.method} ${req.path} ${res.statusCode} - ${Date.now() - start}ms`
      );
    }
  });

  next();
});

/* -------------------- SERVER START -------------------- */
(async () => {
  let server;

  try {
    server = await registerRoutes(app);
  } catch (err) {
    console.error("Route register error:", err);
    server = createServer(app);
  }

  app.get("/", (_req, res) => {
    res.status(200).json({
      ok: true,
      message: "Moonstone Cabs API running",
    });
  });

  app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
      res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
      });
    }
  );

  const port = Number(process.env.PORT) || 5000;

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
