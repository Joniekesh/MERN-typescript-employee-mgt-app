import "./employeeDetails.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export interface IUser {
	_id: string;
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
	createdAt?: string;
	updatedtedAt?: string;
}

const EmployeeDetails: React.FC = () => {
	const [employee, setEmployee] = useState<IUser>();

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get(`http://localhost:5000/api/users/${id}`);

				setEmployee(res.data);
			} catch (err: any) {
				console.log(err.response.data.msg);
			}
		};
		fetchUser();
	}, [id]);
	console.log(employee?.status);

	const [firstName, setFirstName] = useState<string | undefined>(
		employee?.firstName
	);
	const [lastName, setLastName] = useState<string | undefined>(
		employee?.lastName
	);
	const [address, setAddress] = useState<string | undefined>(employee?.address);
	const [gender, setGender] = useState<string | undefined>(employee?.gender);
	const [email, setEmail] = useState<string | undefined>(employee?.email);
	const [age, setAge] = useState<string | undefined | number>(employee?.age);
	const [phone, setPhone] = useState<string | undefined>(employee?.phone);
	const [salary, setSalary] = useState<string | undefined | number>(
		employee?.salary
	);
	const [status, setStatus] = useState<string | undefined>(employee?.status);

	const handleSubmit = async () => {
		try {
			const res = await axios.put(`http://localhost:5000/api/users/${id}`, {
				firstName,
				lastName,
				email,
				status,
				phone,
				gender,
				salary,
				age,
				address,
			});

			navigate("/");
		} catch (err: any) {
			console.log(err.response.data.msg);
		}
	};

	const handleDelete = async () => {
		await axios.delete(`http://localhost:5000/api/users/${id}`);
		navigate("/");
	};

	return (
		<div className="employeeDetails">
			<Link to="/">
				<button className="backBtn">GO BACK</button>
			</Link>
			<h1>Update Employee</h1>
			<form onSubmit={handleSubmit}>
				<div className="inputGroup">
					<label>First Name</label>
					<input
						type="text"
						placeholder="Employee's first name"
						value={employee?.firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className="inputGroup">
					<label>Last Name</label>
					<input
						type="text"
						placeholder="Employee's last name"
						defaultValue={employee?.lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="inputGroup">
					<label>Address</label>
					<textarea
						placeholder="Employee's address"
						defaultValue={employee?.address}
						onChange={(e) => setAddress(e.target.value)}
					></textarea>
				</div>
				<div className="inputGroup">
					<label>Gender</label>
					<select value={gender} onChange={(e) => setGender(e.target.value)}>
						<option defaultValue={employee?.gender}>{employee?.gender}</option>
						{employee?.gender === "MALE" ? (
							<option value="FEMALE">FEMALE</option>
						) : (
							<option value="MALE">MALE</option>
						)}
					</select>
				</div>
				<div className="inputGroup">
					<label>Email</label>
					<input
						type="email"
						placeholder="Employee's email"
						defaultValue={employee?.email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="inputGroup">
					<label>Age</label>
					<input
						type="number"
						placeholder="Employee's age"
						defaultValue={employee?.age}
						onChange={(e) => setAge(e.target.value)}
					/>
				</div>
				<div className="inputGroup">
					<label>Phone</label>
					<input
						type="text"
						placeholder="Employee's number"
						defaultValue={employee?.phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</div>
				<div className="inputGroup">
					<label>Salary</label>
					<input
						type="number"
						placeholder="Employee's salary"
						defaultValue={employee?.salary}
						onChange={(e) => setSalary(e.target.value)}
					/>
				</div>
				<div className="status">
					<div className="active">
						<input
							type="radio"
							id="active"
							name="status"
							defaultValue="active"
							checked={employee?.status === "active"}
							onChange={(e) => setStatus(e.target.value)}
						/>
						<label>Active</label>
					</div>
					<div className="inactive">
						<input
							type="radio"
							id="inactive"
							name="status"
							value="inactive"
							checked={employee?.status === "inactive"}
							onChange={(e) => setStatus(e.target.value)}
						/>
						<label>Inactive</label>
					</div>
				</div>
				<button type="submit" className="save">
					UPDATE
				</button>
				<button type="button" className="delete" onClick={handleDelete}>
					DELETE
				</button>
			</form>
		</div>
	);
};

export default EmployeeDetails;
