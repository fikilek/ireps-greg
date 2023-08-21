import React from "react";
import "./AstMediaDisplayHeader.css";

const AstMediaDisplayHeader = props => {
	// console.log(`props`, props);

	const { mediaType, activeDisplay, setActiveDisplay } = props;

	const showMediatype = e => {
		e.preventDefault();
		setActiveDisplay(mediaType);
	};

	const hideMediaType = e => {
		e.preventDefault();
		setActiveDisplay(null);
	};

	return (
		<div className="ast-media-display-header">
			<div className="header-wrapper">
				<div className="header-btns">
					<button
						className={mediaType === activeDisplay ? "show-btn" : "hide-btn"}
						onClick={showMediatype}
					>
						+
					</button>
					<button
						className={mediaType === activeDisplay ? "hide-btn" : "show-btn"}
						onClick={hideMediaType}
					>
						-
					</button>
				</div>
				<p className="media-type">{mediaType}</p>
			</div>
		</div>
	);
};

export default AstMediaDisplayHeader;
