import React, { useEffect } from "react";
import { useState } from "react";
import { FcBusinessman, FcCellPhone } from "react-icons/fc";
import { MdEmail, MdOutlineEmail, MdPassword } from "react-icons/md";
import useAuthContext from "../../../../hooks/useAuthContext";
import FormError from "../formError/FormError";
import FormSectionBtns from "../formSectionBtns/FormSectionBtns";
import { useAuthenticateUser } from "../../../../hooks/useAuthenticateUser";
import { useFirestore } from "../../../../hooks/useFirestore";
import { timestamp } from "../../../../firebaseConfig/fbConfig";
import moment from "moment";

const FormSectionWitness = ({ po, setPo }) => {
	// console.log(`po`, po);
	// get detailes of the signed on user
	const { user } = useAuthContext();
	const {
		user: cr,
		authenticateUser,
		error,
		isPending,
		success,
	} = useAuthenticateUser();
	const [witness, setWitness] = useState(null);

	const { response, updateDocument } = useFirestore("pos");
	const { response: res, getDocument } = useFirestore("users");

	// get detailes of the witness from firebase auth using uid

	const [password, setPassword] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();
		console.log(`witnessing PO`);
		// authenticate the user from firebase auth
		if (password) {
			const confirmedReceiver = {
				email: user.email,
				password: password,
			};
			// console.log(`witnessing PO`, confirmedReceiver);
			await authenticateUser(confirmedReceiver);
		}
	};

	// run component when grvWitnessReceipt changes
	useEffect(() => {
		// update po in firestore using useFirestore hook ONLY if there is an id
		console.log(`response`, response);
		console.log(`res`, res);
		const id = po.id;
		if (id) {
			// console.log(`about to update po`);
			// delete po.id;
			updateDocument(po);
		}
	}, [po.poData.poGrv.grvWitnessReceipt]);

	// confirm witness using useAuthenticateUser
	useEffect(() => {
		if (success) {
			// console.log(`sucess`, cr);
			// update po with cr uid
			setPo(prev => {
				return {
					...prev,
					poData: {
						...prev.poData,
						poGrv: {
							...prev.poData.poGrv,
							grvWitnessReceipt: {
								...prev.poData.poGrv.grvWitnessReceipt,
								grvWitnessUid: cr.uid,
								grvWitnessDate: timestamp.fromDate(new Date()),
							},
						},
					},
				};
			});
		}
		if (error) {
			console.log(`error`, error);
		}
		if (isPending) {
			console.log(`is pending`);
		}
	}, [error, success, isPending, cr]);

	// check if the po has been witnessed
	useEffect(() => {
		const uid = po.poData.poGrv.grvWitnessReceipt.grvWitnessUid;
		if (uid) {
			getDocument(uid);
		}
	}, [response.success]);

	useEffect(() => {
		setWitness(res.document);
	}, [res]);

	// console.log(`po`,	 po);
	// console.log(`witness`,	 witness);

	return (
		// fs: form section
		// fsw: form section witness

		<div className="fs fs-fsb-grv fsb-grv-witness">
			<p className="fs-title witness-title">Witness</p>
			{witness ? (
				<div className="fsw fsw-witnessed">
					<div className="witnessed-msg">
						<p>
							{`This confirms that the goods received in this Purchase Order has been
							witnessed by the person below...`}
						</p>
					</div>
					<div className="grv-witness">
						<p>Name: {witness.displayName}</p>
						<p>Email: {witness.email}</p>
						<p>Phone: {witness.phoneNumber}</p>
						<p>
							Date:{" "}
							{moment(
								po.poData.poGrv.grvWitnessReceipt.grvWitnessDate.toDate()
							).format("YYYY-MM-DD HH:mm:ss")}
						</p>
					</div>
					<div className="cancel-witnessing">
						<button type="button">Cancel Witenssing</button>
					</div>
				</div>
			) : (
				<div className="fsw fsw-not-witnessed">
					<form onClick={handleSubmit}>
						<p>The goods have not been witnessed as yet.</p>
						<div className="form-field form-field-email">
							<span className="form-field-icon">
								<MdEmail />
							</span>
							<input
								disabled
								type="email"
								name="email"
								id="email"
								value={user.email}
								placeholder="enter email used for signin"
							/>
						</div>
						<div className="form-field form-field-password">
							<span className="form-field-icon">
								<MdPassword />
							</span>
							<input
								autoFocus
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						{/* <FormError error={error} /> */}
						{/* <FormError error={response.error} /> */}
						{/* <FormSectionBtns /> */}
						<div className="fsw-btns">
							<button type="button" className="form-btn reset">
								Reset
							</button>
							<button className="form-btn submit">Submit</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
export default FormSectionWitness;
