import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="lp lp-main">
				<h2>Welcome to</h2>
				<h1>iREPS</h1>
				<h3>
					<strong>i</strong>ntelligent <strong>R</strong>evenue <strong>E</strong>
					nhancement and <strong>P</strong>rotection <strong>S</strong>lution
				</h3>
			</div>
			<div className="ip info">
				<div className="lp asts">
					<h2>Meter</h2>
					<h1>234</h1>
				</div>
				<div className="ld capabilities">
					<h2>Capabilities</h2>
					<ol>
						<li>Meter Audits</li>
						<li>Meter TID</li>
						<li>Meter Installations</li>
						<li>Meter Comissioning</li>
						<li>Meter Decomissioning</li>
						<li>Meter Inspections</li>
						<li>Meter Vending</li>
					</ol>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
