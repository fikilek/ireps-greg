import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { PoContext } from "../../../contexts/PoContext";
import "./poi.css";

const PoiBtnEditItem = props => {
	// console.log(`props`, props);
	const { poItems, setPoItem } = useContext(PoContext);
	// console.log(`poItems`, poItems);
	// setPoItem(prev => {
	// 	return {
	// 		...prev,
	// 		newItemObj
	// 	};
	// })

	const handleEditItem = e => {
		e.preventDefault();
		const res = props.api.applyTransaction({
			add: [],
		});
	};

	return (
		<button
			type="button"
			className="btnPoi btnPoiBtnEditItem"
			onClick={handleEditItem}
		>
			+
		</button>
	);
};

export default PoiBtnEditItem;
