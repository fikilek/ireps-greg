import React, { useState, useEffect } from "react";
import "./Uploads.css";
import CSVReader from "react-csv-reader";
import { unflatten } from "flat";
// import { property } from "lodash";
// import { Timestamp } from "firebase/firestore";
import TableErfsUpload from "../../components/table/TableErfsUpload";
import { useFirestore } from "../../hooks/useFirestore";
import { toast } from "react-toastify";
import useModal from "../../hooks/useModal";
import { timestamp } from "../../firebaseConfig/fbConfig";
import useUpload from "../../hooks/useUpload";
import { Timestamp } from "firebase/firestore";

const setTimestampFields = data => {
	// console.log(`BEFORE data`, data)

	// iterate through the object and look for a field that has datetime and convert the field imnto a firestore Timestamp
	for (const property in data) {
		// console.log(`data ---------------------------`, property);
		// console.log(`property`, property)
		// console.log(`value`, data[property])

		// convert the property to lower case
		const propertyStr = property.trim().toLowerCase();
		if (propertyStr.includes("datetime")) {
			// console.log(`property [datetime] includes asts :`, property);
			// property is a datetime field
			// console.log(`datetime value is : ${data[property]}`);
			const myTimestamp = Timestamp.now();
			// console.log(`myTimestamp`, data[property]);
			data[property] = myTimestamp;
		}
		if (propertyStr.includes("latitude") || propertyStr.includes("longitude")) {
			// console.log(`property [lat/lng] includes asts :`, property);
			// make sure the value is a number
			const myNumber = Number(data[property]);
			// console.log(`myNumber`, myNumber);
			data[property] = myNumber;
		}
		if (propertyStr.includes("asts")) {
			// console.log(`property includes asts :`, property);
			// asts in an erf must be an empty array.
			data[property] = [];
		}
		if (propertyStr.includes("erfno")) {
			// for erfNo, make sure its a string
			// console.log(`property includes erf no :`, property);
			if (typeof data[property] !== "string") {
				// console.log(`value is not a string  :`, data[property]);
				// console.log(`typeof value BEFORE  :`, typeof data[property]);
				data[property] = data[property].toString();
				// console.log(`typeof value AFTER  :`, typeof data[property]);
			}
		}
	}

	// console.log(`AFTER data`, data)

	return data;
};

const Uploads = () => {
	// create state for the uploaded file

	const [data, setData] = useState([]);
	// console.log(`data`, data);

	const [fileInfo, setFileInfo] = useState([]);
	// console.log(`fileInfo`, fileInfo);

	const { result, upload } = useUpload("erfs");
	// console.log(`upload result`, result);

	const { closeModal } = useModal();

	const onFileLoaded = (fileData, fileInfo) => {
		const fileRecords = [];
		fileData?.forEach(dataRecord => {
			// in each data set, look for datetime field and convert it to firestore Timestamp
			// console.log(`dataRecord ==========================`, dataRecord);
			const data = setTimestampFields(dataRecord);
			// console.log(`data`, data)
			const unflattnedData = unflatten(data);
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

	const erfUpload = e => {
		e.preventDefault();
		// console.log(`erf upload`, data);
		upload(data);
	};

	useEffect(() => {
		if (result.success) {
			// console.log(`response.success`, result.success);
			closeModal();
			toast(`Erf data added succesfully!`, {
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
			<div className="uploads">
				<CSVReader parserOptions={papaparseOptions} onFileLoaded={onFileLoaded} />
				<button className="upload-btn" onClick={erfUpload}>
					Upload
				</button>
			</div>
			<TableErfsUpload erfs={data} />
		</>
	);
};

export default Uploads;
