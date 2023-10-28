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
import { useMemo } from "react";

const PhotoApp = () => {
	const { photoAppData, setPhotoAppData } = useContext(PhotoAppContext);
	// console.log(`photoAppData`, photoAppData);

	const listSize = useRef();
	listSize.current = 0;

	// get save media function from save media hook
	const { response, storeMedia } = useStoreMedia();
	// console.log(`storeMedia`, storeMedia)
	// console.log(`response`, response);

	// get ml1
	const ml1 = photoAppData?.ml1;
	// console.log(`ml1`, ml1);

	// create a state to hold all avaiable cameras in the device
	const [devices, setDevices] = useState([]);
	// console.log(`devices`, devices);

	// create a state or the choosen camera.
	const [cameraChoice, setCameraChoice] = useState(null);
	// console.log(`cameraChoice`, cameraChoice);

	// create a state for cameraFacing mode
	const [facingMode, setFacingMode] = useState({ exact: "environment" });
	// console.log(`facingMode`, facingMode);

	const [mediaList, setMediaList] = useState([]);
	// console.log(`mediaList`, mediaList);

	const [isPending, setIsPending] = useState(true);
	// const isPending = useMemo(() => mediaList, [mediaList?.length]);
	// console.log(`isPending`, isPending);

	useEffect(() => {
		setIsPending(true);
		if (mediaList === undefined || mediaList?.length > 0) {
			setIsPending(false);
		}
	}, [mediaList]);

	const { getMediaList } = useStorage();

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

	// get id of the trn
	const trnId = photoAppData?.data?.form?.values?.id;
	// console.log(`trnId`, trnId);

	// get trnType
	const trnType = photoAppData?.data?.form?.values?.metaData?.trnType;
	// console.log(`trnType`, trnType);

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
	let astCat = null;
	if (trnDoc && data) {
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
		if (keysArray && keysArray?.length > 0) {
			keysArray.forEach(key => {
				// console.log(`key`, key);
				if (key) {
					mediaData = mediaData[key];
				}
			});
		}

		// get ast id
		// TODO: find a generic way to get id and not the hard wired one as  below
		astId = trnDoc[keysArray[0]][keysArray[1]][keysArray[2]]?.id;
		astNo = trnDoc[keysArray[0]][keysArray[1]][keysArray[2]][keysArray[3]]?.astNo;
		astCat =
			trnDoc[keysArray[0]][keysArray[1]][keysArray[2]][keysArray[3]]?.astCartegory;
		getMediaList(`asts/${astId}`).then(list => {
			if (mediaList?.length === 0) {
				setMediaList(list);
			}
		});
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
				trnId,
				astCat,
				ml1,
			},
		});
	};

	const closePhotoApp = e => {
		e.preventDefault();
		setPhotoAppData({
			data: "",
			isPhotoAppOpened: false,
			ml1: "",
		});
		setMediaList([]);
		// setIsPending(true);
	};

	const saveToStorage = e => {
		e.preventDefault();
		// console.log(`save image to storage`);

		// generate file name
		// const datetime = format(new Date(), "yyyy-mm-dd_hh:mm:ss");
		const fileName = `${imageCategory}_${imgData.metaData.createdAtDatetime}`;
		// console.log(`fileName`, fileName);

		// get the path to firebase storage
		const filePath = `asts/${astId}/${fileName}`;
		// console.log(`filePath`, filePath);

		const storageRef = ref(storage, filePath);

		// save image to storage
		storeMedia(storageRef, imgData)
			.then(() => {
				// console.log(`Media stored succesfully at firebase storge and firestore`);
				setImgData(null);
				// get all media for the astId
				console.log(`mediaList.length`, mediaList?.length);

				getMediaList(`asts/${astId}`).then(list => {
					// console.log(`list`, list);
					// console.log(`list.length`, list?.length);
					listSize.current = Number(mediaList?.length) + 1;
					// console.log(`listSize.current`, listSize.current);
					if (list?.length === listSize.current || mediaList === undefined) {
						setMediaList(list);
					}
				});
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
						<MediaComponent id={astId} mediaData={mediaList} />
						<MediaView />
					</>
				)}
				{isPending && (
					<PropagateLoader
						color="lightblue"
						loading={isPending}
						size={13}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				)}
				{mediaList === undefined && <p className="no-photos">No Photos to show</p>}
			</div>
		</div>
	);
};

export default PhotoApp;
