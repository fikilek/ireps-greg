import React, { useEffect } from "react";
import useModal from "../../../hooks/useModal";
import { useState } from "react";
import { useColumnDefs } from "../../../hooks/useColumnDefs";
import { useFirestore } from "../../../hooks/useFirestore";
import useCollection from "../../../hooks/useCollection";
import { timestamp } from "../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../hooks/useAuthContext";
import TableCheckedOutAsts from "../../table/TableCheckedOutAsts";
import TableCheckedInAsts from "../../table/TableCheckedInAsts";
import { useDocument } from "../../../hooks/useDocument";
import { useTrnForm } from "../../../hooks/useTrnForm";
import { useDocumentSync } from "../../../hooks/useDocumentSync";
import FormHeader8 from '../../../components/forms/formComponents/formHeaders/FormHeader8'

const getAstIdsInTrn = trn => {
	if (!trn) return null;
	const { astData } = trn;
	// console.log(`astData`, astData);
	const astIdsInTrnArray = [];
	for (const astCat in astData) {
		// console.log(`astCat`, astCat);
		const astsArray = astData[astCat];
		// console.log(`astsArray`, astsArray);
		// console.log(`validationObject`, validationObject);
		// console.log(`index`, index)
		// iterate through astsArray to create validation obj
		astsArray &&
			astsArray.forEach((ast, astCatIndex) => {
				// console.log(`ast`, ast)
				// console.log(`astCatIndex`, astCatIndex)

				// extrac ast id info
				const astId = astData[astCat][astCatIndex];
				// console.log(`astId`, astId)

				// create ast tracking info
				const astTrackingInfo = {
					astId: astId.id,
					astCat: astCat,
					astIndex: astCatIndex,
				};
				astIdsInTrnArray.push(astTrackingInfo);
			});
	}
	return astIdsInTrnArray;
};

// get trnData for trn
const getTrnData = (ast, trn, getTrnFormJsx) => {
	// console.log(`ast`, ast);
	// console.log(`trn`, trn);

	// get exisintg astData from trn
	const existingAstData = trn?.astData;
	// console.log(`existingAstData`, existingAstData);

	if (existingAstData) {
		// get ast id
		const id = ast?.id;
		// console.log(`id`, id);

		// get ast category
		const astCat = ast?.astData.astCartegory;
		// console.log(`astCat`, astCat);

		// get trn type
		const trnType = trn.metaData.trnType;
		// console.log(`trnType`, trnType);

		const { trnData } = getTrnFormJsx(trnType, astCat);
		// console.log(`trnData`, trnData);

		// create obj (newAstWithTrnData) to append to trn.astData[astCat] array
		const newAstWithTrnData = {
			id,
			astData: ast.astData,
			trnData,
		};
		// console.log(`astTrnObj`, astTrnObj);
		return newAstWithTrnData;
	}
};

// get trn assets
// TODO: think about making the functon reusable elsewhere in the code
const getTrnAsts = trn => {
	// console.log(`trn`, trn);

	// // extract the trn state
	// const ts = trn?.metaData.trnState;
	// // console.log(`ts`, ts);

	// // extract the trn type
	// const tt = trn?.metaData.trnType;
	// // console.log(`tt`, tt);

	let trnAssets = [];
	if (trn) {
		const trnAstsKeys = Object.keys(trn.astData);
		// console.log(`trnAstsKeys`, trnAstsKeys);
		trnAstsKeys &&
			trnAstsKeys.forEach(key => {
				const astCatArray = trn.astData[key];
				astCatArray &&
					astCatArray.forEach(ast => {
						// console.log(`ast`, ast);

						// if confirmations.confirTrn is 'not done', exclude the ast (dont push into the trnAssets)
						// const { confirmTrn } = ast.trnData.confirmations;
						// console.log(`confirmTrn`, confirmTrn);

						// if (tt === "installation") {
							trnAssets.push(ast);
						// } 

						
						// if (confirmTrn === "done") {
						// 	if (
						// 		(tt === "installation" && ts === "submited") ||
						// 		tt === "commissioning"
						// 	) {
						// 		trnAssets.push({
						// 			...ast,
						// 			astData: {
						// 				...ast.astData,
						// 				astState: "field",
						// 			},
						// 		});
						// 	} else {
						// 		trnAssets.push(ast);
						// 	}
						// }
					});
			});
	}
	// console.log(`trnAssets`, trnAssets);
	return trnAssets;
};

