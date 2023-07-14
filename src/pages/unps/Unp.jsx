import React from "react";
import './unp.css';
import { useParams } from "react-router-dom";

const Unp = () => {
	const userId = useParams();
	// console.log(userId);
	return (
		<div className="unp">
			<p>Data for user</p>
			<p>{userId.id}</p>
		</div>
	);
};

export default Unp;
