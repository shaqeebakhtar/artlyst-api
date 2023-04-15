import express, { Express, json } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { APP_PORT } from "./utils";
const app: Express = express();

dotenv.config();
const PORT: string = process.env.PORT || (APP_PORT as string);

app.use(json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
