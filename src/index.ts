import express from "express";
import { NODE_ENV, PORT, MONGO_URI } from "./helpers/envConfig";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import connectDb from "./helpers/connectDB";
import compression from "compression";
import { errorMiddleware } from "./middleware/errors/errorMiddleware";
import contactRouter from "./routes/contact.route";

// Allowed origins for CORS
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDb(MONGO_URI); // Pass your MongoDB URI here

// Middlewares
app.use(helmet()); // Security headers

// Logging based on environment (development/production)
const logFormat = NODE_ENV === "development" ? "dev" : "combined";
app.use(morgan(logFormat));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies to be sent
  })
);

// Routes
app.get("/", (_, res) => {
  res.send("Server is running!");
});

app.use("/api", contactRouter);

// 404 Handler for non-existent routes (must come after routes)
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handling Middleware (must come after routes and 404 handler)
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
