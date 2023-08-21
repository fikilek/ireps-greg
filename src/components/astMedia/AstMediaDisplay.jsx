import React from "react";
import { useState } from "react";
import { irepsDictionary } from "../../utils/utils";
import "./AstMediaDisplay.css";
import AstMediaDisplayHeader from "./AstMediaDisplayHeader";

const AstMediaDisplay = props => {
	// console.log(`props`, props);
	const { mediaType, mediaList, mediaToShow, setMediaToShow } = props;

	// create state for active display
	const [activeDisplay, setActiveDisplay] = useState("photos");

	const showMedia = (e, media) => {
		e.preventDefault();
		// console.log(`display media`, media)
		setMediaToShow({ isShown: true, media });
	};

	const displayMedia = mediaType === activeDisplay ? "show-media" : "hide-media";

	return (
		<div className={`ast-media-display`}>
			<div className="ast-media-display-header">
				<AstMediaDisplayHeader
					activeDisplay={activeDisplay}
					setActiveDisplay={setActiveDisplay}
					mediaType={mediaType}
				/>
			</div>
			<div className={`ast-media-display-body ${displayMedia}  `}>
				<div className="ast-media-display-body-wrapper">
					{mediaList?.map((media, index) => {
						return (
							<div className="media-list-item" key={index}>
								<p className="madiaCat">
									{`${irepsDictionary.get(media?.metaData?.customMetadata?.astCat)}`}{" "}
									{`${irepsDictionary.get(media?.metaData?.customMetadata?.mediaCategory)}`}
								</p>
								<button onClick={e => showMedia(e, media)}>
									<img
										src={media.url}
										alt={media.metaData.customMetadata.mediaCategory}
										width="120rem"
										height="120rem"
									/>
								</button>
								{/* <p className="datetime">Date time</p> */}
								<p className="datetime">{`${media?.metaData?.name?.split("_")[1]}`}</p>
								<p className="datetime">{`${media?.metaData?.name?.split("_")[2]}`}</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default AstMediaDisplay;
