import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdLockClock, MdPerson } from "react-icons/md";
import { timestamp } from "../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../hooks/useAuthContext";
import FormBtn from "../formComponents/formBtn/FormBtn";
import { object, string } from "yup";
// import TextError from "../formComponents/formError/TextError";
import FormikControl from "../formComponents/formik/FormikControl";
import FormHeader1 from "../formComponents/formHeaders/FormHeader1";
import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = object({
	userRoleName: string().required("required"),
	userRoleDescription: string().required("required"),
});

const UserRolesForm = ({ formData }) => {
	// console.log(`formData`, formData);

	const { addDocument, response, updateDocument } = useFirestore("user-roles");
	const { closeModal } = useModal();

	const { user } = useAuthContext();
	// console.log(`user`, user)

	const [userRoles] = useState({
		...formData,
		metaData: {
			...formData.metaData,
			updatedAtDatetime: timestamp.fromDate(new Date()),
			updatedByUser: user.displayName,
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
			toast(`New User Role  UPDATED/CREATED" succeesfully!`, {
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

	return (
		<div className="form-wrapper">
			<div className="form-container user-roles-form-container">
				<FormHeader1 formName="User Roles Form" closeModal={closeModal} />
				<Formik
					initialValues={userRoles}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik`, formik)
						return (
							<Form>
								<div className="user-roles-form">
									<div className="specific-data">
										{/* userRoleName */}
										<FormikControl
											control="input"
											type="text"
											label="usere role name"
											name="userRoleName"
											placeholder="user role  name"
										/>
										{/* userRoleDescription */}
										<FormikControl
											control="input"
											type="text"
											label="User Role Description"
											name="userRoleDescription"
											placeholder="stores address"
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

export default UserRolesForm;
