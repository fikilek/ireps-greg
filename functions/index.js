// TODO: migrate all cloud functions to use Firebase 9

const trnComObj = require("./trnComObj");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const cloneDeep = require("lodash.clonedeep");
admin.initializeApp();
const db = getFirestore();

// const getTotalRecordsInCollection = async (col, astCat) => {
// 	const collectionRef = admin.firestore().collection(col);
// 	const query = collectionRef.where("astData.astCartegory", "==", astCat);
// 	const snapshot = await query.count().get();
// 	const collectionCount = snapshot.data().count;
// 	return collectionCount;
// };

// const permissions = {
// 	guest: {
// 		guest: false,
// 		fieldworker: false,
// 		supervisor: false,
// 		manager: false,
// 		superuser: false,
// 	},
// 	fieldworker: {
// 		guest: false,
// 		fieldworker: false,
// 		supervisor: false,
// 		manager: false,
// 		superuser: false,
// 	},
// 	supervisor: {
// 		guest: false,
// 		fieldworker: false,
// 		supervisor: false,
// 		manager: false,
// 		superuser: false,
// 	},
// 	manager: {
// 		guest: true,
// 		fieldworker: true,
// 		supervisor: true,
// 		manager: false,
// 		superuser: false,
// 	},
// 	superuser: {
// 		guest: true,
// 		fieldworker: true,
// 		supervisor: true,
// 		manager: true,
// 		superuser: false,
// 	},
// };

exports.updateUserRole = functions.https.onCall((data, context) => {
	console.log(`data`, data);
	// const data = {
	// 	roles: {
	// 		guest: true,
	// 		fieldworker: false,
	// 		supervisor: false,
	// 		manager: false,
	// 		superuser: false,
	// 	},
	// };
	// console.log(`context`, context);
	console.log(`-------------------------------`);
	const changeSet = data.changeSet;
	console.log(`changeSet`, changeSet);

	// console.log(`-------------------------------`);
	const customClaims = { roles: data.roles };
	// console.log(`-------------------------------`);
	// console.log(`customClaims or rolesControlledObj`, customClaims.roles);

	// convert roles controlled object into an array
	const rolesControlledArray = [];
	for (const role in customClaims.roles) {
		// console.log(`role`, role);
		if (customClaims.roles[role]) {
			rolesControlledArray.push(role);
		}
	}
	// console.log(`-------------------------------`);
	// console.log(`rolesControlledArray`, rolesControlledArray);

	// console.log(`-------------------------------`);
	const claimUid = data.uid;
	// console.log(`claimUid`, claimUid);

	// check if there is an auth object - if the user is authenticated
	if (!context.auth) {
		throw new functions.https.HttpsError("unauthenticated user");
	}

	// check if the user is permitted to modify claim

	// get current user auth object
	// console.log(`-------------------------------`);
	const authObj = context.auth;
	// console.log(`autObj`, authObj);

	// get current user auth object
	// console.log(`-------------------------------`);
	const controllerUid = context.auth.uid;
	console.log(`controllerUid`, controllerUid);

	// get current user roles
	const rolesControllerObj = authObj.token.roles;
	// console.log(`-------------------------------`);
	// console.log(`rolesControllerObj`, rolesControllerObj);

	// convert roles controller object into an array
	const rolesControllerArray = [];
	for (const role in rolesControllerObj) {
		if (rolesControllerObj[role]) {
			rolesControllerArray.push(role);
		}
	}
	console.log(`-------------------------------`);
	console.log(`rolesControllerArray`, rolesControllerArray);

	// validation 0: user cannot modify own roles
	if (controllerUid === claimUid) {
		// console.log(`-------------------------------`);
		// console.log("PERMISSION DENIED - user CANNOT alter OWN roles");
		return {
			userRecord: "",
			msg: "PERMISSION DENIED - user CANNOT alter OWN roles",
		};
	}

	// validation 1: manager is not allowed to change manager or supervisor. he can change guest, fieldworker or supervisor
	if (
		rolesControllerArray.includes("manager") ||
		rolesControllerArray.includes("superuser")
	) {
	} else
		return {
			userRecord: "",
			msg: "PERMISSION DENIED - only manager or superuser can modify roles",
		};

	// validation 1: user must have roles
	if (rolesControllerArray.length === 0) {
		// console.log(`-------------------------------`);
		// console.log("PERMISSION DENIED - user has NO ROLE, CANNOT alter roles");
		return {
			userRecord: "",
			msg: "PERMISSION DENIED - user has NO ROLE, CANNOT alter roles",
		};
	}

	// validation 3: manager is not allowed to change manager or supervisor. he can change guest, fieldworker or supervisor
	if (
		(changeSet["manager"]["change"] === true ||
			changeSet["superuser"]["change"] === true) &&
		rolesControllerArray.includes("manager") &&
		!rolesControllerArray.includes("superuser")
	) {
		// console.log(`------------------?r manager or superuser roles");
		return {
			userRecord: "",
			msg: "PERMISSION DENIED - manager CANNOT alter manager or superuser roles",
		};
	}

	// validation 4: superuser is not allowed to change supervisor. he can change guest, fieldworker, supervisor and manager
	if (
		changeSet["superuser"]["change"] === true &&
		rolesControllerArray.includes("superuser")
	) {
		// console.log(`-------------------------------`);
		// console.log("PERMISSION DENIED - manager CANNOT alter manager or superuser roles");
		return {
			userRecord: "",
			msg: "PERMISSION DENIED - superuser CANNOT alter superuser roles",
		};
	}

	// check if user is authenticated. This is done by checking if the token is valid
	return admin
		.auth()
		.setCustomUserClaims(claimUid, customClaims)
		.then(result => {
			// console.log(`result after decoding idToken`, result);
			return admin.auth().getUser(claimUid);
		})
		.then(userRecord => {
			// console.log(`result after setting claims`, userRecord);
			// return userRecord;
			return {
				userRecord,
				msg: `roles [${JSON.stringify(customClaims.roles)}] for user [${
					userRecord.displayName
				}] updated succesfully`,
			};
		})
		.catch(err => {
			console.log("Error updating custom claim:", err);
			return `Error updating custom claim: ${err.message}`;
		});
	// return { data, token, auth, user};
});

