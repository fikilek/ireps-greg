import React, { useContext, useState } from "react";
import "./MediaComponent.css";
import { MediaViewContext } from "../../contexts/MediaViewContext";
import { useEffect } from "react";
import { irepsDictionary } from "../../utils/utils";
import useStorage from "../../hooks/useStorage";

const MediaComponent = props => {
	// console.log(`props`, props);
	const { mediaData, id } = props;
	// console.log(`id`, id);
	// console.log(`mediaData`, mediaData);

	// consume media view context
	const { setMediaViewData } = useContext(MediaViewContext);

	return (
		<div className="media-component">
			{mediaData?.length !== 0 ? (
				mediaData?.map((data, index) => {
					// console.log(`data`, data);
					const name = data?.metaData?.name;
					// console.log(`name`, name);

					// get ml1
					const ml1 = data?.metaData?.customMetadata?.ml1;
					// console.log(`ml1`, ml1);

					let mediaString = "";
					if (ml1 === "asts") {
						const astCat = irepsDictionary.get(
							data?.metaData?.customMetadata?.astCat
						);
						const mediaCat = irepsDictionary.get(
							data?.metaData?.customMetadata?.mediaCategory
						);
						mediaString = `${astCat} ${mediaCat} Photo`;
					}
					if (ml1 === "erfs") {
						mediaString = `Erf Photo`;
					}

					return (
						<button
							key={data.url}
							onClick={() => setMediaViewData({ ...data, id, index, photoName: mediaString })}
						>
							<p className="media-name">{mediaString}</p>
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
