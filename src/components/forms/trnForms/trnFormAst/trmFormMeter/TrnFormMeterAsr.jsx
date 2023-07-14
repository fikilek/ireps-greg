import React from "react";
import {
	MdFormatListNumbered,
	MdHistory,
	MdLockClock,
	MdMyLocation,
	MdPerson,
	MdWebAsset,
} from "react-icons/md";
import { GiChoice } from "react-icons/gi";

const TrnFormMeterAsr = ({ formState, setFormState }) => {
	return (
		<>
			{/* asr */}
			<div>
				<div className="fs-title">
					<p>Goode Receiving (asr)</p>
				</div>
				<div className="form-field trn-form-purchase-order-no">
					<span className="form-field-icon">
						<GiChoice />
					</span>
					<input
						type="text"
						name="purchase-order-no"
						id="purchase-order-no"
						// value={trnFormData.asr.putchaseOrderNo}
						onChange={setFormState}
						placeholder="Purchase Order No"
					/>
				</div>
				<div className="form-field trn-form-supplier-name">
					<span className="form-field-icon">
						<GiChoice />
					</span>
					<input
						type="text"
						name="supplierName"
						id="supplierName"
						// value={trnFormData.asr.supplierName}
						onChange={setFormState}
						placeholder="Supplier Name"
					/>
				</div>
				<div className="form-field trn-form-supplier-contact-no">
					<span className="form-field-icon">
						<GiChoice />
					</span>
					<input
						type="text"
						name="supplierContactNo"
						id="supplierContactNo"
						// value={trnFormData.asr.supplierContactNo}
						onChange={setFormState}
						placeholder="Supplier Contact No"
					/>
				</div>
				<div className="form-field trn-form-supporting-docs">
					<span className="form-field-icon">
						<GiChoice />
					</span>
					<input
						type="text"
						name="supportingDocs"
						id="supportingDocs"
						// value={trnFormData.asr.supportingDocs}
						onChange={setFormState}
						placeholder="Supporting Docs"
					/>
				</div>
			</div>
		</>
	);
};

export default TrnFormMeterAsr;
