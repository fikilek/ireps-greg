import React from "react";
import "./admin.css";
import AdminSystTables from "./ml2/AdminSystTables";
import { useParams } from "react-router-dom";
import TableWithAddRecordBtn from "../../components/table/TableWithAddRecordBtn";

const Admin = () => {
	const { ml2, ml3 } = useParams();
	return (
		<>
			{/* users */}
			{ml2 === "unps" && ml3 === undefined && (
				<TableWithAddRecordBtn ml1="admin" tn="users" nfd="" fn="" />
			)}

			{ml2 === "syst" && ml3 === undefined ? <AdminSystTables /> : ""}

			{/* mibile devices (tablets and cell phones) */}
			{ml2 === "mobile-devices" && ml3 === undefined && (
				<TableWithAddRecordBtn
					ml1="admin"
					tn="mobile-devices"
					nfd="newMobileDevicesFormData"
					fn="mobileDevicesForm"
				/>
			)}

			{/* sim cards */}
			{ml2 === "simcards" && ml3 === undefined && (
				<TableWithAddRecordBtn
					ml1="admin"
					tn="simcards"
					nfd="newSimcardsFormData"
					fn="simcardsForm"
				/>
			)}

			{/* system tables */}

			{/* user roles */}
			{ml2 === "systt" && ml3 === "user-roles" && (
				<TableWithAddRecordBtn
					ml1="admin"
					tn="systt"
					ml3="user-roles"
					nfd="newUserRolesFormData"
					fn="userRolesForm"
				/>
			)}

			{/* asset states */}
			{ml2 === "systt" && ml3 === "ast-states" && (
				<TableWithAddRecordBtn
					ml1="admin"
					tn="systt"
					ml3="ast-states"
					nfd="newAstStatesFormData"
					fn="astStatesForm"
				/>
			)}

			{/* transaction (trn) states */}
			{ml2 === "systt" && ml3 === "trn-states" && (
				<TableWithAddRecordBtn
					ml1="admin"
					tn="systt"
					ml3="trn-states"
					nfd="newTrnStatesFormData"
					fn="trnStatesForm"
				/>
			)}

			{/* asset cartegories */}
			{ml2 === "systt" && ml3 === "ast-cartegories" && (
				<TableWithAddRecordBtn
					ml1="admin"
					tn="systt"
					ml3="ast-cartegories"
					nfd="newAstCartegoriesFormData"
					fn="astCartegoriesForm"
				/>
			)}
		</>
	);
};

export default Admin;
