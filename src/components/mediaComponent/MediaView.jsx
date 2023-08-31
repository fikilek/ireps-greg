import React, { useContext, useState } from "react";
import "./MediaView.css";
import { MediaViewContext } from "../../contexts/MediaViewContext";
import { storage } from "../../firebaseConfig/fbConfig";
import { ClipLoader } from "react-spinners";
import useModal from "../../hooks/useModal";
import { deleteObject, ref } from "firebase/storage";
import { irepsDictionary } from "../../utils/utils";

const MediaView = () => {
	const { mediaViewData, setMediaViewData } = useContext(MediaViewContext);
	// console.log(`mediaViewData`, mediaViewData);

	// get date cteated
	const name = mediaViewData?.metaData?.name;
	// console.log(`name`, name)
	const nameArray = name?.split("_");
	// console.log(`nameArray`, nameArray);

	// destructure photoname
	const photoName = mediaViewData?.photoName;
	// console.log(`photoName`, photoName)

	const { closeModal } = useModal();

	// create state to monitor media delete
	const [isPending, setIsPending] = useState(null);
	// console.log(`isPending`, isPending);

	const showHideStatus = mediaViewData ? "show-media-view" : "hide-media-view";

	const deleteMedia = e => {
		e.preventDefault();
		setIsPending(true);

		// console.log(`delelte media`, mediaViewData);
		const { url } = mediaViewData;

		let pictureRef = ref(storage, url);
		// console.log(`pictureRef`, pictureRef);

		// Delete the file
		deleteObject(pictureRef)
			.then(() => {
				// console.log( `Photo with url [${url}] is deleted successfully`	);
				setIsPending(false);
				setMediaViewData(null);
				closeModal("astMediaView");
			})
			.catch(error => {
				console.log(`error deleting pic from doc [${url}]`, error);
				setIsPending(false);
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
					<p> {photoName}</p>
					<p>{nameArray && `${nameArray[1]} : ${nameArray[2]} `}</p>
					<p>
						{mediaViewData?.metaData.customMetadata.lat} /{" "}
						{mediaViewData?.metaData.customMetadata.lng}
					</p>
					<p>{mediaViewData?.metaData.customMetadata.createdByUser}</p>
				</div>
			</div>
		</div>
	);
};

export default MediaView;
