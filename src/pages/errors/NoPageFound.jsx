import React from "react";
import './NoPageFound.css'
import oops1 from '../../images/oops1.jpg'

const NoPageFound = () => {
	return (
		<div className="no-page-found">
			<img src={oops1} alt="error 404" />
			<h3 className="npf-404">Page Not Found</h3>
			<button className="npf-go-home-btn" >Go to back</button>
		</div>
	);
};

export default NoPageFound;
