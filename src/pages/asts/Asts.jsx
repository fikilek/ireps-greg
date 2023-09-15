import React from "react";
import { useParams } from "react-router-dom";
import TableWithAddRecordBtn from "../../components/table/TableWithAddRecordBtn";
import useAuthContext from "../../hooks/useAuthContext";
import NotAuthenticated from "../auth/NotAuthenticated";

const Asts = () => {
	// console.log(`Asts rendering`);
	const { ml2, ml3 } = useParams();
	// console.log(`ml2`, ml2)
	// console.log(`ml3`, ml3)
		const { user } = useAuthContext();
		// console.log(`user`, user);
	return (
		user ?
		<TableWithAddRecordBtn
			ml1="asts"
			tn={ml2}
			ml3={ml3}
			nfd="newAstsFormData"
			fn="AstsForm"
		/> : <NotAuthenticated />
	);
};

export default Asts;
