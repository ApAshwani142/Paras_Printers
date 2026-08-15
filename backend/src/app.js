import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

//import quoteRoutes from "./routes/quoteRoutes.js";
//import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { getCsrfToken, csrfProtection } from "./middleware/csrfMiddleware.js";
import { requestId } from "./middleware/requestId.js";

const app = express();

app.disable("x-powered-by");

app.set("trust proxy", 1);

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
  })
);

// Body size limits
app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(
  express.urlencoded({
    extended: false,
    limit: "20kb",
  })
);

app.use(requestId); 

// Cookies
app.use(cookieParser());

// Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Paras Printers API is running",
    timestamp: new Date().toISOString(),
  });
});

app.get(
  "/api/auth/csrf",
  getCsrfToken
);

app.use(
  "/api/auth",
  csrfProtection,
  authRoutes
);

/*
app.use(
  "/api/quote",
  csrfProtection,
  quoteRoutes
);

app.use(
  "/api/contact",
  csrfProtection,
  contactRoutes
);
*/

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handle
app.use(errorHandler);

export default app;