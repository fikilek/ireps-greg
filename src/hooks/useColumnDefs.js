import moment from "moment";
import TableBtnTrnSelect from "../components/tableBtns/TableBtnTrnSelect";
import PoiBtn from "../components/tables/poi/PoiBtn";
import PoBtn from "../pages/sch/PoBtn";
import UserSignatureBtn from "../components/userSignature/UserSignatureBtn";
import { getPoStatus } from "../utils/utils";
import PoInvPopBtn from "../pages/sch/PoInvPopBtn";
import { memo, useState } from "react";
import FormEditBtn from "../components/forms/formComponents/formEditBtn/FormEditBtn";
import FormStatusBtn from "../components/forms/formComponents/formStatusBtn/FormStatusBtn";
import TableBoxDimensions from "../components/tableBtns/TableBoxDimensions";
// import TrnState from "../pages/trns/TrnState";
// import TrnHistory from "../pages/trns/TrnHistory";
// import TrnApprove from "../pages/trns/TrnApprove";
import TrnAstCheckoutFormBtn from "../components/forms/trnAstCheckoutForm/TrnAstCheckoutFormBtn";
import TableCellStyleAstState from "../components/table/TableCellStyleAstState";
import TrnDataFormBtn from "../components/forms/trnForms/trnDataForms/TrnDataFormBtn";
import TableTnsForAstBtn from "../components/table/tableBtns/TableTnsForAstBtn";
import TableAstsInErfBtn from "../components/table/tableBtns/TableAstsInErfBtn";
// import TableTrnsInErfBtn from "../components/table/tableBtns/TableTrnsInErfBtn";
import TableTrnsForAstsTooltip from "../components/table/TableTrnsForAstsTooltip";
import AstMediaBtn from "../components/astMedia/AstMediaBtn";
import TableCellStyleAstStateMap from "../components/table/TableCellStyleAstStateMap";
import TableAstsTrnsErfBtn from "../components/table/tableBtns/TableAstsTrnsErfBtn";
import { Timestamp } from "firebase/firestore";
import UserRoleCheckboxes from "../pages/unps/UserRoleCheckboxes";
import UserProfileBtn from "../pages/unps/UserProfileBtn";

