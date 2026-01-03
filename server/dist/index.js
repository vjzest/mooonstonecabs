"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
// -------------------- SIMPLE LOG FUNCTION --------------------
function log(msg) {
    console.log(msg);
}
// -------------------------------------------------------------
const app = (0, express_1.default)();
// ---------------------- FIXED CORS ----------------------
const ALLOWED_ORIGINS = [
    "https://moonstone-cabs.vercel.app", // Vercel frontend (production)
    "https://moonstonecabs.onrender.com", // Render backend internal requests
    "http://localhost:5173", // Local Vite
    "http://127.0.0.1:5173",
    "http://localhost:3000", // Local Next.js
    "http://127.0.0.1:3000",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // allow server-to-server
        if (ALLOWED_ORIGINS.includes(origin))
            return callback(null, true);
        console.warn("❌ CORS BLOCKED ORIGIN:", origin);
        return callback(new Error("CORS policy: Origin not allowed"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// FIX OPTIONS ERRORS
app.options("*", (0, cors_1.default)());
// ---------------- PARSERS ----------------
app.use(express_1.default.json({
    verify: (req, _res, buf) => {
        req.rawBody = buf;
    },
}));
app.use(express_1.default.urlencoded({ extended: false }));
// ---------------- LOGGER ----------------
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let bodyJson;
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
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri) {
        try {
            await mongoose_1.default.connect(mongoUri);
            log("✅ Connected to MongoDB");
        }
        catch (err) {
            console.error("❌ Failed to connect to MongoDB:", err);
        }
    }
    const server = await (0, routes_1.registerRoutes)(app);
    // Health check
    app.get("/", (_req, res) => {
        res
            .status(200)
            .send("<h1>Moonstone Cabs API</h1><p>Server is running successfully.</p>");
    });
    // Error handler
    app.use((err, _req, res, _next) => {
        const status = err.status || 500;
        res.status(status).json({ error: err.message || "Server Error" });
        console.error("Server Error:", err);
    });
    const port = parseInt(process.env.PORT || "5000");
    server.listen(port, () => {
        log(`🚀 Server running at http://localhost:${port}`);
    });
})();
