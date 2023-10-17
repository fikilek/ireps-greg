import React from "react";
import "./EnergyNetworkAsts.css";

import cb3 from "../../images/cb3.png";
import meter7 from "../../images/meter7.jpg";
import meter6 from "../../images/meter6.jpg";
import transformer2 from "../../images/transformer2.png";
import feeder1 from "../../images/feeder1.jpg";
import feeder2 from "../../images/feeder2.jpg";
import feeder3 from "../../images/feeder3.jpg";
import seal4 from "../../images/seal4.jpg";
import seal2 from "../../images/seal2.jpg";
import seal1 from "../../images/seal1.jpg";
import box3 from "../../images/box3.png";
import pole1 from "../../images/pole1.png";
import pole2 from "../../images/pole2.jpg";

const EnergyNetworkAsts = () => {
	return (
		<div className="energy-network-asts">
			<img className="ena img-meter" src={meter7} alt={"meter"} />
			<img className="ena img-cb" src={cb3} alt={"cb"} />
			<img className="ena img-feeder" src={feeder2} alt={"feeder"} />
			<img className="ena img-seal" src={seal2} alt={"seal"} />
			<img className="ena img-box" src={box3} alt={"box"} />
			<img className="ena img-meter" src={meter6} alt={"meter"} />
			<img className="ena img-pole" src={pole2} alt={"pole"} />
			<img className="ena img-feeder" src={feeder1} alt={"feeder"} />
			<img className="ena img-seal" src={seal1} alt={"seal1"} />
			<img className="ena img-feeder" src={pole1} alt={"feeder"} />
			<img className="ena img-feeder" src={feeder3} alt={"feeder"} />
			<img
				className="ena img-transfomrer"
				src={transformer2}
				alt={"transformer"}
			/>
		</div>
	);
};

export default EnergyNetworkAsts;
