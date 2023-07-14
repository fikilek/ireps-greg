import { httpsCallable } from "firebase/functions";
import { deleteObject, ref } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { functions, storage } from "../../../firebaseConfig/fbConfig";
import "./PoInvPopEditBtn.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiEditFill } from "react-icons/ri";

const PoInvPopEditBtn = params => {
	// console.log(`params`, params);
	const { po, setPo, type, setShowHideInvPopForm, setInvPopDataToEdit, setType } = params;
	const [fileDeleted, setFileDeleted] = useState(null);


	const handleEditItem = e => {
		e.preventDefault();
		const selectedRows = params.api.getSelectedRows();
		// console.log(`selectedRows`, selectedRows);
		// console.log(`type`, type);
		setShowHideInvPopForm("poipf-show");
		setType(type);
		setInvPopDataToEdit(selectedRows[0]);
	};

	return (
		<div className="po-inv-payment-edit-btn-wrapper">
			<button
				type="button"
				className="po-inv-payment-edit-btn"
				onClick={handleEditItem}
			>
				<RiEditFill />
			</button>
		</div>
	);
};

export default PoInvPopEditBtn;
