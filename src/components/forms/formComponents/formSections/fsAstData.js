export const fsAstData = {
	meter: {
		astData: {
			astCartegory: "meter",
			astNo: "", // required
			astSerialNo: "",
			astState: "service",
			astMedia: {
				astNoMedia: [], // photo to show meter number
				insideBoxMedia: [], // photo to show meter isdie a box
				keyPadMedia: [], // photo to show evidance of a keypad existance
			},
			meter: {
				code: "",
				type: "", // required
				phase: "", // required
				manufacturer: "",
			},
		},
	},

	cb: {
		astData: {
			astCartegory: "cb",
			astNo: "",
			astSerialNo: "",
			astState: "service",
			astMedia: {
				sizeMedia: []
			},
			cb: {
				code: "",
				type: "",
				size: "", // required
			},
		},
	},

	seal: {
		astData: {
			astCartegory: "seal",
			astNo: "", // required
			astSerialNo: "",
			astState: "service",
			astMedia: {
				astNoMedia: []
			},
			seal: {
				code: "",
				type: "",
			},
		},
	},

	box: {
		astData: {
			astCartegory: "box",
			astNo: "",
			astSerialNo: "",
			astState: "service",
			astMedia: {
				astoMedia: []
			},
			box: {
				dimensions: {
					lenght: "",
					width: "",
					height: "",
				},
				code: "",
				type: "", // required
				color: "",
			},
		},
	},

	pole: {
		astData: {
			astCartegory: "pole",
			astNo: "",
			astSerialNo: "",
			astState: "service",
			astMedia: {
				astPoleMedia: [],
			},
			pole: {
				code: "",
				type: "", // required
				length: "", //  required
			},
		},
	},
};



