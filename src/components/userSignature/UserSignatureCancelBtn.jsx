import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignature } from "../../hooks/useSignature";

const UserSignatureCancelBtn = ({ po, signatureName, closeModal }) => {
	// console.log(`po`, po);
	// console.log(`signatureName`, signatureName);
  const { response, cancelSignature } = useSignature(
    'pos',
		po,
		signatureName
  );
  
	const handleCancelSignature = e => {
		e.preventDefault();
		cancelSignature();
	};

	useEffect(() => {
		if (response.success) {
			toast(`Purchase Order [ Po-${po.poNo} ] signature cancelled succeesfully!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			closeModal();
		}
	}, [response.success]);

	return (
		<div className="user-signature-cancel-btn">
			{response.isPending ? (
				<button type="button" className="form-btn" disabled>
					<ClipLoader
						color="orange"
						loading={response.isPending}
						size={20}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</button>
			) : (
				<button onClick={handleCancelSignature} className="form-btn submit">
					Cancel Signature
				</button>
			)}
		</div>
	);
};

export default UserSignatureCancelBtn;
