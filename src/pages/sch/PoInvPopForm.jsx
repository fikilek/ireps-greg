import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { MdPassword } from "react-icons/md";
import FormBtn from "../../components/forms/formComponents/formBtn/FormBtn";
import useStorage from "../../hooks/useStorage";
import "./PoInvPopForm.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebaseConfig/fbConfig";
import useModal from "../../hooks/useModal";

const PoInvPopForm = ({
	po,
	type,
	showHideInvPopForm,
	setShowHideInvPopForm,
	invPopDataToEdit,
}) => {
	// console.log(`po`, po);
	// console.log(`type`, type);
	// console.log(`invPopDataToEdit`, invPopDataToEdit);

	const [data, setData] = useState(invPopDataToEdit);
	const [fileDataURL, setFileDataURL] = useState(null);
	const [formError, setFormError] = useState("");
	const { addFile, progress, error, url, deleteFile } = useStorage();
	const [isPending, setIsPending] = useState(null);
	const { closeModal, openModal } = useModal();
	const [invPopImagePath, setInvPopImagePath] = useState("");

	useEffect(() => {
		setData(invPopDataToEdit);
		setFileDataURL(invPopDataToEdit.url);
	}, [invPopDataToEdit]);

	const handleSubmit = async e => {
		e.preventDefault();
		// console.log(`data`, data);
		// prepare path to store the image if data is valid
		setFormError("");
		if (!data.no) {
			setFormError(`error, ${type} number field required`);
			return null;
		}
		if (!data.amount) {
			setFormError(`error, ${type} amount field required`);
			return null;
		}
		if (
			data.image &&
			!invPopDataToEdit.invPopImagePath &&
			!invPopDataToEdit.url
		) {
			console.log(`its a new inv/pop`);
			// its a new inv/pop.
			// write image into firebase storage and get url,
			// then create new inv or pop record and push into inv or pop array
			const invPopImagePath = `pos/${po.id}/${type}/${data.image.name}`;
			setInvPopImagePath(invPopImagePath);
			setIsPending(true);
			// create a new inv/pop image in storage
			console.log(`add ${data} to pos collection`);
			addFile(invPopImagePath, data.image);
			return null;
		}
		if (!data.image && invPopDataToEdit.invPopImagePath && invPopDataToEdit.url) {
			console.log(`its an exisinting inv/pop`);
			// its an exisinting inv/pop,
			// update only no / amount of inv / pop in pos collection

			// first delete existing
			console.log(`first delete existing`);
			const updatePoInvPop = httpsCallable(functions, "updatePoInvPop");
			const removedDoc = updatePoInvPop({
				poId: po.id,
				type,
				transactionType: "remove",
				schData: invPopDataToEdit,
			});
			console.log(`removedDoc`, removedDoc);
			// then add updated record
			console.log(`then add updated record`);
			const addedDoc = updatePoInvPop({
				poId: po.id,
				type,
				transactionType: "add",
				schData: {
					...invPopDataToEdit,
					no: data.no,
					amount: data.amount,
				},
			});
			console.log(`addedDoc`, addedDoc);
			toast(`${type} for Po-${po.poNo} succesfully updated!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setIsPending(false);
			setShowHideInvPopForm("poipf-hide");
			setFormError("");
			setInvPopImagePath("");
			closeModal();
			return null;
		}
		if (data.image && invPopDataToEdit.invPopImagePath && invPopDataToEdit.url) {
			// its an exisinting inv/pop
			// delete existing image,
			// create new image, update only pos inv or pop in pos collection

			// delete file at the existing url
			deleteFile(data.invPopImagePath);
			// delete document in the collection

			console.log(`removing data from pos collection`, invPopDataToEdit);
			const updatePoInvPop = httpsCallable(functions, "updatePoInvPop");
			const removedDoc = updatePoInvPop({
				poId: po.id,
				type,
				transactionType: "remove",
				schData: invPopDataToEdit,
			});
			console.log(`removedDoc`, removedDoc);

			const invPopImagePath = `pos/${po.id}/${type}/${data.image.name}`;
			setInvPopImagePath(invPopImagePath);
			setIsPending(true);
			// create a new inv/pop image in storage
			console.log(`add ${data} to pos collection`);
			addFile(invPopImagePath, data.image);
			return null;
		}
		console.log(`form not submitted`);
		setFormError("error, image required");
	};

	useEffect(() => {
		// console.log(`progress`, progress);
		// console.log(`error`, error);
		// console.log(`url`, url);
		if (url) {
			// update po.poInv / poPop using cloud https call function
			const poInvPopData = {
				poId: po.id,
				type,
				transactionType: "add",
				schData: {
					id: nanoid(),
					no: data.no,
					amount: data.amount,
					url,
					invPopImagePath,
				},
			};
			// console.log(`update po.poInv / poPop`, poInvPopData);

			const updatePoInvPop = httpsCallable(functions, "updatePoInvPop");
			updatePoInvPop(poInvPopData);

			toast(`${type} for Po-${po.poNo} succesfully updated!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});

			setIsPending(false);
			setShowHideInvPopForm("poipf-hide");
			setFormError("");
			setInvPopImagePath("");
			closeModal();
		}
	}, [progress, error, url]);

	const handleImageFile = e => {
		setFormError("");
		setData({
			...data,
			[e.target.name]: null,
		});

		let selectedFile = e.target.files[0];

		// const { validationError, errorMsg } = validateFileFormField(selectedFile);

		if (!selectedFile) {
			setFormError("error, file required");
			console.log("error, file required");
			return;
		}
		if (!selectedFile.type.includes("image")) {
			setFormError("error, selected file must be an image");
			console.log("error, selected file must be an image");
			return;
		}
		if (Number(selectedFile.size) > 200000) {
			setFormError("error, selected file must less than 200kb");
			console.log("error, selected file must less than 200kb");
			return;
		}

		// No Error in the file form field
		setData({
			...data,
			[e.target.name]: selectedFile,
		});
	};

	useEffect(() => {
		let fileReader,
			isCancel = false;
		if (data.image) {
			fileReader = new FileReader();
			fileReader.onload = e => {
				const { result } = e.target;
				if (result && !isCancel) {
					setFileDataURL(result);
				}
			};
			fileReader.readAsDataURL(data.image);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [data.image]);

	const handleCloseForm = e => {
		setShowHideInvPopForm("poipf-hide");
		setFileDataURL(null);
		setFormError(null);
		setIsPending(null);
	};

	return (
		// poipf
		<div className={`poipf-container`}>
			<div className={`${showHideInvPopForm} `}>
				<div className="poipf-header">
					<p>{type} form</p>
					<button onClick={handleCloseForm}>x</button>
				</div>
				<div className="poipf-body">
					<form onSubmit={handleSubmit} className="poip-form">
						<div className="poip-form-fields">
							<div className="form-field form-field-number">
								<span className="form-field-icon">
									<MdPassword />
								</span>
								<input
									autoFocus
									type="text"
									name={`no`}
									id={`no`}
									placeholder={`${type} number`}
									value={data.no}
									onChange={e =>
										setData({
											...data,
											[e.target.id]: e.target.value,
										})
									}
								/>
							</div>
							<div className="form-field form-field-amount">
								<span className="form-field-icon">
									<MdPassword />
								</span>
								<input
									type="number"
									name={`amount`}
									id={`amount`}
									placeholder={`${type} amount`}
									value={data.amount}
									onChange={e =>
										setData({
											...data,
											[e.target.id]: e.target.value,
										})
									}
								/>
							</div>{" "}
							<div className="form-field form-field-image">
								<span className="form-field-icon">
									<MdPassword />
								</span>
								<input
									type="file"
									name={`image`}
									id={`image`}
									placeholder={`${type} image`}
									onChange={handleImageFile}
								/>
							</div>
						</div>
						<div className="poip-form-image-preview-and-btn">
							{fileDataURL ? (
								<div className="img-preview-wrapper">
									{<img src={fileDataURL} alt="preview" />}
								</div>
							) : null}
							{formError && <div className="error">{formError}</div>}
							<FormBtn isPending={isPending} />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PoInvPopForm;
