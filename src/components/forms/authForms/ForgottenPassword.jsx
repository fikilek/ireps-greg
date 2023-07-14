import React, { useContext, useState, useRef, useEffect } from "react";
import "../forms.css";
import { MdEmail } from "react-icons/md";
import irepsImage2 from "../../../images/irepsImage1.jpg";
import { ModalContext } from "../../../contexts/ModalContext";
import AuthFormHeader from "./AuthFormHeader";
import useModal from "../../../hooks/useModal";

const ForgottenPassword = () => {
	const inputRef = useRef();

	// Fpw is the Forgotten Password section
	const [emailFpw, setEmailFpw] = useState("");

	const { openModal, closeModal } = useModal();

	const handleModalCloseBtn = e => {
		closeModal();
	};

	const handleClick = e => {
		openModal({ modalName: e.target.id });
	};

	const handleClear = e => {
		e.preventDefault();
		setEmailFpw("");
		inputRef.current.focus();
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(`user email adr: `, emailFpw);
		handleModalCloseBtn(e.target);
	};

	useEffect(() => {
		inputRef.current.focus();
	}, [inputRef]);

	return (
		<div className="fpw-container">
			<AuthFormHeader headerTitleName={"Forgoten Password"} />
			{/* fpw form */}
			<form className="fpw-form" onSubmit={handleSubmit}>
				<div className="form-field form-field-email">
					{/* email fiels */}
					<span className="form-field-icon">
						<MdEmail />
					</span>
					<input
						ref={inputRef}
						type="email"
						name="emailFpw"
						id="emailFpw"
						value={emailFpw}
						onChange={e => setEmailFpw(e.target.value)}
						placeholder="enter email used for signin"
					/>
				</div>
				<div className="form-btns">
					<a href="#" onClick={handleClear} className="form-btn" id="signup">
						Clear
					</a>
					<button className="form-btn submit">Submit</button>
				</div>
			</form>

			{/* fpw footer */}
			<div className="fpw-footer">
				<div className="fpw-footer-signup">
					<a
						href="#"
						onClick={handleClick}
						className="fpw-footer-signup-link"
						id="signup"
					>
						Sign up
					</a>
				</div>
				<div className="fpw-footer-remembered-pwd">
					<a
						href="#"
						onClick={handleClick}
						className="fpw-footer-remembered-pwd-link"
						id="signin"
					>
						Remembered password?
					</a>
				</div>
			</div>
		</div>
	);
};
export default ForgottenPassword;
