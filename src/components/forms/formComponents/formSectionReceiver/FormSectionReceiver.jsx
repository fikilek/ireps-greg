import React from "react";
import "./FormSectionReceiver.css";
import moment from "moment";
import { useDocument } from "../../../../hooks/useDocument";
// import { useFirestore } from "../../../../hooks/useFirestore";

const FormSectionReceiver = ({ po, setPo }) => {
	// const { response, getDocument } = useFirestore("users");

	// get detailes of the receiver from firebase auth using uid
	const uid = po.poData.poGrv.grvGoodsReceiver?.grvGoodsReceiverUid;
	console.log(`uid`, uid)
	const {error, document: receiver} = useDocument("users", uid)

	return (
		// fss: form sub section
		<div className="fss fss-grv">
			<p className="fss-grv-header">Receiver</p>
			<div className="fss-grv-body">
				{receiver ? (
					<div className="fss-grv-body-receiver">
						<p>Name: {receiver.displayName}</p>
						<p>Email: {receiver.email}</p>
						<p>Phone: {receiver.phoneNumber}</p>
						<p>
							Date:{" "}
							{moment(
								po.poData.poGrv.grvGoodsReceiver.grvGoodsReceiverDate.toDate()
							).format("YYYY-MM-DD HH:mm:ss")}
						</p>
					</div>
				) : (
					<div className="fss-grv-body-no-receiver">
						<p> Not Received </p>
					</div>
				)}
			</div>
			<p className="fss-grv-error">{error}</p>
		</div>
	);
};
export default FormSectionReceiver;
