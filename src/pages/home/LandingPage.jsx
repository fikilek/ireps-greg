import React from "react";
import useDashboard from "../../hooks/useDashboard";
import DashboardItemAsts from "./DashboardItemAsts";
import DashboardItemErfs from "./DashboardItemErfs";
import DashboardItemTrns from "./DashboardItemTrns";
import DashboardItemWrapper from "./DashboardItemWrapper";
import "./LandingPage.css";

const LandingPage = () => {
	const { updateMetersData, updateAstsData, updateErfsData, updateTrnsData } =
		useDashboard();

	const metersData = updateMetersData();
	// console.log(`metersData`, metersData);

	const astsData = updateAstsData();
	console.log(`astsData`, astsData);

	const erfsData = updateErfsData();
	console.log(`erfsData`, erfsData);

	const trnsData = updateTrnsData();
	console.log(`trnsData`, trnsData);

	return (
		<div className="landing-page">
			<div className="lp-section main-section ">
				<div className="lp-sub-section main ">
					<div className="ireps-splash-page">
						<div className="isp ireps-fullname">
							<p>
								<strong className="ireps-first-letter">i</strong>ntelligent{" "}
								<strong>R</strong>evenue <strong>E</strong>
								nhancement and <strong>P</strong>rotection <strong>S</strong>olution
							</p>
						</div>
						<div className="isp ireps-acronym">
							<div className="isp-inner-wrapper">
								<p>iREPS</p>
							</div>
						</div>

						<div className="isp why-ireps">
							<div className="ips-inner-warpper">Why iREPS</div>
						</div>
						<div className="isp who-needs-ireps">
							<div className="ips-inner-warpper">Who needs iREPS</div>
						</div>
					</div>
				</div>
				<div className="lp-sub-section capabilities ">
					<h2>Capabilities</h2>
					<div className="ireps-capabilities">
						<div className="capability installations">Installations</div>
						<div className="capability commissioning">Comissioning</div>
						<div className="capability audits">Audits</div>
						<div className="capability tids">TID</div>
						<div className="capability inspections">Inspections</div>
						<div className="capability disconnections">Disconnections</div>
						<div className="capability reconnetion">Reconnections</div>
						<div className="capability vending">Vending</div>
						<div className="capability decommissioning">Decomissioning</div>
						<div className="capability disposal">Disposal</div>
					</div>
				</div>
			</div>

			<div className="lp-section items-section">
				<DashboardItemWrapper
					astCat={"asts"}
					total={astsData.total}
					title={"Total Assets"}
				>
					<DashboardItemAsts astsData={astsData} />
				</DashboardItemWrapper>

				<DashboardItemWrapper
					astCat={"trns"}
					total={trnsData.total}
					title={"Total Transactions"}
				>
					<DashboardItemTrns trnsData={trnsData} />
				</DashboardItemWrapper>

				<DashboardItemWrapper
					astCat={"erfs"}
					total={erfsData.total}
					title={"Total Erfs / Stands"}
				>
					<DashboardItemErfs erfsData={erfsData} />
				</DashboardItemWrapper>
			</div>
		</div>
	);
};

export default LandingPage;
