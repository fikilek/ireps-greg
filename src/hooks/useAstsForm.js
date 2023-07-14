import FormikControl from "../components/forms/formComponents/formik/FormikControl";
import { object, string } from "yup";
import { formSelectOptions } from "../utils/utils";

export const useAstsForm = (ast) => {
	const getFormSection = astCat => {
		switch (astCat) {
			case "meter":
				return (
					<>
						{/* meter phase */}
						<FormikControl
							control="select"
							type="text"
							label="phase"
							name="astData.meter.phase"
							placeholder="phase"
							options={formSelectOptions.meterPhaseOptions}
						/>
						{/* meter type */}
						<FormikControl
							control="select"
							type="text"
							label="type"
							name="astData.meter.type"
							placeholder="type"
							options={formSelectOptions.meterTypeOptions}
						/>
						{/* meter code */}
						<FormikControl
							// readOnly="readOnly"
							control="input"
							type="text"
							label="code"
							name="astData.meter.code"
							placeholder="code"
						/>
					</>
				);

			case "feeder":
				return (
					<>
						{/* meter phase */}
						<FormikControl
							control="input"
							type="text"
							label="phase"
							name="astData.feeder.length"
							placeholder="phase"
						/>
					</>
				);

			case "pole":
				return (
					<>
						{/* type */}
						<FormikControl
							control="select"
							type="text"
							label="type"
							name="astData.pole.type"
							placeholder="type"
							options={formSelectOptions.poleTypeOptions}
						/>
						{/* length */}
						<FormikControl
							control="input"
							type="text"
							label="length"
							name="astData.pole.length"
							placeholder="length"
						/>
						{/* hasLamp */}
						<FormikControl
							control="select"
							type="text"
							label="has lamp"
							name="astData.pole.hasLamp"
							placeholder="has lamp"
							options={formSelectOptions.poleHasLampOptions}
						/>
						{/* condition */}
						<FormikControl
							control="select"
							type="text"
							label="condition"
							name="astData.pole.condition"
							placeholder="condition"
							options={formSelectOptions.poleConditionOptions}
						/>
						{/* code */}
						<FormikControl
							control="input"
							type="text"
							label="code"
							name="astData.pole.code"
							placeholder="code"
						/>
					</>
				);

			case "box":
				return (
					<>
						{/* box type */}
						<FormikControl
							control="select"
							type="text"
							label="box type"
							name="astData.box.type"
							placeholder="box type"
							options={formSelectOptions.boxTypeOptions}
						/>
						{/* diemensinos.length */}
						<FormikControl
							control="input"
							type="text"
							label="length"
							name="astData.box.dimensions.length"
							placeholder="length"
						/>
						{/* diemensinos.width */}
						<FormikControl
							control="input"
							type="text"
							label="width"
							name="astData.box.dimensions.width"
							placeholder="width"
						/>
						{/* diemensinos.height */}
						<FormikControl
							control="input"
							type="text"
							label="height"
							name="astData.box.dimensions.height"
							placeholder="height"
						/>
						{/* location */}
						<FormikControl
							control="select"
							type="text"
							label="location"
							name="astData.box.location"
							placeholder="location"
							options={formSelectOptions.boxLocationOptions}
						/>
						{/* code */}
						<FormikControl
							control="input"
							type="text"
							label="code"
							name="astData.pole.code"
							placeholder="code"
						/>
					</>
				);

			case "cb":
				return (
					<>
						{/* size */}
						<FormikControl
							control="input"
							type="text"
							label="size (Amps)"
							name="astData.cb.size"
							placeholder="size"
						/>
						{/* code */}
						<FormikControl
							control="input"
							type="text"
							label="code"
							name="astData.cb.code"
							placeholder="code"
						/>
					</>
				);

			case "seal":
				return (
					<>
						{/* no */}
						<FormikControl
							control="input"
							type="text"
							label="no"
							name="astData.seal.no"
							placeholder="no"
						/>
						{/* code */}
						<FormikControl
							control="input"
							type="text"
							label="code"
							name="astData.seal.code"
							placeholder="code"
						/>
					</>
				);

			default:
				return null;
		}
	};

	const getValidationSchema = astCat => {
		// console.log(`astCat`, astCat);
		switch (astCat) {
			case "meter":
				return object({
					astData: object({
						astCartegory: string().required("required"),
						astNo: string().required("required"),
						astState: string().required("required"),
						meter: object({
							code: string().required(`required`),
							phase: string().required(`required`),
							type: string().required(`required`),
						}),
					}),
				});

			case "feeder":
				return object({
					astData: object({
						astCartegory: string().required("required"),
						astNo: string().required("required"),
						astState: string().required("required"),
						feeder: object({
							length: string().required(`required`),
						}),
					}),
				});

			case "pole":
				return object({
					astData: object({
						astCartegory: string().required("required"),
						astNo: string().required("required"),
						astState: string().required("required"),
						pole: object({
							type: string().required(`required`),
						}),
					}),
				});

			case "box":
				return object({
					astData: object({
						astCartegory: string().required("required"),
						astNo: string().required("required"),
						astState: string().required("required"),
						box: object().shape({
							dimensions: object({
								length: string().required(`required`),
								width: string().required(`required`),
								height: string().required(`required`),
							}),
						}),
					}),
				});

			case "cb":
				return object({
					astData: object({
						astCartegory: string().required("required"),
						astNo: string().required("required"),
						astState: string().required("required"),
						cb: object({
							size: string().required(`required`),
						}),
					}),
				});

			case "seal":
				return object({
					astData: object({
						astCartegory: string().required("required"),
						astNo: string().required("required"),
						astState: string().required("required"),
						seal: object({
							no: string().required(`required`),
						}),
					}),
				});

			default:
				return object({
					astData: object({
						astCartegory: string().required("required"),
						astNo: string().required("required"),
						astState: string().required("required"),
					}),
				});
		}
	};

	return { getFormSection, getValidationSchema };
};
