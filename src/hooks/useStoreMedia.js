import { useState } from "react";
import { getDownloadURL, uploadString } from "firebase/storage";
import { useFirestore } from "./useFirestore";

const useStoreMedia = () => {
	// console.log(`store media running`);
	const [response, setResp] = useState({
		error: null,
		success: null,
		isPending: null,
		url: null,
		mediaUploading: null,
	});

	// get furestroe hook to add, edit and delete meter
	const { response: fireStoreResponse, updateDocument } = useFirestore("trns");

	const storeMedia = async (storageRef, imgData, update, trnId) => {
		setResp(prev => {
			return {
				...prev,
				isPending: true,
			};
		});
		try {
			const snapshot = await uploadString(storageRef, imgData.url, "data_url");
			// console.log(`snapshot`, snapshot);

			setResp(prev => {
				return {
					...prev,
					mediaUploading: "succesfull",
				};
			});
			const url = await getDownloadURL(snapshot.ref);
			// console.log(`url`, url);

			setResp(prev => {
				return {
					...prev,
					url,
				};
			});
			const updatedTrnDoc = await update(url);
			// console.log(`updatedTrnDoc`, updatedTrnDoc);

			updateDocument(updatedTrnDoc);
			setResp(prev => {
				return {
					...prev,
					isPending: false,
					success: true,
				};
			});
		} catch (error) {
			console.log(`Error in storeMedia`, error);
			setResp({
				...response,
				error: error,
			});
		}
	};

	return { response, storeMedia };
};

export default useStoreMedia;
