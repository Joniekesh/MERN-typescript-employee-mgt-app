import User from "../models/user";
import { IUser } from "../types/user";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<
			IUser,
			| "firstName"
			| "lastName"
			| "img"
			| "address"
			| "gender"
			| "email"
			| "age"
			| "phone"
			| "salary"
			| "status"
		>;
		const newUser: IUser = new User({
			firstName: body.firstName,
			lastName: body.lastName,
			img: body.img,
			address: body.address,
			gender: body.gender,
			email: body.email,
			age: body.age,
			phone: body.phone,
			salary: body.salary,
			status: body.status,
		});

		const savedUser: IUser = await newUser.save();
		// const users: IUser[] = await User.find();
		res.status(201).json({ user: savedUser });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users: IUser[] = await User.find();

		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const user: IUser | null = await User.findById(req.params.id);

		if (!user) res.status(404).json({ msg: "User not found" });
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json(err);
	}
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			params: { id },
			body,
		} = req;

		const updatedUser: IUser | null = await User.findByIdAndUpdate(
			{ _id: id },
			body,
			{ new: true }
		);

		res.status(200).json({ user: updatedUser });
	} catch (err) {
		res.status(500).json(err);
	}
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ msg: "User deleted" });
	} catch (err) {
		res.status(500).json(err);
	}
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
