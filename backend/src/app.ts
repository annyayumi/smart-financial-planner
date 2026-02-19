import express from "express";
import cors from "cors";
import { register } from "./api/auth/register";
import { login } from "./api/auth/login";

const app = express();

app.use(cors());
app.use(express.json());
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

export default app;
