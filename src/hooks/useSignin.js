import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";

export const useSignin = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();
	const [success, setSuccess] = useState(false);

	const signin = async userCredentials => {
		const { email, password } = userCredentials;
		try {
			setIsPending(true);
			setError(null);
			setSuccess(false);
			const result = await signInWithEmailAndPassword(auth, email, password);
			if (!result) {
				throw new Error("User signin failed");
			}
			// console.log(`result`, result.user);
			const { user } = result;

			dispatch({ type: "SIGNIN", payload: user });
			setIsPending(false);
			setError(null);
			setSuccess(true);
		} catch (err) {
			setIsPending(false);
			setError(err.message);
			setSuccess(false);
			// console.log(`signin err`, err.message)
		}
	};

	return { signin, error, isPending, success };
};
