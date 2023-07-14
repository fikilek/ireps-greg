import React from "react";
import { useState } from "react";
import ScForm from "../forms/scForm/ScForm";
import TableSc from "../table/TableSc";

const ServiceConnection = props => {
	const { ast, trn, setTrn } = props;
	const [scn, setScn] = useState(null)
	// console.log(`scn`, scn)
	// console.log(`setScn`, setScn)
	return (
		<div>
			<ScForm scn={scn} setScn={setScn} ast={ast} trn={trn} setTrn={setTrn} />
			<TableSc setScn={setScn} ast={ast} trn={trn} setTrn={setTrn} />
		</div>
	);
};

export default ServiceConnection;
