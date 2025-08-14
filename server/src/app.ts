import "reflect-metadata";
import "./infrastructure/inversify.config";

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

//Routes
import AuthRoutes from "./presentation/routes/authRoutes";

export const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", AuthRoutes);
