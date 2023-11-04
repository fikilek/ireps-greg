import { nanoid } from "@reduxjs/toolkit";
import totals3 from "../images/totals3.png";

// maths

// function to generate rendom number betwen min and max
export const randomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Dashboard (Dbd)

export const getDbdTotals = data => {
	console.log(`data received by getDbdTotals`, data);
	const totals = { name: "totals", data: { asts: 0, trns: 0 }, astImg: totals3 };
	const objEnt = Object.entries(data.asts_totals);
	// console.log(`objEnt`, objEnt)
	// console.log(`totals.data.asts`, totals.data.asts);
	let tot = 0;
	objEnt &&
		objEnt.map(i => {
			// console.log(i[0], i[1])
			tot = tot + i[1];
			// console.log(tot);
		});
	totals.data.asts = tot;
	// console.log(`totals.data.asts`, totals.data.asts);

	return { totals, asts: objEnt };
};

export const getSystemId = () => nanoid();

// grv / po

export const getGrvStatus = (inv, payment, cr, wr) => {
	// if (poInvStatus === false || poPopStatus === false) return "No Grv"
	// if (poInvStatus === true || poPopStatus === true) return "Created"
	if (inv === false && payment === false && cr === false && wr === false)
		return "No Grv";
	if (inv === true && payment === false && cr === false && wr === false)
		return "No Grv";
	if (inv === false && payment === true && cr === false && wr === false)
		return "No Grv";
	if (inv === true && payment === true && cr === false && wr === false)
		return "Created";
	if (inv === false && payment === false && cr === true && wr === false)
		return "No Grv";
	if (inv === true && payment === false && cr === true && wr === false)
		return "Created";
	if (inv === false && payment === true && cr === true && wr === false)
		return "No Grv";
	if (inv === true && payment === true && cr === true && wr === false)
		return "Received";
	if (inv === false && payment === false && cr === false && wr === true)
		return "No Grv";
	if (inv === true && payment === false && cr === false && wr === true)
		return "No Grv";
	if (inv === false && payment === true && cr === false && wr === true)
		return "No Grv";
	if (inv === true && payment === true && cr === false && wr === true)
		return "No Grv";
	if (inv === false && payment === false && cr === true && wr === true)
		return "No Grv";
	if (inv === true && payment === false && cr === true && wr === true)
		return "No Grv";
	if (inv === false && payment === true && cr === true && wr === true)
		return "No Grv";
	if (inv === true && payment === true && cr === true && wr === true)
		return "Witnessed";
};

export const getUidFromPo = ({ po, signatureName }) => {
	if (signatureName === "receiver") {
		return po.poData.poGrv.grvReceiver.grvReceiverUid;
	}
	if (signatureName === "witness") {
		return po.poData.poGrv.grvWitness.grvWitnessUid;
	}
	if (signatureName === "poApprove") {
		return po.poApprove.approveUid;
	}
	return null;
};

export const getPoAction = signatureName => {
	switch (signatureName) {
		case "poApprove":
			return "approved";
		case "receiver":
			return "received";
		case "witness":
			return "witnessed";
		default:
			return null;
	}
};

export const getPoStatus = po => {
	const poApproved = po.poApprove.approveUid;
	const poReceived = po.poData.poGrv.grvReceiver.grvReceiverUid;
	const poWitnessed = po.poData.poGrv.grvWitness.grvWitnessUid;
	if (!poApproved && !poReceived && !poWitnessed) return "created";
	if (poApproved && !poReceived && !poWitnessed) return "approved";
	if (poApproved && poReceived && !poWitnessed) return "received";
	if (poApproved && poReceived && poWitnessed) return "witnessed";
	return null;
};

// ******************************************************
// strings
// ******************************************************

