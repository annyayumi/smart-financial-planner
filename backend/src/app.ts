import express from "express";
import cors from "cors";
import publicRoutes from "./routes/public";
import privateRoutes from "./routes/private";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", publicRoutes);
app.use("/api", privateRoutes);

export default app;
