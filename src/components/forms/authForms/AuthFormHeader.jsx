import React from "react";
import useModal from "../../../hooks/useModal";
import irepsImage1 from '../../../images/irepsImage1.jpg';
import './AuthFormHeader.css'
  

const AuthFormHeader = (props) => {
	const { headerTitleName } = props;
	const { closeModal } = useModal();

	// auth form  - af
	// auth form header - afh

	return (
		<div className="afh">
			<div className="afh-title">
				<h1 className="afh-title-name">{headerTitleName}</h1>
				<img src={irepsImage1} alt="ireps auth" className="afh-title-img" />
			</div>
			<div className="afh-close-btn">
				<div className="btn-div" id="btn-div">
					<button onClick={() => closeModal()}>X</button>
				</div>
			</div>
		</div>
	);
};

export default AuthFormHeader;
