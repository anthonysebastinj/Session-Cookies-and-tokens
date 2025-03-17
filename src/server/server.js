import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import crypto from 'crypto';
import authRoutes from './authRoutes.js';

dotenv.config(); // Load .env variables at the very beginning

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI; // Get MongoDB URI from .env

// Generate a random session secret
const session_secret = crypto.randomBytes(32).toString("hex");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

// Configure session
app.use(session({
  secret: session_secret,
  saveUninitialized: false,
  resave: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 }
}));

// Use Routes
app.use("/api/user", authRoutes);

// Connect to MongoDB using the .env variable
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
