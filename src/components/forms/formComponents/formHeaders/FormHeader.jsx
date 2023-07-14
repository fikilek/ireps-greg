import React, { useContext } from "react";
import { ModalContext } from "../../../../contexts/ModalContext";
import useModal from "../../../../hooks/useModal";
import { getPoStatus } from "../../../../utils/utils";

const FormHeader = ({ formData }) => {
	// console.log(`formData`, formData)
	const { closeModal } = useModal()
	const poNumber = formData.poNo ? `Po-${formData.poNo}` : `New PO`
	const poStatus = getPoStatus(formData)
	const poState = poStatus ? poStatus : "Error"

	return (
		<div className="form-header">
			<div className="form-header-title">
				<button type="button" className={`form-header-title-status-btn ${poState}`}>
					{poState}
				</button>

				<h3 className="form-header-title-name">Purchase Order Form</h3>
				{/* <h1 className="form-header-title-form-no">{formData.metaData.formNo}</h1> */}
			</div>
			<div className="form-header-close-btn-wrapper" onClick={() => closeModal()}>
				<h3 className="form-header-title-form-no">{poNumber}</h3>
				<button type="button" >X</button>
			</div>
		</div>
	);
};

export default FormHeader;
