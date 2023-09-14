import React from "react";
import "./NotAuthenticated.css";

const NotAuthenticated = () => {
	return (
		<div className="not-authenticated">
			<h1>User not authenticated</h1>
			<button>Go to home page</button>
		</div>
	);
};

export default NotAuthenticated;
