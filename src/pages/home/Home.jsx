import React, { useState } from "react";
import "./home.css";
import { municipalData } from "../../data/municipalData/municipalData";
import DashboardCard from "./dashboardCard/DashboardCard";
import useCollection from "../../hooks/useCollection";
import DashboardCardMeters from "./dashboardCard/DashboardCardMeters";

const selectData = {
	country: "choose",
	province: "",
	dm: "choose",
	lm: "choose",
	town: "choose",
	ward: "choose",
};
// update meter data
const updateMetersData = asts => {
	// console.log(`asts`, asts);

	// filter out only meters from the asts array
	let metersArray = [];
	asts &&
		asts.forEach(astCat => {
			metersArray =
				asts && asts.filter(obj => obj.astData.astCartegory === "meter");
		});
	// console.log(`metersArray`, metersArray);

	// meters data
	let metersData = {
		total: metersArray.length,
		type: [{ conventional: 0 }, { "pre-paid": 0 }],
		phase: [{ single: 0 }, { three: 0 }],
	};

	// get an array of all meter phases
	const metersPhasesArray = [
		...new Set(metersArray.map(item => item.astData.meter.phase)),
	];
	// console.log(`metersPhasesArray`, metersPhasesArray);

	// count phase occurance of each item in the array
	const meterPhasesArray = [];
	metersPhasesArray &&
		metersPhasesArray.forEach(phase => {
			const meterPhaseCount =
				metersArray &&
				metersArray.filter(obj => obj.astData.meter.phase === phase).length;
			meterPhasesArray.push({
				[phase]: meterPhaseCount,
			});
		});
	// console.log(`meterPhasesArray`, meterPhasesArray);

	// get an array of all meter types
	const metersTypeArray = [
		...new Set(metersArray.map(item => item.astData.meter.type)),
	];
	// console.log(`metersTypeArray`, metersTypeArray);

	// count type occurance of each item in the array
	const meterTypesArray = [];
	metersTypeArray &&
		metersTypeArray.forEach(type => {
			const meterTypesCount =
				metersArray &&
				metersArray.filter(obj => obj.astData.meter.type === type).length;
			meterTypesArray.push({
				[type]: meterTypesCount,
			});
		});
	// console.log(`meterTypesArray`, meterTypesArray);

	//from meters array, count ocuureance of each meter state
	const meterStatesArray = [
		{ stores: 0 },
		{ chechekOut: 0 },
		{ field: 0 },
		{ service: 0 },
		{ disconnected: 0 },
	];

	// iterate though metersStatesArray and get total count of each state from metersArray
	meterStatesArray?.forEach((state, index) => {
		// console.log(`state`, state);

		const objKey = Object.keys(state)[0];
		// console.log(`objKey`, objKey);

		const metersOnState = metersArray?.filter(
			meter => meter.astData.astState === objKey
		);
		meterStatesArray[index] = {
			[objKey]: metersOnState.length,
		};
	});
	// console.log(`meterStatesArray`, meterStatesArray);

	// work out the phases  and update metersData
	metersData = {
		...metersData,
		phase: meterPhasesArray,
		type: meterTypesArray,
		states: meterStatesArray,
	};
	// console.log(`metersData`, metersData);

	return { total: metersArray.length, metersData };
};

// update asts data
const updateAstsData = asts => {
	// console.log(`asts`, asts);

	// get an array of all existing cats
	const catsInAsts = [...new Set(asts.map(item => item.astData.astCartegory))];
	// console.log(`catsInAsts`, catsInAsts);

	// count occurance of each item in the array
	const astsArray = [];
	catsInAsts &&
		catsInAsts.forEach(astCat => {
			const astCount =
				asts && asts.filter(obj => obj.astData.astCartegory === astCat).length;
			astsArray.push({
				[astCat]: astCount,
			});
		});
	// console.log(`astsArray`, astsArray);

	return { total: asts.length, items: astsArray };
};

// update erfs data
const updateErfsData = erfs => {
	// console.log(`erfs`, erfs);

	// get an array of existing erf statuses
	const erfStatuses = [...new Set(erfs.map(item => item.erfStatus))];
	// console.log(`erfStatuses`, erfStatuses);

	// count occurance of each item in the array
	const erfsArray = [];
	erfStatuses &&
		erfStatuses.forEach(erfStatus => {
			const erfStatusCount =
				erfs && erfs.filter(erf => erf.erfStatus === erfStatus).length;
			erfsArray.push({
				[erfStatus]: erfStatusCount,
			});
		});
	// console.log(`erfsArray`, erfsArray);

	return { total: erfs.length, items: erfsArray };
};

