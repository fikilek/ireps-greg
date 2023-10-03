import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { timestamp } from "../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../hooks/useAuthContext";
import useModal from "../../../hooks/useModal";
import { formSects } from "../../forms/formComponents/formSections/formSects";
import "./TabsErfs.css";
import { TabsErfsClusterMap } from "./tabsMap/TabsErfsClusterMap";
// import TabsErfsMap from "./tabsMap/TabsErfsMap";
import TabsErfsTable from "./tabsTable/TabsErfsTable";
import TabsErfsTree from "./tabsTree/TabsErfsTree";

// prepare asts for trn by going to th erf and get each ast in the erf and prepare an array of all of them
const getTrnObjectsArray = erf => {
	console.log(`erf`, erf);

	// an erf already has an array of all asts in it. They are in asts property. Go inside asts property and extract needed astData as well as catInstallation ( and catCommissining data if it there).

	// step 1: destructire asts array
	const { asts } = erf;
	console.log(`asts`, asts);

	if (!asts) return null;

	// create astData object. THis will go into trn inspection object
	const astData = {};

	// step 2: iterate through asts to get each ast
	asts &&
		asts.forEach(ast => {
			// console.log(`ast---------------------------------`, ast);

			// destructure astId
			const { astId } = ast;
			console.log(`astId`, astId);

			// get astCat from ast
			const astCat = ast.astData.astCartegory;
			// console.log(`astCat`, astCat);

			// get trnData from formSects and insert into ast
			const { trnData } = formSects[astCat].inspection;
			// console.log(`trnData`, trnData);

			// insrt into ast
			ast = {
				...ast,
				trnData,
			};

			if (astCat) {
				if (!astData[astCat]) {
					// we dont have astData[astCat], create it
					astData[astCat] = [];
					// console.log(`astData[astCat]`, astData[astCat]);

					// remove trnMetaData rom ast
					delete ast.trnMetaData;
					// console.log(`ast`, ast);

					// push trnObject into astData[astCat]
					astData[astCat].push(ast);
				} else {
					// console.log(`astCat [${astCat}] alrerady EXIST in the mix`);

					// we already have astData[astCat]. Check is astId is already present in astData[astCat].
					const astIdExist = astData[astCat].some(ast => ast.astId === astId);
					if (astIdExist) {
						// There already is astId in the mix
						// console.log(`There is astId`, astId);

						// removeastData and trnMetaData rom ast
						delete ast.trnMetaData;
						delete ast.astData;
						delete ast.astId;
						// console.log(`ast`, ast);

						// extract data
						const astTrnName = Object.entries(ast)[0][0];
						// console.log(`astTrnName`, astTrnName);

						// fint the index of the existing astId
						const astIdIndex = astData[astCat].findIndex(ast => ast.astId === astId);
						// console.log(`astIdIndex`, astIdIndex);

						// insert ast into astData.[astCat][index]
						astData[astCat][astIdIndex] = {
							...astData[astCat][astIdIndex],
							[astTrnName]: ast[astTrnName],
							// trnData
						};
						// astData[astCat].with(Number(astIdIndex), ast[`${astCat}Commissioning`] );
						// console.log(`astData[astCat][astIdIndex]`, astData[astCat][astIdIndex]);
						// console.log(`astData[${astCat}]`, astData[astCat]);
					} else {
						// there is no astId yet
						// console.log(`There is NO astId`, astId);
						// push trnObject into astData[astCat]
						astData[astCat].push(ast);
						// console.log(`astData[astCat]`, astData[astCat]);
					}
				}
			}
		});

	// console.log(`astData`, astData);

	return astData;
};

// create a trn for each row {metaData, erfData, tranData}
const getNewTrnsArray = (selectedRows, trnType, user) => {
	// console.log(`selectedRows`, selectedRows);
	const trns = [];

	// console.log(`astData`, astData)

	if (selectedRows.lenght === 0) return trns;

	if (selectedRows) {
		selectedRows.map(row => {
			// if trnType is inspection, get all asts in the erf and create astData for each

			let astData = {};
			if (trnType === "inspection") {
				astData = getTrnObjectsArray(row);
				// console.log(`astData`, astData);
				if (!astData) return null;
			}

			// const { astsInErf, astsCount } = trnObjectsArray;
			// console.log(`astsInErf`, astsInErf);
			// console.log(`trnType`, trnType);

			if (
				trnType === "installation" ||
				trnType === "audit" ||
				trnType === "inspection"
			) {
				// console.log(`push trn`);
				const trn = {
					metaData: {
						createdAtDatetime: Timestamp.now(),
						createdByUser: user.displayName,
						createdByUserId: user.uid,
						updatedAtDatetime: Timestamp.now(),
						updatedByUser: user.displayName,
						trnHistory: 0, // how many times transaction has been updated
						trnType: trnType, //['installation', 'inspection', 'audit']
						trnNo: "",
						trnState: "draft",
					},
					erfData: row,
					astData,
				};
				// console.log(`trn`, trn);
				return trns.push(trn);
			}
		});
		// console.log(`trns`, trns);
		return trns;
	}
};

