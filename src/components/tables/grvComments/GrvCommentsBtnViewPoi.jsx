import React, { useContext } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { getTotalQauntites } from "./poiUtils";

const PoiBtnViewPoi = params => {
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);
	// console.log(`params`, params);
	const poSystemId = params.data.poSystemId;
	const poPi = params.data.poPi;
	// console.log(`poPi`, poPi);
	const totalQuantites = getTotalQauntites(poPi, "itemQuantity");

	const handleClick = e => {
		// console.log(`btn click`, e);
		// modalOpened a modal window
		setComponentToOpen({
			...componentToOpen,
			name: "poItemsTable",
			payload: poSystemId,
		});
		setModalOpened(true);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="btn-table-row btn-trn-count"
		>
			{totalQuantites}
		</button>
	);
};

export default PoiBtnViewPoi;
