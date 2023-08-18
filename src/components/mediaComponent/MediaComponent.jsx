import React, { useContext, useState } from "react";
import "./MediaComponent.css";
import { MediaViewContext } from "../../contexts/MediaViewContext";
import { useEffect } from "react";
import { irepsDictionary } from "../../utils/utils";
import useStorage from "../../hooks/useStorage";

const MediaComponent = props => {
	// console.log(`props`, props);
	const { mediaData, id, astId } = props;
	console.log(`astId`, astId);
	// console.log(`mediaData`, mediaData);
	// console.log(`mediaData?.length`, mediaData?.length);

	// get methods from useStorage
	const { isPending, mediaList, getMediaList } = useStorage();
	console.log(`mediaList`, mediaList);
	console.log(`isPending`, isPending);

	getMediaList(`asts/${astId}`);

	useEffect(() => {
		console.log(`mediaList updated`, mediaList)
	},[mediaList])

	// consume media view context
	const { setMediaViewData } = useContext(MediaViewContext);

	return (
		<div className="media-component">
			{mediaData?.length !== 0 ? (
				mediaData?.map((data, index) => {
					const name = data?.metaData?.name;
					return (
						<button
							key={data.url}
							onClick={() => setMediaViewData({ ...data, id, index })}
						>
							<p className="media-name">
								{`${irepsDictionary.get(data?.metaData?.customMetadata?.astCat)}`}{" "}
								{`${irepsDictionary.get(
									data?.metaData?.customMetadata?.mediaCategory
								)}`}
							</p>
							<img src={data.url} alt={index} width="100px" height={"100px"} />
							<p className="media-name">{`${name?.split("_")[1]}`}</p>
							<p className="media-name">{`${name?.split("_")[2]}`}</p>
						</button>
					);
				})
			) : (
				<p className="no-photos">No Photos to show</p>
			)}
		</div>
	);
};

export default MediaComponent;
