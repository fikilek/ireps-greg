import { formSects } from "../components/forms/formComponents/formSections/formSects";

export const useErf = () => {

	const getAstData = (erf) => {
		// an erf already has an array of all asts in it. They are in asts property. Go inside asts property and extract needed astData as well as catInstallation ( and catCommissining data if it there).

		// step 1: destructire asts array
		const { asts } = erf;
		// console.log(`asts`, asts);

		if (!asts) return null;

		// create astData object. THis will go into trn inspection object
		const astData = {};

		// step 2: iterate through asts to get each ast
		asts &&
			asts.forEach(ast => {
				// console.log(`ast---------------------------------`, ast);

				// destructure astId
				const { astId } = ast;
				// console.log(`astId`, astId);

				// get astCat from ast
				const astCat = ast.astData.astCartegory;
				// console.log(`astCat`, astCat);

				// get trnData from formSects and insert into ast
				const { trnData } = formSects[astCat].inspection;
				// console.log(`trnData`, trnData);

				// insrt into ast
				ast = {
					...ast,
					trnData,
				};

				if (astCat) {
					if (!astData[astCat]) {
						// we dont have astData[astCat], create it
						astData[astCat] = [];
						// console.log(`astData[astCat]`, astData[astCat]);

						// remove trnMetaData rom ast
						delete ast.trnMetaData;
						// console.log(`ast`, ast);

						// push trnObject into astData[astCat]
						astData[astCat].push(ast);
					} else {
						// console.log(`astCat [${astCat}] alrerady EXIST in the mix`);

						// we already have astData[astCat]. Check is astId is already present in astData[astCat].
						const astIdExist = astData[astCat].some(ast => ast.astId === astId);
						if (astIdExist) {
							// There already is astId in the mix
							// console.log(`There is astId`, astId);

							// removeastData and trnMetaData rom ast
							delete ast.trnMetaData;
							delete ast.astData;
							delete ast.astId;
							// console.log(`ast`, ast);

							// extract data
							const astTrnName = Object.entries(ast)[0][0];
							// console.log(`astTrnName`, astTrnName);

							// fint the index of the existing astId
							const astIdIndex = astData[astCat].findIndex(ast => ast.astId === astId);
							// console.log(`astIdIndex`, astIdIndex);

							// insert ast into astData.[astCat][index]
							astData[astCat][astIdIndex] = {
								...astData[astCat][astIdIndex],
								[astTrnName]: ast[astTrnName],
								// trnData
							};
							// astData[astCat].with(Number(astIdIndex), ast[`${astCat}Commissioning`] );
							// console.log(`astData[astCat][astIdIndex]`, astData[astCat][astIdIndex]);
							// console.log(`astData[${astCat}]`, astData[astCat]);
						} else {
							// there is no astId yet
							// console.log(`There is NO astId`, astId);
							// push trnObject into astData[astCat]
							astData[astCat].push(ast);
							// console.log(`astData[astCat]`, astData[astCat]);
						}
					}
				}
			});

		// console.log(`astData`, astData);

		return astData;
	};

	return { getAstData };
};
