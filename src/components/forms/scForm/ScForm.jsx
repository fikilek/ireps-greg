import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { timestamp } from "../../../firebaseConfig/fbConfig";

// sc initial value
const scInit = {
	meter: "",
	cb: "",
	erfNo: "",
};

// getTrnAstData declaration
const updateTrnWithScn = (ast, trn, setTrn, updatedSc) => {
	// console.log(`ast`, ast)
	// console.log(`trn`, trn)

	// get ast id and ast catergory
	const { id } = ast;
	// console.log(`id`, id);

	// get ast category
	const { astCartegory } = ast.astData;

	// get ast array from trn
	const astArray = trn.astData[astCartegory];
	// console.log(`astArray`, astArray);

	// get the ast object with id
	const astObj = astArray.find(ast => ast.id === id);
	// console.log(`astObj`, astObj);

	// get sc array
	const { scns } = astObj.trnData.boxInstallation;
	// console.log(`scns`, scns);
	// console.log(`updatedSc`, updatedSc);

	// find index of the updated scn
	const index = scns.findIndex(sc => sc.scId === updatedSc.scId);

	// onto the astOb, append trnData
	const updatedTrnDataWithNewSc = {
		...astObj,
		trnData: {
			...astObj?.trnData,
			boxInstallation: {
				...astObj.trnData?.boxInstallation,
				scns: scns.with(index, updatedSc),
			},
		},
	};
	// console.log(`updatedTrnDataWithNewSc`, updatedTrnDataWithNewSc);
	return updatedTrnDataWithNewSc;
};

// getTrnAstData declaration
const getTrnAstData = (ast, trn, setTrn, serviceConnection) => {
	// console.log(`ast`, ast)
	// console.log(`trn`, trn)

	// get ast id and ast catergory
	const { id } = ast;
	// console.log(`id`, id);

	// get ast category
	const { astCartegory } = ast.astData;

	// get ast array from trn
	const astArray = trn.astData[astCartegory];
	// console.log(`astArray`, astArray);

	// get the ast object with id
	const astObj = astArray.find(ast => ast.id === id);
	// console.log(`astObj`, astObj);

	// onto the astOb, append trnData
	const updatedTrnDataWithNewSc = {
		...astObj,
		trnData: {
			...astObj?.trnData,
			boxInstallation: {
				...astObj.trnData?.boxInstallation,

				scns: [...astObj.trnData.boxInstallation?.scns, serviceConnection],
			},
		},
	};
	// console.log(`updatedTrnDataWithNewSc`, updatedTrnDataWithNewSc);
	return updatedTrnDataWithNewSc;
};

const ScForm = props => {
	// console.log(`props`, props);
	const { scn, setScn, ast, trn, setTrn } = props;
	// console.log(`scn`, scn);

	// get ast id
	// const astId = ast.id;
	// console.log(`astId`, astId);

	// get ast category
	const astCat = ast.astData.astCartegory;

	// create state for barebones sc using a react controlled element form
	const [sc, setSc] = useState(scInit);
	// console.log(`sc`, sc);

	useEffect(() => {
		// console.log(`scn`, scn);

		if (scn) {
			setSc({
				meter: scn.scData.meter,
				cb: scn.scData.cb,
				erfNo: scn.scData.erfNo,
			});
		}
	}, [scn]);

	const handleScChange = e => {
		e.preventDefault();
		setSc({
			...sc,
			[e.target.id]: e.target.value,
		});
	};

	const handleAddScToTrn = e => {
		e.preventDefault();

		if (sc.meter === "" && sc.cb === "" && sc.erfNo === "") return null;

		let trnAstData = null;

		if (scn) {
			// its an existing scn - edit
			// console.log(`EXISTING scn`, scn);

			const updatedSc = {
				...scn,
				scUpdatedAtDatetime: timestamp.fromDate(new Date()),
				scData: sc,
			};
			// console.log(`updatedSc`, updatedSc);

			trnAstData = updateTrnWithScn(ast, trn, setTrn, updatedSc);
		} else {
			// its a new scn - ceate a service connection
			// console.log(`NO scn`);

			const serviceConnection = {
				scId: nanoid(),
				scCreatedAtDatetime: timestamp.fromDate(new Date()),
				scData: sc,
			};
			// console.log(`serviceConnection`, serviceConnection);

			// get trn ast array data
			trnAstData = getTrnAstData(ast, trn, setTrn, serviceConnection);
			// console.log(`trnAstData`, trnAstData);
		}

		// update trn
		setTrn({
			...trn,
			astData: {
				...trn.astData,
				[astCat]: [trnAstData],
			},
		});

		setSc(scInit);
		// if (setScn) {
		setScn(null);
	};

	return (
		<div>
			<div className="sc-form">
				{/* <form> */}
				<input
					type="text"
					// name="meter"
					id="meter"
					value={sc.meter}
					onChange={handleScChange}
					placeholder="Meter"
				/>
				<input
					type="text"
					// name="cb"
					id="cb"
					value={sc.cb}
					onChange={handleScChange}
					placeholder="Cb"
				/>
				<input
					type="text"
					// name="erfNo"
					id="erfNo"
					value={sc.erfNo}
					onChange={handleScChange}
					placeholder="ErfNo"
				/>
				<button type="submit" onClick={handleAddScToTrn}>
					<MdAddCircleOutline />
				</button>
				{/* </form> */}
			</div>
		</div>
	);
};

export default ScForm;
