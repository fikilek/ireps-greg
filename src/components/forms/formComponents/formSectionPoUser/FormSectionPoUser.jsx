import React from "react";
import "./FormSectionPoUser.css";
import moment from "moment";
import { useDocument } from "../../../../hooks/useDocument";
import { getUidFromPo } from "../../../../utils/utils";

const FormSectionPoUser = ({ po, signatureName }) => {
	// console.log(`po`, po);
	// console.log(`signatureName`, signatureName);

	// get detailes of the receiver from firebase auth using uid
	const uid = getUidFromPo({ po, signatureName });
	// console.log(`uid`, uid);

	// console.log(`uid`, uid)
	const { error, document } = useDocument("users", uid);
	// console.log(`uid`, uid);

	let datetime = ''
	if (signatureName === 'receiver')
		datetime = po.poData.poGrv.grvReceiver.grvReceiverDate? po.poData.poGrv.grvReceiver.grvReceiverDate.toDate(): ''
	if (signatureName === 'witness')
		datetime = po.poData.poGrv.grvWitness.grvWitnessDate?  po.poData.poGrv.grvWitness.grvWitnessDate.toDate() : ''

	return (
		// fss: form sub section
		<div className="fss fss-po-user">
			<p className="fss-po-user-header">{signatureName}</p>
			<div className="fss-po-user-body">
				{document ? (
					<div className="fss-po-user-body-receiver">
						<p>Name: {document.displayName}</p>
						<p>Email: {document.email}</p>
						<p>Phone: {document.phoneNumber}</p>
						<p>
							Date:
							{moment(datetime).format("YYYY-MM-DD HH:mm:ss")}
						</p>
					</div>
				) : (
					<div className="fss-po-user-body-no-receiver">
						<p> Not Data </p>
					</div>
				)}
			</div>
			<p className="fss-po-user-error">{error}</p>
		</div>
	);
};
export default FormSectionPoUser;
