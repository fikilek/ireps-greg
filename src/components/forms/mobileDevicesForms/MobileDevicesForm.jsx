import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdLockClock, MdPerson } from "react-icons/md";
import { timestamp } from "../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../hooks/useAuthContext";
import FormBtn from "../formComponents/formBtn/FormBtn";
import { object, string } from "yup";
import TextError from "../formComponents/formError/TextError";
import FormikControl from "../formComponents/formik/FormikControl";
import FormHeader1 from "../formComponents/formHeaders/FormHeader1";
import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = object({
	oem: string().required("required"),
	modelName: string().required("required"),
	modelCode: string().required("required"),
	serialNumber: string().required("required"),
	IEMI: string().required("required"),
	macNumber: string().required("required"),
	// memory: string().required("required"),
});

const MobileDevicesForm = ({ formData }) => {
	// console.log(`formData`, formData);

	const { addDocument, response, updateDocument } =
		useFirestore("mobile-devices");
	const { closeModal } = useModal();

	const { user } = useAuthContext();
	// console.log(`user`, user)

	const [mobileDevices] = useState({
		...formData,
		metaData: {
			...formData.metaData,
			updatedAtDatetime: timestamp.fromDate(new Date()),
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
			toast(`Mobile Devices UPDATED/CREATED" succeesfully!`, {
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
			<div className="form-container stores-form-container">
				<FormHeader1
					formName="Mobile Device Form"
					fn={`Device No: ${mobileDevices.deviceNo}`}
					closeModal={closeModal}
				/>
				<Formik
					initialValues={mobileDevices}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						const disable = !(formik.isValid && formik.dirty);
						// console.log(`formik.dirty`, formik.dirty);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`formState`, disable);
						return (
							<Form>
								<div className="mobile-devices-form">
									<div className="specific-data">
										{/* oem */}
										<FormikControl
											control="input"
											type="text"
											label="oem"
											name="oem"
											placeholder="oem"
										/>
										{/* modelName */}
										<FormikControl
											control="input"
											type="text"
											label="model name"
											name="modelName"
											placeholder="Model Name"
										/>
										{/* serialNumber */}
										<FormikControl
											control="input"
											type="text"
											label="Serial Number"
											name="serialNumber"
											placeholder="Serial Number"
										/>
										{/* modelCode */}
										<FormikControl
											control="input"
											type="text"
											label="model code"
											name="modelCode"
											placeholder="Model Code"
										/>
										{/* IEMI */}
										<FormikControl
											control="input"
											type="text"
											label="IEMI"
											name="IEMI"
											placeholder="International Mobile Equipment Identity"
										/>
										{/* macNumber */}
										<FormikControl
											control="input"
											type="text"
											label="mac number"
											name="macNumber"
											placeholder="Mac Number"
										/>
										{/* memory */}
										{/* <FormikControl
									control="input"
									type="text"
									label="memory"
									name="memory"
									placeholder="memory"
								/> */}
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
										disabled={disable}
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

export default MobileDevicesForm;
