import { fsAstData } from "./fsAstData";
import { fsTrnData } from "./fsTrnData";
import { fsValidationData } from "./fsValidationData";

import MeterCommissioningJsx from "./jsx/meter/MeterCommissioningJsx";
import MeterDisconnectionJsx from "./jsx/meter/MeterDisconnectionJsx";
import MeterReconnectionJsx from "./jsx/meter/MeterReconnectionJsx";
import MeterVendingJsx from "./jsx/meter/MeterVendingJsx";

import MeterInstallationJsx from "./jsx/meter/MeterInstallationJsx";
import MeterAuditJsx from "./jsx/meter/MeterAuditJsx";

import CbInstallationJsx from "./jsx/cb/CbInstallationJsx";
import CbCommissioningJsx from "./jsx/cb/CbCommissioningJsx";
import CbAuditJsx from "./jsx/cb/CbAuditJsx";

import SealInstallationJsx from "./jsx/seal/SealInstallationJsx";
import SealCommissioningJsx from "./jsx/seal/SealCommissioningJsx";
import SealAuditJsx from "./jsx/seal/SealAuditJsx";

import BoxInstallationJsx from "./jsx/box/BoxInstallationJsx";
import BoxCommissioningJsx from "./jsx/box/BoxCommissioningJsx";
import BoxAuditJsx from "./jsx/box/BoxAuditJsx";

import PoleInstallationJsx from "./jsx/pole/PoleInstallationJsx";
import PoleCommissioningJsx from "./jsx/pole/PoleCommissioningJsx";
import PoleAuditJsx from "./jsx/pole/PoleAuditJsx";
import SealInspectionJsx from "./jsx/seal/SealInspectionJsx";
import CbInspectionJsx from "./jsx/cb/CbInspectionJsx";
import MeterInspectionJsx from "./jsx/meter/MeterInspectionJsx";
import BoxInspectionJsx from "./jsx/box/BoxInspectionJsx";
import PoleInspectionJsx from "./jsx/pole/PoleInspectionJsx";
// import FormikControl from "../formik/FormikControl";
import MeterTidJsx from "./jsx/meter/MeterTidJsx";


export const formSects = {
	meter: {
		installation: {
			trnData: fsTrnData.meter.installationData,
			trnValidationData: fsValidationData.meter.installationValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterInstallationJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		commissioning: {
			trnData: fsTrnData.meter.commissioningData,
			trnValidationData: fsValidationData.meter.commissioningValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterCommissioningJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		audit: {
			astData: fsAstData.meter.astData, //po or stores data
			trnData: fsTrnData.meter.auditData,
			trnValidationData: fsValidationData.meter.auditValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterAuditJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},

		inspection: {
			astData: fsAstData.meter.astData,
			trnData: fsTrnData.meter.inspectionData,
			trnValidationData: fsValidationData.meter.inspectionValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterInspectionJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},

		disconnection: {
			astData: fsAstData.meter.astData,
			trnData: fsTrnData.meter.disconnectionData,
			trnValidationData: fsValidationData.meter.disconnectionValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterDisconnectionJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},

		reconnection: {
			astData: fsAstData.meter.astData,
			trnData: fsTrnData.meter.reconnectionData,
			trnValidationData: fsValidationData.meter.reconnectionValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterReconnectionJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},

		vending: {
			astData: fsAstData.meter.astData,
			trnData: fsTrnData.meter.vendingData,
			trnValidationData: fsValidationData.meter.vendingValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterVendingJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},

		tid: {
			trnData: fsTrnData.meter.tidData,
			trnValidationData: fsValidationData.meter.tidValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<MeterTidJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},
	},

	cb: {
		installation: {
			trnData: fsTrnData.cb.installationData,
			trnValidationData: fsValidationData.cb.installationValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<CbInstallationJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		commissioning: {
			trnData: fsTrnData.cb.commissioningData,
			trnValidationData: fsValidationData.cb.commissioningValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<CbCommissioningJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		audit: {
			astData: fsAstData.cb.astData, //po or stores data
			trnData: fsTrnData.cb.auditData,
			trnValidationData: fsValidationData.cb.auditValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<CbAuditJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},

		inspection: {
			astData: fsAstData.cb.astData,
			trnData: fsTrnData.cb.inspectionData,
			trnValidationData: fsValidationData.cb.inspectionValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<CbInspectionJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},
	},

	seal: {
		installation: {
			trnData: fsTrnData.seal.installationData,
			trnValidationData: fsValidationData.seal.installationValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<SealInstallationJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		commissioning: {
			trnData: fsTrnData.seal.commissioningData,
			trnValidationData: fsValidationData.seal.commissioningValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<SealCommissioningJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		audit: {
			astData: fsAstData.seal.astData,
			trnData: fsTrnData.seal.auditData,
			trnValidationData: fsValidationData.seal.auditValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<SealAuditJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},

		inspection: {
			astData: fsAstData.seal.astData,
			trnData: fsTrnData.seal.inspectionData,
			trnValidationData: fsValidationData.seal.inspectionValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<SealInspectionJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},
	},

	box: {
		installation: {
			trnData: fsTrnData.box.installationData,
			trnValidationData: fsValidationData.box.installationValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<BoxInstallationJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		commissioning: {
			trnData: fsTrnData.box.commissioningData,
			trnValidationData: fsValidationData.box.commissioningValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<BoxCommissioningJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		audit: {
			astData: fsAstData.box.astData, //po or stores data
			trnData: fsTrnData.box.auditData,
			trnValidationData: fsValidationData.box.auditValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<BoxAuditJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},

		inspection: {
			astData: fsAstData.box.astData,
			trnData: fsTrnData.box.inspectionData,
			trnValidationData: fsValidationData.box.inspectionValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<BoxInspectionJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},
	},

	pole: {
		installation: {
			trnData: fsTrnData.pole.installationData,
			trnValidationData: fsValidationData.pole.installationValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<PoleInstallationJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		commissioning: {
			trnData: fsTrnData.pole.commissioningData,
			trnValidationData: fsValidationData.pole.commissioningValidationtionData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<PoleCommissioningJsx
						trn={trn}
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trnType={trnType}
					/>
				);
			},
		},

		audit: {
			astData: fsAstData.pole.astData, //po or stores data
			trnData: fsTrnData.pole.auditData,
			trnValidationData: fsValidationData.pole.auditValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<PoleAuditJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},

		inspection: {
			astData: fsAstData.pole.astData,
			trnData: fsTrnData.pole.inspectionData,
			trnValidationData: fsValidationData.pole.inspectionValidationData,
			jsx: (ast, trn, astCat, astCatIndex, trnType) => {
				return (
					<PoleInspectionJsx
						ast={ast}
						astCat={astCat}
						astCatIndex={astCatIndex}
						trn={trn}
						trnType={trnType}
					/>
				);
			},
		},
	},
};
