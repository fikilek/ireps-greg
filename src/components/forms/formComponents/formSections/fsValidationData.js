export const fsValidationData = {
	meter: {
		installationValidationData: {
			location: {
				premises: {
					//inside/outside
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				insideBox: {
					//inside/outside
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				exactLocation: {
					//['pole top', pole bottom', 'stand alone', 'other']
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			serviceConnection: {
				connection: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			keyPad: {
				isThereKeyPad: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				serialNo: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereKeyPad: "yes",
							},
						},
					],
					verdict: "",
				},
				kyPadPhotos: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereKeyPad: "yes",
							},
						},
					],
					verdict: "",
				},
			},
			astAdr: {
				adr: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				gps: {
					latitude: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
					longitude: {
						constraints: [{ required: "", condition: "" }],
						verdict: "",
					},
				},
			},
			voltageReading: {
				phase1: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				phase2: {
					constraints: [{ required: "condition", condition: "" }],
					verdict: "",
				},
				phase3: {
					constraints: [{ required: "condition", condition: "" }],
					verdict: "",
				},
				voltageReadingPhotos: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			linkedCb: {
				isThereCb: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				cbSize: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereCb: "yes",
							},
						},
					],
					verdict: "",
				},
			},
			linkedSeal: {
				isThereSeal: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				sealNo: {
					constraints: [
						{
							required: "condition",
							condition: {
								isThereSeal: "yes",
							},
						},
					],
					verdict: "",
				},
			},

			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		commissioningValidationData: {
			voltageReading: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			meterReading: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmInstallationData: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			comments: {
				constraints: [{ required: "condition", condition: "no" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		auditValidationData: {
			location: {
				premises: {
					//inside/outside
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				insideBox: {
					astInsideBox: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
				exactLocation: {
					//['pole top', pole bottom', 'stand alone', 'other']
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			serviceConnection: {
				connection: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			keyPad: {
				isThereKeyPad: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				keyPadAccess: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				noAccessReasons: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			astAdr: {
				adr: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				gps: {
					latitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					longitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
			voltageReading: {
				phase1: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				phase2: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				phase3: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			linkedCb: {
				isThereCb: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			linkedSeal: {
				isThereSeal: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			anomalies: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			meterSealed: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},

			// astData

			astCartegory: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astNo: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			astSerialNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astState: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			meter: {
				code: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				type: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				phase: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				manufacturer: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
		},

		inspectionValidationData: {
			meterPresent: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			meterTempered: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},

			readings: {
				meterReading: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				voltageReadings: {
					phase1: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					phase2: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
					phase3: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
				},
			},

			seal: {
				sealed: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				sealNo: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},

			cb: {
				hasCb: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				size: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},

			location: {
				premises: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				insideBox: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				onPole: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},

			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},

			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		disconnectionValidationData: {
			level: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			readings: {
				voltageReadings: {
					phase1: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					phase2: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
					phase3: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
				},
			},
			seal: {
				sealed: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				sealNo: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			cb: {
				hasCb: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				size: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		reconnectionValidationData: {
			readings: {
				voltageReadings: {
					phase1: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					phase2: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
					phase3: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
				},
			},
			seal: {
				sealed: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				sealNo: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			cb: {
				hasCb: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				size: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		tidValidationData: {
			accessToKeyPad: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			rolloverDone: {
				done: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				comments: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			beforeTidRollover: {
				status: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				krn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			afterTidRollover: {
				status: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				krn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
		},
	},

	cb: {
		installationValidationtionData: {
			location: {
				premises: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				insideBox: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				exactLocation: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			astAdr: {
				adr: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				gps: {
					latitude: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
					longitude: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
				},
			},
			linkedMeter: {
				isLinkedToMeter: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				meterNo: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		commissioningValidationData: {
			cbSizeVerified: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			cbMeterLinkVerified: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		auditValidationData: {
			location: {
				premises: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				insideBox: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				exactLocation: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
			astAdr: {
				adr: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				gps: {
					latitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					longitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
			linkedMeter: {
				isLinkedToMeter: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				meterNo: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},

			// astData

			astCartegory: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astSerialNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astState: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			cb: {
				code: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				type: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				size: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
		},

		inspectionValidationData: {
			cbPresent: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			visibleDamage: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			sameCircuitAsMeter: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
		},
	},

	seal: {
		installationValidationtionData: {
			linkedMeterNo: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astAdr: {
				adr: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				gps: {
					latitude: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
					longitude: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
				},
			},

			// astData

			astCartegory: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astNo: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			astSerialNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astState: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		commissioningValidationtionData: {
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			sealNoVerified: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			sealMeterLinkVerified: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			sealLocked: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			photos: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
		},

		auditValidationData: {
			linkedMeterNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			sealComments: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astAdr: {
				adr: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				gps: {
					latitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					longitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},

			// astData

			astCartegory: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astNo: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			astSerialNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astState: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			seal: {
				code: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				type: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
		},

		inspectionValidationData: {
			sealIntactOnMeter: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			sealCut: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			sealRemoved: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},
	},

	box: {
		installationValidationtionData: {
			location: {
				exactLocation: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				premises: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			astAdr: {
				adr: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				gps: {
					Latitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					Longitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
			boxLock: {
				lockable: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				isLocked: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		commissioningValidationtionData: {
			installationDataVerified: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		auditValidationData: {
			location: {
				exactLocation: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				premises: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			astAdr: {
				adr: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				gps: {
					Latitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					Longitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
			boxLock: {
				lockable: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				isLocked: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			scnc: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},

			// astData

			astCartegory: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astNo: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			astSerialNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astState: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			box: {
				dimensions: {
					lenght: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
					width: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
					height: {
						constraints: [{ required: "no", condition: "" }],
						verdict: "",
					},
				},
				code: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				type: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				color: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
		},

		inspectionValidationData: {
			location: {
				exactLocation: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				premises: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			damaged: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			lockable: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			boxLock: {
				lockable: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				isLocked: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			devicesInBox: {
				howManyMeters: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				howManyCbs: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			scns: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},
	},

	pole: {
		installationValidationtionData: {
			location: {
				premises: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			astAdr: {
				adr: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				gps: {
					Latitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					Longitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		commissioningValidationtionData: {
			installationDataVerified: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},

		auditValidationData: {
			location: {
				premises: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			astAdr: {
				adr: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				gps: {
					Latitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
					Longitude: {
						constraints: [{ required: "yes", condition: "" }],
						verdict: "",
					},
				},
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},

			// astData

			astCartegory: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			astNo: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			astSerialNo: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			astState: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
			pole: {
				code: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
				type: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
				length: {
					constraints: [{ required: "no", condition: "" }],
					verdict: "",
				},
			},
		},

		inspectionValidationData: {
			poleLeaning: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			poleIntact: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			poleDamaged: {
				constraints: [{ required: "yes", condition: "" }],
				verdict: "",
			},
			confirmations: {
				confirmTrn: {
					constraints: [{ required: "yes", condition: "" }],
					verdict: "",
				},
			},
			photos: {
				constraints: [{ required: "no", condition: "" }],
				verdict: "",
			},
		},
	},
};
