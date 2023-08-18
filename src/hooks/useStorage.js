import { async } from "@firebase/util";
import {
	deleteObject,
	getDownloadURL,
	getMetadata,
	listAll,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { storage } from "../firebaseConfig/fbConfig";

const getMList = async res => {
	const mediaList = [];
	const result = await res.items.map(async itemRef => {
		// All the items under listRef.
		// console.log(`itemRef items`, itemRef);

		const url = await getDownloadURL(itemRef);
		// console.log(`url`, url);
		const metaData = await getMetadata(itemRef);
		// console.log(`metaData`, metaData);
		const mediaDataArrayObject = {
			url: url,
			metaData: metaData,
		};
		mediaList.push(mediaDataArrayObject);
		// console.log(`mediaList`, mediaList);

		return mediaList;
	});
	// console.log(`result`, result);
	return result;
};

const getList = async fRef => {
	const res = await listAll(fRef);
	// .then(async res => {
	// console.log(`res`, res);
	// res.prefixes.forEach(folderRef => {
	// 	// All the prefixes under listRef.
	// 	// console.log(`folderRef prefixes`, folderRef);
	// });

	const list = await getMList(res);

	const resultFromPromise = Promise.all(list).then(values => {
		// console.log(`values`, values);

		const value = values[0];
		// console.log(`value`, value);

		// console.log(`end of forEach loop - list: `, value);
		return value;
	});

	// console.log(`resultFromPromise`, resultFromPromise);

	// })
	// .catch(error => {
	// 	// Uh-oh, an error occurred!
	// 	console.log(`error obtaining media list :`, error);
	// });
	return resultFromPromise;
};

const useStorage = () => {
	// upload file
	// const [progress, setUploadProgress] = useState(0);
	// const [error, setUploadError] = useState("");
	// const [url, setUploadUrl] = useState("");

	// delete file
	// const [fileDeletePending, setFileDeletePending] = useState(null);
	// const [fileDeleteSuccess, setFileDeleteSuccess] = useState(null);
	// const [fileDeleteError, setFileDeleteError] = useState(null);

	// mediaList
	const [isPending, setIsPending] = useState(true)
	const [mediaList, setMediaList] = useState([]);
	// console.log(`mediaList`, mediaList);

	// const addFile = (path, file) => {
	// 	// Upload file and metadata to the object 'images/mountains.jpg'
	// 	const storageRef = ref(storage, path);
	// 	const uploadTask = uploadBytesResumable(storageRef, file);

	// 	// Listen for state changes, errors, and completion of the upload.
	// 	uploadTask.on(
	// 		"state_changed",
	// 		snapshot => {
	// 			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	// 			const uploadProgress =
	// 				(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 			setUploadProgress(uploadProgress);
	// 			// console.log("Upload is " + uploadProgress + "% done");
	// 			switch (snapshot.state) {
	// 				case "paused":
	// 					// console.log("Upload is paused");
	// 					setUploadProgress("paused");
	// 					break;
	// 				case "running":
	// 					// console.log("Upload is running");
	// 					setUploadProgress("running");
	// 					break;
	// 				default:
	// 				// console.log(`snapshot.state`, snapshot.state);
	// 			}
	// 		},
	// 		error => {
	// 			// console.log(`upoad error`, error)
	// 			setUploadError(error.code);
	// 		},
	// 		() => {
	// 			// Upload completed successfully, now we can get the download URL
	// 			getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
	// 				// console.log("File available at", downloadURL);
	// 				setUploadUrl(downloadURL);
	// 			});
	// 		}
	// 	);
	// };

	// const deleteFile = path => {
	// 	console.log(`deleting file on path: ${path}`);
	// 	// Create a reference ot the file to delete
	// 	const fileRef = ref(storage, path);
	// 	console.log(`fileRef`, fileRef);
	// 	// // delete the file
	// 	setFileDeletePending(true);
	// 	setFileDeleteError(null);
	// 	setFileDeleteSuccess(false);
	// 	try {
	// 		deleteObject(fileRef)
	// 			.then(() => {
	// 				setFileDeletePending(false);
	// 				setFileDeleteSuccess(true);
	// 				setFileDeleteError(null);
	// 				console.log(`file in path [${path}] deleted successfully`);
	// 			})
	// 			.catch(error => {
	// 				setFileDeletePending(false);
	// 				setFileDeleteError(error.message);
	// 				setFileDeleteSuccess(false);
	// 				console.log(`error deleting file`, error.message);
	// 			});
	// 	} catch {
	// 		console.log(`file delete error`, fileDeleteError);
	// 	}
	// };

	const getMediaList = useCallback(
		async path => {
			// console.log(`running getMediaList ------[path]`, path);
			// get reference to asts storage media
			const mediaRef = ref(storage, path);
			// meaidRef now points to 'path'
			// console.log(`mediaRef`, mediaRef)

			const list = await getList(mediaRef);
			// console.log(`list`, list);

			// console.log(`mediaList length is : ${mediaList.length}`);
			if (mediaList?.length === 0) {
				// console.log(`mediaList length zero (0)`);
				setMediaList(list);
				setIsPending(false)
			} else {
				// setMediaList([]);
				// console.log(`mediaList length NOT zero (0)`);
			}
		},
		[mediaList?.length]
	);

	useEffect(() => {
		// console.log(`CLEARING !!!!!!! mediaList on mount`);
		setMediaList([]);
		return () => {
			// console.log(`CLEARING ^^^^^^^ mediaList on UNmount`);
			setMediaList([]);
		};
	}, []);

	return {
		// addFile,
		// progress,
		// error,
		// url,
		// deleteFile,
		// fileDeletePending,
		// fileDeleteSuccess,
		// fileDeleteError,
		mediaList,
		isPending,
		getMediaList,
	};
};

export default useStorage;
