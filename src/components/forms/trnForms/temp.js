

									{/* ast adr */}
									<FormSection
										sectionName={"ast-adr"}
										active={active}
										setActive={setActive}
									>
										<FormikControl
											control="input"
											type="text"
											label="asset address"
											name="metaData.updatedByUser"
											placeholder="asset address"
										/>
									</FormSection>
									{/* customer-data */}
									<FormSection
										sectionName={"customer-data"}
										active={active}
										setActive={setActive}
									>
										{/* custormerCartegory */}

										<div className="customer-cartegory">
											<FormikControl
												control="select"
												type="text"
												label="phase"
												name="custormer.astCartegory"
												placeholder="phase"
												options={custormerCartegoryOptions}
											/>
										</div>

										{/* contactPerson */}
										<div className="contact-person">
											{/* contactPerson - surname */}
											<FormikControl
												control="input"
												type="text"
												label="surname"
												name="customer.contactPerson.surname"
												placeholder="Surname"
											/>
											{/* contactPerson - name */}
											<FormikControl
												control="input"
												type="text"
												label="name"
												name="customer.contactPerson.name"
												placeholder="Name"
											/>
											{/* contactPerson - emailAdr */}
											<FormikControl
												control="input"
												type="text"
												label="email adr"
												name="customer.contactPerson.emailAdr"
												placeholder="Email Adr"
											/>
											{/* contactPerson - cellNo */}
											<FormikControl
												control="input"
												type="text"
												label="cell on"
												name="customer.contactPerson.cellNo"
												placeholder="cell on"
											/>
											{/* contactPerson - whatsAppNo */}
											<FormikControl
												control="input"
												type="text"
												label="whatssapp no"
												name="customer.contactPerson.whatsApp"
												placeholder="WhatsApp No"
											/>
											{/* contactPerson - landLineNo */}
											<FormikControl
												control="input"
												type="text"
												label="landline no"
												name="customer.contactPerson.landLineNo"
												placeholder="Landline No"
											/>
										</div>

										<div className="juristic-person">
											{/* juristicPerson */}
											{/* juristicPerson - registeredName */}
											<FormikControl
												control="input"
												type="text"
												label="landline no"
												name="customer.contactPerson.landLineNo"
												placeholder="Landline No"
											/>
											{/* juristicPerson - registrationNo */}
											<FormikControl
												control="input"
												type="text"
												label="landline no"
												name="customer.contactPerson.landLineNo"
												placeholder="Landline No"
											/>
											{/* juristicPerson - tradingName*/}
											<FormikControl
												control="input"
												type="text"
												label="landline no"
												name="customer.contactPerson.landLineNo"
												placeholder="Landline No"
											/>
										</div>

										{/* warmBody */}
										<div className="warmbody">
											{/* warmBody - surname */}
											<FormikControl
												control="input"
												type="text"
												label="surname"
												name="customer.warmbody.surname"
												placeholder="Surname"
											/>
											{/* warmBody - name */}
											<FormikControl
												control="input"
												type="text"
												label="name"
												name="customer.warmbody.name"
												placeholder="Name"
											/>
											{/* warmBody - idNo */}
											<FormikControl
												control="input"
												type="text"
												label="id no"
												name="custormer.warmbdoy.idNo"
												placeholder="Id No"
											/>
											{/* warmBody - gender (Male/Female/None) */}
											<FormikControl
												control="select"
												type="text"
												label="gender"
												name="custormer.warmbdoy.gender"
												placeholder="Gender"
												options={genderOptions}
											/>
										</div>
									</FormSection>
									{/* trn-data */}
									<FormSection
										sectionName={"trn-data"}
										active={active}
										setActive={setActive}
									>
										{trn &&
											trn.astData.astCartegory &&
											getTrnFormSection(trn.astData.astCartegory, trn.metaData.trnType)}
									</FormSection>
									{/* metadata */}
									<FormSection
										sectionName={"metadata"}
										active={active}
										setActive={setActive}
									>
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
									</FormSection>
									<div className="form-btns">
										<FormBtn isPending={false} btnName="reset" />
										<FormBtn
											isPending={response.isPending}
											btnName="submit"
											disabled={disabled}
										/>
									</div>


  grid-template-areas:
    "fs-ast-adr fs-ast-adr"
    "fs-trn-data fs-trn-data"
    "fs-customer-data fs-customer-data"
    /* installation, commissioning, inspection, audit, etc  */
    "fs-metadata fs-metadata"
    "form-btns form-btns"
	;
	
	// //////////////////////////////////////////////////
												<div className="row-2 ast-row">
												<div className="half-row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="meter no"
														name={`astData[${astCat}][${astCatIndex}].astData.astNo`}
														placeholder="Meter No"
													/>
													<FormikControl
														// readOnly={true}
														control="input"
														type="text"
														label="searial no"
														name={`astData[${astCat}][${astCatIndex}].astData.astSerialNo`}
														placeholder="Serail No"
													/>
												</div>
												<div className="half-row-50-50">
													<FormikControl
														control="select"
														type="text"
														label="phase"
														name={`astData[${astCat}][${astCatIndex}].astData.${astCat}.phase`}
														placeholder="Phase"
														options={formSelectOptions.meterPhaseOptions}
													/>
													<FormikControl
														// readOnly={true}
														control="select"
														type="text"
														label="type"
														name={`astData[${astCat}][${astCatIndex}].astData.${astCat}.type`}
														placeholder="Type"
														options={formSelectOptions.meterTypeOptions}
													/>
												</div>
