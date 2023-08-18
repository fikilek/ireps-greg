import { Field } from "formik";
import "./Formik.css";
import "./FormikButton.css";
import React, { useContext, useEffect } from "react";
// import useModal from "../../../modals/useModal";
import { PhotoAppContext } from "../../../../contexts/PhotoAppContext";
import { irepsDictionary } from "../../../../utils/utils";

const getMediaCatName = namePath => {
	// namePath = namePath
	// 	.replaceAll("[", ".")
	// 	.replaceAll("]", ".")
	// 	.replaceAll("..", ".");
	namePath = namePath
		.replaceAll("[", ".")
		.replaceAll("]", ".")
		.replaceAll("..", ".")
		.split(".")
		.pop();
	// console.log(`namePath`, namePath);
	const mediaCatName = namePath.substring(0, namePath.lastIndexOf("Media"));
	// console.log(`mediaCatName`,mediaCatName)
	return mediaCatName;
};

const FormikButton = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;

	const { photoAppData, setPhotoAppData } = useContext(PhotoAppContext);

	useEffect(() => {
		return () => {
			// console.log(`RESETING photoAppData context`);
			setPhotoAppData({
				data: "",
				isPhotoAppOpened: false,
			});
		};
	}, []);

	const handleClick = (e, btnProps) => {
		e.preventDefault();
		// console.log(`e.target`, e.target);
		// console.log(`btnProps`, btnProps);

		// console.log(`photoApData`, photoAppData);

		setPhotoAppData({
			...photoAppData,
			data: { ...btnProps },
			isPhotoAppOpened: true,
		});
	};
	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{btnProps => {
					// console.log(`btnProps`, btnProps);
					const { field, meta, form } = btnProps;
					const mediaCat = getMediaCatName(field.name);
					// console.log(`madiaCat`, mediaCat, field.value.length)
					// console.log(`form.values`, form.values)
					return (
						<button className="media-cat-btn" onClick={e => handleClick(e, btnProps)}>
							<p className="media-cat-name">{`${irepsDictionary.get(
								mediaCat
							)} Photos `}</p>
						</button>
					);
				}}
			</Field>
		</div>
	);
};

export default FormikButton;
