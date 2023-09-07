
import { Timestamp } from "firebase/firestore";
import cloneDeep from "lodash.clonedeep";
import { timestamp } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";
import { useFirestore } from "./useFirestore";


const signatureReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			// console.log(`IS_PENDING`, action.payload);
			return {
				document: null,
				error: null,
				isPending: true,
				success: false,
			};
		case "ADD_SIGNATURE":
		case "UPDATED_SIGNATURE":
			// console.log(`ADD_DOCUMENT`, action.payload);
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
			return state;
	}
};

export const useSignature = (fbCollection, po, signatureName) => {
	const { user } = useAuthContext();
const {response, updateDocument} = useFirestore('pos')
	// console.log(`po before`, po);
	const newPo = cloneDeep(po);
	// console.log(`newPo`, newPo);

	const addSignature = () => {};

	const cancelSignature = () => {
			newPo.metaData.updatedAtDatetime = Timestamp.now();
			newPo.metaData.updatedByUser = user.displayName;
		if (signatureName === "poApprove") {
			newPo.poApprove.approveUid = "";
			newPo.poApprove.approveDate = "";
			// console.log(`newPo after`, newPo);
		}
		if (signatureName === "witness") {
			newPo.poData.poGrv.grvWitness.grvWitnessUid = "";
			newPo.poData.poGrv.grvWitness.grvWitnessDate = "";
			// console.log(`newPo after`, newPo);
		}
		if (signatureName === "receiver") {
			newPo.poData.poGrv.grvReceiver.grvReceiverUid = "";
			newPo.poData.poGrv.grvReceiver.grvReceiverDate = "";
			// console.log(`newPo after`, newPo);
		}
			updateDocument(newPo);
	};

	return { addSignature, cancelSignature, response };
};
