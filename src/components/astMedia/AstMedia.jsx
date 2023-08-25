import React, { useState } from "react";
import useStorage from "../../hooks/useStorage";
import FormHeader6 from "../forms/formComponents/formHeaders/FormHeader6";
import "./AstMedia.css";
import AstMediaBody from "./AstMediaBody";
import AstMediaView from "./AstMediaView";
import { PropagateLoader } from "react-spinners";

const AstMedia = props => {
	// console.log(`props`, props);
	const { astState, astNo, astCartegory } = props?.astData?.data?.astData;
	const { id } = props?.astData?.data;

	// create the sate for the display if the individual media
	const [mediaToShow, setMediaToShow] = useState({
		isShown: false,
		media: "",
	});

	// get methods from useStorage
	const { isPending, mediaList, getMediaList } = useStorage();
	// console.log(`mediaList`, mediaList);
	// console.log(`mediaList.length`, mediaList.length);

	// get all media for the astId
	if (id) {
		// console.log(`id`, id)
		getMediaList(`asts/${id}`);
	}

	return (
		<div className="ast-media">
			<div className="ast-media-container">
				<div className="ast-media-header">
					<FormHeader6
						formName={"Asset Media"}
						astCartegory={astCartegory}
						astState={astState}
						astNo={astNo}
					/>
				</div>

				<div className="ast-media-body">

					{mediaList?.length === 0 ? (
						<div className="loader" >
							<PropagateLoader
								color="orange"
								loading={mediaList.length === 0}
								size={13}
								aria-label="Loading Spinner"
								data-testid="loader"
							/>
						</div>
					) : (
						<AstMediaBody
							mediaList={mediaList}
							mediaToShow={mediaToShow}
							setMediaToShow={setMediaToShow}
						/>
					)}

					<div
						className={`ast-media-view-wrapper ${
							mediaToShow.isShown ? "show-media" : "hide-media"
						} `}
					>
						<AstMediaView mediaToShow={mediaToShow} setMediaToShow={setMediaToShow} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AstMedia;
