import React from "react";
import "./NotAuthenticated.css";
import oops1 from '../../images/oops1.jpg'

const NotAuthenticated = () => {
	return (
		<div className="no-page-found">
			<img src={oops1} alt="error 404" />
			<h3 className="npf-404">Not Authorised To View Page</h3>
			<button className="npf-go-home-btn">Go back</button>
		</div>
	);
};

export default NotAuthenticated;
