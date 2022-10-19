import "./employees.scss";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

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

const Employees: React.FC = () => {
	const [employees, setEmployees] = useState<IUser[]>([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const res = await axios.get("http://localhost:5000/api/users");
				setEmployees(res.data);
			} catch (error) {}
		};
		fetchEmployees();
	}, []);

	const handleDelete = async (id: string) => {
		await axios.delete(`http://localhost:5000/api/users/${id}`);

		setEmployees(employees.filter((employee) => employee._id !== id));

		try {
		} catch (err: any) {
			console.log(err.response.data.msg);
		}
	};

	return (
		<div className="employees">
			{employees.length > 0 ? (
				<div className="table">
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Salary</th>
								<th>Date</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						{employees.map((employee: IUser) => (
							<tbody key={employee._id}>
								<tr>
									<td>
										<span className="userInfo">
											<img className="userImg" src={employee.img} alt="" />
											<span className="userName">
												{employee.firstName} {employee.lastName}
											</span>
										</span>
									</td>
									<td>{employee.email}</td>
									<td style={{ color: "green", fontWeight: "700" }}>
										{employee.salary}
									</td>
									<td>{employee.createdAt}</td>
									<td style={{ textTransform: "capitalize" }}>
										{employee.status === "active" ? (
											<span style={{ color: "green", fontWeight: "700" }}>
												Active
											</span>
										) : (
											<span style={{ color: "crimson" }}>Inactive</span>
										)}
									</td>
									<td>
										<span className="action">
											<Link to={`/employee/${employee._id}`}>
												<FaRegEdit className="edit" />
											</Link>
											<MdDeleteOutline
												className="delete"
												onClick={() => handleDelete(employee._id)}
											/>
										</span>
									</td>
								</tr>
							</tbody>
						))}
					</table>
				</div>
			) : (
				<h2 style={{ textAlign: "center", opacity: "0.5" }}>
					No employees added yet
				</h2>
			)}
		</div>
	);
};

export default Employees;
