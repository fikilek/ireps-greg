import moment from "moment";
import { nanoid } from "nanoid";

export const trnsData = [
	{
		//this asr transaction creaed a meter into the store
		trnSystemId: 1,
		metaData: {
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedByUser: "fikile kentane",
			updatedAtLocation: null,
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			createdByUser: "fikile kentane",
			createdAtLocation: null,
			trnHistory: 1,
			trnType: "asr", //['asr', 'ins', 'com', 'ven', 'mis', 'fnd', '', '', '', '', ]
		},
		astData: {
			astSerialNo: "123 4567",
			astNo: "04 123 4567",
			astCartegory: "meter", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
			astSystemId: "121",
			meter: {
				phase: "single", // ['single', 'three', '', '']
				type: "pre-paid", // ['conventional', 'pre-paid']
			},
		},
		asr: {
			purchaseOrderNo: "Po No - 1234",
			invoiceNo: "Inv 2345",
			supplierName: "Conlog",
			supplierContactNo: "081 726 1234",
			supportingDocs: "", // these will be images/scans of POs etc
		},
	},
	{
		//this asr transaction creaed a meter into the store
		trnSystemId: 2,
		metaData: {
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedByUser: "fikile kentane",
			updatedAtLocation: null,
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			createdByUser: "fikile kentane",
			createdAtLocation: null,
			trnHistory: 1,
			trnType: "aud", //['asr', 'ins', 'com', 'ven', 'mis', 'fnd', '', '', '', '', ]
		},
		astData: {
			astSerialNo: "4567",
			astNo: "bx-4567", // eg, meter no
			astCartegory: "box", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
			astSystemId: "122",
			box: {
				type: "metal", // ['metal', 'fibreglass']
				dimensions: { length: 15, width: 12, height: 30 }, // ['Length', 'Width', 'height']
				location: "top of pole",
			},
		},
		asr: {
			purchaseOrderNo: "Po No - 1234",
			invoiceNo: "Inv 2345",
			supplierName: "Conlog",
			supplierContactNo: "081 726 1234",
			supportingDocs: "", // these will be images/scans of POs etc
		},
	},
];
