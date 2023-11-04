import React, { useContext, useEffect, useState } from "react";
import "../forms.css";
import { MdEmail, MdPassword } from "react-icons/md";
import irepsImage2 from "../../../images/irepsImage1.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuContext } from "../../../contexts/MenuContext";
import { useSignin } from "../../../hooks/useSignin";
import useModal from "../../../hooks/useModal";
import FormBtn from "../formComponents/formBtn/FormBtn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "../../../hooks/useAuthContext";
import AuthFormHeader from "./AuthFormHeader";

const initSigninData = {
	email: "",
	password: "",
};

const Signin = props => {
	// console.log(`props`, props)

	const pathname = props.location.pathname;
	// console.log(`pathname`, pathname)

	// after authentication, navigate to destination if there is. otherwiese go to home,
	const destination = pathname ? pathname : "./landing-page";

	// user credentials comprise of user email and password
	const [userCredentials, setUserCredentials] = useState(initSigninData);

	const { user } = useAuthContext();

	// this section sontrols the display of the modal
	const { openModal, closeModal } = useModal();
	const { setMenuStatus } = useContext(MenuContext);

	const { signin, error, isPending, success } = useSignin();

	const navigate = useNavigate();
	const location = useLocation();
	// console.log(`location`, location)
	const from = location.state?.from?.pathname || "/unp";

	const handleModalCloseBtn = e => {
		if (!location.state?.from?.pathnam) {
			// console.log(`closing modal pathname`);
			closeModal();
			navigate(-1);
		} else {
			// console.log(`closing modal else`)
			closeModal();
		}
	};

	const handleSignup = e => {
		openModal({ modalName: "signup" });
	};

	const handleFpw = e => {
		openModal({ modalName: "fpw" });
	};

	const handleSigninSubmit = e => {
		e.preventDefault();
		signin(userCredentials);
		// TODO: change this code and use useEffect to handle it better
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
			closeModal({ modalName: "signin" });
			// setModalOpened(false);
			setMenuStatus(false);
			// navigate(from, { replace: true });
			navigate(destination, { replace: true });
		}
	}, [success, error, isPending]);

	return (
		<div className="signin-container">
			<AuthFormHeader headerTitleName={"Signin"} />
			{/* signin form */}
			<form className={`signin-form`} onSubmit={handleSigninSubmit}>
				<div className="form-field form-field-email">
					<span className="form-field-icon">
						<MdEmail />
					</span>
					<input
						autoFocus
						type="email"
						name="email"
						id="email"
						value={userCredentials.email}
						onChange={e => {
							setUserCredentials({
								...userCredentials,
								[e.target.name]: e.target.value,
							});
						}}
						placeholder="enter email used for signin"
					/>
				</div>
				<div className="form-field form-field-password">
					<span className="form-field-icon">
						<MdPassword />
					</span>
					<input
						type="password"
						name="password"
						id="pwd"
						placeholder="Password"
						value={userCredentials.password}
						onChange={e => {
							setUserCredentials({
								...userCredentials,
								[e.target.name]: e.target.value,
							});
						}}
					/>
				</div>

				<div className="auth-error-field">
					<p className="auth-error">{error && error}</p>
				</div>

				<div className="form-btns">
					<button
						type="reset"
						className="form-btn Clear"
						onClick={e => setUserCredentials(initSigninData)}
					>
						Reset
					</button>
					<FormBtn isPending={isPending} btnName={"Signin"} />
				</div>
			</form>

			{/* signin footer */}
			<div className="signin-footer">
				<div className="signin-footer-signup">
					<a
						id="signup"
						href="#"
						onClick={handleSignup}
						className="signin-footer-signup-link"
					>
						Not Registered, Sign up
					</a>
				</div>
				<div className="signin-footer-fpw">
					<a
						id="fpw"
						href="#"
						onClick={handleFpw}
						className="signin-footer-forgotten-link"
					>
						Forgot password?
					</a>
				</div>
			</div>
		</div>
	);
};
export default Signin;
