import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../types/user";

const userSchema: Schema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
		address: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		salary: {
			type: Number,
		},
		status: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default model<IUser>("User", userSchema);
