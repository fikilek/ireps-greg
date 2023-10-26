import { nanoid } from "@reduxjs/toolkit";
import {
	addDoc,
	collection,
	doc,
	Timestamp,
	writeBatch,
} from "firebase/firestore";
import { useState } from "react";
import ErfsForm from "../components/forms/erfsForm/ErfsForm";
import { db, timestamp } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";

const useUpload = collectionName => {
	const [result, setResult] = useState({
		error: null,
		inPending: null,
		sucess: null,
	});

	const { user } = useAuthContext();

	const upload = uploadData => {
		// console.log(`uploadData`, uploadData);
		// const ref = collection(db, collectionName);

		// Get a new write batch
		const batch = writeBatch(db);
		// console.log(`batch`, batch);

		try {
			setResult({
				...result,
				isPending: true,
			});
			uploadData?.forEach(erf => {
				erf = {
					...erf,
					metaData: {
						...erf.metaData,
						updatedAtDatetime: Timestamp.now(),
						updatedByUser: user.displayName,
						updatedByUserId: user.uid,
						createdAtDatetime: Timestamp.now(),
						createdByUser: user.displayName,
						createdByUserId: user.uid,
					},
				};

				const ref = doc(db, collectionName, nanoid());
				// console.log(`add erf to erfs collection`, erf);
				batch.set(ref, erf);
			});
			batch.commit().then(uploadBarchOutcome => {
				console.log(`uploadBarchOutcome`, uploadBarchOutcome);
			});
			setResult({
				...result,
				success: true,
				isPending: false,
			});
		} catch (error) {
			console.log(`Error in uploading document: `, error.message);
			setResult({
				...result,
				error: error.message,
			});
		}
	};

	return { result, upload };
};

export default useUpload;
