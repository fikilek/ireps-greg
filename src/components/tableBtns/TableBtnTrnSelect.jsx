import React, { useState, useEffect } from "react";
import "./TableBtnTrnSelect.css";
import useAuthContext from "../../hooks/useAuthContext";
import useModal from "../../hooks/useModal";
import { newTrnData } from "../../data/adminData/adminData.js";
import { timestamp } from "../../firebaseConfig/fbConfig";
import { astNextState } from "../../data/adminData/adminData.js";
import { formSects } from "../forms/formComponents/formSections/formSects";
import { useErf } from "../../hooks/useErf";
import { useDocument } from "../../hooks/useDocument";
import { useFirestore } from "../../hooks/useFirestore";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";

const TableBtnTrnSelect = params => {
	console.log(`params.data`, params.data);
	const { user } = useAuthContext();

	const { response, addDocument } = useFirestore("trns");
	// console.log(`response`, response);

	// const [erf, setErf] = useState({});
	let erf = {};

	const { getAstData } = useErf();

	const [choosenTrnType, setChoosenTrnType] = useState("choose");
	// console.log(`choosenTrnType`, choosenTrnType);

	const [hideShowBtn, setHideShowBtn] = useState(true);
	// console.log(`hideShowBtn`, hideShowBtn);

	// ------------------------------------------------
	// console.log(`params.data.erfData.id`, params.data?.erfData?.id);

	// get erf IF
	const erfId = params?.data?.erfData?.id;
	// console.log(`erfId`, erfId);

	// get erf document from useFirestore
	useDocument("erfs", erfId).then(doc => {
		// console.log(`doc.document?.asts`, doc.document?.asts);
		// setErf(doc.document);
		erf = doc.document;
		// console.log(`erf`, erf);
	});

	//-------------------------------------------------

	const { astState, astCartegory, astNo } = params.data.astData;

	const [newTrn, setNewTrn] = useState(newTrnData);
	console.log(`newTrn`, newTrn);
	const [poTrns, setPoTrns] = useState([]);
	// console.log(`poTrns`, poTrns);
	// const { astData } = params.data;
	const { openModal } = useModal();

	// console.log(`-------------------------------------`);
	// console.log(`astNextState`, astNextState);
	// console.log(`astCartegory`, astCartegory);
	// console.log(`astState`, astState);

	useEffect(() => {
		const possibleTrns = astNextState[astCartegory][astState];
		// console.log(`possibleTrns`, possibleTrns);
		if (possibleTrns) {
			const possibleTrnsArray = Object.keys(possibleTrns);
			// console.log(`possibleTrnsArray`, possibleTrnsArray);
			setPoTrns(possibleTrnsArray);
		}
	}, [astCartegory, astState]);

	// console.log(`newTrnData`, newTrnData);`
	// console.log(`astStateNames`, astStateNames);
	// console.log(`astState`, astState);
	// console.log(`astCartegory`, astCartegory);
	// console.log(`astNo`, astNo);

	useEffect(() => {
		// console.log(`uesEffect to set newTRn`);
		// console.log(`params.data`, params.data);

		setNewTrn({
			// ...newTrnData,
			metaData: {
				...newTrnData.metaData,
				createdAtDatetime: Timestamp.now(),
				createdByUser: user.displayName,
				createdByUserId: user.uid,
				updatedAtDatetime: Timestamp.now(),
				updatedByUser: user.displayName,
			},
			erfData: erf,
		});

		return () => {
			// console.log(`unmounting component`);
			setNewTrn({});
		};
	}, [params, user]);

	const handleChange = e => {
		// console.log(`e.target.value`, e.target.value);

		setChoosenTrnType(e.target.value);

		if (erf) {
			// getAstData
			const astData = getAstData(erf);
			// console.log(`astData`, astData);

			setNewTrn(prev => {
				// console.log(`prev`, prev);

				// select the appropriate trnData from formSects
				const astCat = params.data?.astData?.astCartegory;
				// console.log(`astCat`, astCat);

				return {
					...prev,
					metaData: {
						...prev.metaData,
						trnType: e.target.value,
					},
					erfData: erf,
					astData:
						e.target.value === "inspection"
							? astData
							: {
									[astCat]: [
										{
											astData: params.data.astData,
											id: params.data.id,
											trnData: formSects[astCat][e.target.value]?.trnData,
										},
									],
							  },
				};
			});
		}
	};

	const newTrnAllowed =
		newTrn?.metaData?.trnType && newTrn?.astData && choosenTrnType !== "choose";
	// const hideShowBtn =
	// 	choosenTrnType === "choose" || !newTrn?.astData || response?.isPending
	// 		? "hide-new-trn-btn" : "";
	useEffect(() => {
		if (choosenTrnType === "choose" || !newTrn?.astData || response?.isPending) {
			setHideShowBtn(true);
		} else {
			setHideShowBtn(false);
		}
	}, [choosenTrnType, newTrn?.astData, response?.isPending]);

	const openNewTrn = () => {
		// console.log(`newTrn`, newTrn);
		if (newTrnAllowed) {
			console.log(`newTrn`, newTrn);
			addDocument(newTrn);
			// openModal({
			// 	modalName: "trnDataForm",
			// 	payload: newTrn,
			// });
			setHideShowBtn(true);
			setChoosenTrnType("choose");
		}
	};

	useEffect(() => {
		// console.log(`response`, response);
		if (response.success) {
			setHideShowBtn(true);
			setChoosenTrnType("choose");
			console.log(
				`new trn [${response.document.id}] SUCCESFULLY created`,
				response
			);
			toast(`new trn [${response.document.id}] SUCCESFULLY created!`, {
				position: "bottom-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}, [response]);

	return (
		<div className="table-btn-trn-select">
			<button
				className={`table-row-btn ${hideShowBtn ? "hide-new-trn-btn" : ""} `}
				onClick={openNewTrn}
			>
				NT
			</button>
			<select
				value={hideShowBtn ? "choose" : newTrn.metaData.trnType}
				onChange={handleChange}
				placeholder=""
				className="trn-select"
			>
				<option key={-1} value={null}>
					{"choose"}
				</option>
				{poTrns &&
					poTrns.map((trn, index) => {
						return (
							<option key={index} value={trn}>
								{trn}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default TableBtnTrnSelect;
