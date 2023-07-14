import React, { useContext, useEffect} from "react";
import "../forms.css";
import { MdCheck, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../contexts/ModalContext";

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { useSignout } from "../../../hooks/useSignout";

const Signout = () => {
	const { setModalOpened } = useContext(ModalContext);
	const navigate = useNavigate();
	const { signout, error, isPending } = useSignout();

	const handleSignoutKeepBtn = e => {
		// dont close the window but remove or close modal
		setModalOpened(false); //Close modal
	};

	// const unsub = useEffect(() => {
	// 	console.log(`error`, error)
	// 	console.log(`isPending`, isPending)
	// 	if (error === null && !isPending) {
	// 		setModalOpened(false); //Close modal
	// 		navigate("/", { replace: true });
	// 	}
	// 	return () => unsub
	// }, [])

	const handleSignoutCloseBtn = e => {
		// sign user out, close modal and navigate to Home
		signout();
		if (error === null && !isPending) {
			setModalOpened(false); //Close modal
			navigate("/", { replace: true });
		}
		// TODO: change this code and use useEffect to handle it better
	};

	return (
		<div className="auth-form-container">
			<div className="signout">
				<h1>Thanks for using iREPS</h1>
				<div className="signout-confirm-btns">
					<Tooltip
						// options
						title="Cancel Signout and continue working"
						position="bottom"
						// trigger="click"
					>
						<button
							className="close-btn"
							id="signout-keep"
							onClick={handleSignoutKeepBtn}
						>
							<MdClose />
						</button>
					</Tooltip>

					<Tooltip
						// options
						title="Signout and exit the application"
						position="bottom"
						// trigger="click"
					>
						<button
							className="close-btn"
							id="signout-close"
							onClick={handleSignoutCloseBtn}
						>
							<MdCheck />
						</button>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default Signout;

// TODO: when the user clicks "ok" or the "tick" to proceed with the sign out, the page flickrs. Fix that at some stage. 