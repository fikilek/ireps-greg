import React from "react";
import { MdDeleteForever, MdEdit, MdEditNote } from "react-icons/md";

// getTrnAstData declaration
const getNewTrnDataWithDeletedSc = (scId, ast, trn) => {
	// console.log(`ast`, ast)
	// console.log(`trn`, trn)

	// get ast id and ast catergory
	const { id } = ast;
	// console.log(`id`, id);

	// get ast category
	const { astCartegory } = ast.astData;

	// get ast array from trn
	const astArray = trn.astData[astCartegory];
	// console.log(`astArray`, astArray);

	// get the ast object with id
	const astObj = astArray.find(ast => ast.id === id);
	// console.log(`astObj`, astObj);

	// onto the astOb, append trnData
	const updatedTrnDataWithNewSc = {
		...astObj,
		trnData: {
			...astObj?.trnData,
			boxInstallation: {
				...astObj.trnData?.boxInstallation,

				scns: astObj.trnData.boxInstallation?.scns.filter(sc => sc.scId !== scId),
			},
		},
	};
	// console.log(`updatedTrnDataWithNewSc`, updatedTrnDataWithNewSc);
	return updatedTrnDataWithNewSc;
};

const TableSc = props => {
	const { setScn, ast, trn, setTrn } = props;
	// console.log(`trn`, trn);

	// get ast id and ast catergory
	const { id } = ast;
	// console.log(`id`, id);

	// get ast category
	const { astCartegory } = ast.astData;

	// get ast array from trn
	const astArray = trn.astData[astCartegory];
	// console.log(`astArray`, astArray);

	// get the ast object with id
	const astObj = astArray.find(ast => ast.id === id);
	// console.log(`astObj`, astObj);

	// get sc array
	const { scns } = astObj.trnData.boxInstallation;
	// console.log(`scns`, scns);

	// delete a sc
	const handleScDelete = e => {
		e.preventDefault();
		// console.log(`e.target.id`, e.target.id);

		// get new trnData with deleted sc
		const newTrnDataWithDeletedSc = getNewTrnDataWithDeletedSc(
			e.target.id,
			ast,
			trn
		);

		// update trn
		setTrn({
			...trn,
			astData: {
				...trn.astData,
				[astCartegory]: [newTrnDataWithDeletedSc],
			},
		});
		// console.log(`scns`, scns);
	};

	// Edit a sc
	const handleScEdit = e => {
		e.preventDefault();
		// console.log(`e.target.id`, e.target.id);
		const scn = scns.find(sc => sc.scId === e.target.id);
		if (scn) {
			// console.log(`scn`, scn);
			setScn(scn);
		}
	};

	return (
		<div className="table table-scns">
			{scns &&
				scns.map(sc => {
					// console.log(`sc`, sc);
					return (
						<div className="sc" key={sc.scId}>
							<p>{sc.scData.meter}</p>
							<p>{sc.scData.cb}</p>
							<p>{sc.scData.erfNo}</p>
							<div className="sc-btns">
								<button type="submit" id={sc.scId} onClick={handleScDelete}>
									<MdDeleteForever />
								</button>
								<button type="submit" id={sc.scId} onClick={handleScEdit}>
									<MdEdit />
								</button>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default TableSc;
