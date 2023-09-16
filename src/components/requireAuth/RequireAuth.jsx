import React from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { useEffect } from "react";

const getUserClaims = rolesObj => {
	// console.log(`rolesObj`, rolesObj)
	const claimsArray = [];
	for (const role in rolesObj) {
		if (rolesObj[role]) {
			claimsArray.push(role);
		}
	}
	// console.log(`claimsArray`, claimsArray)
	return claimsArray;
};

const RequireAuth = ({ children, allowedRoles }) => {
	// console.log(`RequireAuth rendering`);
	// console.log(`allowedRoles`, allowedRoles);
	const { user, isAuthReady } = useAuthContext();
	// console.log(`user`, user);
	// console.log(`isAuthReady`, isAuthReady);

	const { openModal, closeModal } = useModal();

	const location = useLocation();
	// console.log(`location`, location);

	// get user roles
	const userRoles = user?.claims;
	// console.log(`userRoles`, userRoles)

	// conver userRoles ino an array
	const userClaimsArray = getUserClaims(userRoles);
	// console.log(`userClaimsArray`, userClaimsArray);

	const navigate = useNavigate();

	useEffect(() => {
		// console.log(`uesEffect running [isAuthReady]:`, isAuthReady);
		// console.log(`user:`, user);
		// console.log(`allowedRoles:`, allowedRoles);
		// console.log(`userClaimsArray:`, userClaimsArray);
		if (isAuthReady) {
			if (!user) {
				// console.log(`user not signed in`);
				openModal({ modalName: "signin", payload: { location } });
			}
			// check if user role is permitted to access resourse
			if (allowedRoles) {
				const allowed = userClaimsArray?.find(role => allowedRoles?.includes(role));
				if (!allowed) {
					console.log(`allowed`, allowed);
					navigate("/unauthorised");
				}
			}
		}
	}, [user, isAuthReady, userClaimsArray]);
	return <>{children}</>;
};

// TODO: See if only one signin page can be used. At the moment, its a modal and a page. Only one should be used

export default RequireAuth;
