import { useState } from "react";
import { totals } from "../../data/dbdData/dbdData";
import { trns_monthly_totals } from "../../data/dbdData/dbdData";
import useSumupTrns from "./useSumupTrns";

const useDbd = () => {
	const [trnsMonthlyTotals, setTrnsMonthlyTotals] = useState(trns_monthly_totals);
	const { sumTrns } = useSumupTrns(trnsMonthlyTotals);
	const sum =
		totals &&
		totals.map(item => {
			return {
				...item,
				trns_quantities: sumTrns[item.name],
			};
		});
	return { totals: sum, trnsMonthlyTotals };
};

export default useDbd;