export const useColumnDefs = props => {
	// console.log(`props`, props);
	const { ml1, ml2, ml3 } = props;

	// START: erfs table fields
	// -----------------------------

	// erfs
	const tidKtcTokensTableFields = [
		{
			field: "metaData.createdByUser",
			headerName: "Created By",
			width: 130,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "metaData.createdAtDatetime",
			headerName: "Date Created",
			width: 180,
			cellRenderer: params => {
				// console.log(`params`, params);
				// create a firestore Timestamp
				const timestamp = new Timestamp(
					params.value.seconds,
					params.value.nanoseconds
				);
				// console.log(`timestamp`, timestamp);
				return <p>{moment(timestamp.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>;
			},
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "meterNo",
			headerName: "Meter No",
			width: 130,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "kctTokenOne",
			headerName: "Ktc Token One",
			width: 220,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "kctTokenTwo",
			headerName: "Ktc Token Two",
			width: 220,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// START: erfs table fields
	// -----------------------------

	// erfs
	const erfsTableFields = [
		{
			field: "id",
			headerName: "System Id",
			width: 200,
			hide: false,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Created",
			children: [
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "closed",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						// console.log(`params.value`, params.value);

						// create a firestore Timestamp
						const timestamp = new Timestamp(
							params.value.seconds,
							params.value.nanoseconds
						);

						// console.log(`timestamp`, timestamp);
						return <p>{moment(timestamp.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>;
					},
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "edit",
			headerName: "Edit",
			width: 80,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "erfsForm",
				disabled: false,
				hideHeader: false,
				breakpoint: "xs",
			},
			floatingFilter: false,
		},
		{
			field: "erfNo",
			headerName: "Erf",
			width: 130,
			checkboxSelection: true,
			headerCheckboxSelection: true,
			headerCheckboxSelectionFilteredOnly: true,
			// cellRenderer: memo(ErfBtn),
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Property Type",
			children: [
				{
					field: "propertyType.type",
					headerName: "Type",
					width: 150,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "propertyType.unitName",
					headerName: "Unit Name",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "propertyType.unitNo",
					headerName: "Unit No",
					width: 100,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "erfStatus",
			headerName: "Status",
			width: 150,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "asts.length",
			headerName: "Asts",
			width: 130,
			filterParams: {
				valueGetter: params => {
					console.log(`params.data`, params.data);
					console.log(`params.data.asts.length`, params.data.asts.length);
					const erfAsts = params.data.asts.length;
					return erfAsts;
				},
			},
			tooltipField: "asts",
			tooltipComponent: TableTrnsForAstsTooltip,
			cellRenderer: memo(TableAstsInErfBtn),
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		// {
		// 	field: "trns",
		// 	headerName: "Trns in Erf",
		// 	width: 150,
		// 	// cellRenderer: params => params.data?.asts?.length,
		// 	cellRenderer: memo(TableTrnsInErfBtn),
		// },
		{
			headerName: "GPS",
			children: [
				{
					field: "address.gps.latitude",
					// columnGroupShow: "closed",
					headerName: "Latitude",
					width: 170,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.gps.longitude",
					// columnGroupShow: "closed",
					headerName: "Longitude",
					width: 170,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},

		{
			field: "address.systemAdr",
			headerName: "Street",
			width: 300,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			// A click displays a modal that shows the Purchase Order
			field: "standUse",
			headerName: "Stand Use", //[business, residentail-suburb, residential-township, church, government, school]
			width: 160,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Customer Address",
			children: [
				{
					field: "address.country",
					headerName: "Country",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.province",
					headerName: "Province",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.dm",
					headerName: "DM",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.lmMetro",
					headerName: "LM or Metro",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.town",
					headerName: "Towm",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.ward",
					headerName: "Ward",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.suburbTownship",
					headerName: "Suburb/Township",
					width: 170,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.street",
					headerName: "Street",
					width: 170,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.irepsAreaName",
					headerName: "Area Name",
					width: 170,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Customer Warm Body",
			children: [
				{
					field: "customer.warmBody.surname",
					// columnGroupShow: "closed",
					headerName: "Surname",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.warmBody.name",
					// columnGroupShow: "closed",
					headerName: "Name",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.warmBody.idNo",
					columnGroupShow: "open",
					headerName: "Id No",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.warmBody.gender",
					columnGroupShow: "open",
					headerName: "Gender",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Customer Juristic Person",
			children: [
				{
					field: "customer.juristicPerson.name",
					// columnGroupShow: "closed",
					headerName: "Name",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.juristicPerson.tradingName",
					columnGroupShow: "open",
					headerName: "Trading Name",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.juristicPerson.registeredName",
					columnGroupShow: "open",
					headerName: "Registered Name",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.juristicPerson.registeredNo",
					columnGroupShow: "open",
					headerName: "Registered No",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Customer Contact Person",
			children: [
				{
					field: "customer.contactPerson.surname",
					// columnGroupShow: "closed",
					headerName: "Surname",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.contactPerson.name",
					// columnGroupShow: "closed",
					headerName: "Name",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.contactPerson.landLine",
					columnGroupShow: "open",
					headerName: "Land Line",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.contactPerson.emailAdr",
					columnGroupShow: "open",
					headerName: "Email Adr",
					width: 150,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.contactPerson.whatsApp",
					columnGroupShow: "open",
					headerName: "WhatssApp No",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.contactPerson.cellNo",
					// columnGroupShow: "closed",
					headerName: "Cell No",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Billing",
			children: [
				{
					field: "billing.accountNo.length",
					columnGroupShow: "open",
					headerName: "Account No",
					width: 150,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "billing.indigent",
					columnGroupShow: "open",
					headerName: "Indigent",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "billing.tariff",
					columnGroupShow: "open",
					headerName: "Tariff",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// erfs uploads
	const erfsUploadTableFields = [
		{
			headerName: "Created",
			children: [
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "closed",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						// console.log(`params.value`, params.value);

						// create a firestore Timestamp
						const timestamp = new Timestamp(
							params.value.seconds,
							params.value.nanoseconds
						);

						// console.log(`timestamp`, timestamp);
						return <p>{moment(timestamp.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>;
					},
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						// console.log(`params.value`, params.value);

						// create a firestore Timestamp
						const timestamp = new Timestamp(
							params.value.seconds,
							params.value.nanoseconds
						);

						// console.log(`timestamp`, timestamp);
						return <p>{moment(timestamp.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>;
					},
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "erfNo",
			headerName: "Erf No",
			width: 110,
			// checkboxSelection: true,
			// headerCheckboxSelection: true,
			// headerCheckboxSelectionFilteredOnly: true,
			// cellRenderer: memo(ErfBtn),
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "erfStatus",
			headerName: "Status",
			width: 150,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "GPS",
			children: [
				{
					field: "address.gps.latitude",
					// columnGroupShow: "closed",
					headerName: "Latitude",
					width: 170,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.gps.longitude",
					// columnGroupShow: "closed",
					headerName: "Longitude",
					width: 170,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			// A click displays a modal that shows the Purchase Order
			field: "standUse",
			headerName: "Stand Use", //[business, residentail-suburb, residential-township, church, government, school]
			width: 160,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Customer Address",
			children: [
				{
					field: "address.country",
					headerName: "Country",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.province",
					headerName: "Province",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.dm",
					headerName: "DM",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.lmMetro",
					headerName: "LM or Metro",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.town",
					headerName: "Towm",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.ward",
					headerName: "Ward",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.suburbTownship",
					headerName: "Suburb/Township",
					width: 170,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "address.street",
					headerName: "Street",
					width: 170,
					cellRendererParams: {
						breakpoint: "sm",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "sm",
			},
		},
	];

	// asts in erf
	const astsInErfTableFields = [
		// TODO: get updated data from the trn that worked on the ast
		{
			field: "trnMetaData.updatedByUser",
			headerName: "Updated By",
			width: 130,
			flex: 1,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "trnMetaData.updatedAtDatetime",
			columnGroupShow: "open",
			headerName: "Updated At Datetime",
			width: 190,
			cellRenderer: params => {
				// console.log(`params`, params);
				return (
					<p>{moment(params?.value?.toDate())?.format("YYYY-MM-DD HH:mm:ss")}</p>
				);
			},
			flex: 1.3,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "astData.astCartegory",
			headerName: "Ast Cat",
			width: 150,
			flex: 0.8,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "astData.astNo",
			headerName: "Ast No",
			width: 150,
			cellRenderer: params => {
				// console.log(`params.data`, params.data)
				switch (params.data.astData.astCartegory) {
					case "meter":
						return params.data.astData.astNo;
					case "cb":
						return params.data.astData.cb.size;
					case "seal":
						return params.data.astData.astNo;
					case "box":
						return params.data.astData.astNo;
					case "pole":
						return params.data.astData.astNo;
					default:
						return null;
				}
			},
			flex: 1.1,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "trnMetaData.trnNo",
			headerName: "Trn No",
			width: 100,
			flex: 0.6,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "trnMetaData.trnType",
			headerName: "Trn Name",
			width: 150,
			flex: 0.7,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// asts in erf on map
	const astsInErfMapTableFields = [
		// TODO: get updated data from the trn that worked on the ast
		{
			field: "astData.astCartegory",
			headerName: "Ast Cat",
			width: 150,
			cellStyle: TableCellStyleAstStateMap,
			flex: 0.7,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "astData.astState",
			headerName: "Ast State",
			width: 150,
			flex: 0.8,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "astData.astNo",
			headerName: "Ast No",
			width: 150,
			cellRenderer: params => {
				// console.log(`params.data`, params.data)
				switch (params.data.astData.astCartegory) {
					case "meter":
						return params.data.astData.astNo;
					case "cb":
						return params.data.astData.cb.size;
					case "seal":
						return params.data.astData.astNo;
					case "box":
						return params.data.astData.astNo;
					case "pole":
						return params.data.astData.astNo;
					default:
						return null;
				}
			},
			flex: 1,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "",
			headerName: "New trn",
			width: 150,
			cellRenderer: TableBtnTrnSelect,
			flex: 0.9,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "trnMetaData.trnType",
			headerName: "Creater",
			width: 150,
			flex: 0.6,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// trns in erf on map
	const trnsInErfMapTableFields = [
		{
			field: "trnMetaData.updatedByUser",
			headerName: "Updated By",
			width: 130,
			flex: 0.55,
			// hide: true,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "trnMetaData.updatedAtDatetime",
			columnGroupShow: "open",
			headerName: "Updated At Datetime",
			width: 190,
			cellRenderer: params => {
				// console.log(`params`, params);
				return (
					<p>{moment(params?.value?.toDate())?.format("YYYY-MM-DD HH:mm:ss")}</p>
				);
			},
			flex: 0.85,
			// hide: true,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "astData.astCartegory",
			headerName: "Ast Cat",
			width: 150,
			flex: 0.6,
			cellStyle: TableCellStyleAstStateMap,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "astData.astNo",
			headerName: "Ast No",
			width: 150,
			cellRenderer: params => {
				// console.log(`params.data`, params.data)
				switch (params.data.astData.astCartegory) {
					case "meter":
						return params.data.astData.astNo;
					case "cb":
						return params.data.astData.cb.size;
					case "seal":
						return params.data.astData.astNo;
					case "box":
						return params.data.astData.astNo;
					case "pole":
						return params.data.astData.astNo;
					default:
						return null;
				}
			},
			flex: 0.9,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		// {
		// 	field: "trnMetaData.trnNo",
		// 	headerName: "Trn No",
		// 	width: 100,
		// 	flex: 0.6,
		// },
		{
			field: "trnMetaData.trnType",
			headerName: "Creater",
			width: 150,
			flex: 0.7,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// START: Supply chain
	// -----------------------

	// po (purchase orders)
	const poTableFields = [
		{
			field: "id",
			headerName: "System Id",
			width: 90,
			hide: true,
		},
		{
			headerName: "Created",
			children: [
				{
					field: "metaData.createdByUser",
					columnGroupShow: "closed",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
				},
				// 3
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			// A click displays a modal that shows the Purchase Order
			field: "poNo",
			headerName: "Po No",
			width: 120,
			cellRenderer: memo(PoBtn),
		},
		{
			// A click displays a modal that shows the Purchase Order
			field: "poStatus",
			headerName: "Status",
			width: 120,
			cellRenderer: params => {
				// console.log(`params`, params)
				return getPoStatus(params.data) || "Error";
			},
		},
		{
			field: "poApprove",
			headerName: "Approval",
			width: 120,
			cellRenderer: memo(UserSignatureBtn),
			cellRendererParams: { signatureName: "poApprove" },
			// tooltipField: "poApprove",
			// TODO: implement the PO aproval system
		},
		{
			headerName: "Supply Chain",
			children: [
				{
					// A click displays a modal of image(s) of the invoice(s) of the PO
					field: "",
					headerName: "Inv & Payment",
					width: 120,
					cellRenderer: memo(PoInvPopBtn),
				},
				{
					field: "poData.poTotalItems",
					headerName: "Total Items",
					width: 120,
					cellRenderer: memo(PoiBtn),
				},
			],
		},

		{
			field: "poGrvReceiver",
			headerName: "Receiver",
			width: 120,
			cellRenderer: UserSignatureBtn,
			cellRendererParams: { signatureName: "receiver" },
			// TODO: implement the PO aproval system
		},
		{
			field: "poGrvWitness",
			headerName: "Witness",
			width: 120,
			cellRenderer: UserSignatureBtn,
			cellRendererParams: { signatureName: "witness" },
			// TODO: implement the PO aproval system
		},
		{
			headerName: "Supplier",
			children: [
				{
					field: "poSplData.splName",
					columnGroupShow: "closed",
					headerName: "Supplier",
					width: 120,
				},
				{
					field: "poSplData.splContactSurname",
					columnGroupShow: "closed",
					headerName: "Surname",
					width: 110,
				},
				{
					field: "poSplData.splContactName",
					columnGroupShow: "closed",
					headerName: "Name",
					width: 110,
				},
				{
					field: "poSplData.splContactNo",
					columnGroupShow: "open",
					headerName: "Name",
					width: 140,
				},
				{
					field: "poSplData.splContactEmailAdr",
					columnGroupShow: "open",
					headerName: "Name",
					width: 210,
				},
			],
		},
	];

	// poi (purchase order items)
	const poiTableFields = [
		{
			field: "itemName",
			headerName: "Name",
			flex: 3,
		},
		{
			field: "itemCode",
			headerName: "Code",
			flex: 3,
		},
		{
			field: "itemQuantity",
			headerName: "Quantity",
			flex: 2,
		},
	];

	// suppier
	const splTableFields = [
		{
			field: "id",
			headerName: "Spl Id",
			width: 90,
			hide: true,
		},
		{
			headerName: "Created",
			children: [
				{
					field: "metaData.createdByUser",
					columnGroupShow: "closed",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			field: "",
			headerName: "Edit",
			width: 80,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "splForm",
			},
		},
		{
			// A click displays a modal that shows the existing Supplier data
			field: "splNo",
			headerName: "Spl No",
			width: 100,
			cellRenderer: params => {
				return <p>{`Spl-${params.value}`}</p>;
			},
		},
		{
			field: "splName",
			headerName: "Supplier Name",
			width: 150,
		},
		{
			field: "splAddress",
			headerName: "Address",
			width: 200,
		},
		{
			field: "status",
			headerName: "Status",
			width: 120,
			cellRenderer: params => {
				return params.data.status;
			},
		},
		{
			field: "splContactEmailAdr",
			headerName: "Email adr",
			width: 170,
		},
		{
			field: "splContactNo",
			headerName: "Contact No",
			width: 130,
		},
		{
			field: "splContactSurname",
			headerName: "Surname",
			width: 120,
		},
		{
			field: "splContactName",
			headerName: "Name",
			width: 120,
		},
	];

	// stores
	const storesTableFields = [
		{
			field: "id",
			headerName: "Id",
			width: 100,
			hide: true,
		},
		{
			headerName: "Created",
			children: [
				{
					field: "metaData.createdByUser",
					columnGroupShow: "closed",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			field: "",
			headerName: "Edit",
			width: 80,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "storesForm",
			},
		},
		{
			// A click displays a modal that shows the existing Supplier data
			field: "storesNo",
			headerName: "No",
			width: 90,
			cellRenderer: params => {
				// console.log(`params`, params)
				return <p>{`Store-${params.value}`}</p>;
			},
		},
		{
			field: "storesName",
			headerName: "Name",
			width: 120,
		},
		{
			field: "storesAddress",
			headerName: "Address",
			width: 200,
		},
		{
			field: "status",
			headerName: "Status",
			width: 120,
			// cellRenderer: memo(ChangeStatusBtn),
		},
		{
			field: "storesContactEmailAdr",
			headerName: "Email adr",
			width: 170,
		},
		{
			field: "storesContactNo",
			headerName: "Contact No",
			width: 130,
		},
		{
			field: "storesContactSurname",
			headerName: "Surname",
			width: 120,
		},
		{
			field: "storesContactName",
			headerName: "Name",
			width: 120,
		},
	];

	// START: Amin
	// -----------------------

	// users
	const usersTableFields = [
		{
			field: "uid",
			headerName: "users Id",
			width: 280,
			hide: true,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "metadata.creationtime",
			headerName: "Date Created",
			width: 180,
			cellRenderer: params => {
				// console.log(` params.data`, params?.data);
				// console.log(` params.metadata.creationtime`, params?.data?.metadata?.creationTime);
				const datetime = params?.data?.metadata?.creationTime;
				// return params.value
				return <p>{moment(datetime).format("YYYY-MM-DD HH:mm:ss")}</p>;
			},
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		// {
		// 	field: "metaData.updatedAtDatetime",
		// 	headerName: "Updated At Datetime",
		// 	width: 190,
		// 	cellRenderer: params => {
		// 		return <p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>;
		// 	},
		// },
		{
			field: "displayName",
			headerName: "display name",
			width: 170,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "disabled",
			headerName: "disabled",
			width: 100,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "userRole",
			headerName: "User Roles",
			width: 300,
			cellRenderer: UserRoleCheckboxes,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "email",
			headerName: "email adr",
			width: 200,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		// {
		// 	field: "online",
		// 	headerName: "online",
		// 	width: 100,
		// 	breakpoint: "xs",
		// },
		// {
		// 	field: "phoneNumber",
		// 	headerName: "phone number",
		// 	width: 150,
		// 	breakpoint: "xs",
		// },
		// {
		// 	field: "photoURL",
		// 	headerName: "photo",
		// 	width: 100,
		// 	breakpoint: "xs",
		// },
		// {
		// 	field: "userProfile",
		// 	headerName: "User Profile",
		// 	width: 150,
		// 	// cellRenderer: UserProfileBtn,
		// 	breakpoint: "xs",
		// },
	];

	// mobile devices
	const mobileDevicesTableFields = [
		{
			headerName: "Created",
			children: [
				{
					field: "+",
					columnGroupShow: "",
					headerName: "+",
					width: 50,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "+",
					columnGroupShow: "",
					headerName: "+",
					width: 50,
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			field: "edit",
			headerName: "Edit",
			width: 80,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "mobileDevicesForm",
			},
		},
		{
			field: "id",
			headerName: "Devices Id",
			width: 150,
			hide: true,
		},
		{
			field: "deviceNo",
			headerName: "Identiy",
			width: 120,
		},
		{
			field: "oem",
			headerName: "OEM",
			width: 130,
		},
		{
			field: "modelName",
			headerName: "Model Name",
			width: 130,
		},
		{
			field: "modelCode",
			headerName: "Model Code",
			width: 140,
		},
		{
			field: "serialNumber",
			headerName: "Serial Number",
			width: 140,
		},
		{
			field: "IEMI",
			headerName: "IEMI",
			width: 140,
		},
		{
			field: "macNumber",
			headerName: "Mac No",
			width: 140,
		},
		// {
		// 	field: "memory",
		// 	headerName: "Memory",
		// 	width: 110,
		// },
		{
			field: "status",
			headerName: "Status",
			width: 140,
			cellRenderer: memo(FormStatusBtn),
			cellRendererParams: {
				tn: "mobile-devices",
				options: [
					{ key: "active", value: "active" },
					{ key: "deleted", value: "deleted" },
					{ key: "suspended", value: "suspended" },
					{ key: "repairs", value: "repairs" },
					{ key: "missing", value: "missing" },
				],
			},
		},
		// { field: "delete", headerName: "Delete", width: 100 },
	];

	// simcards (system table)
	const simcardsTableFields = [
		{
			headerName: "Created",
			children: [
				{
					field: "+",
					columnGroupShow: "",
					headerName: "+",
					width: 50,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "+",
					columnGroupShow: "",
					headerName: "+",
					width: 50,
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			field: "edit",
			headerName: "Edit",
			width: 80,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "simcardsForm",
			},
		},
		{
			field: "id",
			headerName: "Id",
			width: 150,
			hide: true,
		},
		{
			field: "cardNo",
			headerName: "Card No",
			width: 130,
		},
		{
			field: "simcardNumber",
			headerName: "simcardNumber - ICCID",
			width: 200,
		},
		{
			field: "simcardPhoneNumber",
			headerName: "Phone No",
			width: 150,
		},
		{
			field: "simcardType",
			headerName: "Simcard Type",
			width: 150,
		},
		{
			field: "networkOperator",
			headerName: "Network Operator",
			width: 170,
		},
		{
			field: "memory",
			headerName: "Memory",
			width: 140,
		},
		{
			field: "status",
			headerName: "Status",
			width: 140,
			cellRenderer: memo(FormStatusBtn),
			cellRendererParams: {
				tn: "mobile-devices",
				options: [
					{ key: "active", value: "active" },
					{ key: "deleted", value: "deleted" },
					{ key: "suspended", value: "suspended" },
					{ key: "missing", value: "missing" },
				],
			},
		},
	];

	// user roles (system table)
	const userRolesTableFields = [
		{
			field: "id",
			headerName: "User Roles Id",
			width: 150,
			hide: true,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Created",
			children: [
				{
					field: "metaData.createdByUser",
					columnGroupShow: "closed",
					headerName: "Created By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						console.log(`params`, params);
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "edit",
			headerName: "Edit",
			width: 100,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "userRolesForm",
				breakpoint: "xs",
			},
		},
		{
			field: "userRoleName",
			headerName: "Role Name",
			width: 150,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "userRoleCode",
			headerName: "Role Code",
			width: 150,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "userRoleDescription",
			headerName: "Role Description",
			width: 350,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		// { field: "delete", headerName: "Delete", width: 100 },
	];

	// ast states (system table)
	const astStatesTableFields = [
		{
			field: "id",
			headerName: "Ast States Id",
			width: 150,
			hide: true,
		},
		{
			headerName: "Created",
			children: [
				{
					field: "+",
					columnGroupShow: "",
					headerName: "+",
					width: 50,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "+",
					columnGroupShow: "",
					headerName: "+",
					width: 50,
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			field: "edit",
			headerName: "Edit",
			width: 100,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "astStatesForm",
			},
		},
		{
			field: "astStateName",
			headerName: "Ast State Name",
			width: 150,
		},
		{
			field: "astStateDescription",
			headerName: "Ast State Description",
			width: 350,
		},
		// { field: "delete", headerName: "Delete", width: 100 },
	];

	// trn states (system table)
	const trnStatesTableFields = [
		{
			field: "id",
			headerName: "Trn State Id",
			width: 150,
			hide: true,
		},
		{
			headerName: "Created",
			children: [
				{
					field: "+",
					columnGroupShow: "",
					headerName: "+",
					width: 50,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "+",
					columnGroupShow: "",
					headerName: "+",
					width: 50,
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			field: "edit",
			headerName: "Edit",
			width: 100,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "trnStatesForm",
			},
		},
		{
			field: "trnStateName",
			headerName: "Trn State Name",
			width: 150,
		},
		{
			field: "trnStateDescription",
			headerName: "Trn State Description",
			width: 350,
		},
		// { field: "delete", headerName: "Delete", width: 100 },
	];

	// ast categories (system table)
	const astCartegoriesTableFields = [
		{
			field: "id",
			headerName: "Ast Cartegories Id",
			width: 150,
			hide: true,
		},
		{
			headerName: "Created",
			children: [
				{
					field: "",
					columnGroupShow: "",
					headerName: "+",
					width: 50,
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "+",
					columnGroupShow: "",
					headerName: "+",
					width: 50,
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
				},
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
				},
			],
		},
		{
			field: "edit",
			headerName: "Edit",
			width: 100,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "astCartegoriesForm",
			},
		},
		{
			field: "astCartegoryName",
			headerName: "Ast Cartegory Name",
			width: 190,
		},
		{
			field: "astCartegoryDescription",
			headerName: "Ast Cartegory Description",
			width: 350,
		},
		// { field: "delete", headerName: "Delete", width: 100, hide: true },
	];

	// asts checkout (all asts in collection -left pannel of checkout form)
	const astCheckoutFields = [
		{
			field: "id",
			headerName: "id",
			width: 90,
			hide: true,
		},
		{
			field: "astStores",
			headerName: "stores",
			width: 100,
			flex: 0.8,
		},
		{
			field: "astData.astState",
			headerName: "Ast State",
			width: 100,
			flex: 1,
			cellStyle: TableCellStyleAstState,
		},
		{
			field: "astData.astCartegory",
			headerName: "Ast Cat",
			width: 100,
			flex: 1,
		},
		{
			field: "astData.astNo",
			headerName: `Asset No`,
			width: 140,
			filter: "agTextColumnFilter",
			filterParams: {
				// filterOptions: ["notBlank"],
				trimInput: true,
				closeOnApply: true,
				suppressAndOrCondition: true,
			},
			cellRenderer: params => {
				// console.log(`params.data`, params.data);
				switch (params.data.astData.astCartegory) {
					case "meter":
						return params.data.astData.astNo;
					case "cb":
						return params.data.astData.cb.size;
					case "seal":
						return params.data.astData.astNo;
					case "box":
						return params.data.astData.astNo;
					case "pole":
						return params.data.astData.astNo;
					default:
						return null;
				}
			},

			flex: 1,
		},
		{
			field: "Chck Out",
			headerName: `Chck Out`,
			width: 140,
			checkboxSelection: true,
			// headerCheckboxSelection: true,
			headerCheckboxSelectionFilteredOnly: true,
			flex: 1,
			cellStyle: params => {
				// console.log(`params.data.astData.astState`, params.data.astData.astState);
				const astState = params.data.astData.astState;
				return astState === "checked out" ||
					astState === "field" ||
					astState === "service"
					? { pointerEvents: "none", opacity: "0.4" }
					: { disabled: false };
			},
		},
	];

	// asts checkout (asts on the trn object -right pannel of checkout form)
	const astCheckinFields = [
		// {
		// 	field: "id",
		// 	headerName: "id",
		// 	width: 90,
		// 	hide: true,
		// },
		// {
		// 	field: "astStores",
		// 	headerName: "stores",
		// 	width: 100,
		// },
		{
			field: "astData.astCartegory",
			headerName: "Ast Cat",
			width: 100,
			flex: 1,
		},
		{
			field: "astData.astNo",
			headerName: `Asset No`,
			width: 130,
			cellRenderer: params => {
				// console.log(`params.data`, params.data);
				switch (params.data.astData.astCartegory) {
					case "meter":
						return params.data.astData.astNo;
					case "cb":
						return params.data.astData.cb.size;
					case "seal":
						return params.data.astData.astNo;
					case "box":
						return params.data.astData.astNo;
					case "pole":
						return params.data.astData.astNo;
					default:
						return null;
				}
			},

			flex: 1.5,
		},
		{
			field: "",
			headerName: `Chck In`,
			width: 110,
			checkboxSelection: true,
			// headerCheckboxSelection: true,
			headerCheckboxSelectionFilteredOnly: true,
			flex: 1,
			cellStyle: params => {
				// console.log(`params.data.astData.astState`, params.data.astData.astState);
				const astState = params.data.astData.astState;
				// console.log(`astState`, astState);
				return astState === "field" || astState === "service"
					? { pointerEvents: "none", opacity: "0.4" }
					: { disabled: false };
			},
		},
	];

	// asts
	const astTableFieldsLeft = [
		{
			field: "id",
			headerName: "Ast Id",
			width: 100,
			hide: false,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Created",
			children: [
				{
					field: "metaData.createdByUser",
					columnGroupShow: "closed",
					headerName: "Created By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "edit",
			headerName: "Edit",
			width: 90,
			floatingFilter: false,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "astsForm",
				disabled: false,
				breakpoint: "xs",
			},
		},
		{
			field: "metaData.createdThrough",
			headerName: "Creator",
			width: 130,
			filter: "agTextColumnFilter",

			filterParams: {
				valueGetter: params => {
					const { createdThrough } = params.data.metaData;
					// console.log(`createdThrough`, createdThrough);
					return `${createdThrough.creator}${createdThrough.creatorNo}`;
				},
			},

			cellRenderer: params => {
				const { createdThrough } = params.data.metaData;
				return (
					<button className="table-row-btn table-row-btn-creator ">{`${createdThrough.creator} : ${createdThrough.creatorNo}`}</button>
				);
			},
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "metaData.trnCount",
			headerName: "Ast Trn(s)",
			width: 120,
			filterParams: {
				valueGetter: params => {
					const erfAsts = params.data.metaData.trnCount.length;
					return erfAsts;
				},
			},
			cellRenderer: memo(TableTnsForAstBtn), //These are all transactions that happen on an ast
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "newTrn",
			headerName: "New Trn",
			width: 170,
			cellRenderer: memo(TableBtnTrnSelect),
			cellRendererParams: {
				ml2,
				breakpoint: "xs",
			},
		},
		{
			headerName: "Asset Data",
			children: [
				{
					field: "astData.astNo",
					columnGroupShow: "closed",
					headerName: `Asset No`,
					width: 170,
					cellRenderer: AstMediaBtn,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "astData.astSerialNo",
					columnGroupShow: "open",
					headerName: "Ast Serial No",
					width: 140,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "astData.astCartegory",
					columnGroupShow: "closed",
					headerName: "Ast Cat",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "astData.astState",
					columnGroupShow: "closed",
					headerName: "Ast State",
					width: 130,
					cellStyle: TableCellStyleAstState,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// asts
	const astTableFieldsRight = [
		{
			headerName: "Erf/Gps",
			children: [
				{
					field: "erfData.erfNo",
					headerName: "Erf No",
					width: 130,
					columnGroupShow: "close",
					cellRenderer: TableAstsTrnsErfBtn,
					cellRendererParams: {
						breakpoint: "sm",
					},
				},
				{
					field: "erfData.gps.latitude",
					// columnGroupShow: "closed",
					headerName: "Latitude",
					width: 130,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.gps.longitude",
					// columnGroupShow: "closed",
					headerName: "Longitude",
					width: 130,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Property Type",
			children: [
				{
					field: "erfData.propertyType.type",
					headerName: "Type",
					width: 150,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.propertyType.unitName",
					headerName: "Unit Name",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.propertyType.unitNo",
					headerName: "Unit No",
					width: 100,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "erfStatus",
			headerName: "Status",
			width: 150,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Ast Location",
			children: [
				{
					field: "astData.astLocation.address",
					headerName: "Ast Address",
					width: 250,
					columnGroupShow: "close",
				},
				{
					field: "astData.astLocation.gps.lat",
					headerName: "Gps Lat",
					width: 150,
					columnGroupShow: "open",
				},
				{
					field: "astData.astLocation.gps.lng",
					headerName: "Gps Lng",
					width: 150,
					columnGroupShow: "open",
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Customer Address",
			children: [
				{
					field: "erfData.address.country",
					headerName: "Country",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.province",
					headerName: "Province",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.dm",
					headerName: "DM",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.lmMetro",
					headerName: "LM or Metro",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.town",
					headerName: "Towm",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.ward",
					headerName: "Ward",
					width: 120,
					columnGroupShow: "open",
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.suburbTownship",
					headerName: "Suburb/Township",
					width: 170,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.street",
					headerName: "Street",
					width: 170,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.irepsAreaName",
					headerName: "Area Name",
					width: 170,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// asts in erf (Tooltip Table fields)
	const astsInErfTooltipTableFields = [
		{
			field: "",
			headerName: "#",
			width: 100,
		},
		{
			field: "id",
			headerName: "Ast Id",
			width: 100,
			hide: true,
		},
		{
			field: "astData.astCartegory",
			headerName: "Ast Cat",
			width: 220,
		},
		{
			field: "astData.astNo",
			headerName: "Ast No",
			width: 220,
		},
	];

	// ast meter (ast specific columns)
	const astMeter = [
		{
			headerName: "Meters",
			children: [
				{
					field: "astData.meter.phase",
					headerName: "Phase",
					initialWidth: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "astData.meter.type",
					headerName: "Type",
					initialWidth: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				// { field: "astData.meter.code", headerName: "Code", initialWidth: 120 },
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// ast feeder (ast specific columns)
	const astFeeder = [
		{
			headerName: "feeders",
			children: [
				{ field: "astData.feeder.length", headerName: "feeder", initialWidth: 120 },
				{ field: "astData.feeder.code", headerName: "Code", initialWidth: 120 },
			],
		},
	];

	// ast pole (ast specific columns)
	const astPole = [
		{
			headerName: "Poles",
			children: [
				{
					field: "astData.pole.type",
					headerName: "Type",
					initialWidth: 100,
					columnGroupShow: "open",
				}, // [metal, wood]
				{
					field: "astData.pole.length",
					headerName: "length",
					initialWidth: 90,
					columnGroupShow: "open",
				},
				{
					field: "astData.pole.hasLamp",
					headerName: "Lamp",
					initialWidth: 100,
				},
				{
					field: "astData.pole.condition",
					headerName: "Condition",
					initialWidth: 120,
				},
				{
					field: "astData.pole.code",
					headerName: "Code",
					initialWidth: 120,
					columnGroupShow: "open",
				},
			],
		},
	];

	// ast box (ast specific columns)
	const astBox = [
		{
			headerName: "Boxes",
			children: [
				{ field: "astData.box.type", headerName: "Type", initialWidth: 120 }, // [metal, fibreglass]
				{
					field: "astData.box.dimensions",
					headerName: "Dimensions",
					width: 160,
					cellRenderer: TableBoxDimensions,
				},
				{
					field: "astData.box.location",
					headerName: "Location",
					initialWidth: 120,
				}, // ['top of pole', 'bottpm of pole','stand alone', 'on the wall']
				{ field: "astData.box.code", headerName: "Code", initialWidth: 120 }, // [metal, fibreglass]
			],
		},
	];

	// ast cb (ast specific columns)
	const astCb = [
		{
			headerName: "Circuit Breakers",
			children: [
				{
					field: "astData.cb.size",
					headerName: "size",
					initialWidth: 90,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "astData.cb.code",
					headerName: "Code",
					initialWidth: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// ast seal (ast specific columns)
	const astSeal = [
		{
			headerName: "Seals",
			children: [
				{
					field: "astData.seal.no",
					headerName: "Seal No",
					initialWidth: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "astData.cb.code",
					headerName: "Code",
					initialWidth: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// ast vtct unit (ast specific columns)
	const astVtct = [
		{ field: "manufacture", headerName: "Manufacture", initialWidth: 120 },
	];

	// ast transformer (ast specific columns)
	const astTransformer = [
		{ field: "manufacture", headerName: "Manufacture", initialWidth: 120 },
	];

	// media
	const mediaFields = [
		{
			headerName: "Media",
			children: [
				{
					field: "photos",
					headerName: "Photos",
					width: 130,
					columnGroupShow: "closed",
					cellRenderer: p => (
						<button className="table-row-btn btn-mediaFields btn-mediaFields-photos">
							Photos
						</button>
					),
				},
				{
					field: "photos",
					headerName: "Photos",
					width: 130,
					columnGroupShow: "open",
					cellRenderer: p => (
						<button className="table-row-btn btn-mediaFields btn-mediaFields-photos">
							Photos
						</button>
					),
				},
				{
					field: "videos",
					headerName: "Videos",
					width: 130,
					columnGroupShow: "open",
					cellRenderer: p => (
						<button className="table-row-btn btn-mediaFields btn-mediaFields-videos">
							Videos
						</button>
					),
				},
				{
					field: "voice",
					headerName: "Voice",
					width: 130,
					columnGroupShow: "open",
					cellRenderer: p => (
						<button className="table-row-btn btn-mediaFields btn-mediaFields-voice">
							Voice
						</button>
					),
				},
			],
		},
	];

	// trns (trns created form Erfs table fields - new trn(s) review table)
	const trnsFromErfsTableFields = [
		{
			field: "erfData.erfNo",
			headerName: "Erf No",
			width: 130,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Address",
			children: [
				{
					field: "erfData.address.lmMetro",
					// columnGroupShow: "closed",
					headerName: "Municipality",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.town",
					// columnGroupShow: "closed",
					headerName: "Town",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.ward",
					// columnGroupShow: "closed",
					headerName: "Ward No",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.suburbTownship",
					// columnGroupShow: "closed",
					headerName: "Suburb/Tship",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.street",
					// columnGroupShow: "closed",
					headerName: "Street",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
		},
		{
			headerName: "Biling",
			children: [
				{
					field: "erfData.billing.indigent",
					// columnGroupShow: "closed",
					headerName: "Indigent",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.billing.tariff",
					// columnGroupShow: "closed",
					headerName: "Tariff",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
		},
	];

	// trns
	const trnsTableFields = [
		{
			field: "id",
			headerName: "Trn Id",
			width: 220,
			hide: false,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "metaData.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				// 3
				{
					field: "metaData.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "Created",
			children: [
				{
					field: "metaData.createdByUser",
					columnGroupShow: "closed",
					headerName: "Created By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "metaData.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "metaData.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						return (
							<p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
						);
					},
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "metaData.trnNo",
			headerName: "Trn No",
			width: 150,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		// {
		// 	field: "edit",
		// 	headerName: "Edit",
		// 	width: 80,
		// 	cellRenderer: memo(FormEditBtn),
		// 	cellRendererParams: {
		// 		fn: "trnForm",
		// 		disabled: false,
		// 	},
		// },
		{
			field: "metaData.trnState",
			headerName: "Trn State",
			width: 150,
			cellRendererParams: {
				breakpoint: "xs",
			},
			// cellRenderer: memo(TrnState),
		},
		// {
		// 	field: "metaData.trnHistory",
		// 	headerName: "Trn History",
		// 	width: 130,
		// 	cellRenderer: memo(TrnHistory),
		// },
		// {
		// 	field: "metaData.trnAprrove",
		// 	headerName: "Approve?",
		// 	width: 130,
		// 	cellRenderer: memo(TrnApprove),
		// },

		// trn -  transaction data (different for all trns)

		{
			field: "astData",
			headerName: "Asset Checkout/in",
			width: 260,
			cellRenderer: memo(TrnAstCheckoutFormBtn),
			cellRendererParams: {
				breakpoint: "xs",
			},
		},

		// trn - Eddit transaction Assets

		{
			field: "astData",
			headerName: "Trn Type",
			width: 170,
			cellRenderer: memo(TrnDataFormBtn),
			filterParams: {
				valueGetter: params => {
					const { trnType } = params.data.metaData;
					// console.log(`trnType`, trnType);
					return trnType;
				},
			},
			cellRendererParams: {
				breakpoint: "xs",
			},
		},

		// ...mediaFields,

		// erfs

		{
			headerName: "Erf",
			children: [
				{
					field: "erfData.erfNo",
					headerName: "Erf No",
					width: 130,
					cellRenderer: TableAstsTrnsErfBtn,
					// cellRenderer: params => {
					// 	console.log(`params`, params)
					// 	return <button className="table-row-btn">{params.value}</button>;
					// },
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.propertyType.type",
					// columnGroupShow: "closed",
					headerName: "Property Type",
					width: 150,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.propertyType.unitName",
					// columnGroupShow: "closed",
					headerName: "Unit Name",
					width: 150,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.propertyType.unitNo",
					// columnGroupShow: "closed",
					headerName: "Unit No",
					width: 150,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: " erf Address",
			children: [
				{
					field: "erfData.address.lmMetro",
					// columnGroupShow: "closed",
					headerName: "Municipality",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.town",
					// columnGroupShow: "closed",
					headerName: "Town",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.ward",
					// columnGroupShow: "closed",
					headerName: "Ward No",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.suburbTownship",
					// columnGroupShow: "closed",
					headerName: "Suburb/Tship",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.street",
					// columnGroupShow: "closed",
					headerName: "Street",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.address.irepsAreaName",
					// columnGroupShow: "closed",
					headerName: "Area Name",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			headerName: "erf Biling",
			children: [
				{
					field: "erfData.billing.indigent",
					// columnGroupShow: "closed",
					headerName: "Indigent",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "erfData.billing.tariff",
					// columnGroupShow: "closed",
					headerName: "Tariff",
					width: 130,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
			],
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// trns (al trns of an ast)
	const trnsForAstTableFields = [
		{
			field: "trnMetaData.updatedByUser",
			headerName: "Updated By",
			width: 130,
			flex: 1,
			hide: true,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		// 3
		{
			field: "trnMetaData.updatedAtDatetime",
			columnGroupShow: "open",
			headerName: "Updated At Datetime",
			width: 190,
			sortable: true,
			sortingOrder: ["desc"],
			cellRenderer: params => {
				// console.log(`params`, params.value)
				return (
					<p>{moment(params?.value?.toDate())?.format("YYYY-MM-DD HH:mm:ss")}</p>
				);
			},
			flex: 1,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
		{
			field: "trnMetaData.trnType",
			headerName: "Trn Type",
			width: 170,
			flex: 1,
			cellRendererParams: {
				breakpoint: "xs",
			},
		},
	];

	// feeder
	const trnsFeederInstallationFields = [
		{
			headerName: "Feeder Installation",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.cb.size",
					headerName: "CB Size",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.gps",
					headerName: "GPS coordinates",
					width: 160,
				},
				{
					field: "trnData.meterInstallation.keyPad.photos.length",
					headerName: "Keypad Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.keyPad.serialNo",
					headerName: "Keypad Serial No",
					width: 170,
				},
				{
					field: "trnData.meterInstallation.location.box",
					headerName: "Located in Box?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.location.premises",
					headerName: "Premises?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.configuration",
					headerName: "SC Config",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.photos.length",
					headerName: "SC Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.type",
					headerName: "SC Type",
					width: 150,
				},
			],
		},
	];

	const trnsFeederCommissioningFields = [
		{
			headerName: "Feeder Commissioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsFeederDecommissioningFields = [
		{
			headerName: "Feeder Decommissioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsFeederInspectionFields = [
		{
			headerName: "Feeder Inspection",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsFeederReturnToSupplierFields = [
		{
			headerName: "Feeder Return To Supplier",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsFeederSaleFields = [
		{
			headerName: "Feeder Sale",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	// pole form fields
	const trnsPoleInstallationFields = [
		{
			headerName: "Pole Installation",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.cb.size",
					headerName: "CB Size",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.gps",
					headerName: "GPS coordinates",
					width: 160,
				},
				{
					field: "trnData.meterInstallation.keyPad.photos.length",
					headerName: "Keypad Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.keyPad.serialNo",
					headerName: "Keypad Serial No",
					width: 170,
				},
				{
					field: "trnData.meterInstallation.location.box",
					headerName: "Located in Box?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.location.premises",
					headerName: "Premises?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.configuration",
					headerName: "SC Config",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.photos.length",
					headerName: "SC Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.type",
					headerName: "SC Type",
					width: 150,
				},
			],
		},
	];

	const trnsPoleCommissioningFields = [
		{
			headerName: "Pole Comminssioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsPoleDecommissioningFields = [
		{
			headerName: "Pole Decommissioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsPoleInspectionFields = [
		{
			headerName: "Pole Inspection",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsPoleAuditFields = [
		{
			headerName: "Pole Audit",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsPoleReturnToSupplierFields = [
		{
			headerName: "Pole Return To Supplier",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsPoleSaleFields = [
		{
			headerName: "Pole Sale",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	const trnsPoleFoundFields = [
		{
			headerName: "Pole Found",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	const trnsPoleMissingFields = [
		{
			headerName: "Pole Missing",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	// box form fields
	const trnsBoxInstallationFields = [
		{
			headerName: "Box Installation",
			children: [
				{
					field: "trnData.boxInstallation.address",
					headerName: "Box Address",
					width: 150,
				},
				{
					field: "trnData.boxInstallation.photos.length",
					headerName: "Box Photos",
					width: 120,
				},
				{
					field: "trnData.boxInstallation.gps",
					headerName: "GPS coordinates",
					width: 160,
				},
				{
					field: "trnData.boxInstallation.location.position",
					headerName: "Located in Box?",
					width: 150,
				},
				{
					field: "trnData.boxInstallation.location.premises",
					headerName: "Premises?",
					width: 150,
				},
			],
		},
	];

	const trnsBoxCommissioningFields = [
		{
			headerName: "Box Comminssioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsBoxDecommissioningFields = [
		{
			headerName: "Box Decommissioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsBoxInspectionFields = [
		{
			headerName: "Box Inspection",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsBoxReturnToSupplierFields = [
		{
			headerName: "Box Return To Supplier",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsBoxSaleFields = [
		{
			headerName: "Box Sale",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	const trnsBoxMissingFields = [
		{
			headerName: "Box Missing",
			children: [
				{
					field: "trnData.boxMissing.noticedWhen",
					headerName: "Noticed When",
					width: 150,
				},
				{
					field: "trnData.boxMissing.noticedBy",
					headerName: "Noticed By",
					width: 150,
				},
			],
		},
	];

	const trnsBoxFoundFields = [
		{
			headerName: "Box Found",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	// meter forms fields
	const trnsMeterInstallationFields = [
		{
			headerName: "Meter Installation",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.cb.size",
					headerName: "CB Size",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.gps",
					headerName: "GPS coordinates",
					width: 160,
				},
				{
					field: "trnData.meterInstallation.keyPad.photos.length",
					headerName: "Keypad Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.keyPad.serialNo",
					headerName: "Keypad Serial No",
					width: 170,
				},
				{
					field: "trnData.meterInstallation.location.box",
					headerName: "Located in Box?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.location.premises",
					headerName: "Premises?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.configuration",
					headerName: "SC Config",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.photos.length",
					headerName: "SC Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.type",
					headerName: "SC Type",
					width: 150,
				},
			],
		},
	];

	const trnsMeterCommissioningFields = [
		{
			headerName: "Meter Comminssioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsMeterDecommissioningFields = [
		{
			headerName: "Meter Decommissioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsMeterInspectionFields = [
		{
			headerName: "Meter Inspection",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsMeterAuditFields = [
		{
			headerName: "Meter Audit",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsMeterMissingFields = [
		{
			headerName: "Meter Missing",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsMeterFoundFields = [
		{
			headerName: "Meter Found",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsMeterSaleFields = [
		{
			headerName: "Meter Sale",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	const trnsMeterReturnToSellerFields = [
		{
			headerName: "Meter Return To Seller",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	const trnsMeterReconnectionFields = [
		{
			headerName: "Meter Reconnection",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsMeterDisconnectionFields = [
		{
			headerName: "Meter Disconnection",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsMeterVendingFields = [
		{
			headerName: "Meter Vending",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	// cb form fields
	const trnsCbInstallationFields = [
		{
			headerName: "Cb Installation",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.cb.size",
					headerName: "CB Size",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.gps",
					headerName: "GPS coordinates",
					width: 160,
				},
				{
					field: "trnData.meterInstallation.keyPad.photos.length",
					headerName: "Keypad Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.keyPad.serialNo",
					headerName: "Keypad Serial No",
					width: 170,
				},
				{
					field: "trnData.meterInstallation.location.box",
					headerName: "Located in Box?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.location.premises",
					headerName: "Premises?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.configuration",
					headerName: "SC Config",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.photos.length",
					headerName: "SC Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.type",
					headerName: "SC Type",
					width: 150,
				},
			],
		},
	];

	const trnsCbCommissioningFields = [
		{
			headerName: "Cb Comminssioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsCbDecommissioningFields = [
		{
			headerName: "Cb Decommissioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsCbInspectionFields = [
		{
			headerName: "Cb Inspection",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsCbReturnToSellerFields = [
		{
			headerName: "Cb Return To Seller",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsCbSaleFields = [
		{
			headerName: "Cb Sale",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	const trnsCbMissingFields = [
		{
			headerName: "Cb Missing",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	const trnsCbFoundFields = [
		{
			headerName: "Cb Found",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	// seal form fields
	const trnsSealInstallationFields = [
		{
			headerName: "Seal Installation",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.cb.size",
					headerName: "CB Size",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.gps",
					headerName: "GPS coordinates",
					width: 160,
				},
				{
					field: "trnData.meterInstallation.keyPad.photos.length",
					headerName: "Keypad Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.keyPad.serialNo",
					headerName: "Keypad Serial No",
					width: 170,
				},
				{
					field: "trnData.meterInstallation.location.box",
					headerName: "Located in Box?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.location.premises",
					headerName: "Premises?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.configuration",
					headerName: "SC Config",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.photos.length",
					headerName: "SC Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.type",
					headerName: "SC Type",
					width: 150,
				},
			],
		},
	];

	const trnsSealCommissioningFields = [
		{
			headerName: "Seal Comminssioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsSealDecommissioningFields = [
		{
			headerName: "Seal Decommissioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsSealInspectionFields = [
		{
			headerName: "Seal Inspection",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsSealReturnToSupplierFields = [
		{
			headerName: "Seal Return To Seller",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsSealMissingFields = [
		{
			headerName: "Seal Missing",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsSealFoundFields = [
		{
			headerName: "Seal Found",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsSealSaleFields = [
		{
			headerName: "Seal Sale",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	// vtct form fields
	const trnsVtctInstallationFields = [
		{
			headerName: "Vtct Installation",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.cb.size",
					headerName: "CB Size",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.gps",
					headerName: "GPS coordinates",
					width: 160,
				},
				{
					field: "trnData.meterInstallation.keyPad.photos.length",
					headerName: "Keypad Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.keyPad.serialNo",
					headerName: "Keypad Serial No",
					width: 170,
				},
				{
					field: "trnData.meterInstallation.location.box",
					headerName: "Located in Box?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.location.premises",
					headerName: "Premises?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.configuration",
					headerName: "SC Config",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.photos.length",
					headerName: "SC Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.type",
					headerName: "SC Type",
					width: 150,
				},
			],
		},
	];

	const trnsVtctCommissioningFields = [
		{
			headerName: "Vtct Comminssioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsVtctDecommissioningFields = [
		{
			headerName: "Vtct Decommissioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsVtctInspectionFields = [
		{
			headerName: "Vtct Inspection",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsVtctReturnToSellerFields = [
		{
			headerName: "Vtct Return To Seller",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsVtctSaleFields = [
		{
			headerName: "Vtct Sale",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	// transformer form fields
	const trnsTransformerInstallationFields = [
		{
			headerName: "Transformer Installation",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.cb.size",
					headerName: "CB Size",
					width: 120,
				},
				{
					field: "trnData.meterInstallation.gps",
					headerName: "GPS coordinates",
					width: 160,
				},
				{
					field: "trnData.meterInstallation.keyPad.photos.length",
					headerName: "Keypad Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.keyPad.serialNo",
					headerName: "Keypad Serial No",
					width: 170,
				},
				{
					field: "trnData.meterInstallation.location.box",
					headerName: "Located in Box?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.location.premises",
					headerName: "Premises?",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.configuration",
					headerName: "SC Config",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.photos.length",
					headerName: "SC Photos",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.serviceConnection.type",
					headerName: "SC Type",
					width: 150,
				},
			],
		},
	];

	const trnsTransformerCommissioningFields = [
		{
			headerName: "Transformer Comminssioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsTransformerDecommissioningFields = [
		{
			headerName: "Transformer Decommissioning",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
				{
					field: "trnData.meterInstallation.cb.photos.length",
					headerName: "CB Photos",
					width: 120,
				},
			],
		},
	];

	const trnsTransformerInspectionFields = [
		{
			headerName: "Transformer Inspection",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsTransformerReturnToSellerFields = [
		{
			headerName: "Transformer Return To Seller",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Address",
					width: 150,
				},
			],
		},
	];

	const trnsTransformerSaleFields = [
		{
			headerName: "Transformer Sale",
			children: [
				{
					field: "trnData.meterInstallation.address",
					headerName: "Meter Sale",
					width: 150,
				},
			],
		},
	];

	/*
	Asts in Erf tooltip
	*/
	let fields = [];
	if (ml1 === "astsInErfTooltip") {
		fields = [...astsInErfTooltipTableFields];
		return { tableFields: fields };
	}

	/*
	Ast checkout / Checkout
	*/
	if (ml1 === "astCheckout") {
		fields = [...astCheckoutFields];
		return { tableFields: fields };
	}

	/*
	Ast checkout / Checkin
	*/
	if (ml1 === "astCheckin") {
		fields = [...astCheckinFields];
		return { tableFields: fields };
	}

	/*
	Trns from Erfs
	*/
	if (ml1 === "trnsFromErfs") {
		fields = [...trnsFromErfsTableFields];
		return { tableFields: fields };
	}

	/*
	Trns for ast
	*/
	if (ml1 === "trnsForAst") {
		fields = [...trnsForAstTableFields];
		return { tableFields: fields };
	}

	/*
	asts in erf
	*/
	if (ml1 === "astsInErf") {
		fields = [...astsInErfTableFields];
		return { tableFields: fields };
	}

	/*
	asts in erf
	*/
	if (ml1 === "astsInErfMap") {
		fields = [...astsInErfMapTableFields];
		return { tableFields: fields };
	}

	/*
	trns in erf
	*/
	if (ml1 === "trnsInErfMap") {
		fields = [...trnsInErfMapTableFields];
		return { tableFields: fields };
	}

	/*
	Erfs
	*/
	if (ml1 === "erfsUpload") {
		fields = [...erfsUploadTableFields];
	}

	if (ml1 === "erfs") {
		fields = [...erfsTableFields];
	}

	/*
	Supply Chain (Sch)
	*/
	if (ml1 === "sch") {
		if (ml2) {
			if (ml2 === "pos") {
				fields = [...poTableFields];
			}
			if (ml2 === "suppliers") {
				fields = [...splTableFields];
			}
			if (ml2 === "stores") {
				fields = [...storesTableFields];
			}
			if (ml2 === "poi") {
				fields = [...poiTableFields];
			}
		}
	}

	/*
	admin
	*/
	if (ml1 === "admin") {
		if (ml2) {
			if (ml2 === "users") {
				fields = [...usersTableFields];
			}
			if (ml2 === "mobile-devices") {
				fields = [...mobileDevicesTableFields];
			}
			if (ml2 === "simcards") {
				fields = [...simcardsTableFields];
			}
			if (ml2 === "systt") {
				if (ml3) {
					if (ml3 === "user-roles") {
						fields = [...userRolesTableFields];
					}
					if (ml3 === "ast-states") {
						fields = [...astStatesTableFields];
					}
					if (ml3 === "trn-states") {
						fields = [...trnStatesTableFields];
					}
					if (ml3 === "ast-cartegories") {
						fields = [...astCartegoriesTableFields];
					}
				}
			}
			if (ml2 === "uploads") {
				if (ml3 === "tidKtcTokens") {
					fields = [...tidKtcTokensTableFields];
				}
			}
		}
	}

	/*
	asts
	*/
	if (ml1 === "asts") {
		fields = [...astTableFieldsLeft, ...astTableFieldsRight];
		if (ml2) {
			if (ml2 === "feeder") {
				fields = [...astTableFieldsLeft, ...astFeeder, ...astTableFieldsRight];
			}
			if (ml2 === "pole") {
				fields = [...astTableFieldsLeft, ...astPole, ...astTableFieldsRight];
			}
			if (ml2 === "box") {
				fields = [...astTableFieldsLeft, ...astBox, ...astTableFieldsRight];
			}
			if (ml2 === "meter") {
				fields = [...astTableFieldsLeft, ...astMeter, ...astTableFieldsRight];
			}
			if (ml2 === "cb") {
				fields = [...astTableFieldsLeft, ...astCb, ...astTableFieldsRight];
			}
			if (ml2 === "seal") {
				fields = [...astTableFieldsLeft, ...astSeal, ...astTableFieldsRight];
			}
			if (ml2 === "vtct") {
				fields = [...astTableFieldsLeft, ...astVtct, ...astTableFieldsRight];
			}
			if (ml2 === "transformer") {
				fields = [...astTableFieldsLeft, ...astTransformer, ...astTableFieldsRight];
			}
		}
	}
	/*
	trns
	*/
	if (ml1 === "trns") {
		fields = [...trnsTableFields];
		if (ml2) {
			if (ml2 === "feeder") {
				fields = [...fields, ...astFeeder];
				if (ml3) {
					if (ml3 === "installation") {
						fields = [...fields, ...trnsFeederInstallationFields];
					}
					if (ml3 === "commissioning") {
						fields = [...fields, ...trnsFeederCommissioningFields];
					}
					if (ml3 === "decommissioning") {
						fields = [...fields, ...trnsFeederDecommissioningFields];
					}
					if (ml3 === "inspection") {
						fields = [...fields, ...trnsFeederInspectionFields];
					}
					if (ml3 === "return-to-supplier") {
						fields = [...fields, ...trnsFeederReturnToSupplierFields];
					}
					if (ml3 === "sale") {
						fields = [...fields, ...trnsFeederSaleFields];
					}
				}
			}
			if (ml2 === "pole") {
				fields = [...fields, ...astPole];
				if (ml3) {
					if (ml3 === "installation") {
						fields = [...fields, ...trnsPoleInstallationFields];
					}
					if (ml3 === "commissioning") {
						fields = [...fields, ...trnsPoleCommissioningFields];
					}
					if (ml3 === "decommissioning") {
						fields = [...fields, ...trnsPoleDecommissioningFields];
					}
					if (ml3 === "inspection") {
						fields = [...fields, ...trnsPoleInspectionFields];
					}
					if (ml3 === "audit") {
						fields = [...fields, ...trnsPoleAuditFields];
					}
					if (ml3 === "return-to-supplier") {
						fields = [...fields, ...trnsPoleReturnToSupplierFields];
					}
					if (ml3 === "sale") {
						fields = [...fields, ...trnsPoleSaleFields];
					}
					if (ml3 === "missing") {
						fields = [...fields, ...trnsPoleMissingFields];
					}
					if (ml3 === "found") {
						fields = [...fields, ...trnsPoleFoundFields];
					}
				}
			}
			if (ml2 === "box") {
				fields = [...fields, ...astBox];
				if (ml3) {
					if (ml3 === "installation") {
						fields = [...fields, ...trnsBoxInstallationFields];
					}
					if (ml3 === "commissioning") {
						fields = [...fields, ...trnsBoxCommissioningFields];
					}
					if (ml3 === "decommissioning") {
						fields = [...fields, ...trnsBoxDecommissioningFields];
					}
					if (ml3 === "inspection") {
						fields = [...fields, ...trnsBoxInspectionFields];
					}
					if (ml3 === "return-to-supplier") {
						fields = [...fields, ...trnsBoxReturnToSupplierFields];
					}
					if (ml3 === "sale") {
						fields = [...fields, ...trnsBoxSaleFields];
					}
					if (ml3 === "missing") {
						fields = [...fields, ...trnsBoxMissingFields];
					}
					if (ml3 === "found") {
						fields = [...fields, ...trnsBoxFoundFields];
					}
				}
			}
			if (ml2 === "meter") {
				fields = [...fields, ...astMeter];
				if (ml3) {
					if (ml3 === "installation") {
						fields = [...fields, ...trnsMeterInstallationFields];
					}
					if (ml3 === "commissioning") {
						fields = [...fields, ...trnsMeterCommissioningFields];
					}
					if (ml3 === "decommissioning") {
						fields = [...fields, ...trnsMeterDecommissioningFields];
					}
					if (ml3 === "inspection") {
						fields = [...fields, ...trnsMeterInspectionFields];
					}
					if (ml3 === "audit") {
						fields = [...fields, ...trnsMeterAuditFields];
					}
					if (ml3 === "missing") {
						fields = [...fields, ...trnsMeterMissingFields];
					}
					if (ml3 === "found") {
						fields = [...fields, ...trnsMeterFoundFields];
					}
					if (ml3 === "return-to-supplier") {
						fields = [...fields, ...trnsMeterReturnToSellerFields];
					}
					if (ml3 === "disconnection") {
						fields = [...fields, ...trnsMeterDisconnectionFields];
					}
					if (ml3 === "reconnection") {
						fields = [...fields, ...trnsMeterReconnectionFields];
					}
					if (ml3 === "sale") {
						fields = [...fields, ...trnsMeterSaleFields];
					}
					if (ml3 === "vending") {
						fields = [...fields, ...trnsMeterVendingFields];
					}
				}
			}
			if (ml2 === "cb") {
				fields = [...fields, ...astCb];
				if (ml3) {
					if (ml3 === "installation") {
						fields = [...fields, ...trnsCbInstallationFields];
					}
					if (ml3 === "commissioning") {
						fields = [...fields, ...trnsCbCommissioningFields];
					}
					if (ml3 === "decommissioning") {
						fields = [...fields, ...trnsCbDecommissioningFields];
					}
					if (ml3 === "inspection") {
						fields = [...fields, ...trnsCbInspectionFields];
					}
					if (ml3 === "return-to-supplier") {
						fields = [...fields, ...trnsCbReturnToSellerFields];
					}
					if (ml3 === "sale") {
						fields = [...fields, ...trnsCbSaleFields];
					}
					if (ml3 === "missing") {
						fields = [...fields, ...trnsCbMissingFields];
					}
					if (ml3 === "found") {
						fields = [...fields, ...trnsCbFoundFields];
					}
				}
			}
			if (ml2 === "seal") {
				fields = [...fields, ...astSeal];
				if (ml3) {
					if (ml3 === "installation") {
						fields = [...fields, ...trnsSealInstallationFields];
					}
					if (ml3 === "commissioning") {
						fields = [...fields, ...trnsSealCommissioningFields];
					}
					if (ml3 === "decommissioning") {
						fields = [...fields, ...trnsSealDecommissioningFields];
					}
					if (ml3 === "inspection") {
						fields = [...fields, ...trnsSealInspectionFields];
					}
					if (ml3 === "return-to-supplier") {
						fields = [...fields, ...trnsSealReturnToSupplierFields];
					}
					if (ml3 === "sale") {
						fields = [...fields, ...trnsSealSaleFields];
					}
					if (ml3 === "missing") {
						fields = [...fields, ...trnsSealMissingFields];
					}
					if (ml3 === "found") {
						fields = [...fields, ...trnsSealFoundFields];
					}
				}
			}
			if (ml2 === "vtct") {
				fields = [...fields, ...astVtct];
				if (ml3) {
					if (ml3 === "installation") {
						fields = [...fields, ...trnsVtctInstallationFields];
					}
					if (ml3 === "commissioning") {
						fields = [...fields, ...trnsVtctCommissioningFields];
					}
					if (ml3 === "decommissioning") {
						fields = [...fields, ...trnsVtctDecommissioningFields];
					}
					if (ml3 === "inspection") {
						fields = [...fields, ...trnsVtctInspectionFields];
					}
					if (ml3 === "returnToSeller") {
						fields = [...fields, ...trnsVtctReturnToSellerFields];
					}
					if (ml3 === "sale") {
						fields = [...fields, ...trnsVtctSaleFields];
					}
				}
			}
			if (ml2 === "transformer") {
				fields = [...fields, ...astVtct];
				if (ml3) {
					if (ml3 === "installation") {
						fields = [...fields, ...trnsTransformerInstallationFields];
					}
					if (ml3 === "commissioning") {
						fields = [...fields, ...trnsTransformerCommissioningFields];
					}
					if (ml3 === "decommissioning") {
						fields = [...fields, ...trnsTransformerDecommissioningFields];
					}
					if (ml3 === "inspection") {
						fields = [...fields, ...trnsTransformerInspectionFields];
					}
					if (ml3 === "return-to-supplier") {
						fields = [...fields, ...trnsTransformerReturnToSellerFields];
					}
					if (ml3 === "sale") {
						fields = [...fields, ...trnsTransformerSaleFields];
					}
				}
			}
		}
	}
	// fields = [...fields];
	// console.log(`fields`, fields);

	return { tableFields: [...fields] };
};
