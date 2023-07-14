import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, functions } from "../firebaseConfig/fbConfig";
import { httpsCallable } from "firebase/functions";

export const useAuthenticateUser = ({ poData, signatureName }) => {
	// console.log(`poData`, poData);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [success, setSuccess] = useState(false);

	const authenticateUser = async userCredentials => {
		// console.log(`authenticateUser`, userCredentials)
		const { email, password } = userCredentials;
		try {
			setIsPending(true);
			setError(null);
			setSuccess(false);
			const result = await signInWithEmailAndPassword(auth, email, password);
			if (!result) {
				throw new Error("User signin failed");
			}
			// console.log(`result.user`, result.user);
			// call cloud function signPo(uid, po id, signatureName)

			const signPo = httpsCallable(functions, "signPo");
			await signPo({uid: result.user.uid, poId: poData.id, signatureName }).then(result => {
				// console.log(`result`, result);
				setIsPending(false);
				setError(null);
				setSuccess(true);
			});

			
		} catch (err) {
			setIsPending(false);
			setError(err.message);
			setSuccess(false);
			// console.log(`signin err`, err.message)
		}
	};

	return { authenticateUser, error, isPending, success };
};
