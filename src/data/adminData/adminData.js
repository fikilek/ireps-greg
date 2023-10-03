import { nanoid } from "@reduxjs/toolkit";
import { timestamp, db } from "../../firebaseConfig/fbConfig";

const astNextState = {
	meter: {
		supplier: { grv: "stores" },
		stores: {
			// installation: "checked out",
			missing: "lost",
			return: "supplier",
			sale: "sold",
			dispose: "retired",
		},
		// "checked out": { installation: "field", missing: "lost" },
		field: {
			// commissioning: "service",
			missing: "lost",
			checkIn: "stores",
		},
		service: {
			// missing: "lost",
			// vending: "service",
			disconnection: "disconnected",
			inspection: "service",
			// decommissioning: "stores",
			tid: "service",
		},
		disconnected: {
			reconnection: "service",
			inspection: "service",
			missing: "stores",
		},
		lost: {
			found: "stores",
		},
		retired: {
			grv: "stores",
		},
		sold: {
			grv: "stores",
		},
	},
	cb: {
		supplier: { grv: "stores" },
		stores: {
			// installation: "checked out",
			missing: "lost",
			return: "supplier",
			sale: "sold",
			dispose: "retired",
		},
		// "checked out": { installation: "field", missing: "lost" },
		field: {
			// commissioning: "service",
			missing: "lost",
			checkIn: "stores",
		},
		service: {
			// missing: "lost",
			inspection: "service",
			// decommissioning: "stores",
		},
		lost: {
			found: "stores",
		},
		retired: {
			grv: "stores",
		},
		sold: {
			grv: "stores",
		},
	},
	seal: {
		supplier: { grv: "stores" },
		stores: {
			// installation: "checked out",
			missing: "lost",
			return: "supplier",
			sale: "sold",
			dispose: "retired",
		},
		// "checked out": { installation: "field", missing: "lost" },
		field: {
			// commissioning: "service",
			missing: "lost",
			checkIn: "stores",
		},
		service: {
			// missing: "lost",
			inspection: "service",
			// decommissioning: "stores",
		},
		lost: {
			found: "stores",
		},
		retired: {
			grv: "stores",
		},
		sold: {
			grv: "stores",
		},
	},
	box: {
		supplier: { grv: "stores" },
		stores: {
			// installation: "checked out",
			missing: "lost",
			return: "supplier",
			sale: "sold",
			dispose: "retired",
		},
		// "checked out": { installation: "field", missing: "lost" },
		field: {
			// commissioning: "service",
			missing: "lost",
			checkIn: "stores",
		},
		service: {
			missing: "lost",
			inspection: "service",
			decommissioning: "stores",
		},
		lost: {
			found: "stores",
		},
		retired: {
			grv: "stores",
		},
		sold: {
			grv: "stores",
		},
	},
	pole: {
		supplier: { grv: "stores" },
		stores: {
			// installation: "checked out",
			missing: "lost",
			return: "supplier",
			sale: "sold",
			dispose: "retired",
		},
		// "checked out": { installation: "field", missing: "lost" },
		field: {
			commissioning: "service",
			missing: "lost",
			checkIn: "stores",
		},
		service: {
			// missing: "lost",
			inspection: "service",
			// decommissioning: "stores",
		},
		lost: {
			// found: "stores",
		},
		retired: {
			// grv: "stores",
		},
		sold: {
			// grv: "stores",
		},
	},
};

