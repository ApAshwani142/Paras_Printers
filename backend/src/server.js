import "dotenv/config";

import http from "http";

import app from "./app.js";

import {
  connectDB,
  disconnectDB,
} from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start HTTP server only after DB connection succeeds
    server.listen(PORT, () => {
      console.log("=================================");
      console.log("   PARAS PRINTERS API SERVER");
      console.log("=================================");
      console.log(
        `Environment : ${
          process.env.NODE_ENV || "development"
        }`
      );
      console.log(`Port        : ${PORT}`);
      console.log(
        `API         : http://localhost:${PORT}`
      );
      console.log(
        `Health      : http://localhost:${PORT}/api/health`
      );
      console.log("=================================");
    });
  } catch (error) {
    console.error(
      "❌ Server startup failed:",
      error
    );

    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(
    `\n${signal} received. Shutting down gracefully...`
  );

  server.close(async () => {
    console.log("HTTP server closed.");

    try {
      await disconnectDB();

      console.log(
        "✅ MongoDB connection closed."
      );

      console.log(
        "✅ Server shutdown complete."
      );

      process.exit(0);
    } catch (error) {
      console.error(
        "❌ Shutdown error:",
        error
      );

      process.exit(1);
    }
  });
};

// Handle termination signals
process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

// Start application
startServer();