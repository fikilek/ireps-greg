import React, { useState } from "react";
import "./home.css";
import { municipalData } from "../../data/municipalData/municipalData";
import DashboardCard from "./dashboardCard/DashboardCard";

const selectData = {
	country: "choose",
	province: "",
	dm: "choose",
	lm: "choose",
	town: "choose",
	ward: "choose",
};

const Home = () => {
	const [data, setData] = useState(selectData);
	// console.log(`data`, data);

	// erfs data
	const erfsData = {
		total: 200,
		items: [
			{developedStands: 155},
			{nonDevelopedStand: 45},
			],
	};

	// asts data
	const astsData = {
		total: 900,
		items: [
			{ meters: 300 },
			{ cbs: 300 },
			{ seals: 300 },
		],
	};

	// trns data
	const trnsData = {
		total: 1600,
		items: [
			{audits: 900},
			{inspections: 300},
			{tid: 400},
		],
	};
	const handleChange = e => {
		e.preventDefault();
		console.log(`selected country value :`, e.target.value);
		console.log(`selected country id :`, e.target.id);
		setData(prev => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className="home">
			{/* <div className="home-section home-header"></div> */}
			<div className="home-section home-body">
				<div className="home-body-section home-body__filters">
					<select id="country" onChange={handleChange} value={data.country}>
						{municipalData.countryOptions.map(item => {
							return (
								<option key={item.value} value={item.value}>
									{item.value}
								</option>
							);
						})}
					</select>
					<select id="province" onChange={handleChange} value={data.province}>
						{municipalData.provinceOptions.map(item => {
							if (item.key === data.country) {
								// console.log(`item.key`, item.key);
								// console.log(`data.country`, data.country);
								return (
									<option key={item.value} value={item.value}>
										{item.value}
									</option>
								);
							} else {
								return null;
							}
						})}
					</select>
					<select id="dm" onChange={handleChange} value={data.dm}>
						{municipalData.dmOptions.map(item => {
							if (item.key === data.province) {
								// console.log(`dm item`, item);
								return (
									<option key={item.value} value={item.value}>
										{item.value}
									</option>
								);
							} else {
								return null;
							}
						})}
					</select>
					<select id="lm" onChange={handleChange} value={data.lm}>
						{municipalData.lmOptions.map(item => {
							// console.log(`lm`, lm);
							if (item.key === data.dm) {
								return (
									<option key={item.value} value={item.value}>
										{item.value}
									</option>
								);
							} else {
								return null;
							}
						})}
					</select>
					<select id="town" onChange={handleChange} value={data.town}>
						{municipalData.townOptions.map(item => {
							if (item.key === data.lm) {
								return (
									<option key={item.value} value={item.value}>
										{item.value}
									</option>
								);
							} else {
								return null;
							}
						})}
					</select>
					<select id="ward" onChange={handleChange} value={data.ward}>
						{municipalData.wardOptions.map(item => {
							if (item.key === data.town) {
								return (
									<option key={item.value} value={item.value}>
										{item.value}
									</option>
								);
							} else {
								return null;
							}
						})}
					</select>
				</div>
				<div className="home-body-section home-body__data">
					<DashboardCard dcData={erfsData} name={"erfs"} />
					<DashboardCard dcData={astsData} name={"asts"} />
					<DashboardCard dcData={trnsData} name={"trns"} />
					{/* <DashboardCard name={"other"} /> */}
				</div>
			</div>
		</div>
	);
};

export default Home;
