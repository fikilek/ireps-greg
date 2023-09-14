import React from "react";
import { useParams } from "react-router-dom";
import TableWithAddRecordBtn from "../../components/table/TableWithAddRecordBtn";
import useAuthContext from "../../hooks/useAuthContext";
import NotAuthenticated from "../auth/NotAuthenticated";

const Trns = () => {
	// console.log(`Asts rendering`);
	const { ml2, ml3 } = useParams();
	// console.log(`ml2`, ml2)
	const { user } = useAuthContext();
	console.log(`user`, user);
	// console.log(`ml3`, ml3)
	return user ? (
		<TableWithAddRecordBtn ml1="trns" tn={ml2} ml3={ml3} fn="TrnsForm" />
	) : (
		<NotAuthenticated />
	);
};

export default Trns;
