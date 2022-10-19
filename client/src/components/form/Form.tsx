import axios from "axios";
import { useState } from "react";
import "./form.scss";

const Form: React.FC = () => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [gender, setGender] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [age, setAge] = useState<string>();
	const [phone, setPhone] = useState<string>("");
	const [salary, setSalary] = useState<string>();
	const [status, setStatus] = useState<string>("");
	const [file, setFile] = useState<File | string>("");

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		setFile(e.target.files[0]);
	};

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "upload");

		try {
			const uploadRes = await axios.post(
				"https://api.cloudinary.com/v1_1/joniekesh/image/upload",
				data
			);
			const { url } = uploadRes.data;

			const res = await axios.post("http://localhost:5000/api/users", {
				firstName,
				lastName,
				address,
				gender,
				email,
				age,
				phone,
				salary,
				status,
				img: url,
			});
			window.location.reload();
		} catch (err: any) {
			console.log(err.response.data.msg);
		}
	};

	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<div className="inputGroup">
					<label>First Name</label>
					<input
						type="text"
						placeholder="Employee's first name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>
				<div className="inputGroup">
					<label>Last Name</label>
					<input
						type="text"
						placeholder="Employee's last name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>
				<div className="inputGroup">
					<label>Address</label>
					<textarea
						placeholder="Employee's address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					></textarea>
				</div>
				<div className="inputGroup">
					<label>Gender</label>
					<select value={gender} onChange={(e) => setGender(e.target.value)}>
						<option value="">SELECT GENDER</option>
						<option value="MALE">MALE</option>
						<option value="FEMALE">FEMALE</option>
						<option value="OTHER">OTHER</option>
					</select>
				</div>
				<div className="inputGroup">
					<label>Email</label>
					<input
						type="email"
						placeholder="Employee's email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="inputGroup">
					<label>Age</label>
					<input
						type="number"
						placeholder="Employee's age"
						value={age}
						onChange={(e) => setAge(e.target.value)}
						required
					/>
				</div>
				<div className="inputGroup">
					<label>Phone</label>
					<input
						type="text"
						placeholder="Employee's number"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
					/>
				</div>
				<div className="inputGroup">
					<label>Salary</label>
					<input
						type="number"
						placeholder="Employee's salary"
						value={salary}
						onChange={(e) => setSalary(e.target.value)}
					/>
				</div>
				<div className="status">
					<div className="active">
						<input
							type="radio"
							id="active"
							name="status"
							value="active"
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
							onChange={(e) => setStatus(e.target.value)}
						/>
						<label>Inactive</label>
					</div>
				</div>
				<div className="inputGroup">
					<label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
						Upload Image
					</label>
					<input
						style={{ display: "none", cursor: "pointer" }}
						type="file"
						id="fileUpload"
						onChange={(e) => handleFile(e)}
						required
					/>
				</div>
				<button type="submit" className="save">
					SAVE
				</button>
			</form>
		</div>
	);
};

export default Form;
