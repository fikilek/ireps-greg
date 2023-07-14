import React, { useState, useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import useModal from "../../hooks/useModal";
import { newTrnData } from "../../data/adminData/adminData.js";
import { timestamp } from "../../firebaseConfig/fbConfig";
import { astNextState } from "../../data/adminData/adminData.js";
import { formSects } from "../forms/formComponents/formSections/formSects";
import { useErf } from "../../hooks/useErf";
import { useDocument } from "../../hooks/useDocument";

const getAstData = erf => {
	// an erf already has an array of all asts in it. They are in asts property. Go inside asts property and extract needed astData as well as catInstallation ( and catCommissining data if it there).

	// step 1: destructire asts array
	const { asts } = erf;
	// console.log(`asts`, asts);

	if (!asts) return null;

	// create astData object. THis will go into trn inspection object
	const astData = {};

	// step 2: iterate through asts to get each ast
	asts &&
		asts.forEach(ast => {
			// console.log(`ast---------------------------------`, ast);

			// destructure astId
			const { astId } = ast;
			// console.log(`astId`, astId);

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

	// return astData;
};

const TableBtnTrnSelect = params => {
	// console.log(`params.data`, params.data);
	const { user } = useAuthContext();

	// const [erf, setErf] = useState({});
	let erf = {};

	const { getAstData } = useErf();

	// ------------------------------------------------
	// console.log(`params.data.erfData.id`, params.data?.erfData?.id);

	// get erf id from params.data?.erfData?.id
	const erfId = params.data?.erfData?.id;
	// console.log(`erfId`, erfId);

	// get erf document from useFirestore
	useDocument("erfs", erfId).then(doc => {
		// console.log(`doc.document?.asts`, doc.document?.asts);
		// setErf(doc.document);
		erf = doc.document;
		// console.log(`erf`, erf);
	});

	//-------------------------------------------------

	const { astState, astCartegory, astNo } = params.data.astData;

	const [newTrn, setNewTrn] = useState(newTrnData);
	// console.log(`newTrn`, newTrn);
	const [poTrns, setPoTrns] = useState([]);
	// console.log(`poTrns`, poTrns);
	// const { astData } = params.data;
	const { openModal } = useModal();

	// console.log(`-------------------------------------`);
	// console.log(`astNextState`, astNextState);
	// console.log(`astCartegory`, astCartegory);
	// console.log(`astState`, astState);

	useEffect(() => {
		const possibleTrns = astNextState[astCartegory][astState];
		// console.log(`possibleTrns`, possibleTrns);
		if (possibleTrns) {
			const possibleTrnsArray = Object.keys(possibleTrns);
			// console.log(`possibleTrnsArray`, possibleTrnsArray);
			setPoTrns(possibleTrnsArray);
		}
	}, [astCartegory, astState]);

	// console.log(`newTrnData`, newTrnData);`
	// console.log(`astStateNames`, astStateNames);
	// console.log(`astState`, astState);
	// console.log(`astCartegory`, astCartegory);
	// console.log(`astNo`, astNo);

	useEffect(() => {
		// console.log(`uesEffect to set newTRn`);
		// console.log(`params.data`, params.data);

		setNewTrn({
			// ...newTrnData,
			metaData: {
				...newTrnData.metaData,
				createdAtDatetime: timestamp.fromDate(new Date()),
				createdByUser: user.displayName,
				updatedAtDatetime: timestamp.fromDate(new Date()),
				updatedByUser: user.displayName,
			},
			erfData: params.data.erfData,
		});

		return () => {
			// console.log(`unmounting component`);
			setNewTrn({});
		};
	}, [params, user]);

	const handleChange = e => {
		// console.log(`e.target.value`, e.target.value);

		// getAstData
		const astData = getAstData(erf);
		// console.log(`astData`, astData);

		setNewTrn(prev => {
			// console.log(`prev`, prev);

			// select the appropriate trnData from formSects
			const astCat = params.data?.astData?.astCartegory;
			// console.log(`astCat`, astCat);

			return {
				...prev,
				metaData: {
					...prev.metaData,
					trnType: e.target.value,
				},
				astData:
					e.target.value === "inspection"
						? astData
						: {
								[astCat]: [
									{
										astData: params.data.astData,
										id: params.data.id,
										trnData: formSects[astCat][e.target.value]?.trnData,
									},
								],
						  },
			};
		});
	};

	const openNewTrn = () => {
		console.log(`newTrn`, newTrn);
		if (newTrn.metaData.trnType) {
			openModal({
				modalName: "trnDataForm",
				payload: newTrn,
			});
		}
	};

	return (
		<>
			<button className="table-row-btn" onClick={openNewTrn}>
				NT
			</button>
			<select
				value={newTrn.metaData.trnType}
				onChange={handleChange}
				placeholder=""
			>
				<option key={-1} value={null}>
					{"choose"}
				</option>
				{poTrns &&
					poTrns.map((trn, index) => {
						return (
							<option key={index} value={trn}>
								{trn}
							</option>
						);
					})}
			</select>
		</>
	);
};

export default TableBtnTrnSelect;
