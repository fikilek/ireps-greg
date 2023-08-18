import React from "react";
import "./NotificationsStats.css";

const NotificaionsStats = props => {
	// console.log(`props`, props);
	const { notifications } = props;
	return (
		<div className="notifications-stats">
			<table>
				<thead>
					<tr>
						<th>Notification</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{notifications?.map(trn => {
						return (
							<tr key={trn.name}>
								<td>{trn.name}</td>
								<td className="notification-method">
									<span className="data-emphasis">{trn.total}</span>
									<button>Send {trn.name}</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default NotificaionsStats;
