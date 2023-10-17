import React, { useState } from "react";
import useStorage from "../../hooks/useStorage";
import FormHeader8 from "../forms/formComponents/formHeaders/FormHeader8";
import "./AstMedia.css";
import AstMediaBody from "./AstMediaBody";
import AstMediaView from "./AstMediaView";
import { PropagateLoader } from "react-spinners";
import useModal from "../../hooks/useModal";
import { useEffect } from "react";

const AstMedia = props => {
	// console.log(`props`, props);
	const { astState, astNo, astCartegory } = props?.astData?.data?.astData;
	const { id } = props?.astData?.data;

	// create the sate for the display if the individual media
	const [mediaToShow, setMediaToShow] = useState({
		isShown: false,
		media: "",
	});

	const { closeModal } = useModal();

	// get methods from useStorage
	const { getMediaList } = useStorage();

	// get all media for the astId

	const [mediaList, setMediaList] = useState([]);
	// console.log(`mediaList`, mediaList);

	const [isPending, setIsPending] = useState(true);
	// const isPending = useMemo(() => mediaList, [mediaList?.length]);
	// console.log(`isPending`, isPending);

	useEffect(() => {
		setIsPending(true);
		if (mediaList === undefined || mediaList?.length > 0) {
			setIsPending(false);
		}
	}, [mediaList]);

	if (id) {
		// console.log(`id`, id)
		getMediaList(`asts/${id}`).then(list => {
			if (mediaList?.length === 0) {
				setMediaList(list);
			}
		});
	}

	// form header dataL

	// erf no
	const formName = (
		<>
			<span className="data-emphasis">{"Asset Media"}</span>.
		</>
	);

	// astCartegory
	const astCat = (
		<>
			Ast Category <span className="data-emphasis">{astCartegory}</span>.
		</>
	);

	// no of asts in erf
	const astNumber = (
		<>
			Ast No <span className="data-emphasis">{astNo}</span>.
		</>
	);

	return (
		<div className="ast-media">
			<div className="ast-media-container">
				<div className="ast-media-header">
					<FormHeader8
						// erf no- dataLl
						dataLl={formName}
						// no of asts in erf = dataLr
						dataLr={astCat}
						// no of trns in erf
						dataRl={astNumber}
						// anomalies
						// dataRr={anomalies}
						closeModal={closeModal}
					/>
				</div>

				<div className="ast-media-body">
					{mediaList?.length === 0 ? (
						<div className="loader">
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
