import React from "react";
import { FcBusinessman, FcCellPhone } from "react-icons/fc";
import { MdBusiness, MdOutlineEmail } from "react-icons/md";
import useCollection from "../../../../hooks/useCollection";

const FormSectionStores = ({ po, setPo }) => {
	// console.log(`stores po`, po);
	const { data: stores } = useCollection("sch","stores");
	// console.log(`stores`, stores)

	const handleChangeStores = e => {
		e.preventDefault();
		// console.log(`e.target.id`, e.target.id);
		// console.log(`e.target.value`, e.target.value);
		const selectedStore = stores.find(store => store.id === e.target.value);
		// console.log(`selectedStore`, selectedStore);
		setPo(prev => {
			return {
				...prev,
				poData: {
					...prev.poData,
					poGrv: {
						...prev.poData.poGrv,
						poStoreData: {
							...prev.poData.poGrv.poStoreData,
							id: selectedStore.id,
							storeName: selectedStore.storesName,
							storeContactSurname: selectedStore.storesContactSurname,
							storeContactName: selectedStore.storesContactName,
							storeContactNo: selectedStore.storesContactNo,
							storeContactEmailAdr: selectedStore.storesContactEmailAdr,
						},
					},
				},
			};
		});
	};

	return (
		// fs: form section

		<div className="fs fs-fsb-grv fsb-grv-store">
			<p className="fs-title store-title">Store</p>

			<div className="form-field po-form-store-name">
				<span className="form-field-icon">
					<MdBusiness />
				</span>
				<select
					name="storeName"
					id="storeName"
					value={po.poData.poGrv.poStoreData.id}
					onChange={handleChangeStores}
					placeholder="Store Name"
				>
					{stores &&
						stores.map(store => {
							return (
								<option key={store.id} value={store.id}>
									{store.storesName}
								</option>
							);
						})}
				</select>
			</div>

			<div className="form-field po-form-store-contact-surname">
				<span className="form-field-icon">
					<FcBusinessman />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="storeContactSurname"
					id="storeContactSurname"
					value={po.poData.poGrv.poStoreData.storeContactSurname}
					// onChange={handleStoreDataChange}
					placeholder="Contact Surname"
				/>
			</div>
			<div className="form-field po-form-store-contact-name">
				<span className="form-field-icon">
					<FcBusinessman />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="storeContactName"
					id="storeContactName"
					value={po.poData.poGrv.poStoreData.storeContactName}
					// onChange={handleStoreDataChange}
					placeholder="Contact Name"
				/>
			</div>
			<div className="form-field po-form-store-contact-no">
				<span className="form-field-icon">
					<FcCellPhone />
				</span>
				<input
					readOnly="readOnly"
					type="text"
					name="storeContactNo"
					id="storeContactNo"
					value={po.poData.poGrv.poStoreData.storeContactNo}
					// onChange={handleStoreDataChange}
					placeholder="Contact No"
				/>
			</div>
			<div className="form-field po-form-store-contact-email-adr">
				<span className="form-field-icon">
					<MdOutlineEmail />
				</span>
				<input
					readOnly="readOnly"
					type="email"
					name="storeContactEmailAdr"
					id="storeContactEmailAdr"
					value={po.poData.poGrv.poStoreData.storeContactEmailAdr}
					// onChange={handleStoreDataChange}
					placeholder="Contact Email Adr"
				/>
			</div>
		</div>
	);
};
export default FormSectionStores;