const TrnAstCheckoutForm = props => {
	// console.log(`props`, props);
	// This is trn row data from the clicked btn on a trn row table. It comes from params.data
	const { data } = props;
	// console.log(`data`, data);

	// get useTrnForm
	const { getTrnFormJsx } = useTrnForm();

	// get closeModal to be able to close the openedmodal
	const { closeModal } = useModal();

	// get signed in user
	const { user } = useAuthContext();

	// get firestore hook to update a trn
	// TODO: deal with response sceanarion
	const { response: trnResponse, updateDocument } = useFirestore("trns");

	// get firestore hook to update an ast
	// TODO: deal with response sceanarion
	const { response: astResponse, updateDocument_ } = useFirestore("asts");

	// get trnId. THis will be used to get trn via useDocument for the auotomated update
	const { id: trnId } = data;
	// console.log(`trnId`, trnId);

	// get trn using trnId
	//TODO: deal with error conditiond
	const { error: err, document } = useDocumentSync("trns", trnId);
	// console.log(`err`, err);
	// console.log(`document`, document);

	// TODO: deal with error, ispending and sucess scenarios
	// get ast rows from ast firebase useCollection
	const { data: rowData, error, isPending, success } = useCollection("asts");
	// console.log(`rowData`, rowData)

	// get array of existing trn assets from the trn. These will be flashed on TableCheckedOutAsts below
	const trnAsts = getTrnAsts(document); // document is fresh trn
	// console.log(`trnAsts`, trnAsts);

	// selectedAstFromCheckedin will store the asts that will be chekced out
	const [selectedAstFromCheckedin, setSelectedAstFromCheckedin] = useState([]);
	// console.log(`selectedAstFromCheckedin`, selectedAstFromCheckedin);

	// selectedAstFromCheckedin will store the asts that will be chekced out
	const [selectedAstFromCheckedout, setSelectedAstFromCheckedout] = useState([]);
	// console.log(`selectedAstFromCheckedout`, selectedAstFromCheckedout);

	// get column definitions
	const { tableFields: columnDefsCheckout } = useColumnDefs({
		ml1: "astCheckout",
	});
	const { tableFields: columnDefsCheckin } = useColumnDefs({
		ml1: "astCheckin",
	});

	// Take action on ast selected from chekcedkin asts.
	// TODO: implement rules for checking out asts
	// Rules
	// 1. only asts in the stores state can be checked out
	// 2. update asts in trn to 'checked out' state
	useEffect(() => {
		// console.log(`selectedAstFromCheckedin`, selectedAstFromCheckedin);

		// update the state of the selected ast in firestore. This should automatically update the ast state in the checkedin table
		const ast = selectedAstFromCheckedin[0];
		// console.log(`ast`, ast);
		// console.log(`document`, document);

		// get Trn data and update trn
		const astWithTrnData = getTrnData(ast, document, getTrnFormJsx);
		// console.log(`astWithTrnData`, astWithTrnData);

		if (astWithTrnData) {
			// console.log(`document`, document);

			// update ast state
			updateDocument_(ast.id, { "astData.astState": "checked out" });
			// update trn (document) with the selected ast

			const astCat = ast.astData.astCartegory;
			// console.log(`astCat`, astCat);

			if (!document.astData[astCat]) {
				document.astData[astCat] = [];
			}

			updateDocument({
				...document,
				astData: {
					...document.astData,
					// [astCat]: [...document.astData[astCat], astWithTrnData],
					[astCat]: [
						...document.astData[astCat],
						{
							...astWithTrnData,
							astData: {
								...astWithTrnData.astData,
								astState: "checked out",
							},
						},
					],
				},
				// trnData: trnData,
				metaData: {
					...document.metaData,
					updatedAtDatetime: timestamp.fromDate(new Date()),
					updatedByUser: user.displayName,
					updatedByUserId: user.uid,
				},
			});
		}

		// update trn in firestore using useFirestore.updateDoc. This should automatically update the ast state in the checkedin table
	}, [selectedAstFromCheckedin]);

	// Take action on ast selected from checkedkout asts.
	// TODO: implement rules for checking in asts
	// Rules
	// 1. Ast cannot be remmoved from a trn that is in the submitted state
	useEffect(() => {
		// console.log(`selectedAstFromCheckedin`, selectedAstFromCheckedin);

		// update the state of the selected ast in firestore. This should automatically update the ast state in the checkedin table
		const ast = selectedAstFromCheckedout[0];
		// console.log(`ast`, ast);

		if (ast) {
			// get ast astCartegory
			const astCat = ast.astData.astCartegory;

			// update ast state
			updateDocument_(ast.id, { "astData.astState": "stores" });

			// delete the checkedin Ast
			if (document.astData[astCat].length === 1) {
				// console.log(`delete astCat from the document`);
				delete document.astData[astCat];
				updateDocument({
					...document,
					metaData: {
						...document.metaData,
						updatedAtDatetime: timestamp.fromDate(new Date()),
						updatedByUser: user.displayName,
						updatedByUserId: user.uid,
					},
				});
			} else {
				updateDocument({
					...document,
					astData: {
						...document.astData,
						[astCat]: document.astData[astCat].filter(asset => asset.id !== ast.id),
					},
					// trnData:
					metaData: {
						...document.metaData,
						updatedAtDatetime: timestamp.fromDate(new Date()),
						updatedByUser: user.displayName,
					},
				});
			}

			// from trn ast cat array, filter out the ast that has been checkedin and update trn
		}

		// update trn in firestore using useFirestore.updateDoc. This should automatically update the ast state in the checkedin table
	}, [selectedAstFromCheckedout]);

	// form header datail

	// form name
	const formName = (
		<>
			<span className="data-emphasis">{"Ast Checkout"}</span>.
		</>
	);

	// trn type
	const trnType = (
		<>
			Trn Type <span className="data-emphasis">{data.metaData.trnType}</span>.
		</>
	);

	// erf no
	const erfNo = (
		<>
			Erf No <span className="data-emphasis">{data.erfData.erfNo}</span>.
		</>
	);

	// trn state
	const formState = (
		<>
			Trn State
			<span className="data-emphasis">{props.data.metaData.trnState}</span>.
		</>
	);

	return (
		<div className="form-wrapper">
			<div className="form-container ast-checkout-form-container">
				{/* <div className="form-header5">
					<div className="fh5-left">
						<div className="form-name">
							<p>{data.metaData.trnType}</p>
						</div>
						<div className="form-name">
							<p>Ast Checkout</p>
						</div>
						<div className="erf-no">
							<p>Erf: {data.erfData.erfNo}</p>
						</div>
					</div>
					<div className="fh5-right">
						<button>
							form state : <span>{props.data.metaData.trnState}</span>{" "}
						</button>
						<button onClick={() => closeModal()}>
							<p>Cancel</p>
						</button>
					</div>
				</div> */}

				<FormHeader8
					// formName- dataLl
					dataLl={formName}
					// no of asts in erf = dataLr
					dataLr={trnType}
					// no of trns in erf
					dataRl={erfNo}
					// anomalies
					dataRr={formState}
					closeModal={closeModal}
				/>

				<div className="ast-checkout-form">
					<div className="checkout-form ast-stores-pannel">
						<p>ast-stores-pannel</p>
						<TableCheckedInAsts
							rowData={rowData}
							columnDefs={columnDefsCheckout}
							setSelectedRows={setSelectedAstFromCheckedin}
							trn={props.data}
						/>
					</div>
					<div className="checkout-form ast-checked-pannel">
						<p>ast-checked-pannel</p>
						<TableCheckedOutAsts
							rowData={trnAsts}
							columnDefs={columnDefsCheckin}
							setSelectedRows={setSelectedAstFromCheckedout}
							trn={props.data}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrnAstCheckoutForm;
