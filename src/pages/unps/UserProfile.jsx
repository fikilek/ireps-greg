import React from "react";
// import "./UserProfile.css";
import { useParams } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserTrnsStats from "./UserTrnsStats";
import UserNotifications from "./UserNotifications";
import UserDeployment from "./UserDeployment";
import UserTools from "./UserTools";
import useAuthContext from "../../hooks/useAuthContext";
import NotAuthenticated from "../auth/NotAuthenticated";

const UserProfile = (props) => {
	console.log(`props`, props)
	const userId = useParams();

	const { user } = useAuthContext()

	// console.log(userId);
	return (
		user ?
		<div className="user-profile">
			<div className="user-section UserProfile-details">
				<UserDetails />
			</div>
			<div className="user-section UserProfile-trns">
				<UserTrnsStats />
			</div>
			<div className="user-section UserProfile-notificatiions">
				<UserNotifications />
			</div>
			<div className="user-section UserProfile-deployment">
				<UserDeployment />
			</div>
			<div className="user-section UserProfile-tools">
				<UserTools />
			</div>
		</div> : <NotAuthenticated />
	);
};

export default UserProfile;
