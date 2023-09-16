import moment from "moment";
import React, { useEffect } from "react";
import { MdLockClock, MdPerson } from "react-icons/md";
import useAuthContext from "../../../../hooks/useAuthContext";
import dateFormat, { masks } from "dateformat";
import { timestamp } from "../../../../firebaseConfig/fbConfig";

const FormSectionUpdated = ({
	po,
	setPo,
	modalData,
	sectionStates,
	setSectionStates,
}) => {
	// console.log(`po`, po);
	const { user } = useAuthContext();
	useEffect(() => {
		setPo(prev => {
			return {
				...prev,
				metaData: {
					...prev.metaData,
					updatedAtDatetime: timestamp.fromDate(new Date()),
					updatedByUser: user.displayName,
					updatedByUserId: user.uid,
				},
			};
		});
	}, []);

	return (
		<div className={`fs fs-updated`}>
			<p className="fs-title">Updated</p>
			<div className="form-field po-form-updated-by-user">
				<span className="form form-field-icon">
					<MdPerson />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="updatedByUser"
					id="updatedByUser"
					value={user.displayName}
					// onChange={handleChange}
					placeholder="Updated By User"
				/>
			</div>
			<div className="form form-field po-form-updated-at-datetime">
				<span className="form form-field-icon">
					<MdLockClock />
				</span>
				<input
					readOnly="readOnly"
					type="datetime-local"
					name="updatedAtDatetime"
					id="updatedAtDatetime"
					// value={po.metaData.updatedAtDatetime}
					value={moment(po.metaData.updatedAtDatetime.toDate()).format(
						"YYYY-MM-DD HH:mm:ss"
					)}
					// onChange={handleChange}
					placeholder="Updated At Datetime"
				/>
			</div>
		</div>
	);
};

export default FormSectionUpdated;
