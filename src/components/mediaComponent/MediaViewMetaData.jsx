import React from "react";
import "./MediaViewMetaData.css";

const MediaViewMetaData = props => {
	// console.log(`props`, props);
	const { mediaViewData } = props;
	return (
		<div className="media-view-metadata">
			<p>{mediaViewData?.metaData.mediaCategory}</p>
			<p>{mediaViewData?.metaData.createdAtDatetime}</p>
			<p>
				{mediaViewData?.metaData.createdAtLocation.lat} /{" "}
				{mediaViewData?.metaData.createdAtLocation.lng}
			</p>
			<p>{mediaViewData?.metaData.createdByUser}</p>
		</div>
	);
};

export default MediaViewMetaData;
