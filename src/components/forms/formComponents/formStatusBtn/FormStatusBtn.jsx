import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { timestamp } from "../../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../../hooks/useAuthContext";
import { object, string } from "yup";
import TextError from "../formError/TextError";
import FormikControl from "../formik/FormikControl";
import { useFirestore } from "../../../../hooks/useFirestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Timestamp } from "firebase/firestore";

const validationSchema = object({
	status: string().required("required"),
});

const FormStatusBtn = params => {
	// console.log(`params`, params);

	const { data: formData, tn, options } = params;

	// console.log(`formData`, formData);
	// console.log(`tn`, tn);

	const { response, updateDocument } = useFirestore(tn);

	const { user } = useAuthContext();
	// console.log(`user`, user)

	// fd - formdata
	const [fd] = useState({
		...formData,
		metaData: {
			...formData.metaData,
			updatedAtDatetime: Timestamp.now(),
			updatedByUser: user.displayName,
			updatedByUserId: user.uid,
		},
	});

	const onSubmit = values => {
		console.log(`values`, values);
		updateDocument(values);
	};
	// console.log(`fd`, fd);

	useEffect(() => {
		// console.log(`response`, response);
		if (response.success) {
			toast(`Device status UPDATED succesfully!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}, [response]);

	return (
		<Formik
			initialValues={fd}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{formik => {
				// console.log(`formik`, formik);
				return (
					<Form
						onChange={() => {
							// console.log(`formik.values`, formik.values);
							formik.submitForm();
						}}
					>
						<FormikControl
							control="select"
							type="text"
							name="status"
							placeholder="status"
							options={options}
						/>
					</Form>
				);
			}}
		</Formik>
	);
};

export default FormStatusBtn;
