import { Document } from "mongoose";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	img?: string;
	address: string;
	gender: string;
	email: string;
	age: number;
	phone: string;
	salary?: number;
	status: string;
}
