import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

const Unps = () => {
	const navigate = useNavigate();
	return (
		<div className="unps">
			<table>
				<thead>
					<tr>
						<th>Surname</th>
						<th>Name</th>
						<th>ID</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Kentane</td>
						<td>
							<button onClick={() => navigate("1")}>Fikile</button>
						</td>
						<td>680416 6044 808</td>
					</tr>
					<tr>
						<td>Kentane</td>
						<td>
							<button onClick={() => navigate("2")}>Siya</button>
						</td>
						<td>680416 6044 808</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Unps;
