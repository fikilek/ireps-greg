import React from "react";
import { useParams } from "react-router-dom";
import TableWithAddRecordBtn from "../../components/table/TableWithAddRecordBtn";

const Sch = () => {
	const { ml2, ml3 } = useParams();
	// console.log(`ml2`, ml2);
	// console.log(`ml3`, ml3);
	return (
		<>
			{/* Sch - purchase orders */}
			{ml2 === "pos" && ml3 === undefined && (
				<TableWithAddRecordBtn
					ml1="sch"
					tn="pos"
					nfd="newPoFormData"
					fn="poForm"
				/>
			)}

			{/* Suppliers */}
			{ml2 === "suppliers" && ml3 === undefined && (
				<TableWithAddRecordBtn
					ml1="sch"
					tn="suppliers"
					nfd="newSplFormData"
					fn="splForm"
				/>
			)}

			{/* stores */}
			{ml2 === "stores" && ml3 === undefined && (
				<TableWithAddRecordBtn
					ml1="sch"
					tn="stores"
					nfd="newStoresFormData"
					fn="storesForm"
				/>
			)}
		</>
	);
};

export default Sch;
