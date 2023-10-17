import React from "react";
import "./EnergyNetworkAsts.css";

import cb3 from "../../images/cb3.png";
import cb5 from "../../images/cb5.jpg";
import cb6 from "../../images/cb6.jpg";
import meter7 from "../../images/meter7.jpg";
import meter6 from "../../images/meter6.jpg";
import meter8 from "../../images/meter8.jpg";
import seal2 from "../../images/seal2.jpg";
import seal1 from "../../images/seal1.jpg";
import seal4 from "../../images/seal4.jpg";

const ServiceConnectionAsts = () => {
	return (
		<div className="energy-network-asts">
			<img className="ena img-meter" src={meter7} alt={"meter"} />
			<img className="ena img-cb" src={cb3} alt={"cb"} />
			<img className="ena img-seal" src={seal2} alt={"seal"} />

			<img className="ena img-cb" src={cb5} alt={"cb"} />
			<img className="ena img-seal" src={seal1} alt={"seal1"} />
			<img className="ena img-meter" src={meter6} alt={"meter"} />

			<img className="ena img-cb" src={cb6} alt={"cb"} />
			<img className="ena img-meter" src={meter8} alt={"meter"} />
			<img className="ena img-seal" src={seal4} alt={"seal"} />
		</div>
	);
};

export default ServiceConnectionAsts;
