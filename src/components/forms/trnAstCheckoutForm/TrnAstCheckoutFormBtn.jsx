import React from "react";
import { useAstCategories } from "../../../hooks/useAstCategories";
import useModal from "../../../hooks/useModal";

const TrnAstCheckoutFormBtn = params => {
	// this component is use to launch a TrnAstCheckoutForm component where assets ca be checked out and inti a store
	// console.log(`params.data`, params.data)

	// get all existing  asts catergories from firestore asts-catergories collection
	const { astCategoriesArray } = useAstCategories();
	// console.log(`astCategoriesArray`, astCategoriesArray);

	// get trn data
	const astCats = params.data.astData;
	// console.log(`astCats`, astCats);

	// iterage though the catergories and prepare trnObject with astCat and total asts in each astCat
	let trnObject = {};
	// const NumberOfAsts = Number(meters) + Number(boxes) + Number(cbs) + Number(seals);
	let numberOfAsts = 0
		astCategoriesArray &&
		astCategoriesArray.forEach(ast => {
			// console.log(`ast`, ast);

			const asset = astCats[ast];
			// console.log(`asset`, asset);

			if (asset) {
				const doneArray = asset.filter(asst => {
					// console.log(`asst`, asst);

					const confirmTrn = asst?.trnData?.confirmations?.confirmTrn;
					// console.log(`confirmTrn`, confirmTrn);

					return (confirmTrn === "not done" || confirmTrn === "choose") ? false : true;
					// return true;
					// return null
				});
				// console.log(`doneArray.length`, ast, doneArray.length);
				trnObject[ast] = doneArray.length;
				numberOfAsts = numberOfAsts + doneArray.length;
			} else {
				trnObject[ast] = 0;
			}
		});
	// console.log(`trnObject`, trnObject);

	// get open modal rom useModal
	const { openModal } = useModal();

	// open trnAstCheckoutForm modal
	const handleClick = e => {
		openModal({
			modalName: "trnAstCheckoutForm",
			payload: params.data,
		});
	};

	return (
		<div className="trn-ast-checkout">
			<button onClick={handleClick} className="table-row-btn">
				<span>{numberOfAsts}</span>
			</button>
			<span>{` - `}</span>
			<button onClick={handleClick} className="table-row-btn">
				<div>
					<span>
						M:<span className="trn-ast-count">{trnObject["meter"]}</span>
					</span>
					{" | "}
					<span>
						C:<span className="trn-ast-count">{trnObject["cb"]}</span>
					</span>
					{" | "}
					<span>
						S:<span className="trn-ast-count">{trnObject["seal"]}</span>
					</span>
					{" | "}
					<span>
						B:<span className="trn-ast-count">{trnObject["box"]}</span>
					</span>
					{" | "}
					<span>
						P:<span className="trn-ast-count">{trnObject["pole"]}</span>
					</span>
				</div>
			</button>
		</div>
	);
};

export default TrnAstCheckoutFormBtn;
