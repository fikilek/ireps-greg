import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Signin from "../../components/forms/authForms/Signin";
import Signout from "../../components/forms/authForms/Signout";
import Signup from "../../components/forms/authForms/Signup";
import ForgottenPassword from "../../components/forms/authForms/ForgottenPassword";
import "./modal.css";
import PoForm from "../forms/poForms/PoForm";
import PoiTable2 from "../../pages/sch/PoiTable2";
import UserSignature from "../userSignature/UserSignature";
import PoInvPop from "../../pages/sch/PoInvPop";
import SplForm from "../forms/splForms/SplForm";
import StoresForm from "../forms/storesForms/StoresForm";
import UserRolesForm from "../forms/userRolesForm/UserRolesForm";
import AstStatesForm from "../forms/astStatesForm/AstStatesForm";
import TrnStatesForm from "../forms/trnStatesForm/TrnStatesForm";
import AstCartegoriesForm from "../forms/astCartegories/AstCartegoriesForm";
import MobileDevicesForm from "../forms/mobileDevicesForms/MobileDevicesForm";
import SimcardsForm from "../forms/simcardsFrm/SimcardsForm";
import AstsForm from "../forms/astsForms/AstsForm";
import TrnsForm from "../forms/trnForms/TrnsForm";
// import TrnDataForm from "../forms/trnDataForms/TrnDataForm";
import ErfsForm from "../forms/erfsForm/ErfsForm";
import TableTrnsFromErfs from "../table/TableTrnsFromErfs";
import TrnAstCheckoutForm from "../forms/trnAstCheckoutForm/TrnAstCheckoutForm";
import TrnDataForm from "../forms/trnForms/trnDataForms/TrnDataForm";
import TableTrnsForAst from "../table/TableTnsForAst";
import TableTrnsInErf from "../table/TableTrnsInErf";
import TableAstsInErf from "../table/TableAstsInErf";
import AstMedia from "../astMedia/AstMedia";
import TabsErfMapInfoWrapper from "../tabs/erfsTabs/tabsMap/TabsErfMapInfoWrapper";
import UserProfile from "../../pages/unps/UserProfile";
import UserRoleSelection from "../../pages/unps/UserRoleSelection";

const Modal = () => {
	const { componentToOpen, setComponentToOpen, modalOpened, setModalOpened } =
		useContext(ModalContext);
	// console.log(`modalOpened`, modalOpened);
	// console.log(`componentToOpen`, componentToOpen);

	const { modalName, payload } = componentToOpen;
	// console.log(`modalName`, modalName)
	// console.log(`payload`, payload);

	const modalBeckgroundClick = e => {
		// console.log(`modal background clicked`, e.target);
		if (e.target.id === "modal-background") {
			// console.log(`closing modal`)
			setModalOpened(null);
			setComponentToOpen({
				modalName: "",
				payload: {},
			});
		}
	};

	return (
		<div
			className={
				modalOpened
					? "modal-container modal-showModal"
					: "modal-container modal-hideModal"
			}
		>
			<div
				className="modal-background"
				id="modal-background"
				// onClick={modalBeckgroundClick}
			>
				<div className="modal-payload">
					<div className="modal-body">
						{/* auth forms */}
						{modalName === "signin" && (
							<Signin location={payload ? payload?.location : ""} />
						)}
						{modalName === "signout" && <Signout />}
						{modalName === "signup" && <Signup />}
						{modalName === "fpw" && <ForgottenPassword />}
						{modalName === "userRoleSelection" && (
							<UserRoleSelection data={payload} />
						)}

						{/* erfs */}
						{modalName === "erfsForm" && <ErfsForm formData={payload} />}
						{modalName === "tableTrnsInErf" && <TableTrnsInErf trnsData={payload} />}
						{modalName === "tableAstsInErf" && <TableAstsInErf astsData={payload} />}

						{/* trns */}
						{modalName === "trnForm" && <TrnsForm formData={payload} />}
						{modalName === "trnDataForm" && <TrnDataForm formData={payload} />}
						{modalName === "trnAstCheckoutForm" && (
							<TrnAstCheckoutForm data={payload} />
						)}
						{modalName === "tableTrnsFromErfs" && (
							<TableTrnsFromErfs trnsData={payload} />
						)}

						{/* asts */}
						{modalName === "astsForm" && <AstsForm formData={payload} />}
						{modalName === "tableTrnsForAst" && <TableTrnsForAst astData={payload} />}
						{modalName === "astMedia" && <AstMedia astData={payload} />}
						{modalName === "tabsErfMapInfoWrapper" && (
							<TabsErfMapInfoWrapper erf={payload} />
						)}

						{/* sch */}
						{modalName === "poForm" && <PoForm formData={payload} />}
						{modalName === "splForm" && <SplForm formData={payload} />}
						{/* {modalName === "storesForm" && <StoresForm formData={payload} />} */}

						{modalName === "poInvPop" && <PoInvPop po={payload.po} />}
						{modalName === "poiTable" && (
							<PoiTable2 rowData={payload.rowData} columnDefs={payload.columnDefs} />
						)}
						{modalName === "userSignature" && <UserSignature formData={payload} />}

						{/* admin */}
						{modalName === "storesForm" && <StoresForm formData={payload} />}
						{modalName === "mobileDevicesForm" && (
							<MobileDevicesForm formData={payload} />
						)}
						{modalName === "simcardsForm" && <SimcardsForm formData={payload} />}
						{modalName === "userRolesForm" && <UserRolesForm formData={payload} />}
						{modalName === "astStatesForm" && <AstStatesForm formData={payload} />}
						{modalName === "trnStatesForm" && <TrnStatesForm formData={payload} />}
						{modalName === "astCartegoriesForm" && (
							<AstCartegoriesForm formData={payload} />
						)}
						{modalName === "userProfile" && <UserProfile formData={payload} />}
					</div>

					<div className="modal-footer"></div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