const trnOptions = [
	{ key: "choose", value: "choose" },
	{ key: "audit", value: "audit" },
	{ key: "inspection", value: "inspection" },
	// { key: "installation", value: "installation" },
];

const TabsErfs = props => {
	// console.log(`TabsErfs props`, props);

	const [trnType, setTrnType] = useState("");
	// console.log(`trnType`, trnType);

	const { purpose } = props;
	// console.log(`purpose`, purpose);

	const [active, setActive] = useState("tabs-map");

	const [selectedRows, setSelectedRows] = useState([]);
	// console.log(`selectedRows`, selectedRows);

	const { openModal } = useModal();
	const { user } = useAuthContext();

	const handleTabClick = e => {
		// console.log(`e.target.id`, e.target.id)
		setActive(e.target.id);
	};

	const createNewTrns = () => {
		// console.log(`trnType`, trnType);
		if (trnType) {
			// open a modal to preview the new trns only of there is trnType. The new trn btn is diabled if no trn type is selected
			const newTrnsArray = getNewTrnsArray(selectedRows, trnType, user);
			// console.log(`newTrnsArray`, newTrnsArray);
			// step 2: open the modal. It wil be from the modal that the new trns will be sent to firebase
			if (newTrnsArray.length > 0) {
				openModal({
					modalName: "tableTrnsFromErfs",
					payload: { newTrnsArray, trnType },
				});
				setTrnType("choose");
			}
		}
	};

	useEffect(() => {
		setTrnType("choose");
	}, []);

	return (
		<div className="tabs">
			<div className="tabs-header">
				<div className="tab-title">
					<p>Erfs Table</p>
				</div>

				{/* new trsnaction btn */}
				{purpose === "firestoreErfs" ? (
					<div className="new-trn-div">
						{" "}
						<button
							className="new-trn new-trn-btn"
							disabled={
								trnType === "choose" || selectedRows.length === 0 ? true : false
							}
							onClick={createNewTrns}
						>
							NT
						</button>{" "}
						<select
							className="new-trn new-trn-select"
							value={trnType}
							onChange={e => setTrnType(e.target.value)}
							placeholder="Store Name"
						>
							{trnOptions &&
								trnOptions.map(trn => {
									return (
										<option key={trn.key} value={trn.value}>
											{trn.value}
										</option>
									);
								})}
						</select>
					</div>
				) : (
					<div></div>
				)}

				{/* tabs */}
				<div className="tabs-btns">
					{" "}
					<div
						className={`tabs-header-table ${
							active === "tabs-table" ? "tab-active" : ""
						} tabs-tab`}
						id="tabs-table"
						onClick={handleTabClick}
					>
						Table
					</div>
					<div
						className={`tabs-header-map ${
							active === "tabs-map" ? "tab-active" : ""
						} tabs-tab`}
						id="tabs-map"
						onClick={handleTabClick}
					>
						Map
					</div>
					{/* <div
						className={`tabs-header-tree ${
							active === "tabs-tree" ? "tab-active" : ""
						} tabs-tab`}
						id="tabs-tree"
						onClick={handleTabClick}
					>
						Tree
					</div> */}
				</div>

				{/* <div className="tab-name">{ml1}</div> */}
			</div>
			<div className="tabs-body">
				<div
					className={`tabs-body-content tabs-table ${
						active === "tabs-table" ? "tabs-show" : "tabs-hide"
					}  `}
					id="tabs-table"
				>
					<TabsErfsTable {...props} setSelectedRows={setSelectedRows} />
				</div>
				<div
					className={`tabs-body-content tabs-map ${
						active === "tabs-map" ? "tabs-show" : "tabs-hide"
					} `}
					id="tabs-map"
				>
					{/* <TabsErfsMap {...props} /> */}
					<TabsErfsClusterMap {...props} />
				</div>
				<div
					className={`tabs-body-content tabs-tree ${
						active === "tabs-tree" ? "tabs-show" : "tabs-hide"
					} `}
					id="tabs-tree"
				>
					{/* <TabsErfsTree {...props} /> */}
				</div>
			</div>
		</div>
	);
};

export default TabsErfs;
