import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import FormBtn from "../formComponents/formBtn/FormBtn";
import { object, string } from "yup";
import FormikControl from "../formComponents/formik/FormikControl";
import FormHeader8 from "../formComponents/formHeaders/FormHeader8";
import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Timestamp } from "firebase/firestore";

const validationSchema = object({
	astStateName: string().required("required"),
	astStateDescription: string().required("required"),
});

const AstStatesForm = ({ formData }) => {
	// console.log(`formData`, formData);

	const { addDocument, response, updateDocument } = useFirestore("ast-states");
	const { closeModal } = useModal();

	const { user } = useAuthContext();
	// console.log(`user`, user)

	const [userRoles] = useState({
		...formData,
		metaData: {
			...formData.metaData,
			updatedAtDatetime: Timestamp.now(),
			updatedByUser: user.displayName,
			updatedByUserId: user.uid,
		},
	});

	const onSubmit = values => {
		// console.log(`values`, values);
		if (values.id) {
			updateDocument(values);
		} else {
			addDocument(values);
		}
	};
	// console.log(`response`, response);

	useEffect(() => {
		if (response.success) {
			closeModal();
			toast(`Ast State UPDATED/CREATED" succeesfully!`, {
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
	}, [response, closeModal]);

	const formName = (
		<span className="data-emphasis">{`Ast States Form`}</span>
	);


	return (
		<div className="form-wrapper">
			<div className="form-container user-roles-form-container">
				<FormHeader8
					// form name - dataLl
					dataLl={formName}
					// state = dataLr
					dataLr={''}
					// entity no (eg astNo, trnNo, erfNo)
					dataRl={""}
					closeModal={closeModal}
				/>
				<Formik
					initialValues={userRoles}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik`, formik)
						return (
							<Form>
								<div className="ast-states-form">
									<div className="specific-data">
										{/* userRoleName */}
										<FormikControl
											control="input"
											type="text"
											label="ast state name"
											name="astStateName"
											placeholder="asset state name"
										/>
										{/* userRoleDescription */}
										<FormikControl
											control="input"
											type="text"
											label="ast state description"
											name="astStateDescription"
											placeholder="Ast State Description"
										/>
									</div>
									{/* updated */}
									<div className="updated">
										<FormikControl
											control="input"
											type="text"
											label="updated by user"
											name="metaData.updatedByUser"
											readOnly="readOnly"
											placeholder="updated by user"
										/>

										<FormikControl
											control="datetime"
											label="updated at datetime"
											name="metaData.updatedAtDatetime"
											readOnly="readOnly"
											dateFormat="yyyy MM dd - HH:mm:ss"
											placeholder="updated at datetime"
										/>
									</div>
									{/* create */}
									<div className="created">
										<FormikControl
											control="input"
											type="text"
											label="created by user"
											name="metaData.createdByUser"
											readOnly="readOnly"
											placeholder="created by user"
										/>

										<FormikControl
											control="datetime"
											label="created at datetime"
											name="metaData.createdAtDatetime"
											readOnly="readOnly"
											dateFormat="yyyy MM dd - HH:mm:ss"
											placeholder="dated at datetime"
										/>
									</div>
								</div>
								<div className="form-btns">
									<FormBtn isPending={false} btnName="reset" />
									<FormBtn
										isPending={response.isPending}
										btnName="submit"
										disabled={!formik.isValid || formik.touched}
									/>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default AstStatesForm;
