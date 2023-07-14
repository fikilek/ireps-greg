// TODO: migrate all cloud functions to use Firebase 9

const trnComObj = require("./trnComObj");

require("firebase-functions/logger/compat");

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
	// get id of the erf attached to the trn
	const erfId = trnAfter.erfData.id;
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
			console.log(`result of updatedErfDocWithAstsData `, result);
			return `result of updatedErfDocWithAstsData: ${result}`;
		});
};

const updateTrnWithNextState = (trnAfter, nextTrnState, nextAstsState) => {
	console.log(`trnAfter`, trnAfter);
	const updatedAstData = updateAstsInTrn(trnAfter, nextAstsState);
	console.log(`updatedAstData`, updatedAstData);
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
			// createdAtDatetime: db.Timestamp.fromDate(new Date()),
			createdAtDatetime: Timestamp.now(),
			createdByUser: "admin",
			updatedAtDatetime: Timestamp.now(),
			updatedByUser: "admin",
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
	const astDocRef = db.collection("asts").doc(ast.astId);

	// check if the ast docuement exist
	astDocRef.get().then(docSnapShot => {
		if (!docSnapShot.exists) {
			// ast doc does not exist, throw error
			console.log("No such document!");
		} else {
			// ast doc exist.
			console.log("Document data:", docSnapShot.data());
			const astDocData = docSnapShot.data();
			console.log(`astDocData`, astDocData);

			// get the current astState
			const { astState, astCartegory } = astDocData.astData;
			console.log(`astState`, astState);
			console.log(`astCartegory`, astCartegory);
			console.log(`nextState`, nextState);
			console.log(`trnAfter.metaData.trnType`, trnAfter.metaData.trnType);

			if (astCartegory === "meter" && astState === "disconnected" ) {
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
				astDocRef
					.update({
						"astData.astState": nextState,
						"metaData.updatedAtDatetime": Timestamp.now(),
						"metaData.updatedByUser": "admin",
						"metaData.trnCount": admin.firestore.FieldValue.arrayUnion(astUpdatedObj),
						erfData: trnAfter.erfData,
					})
					.then(updatedAstDoc => {
						console.log(`updatedAstDoc`, updatedAstDoc);
						return updatedAstDoc;
					});
			}
		}
	});
};

const createNewAst = (trnAfter, ast, nextState, astUpdatedObj) => {
	// get the ast from ast
	const { astData } = ast.trnObject;
	console.log(`astData`, astData);

	// create a new ast object
	const newAst = {
		metaData: {
			// createdAtDatetime: db.Timestamp.fromDate(new Date()),
			createdAtDatetime: Timestamp.now(),
			createdByUser: "admin",
			updatedAtDatetime: Timestamp.now(),
			updatedByUser: "admin",
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
		},
		erfData: trnAfter.erfData,
	};
	console.log(`newAst`, newAst);

	// add the new ast to the asts collection
	const astsRef = db.collection("asts");
	astsRef
		.add(newAst)
		.then(docRef => {
			console.log("Document added with ID: ", docRef.id);
			return `Document added with ID: ${docRef.id}`;
		})
		.catch(error => {
			console.error("Error adding document: ", error.msg);
			return "Error adding document: ", error.msg;
		});
};

const getUpdatingObj = (trnAfter, ast) => {
	// create object that will be used to update ast, erf and commissioning obj

	const trnType =
		trnAfter.metaData.trnType === "audit"
			? "installation"
			: trnAfter.metaData.trnType;

	// capitalise first letter of trnType
	const capTrnType = trnType.charAt(0).toUpperCase() + trnType.slice(1);

	return {
		id: ast.astId,
		[`${ast.astCat}${capTrnType}`]: ast.trnObject.trnData,
		trnMetaData: trnAfter.metaData,
	};
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
		console.log(`trnAfter 451`, trnAfter);

		if (!trnAfter.id) {
			// insert trn id into trn
			trnAfter = {
				...trnAfter,
				id: change.after.id,
			};
		}
		console.log(`trnAfter 460`, trnAfter);

		// Retrieve the current, previous states and trnType
		const currentTrnState = trnAfter.metaData.trnState;
		console.log(`currentTrnState`, currentTrnState);
		const previousTrnState = trnAfter.metaData.trnState;
		console.log(`previousTrnState`, previousTrnState);
		const trnType = change.after.data().metaData.trnType;
		// console.log(`trnType`, trnType);

		// get erfData from trnAfter
		// const { erfData } = trnAfter;

		// get id of the trn doc

		// 3. Update all the trnAfterrn asts that are on 'field' state. This will be done by iterating though each of the ids (trnAfter.astData[astCat][index].astData.id).
		const astsInTrn = getAstsInTrn(trnAfter);
		// console.log(`astsInTrn`, astsInTrn);
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
					// get updating object
					const updatingObj = getUpdatingObj(trnAfter, ast);

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
			trnType === "inspection"
		) {
			console.log(`trns ${trnType} update`);
			// 1. Send notifications to all who should receive notificatons on the state transition of trn

			// Step 2. update all asts in the trn document to the the 'service' state as they fall in that state after valid submsion of inspection trn
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
					console.log(`updatingObj`, updatingObj);

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
					console.log(`updatingObj`, updatingObj);

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
					console.log(`updatingObj`, updatingObj);

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
			trnType === "vending"
		) {
			console.log(`trns update happened : ${trnType}`);
		}

		return "update done succesfully";
	});
