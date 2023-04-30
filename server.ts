import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cookieParser from "cookie-parser";
import { APP_PORT } from "./config";
import { errorHandler } from "./middlewares";
import connectDB from "./database";
const app: Express = express();

dotenv.config();
const PORT: string = process.env.PORT || (APP_PORT as string);
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
