import React from "react";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserTrnsStats from "./UserTrnsStats";
import UserNotifications from "./UserNotifications";
import UserDeployment from "./UserDeployment";
import UserTools from "./UserTools";

const UserProfile = (props) => {
	console.log(`props`, props)
	const userId = useParams();

	// console.log(userId);
	return (
		<div className="user-profile">
			<div className="UserProfile-section UserProfile-details">
				<UserDetails />
			</div>
			<div className="UserProfile-section UserProfile-trns">
				<UserTrnsStats />
			</div>
			<div className="UserProfile-section UserProfile-notificatiions">
				<UserNotifications />
			</div>
			<div className="UserProfile-section UserProfile-deployment">
				<UserDeployment />
			</div>
			<div className="UserProfile-section UserProfile-tools">
				<UserTools />
			</div>
		</div>
	);
};

export default UserProfile;
