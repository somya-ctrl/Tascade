import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {errorMiddleware} from "./middleware/error.middleware";
import { authMiddleware } from "./middleware/auth.middleware";
import authRoutes from "./routes/auth.routes";
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);

app.use(errorMiddleware);

export default app;
