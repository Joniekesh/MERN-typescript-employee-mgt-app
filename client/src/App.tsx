import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDetails from "./components/employeeDetails/EmployeeDetails";
import Home from "./components/home/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/employee/:id" element={<EmployeeDetails />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
