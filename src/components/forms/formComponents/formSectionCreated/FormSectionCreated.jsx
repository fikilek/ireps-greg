import moment from "moment";
import React, { useEffect } from "react";
import { MdLockClock, MdPerson } from "react-icons/md";
import { timestamp } from "../../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../../hooks/useAuthContext";

// const tsConverter = fbTs => {
// 	const jsTs = fbTs.toDate();
// 	console.log(`jsTs`, jsTs);
// 	return moment(jsTs).format("YYYY-MM-DD HH:mm:ss");
// };

const FormSectionCreated = ({
	po,
	setPo,
	modalData,
	sectionStates,
	setSectionStates,
}) => {
	const { user } = useAuthContext();
	// console.log(`po`, po);

	
	useEffect(() => {
		setPo(prev => {
			// console.log(`prev`, prev);
			if (!prev.id) {
				// console.log(`There is no id, its a new doc, so do borth "updated" and "created" `)
				return {
					...prev,
					metaData: {
						...prev.metaData,
						createdAtDatetime: timestamp.fromDate(new Date()),
						createdByUser: user.displayName,
					},
				};
			} else {
				// console.log(`Its an exisitng doc, ONLY do "updated"`);
				return prev;
			}
		});
	}, []);


	return (
		<div className={`fs fs-created`}>
			<p className="fs-title">Created</p>
			<div className="form-field po-form-created-by-user">
				<span className="form-field-icon">
					<MdPerson />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="createdByUser"
					id="createdByUser"
					value={po.id ? po.metaData.createdByUser : user.displayName}
					// onChange={() => null}
					placeholder="Created By User"
				/>
			</div>
			<div className="form form-field po-form-created-at-datetime">
				<span className="form-field-icon">
					<MdLockClock />
				</span>
				<input
					readOnly="readOnly"
					type="datetime-local"
					name="createdAtDatetime"
					id="createdAtDatetime"
					// value={tsConverter(po.metaData.createdAtDatetime)}
					value={moment(po.metaData.createdAtDatetime.toDate()).format(
						"YYYY-MM-DD HH:mm:ss"
					)}
					// onChange={() => null}
					placeholder="Created At Datetime"
				/>
			</div>
		</div>
	);
};
export default FormSectionCreated;
