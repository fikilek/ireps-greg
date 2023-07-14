import React, { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { useLocation } from "react-router-dom";
import { astsData } from "../data/astsData/astsData";

const useFilterData = ({ ml1, ml2, ml3}) => {
	const { asts, trns, sch } = useSelector(state => state);
	// const store = useStore()
	// const storeState = store.getState();
	// console.log(`storeState`, storeState);

	useEffect(() => {
		// console.log(`redux store state has changed`, asts.astsData);
	}, [astsData]);

	// console.log(`asts`, asts);
	// console.log(`sch`, sch);
	// console.log(`ml2`, ml2);

	const filterAsts = () => {
		if (ml2) {
			const ml2Asts =
				asts && asts.filter(ast => ast.astData.astCartegory === ml2.trim());
			// console.log(`ml2Asts`, ml2Asts);
			return { asts: ml2Asts, trns, sch };
		}
		return { asts, trns, sch };
	};

	const filterTrns = () => {
		if (ml2) {
			const ml2Trns =
				trns && trns.filter(trn => trn.astData.astCartegory === ml2.trim());
			// console.log(`ml2Trns`, ml2Trns);
			return { asts, trns: ml2Trns, sch };
		}
		return { asts, trns, sch };
	};

	const location = useLocation();
	// console.log(`location`, location);
	const searchParams = new URLSearchParams(location.search);
	const astSystemId = searchParams.get(`astSystemId`);
	// console.log(`astSystemId: ${astSystemId}`);

	if (ml1 === "asts") {
		return filterAsts();
	}
	if (ml1 === "trns") {
		return filterTrns();
	}
	if (ml1 === "sch") {
		return { asts, trns, sch };
	}
	if (ml1 === "poi") {
		return { asts, trns, sch };
	}
	// TODO: take care of the situation where its neither asts or trns
};

export default useFilterData;
