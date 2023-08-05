import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { ClipLoader } from "react-spinners";
import { flatten, unflatten } from "flat";

import Webcam from "react-webcam";
import { PhotoAppContext } from "../../contexts/PhotoAppContext";
import "./PhotoApp.css";
import {
	MdOutlineCameraAlt,
	MdSettingsVoice,
	MdVideoCameraBack,
	MdCamera,
	MdAddAPhoto,
} from "react-icons/md";
import { BsCameraFill, BsImage } from "react-icons/bs";
import { TfiSave } from "react-icons/tfi";
import { storage, timestamp } from "../../firebaseConfig/fbConfig";
import { format } from "date-fns";
import MediaComponent from "../mediaComponent/MediaComponent";
import MediaView from "../mediaComponent/MediaView";
import MediaViewMetaData from "../mediaComponent/MediaViewMetaData";
import useAuthContext from "../../hooks/useAuthContext";
import { useDocumentSync } from "../../hooks/useDocumentSync";
import { ref } from "firebase/storage";
import useStoreMedia from "../../hooks/useStoreMedia";
import cloneDeep from "lodash.clonedeep";
import useGeoLocation from "../../hooks/useGeolocation";

const updateDoc = (data, imgData, trnDoc) => {
	// console.log(`data`, data);
	// console.log(`imgData`, imgData);

	return url => {
		const keys = data?.field?.name
			.replaceAll("[", ".")
			.replaceAll("]", ".")
			.replaceAll("..", ".");
		// console.log(`keys`, keys);

		const keysArray = keys.split(".");
		// console.log(`keysArray`, keysArray);
		
		// destructure mediaCat
		const { mediaCategory } = imgData.metaData;
		// console.log(`mediaCategory`, mediaCategory);

		// deep clone trnDoc to prevent mutation
		const trnDocClone = cloneDeep(trnDoc);
		// console.log(`trnDocClone BEFORE`, trnDocClone);

		// get the media category array
		let mediaCatArray = trnDocClone;
		keysArray.forEach(key => {
			// console.log(`key`, key);
			mediaCatArray = mediaCatArray[key];
		});
		// console.log(`mediaCatArray BEFORE`, mediaCatArray);

		// push the new imgData into the media cat
		mediaCatArray.push({
			...imgData,
			url,
		});
		// console.log(`mediaCatArray AFTER`, mediaCatArray);

		// update trnDocClone with updated mediaCatArray. This will depend on the media cat
		switch (mediaCategory) {
			case "astNoMedia":
				trnDocClone[keysArray[0]][keysArray[1]][keysArray[2]][keysArray[3]][
					keysArray[4]
				] = mediaCatArray;
				break;
			case "keyPadMedia":
				trnDocClone[keysArray[0]][keysArray[1]][keysArray[2]][keysArray[3]][
					keysArray[4]
				][keysArray[5]] = mediaCatArray;
				break;
			case "insideBoxMedia":
				trnDocClone[keysArray[0]][keysArray[1]][keysArray[2]][keysArray[3]][
					keysArray[4]
				][keysArray[5]][keysArray[6]] = mediaCatArray;
				break;
			default:
				throw new Error("Error updating ast media category");
		}
		// console.log(`trnDocClone AFTER`, trnDocClone);

		return trnDocClone;
	};
};

