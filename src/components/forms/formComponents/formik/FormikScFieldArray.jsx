import { Field, FieldArray } from "formik";
import "./Formik.css";
import React from "react";

// Formik Sc Field Array to add Meter, Cb and ErfNo into a box form during installation
const FormikScFieldArray = props => {
	// console.log(`props`, props);
	const { name, astCat, astCatIndex } = props;
	return (
		<div className={`form-control`}>
			<FieldArray name={name}>
				{props => {
					// console.log(`props`, props.form.values);
					const { push, remove, form } = props;
					return (
						<div>
							<div className="sc-header">
								<p>#</p>
								<p>Meter No</p>
								<p>Cuircuit Breaker</p>
								<p>Erf No</p>
								<p></p>
							</div>
							{form.values.astData[astCat][astCatIndex].trnData.scns.map((scn, index) => {
								// console.log(`scn`, scn);
								return (
									<div className="sc" key={index}>
										<p>{index + 1}</p>
										<div className="meter">
											<Field
												name={`${name}[${index}].meter`}
												placeholder="meter"
												type="text"
											/>
										</div>
										<div className="cb">
											<Field name={`${name}[${index}].cb`} placeholder="cb" type="text" />
										</div>
										<div className="erfNo">
											<Field
												name={`${name}[${index}].erfNo`}
												placeholder="erfNo"
												type="text"
											/>
										</div>
										<div className="sc-btns">
											{
												<button
													disabled={
														form.values.astData[astCat][astCatIndex].trnData.scns.length > 1
															? false
															: true
													}
													type="button"
													className="remove-sc"
													onClick={() => remove(index)}
												>
													-
												</button>
											}

											<button
												disabled={
													scn.meter === "" && scn.cb === "" && scn.erfNo === ""
														? true
														: false
												}
												type="button"
												className="add-sc"
												onClick={() => push({ meter: "", cb: "", erfNo: "" })}
											>
												+
											</button>
										</div>
									</div>
								);
							})}
						</div>
					);
				}}
			</FieldArray>
		</div>
	);
};

export default FormikScFieldArray;
