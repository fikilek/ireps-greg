import React from "react";
import "./AstMediaBody.css";
import AstMediaDisplay from "./AstMediaDisplay";

const AstMediaBody = props => {
	// console.log(`props`, props);
  const { mediaList, mediaToShow, setMediaToShow } = props;
  // const {PhotosList, VoiceClipsList, VideosList} = mediaList
	return (
		<div className="amd">
			<div className="amd-section photos">
				<AstMediaDisplay
					mediaType={"photos"}
					mediaList={mediaList}
					mediaToShow={mediaToShow}
					setMediaToShow={setMediaToShow}
				/>
			</div>
			<div className="amd-section voice-clips">
				<AstMediaDisplay
					mediaType={"voice clips"}
					// mediaList={mediaList}
					setMediaToShow={setMediaToShow}
				/>
			</div>

			<div className="amd-section videos">
				<AstMediaDisplay
					mediaType={"videos"}
					// mediaList={mediaList}
					setMediaToShow={setMediaToShow}
				/>
			</div>
		</div>
	);
};

export default AstMediaBody;
