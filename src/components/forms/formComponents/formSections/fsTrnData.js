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
				kyPadPhotos: [],
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
				voltageReadingPhotos: [],
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
				confirmTrn: "not done",
			},
			photos: [],
		},

		commissioningData: {
			voltageReading: "",
			meterReading: "",
			confirmInstallationData: "",
			comments: "",
			confirmations: {
				confirmTrn: "not done",
			},
			photos: [],
		},

		auditData: {
			location: {
				premises: "", //inside/outside
				insideBox: "", //yes/no, photo needed
				exactLocation: "", //['pole top', pole bottom', 'stand alone', 'other']
			},
			serviceConnection: {
				connection: "",
			},
			keyPad: {
				isThereKeyPad: "", //photo needed
				keyPadAccess: "",
				noAccessReasons: "",
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
			},
			linkedCb: {
				isThereCb: "",
			},
			linkedSeal: {
				isThereSeal: "",
			},
			anomalies: "",
			confirmations: {
				confirmTrn: "not done",
			},
			meterSealed: "",
		},

		inspectionData: {
			meterPresent: "",
			meterTempered: "",

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
				// sealNo: "",
			},

			cb: {
				haveCb: "",
				// size: "",
			},

			location: {
				premises: "",
				inSideBox: "",
				onPole: "",
			},

			confirmations: {
				confirmTrn: "not done",
			},

			photos: [],
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
				confirmTrn: "not done",
			},
			photos: [],
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
				confirmTrn: "not done",
			},
			photos: [],
		},

		tidData: {
			accessToKeyPad: "", //photo needed
			rolloverDone: {
				done: "",
				comments: "",
			},
			beforeTidRollover: {
				status: "",
				krn: "",
			},
			afterTidRollover: {
				status: "",
				krn: "",
			},
			confirmations: {
				confirmTrn: "not done",
			},
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
				confirmTrn: "not done",
			},
			photos: [],
		},

		commissioningData: {
			cbSizeVerified: "",
			cbMeterLinkVerified: "",
			confirmations: {
				confirmTrn: "not done",
			},
			photos: [],
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
				confirmTrn: "not done",
			},
			photos: [],
		},

		inspectionData: {
			cbPresent: "",
			visibleDamage: "",
			sameCircuitAsMeter: "",
			confirmations: {
				confirmTrn: "not done",
			},
		},
	},

	seal: {
		installationData: {
			linkedMeterNo: "",
			confirmations: {
				confirmTrn: "not done",
			},
			photos: [],
			astAdr: {
				adr: "",
				gps: {
					lat: "",
					lng: "",
				},
			},
		},

		commissioningData: {
			sealNoVerified: "",
			sealMeterLinkVerified: "",
			sealLocked: "",
			confirmations: {
				confirmTrn: "not done",
			},
			photos: [],
		},

		auditData: {
			linkedMeterNo: "",
			confirmations: {
				confirmTrn: "not done",
			},
			photos: [],
			sealComments: "",
			astAdr: {
				adr: "",
				gps: {
					lat: "",
					lng: "",
				},
			},
		},

		inspectionData: {
			sealIntactOnMeter: "",
			sealCut: "",
			sealRemoved: "",
			confirmations: {
				confirmTrn: "not done",
			},
			photos: [],
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
				confirmTrn: "not done",
			},
			photos: [],
		},

		commissioningData: {
			installationDataVerified: "",
			confirmations: {
				confirmTrn: "not done",
			},
			photos: [],
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
				confirmTrn: "not done",
			},
			photos: [],
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
				confirmTrn: "not done",
			},
			photos: [],
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
				confirmTrn: "not done",
			},
			photos: [],
		},

		commissioningData: {
			installationDataVerified: "",
			confirmations: {
				confirmTrn: "not done",
			},
			photos: [],
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
				confirmTrn: "not done",
			},
			photos: [],
		},

		inspectionData: {
			poleLeaning: "",
			poleIntact: "",
			poleDamaged: "",
			confirmations: {
				confirmTrn: "not done",
			},
			photos: [],
		},
	},
};
