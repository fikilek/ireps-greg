import React from "react";
import "./EnergyNetwork.css";

const EnergyNetwork = props => {
	const { image } = props;
	return (
		<div className="energy-network">
			<img src={image} alt="energy network" />
		</div>
	);
};

export default EnergyNetwork;
