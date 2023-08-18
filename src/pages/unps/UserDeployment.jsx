import React from "react";
import "./UserDeployment.css";

const UserDeployment = () => {
	return (
		<div className="user-data user-deployment">
			<div className="header">
				<h3>Deployment</h3>
				<div>
					Available:{" "}
					<select>
						<option value="Choose">Choose</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</div>
			</div>
			<div className="body user-deployment-body">
				<div className="deployment-item" >
					Deployment Area:
					<select>
						<option value="All">All</option>
						<option value="Area1">Area1</option>
						<option value="Area2">Area2</option>
						<option value="Area3">Area3</option>
						<option value="Area4">Area4</option>
					</select>
				</div>
				<div className="deployment-item" >
					Deployment Stauts:
					<select>
						<option value="Choose">Choose</option>
						<option value="Stand-by">Stand-by</option>
						<option value="Onduty">Onduty</option>
						<option value="Offduty">Offduty</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default UserDeployment;
