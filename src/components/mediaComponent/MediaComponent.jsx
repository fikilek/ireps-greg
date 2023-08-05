import React, { useContext, useState } from "react";
import "./MediaComponent.css";
import { MediaViewContext } from "../../contexts/MediaViewContext";
import { useEffect } from "react";

const MediaComponent = props => {
	// console.log(`props`, props)
	const { mediaData, id } = props;
	// console.log(`mediaData`, mediaData);

	// consume media view context
  const { setMediaViewData } = useContext(MediaViewContext);

	return (
		<div className="media-component">
			{mediaData?.length !== 0
				? mediaData?.map((data, index) => (
					<button key={data.url} onClick={() => setMediaViewData({ ...data, id, index })}>
							<img src={data.url} alt={index} width="100px" height={"100px"} />
							<p className="media-name">{`${data?.metaData?.createdAtDatetime}`}</p>
						</button>
				  ))
				: <p className="no-photos" >No Photos to show</p>}
		</div>
	);
};

export default MediaComponent;
