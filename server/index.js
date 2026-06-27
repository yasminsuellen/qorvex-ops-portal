import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { login } from "./auth.js";
import { authenticateToken } from "./middleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/auth/login", login);

app.get("/api/me", authenticateToken, (req, res) => {
  res.json(req.user);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});