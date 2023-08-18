import React from 'react'
import Tools from './Tools';
import "./UserTools.css"

const tools = [
	{ name: "Mobile Device", serialNo: "123456789",  dateAllocated: '2023/02/23' },
	{ name: "Simcard", serialNo: "123456789",  dateAllocated: '2023/02/23' },
	{ name: "Voltmeter", serialNo: "123456789",  dateAllocated: '2023/02/23' },
];

const UserTools = () => {
  return (
			<div className="user-data tools">
				<div className="header">
					<h3>User Tools</h3>
					<div>
						Total Tools Allocated: <span className="data-emphasis">{"3"}</span>
					</div>
				</div>
				<div className="body user-tools-body">
					<div className="body-section tools">
						<Tools tools={tools} />
					</div>
				</div>
			</div>
		);
}

export default UserTools