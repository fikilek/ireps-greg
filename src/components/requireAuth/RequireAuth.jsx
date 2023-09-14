import React from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { useEffect } from "react";

const RequireAuth = ({ children }) => {
	const { user, isAuthReady } = useAuthContext();
	console.log(`user`, user);
	console.log(`isAuthReady`, isAuthReady);

	const { openModal, closeModal } = useModal();

	const location = useLocation();
	// console.log(`location`, location);

	// const navigate = useNavigate();

	useEffect(() => {
		if (isAuthReady) {
			if (!user) {
				console.log(`user not signed in`);
				openModal({ modalName: "signin", payload: { location } });
			}
		}
	}, [user, isAuthReady]);
	return <>{children}</>;
};

// TODO: See if only one signin page can be used. At the moment, its a modal and a page. Only one should be used

export default RequireAuth;
