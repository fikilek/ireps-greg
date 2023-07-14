import React from "react";
import "./FormHeader.css";
import { MdClose } from "react-icons/md";
import { useTrnForm } from "../../../../hooks/useTrnForm";

const FormHeader3 = props => {
	const { trn, closeModal } = props;
	// console.log(`trn`, trn);
	const { astData, metaData } = trn;
	const { astCartegory, astState, astNo } = astData;
	const { trnType, trnNo, trnHistory } = metaData;
	const { getAstData } = useTrnForm(trn);

	return (
		<div className="form-header">
			<div>
				<div className="header-line1">
					<p className="data-emphasis1">
						<span>{`${astCartegory} ${trnType}`}</span> Form
					</p>
					<p>
						Trn No: <span>{`${trnNo}`}</span>
					</p>
					<p>
						Trn History: <span>{`${trnHistory}`}</span>
					</p>
				</div>
				<div className="header-line2">
					<p>
						{`${astCartegory}`} no: <span>{astNo}</span>
					</p>
					{getAstData(astCartegory)}
					<p>
						{`${astCartegory}`} state: <span>{astState}</span>
					</p>
				</div>
			</div>

			<button onClick={() => closeModal()}>
				<MdClose />
			</button>
		</div>
	);
};

export default FormHeader3;
