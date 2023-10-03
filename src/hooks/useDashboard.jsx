import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useCollection from "./useCollection";

const useDashboard = () => {
	// set states
	const [asts, setAsts] = useState([]);
	const [trns, setTrns] = useState([]);
	const [erfs, setErfs] = useState([]);

	// get astsData
	const {
		data: astsData,
		// error: astsError,
		// isPending: astsPending,
		// success: astsSuccess,
	} = useCollection("asts");
	// console.log(`astsData`, astsData);

	const {
		data: erfsData,
		// error: erfsError,
		// isPending: erfsPending,
		// success: erfsSuccess,
	} = useCollection("erfs");
	// console.log(`erfsData`, erfsData);

	const {
		data: trnsData,
		// error: trnsError,
		// isPending: trnsPEnding,
		// success: trnsSuccess,
	} = useCollection("trns");
	// console.log(`trnsData`, trnsData);

	// update meter data
	const updateMetersData = () => {
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
			// ...new Set(metersArray.map(item => item.astData.meter.phase)),
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
	const updateAstsData = () => {
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
					astCat: astCat,
					total: astCount,
				});
			});
		// console.log(`astsArray`, astsArray);

		return { total: asts.length, items: astsArray };
	};

	// update erfs data
	const updateErfsData = () => {
		// console.log(`erfs`, erfs);

		// get an array of existing erf statuses
		const erfStatuses = [...new Set(erfs.map(item => item.erfStatus))];
		// console.log(`erfStatuses`, erfStatuses);

		// count occurance of each item in the array
		const erfsArray = [];
		erfStatuses &&
			erfStatuses.forEach(erfStatus => {
				const total =
					erfs && erfs.filter(erf => erf.erfStatus === erfStatus).length;
				erfsArray.push({
					erfStatus: erfStatus,
					total: total,
				});
			});
		// console.log(`erfsArray`, erfsArray);

		return { total: erfs.length, items: erfsArray };
	};

	// update trns data
	const updateTrnsData = () => {
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
					trnType: trnType,
					total: trnTypeCount,
				});
			});
		// console.log(`trnTypesArray`, trnTypesArray);

		return { total: trns.length, items: trnTypesArray };
	};

	useEffect(() => {
		setAsts(astsData);
		setTrns(trnsData);
		setErfs(erfsData);

		return () => {
			setAsts([]);
			setAsts([]);
			setAsts([]);
		};
	}, [astsData, trnsData, erfsData]);

	return { updateMetersData, updateAstsData, updateErfsData, updateTrnsData };
};

export default useDashboard;
