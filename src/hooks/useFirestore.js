import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import cloneDeep from "lodash.clonedeep";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";

const initData = {
	document: null,
	error: null,
	isPending: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	// console.log(`action`, action);
	switch (action.type) {
		case "IS_PENDING":
			// console.log(`IS_PENDING`, action.payload);
			return {
				document: null,
				error: null,
				isPending: true,
				success: false,
			};
		case "ADD_DOCUMENT":
			// console.log(`ADD_DOCUMENT`, action.payload);
			return {
				document: action.payload,
				error: null,
				isPending: false,
				success: true,
			};
		case "UPDATED_DOCUMENT":
			console.log(`UPDATED_DOCUMENT`, action.payload);
			return {
				document: action.payload,
				error: null,
				isPending: false,
				success: true,
			};
		case "ERROR":
			// console.log(`ERROR`, action.payload);
			return {
				document: null,
				error: action.payload,
				isPending: false,
				success: false,
			};
		default:
			// console.log(`DEFAULT`, action.payload);
			return state;
	}
};

export const useFirestore = fbCollection => {
	const [response, dispatch] = useReducer(firestoreReducer, initData);
	const [isCancelled, setIsCancelled] = useState(false);
	// console.log(`isCancelled`, isCancelled);
	// console.log(`response`, response);

	const dispatchIfNotCancelled = action => {
		if (!isCancelled) {
			// console.log(`action`, action);
			dispatch(action);
		}
	};

	const ref = collection(db, fbCollection);

	const addDocument = async doc => {
		// console.log(`start adding doc`, doc)
		dispatch({ type: "IS_PENDING" });
		try {
			// console.log(`po`, po);
			const addedDocument = await addDoc(ref, doc);
			dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addedDocument });
			// console.log(`addedDocument`, addedDocument);
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	const deleteDocument = async id => {};

	const updateDocument = async document => {
		// console.log(`document`, document)
		const id = document.id;
		const newObj = cloneDeep(document);
		// delete newObj.id;
		dispatch({ type: "IS_PENDING", payload: newObj });
		// console.log(`id`, id)
		const docToUpdateRef = doc(db, fbCollection, id);
		try {
			// console.log(`po`, po)
			const updatedDoc = await updateDoc(docToUpdateRef, newObj);
			dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDoc });
			return updatedDoc;
		} catch (err) {
			console.log(`err`, err.message);
			dispatchIfNotCancelled({
				type: "ERROR",
				payload: err.message,
			});
		}
	};

	const updateDocument_ = async (id, update) => {
		// console.log(`id`,id)
		// console.log(`update`,update)
		dispatch({ type: "IS_PENDING", payload: update });
		const docToUpdateRef = doc(db, fbCollection, id);
		try {
			const updatedDoc = await updateDoc(docToUpdateRef, update);
			dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDoc });
			return updatedDoc;
		} catch (err) {
			console.log(`err`, err.message);
			dispatchIfNotCancelled({
				type: "ERROR",
				payload: err.message,
			});
		}
	};

	const getDocument = async uid => {
		console.log(`uid`, uid)
		const docRef = doc(db, fbCollection, uid);
		// console.log(`docRef`, docRef);
		dispatch({ type: "IS_PENDING" });
		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				// console.log("Document data:", docSnap.data());
				dispatchIfNotCancelled({
					type: "UPDATED_DOCUMENT",
					payload: docSnap.data(),
				});
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	useEffect(() => {
		return () => {
			// console.log(`useEffect returning`);
			setIsCancelled(true);
		};
	}, []);

	return {
		response,
		addDocument,
		deleteDocument,
		updateDocument,
		updateDocument_,
		getDocument,
	};
};
