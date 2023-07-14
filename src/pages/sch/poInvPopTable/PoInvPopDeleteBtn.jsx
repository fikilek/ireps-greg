import { httpsCallable } from "firebase/functions";
import { deleteObject, ref } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { functions, storage } from "../../../firebaseConfig/fbConfig";
import "./PoInvPopDeleteBtn.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineDeleteForever } from "react-icons/md";
import useModal from "../../../hooks/useModal";

const PoInvPopDeleteBtn = params => {
	// console.log(`params`, params);
	const { po, setPo, type } = params;
	const {closeModal} = useModal()

	const getRowData = useCallback(() => {
		const rowData = [];
		params.api.forEachNode(function (node) {
			rowData.push(node.data);
		});

		// console.log(`rowData`, rowData);

		if (type === "invoice") {
			// console.log(`updating poInv with rowData :`, rowData);
			setPo({
				...po,
				poData: {
					...po.poData,
					poInv: rowData,
				},
			});
		}
		if (type === "payment") {
			// console.log(`updating poPop with rowData :`, rowData);
			setPo({
				...po,
				poData: {
					...po.poData,
					poPop: rowData,
				},
			});
		}
	}, []);

	const handleDeleteItem = e => {
		e.preventDefault();
		const selectedRows = params.api.getSelectedRows();
		params.api.applyTransaction({ remove: selectedRows });
		// console.log(`typeof(selectedRows)`, typeof selectedRows);
		// console.log(`selectedRows[0]`, selectedRows[0]);
		const path = selectedRows[0].invPopImagePath;
		// console.log(`url`, path);
		getRowData();
		// deleteFile(path);
		const fileRef = ref(storage, path);
		deleteObject(fileRef)
			.then(() => {
				// console.log(`file in path [${path}] deleted successfully`);
				const poInvPopData = {
					poId: po.id,
					type,
					transactionType: "remove",
					schData: selectedRows[0],
				};
				const updatePoInvPop = httpsCallable(functions, "updatePoInvPop");
				const result = updatePoInvPop(poInvPopData);
				console.log(`result`, result);
				toast(`${type} for Po-${po.poNo} succesfully updated!`, {
					position: "bottom-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				closeModal()
			})
			.catch(error => {
				console.log(`error deleting file`, error.message);
			});
	};

	return (
		<div className="po-inv-payment-delete-btn-wrapper">
			<button
				type="button"
				className="btnPoi btnPoiDeleteItem"
				onClick={handleDeleteItem}
			>
				<MdOutlineDeleteForever />
			</button>
		</div>
	);
};

export default PoInvPopDeleteBtn;
