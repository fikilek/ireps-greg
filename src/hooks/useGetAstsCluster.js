import { useEffect } from "react";
import { useState } from "react";
import useSupercluster from "use-supercluster";
import useCollection from "./useCollection";

export const useGetAstsCluster = (bounds, zoom) => {
	// create state for asts
	const [assets, setAssets] = useState([]);

	// use useCollection to get all asts in the app
	const { data: asts } = useCollection("asts");
	console.log(`asts`, asts);

	useEffect(() => {
		setAssets(asts);
	}, [asts]);

	const astsPoints = assets?.map(ast => {
		// console.log(`erf`, erf);
		// const lat = erf.address.gps.latitude;
		// const lng = erf.address.gps.longitude;

		return {
			type: "Feature",
			properties: { cluster: false, astId: ast.id, ast: ast },
			geometry: {
				type: "Point",
				coordinates: [
					parseFloat(ast?.astData?.astLocation?.gps.lng),
					parseFloat(ast?.astData?.astLocation?.gps.lat),
				],
			},
		};
	});
	console.log(`astsPoints`, astsPoints);

	const astResult = useSupercluster({
		astsPoints,
		bounds,
		zoom,
		options: { radius: 75, maxZoom: 20 },
	});

	// const { clusters: astClusters, supercluster: astSupercluster } = astResult;
	// console.log(`astClusters`, astClusters);
	// console.log(`astSupercluster`, astSupercluster);

	// return { astResult };
	return;
};
