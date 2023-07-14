import React from "react";
import MenuAddPoBtn from "../../components/navbar/menuBtns/MenuAddPoBtn.";
import Table from "../../components/table/Table";
import useCollection from "../../hooks/useCollection";
import { useColumnDefs } from "../../hooks/useColumnDefs";

// Sch is a page component
const Sch = () => {
	const { data: rowData, error, isPending } = useCollection("pos");
	// console.log(`rowData`, rowData)
	const { poTableFields: columnDefs } = useColumnDefs({
		ml1: "sch",
		ml2: "pos",
	});
	
	// console.log(`columnDefs`, columnDefs);

	return (
		<div className="table sch">
			<Table rowData={rowData} columnDefs={columnDefs} isPending={isPending} />
			<MenuAddPoBtn />
		</div>
	);
};
export default Sch;
