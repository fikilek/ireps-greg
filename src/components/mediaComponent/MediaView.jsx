import React, { useContext, useState } from "react";
import "./MediaView.css";
import { MediaViewContext } from "../../contexts/MediaViewContext";
import { db, functions, storage } from "../../firebaseConfig/fbConfig";
import { httpsCallable } from "firebase/functions";
import { ClipLoader, PropagateLoader } from "react-spinners";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useModal from "../../hooks/useModal";
import { deleteObject, ref } from "firebase/storage";

const MediaView = () => {
	const { mediaViewData, setMediaViewData } = useContext(MediaViewContext);
	// console.log(`mediaViewData`, mediaViewData);

	const { closeModal } = useModal();

	// create state to monitor media delete
	const [isPending, setIsPending] = useState(null);
	// console.log(`isPending`, isPending);

	const showHideStatus = mediaViewData ? "show-media-view" : "hide-media-view";

	const deleteMedia = e => {
		e.preventDefault();
		setIsPending(true);

		// console.log(`delelte media`, mediaViewData);
		const { id, index, metaData, url } = mediaViewData;

		// get refernce to the doc with media to delete
		const docRef = doc(db, "meters", id);
		// console.log(`docRef`, docRef);

		getDoc(docRef).then(docSnap => {
			if (docSnap.exists()) {
				const docData = docSnap.data();
				// console.log("docData", docData);

				const astMediaCatArray = docData[metaData.mediaCategory];
				// console.log(`astMediaCatArray`, astMediaCatArray);

				const newAstMediaCatArray = astMediaCatArray.filter(
					item => item.url !== url
				);
				// console.log(`newAstMediaCatArray.length`, newAstMediaCatArray);

				// update the doc using update method of the docRef
				updateDoc(docRef, {
					[metaData.mediaCategory]: newAstMediaCatArray,
				})
					.then(updateResult => {
						// console.log(`photo deleted from doc [${id}]:`, updateResult);
					})
					.then(() => {
						let pictureRef = ref(storage, url);
						// console.log(`pictureRef`, pictureRef);

						// Delete the file
						deleteObject(pictureRef);
					})
					.then(() => {
						// console.log( `Photo with url [${url}] is deleted successfully`	);
						setIsPending(false);
						setMediaViewData(null);
						closeModal("astMediaView");
					})
					.catch(error => {
						console.log(`error deleting pic from doc [${id}]`, error);
						setIsPending(false);
					});
			} else {
				// docSnap.data() will be undefined in this case
				console.log("No such document!");
			}
		});
	};
	return (
		<div className={`media-view ${showHideStatus} `}>
			<div className="header">
				<p className="media-view-title title-name">
					{mediaViewData?.metaData.mediaCategory}
				</p>
				<div className="loader">
					{isPending ? (
						<ClipLoader
							color="orange"
							loading={isPending}
							size={13}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					) : (
						<button className="delete-media" onClick={deleteMedia}>
							Delete Media
						</button>
					)}
				</div>
				<div className="media-view-title media-view-title-close-btn">
					<button onClick={() => setMediaViewData(null)}>X</button>
				</div>
			</div>
			<div className="media-view-img">
				<img src={mediaViewData?.url} alt="media view" />
				<div className="media-view-metadata">
					<p>{mediaViewData?.metaData.mediaCategory}</p>
					<p>{mediaViewData?.metaData.createdAtDatetime}</p>
					<p>
						{mediaViewData?.metaData.createdAtLocation.lat} /{" "}
						{mediaViewData?.metaData.createdAtLocation.lng}
					</p>
					<p>{mediaViewData?.metaData.createdByUser}</p>
				</div>
			</div>
		</div>
	);
};

export default MediaView;
