import React from "react";
import "./admin.css";
import AdminSystTables from "./ml2/AdminSystTables";
import { useParams } from "react-router-dom";
import TableWithAddRecordBtn from "../../components/table/TableWithAddRecordBtn";
import Downloads from '../../pages/downloads/Downloads';
import Uploads from '../../pages/uploads/Uploads';
import TableUsersList from "../../components/table/TableUsersList";

const Admin = () => {
	const { ml2, ml3 } = useParams();
	return (
		<>
			{/* users */}
			{ml2 === "users" && ml3 === undefined && (
				<TableUsersList ml1="admin" ml2="users"  />
			)}

			{/* downloads */}
			{ml2 === "downloads" && ml3 === undefined && (
				<Downloads ml1="admin" tn="downloads" nfd="" fn="" />
			)}

			{/* uploads */}
			{ml2 === "uploads" && ml3 === undefined && (
				<Uploads ml1="admin" tn="uploads" nfd="" fn="" />
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