// capilalize first letter of a string and the rest small letters
export const capitalizeFirstLetter = string => {
	return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

export const capitalize = string => {
	const firstLetter = string.charAt(0).toUpperCase();
	const restOfString = string.slice(1).toLowerCase();
	return string && `${firstLetter}${restOfString}`;
};

// ******************************************************
// form - select options
// ******************************************************

export const formSelectOptions = {
	propertyTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Stand Alone", value: "Stand Alone" },
		{ key: "Flats", value: "Flats" },
		{ key: "Estate", value: "Estate" },
		{ key: "Complex", value: "Complex" },
		{ key: "Townhouses", value: "Townhouses" },
		{
			key: "Stand Alone (with outside rooms)",
			value: "Stand Alone (with outside rooms)",
		},
		{ key: "other", value: "other" },
	],
	sealCommentsOptions: [
		{ key: "choose", value: "choose" },
		{ key: "nsn (sealed)", value: "nsn (sealed)" },
		{
			key: "snnv (sealed)",
			value: "snnv (sealed)",
		},
	],
	anomaliesOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Meter damaged", value: "Meter damaged" },
		{ key: "Meter faulty", value: "Meter faulty" },
		{ key: "Illegal Connection", value: "Illegal Connection" },
		{ key: "Meter Ok", value: "Meter Ok" },
	],
	tidRolloverStatusOptions: [
		{ key: "choose", value: "choose" },
		{ key: "tariff1", value: "tariff1" },
		{ key: "tariff2", value: "tariff2" },
		{ key: "tariff3", value: "tariff3" },
		{ key: "tariff4", value: "tariff4" },
	],
	tidRolloverKrnOptions: [
		{ key: "choose", value: "choose" },
		{ key: "krn1", value: "krn1" },
		{ key: "krn2", value: "krn2" },
	],

	rolloverDoneCommentOptions: [
		{ key: "choose", value: "choose" },
		{ key: "comment1", value: "comment1" },
		{ key: "comment2", value: "comment2" },
		{ key: "comment3", value: "comment3" },
		{ key: "comment4", value: "comment4" },
	],

	keyPadNoAccessOptions: [
		{ key: "choose", value: "choose" },
		{ key: "gate locked", value: "gate locked" },
		{ key: "occupant refused", value: "occupant refused" },
		{ key: "dogs danger", value: "dogs danger" },
		{ key: "resident not available", value: "resident not available" },
		{ key: "propert lockd", value: "propert lockd" },
	],

	erfStatusOptions: [
		{ key: "choose", value: "choose" },
		{ key: "developed", value: "developed" },
		{ key: "empty", value: "empty" },
		{ key: "vandalised", value: "vandalised" },
	],
	disconnectionLevelOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Level 1", value: "Level 1" },
		{ key: "Level 2", value: "Level 2" },
		{ key: "Level 3", value: "Level 3" },
	],

	countryOptions: [
		{ key: "choose", value: "choose" },
		{ key: "South Africa", value: "South Africa" },
		{ key: "China", value: "China" },
		{ key: "Russia", value: "Russia" },
	],

	provinceOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Eastern Cape", value: "Eastern Cape" },
		{ key: "Gauteng", value: "Gauteng" },
		{ key: "KZN", value: "KZN" },
		{ key: "Limpompo", value: "Limpompo" },
		{ key: "North West", value: "North West" },
		{ key: "Western Cape", value: "Western Cape" },
		{ key: " Cape", value: " Cape" },
	],

	dmOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Chris Hani", value: "Chris Hani" },
		{ key: "O R Tambo", value: "O R Tambo" },
		{ key: "Amathole", value: "Amathole" },
	],

	lmMetroOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Enock Mgijima", value: "Enock Mgijima" },
		{ key: "KSD", value: "KSD" },
		{ key: "eDumbe", value: "eDumbe" },
		{ key: "eMvoti", value: "eMvoti" },
		{ key: "Ekurhuleni", value: "Ekurhuleni Metro" },
		{ key: "CoJ Metro", value: "CoJ Metro" },
		{ key: "Tshwane Metro", value: "Tshwane Metro" },
		{ key: "Mnquma", value: "Mnquma" },
	],

	townOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Gcuwa", value: "Gcuwa" },
		{ key: "Mthatha", value: "Mthatha" },
		{ key: "East London", value: "East London" },
		{ key: "Queenstown", value: "Queenstown" },
		{ key: "Tarkastad", value: "Tarkastad" },
		{ key: "Hofmeyer", value: "Hofmeyer" },
		{ key: "Paulpietersburg", value: "Paulpietersburg" },
		{ key: "", value: "" },
	],

	poletypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "wood", value: "wood" },
		{ key: "metal", value: "metal" },
		{ key: "pvc", value: "pvc" },
		{ key: "other", value: "other" },
	],

	goodBadOptions: [
		{ key: "choose", value: "choose" },
		{ key: "good", value: "good" },
		{ key: "bad", value: "bad" },
		{ key: "average", value: "average" },
	],

	cbPoleOtions: [
		{ key: "choose", value: "choose" },
		{ key: "single pole", value: "single pole" },
		{ key: "double pole", value: "double pole" },
	],

	trnConfirmationOptions: [
		// { key: "choose", value: "choose" },
		{ key: "done", value: "done" },
		{ key: "not done", value: "not done" },
	],

	serviceConnectionEntryOptions: [
		{ key: "choose", value: "choose" },
		{ key: "overhead", value: "overhead" },
		{ key: "underground", value: "underground" },
	],

	yesNoOptions: [
		{ key: "choose", value: "choose" },
		{ key: "yes", value: "yes" },
		{ key: "no", value: "no" },
	],

	astLocationPremisesOptions: [
		{ key: "choose", value: "choose" },
		{ key: "inside", value: "inside" },
		{ key: "outside", value: "outside" },
	],

	meterTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "pre-paid", value: "pre-paid" },
		{ key: "conventional", value: "conventional" },
	],

	meterPhaseOptions: [
		{ key: "choose", value: "choose" },
		{ key: "single", value: "single" },
		{ key: "three", value: "three" },
	],

	astExactLocationOptions: [
		{ key: "choose", value: "choose" },
		{ key: "poleBottom", value: "poleBottom" },
		{ key: "poleTop", value: "poleTop" },
		{ key: "standAlone", value: "standAlone" },
		{ key: "building wall", value: "building wall" },
		{ key: "boundary wall", value: "boundary wall" },
		{ key: "other", value: "other" },
	],

	confirmInstallationDataOptions: [
		{ key: "choose", value: "choose" },
		{ key: "confirmed correct", value: "confirmed correct" },
		{ key: "data wrong", value: "data wrong" },
		{ key: "other", value: "other" },
	],

	genderOptions: [
		{ key: "choose", value: "choose" },
		{ key: "male", value: "male" },
		{ key: "female", value: "female" },
		{ key: "none", value: "none" },
	],

	customerCartegoryOptions: [
		{ key: "choose", value: "choose" },
		{ key: "owner", value: "owner" },
		{ key: "occupant", value: "occupant" },
	],

	customerTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "warm body", value: "warm body" },
		{ key: "juristic person", value: "juristic person" },
	],

	standUseOptions: [
		{ key: "choose", value: "choose" },
		{ key: "residential suburb", value: "residential suburb" },
		{ key: "residential township", value: "residential township" },
		{ key: "business", value: "business" },
		{ key: "church", value: "church" },
		{ key: "government", value: "government" },
	],

	poleHasLampOptions: [
		{ key: "choose", value: "choose" },
		{ key: "yes", value: "yes" },
		{ key: "no", value: "no" },
	],

	poleTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "wood", value: "wood" },
		{ key: "cement", value: "cement" },
		{ key: "metal", value: "metal" },
	],

	poleConditionOptions: [
		{ key: "choose", value: "choose" },
		{ key: "good", value: "good" },
		{ key: "leaning", value: "leaning" },
		{ key: "burned", value: "burned" },
		{ key: "bad", value: "bad" },
	],

	boxTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "fibreglass", value: "fibreglass" },
		{ key: "metal", value: "metal" },
		{ key: "pvc", value: "pvc" },
	],

	boxLocationOptions: [
		{ key: "choose", value: "choose" },
		{ key: "pole top", value: "pole top" },
		{ key: "pole bottom", value: "pole bottom" },
		{ key: "stand alone", value: "stand alone" },
	],
};

