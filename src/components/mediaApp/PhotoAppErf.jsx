import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { ClipLoader, PropagateLoader } from "react-spinners";

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
import { storage } from "../../firebaseConfig/fbConfig";
import { format } from "date-fns";
import MediaComponent from "../mediaComponent/MediaComponent";
import MediaView from "../mediaComponent/MediaView";
import MediaViewMetaData from "../mediaComponent/MediaViewMetaData";
import useAuthContext from "../../hooks/useAuthContext";
import { useDocumentSync } from "../../hooks/useDocumentSync";
import { ref } from "firebase/storage";
import useStoreMedia from "../../hooks/useStoreMedia";
import useGeoLocation from "../../hooks/useGeolocation";
import useStorage from "../../hooks/useStorage";

const PhotoAppErf = () => {
	const { photoAppData, setPhotoAppData } = useContext(PhotoAppContext);
	// console.log(`photoAppData`, photoAppData);

	// get save media function from save media hook
	const { response, storeMedia } = useStoreMedia();
	// console.log(`storeMedia`, storeMedia)
	// console.log(`response`, response);

	// create a state to hold all avaiable cameras in the device
	const [devices, setDevices] = useState([]);
	// console.log(`devices`, devices);

	// create a state or the choosen camera.
	const [cameraChoice, setCameraChoice] = useState(null);
	// console.log(`cameraChoice`, cameraChoice);

	// create a state for cameraFacing mode
	const [facingMode, setFacingMode] = useState({ exact: "environment" });
	// console.log(`facingMode`, facingMode);

	// get methods from useStorage
	const { isPending, mediaList, getMediaList } = useStorage();
	// console.log(`mediaList`, mediaList);

	// get geolocation - used to get ocation of where the photo was taken
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

	// get id of the erf
	const erfId = photoAppData?.data?.form?.values?.id;
	// console.log(`erfId`, erfId);

	// get id of the erf
	const erfNo = photoAppData?.data?.form?.values?.erfNo;
	// console.log(`erfNo`, erfNo);

	// get ml1
	const ml1 = photoAppData?.ml1;
	// console.log(`ml1`, ml1);

	// call useDocument to get realtime meter data
	const { error, document: erfDoc } = useDocumentSync("trns", erfId);
	// console.log(`erfDoc`, erfDoc);
	// console.log(`error`, error);

	const { data, isPhotoAppOpened } = photoAppData;
	// console.log(`data`, data);
	const openPhotoApp = isPhotoAppOpened ? "show-photo-app" : "hide-photo-app";

	// get the image catagory
	const imageCategory = "erf Photo";
	// console.log(`imageCategory`, imageCategory)

	if (erfDoc && data) {
		// get all media for the erfId
		getMediaList(`${ml1}/${erfId}`);
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
				createdByUserId: user.uid,
				createdAtDatetime: format(new Date(), "yyyy-MMM-dd_HH:mm:ss"),
				createdAtLocation: {
					lat: location?.coordinates?.lat,
					lng: location?.coordinates?.lng,
				},
				erfId,
				ml1,
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
		const filePath = `${ml1}/${erfId}/${fileName}`;
		// console.log(`filePath`, filePath);

		const storageRef = ref(storage, filePath);

		// save image to storage
		storeMedia(storageRef, imgData)
			.then(() => {
				console.log(`Media stored succesfully at firebase storge and firestore`);
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

	useEffect(() => {
		if (devices && devices.length > 0) {
			setCameraChoice(devices[0].deviceId);
		}
	}, [devices]);

	const videoConstraints = {
		facingMode: facingMode,
		deviceId: cameraChoice,
	};

	const handleDevices = React.useCallback(
		mediaDevices => {
			// mediaDevices.forEach(device => {
			// 				console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
			// 			});
			setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
		},

		[setDevices]
	);

	React.useEffect(() => {
		navigator.mediaDevices.enumerateDevices().then(handleDevices);
	}, [handleDevices]);

	useEffect(() => {}, [facingMode]);

	const handleFacingModeChoice = e => {
		e.preventDefault();
		// console.log(`handleFacingModeChoice`, e.currentTarget.id);
		switch (e.currentTarget.id) {
			case "selfie":
				setFacingMode("user");
				break;
			case "front":
				setFacingMode({ exact: "environment" });
				break;
			default:
				setFacingMode({ exact: "environment" });
		}
	};

	return (
		<div className={`photo-app ${openPhotoApp}`}>
			<div className="title">
				<div className="title-subsection name">
					<h3>Media App</h3>
				</div>
				<div className="title-subsection id">
					<h3>Erf No : {erfNo} </h3>
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
					<button
						className={`selfie ${facingMode === "user" ? "active-camera" : ""}`}
						id="selfie"
						data-id="selfie"
						onClick={handleFacingModeChoice}
					>
						<MdOutlineCameraAlt />
						<span>Selfie</span>
					</button>
					<button
						className={`front ${
							facingMode.exact === "environment" ? "active-camera" : ""
						}`}
						id="front"
						data-id="front"
						onClick={handleFacingModeChoice}
					>
						<BsCameraFill />
						<span>front</span>
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
							<Webcam
								className="media"
								width={434}
								height={217}
								ref={webcamRef}
								videoConstraints={videoConstraints}
								screenshotFormat="image/jpeg"
							/>
							<div className="media-cat">{imageCategory}</div>
						</>
					)}
				</div>
			</div>
			<div className="footer">
				{mediaList?.length > 0 && (
					<>
						<MediaComponent id={erfId} mediaData={mediaList} />
						<MediaView />
					</>
				)}
				{/* {isPending && (
					<PropagateLoader
						color="lightblue"
						loading={isPending}
						size={13}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				)} */}
				{mediaList === 0 && <p className="no-photos">No Photos to show</p>}
			</div>
		</div>
	);
};

export default PhotoAppErf;