exports.listAllUsers = functions.https.onCall((data, context) => {
	let users = [];
	return admin
		.auth()
		.listUsers(1000)
		.then(listUsersResult => {
			console.log("listUsersResult", listUsersResult);

			listUsersResult.users.forEach(userRecord => {
				console.log("user", userRecord);
				users.push(userRecord);
			});
			console.log("users", users);
			return users;
		})
		.catch(error => {
			console.log("Error listing users:", error);
			return `Error listing users: ${error.meesage}`;
		});
});

exports.addDefaultUserRole = functions.auth.user().onCreate(user => {
	let uid = user.uid;

	const customClaims = {
		roles: {
			guest: true,
			fieldworker: false,
			supervisor: false,
			manager: false,
			superuser: false,
		},
	};
	//add custom claims
	return admin
		.auth()
		.setCustomUserClaims(uid, customClaims)
		.then(() => {
			//Interesting to note: we need to re-fetch the userRecord, as the user variable **does not** hold the claim
			return admin.auth().getUser(uid);
		})
		.then(userRecord => {
			console.log(`uid`, uid);
			console.log(`userRecord.customClaims`, userRecord.customClaims);
			return null;
		})
		.catch(err => {
			console.log("Error setting custom claim:", err);
		});
});

exports.deleteUser = functions.auth.user().onDelete(user => {
	let uid = user.uid;
	return admin
		.firestore()
		.collection("users")
		.doc(uid)
		.update({
			status: "deleted",
		})
		.then(() => {
			console.log(`User ${uid} succesfully updated :`);
		})
		.catch(err => {
			console.log(`Error updating user ${uid} :`, err);
		});
});

