import React from "react";
import "./FormHeader6.css";
import { MdClose } from "react-icons/md";
import useModal from "../../../../hooks/useModal";

const FormHeader6 = props => {
	// console.log(`props`, props)
	const { formName, astState, astNo, astCartegory } = props;

	const {closeModal} = useModal()

	return (
		<div className="form-header">
			<div className="header-left">
				<p className="form-header-paragraph form-name data-emphasis">{formName}</p>

				<p className="form-header-paragraph ast-sate">
					Ast State: <span className="data-emphasis">{astState}</span>
				</p>

				<p className="form-header-paragraph ast-no">
					Ast No: <span className="data-emphasis">{astNo}</span>
				</p>
			</div>
			<div className="header-right">
				<p className="form-header-paragraph ast-cartegory">
					Ast Cartegory <span className="data-emphasis">{astCartegory}</span>{" "}
				</p>
				<button onClick={() => closeModal()}>
					<MdClose />
				</button>
			</div>
		</div>
	);
};

export default FormHeader6;
