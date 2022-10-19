import "./home.scss";
import { BsFillPersonPlusFill } from "react-icons/bs";
import Form from "../form/Form";
import { useState } from "react";
import Employees from "../employees/Employees";

const Home: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);
	const handleShow = () => {
		setShow(!show);
	};

	return (
		<div className="home">
			<div className="container">
				<h1>Employee Management System</h1>
				<button type="submit" onClick={handleShow}>
					<span>{show ? "Close" : "Add Employee"}</span>
					<BsFillPersonPlusFill />
				</button>
				<hr className="line"></hr>
				{show && <Form />}
				<Employees />
			</div>
		</div>
	);
};

export default Home;
