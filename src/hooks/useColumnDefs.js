import moment from "moment";
import TableBtnTrnSelect from "../components/tableBtns/TableBtnTrnSelect";
import PoiBtn from "../components/tables/poi/PoiBtn";
import PoBtn from "../pages/sch/PoBtn";
import UserSignatureBtn from "../components/userSignature/UserSignatureBtn";
import { getPoStatus } from "../utils/utils";
import PoInvPopBtn from "../pages/sch/PoInvPopBtn";
import { memo } from "react";
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

export const useColumnDefs = props => {
	// console.log(`props`, props);
	const { ml1, ml2, ml3 } = props;

	// Erfs
	const erfsTableFields = [
		{
			field: "id",
			headerName: "System Id",
			width: 200,
			// hide: true,
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
			field: "edit",
			headerName: "Edit",
			width: 100,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "erfsForm",
				disabled: false,
			},
			floatingFilter: false,
		},
		{
			field: "erfNo",
			headerName: "Erf No",
			width: 150,
			checkboxSelection: true,
			headerCheckboxSelection: true,
			headerCheckboxSelectionFilteredOnly: true,
			// cellRenderer: memo(ErfBtn),
		},
		{
			field: "erfStatus",
			headerName: "Status",
			width: 150,
		},
		{
			field: "asts",
			headerName: "Asts in Erf",
			width: 150,
			tooltipField: "asts",
			tooltipComponent: TableTrnsForAstsTooltip,
			// cellRenderer: params => {
			// 	console.log(`params`, params);
			// 	return params.data?.asts?.length;
			// },
			cellRenderer: memo(TableAstsInErfBtn),
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
				},
				{
					field: "address.gps.longitude",
					// columnGroupShow: "closed",
					headerName: "Longitude",
					width: 170,
				},
			],
		},
		{
			// A click displays a modal that shows the Purchase Order
			field: "standUse",
			headerName: "Stand Use", //[business, residentail-suburb, residential-township, church, government, school]
			width: 160,
		},
		{
			headerName: "Customer Address",
			children: [
				{
					field: "address.country",
					headerName: "Country",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "address.province",
					headerName: "Province",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "address.dm",
					headerName: "DM",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "address.lmMetro",
					headerName: "LM or Metro",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "address.town",
					headerName: "Towm",
					width: 120,
				},
				{
					field: "address.ward",
					headerName: "Ward",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "address.suburbTownship",
					headerName: "Suburb/Township",
					width: 170,
				},
				{
					field: "address.street",
					headerName: "Street",
					width: 170,
				},
			],
		},
		{
			headerName: "Customer Warm Body",
			children: [
				{
					field: "customer.warmBody.surname",
					// columnGroupShow: "closed",
					headerName: "Surname",
					width: 120,
				},
				{
					field: "customer.warmBody.name",
					// columnGroupShow: "closed",
					headerName: "Name",
					width: 120,
				},
				{
					field: "customer.warmBody.idNo",
					columnGroupShow: "open",
					headerName: "Id No",
					width: 120,
				},
				{
					field: "customer.warmBody.gender",
					columnGroupShow: "open",
					headerName: "Gender",
					width: 120,
				},
			],
		},
		{
			headerName: "Customer Juristic Person",
			children: [
				{
					field: "customer.juristicPerson.name",
					// columnGroupShow: "closed",
					headerName: "Name",
					width: 120,
				},
				{
					field: "customer.juristicPerson.tradingName",
					columnGroupShow: "open",
					headerName: "Trading Name",
					width: 120,
				},
				{
					field: "customer.juristicPerson.registeredName",
					columnGroupShow: "open",
					headerName: "Registered Name",
					width: 120,
				},
				{
					field: "customer.juristicPerson.registeredNo",
					columnGroupShow: "open",
					headerName: "Registered No",
					width: 120,
				},
			],
		},
		{
			headerName: "Customer Contact Person",
			children: [
				{
					field: "customer.contactPerson.surname",
					// columnGroupShow: "closed",
					headerName: "Surname",
					width: 120,
				},
				{
					field: "customer.contactPerson.name",
					// columnGroupShow: "closed",
					headerName: "Name",
					width: 120,
				},
				{
					field: "customer.contactPerson.landLine",
					columnGroupShow: "open",
					headerName: "Land Line",
					width: 120,
				},
				{
					field: "customer.contactPerson.emailAdr",
					columnGroupShow: "open",
					headerName: "Email Adr",
					width: 150,
				},
				{
					field: "customer.contactPerson.whatsApp",
					columnGroupShow: "open",
					headerName: "WhatssApp No",
					width: 120,
				},
				{
					field: "customer.contactPerson.cellNo",
					// columnGroupShow: "closed",
					headerName: "Cell No",
					width: 120,
				},
			],
		},
		{
			headerName: "Billing",
			children: [
				{
					field: "billing.accountNo.length",
					columnGroupShow: "closed",
					headerName: "Account No",
					width: 150,
				},
				{
					field: "billing.indigent",
					columnGroupShow: "closed",
					headerName: "Indigent",
					width: 120,
				},
				{
					field: "billing.tariff",
					columnGroupShow: "closed",
					headerName: "Tariff",
					width: 120,
				},
			],
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
			flex: 1.5,
		},
		{
			field: "astData.astCartegory",
			headerName: "Ast Cat",
			width: 150,
			flex: 0.8,
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
		},
		{
			field: "trnMetaData.trnNo",
			headerName: "Trn No",
			width: 100,
			flex: 0.8,
		},
		{
			field: "trnMetaData.trnType",
			headerName: "Trn Type",
			width: 150,
			flex: 1,
		},
	];

	// Admin
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

	// Admin
	const usersTableFields = [
		{
			field: "id",
			headerName: "users Id",
			width: 90,
			hide: true,
		},
		{
			field: "metaData.createdAtDatetime",
			headerName: "Date Created",
			width: 180,
			cellRenderer: params => {
				return <p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>;
			},
		},
		{
			field: "metaData.updatedAtDatetime",
			headerName: "Updated At Datetime",
			width: 190,
			cellRenderer: params => {
				return <p>{moment(params.value.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>;
			},
		},
		{
			field: "displayName",
			headerName: "display name",
			width: 170,
		},
		{
			field: "email",
			headerName: "email adro",
			width: 200,
		},
		{
			field: "online",
			headerName: "online",
			width: 100,
		},
		{
			field: "phoneNumber",
			headerName: "phone number",
			width: 150,
		},
		{
			field: "photoUrl",
			headerName: "photo",
			width: 100,
		},
	];

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

	const userRolesTableFields = [
		{
			field: "id",
			headerName: "User Roles Id",
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
				fn: "userRolesForm",
			},
		},
		{
			field: "userRoleName",
			headerName: "User Role Name",
			width: 150,
		},
		{
			field: "userRoleDescription",
			headerName: "User Role Description",
			width: 350,
		},
		// { field: "delete", headerName: "Delete", width: 100 },
	];

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

	// asts sitting in 'asts' collection (left pannel of checkout form)
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

	// asts sittong in trn object  (right pannel of checkout form)
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

	// Assets
	const astTableFields = [
		{
			field: "id",
			headerName: "Ast Id",
			width: 100,
			// hide: true,
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
			field: "edit",
			headerName: "Edit",
			width: 80,
			floatingFilter: false,
			cellRenderer: memo(FormEditBtn),
			cellRendererParams: {
				fn: "astsForm",
				disabled: false,
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
		},
		{
			field: "metaData.trnCount",
			headerName: "Ast Trn(s)",
			width: 120,
			cellRenderer: memo(TableTnsForAstBtn), //These are all transactions that happen on an ast
		},
		{
			field: "newTrn",
			headerName: "New Trn",
			width: 230,
			cellRenderer: memo(TableBtnTrnSelect),
			cellRendererParams: {
				ml2,
			},
		},
		{
			headerName: "Asset Data",
			children: [
				{
					field: "astData.astNo",
					columnGroupShow: "closed",
					headerName: `Asset No`,
					width: 180,
					// cellRenderer: p => {
					// 	console.log(`p.value`, p.value);
					// 	return p.value ? (
					// 		<button className="table-row-btn btn-serial-no">{p.value}</button>
					// 	) : (
					// 		""
					// 	);
					// },

					cellRenderer: params => {
						// console.log(`params.data.astData.astCartegory`, params.data.astData.astCartegory);
						const displayValue =
							params.data.astData.astCartegory === "cb"
								? params.data.astData.cb.size
								: params.data.astData.astNo;
						// console.log(`str`, str);
						return (
							<button className="table-row-btn table-row-btn-ast-no btn-serial-no">
								{displayValue}
							</button>
						);
					},
				},
				{
					field: "astData.astSerialNo",
					columnGroupShow: "open",
					headerName: "Ast Serial No",
					width: 140,
				},
				{
					field: "astData.astCartegory",
					columnGroupShow: "closed",
					headerName: "Ast Cartegory",
					width: 140,
				},
				{
					field: "astData.astState",
					columnGroupShow: "closed",
					headerName: "Ast State",
					width: 150,
					cellStyle: TableCellStyleAstState,
				},
			],
		},
		{
			headerName: "Erf/Gps",
			children: [
				{
					field: "erfData.erfNo",
					headerName: "Erf No",
					width: 120,
					columnGroupShow: "close",
				},
				{
					field: "erfData.gps.latitude",
					// columnGroupShow: "closed",
					headerName: "Latitude",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "erfData.gps.longitude",
					// columnGroupShow: "closed",
					headerName: "Longitude",
					width: 120,
					columnGroupShow: "open",
				},
			],
		},
		{
			headerName: "Customer Address",
			children: [
				{
					field: "erfData.address.country",
					headerName: "Country",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "erfData.address.province",
					headerName: "Province",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "erfData.address.dm",
					headerName: "DM",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "erfData.address.lmMetro",
					headerName: "LM or Metro",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "erfData.address.town",
					headerName: "Towm",
					width: 120,
				},
				{
					field: "erfData.address.ward",
					headerName: "Ward",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "erfData.address.suburbTownship",
					headerName: "Suburb/Township",
					width: 170,
				},
				{
					field: "erfData.address.street",
					headerName: "Street",
					width: 170,
				},
			],
		},
	];

	// Assets in Erfs Tooltip Table fields
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

	const astMeter = [
		{
			headerName: "Meters",
			children: [
				{ field: "astData.meter.phase", headerName: "Phase", initialWidth: 120 },
				{ field: "astData.meter.type", headerName: "Type", initialWidth: 120 },
				{ field: "astData.meter.code", headerName: "Code", initialWidth: 120 },
			],
		},
	];

	const astFeeder = [
		{
			headerName: "feeders",
			children: [
				{ field: "astData.feeder.length", headerName: "feeder", initialWidth: 120 },
				{ field: "astData.feeder.code", headerName: "Code", initialWidth: 120 },
			],
		},
	];

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

	const astCb = [
		{
			headerName: "Circuit Breakers",
			children: [
				{
					field: "astData.cb.size",
					headerName: "size",
					initialWidth: 90,
				},
				{ field: "astData.cb.code", headerName: "Code", initialWidth: 120 },
			],
		},
	];

	const astSeal = [
		{
			headerName: "Seals",
			children: [
				{
					field: "astData.seal.no",
					headerName: "Seal No",
					initialWidth: 120,
				},
				{ field: "astData.cb.code", headerName: "Code", initialWidth: 120 },
			],
		},
	];

	const astVtct = [
		{ field: "manufacture", headerName: "Manufacture", initialWidth: 120 },
	];

	const astTransformer = [
		{ field: "manufacture", headerName: "Manufacture", initialWidth: 120 },
	];

	// media fields
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

	// Transactions form Erfs table fields
	const trnsFromErfsTableFields = [
		{
			field: "erfData.erfNo",
			headerName: "Erf No",
			width: 130,
		},
		{
			headerName: "Address",
			children: [
				{
					field: "erfData.address.lmMetro",
					// columnGroupShow: "closed",
					headerName: "Municipality",
					width: 130,
				},
				{
					field: "erfData.address.town",
					// columnGroupShow: "closed",
					headerName: "Town",
					width: 130,
				},
				{
					field: "erfData.address.ward",
					// columnGroupShow: "closed",
					headerName: "Ward No",
					width: 130,
				},
				{
					field: "erfData.address.suburbTownship",
					// columnGroupShow: "closed",
					headerName: "Suburb/Tship",
					width: 130,
				},
				{
					field: "erfData.address.street",
					// columnGroupShow: "closed",
					headerName: "Street",
					width: 130,
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
				},
				{
					field: "erfData.billing.tariff",
					// columnGroupShow: "closed",
					headerName: "Tariff",
					width: 130,
				},
			],
		},
	];

	// Transactions form fields
	const trnsTableFields = [
		{
			field: "id",
			headerName: "Trn Id",
			width: 220,
			// hide: true,
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
			field: "metaData.trnNo",
			headerName: "Trn No",
			width: 150,
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
			width: 250,
			cellRenderer: memo(TrnAstCheckoutFormBtn),
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
		},

		...mediaFields,

		// erfs

		{
			headerName: "Erf",
			children: [
				{
					field: "erfData.erfNo",
					headerName: "Erf No",
					width: 130,
					cellRenderer: params => {
						return <button className="table-row-btn">{params.value}</button>;
					},
				},
			],
		},
		{
			headerName: " erf Address",
			children: [
				{
					field: "erfData.address.lmMetro",
					// columnGroupShow: "closed",
					headerName: "Municipality",
					width: 130,
				},
				{
					field: "erfData.address.town",
					// columnGroupShow: "closed",
					headerName: "Town",
					width: 130,
				},
				{
					field: "erfData.address.ward",
					// columnGroupShow: "closed",
					headerName: "Ward No",
					width: 130,
				},
				{
					field: "erfData.address.suburbTownship",
					// columnGroupShow: "closed",
					headerName: "Suburb/Tship",
					width: 130,
				},
				{
					field: "erfData.address.street",
					// columnGroupShow: "closed",
					headerName: "Street",
					width: 130,
				},
			],
		},
		{
			headerName: "erf Biling",
			children: [
				{
					field: "erfData.billing.indigent",
					// columnGroupShow: "closed",
					headerName: "Indigent",
					width: 130,
				},
				{
					field: "erfData.billing.tariff",
					// columnGroupShow: "closed",
					headerName: "Tariff",
					width: 130,
				}
			],
		},
	];

	// Transactions form fields
	const trnsForAstTableFields = [
		{
			field: "trnMetaData.updatedByUser",
			headerName: "Updated By",
			width: 130,
			flex: 1,
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
		},
		{
			field: "trnMetaData.trnType",
			headerName: "Trn Type",
			width: 170,
			flex: 1,
		},
	];

	// feeder form fields
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
	Ast checkout / Checkin
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
	Erfs
	*/
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
	Admin
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
		}
	}

	/*
	Assets
	*/
	if (ml1 === "asts") {
		fields = [...astTableFields];
		if (ml2) {
			if (ml2 === "feeder") {
				fields = [...fields, ...astFeeder];
			}
			if (ml2 === "pole") {
				fields = [...fields, ...astPole];
			}
			if (ml2 === "box") {
				fields = [...fields, ...astBox];
			}
			if (ml2 === "meter") {
				fields = [...fields, ...astMeter];
			}
			if (ml2 === "cb") {
				fields = [...fields, ...astCb];
			}
			if (ml2 === "seal") {
				fields = [...fields, ...astSeal];
			}
			if (ml2 === "vtct") {
				fields = [...fields, ...astVtct];
			}
			if (ml2 === "transformer") {
				fields = [...fields, ...astTransformer];
			}
		}
	}
	/*
	Transactions
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
	fields = [...fields];
	// console.log(`fields`, fields);
	return { tableFields: fields };
};
