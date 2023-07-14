export const fsTrnData = {
	meter: {
		installationData: {
			location: {
				premises: "", //inside/outside
				insideBox: "", //yes/no
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
			},
			serviceConnection: {
				connection: "",
			},
			keyPad: {
				isThereKeyPad: "",
				serialNo: "",
				kyPadPhotos: ["Photo 1 url", "Photo 2 url"],
			},
			astAdr: {
				adr: "",
				gps: {
					lat: "",
					lng: "",
				},
			},
			voltageReading: {
				phase1: "",
				phase2: "",
				phase3: "",
				voltageReadingPhotos: ["Photo 1 url", "Photo 2 url"],
			},
			linkedCb: {
				isThereCb: "",
				cbSize: "",
			},
			linkedSeal: {
				isThereSeal: "",
				sealNo: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1", "Photo 2"],
		},

		commissioningData: {
			voltageReading: "",
			meterReading: "",
			confirmInstallationData: "",
			comments: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			location: {
				premises: "", //inside/outside
				insideBox: "", //yes/no
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
			},
			serviceConnection: {
				connection: "",
			},
			keyPad: {
				isThereKeyPad: "",
				serialNo: "",
				kyPadPhotos: ["Photo 1 url", "Photo 2 url"],
			},
			astAdr: {
				adr: "",
				gps: {
					lat: "",
					lng: "",
				},
			},
			voltageReading: {
				phase1: "",
				phase2: "",
				phase3: "",
				voltageReadingPhotos: ["Photo 1 url", "Photo 2 url"],
			},
			linkedCb: {
				isThereCb: "",
				cbSize: "",
			},
			linkedSeal: {
				isThereSeal: "",
				sealNo: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1", "Photo 2"],
		},

		inspectionData: {
			meterPresent: "",
			meterTempered: "",
			meterInUse: "",

			readings: {
				meterReading: "",
				voltageReadings: {
					phase1: "",
					phase2: "",
					phase3: "",
				},
			},

			seal: {
				sealed: "",
				sealNo: "",
			},

			cb: {
				haveCb: "",
				size: "",
			},

			location: {
				premises: "",
				inSideBox: "",
				onPole: "",
			},

			confirmations: {
				confirmTrn: "not done",
			},

			photos: ["photo1", "photo2"],
		},

		disconnectionData: {
			level: "",
			readings: {
				voltageReadings: {
					phase1: "",
					phase2: "",
					phase3: "",
				},
			},
			seal: {
				sealed: "",
				sealNo: "",
			},
			cb: {
				hasCb: "",
				size: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["photo1", "photo2"],
		},

		reconnectionData: {
			// level: "",
			readings: {
				voltageReadings: {
					phase1: "",
					phase2: "",
					phase3: "",
				},
			},
			seal: {
				sealed: "",
				sealNo: "",
			},
			cb: {
				hasCb: "",
				size: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["photo1", "photo2"],
		},
	},

	cb: {
		installationData: {
			location: {
				premises: "", //inside/outside
				insideBox: "", //yes/no
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
			},
			astAdr: {
				adr: "",
				gps: {
					lat: "",
					lng: "",
				},
			},
			linkedMeter: {
				isLinkedToMeter: "",
				meterNo: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		commissioningData: {
			cbSizeVerified: "",
			cbMeterLinkVerified: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			location: {
				premises: "", //inside/outside
				insideBox: "", //yes/no
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
			},
			astAdr: {
				adr: "",
				gps: {
					lat: "",
					lng: "",
				},
			},
			linkedMeter: {
				isLinkedToMeter: "",
				meterNo: "",
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		inspectionData: {
			cbPresent: "",
			visibleDamage: "",
			sameCircuitAsMeter: "",
			confirmations: {
				confirmTrn: "choose",
			},
		},
	},

	seal: {
		installationData: {
			linkedMeterNo: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		commissioningData: {
			sealNoVerified: "",
			sealMeterLinkVerified: "",
			sealLocked: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			linkedMeterNo: "",
			confirmations: {
				confirmTrn: "not done",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		inspectionData: {
			sealIntactOnMeter: "",
			sealCut: "",
			sealRemoved: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},
	},

	box: {
		installationData: {
			location: {
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
				premises: "",
			},
			astAdr: {
				adr: "",
				gps: {
					lat: "",
					lng: "",
				},
			},
			boxLock: {
				lockable: "",
				isLocked: "",
			},
			scns: [{ meter: "", cb: "", erfNo: "" }],
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Box Photo 1", "Box Photo 2", "Box Photo 3"],
		},

		commissioningData: {
			installationDataVerified: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			location: {
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
				premises: "",
			},
			astAdr: {
				adr: "",
				gps: {
					lat: "",
					lng: "",
				},
			},
			boxLock: {
				lockable: "",
				isLocked: "",
			},
			scns: [{ meter: "", cb: "", erfNo: "" }],
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Box Photo 1", "Box Photo 2", "Box Photo 3"],
		},

		inspectionData: {
			location: {
				exactLocation: "",
				premises: "",
			},
			damaged: "",
			lockable: "",
			boxLock: {
				lockable: "",
				isLocked: "",
			},
			devicesInBox: {
				howManyMeters: "",
				howManyCbs: "",
			},
			scns: [{ meter: "", cb: "", erfNo: "" }],
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["photo1", "photo2", "photo3"],
		},
	},

	pole: {
		installationData: {
			location: {
				premises: "",
			},
			astAdr: {
				adr: "",
				gps: {
					lat: "",
					lng: "",
				},
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		commissioningData: {
			installationDataVerified: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		auditData: {
			location: {
				premises: "",
			},
			astAdr: {
				adr: "",
				gps: {
					lat: "",
					lng: "",
				},
			},
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["Photo 1 url", "Photo 2 url"],
		},

		inspectionData: {
			poleLeaning: "",
			poleIntact: "",
			poleDamaged: "",
			confirmations: {
				confirmTrn: "choose",
			},
			photos: ["photos3", "photos2", "photos1"],
		},
	},
};
