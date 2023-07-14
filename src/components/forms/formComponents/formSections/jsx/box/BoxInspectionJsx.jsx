import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const BoxInspectionJsx = props => {
	const { ast, trn, astCat, astCatIndex, trnType } = props;

	return (
		<FormSectionTrn
			trn={trn}
			ast={ast}
			astCat={astCat}
			astCatIndex={astCatIndex}
			trnType={trnType}
		>
			<div className="ast">
				<div className="row-1 ast-row read-only-row">
					<div className="data">
						<p className="data-header">Asset Data</p>
						<p>
							Box No - <span>{ast?.astData.astNo}</span>
						</p>
						<p>
							Box Type - <span>{ast?.astData.box.type}</span>
						</p>
						<p>
							Box Color - <span>{ast?.astData.box.color}</span>
						</p>
						<p>
							Box Code - <span>{ast?.astData.box.code}</span>
						</p>
						<p>
							Box Dimensions -<span>H:{ast?.astData.box.dimensions.height}</span>
							{` : `}
							<span>W:{ast?.astData.box.dimensions.width}</span>
							{` : `}
							<span>L:{ast?.astData.box.dimensions.length}</span>
							{` : `}
						</p>
					</div>

					<div className="data">
						<p className="data-header">Installation Data</p>
						{/* TODO: make this to be a reusable component */}
						<p>
							Box Location - premises:
							<span>
								{
									trn.astData[astCat][astCatIndex][`${astCat}Installation`].location
										.premises
								}
							</span>
						</p>
						<p>
							Box Location - exactLocation:
							<span>
								{
									trn.astData[astCat][astCatIndex][`${astCat}Installation`].location
										.exactLocation
								}
							</span>
						</p>
						<p>
							Box Physical Address :
							<span>
								{trn.astData[astCat][astCatIndex][`${astCat}Installation`].astAdr.adr}
							</span>
						</p>
						<p>
							Box gps location :
							<span>
								Lat:{" "}
								{
									trn.astData[astCat][astCatIndex][`${astCat}Installation`].astAdr.gps
										.Latitude
								}
							</span>
							<span>
								Lng:{" "}
								{
									trn.astData[astCat][astCatIndex][`${astCat}Installation`].astAdr.gps
										.Longitude
								}
							</span>
						</p>
						<div>
							<p className="scns">Service Connections</p>

							<div className="scns-row">
								<span>cb</span>
								<span>meter</span>
								<span>erfNo</span>
							</div>
							{trn.astData[astCat][astCatIndex][`${astCat}Installation`].scns &&
								trn.astData[astCat][astCatIndex][`${astCat}Installation`].scns.map(
									(scn, index) => {
										return (
											<div className="scns-row" key={index}>
												<span>{scn.cb}</span>
												<span>{scn.meter}</span>
												<span>{scn.erfNo}</span>
											</div>
										);
									}
								)}
						</div>
					</div>
				</div>
				<div className="row-2 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="exact box location?"
							name={`astData[${astCat}][${astCatIndex}].trnData.location.exactLocation`}
							placeholder="exact box location?"
							options={formSelectOptions.astExactLocationOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="premises?"
							name={`astData[${astCat}][${astCatIndex}].trnData.location.premises`}
							placeholder="premises?"
							options={formSelectOptions.astLocationPremisesOptions}
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="damaged?"
							name={`astData[${astCat}][${astCatIndex}].trnData.damaged`}
							placeholder="damaged?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="lockable?"
							name={`astData[${astCat}][${astCatIndex}].trnData.lockable`}
							placeholder="lockable?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
				</div>
				<div className="row-3 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="box lockable?"
							name={`astData[${astCat}][${astCatIndex}].trnData.boxLock.lockable`}
							placeholder="box lockable?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="is locked?"
							name={`astData[${astCat}][${astCatIndex}].trnData.boxLock.isLocked`}
							placeholder="is locked?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="input"
							type="text"
							label="meters in box?"
							name={`astData[${astCat}][${astCatIndex}].trnData.devicesInBox.howManyMeters`}
							placeholder="meters in box?"
						/>
						<FormikControl
							control="input"
							type="text"
							label="cbs in box?"
							name={`astData[${astCat}][${astCatIndex}].trnData.devicesInBox.howManyCbs`}
							placeholder="cbs in box?"
						/>
					</div>
				</div>
				<div className="row-4 sc-row">
					<FormikControl
						control="scFieldArray"
						type="text"
						name={`astData[${astCat}][${astCatIndex}].trnData.scns`}
						astCat={astCat}
						astCatIndex={astCatIndex}
					/>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default BoxInspectionJsx;