exports.createSpl = functions.firestore
	.document("suppliers/{userId}")
	.onCreate((snap, context) => {
		const splRef = admin.firestore().collection("suppliers");
		splRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				// functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				await docRef.update({ splNo: collectionSize });
				// console.log(`docRef`, docRef)
				// console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});

exports.createPo = functions.firestore
	.document("pos/{userId}")
	.onCreate(async (snap, context) => {
		const posRef = admin.firestore().collection("pos");
		await posRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				// functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				// console.log(`docRef`, docRef)
				const updatedPoDoc = await docRef.update({ poNo: collectionSize });
				// console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});

exports.createMobileDevice = functions.firestore
	.document("mobile-devices/{userId}")
	.onCreate(async (snap, context) => {
		const posRef = admin.firestore().collection("mobile-devices");
		await posRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				// functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				// console.log(`docRef`, docRef)
				const updatedPoDoc = await docRef.update({ deviceNo: collectionSize });
				// console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});

exports.createSimcard = functions.firestore
	.document("simcards/{userId}")
	.onCreate(async (snap, context) => {
		const posRef = admin.firestore().collection("simcards");
		await posRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				// functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				// console.log(`docRef`, docRef)
				const updatedPoDoc = await docRef.update({ cardNo: collectionSize });
				// console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});

exports.createTrn = functions.firestore
	.document("trns/{userId}")
	.onCreate(async (snap, context) => {
		const trnRef = admin.firestore().collection("trns");
		await trnRef
			.get()
			.then(async querySnapshot => {
				const collectionSize = querySnapshot.size;
				// functions.logger.log(`collectionSize:`, collectionSize);
				// TODO: fix the bug so that the Po invoice number counting srarts from 1 and not 2
				const docRef = snap.ref;
				// console.log(`docRef`, docRef)
				const updatedPoDoc = await docRef.update({
					"metaData.trnNo": collectionSize,
				});
				console.log(`updatedPoDoc`, updatedPoDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});

// update po after user has signed (poApprove, receiver or witness) the po
// get po using po id and update the signed field (poApprove or receiver or witness) with user uid and timestamp
exports.signPo = functions.https.onCall(async (data, context) => {
	// functions.logger.log(`data:`, data);
	// functions.logger.log(`context:`, context);
	const { poId, signatureName, uid } = data;
	const docRef = db.collection("pos").doc(poId);
	// functions.logger.log(`docRef:`, docRef);
	const datetime = Timestamp.now();
	const displayName = context.auth.token.name;
	let updatedDoc = null;
	if (signatureName === "poApprove") {
		updatedDoc = await docRef.update({
			"poApprove.approveDate": datetime,
			"poApprove.approveUid": uid,
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		// functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (signatureName === "receiver") {
		updatedDoc = await docRef.update({
			"poData.poGrv.grvReceiver.grvReceiverDate": datetime,
			"poData.poGrv.grvReceiver.grvReceiverUid": uid,
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		// functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (signatureName === "witness") {
		updatedDoc = await docRef.update({
			"poData.poGrv.grvWitness.grvWitnessDate": datetime,
			"poData.poGrv.grvWitness.grvWitnessUid": uid,
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		// functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	return updatedDoc;
});

// update poInv or poPop
exports.updatePoInvPop = functions.https.onCall(async (data, context) => {
	// functions.logger.log(`data:`, data);
	// functions.logger.log(`context:`, context);
	const { poId, type, schData, transactionType } = data;
	const docRef = db.collection("pos").doc(poId);

	// functions.logger.log(`docRef:`, docRef);
	const datetime = Timestamp.now();
	const displayName = context.auth.token.name;
	let updatedDoc = null;
	if (type === "invoice" && transactionType === "add") {
		updatedDoc = await docRef.update({
			"poData.poInv": admin.firestore.FieldValue.arrayUnion(schData),
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (type === "invoice" && transactionType === "remove") {
		updatedDoc = await docRef.update({
			"poData.poInv": admin.firestore.FieldValue.arrayRemove(schData),
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (type === "payment" && transactionType === "add") {
		updatedDoc = await docRef.update({
			"poData.poPop": admin.firestore.FieldValue.arrayUnion(schData),
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	if (type === "payment" && transactionType === "remove") {
		updatedDoc = await docRef.update({
			"poData.poPop": admin.firestore.FieldValue.arrayRemove(schData),
			"metaData.updatedAtDatetime": datetime,
			"metaData.updatedByUser": displayName,
		});
		functions.logger.log(`updatedDoc:`, updatedDoc);
	}
	return updatedDoc;
});

const getAstsInTrn = trn => {
	if (!trn) return null;
	const { astData } = trn;
	// console.log(`astData`, astData);
	const astIdsInTrnArray = [];
	for (const astCat in astData) {
		// console.log(`astCat`, astCat);
		const astsArray = astData[astCat];
		// console.log(`astsArray`, astsArray);
		// console.log(`validationObject`, validationObject);
		// console.log(`index`, index)
		// iterate through astsArray to create validation obj
		astsArray &&
			astsArray.forEach((ast, astCatIndex) => {
				// console.log(`ast`, ast)
				// console.log(`astCatIndex`, astCatIndex)

				// extrac ast id info
				const trnObject = astData[astCat][astCatIndex];
				// console.log(`trnObject`, trnObject)

				// check if ast is flagged 'done'
				const isDone = trnObject.trnData.confirmations.confirmTrn;
				// console.log(`isDone`, isDone);

				// only push the array if its done
				if (isDone === "done") {
					// create ast tracking info
					const astTrackingInfo = {
						astId: trnObject.id,
						astCat: astCat,
						astIndex: astCatIndex,
						trnObject,
						astNo: trnObject.astData.astNo,
						trnNo: trn.metaData.trnNo,
						trnType: trn.metaData.trnType,
					};
					astIdsInTrnArray.push(astTrackingInfo);
				}
			});
	}
	return astIdsInTrnArray;
};

const updateAstsInTrn = (trn, newAstsState) => {
	if (!trn) return null;
	const { astData } = trn;
	// console.log(`astData`, astData);

	// clone trn.astData
	const astDataClone = cloneDeep(trn.astData);
	// console.log(`astDataClone`, astDataClone);

	for (const astCat in astData) {
		// console.log(`astCat`, astCat);
		const astsArray = astData[astCat];
		astsArray &&
			astsArray.forEach((ast, astCatIndex) => {
				// console.log(`ast`, ast);
				// console.log(`astCatIndex`, astCatIndex);

				// extrac ast id info
				const trnObject = astData[astCat][astCatIndex];
				// console.log(`trnObject`, trnObject);

				// check if ast is flagged 'done'
				const isDone = trnObject.trnData.confirmations.confirmTrn;
				// console.log(`isDone`, isDone);

				// only push the array if its done
				if (isDone === "done") {
					// create ast tracking info
					// console.log(`newAstsState`, newAstsState);

					// extract the trnObject
					const updatedTrnObject = {
						...trnObject,
						astData: {
							...trnObject.astData,
							astState: newAstsState,
						},
					};
					// console.log(`updatedTrnObject`, updatedTrnObject);
					astDataClone[astCat][astCatIndex] = updatedTrnObject;
					// console.log(`astDataClone`, astDataClone);
				}
			});
		// console.log(`astDataClone`, astDataClone);
	}
	return astDataClone;
};

const updateErf = (trnAfter, ast, updatingObj) => {
	// console.log(`ast - line 304`, ast);
	// console.log(`updatingObj - line 305`, updatingObj);
	// console.log(`trnAfter - line 306`, trnAfter);
	// get id of the erf attached to the trn
	const erfId = trnAfter.erfData.id;
	// console.log(`erfId - line 309`, erfId);
	// console.log(`erfId`, erfId);

	// use erfId to get reference to the erf document that the ast is attached to
	const erfDocRef = admin.firestore().collection("erfs").doc(erfId);

	// with ref to the erf doc, now update the erfData.metaData.asts
	erfDocRef
		.update({
			"metaData.updatedAtDatetime": Timestamp.now(),
			"metaData.updatedByUser": "admin",
			asts: admin.firestore.FieldValue.arrayUnion(updatingObj),
		})
		.then(result => {
			// console.log(`result of updatedErfDocWithAstsData `, result);
			return `result of updatedErfDocWithAstsData: ${result}`;
		})
		.catch(err => {
			console.log(`error updating Erf`, err);
		});
};

const updateTrnWithNextState = (trnAfter, nextTrnState, nextAstsState) => {
	// console.log(`trnAfter`, trnAfter);
	const updatedAstData = updateAstsInTrn(trnAfter, nextAstsState);
	// console.log(`updatedAstData`, updatedAstData);
	// update trn to next state.
	const trnDocRef = db.collection("trns").doc(trnAfter.id);
	trnDocRef
		.update({
			"metaData.trnState": nextTrnState,
			"metaData.updatedAtDatetime": Timestamp.now(),
			"metaData.updatedByUser": "admin",
			astData: updatedAstData,
		})
		.then(updateTrn => {
			console.log(`updatedTrn`, updateTrn);
			return updateTrn;
		});
};

const getNewTrnCommissioning = trnAfter => {
	return {
		metaData: {
			createdAtDatetime: Timestamp.now(),
			createdByUser: "admin",
			// createdByUserId: user.uid,
			updatedAtDatetime: Timestamp.now(),
			updatedByUser: "admin",
			// createdByUserId: user.uid,
			trnHistory: 0, // how many times transaction has been updated
			trnType: "commissioning",
			trnNo: "",
			trnState: "draft",
		},
		erfData: trnAfter.erfData,
		astData: {},
	};
};

const updateAst = (trnAfter, ast, nextState, astUpdatedObj) => {
	// get reference to the ast to update
	// console.log(`ast`, ast);
	// console.log(`ast.astid`, ast.astid);
	const astDocRef = db.collection("asts").doc(ast.astId);
	// console.log(`astDocRef`, astDocRef);

	// check if the ast docuement exist
	astDocRef.get().then(docSnapShot => {
		if (!docSnapShot.exists) {
			// ast doc does not exist, throw error
			// console.log("No such document!");
		} else {
			// ast doc exist.
			// console.log("Document data:", docSnapShot.data());
			const astDocData = docSnapShot.data();
			// console.log(`astDocData`, astDocData);

			// get the current astState
			const { astState, astCartegory } = astDocData.astData;
			// console.log(`astState`, astState);
			// console.log(`astCartegory`, astCartegory);
			// console.log(`nextState`, nextState);
			// console.log(`trnAfter.metaData.trnType`, trnAfter.metaData.trnType);

			if (astCartegory === "meter" && astState === "disconnected") {
				if (trnAfter.metaData.trnType === "reconnection") {
					astDocRef
						.update({
							"astData.astState": "service",
							"metaData.updatedAtDatetime": Timestamp.now(),
							"metaData.updatedByUser": "admin",
							"metaData.trnCount":
								admin.firestore.FieldValue.arrayUnion(astUpdatedObj),
							erfData: trnAfter.erfData,
						})
						.then(updatedAstDoc => {
							console.log(`updatedAstDoc`, updatedAstDoc);
							return updatedAstDoc;
						});
				} else {
					astDocRef
						.update({
							"astData.astState": "disconnected",
							"metaData.updatedAtDatetime": Timestamp.now(),
							"metaData.updatedByUser": "admin",
							"metaData.trnCount":
								admin.firestore.FieldValue.arrayUnion(astUpdatedObj),
							erfData: trnAfter.erfData,
						})
						.then(updatedAstDoc => {
							console.log(`updatedAstDoc`, updatedAstDoc);
							return updatedAstDoc;
						});
				}
			} else {
				// ast is NOT a meter  - update the ast state
				// console.log(`Update ast `, ast);
				astDocRef
					.update({
						"astData.astState": nextState,
						"metaData.updatedAtDatetime": Timestamp.now(),
						"metaData.updatedByUser": "admin",
						"metaData.trnCount": admin.firestore.FieldValue.arrayUnion(astUpdatedObj),
						erfData: trnAfter.erfData,
					})
					.then(updatedAstDoc => {
						// console.log(`updatedAstDoc`, updatedAstDoc);
						return updatedAstDoc;
					});
			}
		}
	});
};

const createNewAst = (trnAfter, ast, nextState, astUpdatedObj) => {
	// get the ast from ast
	const { astData } = ast.trnObject;
	// console.log(`ast - line 439`, ast);
	// console.log(`ast.astId - line 440`, ast.astId);
	// console.log(`ast.trnObject.id - line 441`, ast.trnObject.id);

	// create a new ast object
	const newAst = {
		metaData: {
			createdAtDatetime: Timestamp.now(),
			createdByUser: "admin",
			// createdByUserId: user.uid,
			updatedAtDatetime: Timestamp.now(),
			updatedByUser: "admin",
			// updatedByUserId: user.uid,
			createdThrough: {
				creator: "audit",
				creatorNo: trnAfter.metaData.trnNo,
				id: trnAfter.id,
			},
			trnCount: admin.firestore.FieldValue.arrayUnion(astUpdatedObj),
		},
		astData: {
			...astData,
			astState: nextState,
			astLocation: astUpdatedObj?.astLocation,
		},
		erfData: trnAfter.erfData,
	};
	// console.log(`newAst`, newAst);

	// add the new ast to the asts collection
	db
		.collection("asts")
		.doc(ast.astId)
		.set(newAst)
		.then(docRef => {
			// console.log("Document added with ID: ", docRef.id);
			return `Document added with ID: ${docRef.id}`;
		})
		.catch(error => {
			console.error("Error adding document (741): ", error.msg);
			return "Error adding document: ", error.msg;
		});
};

const getUpdatingObj = (trnAfter, ast) => {
	// create object that will be used to update ast, erf and commissioning obj
	// console.log(`getUpdatingObj trnAfter (line 748)`, trnAfter);
	// console.log(`getUpdatingObj ast (line 749)`, ast);
	// console.log(
	// 	`getUpdatingObj [ast.trnObject.trnData.astAdr] (line 750)`,
	// 	ast?.trnObject?.trnData?.astAdr
	// );

	const trnType =
		trnAfter.metaData.trnType === "audit"
			? "installation"
			: trnAfter.metaData.trnType;

	// capitalise first letter of trnType
	const capTrnType = trnType.charAt(0).toUpperCase() + trnType.slice(1);

	if (trnType === "audit" || trnType === "installation") {
		return {
			id: ast.astId,
			[`${ast.astCat}${capTrnType}`]: ast.trnObject.trnData,
			trnMetaData: trnAfter.metaData,
			astLocation: {
				address: ast?.trnObject?.trnData?.astAdr?.adr,
				gps: {
					lat: ast?.trnObject?.trnData?.astAdr?.gps?.lat,
					lng: ast?.trnObject?.trnData?.astAdr?.gps?.lng,
				},
			},
		};
	} else {
		return {
			id: ast.astId,
			[`${ast.astCat}${capTrnType}`]: ast.trnObject.trnData,
			trnMetaData: trnAfter.metaData,
		};
	}
};

// This cloud function will do the following :
// 1. update the trn state to a new 'submited' trn when an exsting trn arrives at firestore with a 'valid' state.
// 2. transition the assosciated ast state from 'checked out' state to 'field' state.
exports.updateTrnAndAstOnTrnValid = functions.firestore
	.document("trns/{trnsId}")
	.onUpdate((change, context) => {
		// console.log(`context`, context)

		// trn data from the chenge parameter
		// const trn = change.after.data();
		let trnAfter = change.after.data();
		// console.log(`trnAfter line 782`, trnAfter);

		if (!trnAfter.id) {
			// insert trn id into trn
			trnAfter = {
				...trnAfter,
				id: change.after.id,
			};
		}
		// console.log(`trnAfter line 516`, trnAfter);

		// Retrieve the current, previous states and trnType
		const currentTrnState = trnAfter.metaData.trnState;
		// console.log(`currentTrnState`, currentTrnState);
		const previousTrnState = trnAfter.metaData.trnState;
		// console.log(`previousTrnState`, previousTrnState);
		const trnType = change.after.data().metaData.trnType;
		// console.log(`trnType`, trnType);

		// get erfData from trnAfter
		// const { erfData } = trnAfter;

		// get id of the trn doc

		// 3. Update all the trnAfterrn asts that are on 'field' state. This will be done by iterating though each of the ids (trnAfter.astData[astCat][index].astData.id).
		const astsInTrn = getAstsInTrn(trnAfter);
		// console.log(`astsInTrn line 810`, astsInTrn);
		// All asts in astInTrn are confirmations.conformTrn 'done'. Others are filtered out.

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "installation"
		) {
			console.log(`trns ${trnType} update`);
			// TODO: update to include installation trnType as as a condition
			// trnAfter has transitioned state
			// Step 1. Send notifications to all who should receive notificatons on the state transition of trnAfter

			// Step 2. update all asts in the trn document to the the 'field' state as they fall in that state after valid submsion of installation trn
			// - next trnState is 'submited
			// - next state of eash ast is 'field'
			updateTrnWithNextState(trnAfter, "submited", "field");

			// create a new trn commissioning objectwith erfData from trnAfter
			const newTrnCom = getNewTrnCommissioning(trnAfter);
			// console.log(`newTrnCom`, newTrnCom);

			// iterate through astsInTrn, on each ast id, update ast to a 'field' state.
			astsInTrn &&
				astsInTrn.forEach(ast => {
					// console.log(`ast`, ast);
					// For each ast installed do the following:
					// (1). update the ast itself,
					// (2). update erf where ast is installed
					// (3). update the new commissioning object

					// get updating object
					const updatingObj = getUpdatingObj(trnAfter, ast);

					// update ast
					updateAst(trnAfter, ast, "field", updatingObj);

					// update erf
					updateErf(trnAfter, ast, {
						...updatingObj,
						astData: {
							...ast.trnObject.astData,
							astState: "field",
						},
					});

					// update new commissioning object
					// updateNewComObj(newTrnCom, ast);
					// console.log(`4 - newTrnCom`, newTrnCom);

					const newComObj = {
						id: ast.astId,
						astData: {
							...ast.trnObject.astData,
							astState: "field",
						},
						[`${ast.astCat}Installation`]: ast.trnObject.trnData,
						trnData: trnComObj.getTrnComSection(ast.astCat),
					};

					if (!newTrnCom.astData) {
						newTrnCom.astData = {};
					}

					if (!newTrnCom.astData[ast.astCat]) {
						newTrnCom.astData[ast.astCat] = [];
					}

					newTrnCom["astData"][ast.astCat][ast.astIndex] = newComObj;
					// console.log(`4 - newTrnCom`, newTrnCom);
				});

			// add the newTrnCommissioning document to trns
			// console.log(`5 - newTrnCom`, newTrnCom);

			return db
				.collection("trns")
				.add(newTrnCom)
				.then(docRef => {
					console.log("Document added with ID: ", docRef.id);
					return `Document added with ID: ${docRef.id}`;
				})
				.catch(error => {
					console.log("Error adding document: ", error.msg);
					return `Error adding document:  ${error.msg}`;
				});
		}

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "commissioning"
		) {
			console.log(`trns ${trnType} update`);
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// Step 2. update all asts in the trn document to the the 'field' state as they fall in that state after valid submsion of installation trn
			// - next trnState is 'submited
			// - next state of eash ast is 'service'
			updateTrnWithNextState(trnAfter, "submited", "service");

			// iterate through astsInTrn, on each ast id, update ast to a 'field' state.
			return (
				astsInTrn &&
				astsInTrn.forEach(ast => {
					// console.log(`ast`, ast);

					// get updating object
					const updatingObj = getUpdatingObj(trnAfter, ast);

					// update ast
					updateAst(trnAfter, ast, "service", updatingObj);

					// update erf
					updateErf(trnAfter, ast, {
						...updatingObj,
						astData: {
							...ast.trnObject.astData,
							astState: "service",
						},
					});
				})
			);
		}

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "audit"
		) {
			console.log(`trns ${trnType} update`);
			// TODO: update to include installation trnType as as a condition
			// trn has transitioned state
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// Step 2. update all asts in the trn document to the the 'service' state as they fall in that state after valid submsion of audit trn
			// - next trnState is 'submited
			// - next state of eash ast is 'service'
			updateTrnWithNextState(trnAfter, "submited", "service");

			// Whenever a new ast is created, two actions must happen:
			// 1. The erf that the ast belongs to must be updated with the astData. This will be done by inserting astData object into erf metaData.asts array property.
			// 2. The audit trn object that created the ast must be nserted into metaData.trns property of the erf.

			// iterate through astsInTrn, create new asts and update each to a 'field' state.
			astsInTrn &&
				astsInTrn.forEach(ast => {
					// console.log(`ast (957)`, ast);
					// get updating object
					const updatingObj = getUpdatingObj(trnAfter, ast);
					// console.log(`updatingObj (960)`, updatingObj);

					// create new ast
					createNewAst(trnAfter, ast, "service", updatingObj);

					// update erf
					updateErf(trnAfter, ast, {
						...updatingObj,
						astData: ast.trnObject.astData,
					});
				});
		}

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			(trnType === "inspection" || trnType === "tid")
		) {
			console.log(`trns ${trnType} update`);
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// Step 2. update all asts in the trn document to the the 'service' state as they fall in that state after valid submsion of inspection or tid trn
			// - next trnState is 'submited
			// - next state of eash ast is 'service'
			updateTrnWithNextState(trnAfter, "submited", "service");

			// iterate through astsInTrn, on each ast id, update ast to a 'field' state.
			return (
				astsInTrn &&
				astsInTrn.forEach(ast => {
					// console.log(`ast`, ast);

					// get updating object
					const updatingObj = getUpdatingObj(trnAfter, ast);
					// console.log(`updatingObj`, updatingObj);

					// update ast
					updateAst(trnAfter, ast, "service", updatingObj);

					// update erf
					updateErf(trnAfter, ast, {
						...updatingObj,
						astData: ast.trnObject.astData,
					});
				})
			);
		}

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "disconnection"
		) {
			console.log(`trns ${trnType} update`);
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// Step 2.
			// - next trnState is 'submited
			// - next state of each ast in trn is 'disconnected'
			updateTrnWithNextState(trnAfter, "submited", "disconnected");

			// iterate through astsInTrn, on each ast id, update ast to a 'field' state.
			return (
				astsInTrn &&
				astsInTrn.forEach(ast => {
					// console.log(`ast`, ast);

					// get updating object
					const updatingObj = getUpdatingObj(trnAfter, ast);
					// console.log(`updatingObj [line 1033]`, updatingObj);

					// update ast
					updateAst(trnAfter, ast, "disconnected", updatingObj);

					// update erf
					updateErf(trnAfter, ast, {
						...updatingObj,
						astData: {
							...ast.trnObject.astData,
							astState: "disconnected",
						},
					});
				})
			);
		}

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "reconnection"
		) {
			console.log(`trns ${trnType} update`);
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// Step 2.
			// - next trnState is 'submited
			// - next state of each ast in trn is 'service'
			updateTrnWithNextState(trnAfter, "submited", "service");

			// iterate through astsInTrn, on each ast id, update ast to a 'field' state.
			return (
				astsInTrn &&
				astsInTrn.forEach(ast => {
					// console.log(`ast`, ast);

					// get updating object
					const updatingObj = getUpdatingObj(trnAfter, ast);
					// console.log(`updatingObj`, updatingObj);

					// update ast
					updateAst(trnAfter, ast, "service", updatingObj);

					// update erf
					updateErf(trnAfter, ast, {
						...updatingObj,
						astData: {
							...ast.trnObject.astData,
							astState: "service",
						},
					});
				})
			);
		}

		// if (
		// 	// previousTrnState === "draft" &&
		// 	currentTrnState === "valid" &&
		// 	trnType === "tid"
		// ) {
		// 	console.log(`trns ${trnType} update`);
		// 	// 1. Send notifications to all who should receive notificatons on the state transition of trn

		// 	// Step 2. update all asts in the trn document to the the 'service' state as they fall in that state after valid submsion of inspection trn
		// 	// - next trnState is 'submited
		// 	// - next state of eash ast is 'service'
		// 	updateTrnWithNextState(trnAfter, "submited", "service");

		// 	// iterate through astsInTrn, on each ast id, update ast to a 'field' state.
		// 	return (
		// 		astsInTrn &&
		// 		astsInTrn.forEach(ast => {
		// 			// console.log(`ast`, ast);

		// 			// get updating object
		// 			const updatingObj = getUpdatingObj(trnAfter, ast);
		// 			console.log(`updatingObj`, updatingObj);

		// 			// update ast
		// 			updateAst(trnAfter, ast, "service", updatingObj);

		// 			// update erf
		// 			updateErf(trnAfter, ast, {
		// 				...updatingObj,
		// 				astData: ast.trnObject.astData,
		// 			});
		// 		})
		// 	);
		// }

		if (
			// previousTrnState === "draft" &&
			currentTrnState === "valid" &&
			trnType === "vending"
		) {
			console.log(`trns update happened : ${trnType}`);
		}

		return "update done succesfully";
	});

exports.createAst = functions.firestore
	.document("asts/{astId}")
	.onCreate(async (snap, context) => {
		// console.log(`snap (1145)`, snap);
		// console.log(`context (1146)`, context);

		// get email adr of the user in context

		// get reference to the snap (ast). THis will be used ot update astktcOne and ast.ktcTwo later
		const astRef = snap.ref;
		// console.log(`astRef (1152)`, astRef);

		// get meterNo fom snap
		const newAstData = snap.data();
		// console.log(`newAstData (1156)`, newAstData);

		const { astNo } = newAstData.astData;
		// console.log(`astNo (1159)`, astNo);

		// get tidKtcTokens record matching the meterNo. This will give the needed ktc tokens
		const colRef = admin
			.firestore()
			.collection("tidKtcTokens")
			.where("meterNo", "==", astNo);
		// console.log(`colRef (1163)`, colRef);

		colRef
			.get()
			.then(async querySnapshot => {
				// qurySnapshot will give the required ktcTokens
				// console.log(`querySnapshot (1172)`, querySnapshot);

				let ktcTokenData = [];
				querySnapshot.forEach(doc => {
					// doc.data() is never undefined for query doc snapshots
					// console.log(`doc data`, doc.id, " => ", doc.data());
					ktcTokenData.push({
						...doc.data(),
						id: doc.id,
						docRef: doc.ref,
					});
				});

				// get data from the querySnapshot. This will include ktcOne and ktcTwo
				const tidKtcTokensData = ktcTokenData[0];
				console.log(`tidKtcTokensData (1186)`, tidKtcTokensData);
				const { kctTokenOne, kctTokenTwo, docRef } = tidKtcTokensData;

				// write ktcOne and ktcTwo to the ast on the snap above using astRef
				const astDoc = await astRef.update({
					"astData.meterTokens.ktcOne": kctTokenOne,
					"astData.meterTokens.ktcTwo": kctTokenTwo,
					"metaData.updatedAtDatetime": Timestamp.now(),
					"metaData.updatedByUser": "admin",
				});
				console.log(`astDoc (1183)`, astDoc);

				// update colRef with 'done' and 'updated by'
				const updatedDoc = await docRef.update({
					tidRolloverDone: "yes",
					"metaData.updatedAtDatetime": Timestamp.now(),
					"metaData.updatedByUser": "admin",
				});
				console.log(`updatedPoDoc (1192)`, updatedDoc);
			})
			.catch(err => {
				console.log("Error getting documents:", err);
			});
	});
