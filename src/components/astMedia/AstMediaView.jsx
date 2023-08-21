import React from "react";
import "./AstMediaView.css";
import {
	MdClose,
	MdDeleteForever,
	MdPlayArrow,
	MdStopCircle,
} from "react-icons/md";
import { irepsDictionary } from "../../utils/utils";
import ProgressBar from "@ramonak/react-progress-bar";

const AstMediaView = props => {
	console.log(`props`, props);
	const { mediaToShow, setMediaToShow } = props;

	const metaData = props?.mediaToShow?.media?.metaData;
	console.log(`metaData`, metaData);

	const showHideMedia = mediaToShow.isShown ? "show-media" : "hide-media";

	const closeAstMediaView = e => {
		e.preventDefault();
		setMediaToShow(prev => {
			return {
				isShown: false,
				media: "",
			};
		});
	};

	return (
		<div className={`ast-media-view ${showHideMedia} `}>
			<div className="ast-media-view-body">
				<div className="media">
					<div className="media-container">
						<img src={mediaToShow.media.url} alt="" />
					</div>
					<div className="media-data">
						{/* <p className="media-info name">{`${	metaData?.name }`}</p> */}
						<button className="media-info cat">
							{`${irepsDictionary.get(metaData?.customMetadata?.astCat)}`}{" "}
							{`${irepsDictionary.get(metaData?.customMetadata?.mediaCategory)}`}{" "}
							{`${metaData?.customMetadata?.mediaType}`}{" "}
						</button>
						<button className="media-info gps">{`${metaData?.customMetadata?.lat} / ${metaData?.customMetadata?.lng}`}</button>
						<button className="media-info datetime">
							{`${metaData?.name?.split("_")[1]} ${metaData?.name?.split("_")[2]}`}{" "}
						</button>
					</div>
				</div>
				<div className="controls">
					<button
						className="control-btn media-close-btn"
						onClick={closeAstMediaView}
					>
						<MdClose />
					</button>
					<button className="control-btn delete-btn">
						<MdDeleteForever />
					</button>
					<button className="control-btn play-btn">
						<MdPlayArrow />
					</button>
					<button className="control-btn stop-btn">
						<MdStopCircle />
					</button>
				</div>
			</div>
			<div className="ast-media-view-footer">
				<ProgressBar baseBgColor="#e0e0de" completed={60} bgColor="#FF9800" />
			</div>
		</div>
	);
};

export default AstMediaView;
