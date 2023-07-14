import React from "react";
import { useParams } from "react-router-dom";
import TableWithAddRecordBtn from "../../components/table/TableWithAddRecordBtn";

const Trns = () => {
	const { ml2, ml3 } = useParams();
	// console.log(`ml2`, ml2)
	// console.log(`ml3`, ml3)
	return <TableWithAddRecordBtn ml1="trns" tn={ml2} ml3={ml3} fn="TrnsForm" />
};

export default Trns;
