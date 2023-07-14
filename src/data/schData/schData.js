import moment from "moment";
import { nanoid } from "@reduxjs/toolkit";

export const poData = [
	// purchase order (po) data
	{
		id: nanoid(),
		poStatus: "Aproved", // ['created', 'approved', 'deleted']
		metaData: {
			updatedAtDatetime: moment(new Date()).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedByUser: "fikile kentane",
			createdAtDatetime: moment().format("YYYY-MM-DD HH:mm:ss"),
			createdByUser: "fikile kentane",
			poHistory: 1,
		},
		poData: {
			poNo: "Po-1", // Purchase Order No. THis is the begining of the procurment process
			poInv: [{ invId: 1, inv: "inv-1" }], // Invoice sent by the supplier
			poPop: [
				{ popId: 1, pop: "pop-1" },
				{ popId: 2, pop: "pop-2" },
			], // Proof of Payment for the invoice paid
			poGrv: {
				grvSystemId: "",
				grvFormId: "",
				grvStatus: "No Grv", // ['Created', 'Confirmed', 'Witnessed']
				grvConfirmReceipt: {
					grvcrStatus: true, // This must be changed through a password
					grvcrSurname: "",
					grvcrName: "",
					grvcrContactNo: "",
					grvcrContactEmailAdr: "",
				},
				grvWitnessReceipt: {
					grvwrStatus: true, // This must be changed through a password
					grvwrSurname: "",
					grvwrName: "",
					grvwrContactNo: "",
					grvwrContactEmailAdr: "",
				},
				grvStoreData: {
					storeName: "Smars Jozi Store",
					storeAdr: "15 Petunia Street",
					storeContactSurname: "Kentane",
					storeContactName: "Sitha",
					storeContactNo: "081 726 2352",
					storeContactEmailAdr: "sitha@smars.co.za",
				},
				grvMedia: {
					grvPics: [
						{
							mediaId: "1",
							user: "fk",
							mediaUrl: "Pic 1",
							datetime: "22/11/12",
							mediaType: "image",
						},
						{
							mediaId: "2",
							user: "fk",
							mediaUrl: "Pic 2",
							datetime: "22/11/12",
							mediaType: "image",
						},
					],
					grvVideos: [
						{
							mediaId: "1",
							user: "fk",
							mediaUrl: "Video 1",
							datetime: "22/11/12",
							mediaType: "video",
						},
						{
							mediaId: "2",
							user: "fk",
							mediaUrl: "Video 2",
							datetime: "22/11/12",
							mediaType: "video",
						},
					],
					grvVoice: [
						{
							mediaId: "1",
							user: "fk",
							mediaUrl: "Voice Clip 1",
							datetime: "22/11/12",
							mediaType: "voice",
						},
						{
							mediaId: "2",
							user: "fk",
							mediaUrl: "Voice Clip 2",
							datetime: "22/11/12",
							mediaType: "voice",
						},
					],
				},
				grvComments: [
					{
						grvCommentId: 1,
						grvCommentUserName: "Fikile Kentane",
						grvCommentMsg: "Grv Fikile comments",
						grvCommentDate: "22/11/20 08:21",
					},
				],
			}, // Goods received. THis should correspond to the items in the PO.
		},
		poPi: [
			{
				itemId: 1,
				itemAstCartegory: "meter",
				itemName: "singe phase meter",
				itemCode: "BEC44",
				itemQuantity: 20,
			},
			{
				itemId: 2,
				itemAstCartegory: "meter",
				itemName: "three phase meter",
				itemCode: "BEC66",
				itemQuantity: 5,
			},
		],
		poSplData: {
			id: 1,
			splNo: "Spl1",
			splName: "Conlog",
			splContactSurname: "Gina",
			splContactName: "Mondli",
			splContactNo: "081 726 2352",
			splContactEmailAdr: "mondli@conlog.co.za",
		},
	},
	{
		poSystemId: nanoid(),
		poStatus: "Aproved", // ['created', 'approved', 'deleted']
		metaData: {
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedByUser: "fikile kentane",
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			createdByUser: "fikile kentane",
			poHistory: 1,
		},
		poData: {
			poNo: "Po-2", // Purchase Order No. THis is the begining of the procurment process
			poInv: [], // Invoice sent by the supplier
			poPop: [], // Proof of Payment for the invoice paid
			// poGrv: 'x',
			poGrv: {
				grvSystemId: "",
				grvFormId: "",
				grvStatus: "Created", // ['Created', 'Confirmed', 'Witnessed']
				grvConfirmReceipt: {
					grvcrStatus: false, // This must be changed through a password
					grvcrSurname: "",
					grvcrName: "",
					grvcrContactNo: "",
					grvcrContactEmailAdr: "",
				},
				grvWitnessReceipt: {
					grvwrStatus: false, // This must be changed through a password
					grvwrSurname: "",
					grvwrName: "",
					grvwrContactNo: "",
					grvwrContactEmailAdr: "",
				},
				grvComments: [], // [{date: date, msg: msg, user: user}]
				rgvMedia: {
					grvPhotos: [],
					grvVideos: [],
					grvVoice: [],
				},
			}, // Goods received. THis should correspond to the items in the PO.
		},
		poPi: [
			{
				itemId: 1,
				itemName: "singe phase meter",
				itemCode: "BEC44",
				itemQuantity: 20,
			},
			{
				itemId: 2,
				itemName: "three phase meter",
				itemCode: "BEC66",
				itemQuantity: 5,
			},
			{ itemId: 3, itemName: "mov", itemCode: "mov", itemQuantity: 25 },
		],
		poSplData: {
			splName: "Conlog",
			splContactSurname: "Gina",
			splContactName: "Mondli",
			splContactNo: "081 726 2352",
			splContactEmailAdr: "mondli@conlog.co.za",
		},
	},
	{
		poSystemId: nanoid(),
		poStatus: "Aproved", // ['created', 'approved', 'deleted']
		metaData: {
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			updatedByUser: "fikile kentane",
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21)).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			createdByUser: "fikile kentane",
			poHistory: 1,
		},
		poData: {
			poNo: "Po-3", // Purchase Order No. THis is the begining of the procurment process
			poInv: [
				{
					inv: "inv-1",
				},
			], // Invoice sent by the supplier
			poPop: [
				{
					pop: "pop-1",
				},
				{
					pop: "pop-2",
				},
				{
					pop: "pop-3",
				},
			], // Proof of Payment for the invoice paid
			poGrv: {
				grvSystemId: "",
				grvFormId: "",
				grvStatus: "Created", // ['Created', 'Confirmed', 'Witnessed']
				grvConfirmReceipt: {
					grvcrStatus: true, // This must be changed through a password
					grvcrSurname: "",
					grvcrName: "",
					grvcrContactNo: "",
					grvcrContactEmailAdr: "",
				},
				grvWitnessReceipt: {
					grvwrStatus: false, // This must be changed through a password
					grvwrSurname: "",
					grvwrName: "",
					grvwrContactNo: "",
					grvwrContactEmailAdr: "",
				},
				grvComments: [], // [{date: date, msg: msg, user: user}]
				rgvMedia: {
					grvPhotos: [],
					grvVideos: [],
					grvVoice: [],
				},
			}, // Goods received. THis should correspond to the items in the PO.
		},
		poPi: [
			{
				itemId: 1,
				itemName: "singe phase meter",
				itemCode: "BEC44",
				itemQuantity: 20,
			},
			{
				itemId: 2,
				itemName: "three phase meter",
				itemCode: "BEC66",
				itemQuantity: 5,
			},
			{ itemId: 3, itemName: "mov", itemCode: "mov", itemQuantity: 25 },
			{ itemId: 4, itemName: "mov1", itemCode: "mov1", itemQuantity: 5 },
			{ itemId: 5, itemName: "mov3", itemCode: "mov3", itemQuantity: 10 },
		],
		poSplData: {
			// Supplier data
			splId: 2,
			splName: "Conlog",
			splContactSurname: "Gina",
			splContactName: "Mondli",
			splContactNo: "081 726 2352",
			splContactEmailAdr: "mondli@conlog.co.za",
		},
	},
];

export const splData = [
	// Supplier (spl) data
	{
		splId: 1,
		splName: "Conlog",
		splContactSurname: "Gina",
		splContactName: "Mondli",
		splContactNo: "081 726 2352",
		splContactEmailAdr: "mondli@conlog.co.za",
	},
	{
		splId: 2,
		splName: "Landis",
		splContactSurname: "Fikeni",
		splContactName: "Ali",
		splContactNo: "081 726 2352",
		splContactEmailAdr: "ali@landis.co.za",
	},
];

export const grvData = [
	{
		grvId: nanoid(),
		grvAstCartegory: "meter",
		grvAstNo: "2222",
	},
];
