import React from "react";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import Table from "./Table";

const TableTrnsForAstsTooltip = props => {
	// console.log(`props`, props);

	// destructure asts from props.data
	const { asts } = props.data;
	// console.log(`asts`, asts);

	// workout how many asts in the asts array
	let rowData = [];
	let erfAstsIds = [];
	asts &&
		asts.forEach(ast => {
			// console.log(`ast`, ast)
			if (!erfAstsIds.includes(ast?.id)) {
				const asset = { ...ast.astData, id: ast.id };
				// console.log(`asset`, asset);
				erfAstsIds.push(ast.id);
				rowData.push(asset);
			}
		});
	// console.log(`rowData`, rowData);
  
	let rowNo = 1;
	
	if (asts.length === 0) return null;

	return (
		<div className="table tableTrnsForAstsTooltip">
			<table>
				<thead>
					<tr>
						<th className="ast-#">#</th>
						{/* <th className="ast-id">Ast id</th> */}
						<th className="ast-cat">Ast Category</th>
						<th className="ast-no">Ast No</th>
					</tr>
				</thead>
				<tbody>
					{rowData?.map(ast => {
						return (
							<tr key={ast.id} >
                <td className="ast-#" >{ rowNo++ }</td>
                {/* <td className="ast-id" >{ ast.id }</td> */}
                <td className="ast-cat" >{ ast.astCartegory}</td>
								<td className="ast-no" >{ast.astCartegory === 'cb' ? `${ast.cb.size} (amps)` : ast.astNo}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default TableTrnsForAstsTooltip;
