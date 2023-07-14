import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebaseConfig/fbConfig";

const useStorage = () => {
	// upload file
	const [progress, setUploadProgress] = useState(0);
	const [error, setUploadError] = useState("");
	const [url, setUploadUrl] = useState("");

	// delete file
	const [fileDeletePending, setFileDeletePending] = useState(null);
	const [fileDeleteSuccess, setFileDeleteSuccess] = useState(null);
	const [fileDeleteError, setFileDeleteError] = useState(null);

	const addFile = (path, file) => {
		// Upload file and metadata to the object 'images/mountains.jpg'
		const storageRef = ref(storage, path);
		const uploadTask = uploadBytesResumable(storageRef, file);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			"state_changed",
			snapshot => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const uploadProgress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(uploadProgress);
				// console.log("Upload is " + uploadProgress + "% done");
				switch (snapshot.state) {
					case "paused":
						// console.log("Upload is paused");
						setUploadProgress("paused");
						break;
					case "running":
						// console.log("Upload is running");
						setUploadProgress("running");
						break;
					default:
					// console.log(`snapshot.state`, snapshot.state);
				}
			},
			error => {
				// console.log(`upoad error`, error)
				setUploadError(error.code);
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
					// console.log("File available at", downloadURL);
					setUploadUrl(downloadURL);
				});
			}
		);
	};

	const deleteFile = path => {
		console.log(`deleting file on path: ${path}`);
		// Create a reference ot the file to delete
		const fileRef = ref(storage, path);
		console.log(`fileRef`, fileRef)
		// // delete the file
		setFileDeletePending(true);
		setFileDeleteError(null);
		setFileDeleteSuccess(false);
		try {
			deleteObject(fileRef)
				.then(() => {
					setFileDeletePending(false);
					setFileDeleteSuccess(true);
					setFileDeleteError(null);
					console.log(`file in path [${path}] deleted successfully`);
				})
				.catch(error => {
					setFileDeletePending(false);
					setFileDeleteError(error.message);
					setFileDeleteSuccess(false);
					console.log(`error deleting file`, error.message);
				});
		} catch {
			console.log(`file delete error`, fileDeleteError);
		}
	};

	return {
		addFile,
		progress,
		error,
		url,
		deleteFile,
		fileDeletePending,
		fileDeleteSuccess,
		fileDeleteError,
	};
};

export default useStorage;
