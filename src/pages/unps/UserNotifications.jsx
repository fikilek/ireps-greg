import React from "react";
import DatetimeFilter from "./DatetimeFilter";
import NotificationsStats from "./NotificationsStats";

const notifications = [
  {name: 'sms', total: 23},
  {name: 'whatsapp', total: 23},
  {name: 'email', total: 23},
  {name: 'noticeBoard', total: 23},
]

const UserNotifications = () => {
	return (
		<div className="user-data user-notifications">
			<div className="header">
				<h3>Notifications</h3>
				<div>
					Total Notifications: <span className="data-emphasis">{"243"}</span>
				</div>
			</div>
			<div className="body user-notofications-body">
				<div className="body-section filters">
					<DatetimeFilter />
				</div>
				<div className="body-section notification">
					<NotificationsStats notifications={notifications} />
				</div>
			</div>
		</div>
	);
};

export default UserNotifications;
