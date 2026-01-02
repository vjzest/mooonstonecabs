import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { registerRoutes } from '../server/routes';

const app = express();

// Enable CORS
app.use(cors({
  origin: [
    "https://moonstone-cabs.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  credentials: true
}));

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Health check
app.get("/", (_req, res) => {
  res.json({ ok: true, message: "🚗 Moonstone Cabs API" });
});

// Register all routes
registerRoutes(app).catch((err) => {
  console.error("Route registration error:", err);
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response) => {
  console.error("API Error:", err);
  res.status(err.status || 500).json({ 
    success: false,
    error: err.message || "Internal Server Error" 
  });
});

export default app;
