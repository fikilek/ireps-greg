import React from "react";
import { useParams } from "react-router-dom";
import TableErfs from "../../components/table/TableErfs";
const Erfs = () => {
	const { ml2, ml3 } = useParams();
	// console.log(`ml2`, ml2)
	// console.log(`ml3`, ml3)
	return (
		<TableErfs
			ml1="erfs"
			tn={ml2}
			ml3={ml3}
			nfd="newErfsFormData"
			fn="erfsForm" //ErfsForm
		/>
	);
};

export default Erfs;
