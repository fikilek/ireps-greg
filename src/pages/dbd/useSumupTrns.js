import { useEffect, useState } from "react";

const useSumupTrns = trns => {
	const [sumTrns, setSumTrns] = useState({
    feeders: 0,
    transformers:0,
		poles: 0,
		boxes: 0,
		meters: 0,
		cbs: 0,
		seals: 0,
	});

	useEffect(() => {
		const sum =
			trns &&
			trns.reduce((tots, current) => {
				return {
					...tots,
					data: {
						feeders: (tots.data.feeders += current.data.feeders),
						transformers: (tots.data.transformers += current.data.transformers),
						poles: (tots.data.poles += current.data.poles),
						boxes: (tots.data.boxes += current.data.boxes),
						meters: (tots.data.meters += current.data.meters),
						cbs: (tots.data.cbs += current.data.cbs),
						seals: (tots.data.seals += current.data.seals),
					},
				};
			});
		setSumTrns(sum.data);
	}, [trns])
  return { sumTrns };
};

export default useSumupTrns;
