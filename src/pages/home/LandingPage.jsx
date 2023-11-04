import React from "react";
import useDashboard from "../../hooks/useDashboard";
import DashboardItemAsts from "./DashboardItemAsts";
import DashboardItemErfs from "./DashboardItemErfs";
import DashboardItemTrns from "./DashboardItemTrns";
import DashboardItemWrapper from "./DashboardItemWrapper";
import "./LandingPage.css";

import EnergyNetworkAsts from "./EnergyNetworkAsts";
import ServiceConnectionAsts from "./ServiceConnectionAsts";
import WhatIs from "./WhatIs";
import WhatIsContent from "./WhatIsContent";
import EnergyNetwork from "./EnergyNetwork";
import energyNetwork6 from "../../images/energyNetwork6.jpg";
import distributionNetwork8 from "../../images/distributionNetwork8.jpg";
// import mainChallenge3 from "../../images/mainChallenge3.jpg";
import WhatIsDiagram from "./WhatIsDiagram";
import meterAlarmMonitoringAndResponse from "../../images/meterAlarmMonitoringAndResponse.jpeg";
import grv2 from "../../images/grv2.JPG";
import installation4 from "../../images/installation4.jpg";

const LandingPage = () => {
	const { updateMetersData, updateAstsData, updateErfsData, updateTrnsData } =
		useDashboard();

	const metersData = updateMetersData();
	// console.log(`metersData`, metersData);

	const astsData = updateAstsData();
	// console.log(`astsData`, astsData);

	const erfsData = updateErfsData();
	// console.log(`erfsData`, erfsData);

	const trnsData = updateTrnsData();
	// console.log(`trnsData`, trnsData);

	return (
		<div className="landing-page">
			<div className="lp-section main-section ">
				<div className="lp-sub-section main ">
					<div className="ireps-splash-page">
						<div className="ireps-fullname">
							<p>
								<strong className="ireps-first-letter">i</strong>ntelligent{" "}
								<strong>R</strong>evenue <strong>E</strong>
								nhancement and <strong>P</strong>rotection <strong>S</strong>olution
								(iREPS)
							</p>
						</div>

						<div className="isp ireps">
							<div className="isp-inner-wrapper">
								<p className="ireps">iREPS</p>
							</div>
						</div>

						<div className="isp what-is-ireps">
							<div className="isp-inner-wrapper">
								{/* what is ireps */}
								<WhatIs
									header={"What is iREPS"}
									whatIsType={"what-is-type-a"}
									topic="what-is-ireps"
								>
									<EnergyNetworkAsts />
									<WhatIsContent
										content={
											<p>
												iREPS is an enterprise mobility application for managing{" "}
												<span className="data-emphasis">Energy Uility</span> assets
											</p>
										}
									/>
								</WhatIs>
							</div>
						</div>
						<div className="isp properly-managed-asts">
							<div className="isp-inner-wrapper">
								{/* properly managed assets */}
								<WhatIs
									header={"Properly Managed Service Connection Assets"}
									whatIsType={"what-is-type-a"}
									topic="properly-managed-asts"
								>
									<ServiceConnectionAsts />
									<WhatIsContent content="Properly managed electricity Service Connections = better and improved revenue collection." />
								</WhatIs>
							</div>
						</div>
						<div className="isp utility-network">
							<div className="isp-inner-wrapper">
								{/* Energy Utility Network - Ther Grid */}
								<WhatIs
									header={"Energy Utility Network - The Grid"}
									whatIsType={"what-is-type-c"}
									topic="energy-network"
								>
									<EnergyNetwork image={energyNetwork6} />
								</WhatIs>
							</div>
						</div>

						<div className="isp distribution-network">
							<div className="isp-inner-wrapper">
								{/* Energy Distribution Network */}
								<WhatIs
									header={"Energy Distribution Network"}
									whatIsType={"what-is-type-a"}
									topic="energy-distribution-network"
								>
									<EnergyNetwork image={distributionNetwork8} />
									<WhatIsContent
										content={
											<p>
												iREPS reigns supreme as the premium solution for many{" "}
												<span className="data-emphasis">challenges</span> in the Energy
												Distribution Network - supporting tracking of all transactions on
												assets.
											</p>
										}
									/>
								</WhatIs>
							</div>
						</div>

						<div className="isp distribution-network-challenges">
							<div className="isp-inner-wrapper">
								{/* Energy Distribution Network */}
								<WhatIs
									header={"Distribution Network / Billing System Challenges"}
									whatIsType={"what-is-type-b"}
									topic="distribution network challenges"
								>
									<WhatIsContent
										content={
											<p>
												Poor Management of goods receiving{" "}
												<span className="data-emphasis">(grv)</span> at stores. Poor record
												keeping makes it difficult track network assets.
											</p>
										}
									/>
									<WhatIsContent
										content={
											<p>
												Poor Management of stores{" "}
												<span className="data-emphasis">checked-out</span> assets for
												installation at customer premises.{" "}
											</p>
										}
									/>

									<WhatIsContent
										content={
											<p>
												Poor Management of assets{" "}
												<span className="data-emphasis">maintenance</span> records.
											</p>
										}
									/>
									<WhatIsContent
										content={
											<p>
												Corruptted and inaccurate{" "}
												<span className="data-emphasis">billing data</span> from poor
												migration and years of no updates resulting in customers not
												receving their bills.
											</p>
										}
									/>

									<WhatIsContent
										content={
											<p>
												Difficulty in producing{" "}
												<span className="data-emphasis"> management reports</span> for
												effective decision making.
											</p>
										}
									/>
								</WhatIs>
							</div>
						</div>

						<div className="isp main-challenge">
							<div className="isp-inner-wrapper">
								{/* The Main challenge of the Erf, Customer, Network and Billing System */}
								<WhatIs
									header={"The Main Challenge Killing Revenue Collection"}
									whatIsType={"what-is-diagram-main-challenge"} // used as a class name
									topic="main-challenge" // used as a class name
								>
									<div className="what-is-container">
										<WhatIsContent
											content={
												<p>
													Billing System is{" "}
													<span className="data-emphasis">deeply compromised</span> by the{" "}
													<span className="data-emphasis">corrupted</span> data.
												</p>
											}
										/>
										<WhatIsContent
											content={
												<p>
													Customers dont receive their monthly bills.{" "}
													<span className="data-emphasis"> No Bill No Pay</span>
												</p>
											}
										/>
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Tariffs</span> info are mostly
													incorrect. This is a BIG problem.
												</p>
											}
										/>
										<WhatIsContent
											content={
												<p>
													Metering equipment is either
													<span className="data-emphasis">
														{" "}
														bridged or bypassed (prime devil)
													</span>
													.
												</p>
											}
										/>{" "}
										<WhatIsContent content={<button>and many more ....</button>} />
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp ireps-offer">
							<div className="isp-inner-wrapper">
								{/* iREPS offer  - iREPS Solution diagram */}
								<WhatIs
									header={"iREPS Offer"}
									whatIsType={"what-is-diagram-ireps-offer"} // used as a class name
									topic="ireps-offer" // used as a class name
								>
									<div className="what-is-container ireps-offer-container">
										<WhatIsContent
											content={
												<p>
													Immediate <span className="data-emphasis">meter temper alarm</span>{" "}
													response. End of electrcity theft ={" "}
													<span className="data-emphasis">RISE</span> in energy revenue
													collection.
												</p>
											}
										/>
										<WhatIsContent
											content={
												<p>
													Billing system{" "}
													<span className="data-emphasis">data cleansing</span>
												</p>
											}
										/>
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Tariffs</span> updates.
												</p>
											}
										/>

										<WhatIsContent content={<button>and many more...</button>} />
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp meter-alarm-monitoring-and-response">
							<div className="isp-inner-wrapper">
								{/* meter alarm mobitoring and response */}
								<WhatIs
									header={"Meter Alarm Monitoring and Response"}
									whatIsType={"what-is-diagram-meter-alarm-monitoring"} // used as a class name
									topic="meter-alarm-monitoring-and-response" // used as a class name
								>
									<div className="what-is-container alarm-monitoring-container">
										<WhatIsContent content={<p></p>} />
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp mamar">
							<div className="isp-inner-wrapper">
								{/* iREPS offer  - life of an asset */}
								<WhatIs
									header={"Meter Alarm Monitoring and Response"}
									whatIsType={"what-is-type-a"}
									topic="meter-monitoring"
								>
									<WhatIsDiagram
										image={{
											img: meterAlarmMonitoringAndResponse,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="mamar-content">
										<ul>
											<li>
												All Meters on AMI are under{" "}
												<span className="data-emphasis">24hr surveilance</span>.
											</li>
											<li>
												Even under <span className="data-emphasis">loadshedding</span>{" "}
												meters remain under monitoring program.
											</li>
											<li>
												Any illegal temper on a meter triggers an
												<span className="data-emphasis">alarm</span> that is immedietly
												dispatched to the iREPS server via AMI network.
											</li>
											<li>
												iREPS immdiatley generates a
												<span className="data-emphasis">
													"Temper Inspection Transactions" (TIT)
												</span>{" "}
												that is automatically dispatched to the relevant fieldworker
												<span className="data-emphasis">MOBILE DEVICE</span> for{" "}
												<span className="data-emphasis">URGENT</span> attention.
											</li>
											<li>
												On receiving <span className="data-emphasis">TIT,</span> the
												fieldworker navigates to the site that issued the alarm.
											</li>
											<li>
												Upon arival on site, the fieldworker do{" "}
												<span className="data-emphasis">site inspection</span> and submit
												the report the{" "}
												<span className="data-emphasis">"Site TEMPER Report"</span>. This is
												followed by any remidal actions as required and ends with{" "}
												<span className="data-emphasis">"Remedial TEMPER Report"</span> .
											</li>
											<li>
												The 24hr meter meter monitoring and response ={" "}
												<span className="data-emphasis">TEMPER FREE</span> meters = optimum
												revenue collection.
											</li>
										</ul>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp life-of-an-ast">
							<div className="isp-inner-wrapper">
								{/* iREPS offer  - life of an asset */}
							</div>
						</div>
					</div>
				</div>
				<div className="lp-sub-section main ">
					<div className="ireps-splash-page">
						<div className="ireps-fullname">
							<p>Transactions</p>
						</div>
						<div className="isp trns-grv">
							<div className="isp-inner-wrapper">
								{/* what is grv */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">GRV</span> Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-grv"
								>
									<WhatIsDiagram
										image={{
											img: grv2,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													The journey of a Energy Distributiin Network asset begins when the
													asset is ordered on a{" "}
													<span className="data-emphasis">Suplly Chain</span> Process
												</p>
											}
										/>

										<WhatIsContent
											content={
												<p>
													{" "}
													A <span className="data-emphasis">witnessed</span> process results
													in oredered goods delivered and received at the{" "}
													<span className="data-emphasis">stores</span>.
												</p>
											}
										/>

										<WhatIsContent
											content={
												<p>
													{" "}
													With iREPS <span className="data-emphasis">GRV form</span> goods
													(assets) are <span className="data-emphasis">received</span> and{" "}
													<span className="data-emphasis">witnessed</span> before packed at
													<span className="data-emphasis">stores</span>.
												</p>
											}
										/>

										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Witnessing</span> of goods
													revceived marks the end of the Supplt Chain process.
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>
						<div className="isp trns-installation">
							<div className="isp-inner-wrapper">
								{/* what is installation */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">Installation</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-installation"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													{" "}
													A succesful meter installation request results in the creation of a
													new meter <span className="data-emphasis">installation</span>{" "}
													transaction form data.
												</p>
											}
										/>
										<WhatIsContent
											content={
												<p>
													{" "}
													Through an <span className="data-emphasis">installation</span>{" "}
													transaction, an asset will be{" "}
													<span className="data-emphasis">checked out</span> of the{" "}
													<span className="data-emphasis">stores</span>. This changes the
													asset to <span className="data-emphasis">checked out</span>
												</p>
											}
										/>
										<WhatIsContent
											content={
												<p>
													{" "}
													Upon submission of the updated installtion form after a succesful
													installtion, the asset state will change from{" "}
													<span className="data-emphasis">"checked out"</span> to{" "}
													<span className="data-emphasis">"field"</span> automatically
													triggering creation of a{" "}
													<span className="data-emphasis">commissioning</span> form data.
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-commissioning">
							<div className="isp-inner-wrapper">
								{/* what is commissioning */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">Commissioning</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-commissioning"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container"></div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-audit">
							<div className="isp-inner-wrapper">
								{/* what is audits */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">Commissioning</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-commissioning"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-tid">
							<div className="isp-inner-wrapper">
								{/* what is tid */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">Commissioning</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-commissioning"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-inspection">
							<div className="isp-inner-wrapper">
								{/* what is inspection */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">Commissioning</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-commissioning"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-alarm">
							<div className="isp-inner-wrapper">
								{/* what is alarm */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">Alarm</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-alarm"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-disconnection">
							<div className="isp-inner-wrapper">
								{/* what is disconnection */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">disconnection</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-disconnection"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-reconnection">
							<div className="isp-inner-wrapper">
								{/* what is reconnection */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">reconnection</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-reconnection"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-vending">
							<div className="isp-inner-wrapper">
								{/* what is vending */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">vending</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-vending"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-decommissioning">
							<div className="isp-inner-wrapper">
								{/* what is decommissioning */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">decommissioning</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-decommissioning"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-missing">
							<div className="isp-inner-wrapper">
								{/* what is missing */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">missing</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-missing"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-return">
							<div className="isp-inner-wrapper">
								{/* what is return */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">return</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-return"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-decommissioning">
							<div className="isp-inner-wrapper">
								{/* what is decommissioning */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">decommissioning</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-decommissioning"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>

						<div className="isp trns-sale">
							<div className="isp-inner-wrapper">
								{/* what is sale */}
								<WhatIs
									header={
										<p>
											What is <span className="data-emphasis">sale</span>
											Transaction?
										</p>
									}
									whatIsType={"what-is-type-a"}
									topic="what-is-sale"
								>
									<WhatIsDiagram
										image={{
											img: installation4,
											alt: "Meter Alarm Monitoring",
										}}
									/>
									<div className="trns-what-is-container">
										<WhatIsContent
											content={
												<p>
													<span className="data-emphasis">Installation</span>
												</p>
											}
										/>
									</div>
								</WhatIs>
							</div>
						</div>
					</div>
					<div className="features"></div>
				</div>
			</div>

			{/* <div className="lp-section items-section">
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
			</div> */}
		</div>
	);
};

export default LandingPage;