const PhotoApp = () => {
	const { photoAppData, setPhotoAppData } = useContext(PhotoAppContext);
	// console.log(`photoAppData`, photoAppData);

	// get save media function from save media hook
	const { response, storeMedia } = useStoreMedia();
	// console.log(`storeMedia`, storeMedia)
	// console.log(`response`, response);

	// get geolocation
	const [location, setLocation] = useState(null);
	const { getGeolocation } = useGeoLocation();
	// console.log(`location`, location);

	useEffect(() => {
		setLocation(getGeolocation());
	}, [getGeolocation]);

	const webcamRef = useRef(null);
	const [imgData, setImgData] = useState(null);
	// console.log(`imgData`, imgData);

	// get currnet user data
	const { user } = useAuthContext();
	// console.log(`user`, user)

	// get id of the asset
	const trnId = photoAppData?.data?.form?.values?.id;
	// console.log(`trnId`, trnId);

	// call useDocument to get realtime meter data
	const { error, document: trnDoc } = useDocumentSync("trns", trnId);
	// console.log(`trnDoc`, trnDoc);
	// console.log(`error`, error);

	const { data, isPhotoAppOpened } = photoAppData;
	// console.log(`data`, data);
	const openPhotoApp = isPhotoAppOpened ? "show-photo-app" : "hide-photo-app";

	// get the image catagory
	const imageCategory = data?.field?.name?.split(".").pop();
	// console.log(`imageCategory`, imageCategory)

	// destructure media data
	let mediaData = null;
	let astId = null;
	let astNo = null;
	if (trnDoc) {
		// break key apart
		const keys = data?.field?.name
			.replaceAll("[", ".")
			.replaceAll("]", ".")
			.replaceAll("..", ".");
		// console.log(`keys`, keys)
		const keysArray = keys.split(".");
		// console.log(`keysArray`, keysArray);

		// extract mediaCat array
		// get the media category array
		mediaData = trnDoc;
		keysArray.forEach(key => {
			// console.log(`key`, key);
			mediaData = mediaData[key];
		});
		// console.log(`mediaData`, mediaData);

		// get ast id
		// TODO: find a generic way to get id and not the hard wired one as  below
		astId = trnDoc[keysArray[0]][keysArray[1]][keysArray[2]].id;
		astNo = trnDoc[keysArray[0]][keysArray[1]][keysArray[2]][keysArray[3]].astNo;
		// console.log(`astId`, astId);
	}

	// create a capture function
	const capture = data => {
		// console.log(`capture data`, data);
		const imageSrc = webcamRef.current.getScreenshot();
		// console.log(`capture`);
		setImgData({
			url: imageSrc,
			metaData: {
				mediaType: "photo",
				mediaCategory: imageCategory, // eg meter no photo, meter serail no photo , etc
				createdByUser: user.displayName,
				createdAtDatetime: format(new Date(), "yyyy-MMM-dd_HH:mm:ss"),
				// createdAtDatetime: timestamp.fromDate(new Date()),
				createdAtLocation: {
					lat: location.coordinates.lat,
					lng: location.coordinates.lng,
				},
			},
		});
	};

	const closePhotoApp = e => {
		e.preventDefault();
		setPhotoAppData({
			...photoAppData,
			isPhotoAppOpened: false,
		});
	};

	const saveToStorage = e => {
		e.preventDefault();
		// console.log(`save image to storage`);

		// generate file name
		// const datetime = format(new Date(), "yyyy-mm-dd_hh:mm:ss");
		const fileName = `${imageCategory}_${imgData.metaData.createdAtDatetime}`;
		// console.log(`fileName`, fileName);

		// get the path to firebase storage
		const filePath = `asts/${astId}/${imageCategory}/${fileName}`;
		// console.log(`filePath`, filePath);

		const storageRef = ref(storage, filePath);

		const update = updateDoc(data, imgData, trnDoc);

		// save image to storage
		storeMedia(storageRef, imgData, update, trnId)
			.then(() => {
				// console.log(`Media stored succesfully at firebase storge and firestore`);
				setImgData(null);
			})
			.catch(err => {
				console.log(`Error in storing media`, err);
			});
	};

	useEffect(() => {
		return () => {
			setImgData(null);
		};
	}, []);

	return (
		<div className={`photo-app ${openPhotoApp}`}>
			<div className="title">
				<div className="title-subsection name">
					<h3>Media App</h3>
				</div>
				<div className="title-subsection id">
					<h3>Ast No : {astNo} </h3>
				</div>
				<div className="title-subsection close">
					<button onClick={closePhotoApp}>X</button>
				</div>
			</div>
			<div className="header">
				<div className="header-subsection snap-save">
					{imgData ? (
						<>
							<button onClick={() => setImgData(null)} title="take another photo">
								<MdAddAPhoto />
							</button>
							{response?.isPending ? (
								<button>
									<ClipLoader
										color="orange"
										loading={response?.isPending}
										size={13}
										aria-label="Loading Spinner"
										data-testid="loader"
									/>
								</button>
							) : (
								<button onClick={saveToStorage}>
									<TfiSave />
								</button>
							)}
						</>
					) : (
						<button onClick={e => capture(data)}>
							<MdCamera />
						</button>
					)}
				</div>
				<div className="header-subsection pic-video">
					<button>
						<MdSettingsVoice />
					</button>
					<button>
						<BsImage />
					</button>
					<button>
						<MdVideoCameraBack />
					</button>
				</div>
				<div className="header-subsection cameras">
					<button>
						<MdOutlineCameraAlt />
					</button>
					<button>
						<BsCameraFill />
					</button>
				</div>
			</div>
			<div className="body">
				<div className="container">
					{imgData ? (
						<>
							<img src={imgData.url} alt="webcam" />
							<MediaViewMetaData mediaViewData={imgData} />
						</>
					) : (
						<>
							<Webcam width={500} height={250} ref={webcamRef} />
							<div className="media-cat">{imageCategory}</div>
						</>
					)}
				</div>
			</div>
			<div className="footer">
				<MediaComponent mediaData={mediaData} />
				<MediaView />;
			</div>
		</div>
	);
};

export default PhotoApp;
