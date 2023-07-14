import { useState, useEffect } from "react";
import useCollection from "./useCollection";

export const useAstCategories = () => {

	// get ast categories from firestore
	const { data } = useCollection("admin", "ast-cartegories");
	// console.log(`data`, data);

	// create state for ast categories options
	const [astCategoriesOptions, setAstSCategoriesOptions] = useState(null);

	// create state for the array of ast categories
	const [astCategoriesArray, setAstCategoriesArray] = useState([])

	// set options
	useEffect(() => {
		let astArrayOption = [{ key: "choose", value: "choose" }];
		let astArray = []
		data &&
			data.forEach(astCat => {
				astArrayOption.push({
					key: astCat.astCartegoryName,
					value: astCat.astCartegoryName,
				});
				astArray.push(astCat.astCartegoryName);
			});
		setAstSCategoriesOptions(astArrayOption);
		setAstCategoriesArray(astArray)
	}, [data]);

	return { astCategoriesOptions, astCategoriesArray };
};
