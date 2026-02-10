import express from "express";
import cors from "cors";
import { register } from "./api/auth/register";

const app = express();

app.use(cors());
app.use(express.json());
app.post("/api/auth/register", register);

export default app;
