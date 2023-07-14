import { useState } from "react";

export const useValidatePoProcess = () => {
	const validatePoProcess = (user, signatureName, poData) => {
		// console.log(`signatureName`, signatureName);
		switch (signatureName) {
			case "poApprove":
				// check if 1. there are po items 2. there is a supplier selected
				const { poPi } = poData;
				const thereIsPoi = poPi.length;
				if (!thereIsPoi) {
					console.log("cannot approve: no po items");
					return "cannot approve: no po items";
				}
				const { poSplData } = poData;
				const thereIsSupplier = poSplData.id;
				if (!thereIsSupplier) {
					console.log("cannot approve: no supplier");
					return "cannot approve: no supplier";
				}
				return "can approve";

			case "receiver":
        const { approveUid, approveDate } = poData.poApprove;
				// 1. check if po is approved. There will be approveUid
				if (!approveUid) {
					console.log("cannot receive: no approve UID");
					return "cannot receive: not approved";
				}
				// 1. check if po is approved. There will be approveDate
				if (!approveDate) {
					console.log("cannot receive: no approve date");
					return "cannot receive: not approved";
				}
				return "can receive";
      case "witness":
        const { grvReceiverUid, grvReceiverDate } = poData.poData.poGrv.grvReceiver;
        // check if po has been received
				if (!grvReceiverUid) {
					console.log("cannot witness: no receiver Uid");
					return "cannot witness: not received";
				}
				if (!grvReceiverDate) {
					console.log("cannot witness: no receiver Date")
					return "cannot witness: not received";
				}
        return "can witness";
			default:
				return null;
		}
	};

	return { validatePoProcess };
};
