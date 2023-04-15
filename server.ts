import express, { Express, json } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { APP_PORT } from "./utils";
import errorHandler from "./middlewares/error-handler";
const app: Express = express();

dotenv.config();
const PORT: string = process.env.PORT || (APP_PORT as string);

app.use(json());
app.use("/api", router);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
