import express from "express";
import mainRouter from "../routes";
import errorMiddleware from "./errorMiddleware";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", mainRouter);

app.use(errorMiddleware);
export default app;
