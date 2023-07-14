import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { FaFileInvoiceDollar, FaShoppingBasket } from "react-icons/fa";
import { FcBusinessman, FcCellPhone } from "react-icons/fc";
import {
	MdBusiness,
	MdLockClock,
	MdOutlineEmail,
	MdPerson,
} from "react-icons/md";
import { RiMoneyCnyBoxLine } from "react-icons/ri";
import useCollection from "../../../../hooks/useCollection";

const FormSectionSupplier = ({ po, setPo }) => {
	const { data: suppliers } = useCollection('sch', "suppliers");
	// console.log(`suppliers`, suppliers)
	// console.log(`po.poSplData.splName`, po.poSplData.splName);
	const [selected, setSelected] = useState("");
	// console.log(`selected`, selected);

	const handleChangeSupplier = e => {
		e.preventDefault();
		// console.log(`e.target.id`, e.target.id);
		// console.log(`e.target.value`, e.target.value);
		const selectedSupplier = suppliers.find(
			supplier => supplier.id === e.target.value
		);
		// console.log(`selectedSupplier`, selectedSupplier);
		setPo(prev => {
			return {
				...prev,
				poSplData: {
					...prev.poSplData,
					id: selectedSupplier.id,
					splNo: selectedSupplier.splNo,
					splName: selectedSupplier.splName,
					splContactSurname: selectedSupplier.splContactSurname,
					splContactName: selectedSupplier.splContactName,
					splContactNo: selectedSupplier.splContactNo,
					splContactEmailAdr: selectedSupplier.splContactEmailAdr,
				},
			};
		});
	};

	useEffect(() => {
		// console.log(`useEffect po.poSplData.splName`, po.poSplData.splName);
		setSelected(po.poSplData.splName);
	}, [po.poSplData.splName]);

	return (
		<div className="fs fs-supplier">
			<p className="fs-title supplier-title">Supplier</p>

			<div className="form-field po-form-supplier-name">
				<span className="form-field-icon">
					<MdBusiness />
				</span>
				<select
					name="splName"
					id="splName"
					value={selected}
					onChange={handleChangeSupplier}
					placeholder="Supplier Name"
				>
					<option key={selected} value={selected}>
						{selected}
					</option>
					{suppliers &&
						suppliers.map(supplier => {
							if (selected !== supplier.splName) {
								return (
									<option key={supplier.id} value={supplier.id}>
										{supplier.splName}
									</option>
								);
							}
						})}
				</select>
			</div>

			<div className="form-field po-form-supplier-contact-surname">
				<span className="form-field-icon">
					<FcBusinessman />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="splContactSurname"
					id="splContactSurname"
					value={po.poSplData.splContactSurname}
					// onChange={handleSplDataChange}
					placeholder="Contact Surname"
				/>
			</div>
			<div className="form-field po-form-supplier-contact-name">
				<span className="form-field-icon">
					<FcBusinessman />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="splContactName"
					id="splContactName"
					value={po.poSplData.splContactName}
					// onChange={handleSplDataChange}
					placeholder="Contact Name"
				/>
			</div>
			<div className="form-field po-form-supplier-contact-no">
				<span className="form-field-icon">
					<FcCellPhone />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="splContactNo"
					id="splContactNo"
					value={po.poSplData.splContactNo}
					// onChange={handleSplDataChange}
					placeholder="Contact No"
				/>
			</div>
			<div className="form-field po-form-supplier-contact-email-adr">
				<span className="form-field-icon">
					<MdOutlineEmail />
				</span>
				<input
					readOnly="readOnly"
					type="email"
					name="splContactEmailAdr"
					id="splContactEmailAdr"
					value={po.poSplData.splContactEmailAdr}
					// onChange={handleSplDataChange}
					placeholder="Contact Email Adr"
				/>
			</div>
		</div>
	);
};
export default FormSectionSupplier;
