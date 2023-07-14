import moment from "moment";
import React from "react";
import useModal from "../../hooks/useModal";
import FormBtn from "../forms/formComponents/formBtn/FormBtn";
import UserSignatureCancelBtn from "./UserSignatureCancelBtn";
import "./UserSignatureStatus.css";

const UserSignatureStatus = ({ formData }) => {
	// console.log(`formData`, formData);
	const { user, poData: po, signatureName } = formData;
	// console.log(`po`, po)
	const { closeModal } = useModal();

	let date = null;
	if (signatureName === "poApprove") {
		date = moment(po.poApprove.approveDate.toDate()).format(
			"YYYY-MM-DD HH:mm:ss"
		);
	}
	if (signatureName === "receiver") {
		date = moment(po.poData.poGrv.grvReceiver.grvReceiverDate.toDate()).format(
			"YYYY-MM-DD HH:mm:ss"
		);
	}
	if (signatureName === "witness") {
		date = moment(po.poData.poGrv.grvWitness.grvWitnessDate.toDate()).format(
			"YYYY-MM-DD HH:mm:ss"
		);
	}
	return (
		// ss: sugnature status
		<div className="ss">
			<div className="sf-info ss-header">
				<h2>
					{signatureName === "poApprove" ? "approval" : signatureName} signature
				</h2>
				<button onClick={() => closeModal()}>X</button>
			</div>
			<p className="ss-info ss-dispaly-name">
				<strong>Name:</strong> {user.displayName}
			</p>
			<p className="ss-info ss-email">
				<strong>Email:</strong> {user.email}
			</p>
			<p className="ss-info ss-phone-no">
				<strong>Phone:</strong> {user.phoneNumber}
			</p>
			<p className="ss-info ss-date">
				<strong>Date:</strong> {date}
			</p>
			<div className="sf-info ss-footer">
				<UserSignatureCancelBtn
					po={po}
					signatureName={signatureName}
					closeModal={closeModal}
				/>
			</div>
		</div>
	);
};

export default UserSignatureStatus;
