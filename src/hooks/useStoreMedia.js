import { useState } from "react";
import { getDownloadURL, uploadString } from "firebase/storage";

const useStoreMedia = () => {
	// console.log(`store media running`);
	const [response, setResp] = useState({
		error: null,
		success: null,
		isPending: null,
		// url: null,
		mediaUploading: null,
	});

	const storeMedia = async (storageRef, imgData) => {

		// console.log(`imgData`, imgData);
		setResp(prev => {
			return {
				...prev,
				isPending: true,
			};
		});

		const metadata = {
			customMetadata: {
				mediaType: imgData.metaData.mediaType,
				mediaCategory: imgData.metaData.mediaCategory,
				createdByUser: imgData.metaData.createdByUser,
				createdByUserId: imgData.metaData.createdByUserId,

				lat: imgData.metaData.createdAtLocation.lat,
				lng: imgData.metaData.createdAtLocation.lng,
				astCat: imgData.metaData.astCat,
				ml1: imgData.metaData.ml1,
			},
		};

		try {
			const snapshot = await uploadString(
				storageRef,
				imgData.url,
				"data_url",
				metadata
			);
			// console.log(`snapshot`, snapshot);

			setResp(prev => {
				return {
					...prev,
					mediaUploading: "succesfull",
				};
			});

			// get image url
			const url = await getDownloadURL(snapshot.ref);
			// console.log(`url`, url);

			setResp(prev => {
				return {
					...prev,
					url,
				};
			});

			setResp(prev => {
				return {
					...prev,
					isPending: false,
					success: true,
				};
			});
		} catch (error) {
			// console.log(`Error in storeMedia`, error);
			setResp({
				...response,
				error: error,
			});
		}
	};

	return { response, storeMedia };
};

export default useStoreMedia;
