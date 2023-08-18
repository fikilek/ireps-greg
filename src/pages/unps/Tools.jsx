import React from "react";
import "./Tools.css";

const Tools = props => {
	// console.log(`props`, props);
	const { tools } = props;
	return (
		<div className="tools">
			<table>
				<thead>
					<tr>
						<th>Tool Name</th>
						<th>Serial No</th>
						<th>Allocation Date</th>
					</tr>
				</thead>
				<tbody>
					{tools?.map(tool => {
						return (
							<tr key={tool.name}>
								<td>
									<button> {tool.name}</button>
								</td>
								<td>
									<button> {tool.serialNo}</button>
								</td>
								<td>
									<button> {tool.dateAllocated}</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Tools;
