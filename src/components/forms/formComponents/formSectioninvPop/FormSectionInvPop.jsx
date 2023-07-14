import React from "react";
import { FaFileInvoiceDollar, FaShoppingBasket } from "react-icons/fa";
import { MdLockClock, MdPerson } from "react-icons/md";
import { RiMoneyCnyBoxLine } from "react-icons/ri";

const FormSectionInvPop = ({ po, setPo, sectionState, setSectionStates }) => {
	return (
		<div className="fs fs-ipg">
			<p className="fs-title ipg-title ">Inv, Payment and Grv Data</p>
			<div className="form-field po-form-inv">
				<span className="form-field-icon">
					<FaFileInvoiceDollar />
				</span>
				<span className="ipg-data">Invoices</span>
				<button
					// onClick={handleClickInvPopGrv}
					type="button"
					id="po-inv"
					className="btn-po-form-supplimentary-data btn-po-form-inv"
				>
					{po.poData.poInv.length === 0 ? "No Invoice" : po.poData.poInv.length}
				</button>
			</div>
			<div className="form-field po-form-payment">
				<span className="form-field-icon">
					<RiMoneyCnyBoxLine />
				</span>
				<span className="ipg-data">Payment</span>
				<button
					type="button"
					// onClick={handleClickInvPopGrv}
					id="po-payment"
					className="btn-po-form-payment"
				>
					{po.poData.poPop.length === 0 ? "No Payment" : po.poData.poPop.length}
				</button>
			</div>
		</div>
	);
};
export default FormSectionInvPop;
