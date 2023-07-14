import { useEffect } from "react";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import "./PoInvPop.css";
import PoInvPopForm from "./PoInvPopForm";
import PoInvPopTable from "./poInvPopTable/PoInvPopTable";

const initInvPopData = {
	no: "",
	amount: "",
	image: "",
	url: "",
	invPopImagePath: "",
};

const PoInvPop = ({ po }) => {
	// console.log(`po`, po)
	const { closeModal } = useModal();
	const [showHideInvPopForm, setShowHideInvPopForm] = useState("poipf-hide");
	const [type, setType] = useState(null);
	const [showImage, setShowImage] = useState(false);
	const [url, setUrl] = useState("");
	const [alt, setAlt] = useState("");
	const [invPopDataToEdit, setInvPopDataToEdit] = useState(initInvPopData);
	// poip: po Inv Payment

	const poInvArray = po.poData.poInv;
	const totInv = poInvArray.reduce((accumulator, currentValue) => {
		return (accumulator = accumulator + Number(currentValue.amount));
	}, 0);
	const poPopArray = po.poData.poPop;
	const totPop = poPopArray.reduce((accumulator, currentValue) => {
		return (accumulator = accumulator + Number(currentValue.amount));
	}, 0);

	return (
		<div className="poip-container">
			<div className="poip-header">
				<div className="po-no">{`Po-${po.poNo}`}</div>
				<p className="">Invoice Payment Report</p>
				<div className="totals">{`Balance: ${totInv - totPop}`}</div>
				<button onClick={() => closeModal()}>x</button>
			</div>
			<div className="poip-body">
				<div className="invoices">
					<div className="header">
						<button
							onClick={() => {
								setShowHideInvPopForm("poipf-show");
								setType("invoice");
								setInvPopDataToEdit(initInvPopData);
								setShowImage(false);
							}}
						>
							{" "}
							+{" "}
						</button>
						<p>invoices</p>
						<p>{totInv}</p>
					</div>
					<div className="invoices-body">
						<PoInvPopTable
							poData={po}
							setUrl={setUrl}
							setAlt={setAlt}
							setShowImage={setShowImage}
							type="invoice"
							setType={setType}
							setShowHideInvPopForm={setShowHideInvPopForm}
							setInvPopDataToEdit={setInvPopDataToEdit}
						/>
					</div>
				</div>
				<div className="payment">
					<div className="header">
						<button
							onClick={() => {
								setShowHideInvPopForm("poipf-show");
								setType("payment");
								setInvPopDataToEdit(initInvPopData);
								setShowImage(false);
							}}
						>
							{" "}
							+{" "}
						</button>
						<p>payments</p>
						<p>{totPop}</p>
					</div>
					<div className="payment-body">
						<PoInvPopTable
							poData={po}
							setUrl={setUrl}
							setAlt={setAlt}
							setShowImage={setShowImage}
							type="payment"
							setType={setType}
							setShowHideInvPopForm={setShowHideInvPopForm}
							setInvPopDataToEdit={setInvPopDataToEdit}
						/>
					</div>
				</div>

				<PoInvPopForm
					po={po}
					type={type}
					showHideInvPopForm={showHideInvPopForm}
					setShowHideInvPopForm={setShowHideInvPopForm}
					invPopDataToEdit={invPopDataToEdit}
				/>
				<div className={`inv-payment-image ${showImage ? "show" : "hide"}`}>
					<div className="inv-payment-image-header">
						<p>Invoice / Payment image</p>
						<button onClick={() => setShowImage(false)}>X</button>
					</div>
					<div className="inv-payment-image-wrapper">
						<img src={url} alt={alt} /> <div className="image-review"></div>
					</div>
					<div className="inv-payment-image-footer">
						<button>Email</button>
						<button>SMS</button>
						<button>WhatsApp</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PoInvPop;