</div>
											
											// ///////////////////////////////////////////

																			<div className="audit-data-section installation-data">
									{" "}
									<FormSectionTrnAudit
										trn={trn}
										ast={ast}
										astCatIndex={astCatIndex}
										usage={"subSection1"}
										subSectionName={"Installation Data"}
										trnType={trnType}
									>
										<div className="fs-wrapper">
											<div className="row-2 ast-row">
												<div className="meter-adr">
													<FormikControl
														control="input"
														type="text"
														label="meter address"
														name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.astAdr.adr`}
														placeholder="Meter Adr"
													/>
												</div>
												<div className="meter-gps">
													<FormikControl
														// readOnly={true}
														control="input"
														type="text"
														label="meter gps(lat/lon)"
														name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.astAdr.gps`}
														placeholder="Meter Gps"
													/>
												</div>
											</div>
											<div className="row-3 ast-row">
												<FormikControl
													control="select"
													type="text"
													label="is meter outside or inside premises?"
													name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.location.premises`}
													placeholder="Service Connection Entry"
													options={formSelectOptions.astLocationPremisesOptions}
												/>
												<FormikControl
													control="select"
													type="text"
													label="is meter inside box?"
													name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.location.insideBox`}
													placeholder="inside Box"
													options={formSelectOptions.yesNoOptions}
												/>
											</div>
											<div className="row-4 ast-row">
												<FormikControl
													control="select"
													type="text"
													label="exact location?"
													name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.location.exactLocation`}
													placeholder="Exact Location"
													options={formSelectOptions.astExactLocationOptions}
												/>
												<FormikControl
													control="select"
													type="text"
													label="service connection"
													name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.serviceConnection.connection`}
													placeholder="Service Connection Entry"
													options={formSelectOptions.serviceConnectionEntryOptions}
												/>
											</div>
											<div className="row-5 ast-row">
												<FormikControl
													control="input"
													type="text"
													label="keypad serial no"
													name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.keyPad.serialNo`}
													placeholder="Keypad Serial No"
												/>
												<FormikControl
													readOnly={true}
													control="input"
													type="text"
													label="keypad photos"
													name={`astData[${astCat}][${astCatIndex}].trnData.meterInstallation.keyPad.photos.length`}
													placeholder="Keypad Photos"
												/>
											</div>
										</div>
									</FormSectionTrnAudit>
								</div>