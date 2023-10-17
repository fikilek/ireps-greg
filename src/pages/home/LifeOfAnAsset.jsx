import React from "react";

const LifeOfAnAsset = props => {
	const { image, header, content } = props;
	return (
		<div className="what -is what-is-type-a">
			<div className="what-is-header">
				<p>{header}</p>
			</div>
			{/* body - 1fr 1fr */}
			<div className="what-is-body">
				<div className="image">{/* <img src={image.src} alt={image.alt} /> */}</div>
				<div className="content">{content}</div>
			</div>
		</div>
	);
};

export default LifeOfAnAsset;