const astStateNames = [
	{
		id: 1,
		name: "supplier",
		possibleTrns: {
			transfomer: [
				{ key: "choose", value: "choose" },
				{ key: "gvr", value: "gvr" },
			],
			feeder: [
				{ key: "choose", value: "choose" },
				{ key: "gvr", value: "gvr" },
			],
			pole: [
				{ key: "choose", value: "choose" },
				{ key: "gvr", value: "gvr" },
			],
			box: [
				{ key: "choose", value: "choose" },
				{ key: "gvr", value: "gvr" },
			],
			meter: [
				{ key: "choose", value: "choose" },
				{ key: "gvr", value: "gvr" },
			],
			cb: [
				{ key: "choose", value: "choose" },
				{ key: "gvr", value: "gvr" },
			],
			seal: [
				{ key: "choose", value: "choose" },
				{ key: "gvr", value: "gvr" },
			],
		},
		abrv: "spl",
		definition: "supplier",
	},
	{
		id: 2,
		name: "stores",
		possibleTrns: {
			transfomer: [
				{ key: "choose", value: "choose" },
				{ key: "installation", value: "installation" },
				{ key: "missing", value: "missing" },
				{ key: "return to supplier", value: "return to supplier" },
			],
			feeder: [
				{ key: "choose", value: "choose" },
				{ key: "installation", value: "installation" },
				{ key: "missing", value: "missing" },
				{ key: "return to supplier", value: "return to supplier" },
			],
			pole: [
				{ key: "choose", value: "choose" },
				{ key: "installation", value: "installation" },
				{ key: "missing", value: "missing" },
				{ key: "return to supplier", value: "return to supplier" },
			],
			box: [
				{ key: "choose", value: "choose" },
				{ key: "installation", value: "installation" },
				{ key: "missing", value: "missing" },
				{ key: "return to supplier", value: "return to supplier" },
			],
			meter: [
				{ key: "choose", value: "choose" },
				{ key: "installation", value: "installation" },
				{ key: "missing", value: "missing" },
				{ key: "return to supplier", value: "return to supplier" },
			],
			cb: [
				{ key: "choose", value: "choose" },
				{ key: "check-out", value: "check-out" },
				{ key: "missing", value: "missing" },
				{ key: "return to supplier", value: "return to supplier" },
			],
			seal: [
				{ key: "choose", value: "choose" },
				{ key: "installation", value: "installation" },
				{ key: "missing", value: "missing" },
				{ key: "return to supplier", value: "return to supplier" },
			],
		},
		abrv: "str",
		definition: "stores",
	},
	{
		id: 3,
		name: "checked out",
		possibleTrns: {
			transfomer: [
				{ key: "choose", value: "choose" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			feeder: [
				{ key: "choose", value: "choose" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			pole: [
				{ key: "choose", value: "choose" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			box: [
				{ key: "choose", value: "choose" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			meter: [
				{ key: "choose", value: "choose" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			cb: [
				{ key: "choose", value: "choose" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			seal: [
				{ key: "choose", value: "choose" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
		},
		abrv: "cho",
		definition:
			"Remove from store. This could be for installation or transfere to another store",
	},
	{
		id: 4,
		name: "field",
		possibleTrns: {
			transfomer: [
				{ key: "choose", value: "choose" },
				{ key: "commissioning", value: "commissioning" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			feeder: [
				{ key: "choose", value: "choose" },
				{ key: "commissioning", value: "commissioning" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			pole: [
				{ key: "choose", value: "choose" },
				{ key: "commissioning", value: "commissioning" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			box: [
				{ key: "choose", value: "choose" },
				{ key: "commissioning", value: "commissioning" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			meter: [
				{ key: "choose", value: "choose" },
				{ key: "commissioning", value: "commissioning" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
			cb: [
				{ key: "choose", value: "choose" },
				{ key: "commissioning", value: "commissioning" },
				{ key: "missing", value: "missing" },
				{ key: "check in", value: "check in" },
			],
		},
		abrv: "fld",
		definition: "field",
	},
	{
		id: 5,
		name: "service",
		possibleTrns: {
			cb: [
				{ key: "choose", value: "choose" },
				{ key: "audit", value: "audit" },
				{ key: "inspection", value: "inspection" },
				{ key: "decomissioning", value: "decomissioning" },
				{ key: "missing", value: "missing" },
			],
			transfomer: [
				{ key: "choose", value: "choose" },
				{ key: "audit", value: "audit" },
				{ key: "inspection", value: "inspection" },
				{ key: "decomissioning", value: "decomissioning" },
				{ key: "missing", value: "missing" },
			],
			feeder: [
				{ key: "choose", value: "choose" },
				{ key: "audit", value: "audit" },
				{ key: "inspection", value: "inspection" },
				{ key: "decomissioning", value: "decomissioning" },
				{ key: "missing", value: "missing" },
			],
			pole: [
				{ key: "choose", value: "choose" },
				{ key: "audit", value: "audit" },
				{ key: "inspection", value: "inspection" },
				{ key: "decomissioning", value: "decomissioning" },
				{ key: "missing", value: "missing" },
			],
			box: [
				{ key: "choose", value: "choose" },
				{ key: "audit", value: "audit" },
				{ key: "inspection", value: "inspection" },
				{ key: "decomissioning", value: "decomissioning" },
				{ key: "missing", value: "missing" },
			],
			meter: [
				{ key: "choose", value: "choose" },
				{ key: "vending", value: "vending" },
				{ key: "inspection", value: "inspection" },
				{ key: "disconnection", value: "disconnection" },
				{ key: "decomissioning", value: "decomissioning" },
				{ key: "missing", value: "missing" },
			],
			seal: [
				{ key: "choose", value: "choose" },
				{ key: "audit", value: "audit" },
				{ key: "inspection", value: "inspection" },
				{ key: "decomissioning", value: "decomissioning" },
				{ key: "missing", value: "missing" },
			],
		},
		abrv: "srv",
		definition: "service",
	},
	{
		id: 6,
		name: "disconnected",
		possibleTrns: {
			transfomer: [{ key: "choose", value: "choose" }],
			feeder: [{ key: "choose", value: "choose" }],
			pole: [{ key: "choose", value: "choose" }],
			box: [{ key: "choose", value: "choose" }],
			meter: [
				{ key: "choose", value: "choose" },
				{ key: "reconnection", value: "reconnection" },
			],
			cb: [{ key: "choose", value: "choose" }],
			seal: [{ key: "choose", value: "choose" }],
		},
		abrv: "dcn",
		definition: "disconnected",
	},
	{
		id: 7,
		name: "lost",
		possibleTrns: {
			transfomer: [
				{ key: "choose", value: "choose" },
				{ key: "found", value: "found" },
			],
			feeder: [
				{ key: "choose", value: "choose" },
				{ key: "found", value: "found" },
			],
			pole: [
				{ key: "choose", value: "choose" },
				{ key: "found", value: "found" },
			],
			box: [
				{ key: "choose", value: "choose" },
				{ key: "found", value: "found" },
			],
			meter: [
				{ key: "choose", value: "choose" },
				{ key: "found", value: "found" },
			],
			cb: [
				{ key: "choose", value: "choose" },
				{ key: "found", value: "found" },
			],
			seal: [
				{ key: "choose", value: "choose" },
				{ key: "found", value: "found" },
			],
		},
		abrv: "mis",
		definition: "lost",
	},
];

const newTrnData = {
	metaData: {
		updatedAtDatetime: null,
		updatedByUser: null,
		createdAtDatetime: null,
		createdByUser: null,
		trnHistory: 0, // how many times transaction has been updated
		trnType: "", //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit']
		trnNo: "",
		trnState: "draft",
	},
	astData: {
		id: "",
		astNo: "", // for meters-meter no
		astCartegory: "", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
		astState: "",
		astTidMedia: "",
	},
	customerAdr: {
		streetAdr: "",
		erfNo: "",
		wardNo: "",
		suburbTownshipName: "",
		town: "",
		municipality: "",
		province: "EC",
		country: "",
		systemAdr: "",
	},

	customer: {
		cartegory: "", // [owner'', 'occupant']
		type: "", // ['normal (warm body) person', 'jusristic (legal) person']
		warmBody: {
			surname: "",
			name: "",
			idNo: "",
			gender: "male",
		},
		juristicPerson: {
			name: "",
			tradingName: "",
			registeredName: "",
			registeredNo: "",
		},
		billing: [
			{
				accountNo: "",
				indigent: "no", // ['yes', 'no']
				tariff: "",
			},
		],
	},

	contactPerson: {
		surname: "",
		name: "",
		landLine: "",
		whatsApp: "",
		cellNo: "",
		email: "",
	},
};

const newErfsFormData = {
	metaData: {
		updatedAtDatetime: null,
		updatedByUser: null,
		createdAtDatetime: null,
		createdByUser: null,
		erfHistory: 0, // how many times transaction has been updated
		erfType: "", //['formal', 'informal' ]
	},
	erfNo: "",
	standUse: "",
	address: {
		systemAdr: "",
		street: "",
		suburbTownship: "",
		ward: "",
		town: "",
		lmMetro: "",
		dm: "",
		province: "EC",
		country: "",
		gps: {
			lat: "",
			lng: "",
		},
	},
	customer: {
		cartegory: "", // [owner'', 'occupant']
		type: "", // ['normal (warm body) person', 'jusristic (legal) person']
		warmBody: {
			surname: "",
			name: "",
			idNo: "",
			gender: "male",
		},
		juristicPerson: {
			name: "",
			tradingName: "",
			registeredName: "",
			registeredNo: "",
		},
		contactPerson: {
			surname: "",
			name: "",
			landLine: "",
			whatsApp: "",
			cellNo: "",
			email: "",
		},
	},
	billing: {
		tariff: "",
		indigent: "",
		accountNo: [{ AccountNo: 1 }, { AccountNo: 2 }],
	},
};

const trnNames = [
	{ id: 1, name: "asr", abrv: "asr", definition: "good receiving" },
	{
		id: 2,
		name: "instalation",
		abrv: "ins",
		definition: "installation of equipment onto the field",
	},
	{ id: 3, name: "commissioning", abrv: "com", definition: "commissioning" },
	{ id: 4, name: "vending", abrv: "ven", definition: "vending" },
	{ id: 5, name: "missing", abrv: "mis", definition: "missing" },
	{ id: 6, name: "found", abrv: "fnd", definition: "found" },
	{ id: 7, name: "disconnected", abrv: "dcn", definition: "" },
	{ id: 8, name: "reconnected", abrv: "rec", definition: "" },
	{ id: 9, name: "audit", abrv: "aud", definition: "" },
	{ id: 10, name: "inspection", abrv: "inp", definition: "" },
	{ id: 11, name: "return", abrv: "ret", definition: "" }, // return to supplier
	{ id: 12, name: "sell", abrv: "sel", definition: "" },
];

const unpData = [
	{
		id: 1,
		surname: "",
		name: "",
		email: "",
		password: "",
		role: "", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: timestamp.fromDate(new Date()),
		dateUpdate: timestamp.fromDate(new Date()),
		signedon: false,
	},
	{
		id: 2,
		surname: "kentane",
		name: "sitha",
		email: "sitha@gmail.com",
		password: "pwd",
		role: "manager", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "basic", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: timestamp.fromDate(new Date()),
		dateUpdate: timestamp.fromDate(new Date()),
		signedon: false,
	},
	{
		id: 4,
		surname: "kentane",
		name: "siya",
		email: "siya@gmail.com",
		password: "pwd",
		role: "supervisor", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "advance", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: timestamp.fromDate(new Date()),
		dateUpdate: timestamp.fromDate(new Date()),
		signedon: false,
	},
	{
		id: 5,
		surname: "kentane",
		name: "libo",
		email: "libo@gmail.com",
		password: "pwd",
		role: "fieldWorker", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "guest", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: timestamp.fromDate(new Date()),
		dateUpdate: timestamp.fromDate(new Date()),
		signedon: false,
	},
	{
		id: 6,
		surname: "Fubu",
		name: "Maljume",
		email: "malume@gmail.com",
		password: "pwd",
		role: "manager", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "guest", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: timestamp.fromDate(new Date()),
		dateUpdate: timestamp.fromDate(new Date()),
		signedon: false,
	},
	{
		id: 7,
		surname: "Tshikilange",
		name: "Rhu",
		email: "rhu@gmail.com",
		password: "pwd",
		role: "supervisor", // system roles ['superuser', 'admin', 'manager', 'supervisor', 'fieldWorker' ]
		state: "advance", // ['trial', 'basic', 'advance', 'guest']
		dateCreated: timestamp.fromDate(new Date()),
		dateUpdate: timestamp.fromDate(new Date()),
		signedon: false,
	},
];

const unpRoles = [
	{ id: 1, name: "superuser", definition: "" },
	{ id: 2, name: "admin", definition: "" },
	{ id: 3, name: "manager", definition: "" },
	{ id: 4, name: "supervisor", definition: "" },
	{ id: 5, name: "fieldWorker", definition: "" },
];

const unpStates = [
	{ id: 1, name: "trial", definition: "" },
	{ id: 2, name: "basic", definition: "" },
	{ id: 3, name: "advance", definition: "" },
	{ id: 4, name: "guest", definition: "" },
];

const newPoFormData = {
	poApprove: {
		approveUid: null,
		approveDate: null,
	},
	poNo: 0,
	metaData: {
		updatedAtDatetime: timestamp.fromDate(new Date()),
		updatedByUser: "",
		createdAtDatetime: timestamp.fromDate(new Date()),
		createdByUser: "",
	},
	poData: {
		poInv: [],
		poPop: [], // Proof of Payment
		poGrv: {
			grvReceiver: {
				// This is the person confirms that the goods have been received
				grvReceiverUid: "",
				grvReceiverDate: null,
			},
			grvWitness: {
				// This is the person who has witnessed that the goods have indedd been received
				grvWitnessUid: "",
				grvWitnessDate: null,
			},
			poStoreData: {
				// This is the store where goods reveived are stored
				storesNo: "",
				storesName: "",
				storesContactSurname: "",
				storesContactName: "",
				storesContactNo: "",
				storesContactEmailAdr: "",
			},
		}, // Goods receive,
	},
	poComments: [], // [{date: date, msg: msg, user: user}]
	poMedia: {
		photos: [],
		videos: [],
		voice: [],
	},
	poPi: [],
	poSplData: {
		// Supplier data
		splNo: "",
		splName: "",
		splContactSurname: "",
		splContactName: "",
		splContactNo: "",
		splContactEmailAdr: "",
	},
};

const newPoiFormData = [
	{ poiName: "itemName", poiValue: "", poiPlaceHolder: "item name" },
	{ poiName: "itemCode", poiValue: "", poiPlaceHolder: "item code" },
	{ poiName: "quantity", poiValue: "", poiPlaceHolder: "quantity" },
];

const newPoItem = {
	itemId: nanoid(),
	itemName: "",
	itemCode: "",
	itemQuantity: 0,
};

const stores = [
	{
		storeId: 1,
		storeName: "Smars Jozi Store",
		storeAdr: "15 Petunia Street",
		storeContactSurname: "Kentane",
		storeContactName: "Sitha",
		storeContactNo: "081 726 2352",
		storeContactEmailAdr: "sitha@smars.co.za",
	},
];

const astCartegories = {
	meter: {
		phase: "", // ['single', 'three', '', '']
		type: "", // ['conventional', 'pre-paid']
		code: "", // ['BEC44', 'BEC66', '']
	},
	pole: {},
	box: {},
};

const newSplFormData = {
	splNo: "",
	splName: "",
	splStatus: "active",
	metaData: {
		updatedAtDatetime: "",
		updatedByUser: "",
		createdAtDatetime: "",
		createdByUser: "",
	},
	splContactEmailAdr: "",
	splContactSurname: "",
	splContactName: "",
	splContactNo: "",
};

const newStoresFormData = {
	storesNo: "",
	storesName: "",
	status: "active",
	metaData: {
		updatedAtDatetime: "",
		updatedByUser: "",
		createdAtDatetime: "",
		createdByUser: "",
	},
	storesContactEmailAdr: "",
	storesContactSurname: "",
	storesContactName: "",
	storesContactNo: "",
};

const newUserRolesFormData = {
	metaData: {
		updatedAtDatetime: "",
		updatedByUser: "",
		createdAtDatetime: "",
		createdByUser: "",
	},
	userRoleName: "",
	userRoleDescription: "",
};

const newAstStatesFormData = {
	metaData: {
		updatedAtDatetime: "",
		updatedByUser: "",
		createdAtDatetime: "",
		createdByUser: "",
	},
	astStateName: "",
	astStateDescription: "",
};

const newTrnStatesFormData = {
	metaData: {
		updatedAtDatetime: "",
		updatedByUser: "",
		createdAtDatetime: "",
		createdByUser: "",
	},
	trnStateName: "",
	trnStateDescription: "",
};

const newAstCartegoriesFormData = {
	metaData: {
		updatedAtDatetime: "",
		updatedByUser: "",
		createdAtDatetime: "",
		createdByUser: "",
	},
	astCartegoryName: "",
	astCartegoryDescription: "",
};

const newMobileDevicesFormData = {
	metaData: {
		updatedAtDatetime: "",
		updatedByUser: "",
		createdAtDatetime: "",
		createdByUser: "",
	},
	deviceNo: "",
	oem: "",
	modelName: "",
	modelCode: "",
	serialNumber: "",
	IEMI: "",
	macNumber: "",
	status: "active",
};

const newSimcardsFormData = {
	metaData: {
		updatedAtDatetime: "",
		updatedByUser: "",
		createdAtDatetime: "",
		createdByUser: "",
	},
	cardNo: "",
	simcardNumber: "062 342 5423",
	simcardPhoneNumber: "293842",
	simcardType: "nano",
	networkOperator: "Vodacom",
	memory: "20",
	status: "active",
};

const newAstFormData = {
	metaData: {
		updatedAtDatetime: "",
		updatedByUser: "",
		createdAtDatetime: "",
		createdByUser: "",
	},
	astData: {
		astSerialNo: "",
		astNo: "", // eg, meter no
		astCartegory: "", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
		astState: "stores",
	},
};

export {
	astStateNames,
	astNextState,
	trnNames,
	unpData,
	unpRoles,
	unpStates,
	newTrnData,
	newPoFormData,
	newPoiFormData,
	newPoItem,
	stores,
	astCartegories,
	newSplFormData,
	newStoresFormData,
	newUserRolesFormData,
	newAstStatesFormData,
	newTrnStatesFormData,
	newAstCartegoriesFormData,
	newMobileDevicesFormData,
	newSimcardsFormData,
	newAstFormData,
	newErfsFormData,
};
