import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import winston from "winston";
import morgan from "morgan";
import config from "./config/config.json" assert { type: "json" };
import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";

// Initialize Express application
const app = express();

// CORS options
const corsOptions = {
  origin: [config.frontEndUrl],
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  exposedHeaders: ['Content-Disposition'],
  credentials: true,
};

// Enables CORS for requests
app.use(cors(corsOptions));
// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Set Allowed HTTP headers for cross-origin requests
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Create a Winston logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Setup Morgan to use Winston for logging
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

/** mongoDb connection */
mongoose
  .connect(config.databaseUrl)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("failed to connect MongoDB:", error));

// Server Health Check
app.get("/", (req, res) => {
  res.json({ message: "I'm alive" });
});

/*routes */
authRoutes(app);
fileRoutes(app);

// Set port, listen for requests
const PORT = config.serverPort || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
