import express from "express";
import mainRouter from "../routes";
import errorMiddleware from "./errorMiddleware";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", mainRouter);

app.use(errorMiddleware);
export default app;
