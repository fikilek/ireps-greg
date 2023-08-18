import React from "react";
import "./User.css";
import { useParams } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserTrnsStats from "./UserTrnsStats";
import UserNotifications from "./UserNotifications";
import UserDeployment from "./UserDeployment";
import UserTools from "./UserTools";

const User = () => {
	const userId = useParams();

	// console.log(userId);
	return (
		<div className="user">
			<div className="user-section user-details">
				<UserDetails />
			</div>
			<div className="user-section user-trns">
				<UserTrnsStats />
			</div>
			<div className="user-section user-notificatiions">
				<UserNotifications />
			</div>
			<div className="user-section user-deployment">
				<UserDeployment />
			</div>
			<div className="user-section user-tools">
				<UserTools />
			</div>
		</div>
	);
};

export default User;
