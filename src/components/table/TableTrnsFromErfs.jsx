import React, { memo, useEffect, useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import { useFirestore } from "../../hooks/useFirestore";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import useModal from "../../hooks/useModal";
import FormBtn from "../forms/formComponents/formBtn/FormBtn";
import Table from "./Table";
import "./Table.css";
import TableAddRecordBtn from "./tableBtns/TableAddRecordBtn";
import TableTrns from "./TableTrns";
import { formSects } from "../forms/formComponents/formSections/formSects";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import TableHeader from "./TableHeader";

const createNewTrnObj = () => {
	return {
		meter: [
			{
				astData: { ...formSects.meter.audit.astData },
				id: nanoid(),
				trnData: { ...formSects.meter.audit.trnData },
			},
		],
		cb: [
			{
				astData: { ...formSects.cb.audit.astData },
				id: nanoid(),
				trnData: { ...formSects.cb.audit.trnData },
			},
		],
		seal: [
			{
				astData: { ...formSects.seal.audit.astData },
				id: nanoid(),
				trnData: { ...formSects.seal.audit.trnData },
			},
		],
		// box: [
		// 	{
		// 		astData: { ...formSects.box.audit.astData },
		// 		id: nanoid(),
		// 		trnData: { ...formSects.box.audit.trnData },
		// 	},
		// ],
		// pole: [
		// 	{
		// 		astData: { ...formSects.pole.audit.astData },
		// 		id: nanoid(),
		// 		trnData: { ...formSects.pole.audit.trnData },
		// 	},
		// ],
	};
};

// Suppliers is a page component
const TableTrnsFromErfs = props => {
	// console.log(`props`, props);

	const { newTrnsArray, trnType } = props.trnsData;
	// console.log(`newTrnsArray`, newTrnsArray);

	// if trnType is 'audit', add assets into the trns
	let newAuditTrnsArray = newTrnsArray;
	if (trnType === "audit") {
		newAuditTrnsArray =
			newTrnsArray &&
			newTrnsArray.map(trn => {
				return {
					...trn,
					astData: createNewTrnObj(),
				};
			});
	}
	// console.log(`newAuditTrnsArray`, newAuditTrnsArray);

	const { response, addDocument } = useFirestore("trns");

	const { closeModal } = useModal();

	const { tableFields: columnDefs } = useColumnDefs({ ml1: "trnsFromErfs" });

	// console.log(`columnDefs`, columnDefs);

	const handleSubmit = e => {
		// console.log(`newTrnsArray`, newTrnsArray);
		newAuditTrnsArray &&
			newAuditTrnsArray.map(trn => {
				console.log(`trn`, trn);
				addDocument(trn);
			});
		closeModal();
	};

	useEffect(() => {
		console.log(`response`, response);
		// TODO: Come back and fix the response problem here. Got ot do with useFirestore addDcocument async
		if (response.success) {
			console.log(
				`new trn [${response.document.id}] SUCCESFULLY created`,
				response
			);
			toast(`new trn [${response.document.id}] SUCCESFULLY created!`, {
				position: "bottom-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}, [response]);

	// Table Header data


	return (
		<div className={`table new-trns-from-erfs`}>
			<TableHeader trnType={trnType} handleSubmit={handleSubmit} />

			<TableTrns rowData={newTrnsArray} columnDefs={columnDefs} />
		</div>
	);
};

export default TableTrnsFromErfs;