// update trns data
const updateTrnsData = trns => {
	// console.log(`trns`, trns);

	// get an array of existing erf statuses
	const trnTypes = [...new Set(trns.map(trn => trn.metaData.trnType))];
	// console.log(`trnTypes`, trnTypes);

	// count occurance of each trnTypes in the array
	const trnTypesArray = [];
	trnTypes &&
		trnTypes.forEach(trnType => {
			const trnTypeCount =
				trns && trns.filter(trn => trn.metaData.trnType === trnType).length;
			trnTypesArray.push({
				[trnType]: trnTypeCount,
			});
		});
	// console.log(`trnTypesArray`, trnTypesArray);

	return { total: trns.length, items: trnTypesArray };
};

// asts data
// const astsData_ = {
// 	total: 0,
// 	items: [{ Meters: 0 }, { Cbs: 0 }, { Seals: 0 }],
// };

// erfs data
// const erfsData_ = {
// 	total: 0,
// 	items: [{ "Not Known": 0 }, { Developed: 0 }, { "Not Developed": 0 }],
// };

// trns data
// const trnsData_ = {
// 	total: 0,
// 	items: [{ Audits: 0 }, { Inspections: 0 }, { TID: 0 }],
// };

const Home = () => {
	const [data, setData] = useState(selectData);
	// console.log(`data`, data);

	// get useCollection for collection of collection stats
	const {
		data: asts,
		// error: astsError,
		// isPending: astsPending,
		// success: astsSuccess,
	} = useCollection("asts");
	// console.log(`asts`, asts);
	const updatedAstsData = updateAstsData(asts);
	// console.log(`updatedAstsData`, updatedAstsData);
	const updatedMetersData = updateMetersData(asts);
	// console.log(`updatedMetersData`, updatedMetersData);

	const updatedMeterPhasesData = {
		items: updatedMetersData.metersData.phase,
		total: updatedMetersData.total,
	};
	// console.log(`updatedMeterPhasesData`, updatedMeterPhasesData);

	const updatedMeterTypesData = {
		items: updatedMetersData.metersData.type,
		total: updatedMetersData.total,
	};
	// console.log(`updatedMeterTypesData`, updatedMeterTypesData);

	const updatedMeterStatesData = {
		items: updatedMetersData.metersData.states,
		total: updatedMetersData.total,
	};
	// console.log(`updatedMeterTypesData`, updatedMeterTypesData);

	// const { name, dcData } = updatedMetersData;
	// const { metersData } = dcData;
	// const { phase, type, total } = metersData;

	const {
		data: erfs,
		// error: erfsError,
		// isPending: erfsPending,
		// success: erfsSuccess,
	} = useCollection("erfs");
	// console.log(`erfs`, erfs);
	const updatedErfsData = updateErfsData(erfs);

	const {
		data: trns,
		// error: trnsError,
		// isPending: trnsPEnding,
		// success: trnsSuccess,
	} = useCollection("trns");
	// console.log(`trns`, trns);
	const updatedTrnsData = updateTrnsData(trns);

	const handleChange = e => {
		e.preventDefault();
		// console.log(`selected country value :`, e.target.value);
		// console.log(`selected country id :`, e.target.id);
		setData(prev => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className="home">
			{/* <div className="home-section home-header"></div> */}
			<div className="home-section home-body">
				{/* <div className="home-body-section home-body__filters">
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
				</div> */}
				<div className="home-body-section home-body__data">
					<DashboardCard
						dcData={updatedErfsData}
						name={"Erfs / Stands / Land Parcels"}
					/>
					<DashboardCard dcData={updatedAstsData} name={"Assets"} />
					<DashboardCard dcData={updatedTrnsData} name={"Transactions"} />
					<DashboardCard dcData={updatedMeterPhasesData} name={"Meters - Phases"} />
					<DashboardCard dcData={updatedMeterTypesData} name={"Meters - Types"} />
					<DashboardCard dcData={updatedMeterStatesData} name={"Meters - States"} />
				</div>
			</div>
		</div>
	);
};

export default Home;
