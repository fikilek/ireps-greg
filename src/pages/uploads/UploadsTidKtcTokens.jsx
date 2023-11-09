import React, { useState, useEffect } from "react";
import "./Uploads.css";
import CSVReader from "react-csv-reader";
import { unflatten } from "flat";
// import { property } from "lodash";
// import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import useModal from "../../hooks/useModal";
import useUpload from "../../hooks/useUpload";
import { Timestamp } from "firebase/firestore";
import TableTidKtcTokens from "../../components/table/TableTidKtcTokens";
import useAuthContext from "../../hooks/useAuthContext";

const massageFields = data => {
	console.log(`BEFORE data`, data);

	// iterate through the object and look for a field that has datetime and convert the field imnto a firestore Timestamp
	for (const property in data) {
		console.log(`property`, property);

		// convert the property to lower case
		// const propertyStr = property.trim().toLowerCase();
		if (property === "meterNo") {
			// for erfNo, make sure its a string
			data[property] = data[property].toString();
			console.log(`typeof value AFTER  :`, typeof data[property]);
		}
	}

	console.log(`AFTER data`, data);

	return data;
};

const UploadsTidKtcTokens = () => {
	// create state for the uploaded file

	const [data, setData] = useState([]);
	console.log(`data`, data);

	const [fileInfo, setFileInfo] = useState([]);
	// console.log(`fileInfo`, fileInfo);

	const { result, upload } = useUpload("tidKtcTokens");
	// console.log(`upload result`, result);

	const { closeModal } = useModal();
	const { user } = useAuthContext();

	const onFileLoaded = (fileData, fileInfo) => {
		const fileRecords = [];
		console.log(`fileData`, fileData);
		fileData?.forEach(dataRecord => {
			// in each data set, look for datetime field and convert it to firestore Timestamp
			// console.log(`dataRecord ==========================`, dataRecord);
			const data = massageFields(dataRecord);
			console.log(`data`, data);

			const newDataRecord = {
				...data,
				metaData: {
					createdAtDatetime: Timestamp.now(),
					createdByUser: user.displayName,
					createdByUserId: user.uid,
				},
			};

			const unflattnedData = unflatten(newDataRecord);
			// console.log(`unflattnedData`, unflattnedData);
			fileRecords.push(unflattnedData);
		});

		// console.log(`fileRecords`, fileRecords);
		setData(fileRecords);
		setFileInfo(fileInfo);
	};

	const papaparseOptions = {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		// transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
	};

	const dataUpload = e => {
		e.preventDefault();
		// console.log(`erf upload`, data);
		upload(data);
	};

	useEffect(() => {
		if (result.success) {
			// console.log(`response.success`, result.success);
			closeModal();
			toast(`data added succesfully!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}, [result]);

	return (
		<>
			<div className="upload-tid">
				<CSVReader parserOptions={papaparseOptions} onFileLoaded={onFileLoaded} />
				<button className="upload-btn" onClick={dataUpload}>
					Upload
				</button>
			</div>
			<TableTidKtcTokens tidKtcTokens={data} />
		</>
	);
};

export default UploadsTidKtcTokens;