export const getAstCatMediaCat = namePath => {
	// namePath = namePath
	// 	.replaceAll("[", ".")
	// 	.replaceAll("]", ".")
	// 	.replaceAll("..", ".");
	const astCat = namePath
		.replaceAll("[", ".")
		.replaceAll("]", ".")
		.replaceAll("..", ".")
		.split(".");
	// .pop();

	const mediaCatStr = namePath
		.replaceAll("[", ".")
		.replaceAll("]", ".")
		.replaceAll("..", ".")
		.split(".")
		.pop();
	// console.log(`mediaCatStr`, mediaCatStr);
	const mediaCatName = mediaCatStr.substring(0, namePath.lastIndexOf("Media"));
	// console.log(`mediaCatName`, mediaCatName);

	const astCatMediaCat = `${astCat[1]} ${mediaCatName}`;
	// return mediaCatName;
	return { astCat: astCat[1], mediaCatName, astCatMediaCat };
};

export const irepsDictionary = new Map();

irepsDictionary.set("astNo", "Ast No");
irepsDictionary.set("astNoMedia", "No");
irepsDictionary.set("temperMedia", "Temper");
irepsDictionary.set("meterReadingMedia", "Reading");

irepsDictionary.set("sizeMedia", "Size");
irepsDictionary.set("insideBox", "Inside Box");
irepsDictionary.set("insideBoxMedia", "Inside Box");
irepsDictionary.set("keyPadMedia", "Key Pad");
irepsDictionary.set("keyPad", "Key Pad");
irepsDictionary.set("asts", "Assets");
irepsDictionary.set("trns", "Transactions");
irepsDictionary.set("admin", "Admin");
irepsDictionary.set("meter", "Meter");
irepsDictionary.set("seal", "Seal");
irepsDictionary.set("cb", "Cb");
irepsDictionary.set("users", "User");
irepsDictionary.set("systt", "System");
irepsDictionary.set("user-roles", "User Role");

export const getAstCat = fieldNameStr => {
	// if (!gcData) return null;
	// let fieldNameStr = gcData?.data?.field?.name;
	if (!fieldNameStr) return null;
	// console.log(`fieldNameStr`, fieldNameStr);
	fieldNameStr = fieldNameStr?.replaceAll("[", ".");
	fieldNameStr = fieldNameStr?.replaceAll("]", ".");
	fieldNameStr = fieldNameStr?.replaceAll("..", ".");
	const fieldNameArray = fieldNameStr?.split(".");
	const astCategory = fieldNameArray[1];
	// console.log(`astCategory`, astCategory);
	return astCategory;
};
