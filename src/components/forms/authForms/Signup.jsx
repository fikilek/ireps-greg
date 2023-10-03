import React, { useContext, useEffect, useState } from "react";
import "../forms.css";
import "./authForm.css";
import {
	FaFacebookF,
	FaGoogle,
	FaLinkedinIn,
	FaTwitter,
	FaUser,
	FaVoicemail,
} from "react-icons/fa";
import {
	MdEmail,
	MdManageAccounts,
	MdPassword,
	MdPattern,
	MdPerson,
	MdPersonAddAlt,
	MdPersonAddAlt1,
	MdWork,
} from "react-icons/md";
import irepsImage2 from "../../../images/irepsImage1.jpg";
import { ModalContext } from "../../../contexts/ModalContext";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import FormSectionBtns from "../formComponents/formSectionBtns/FormSectionBtns";
import { useSignup } from "../../../hooks/useSignup";
import useAuthContext from "../../../hooks/useAuthContext";
import FormBtn from "../formComponents/formBtn/FormBtn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthFormHeader from "./AuthFormHeader";
import useModal from "../../../hooks/useModal";

export const userObj = {
	surname: "",
	name: "",
	email: "",
	role: "",
	password: "",
	confirmPassword: "",
	signedon: false,
	phoneNumber: "",
};

const Signup = () => {
	const [userCredentials, setUserCredentials] = useState(userObj);
	// const { componentToOpen, setComponentToOpen, setModalOpened } =
	// 	useContext(ModalContext);
	const navigate = useNavigate();
	const { signup, error, isPending, success } = useSignup();
	const { user } = useAuthContext();
	const { closeModal, openModal } = useModal();

	useEffect(() => {
		setUserCredentials(userObj);
	}, []);

	const handleSignupSubmit = async e => {
		e.preventDefault();
		console.log(`Signup userCredentials data: `, userCredentials);
		await signup(userCredentials);
		// TODO: handle the "if" statement bellow with useEffect
	};

	useEffect(() => {
		if (success) {
			toast(`${user.displayName} succesfully signedin!`, {
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
			navigate("/unp", { replace: true });
		}
	}, [success, error, isPending]);

	const handleSignin = e => {
		closeModal();
		openModal({
			modalName: "signin",
		});
	};

	const handleReset = e => {
		e.preventDefault();
		setUserCredentials(userObj);
	};

	const handleFieldChange = e => {
		setUserCredentials({
			...userCredentials,
			[e.target.id]: e.target.value,
		});
	};

	return (
		<div className="auth-form-container">
			<AuthFormHeader headerTitleName={"Signup"} />

			{/* signup form */}
			<form className={`signup-form`} onSubmit={handleSignupSubmit}>
				{/* form field surname */}
				<div className="form-field form-field-surname">
					<span className="form-field-icon">
						<MdPersonAddAlt1 />
					</span>
					<input
						autoFocus
						type="text"
						name="surname"
						id="surname"
						value={userCredentials.surname}
						onChange={handleFieldChange}
						placeholder="surname"
					/>
				</div>
				{/* form field name */}
				<div className="form-field form-field-name">
					<span className="form-field-icon">
						<MdPersonAddAlt />
					</span>
					<input
						type="text"
						name="name"
						id="name"
						value={userCredentials.name}
						onChange={handleFieldChange}
						placeholder="name"
					/>
				</div>
				{/* form field email */}
				<div className="form-field form-field-email">
					<span className="form-field-icon">
						<MdEmail />
					</span>
					<input
						type="email"
						name="email"
						id="email"
						value={userCredentials.email}
						onChange={handleFieldChange}
						placeholder="enter email used for signup"
					/>
				</div>
				{/* form field phoneNumber */}
				<div className="form-field form-field-phoneNumber">
					<span className="form-field-icon">
						<MdManageAccounts />
					</span>
					<input
						type="text"
						name="phoneNumber"
						id="phoneNumber"
						value={userCredentials.phoneNumber}
						onChange={handleFieldChange}
						placeholder="phone number"
					/>
				</div>
				{/* form field password */}
				<div className="form-field form-field-password">
					<span className="form-field-icon">
						<MdPassword />
					</span>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						value={userCredentials.password}
						onChange={handleFieldChange}
					/>
				</div>
				{/* form field confirm password */}
				<div className="form-field form-field-confirm-password">
					<span className="form-field-icon">
						<MdPattern />
					</span>
					<input
						type="password"
						name="confirm-password"
						id="confirmPassword"
						placeholder="Confirm Password"
						value={userCredentials.confirmPassword}
						onChange={handleFieldChange}
					/>
				</div>
				<div className="auth-error-field">
					<p className="auth-error">{error && error}</p>
				</div>
				<div className="form-btns">
					<button type="button" className="form-btn reset" onClick={handleReset}>
						Reset
					</button>

					{isPending ? (
						<FormBtn isPending={isPending} />
					) : (
						<button className="form-btn submit">Submit</button>
					)}
				</div>{" "}
			</form>

			{/* signup footer */}
			<div className="signup-footer">
				<a href="#" onClick={handleSignin} className="signup-footer-signin-link">
					Already Registered? Sign in
				</a>
			</div>
		</div>
	);
};
export default Signup;
