import { Field } from "formik";
import "./Formik.css";
import "./FormikButton.css";
import React, { useContext } from "react";
// import useModal from "../../../modals/useModal";
import { PhotoAppContext } from "../../../../contexts/PhotoAppContext";

const getMediaCatName = namePath => {
	// namePath = namePath
	// 	.replaceAll("[", ".")
	// 	.replaceAll("]", ".")
	// 	.replaceAll("..", ".");
	namePath = namePath.replaceAll("[", ".")
		.replaceAll("]", ".")
		.replaceAll("..", ".").split(".").pop();
	// console.log(`namePath`, namePath);
	const mediaCatName = namePath.substring(0, namePath.lastIndexOf("Media"));
	// console.log(`mediaCatName`,mediaCatName)
	return mediaCatName;
};

const FormikButton = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;

	const { photoAppData, setPhotoAppData } = useContext(PhotoAppContext);

	const handleClick = (e, props) => {
		e.preventDefault();
		// console.log(`e.target`, e.target);
		// console.log(`props`, props);

		// console.log(`photoApData`, photoAppData);

		setPhotoAppData({
			...photoAppData,
			data: { ...props },
			isPhotoAppOpened: true,
		});
	};
	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, meta, form } = props;
					const mediaCat = getMediaCatName(field.name);
					// console.log(`madiaCat`, mediaCat, field.value.length)
					// console.log(`form.values`, form.values)
					return (
						<button className="media-cat-btn" onClick={e => handleClick(e, props)}>
							<p className="media-cat-name">{`${mediaCat} Photos ${field?.value?.length} `}</p>
						</button>
					);
				}}
			</Field>
		</div>
	);
};

export default FormikButton;
