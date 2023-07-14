const getTrnComSection = astCat => {
	// console.log(`astCatIndex`, astCatIndex)

	switch (astCat) {
		case "meter":
			return {
				voltageReading: "",
				meterReading: "",
				confirmInstallationData: "",
				comments: "",
				confirmations: {
					confirmTrn: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			};

		case "box":
			return {
				installationDataVerified: "",
				confirmations: {
					confirmTrn: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			};

		case "cb":
			return {
				cbSizeVerified: "",
				cbMeterLinkVerified: "",
				confirmations: {
					confirmTrn: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			};

		case "seal":
			return {
				sealNoVerified: "",
				sealMeterLinkVerified: "",
				sealLocked: "",
				confirmations: {
					confirmTrn: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			};

		case "pole":
			return {
				installationDataVerified: "",
				confirmations: {
					confirmTrn: "",
				},
				photos: ["Photo 1 url", "Photo 2 url"],
			};

		default:
			return null;
	}
};

exports.getTrnComSection = getTrnComSection;
