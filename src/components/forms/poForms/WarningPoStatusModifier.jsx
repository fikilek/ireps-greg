import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../../contexts/ModalContext";
import { UserContext } from "../../../contexts/UserContext";
import { newTrnDataConfigUpdated } from "../../../store/adminSlice";
import { poUpdated } from "../../../store/schSlice";

const WarningPoStatusModifier = ({ payload }) => {
	const dispatch = useDispatch();
	const { setModalOpened } = useContext(ModalContext);
	// const { user, setUser } = useContext(UserContext);

	const handleCancel = e => {
		e.preventDefault();
		// console.log(`po modification cancelled`);
		// close modal and do nothing
		setModalOpened(false); //Close modal
	};;

	const handleApprove = e => {
		e.preventDefault();
		// console.log(`po modification approved`);
		// change the state in the po
		const newPo = {
			...payload.po,
			poStatus: "Aproved",
		};
		// update the po in the store
		dispatch(poUpdated(newPo));
		// close the modal
		setModalOpened(false); //Close modal
	};

	return (
		// warning-po-status-modifier (wpsm)
		<div className="wpsm-contianer">
			<div className="wpsm">
				<div className="wpsm-header">
					<div className="wpsm-header-heading">
						<p>Purchase Order Modifier Warning</p>
						<p>{payload.po.poData.poNo}</p>
					</div>
					<div className="wpsm-msg">
						<p>{payload.msg} </p>
					</div>
					<div className="wpsm-action">
						<div className="wpsm-action-btn wpsm-action-btn-cancel ">
							<button onClick={handleCancel}>Cancel</button>
						</div>
						<div className="wpsm-action-btn wpsm-action-btn-reject ">
							<button onClick={handleApprove}>Approve</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WarningPoStatusModifier;
