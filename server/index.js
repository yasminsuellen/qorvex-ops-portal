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

app.get("/api/overview", authenticateToken, (req, res) => {
  res.json({
    totalClients: 148,
    apiCallsThisMonth: "2.4M",
    systemHealth: "Operational"
  });
});

app.get("/api/accounts", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  res.json([
    { name: "Acme Corp",        plan: "Enterprise", status: "Active",  calls: 182400, mrr: 4200, since: "2023-01" },
    { name: "NovaTech",         plan: "Pro",        status: "Active",  calls: 94300,  mrr: 1800, since: "2023-04" },
    { name: "Finex Ltd",        plan: "Enterprise", status: "Active",  calls: 310500, mrr: 5600, since: "2022-09" },
    { name: "Clearwave IoT",    plan: "Enterprise", status: "Active",  calls: 421000, mrr: 6200, since: "2022-06" },
    { name: "BlueSky Media",    plan: "Starter",    status: "Trial",   calls: 12000,  mrr: 300,  since: "2024-05" },
    { name: "Orion Analytics",  plan: "Pro",        status: "Active",  calls: 137800, mrr: 1800, since: "2023-08" },
    { name: "Kastro Health",    plan: "Enterprise", status: "Active",  calls: 509200, mrr: 7400, since: "2021-11" },
    { name: "Driftwood Labs",   plan: "Starter",    status: "Trial",   calls: 8400,   mrr: 300,  since: "2024-06" },
    { name: "Pulsar Retail",    plan: "Pro",        status: "Churned", calls: 0,      mrr: 0,    since: "2023-02" },
    { name: "Meridian Finance", plan: "Enterprise", status: "Active",  calls: 274600, mrr: 5600, since: "2022-03" },
    { name: "Stackforge",       plan: "Pro",        status: "Trial",   calls: 21300,  mrr: 1800, since: "2024-04" },
    { name: "Vanta Systems",    plan: "Enterprise", status: "Churned", calls: 0,      mrr: 0,    since: "2022-12" }
  ]);
});

app.get("/api/metrics", authenticateToken, (req, res) => {
  if (req.user.role === "viewer") {
    return res.status(403).json({ error: "Forbidden" });
  }
  res.json([
    { name: "Events Ingestion", calls: 420000, errorRate: "0.03%", latency: "82ms" },
    { name: "Metrics Agg", calls: 310000, errorRate: "0.02%", latency: "120ms" },
    { name: "Dashboard Feed", calls: 680000, errorRate: "0.01%", latency: "41ms" },
    { name: "Billing Sync", calls: 180000, errorRate: "0.15%", latency: "340ms" }
  ]);
}); 

app.listen(3000, () => {
  console.log("Server running on port 3000");
});