import { nanoid } from "@reduxjs/toolkit";
import { format, parseISO } from "date-fns";
import moment from "moment";

export const astsData = [
	{
		astSystemId: 121,
		metaData: {
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			createdByUser: "fikile kentane",
			createdThrough: "asr",
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			updatedByUser: "fikile kentane",
			trnCount: 1, //asr,
		},

		astData: {
			astSerialNo: "123 4567",
			astNo: "04 123 4567", // eg, meter no
			astCartegory: "meter", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
			astState: "service",
			meter: {
				phase: "single", // ['single', 'three', '', '']
				type: "pre-paid", // ['conventional', 'pre-paid']
			},
		},
	},
	{
		astSystemId: 122,
		metaData: {
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			createdByUser: "fikile kentane",
			createdThrough: "aud",
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			updatedByUser: "fikile kentane",
			trnCount: 1, //aud,
		},

		astData: {
			astSerialNo: "4567",
			astNo: "bx-4567", // eg, meter no
			astCartegory: "box", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
			astState: "service",
			box: {
				type: "metal", // ['metal', 'fibreglass']
				dimensions: { length: 15, width: 12, height: 30 }, // ['Length', 'Width', 'height']
				location: "top of pole",
			},
		},
	},
	{
		astSystemId: 123,
		metaData: {
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			createdByUser: "fikile kentane",
			createdThrough: "aud",
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			updatedByUser: "fikile kentane",
			trnCount: 1, //aud,
		},

		astData: {
			astSerialNo: "199",
			astNo: "bx-199", // eg, meter no
			astCartegory: "box", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
			astState: "service",
			box: {
				type: "fibreglass", // ['metal', 'fibreglass']
				dimensions: { length: 15, width: 12, height: 30 }, // ['Length', 'Width', 'height']
				location: "stand alone",
			},
		},
	},
	{
		astSystemId: 124,
		metaData: {
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			createdByUser: "fikile kentane",
			createdThrough: "aud",
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			updatedByUser: "fikile kentane",
			trnCount: 1, //aud,
		},

		astData: {
			astSerialNo: "987",
			astNo: "pl-987", // eg, meter no
			astCartegory: "pole", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
			astState: "service",
			pole: {
				type: "wood", // ['metal', 'fibreglass']
				dimensions: { length: 15, diameter: 0.2 }, // ['Length', 'Width', 'height']
				hasStreetLamp: "yes",
			},
		},
	},
	{
		astSystemId: 125,
		metaData: {
			createdAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			createdByUser: "fikile kentane",
			createdThrough: "aud",
			updatedAtDatetime: moment(new Date(2022, 0, 10, 15, 21, 30)).format(
				"YYYY-MM-DDTHH:mm"
			),
			updatedByUser: "fikile kentane",
			trnCount: 1, //aud,
		},

		astData: {
			astSerialNo: "344",
			astNo: "pl-344", // eg, meter no
			astCartegory: "pole", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
			astState: "service",
			pole: {
				type: "wood", // ['metal', 'fibreglass']
				dimensions: { length: 15, diameter: 0.2 }, // ['Length', 'Width', 'height']
				hasStreetLamp: "no",
			},
		},
	},
	// {
	// 	astSystemId: nanoid(),
	// 	astData: {
	// 		astSerialNo: "123 4567",
	// 		astNo: "04 123 4567", // eg, meter no
	// 		astCartegory: "meter", // ['vt/ct', 'transformer', 'feereder', 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
	// 		astState: "service",
	// 	},
	// },
];

export const astsTestData = [
	// assets test data (atd)
	{
		astId: nanoid(),
		grvId: nanoid(),
		astCartegory: "meter",
		astNo: "2222",
	},
]; 

