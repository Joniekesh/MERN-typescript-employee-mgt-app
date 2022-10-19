import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
	const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@employee-mgt.idffxsw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

	try {
		const conn = await mongoose.connect(uri);
		console.log(`MongoDB Connected! ${conn.connection.host}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};
