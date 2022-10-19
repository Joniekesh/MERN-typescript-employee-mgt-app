import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
dotenv.config();
import userRoute from "./routes/user";

connectDB();
const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`SERVER running on PORT ${PORT}`);
});
