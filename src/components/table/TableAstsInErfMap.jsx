import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useCallback, useMemo, useState } from "react";
import { db } from "../../firebaseConfig/fbConfig";
import { useColDefs } from "../../hooks/useColDefs";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import { useFirestore } from "../../hooks/useFirestore";
import { useViewportDimensions } from "../../hooks/useViewportDimentions";
import Table from "./Table";

const getAstsInErf = trns => {
	let asts = [];
	let erfAstsIds = [];
	trns &&
		trns.forEach(trn => {
			// console.log(`trn`, trn);
			if (!erfAstsIds.includes(trn?.id)) {
				const asset = {
					astData: trn.astData,
					id: trn.id,
					erfData: { id: trn.erfId },
				};
				// console.log(`asset`, asset);
				erfAstsIds.push(trn.id);
				asts.push(asset);
			}
		});
	// console.log(`asts`, asts)
	return asts;
};

const TableAstsInErfMap = props => {
	// console.log(`props`, props);

	// destructure asts from props.data
	const trns = props.rowData;
	// console.log(`trns`, trns);

	const { getViewportDimensions } = useViewportDimensions();
	const viewportDimesions = getViewportDimensions();
	// console.log(`viewportDimesions`, viewportDimesions);

	// const { tableFields: columnDefs } = useColumnDefs({ ml1: "astsInErfMap" });
	const { tableFields: columnDefs } = useColDefs({
		viewportDimesions,
		ml1: "astsInErfMap",
	});
	console.log(`columnDefs`, columnDefs);

	// destructure asts from props.data
	// const columnDefs = props.columnDefs;
	// console.log(`columnDefs`, columnDefs);

	// workout how many asts in the trns array

	const rowData = getAstsInErf(trns);
	// console.log(`rowData`, rowData);

	// add audit trnMedata into the
	let newRowData = [];
	rowData?.forEach(ast => {
		// console.log(`ast`, ast);
		const astId = ast.id;
		// console.log(`astId`, astId);
		// let newAst = {};
		trns &&
			trns.forEach(trn => {
				// console.log(`trn`, trn);
				if (
					(astId === trn.id && trn.trnMetaData.trnType === "audit") ||
					(astId === trn.id && trn.trnMetaData.trnType === "installation")
				) {
					// console.log(`trn.trnMetaData.trnType`, trn.trnMetaData.trnType);
					// console.log(`FOUND trnType: ${trn.trnMetaData.trnType}`);
					// newAst = {
					// 	...ast,
					// 	trnMetaData: trn.trnMetaData,
					// };
					// console.log(`made newAst`, newAst);
					// console.log(`ast`, ast);

					const newAst = {
						...ast,
						trnMetaData: trn.trnMetaData,
					};

					// console.log(`newAst`, newAst);

					// console.log(`newRowData`, newRowData);

					newRowData = [...newRowData, newAst];

					// console.log(`newRowData`, newRowData);
				} else {
					// console.log(`NOT audit or Installation`);
				}
			});
	});

	// TODO: get the latest ast state

	const anotherRowData = newRowData?.map((ast, index) => {
		// console.log(`ast`, ast);

		// get only asts from trns that match the ast id
		const astIdMatch = trns?.filter(trn => trn.id === ast.id);
		// console.log(`astIdMatch`, astIdMatch);

		const latestDateAst = astIdMatch.reduce((a, b) =>
			a.trnMetaData.updatedAtDatetime > b.trnMetaData.updatedAtDatetime ? a : b
		);
		// console.log(`latestDateAst`, latestDateAst);

		// get the ast state of the latest trn
		const astState = latestDateAst.astData.astState;
		// console.log(`astState`, astState);

		// write the latest state back into the ast
		return (newRowData[index] = {
			...ast,
			astData: {
				...ast.astData,
				astState: astState,
			},
		});
	});
	// console.log(`anotherRowData`, anotherRowData);

	return (
		<div className="table">
			<Table rowData={anotherRowData} columnDefs={columnDefs} />
		</div>
	);
};

export default TableAstsInErfMap;
