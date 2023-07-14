import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { useFirestore } from "../../../hooks/useFirestore";
import FormSectionBtns from "./formSectionBtns/FormSectionBtns";
import FormSectionPoItems from "./formSectionPoItems/FormSectionPoItems";
import FormSectionInvPopSupplier from "./formSectionInvPopSupplier/FormSectionInvPopSupplier";
import FormSectionMetadata from "./formSectionMetadata/FormSectionMetadata";
import FormSectionGrv from "./formSectionGrv/FormSectionGrv";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormBtn from "./formBtn/FormBtn";

const FormBodyPo = ({ formData }) => {
	const { setComponentToOpen, setModalOpened } = useContext(ModalContext);
	// const [po, setForm] = useState(formData);
	const [po, setPo] = useState(formData);
	// console.log(`po`, po);
	const [active, setActive] = useState(null);
	// console.log(`active`, active);
	const { addDocument, response, updateDocument } = useFirestore("pos");
	// console.log(`response`, response);

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(`po`, po);
		if (po.id) {
			// there is an id. So the document exists. It therefore must only be updated.
			// console.log(`Updating doc:`, po);
			// const id = po.id;
			// delete po.id;
			updateDocument(po);
		} else {
			// there is no id. So the document is new. There add the document to the collection.
			// console.log(`Creating doc:`, po);
			addDocument(po);
		}
	};

	useEffect(() => {
		if (response.success) {
			setPo([]);
			setModalOpened(false);
			setComponentToOpen("");
			toast(`New Purchase Order ${po.id ? "updated" : "created"} succeesfully!`, {
				position: "bottom-left",
				autoClose: 5000,
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
		<div className="form-body form-body-po">
			<form className="po-form" onSubmit={handleSubmit}>
				<FormSectionMetadata
					po={po}
					setPo={setPo}
					active={active}
					setActive={setActive}
				/>
				<FormSectionInvPopSupplier
					po={po}
					setPo={setPo}
					active={active}
					setActive={setActive}
				/>
				<FormSectionPoItems
					po={po}
					setPo={setPo}
					active={active}
					setActive={setActive}
				/>
				{po.id && (
					<FormSectionGrv
						po={po}
						setPo={setPo}
						active={active}
						setActive={setActive}
					/>
				)}
				{/* <FormSectionBtns /> */}
				<div className="fs-btns">
					<button type="button" className="form-btn reset">
						Reset
					</button>
					{/* <button className="form-btn submit">Submit</button> */}
					<FormBtn isPending={response.isPending} btnName="submit" disabled={false} />
				</div>
			</form>
		</div>
	);
};

export default FormBodyPo;
