import React from "react";
import { useParams } from "react-router-dom";
import TableWithAddRecordBtn from "../../components/table/TableWithAddRecordBtn";

const Asts = () => {
	const { ml2, ml3 } = useParams();
	// console.log(`ml2`, ml2)
	// console.log(`ml3`, ml3)
	return (
		<TableWithAddRecordBtn
			ml1="asts"
			tn={ml2}
			ml3={ml3}
			nfd="newAstsFormData"
			fn="AstsForm"
		/>
	);
};

export default Asts;
