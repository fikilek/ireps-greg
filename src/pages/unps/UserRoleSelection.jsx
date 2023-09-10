import React, { useEffect } from "react";
import "./UserRoleSelection.css";
import { MdEdit } from "react-icons/md";
import useModal from "../../hooks/useModal";
import FormHeader8 from "../../components/forms/formComponents/formHeaders/FormHeader8";
import FormBtn from "../../components/forms/formComponents/formBtn/FormBtn";
import useCollection from "../../hooks/useCollection";
import { useState } from "react";

const areObjectsEqual = (obj1, obj2) => {
	// console.log(`obj1`, obj1)
	// console.log(`obj2`, obj2)
	const stringifiedObj1 = JSON.stringify(obj1);
	const stringifiedObj2 = JSON.stringify(obj2);
	const result = stringifiedObj1 === stringifiedObj2;
	// console.log(`result`, result);

	return result 
}

const UserRoleSelection = params => {
	// console.log(`params`, params);
	// console.log(`rerendering UserRoleSelection -----------------------------`);

	const [claimsChanged, setClaimsChanged] = useState(false);
	const [existingClaims, setExistingClaims] = useState({});
	const [claims, setClaims] = useState({});
	// console.log(`claims`, claims)
	// console.log(`existingClaims`, existingClaims)

	const {
		data: roles,
		error: astsError,
		isPending: astsPending,
		success: astsSuccess,
	} = useCollection("admin", "systt", "user-roles");
	// console.log(`roles`, roles);

	const { closeModal } = useModal();

	const { data } = params.data;
	// console.log(`data`, data);
	// console.log(`selectedRole`, selectedRole);

	useEffect(() => {
		setClaims(data?.customClaims?.roles);
		setExistingClaims(data?.customClaims?.roles);
	}, []);

	const updateRoles = e => {
		// e.preventDefault()
		// console.log(`e.target.id`, e.target.id);
		setClaims(prev => {
			return {
				...prev,
				[e.target.id]: !claims[e.target.id],
			};
		});
	};

	useEffect(() => {
		const objectsEqual = areObjectsEqual(claims, existingClaims);
		// console.log(`objectsEqual`, objectsEqual);
		setClaimsChanged(objectsEqual);
	}, [claims]);

	const handleReset = e => {
		e.preventDefault()
		setClaims(data?.customClaims?.roles);
	}

	// form header dataL

	// erf form
	const formName = (
		<>
			<span className="data-emphasis">{"Update Role"}</span>.
		</>
	);

	// User displayName
	const displayName = (
		<>
			User <span className="data-emphasis">{data.displayName}</span>.
		</>
	);

	const onSubmit = e => {
		e.preventDefault()
		console.log(`updating roles for user ${data.displayName}`, claims);
	}

	return (
		<div className="form-wrapper">
			<div className="form-container simcards-form-container">
				<FormHeader8
					dataLl={formName}
					dataLr={""}
					dataRl={displayName}
					dataRr={""}
					closeModal={closeModal}
				/>
				<form onSubmit={onSubmit} >
					<div className="user-role-selection">
						<div className="urs urs-warning">
							<p>
								The user has the existing roles shown. Click on the checkbox to either
								add a new role or remove the existig role and submit. Roles rules apply
								...click here to learn more.
							</p>
						</div>
						<div className="urs check-btns">
							<div className="user-role">
								{roles?.map((role, index) => {
									const rn = role.userRoleName.toLowerCase().trim();
									// console.log(`rn`, rn);
									// console.log(`claims[${rn}]`, claims[rn]);
									const userHasRole = claims[rn] ? "user-has-role" : "";
									return (
										<div className="role" key={index}>
											<p>{role.userRoleCode}</p>
											<input
												title={role.userRoleName}
												type={"checkbox"}
												className={`role-btn ${userHasRole}`}
												id={role.userRoleName}
												onChange={updateRoles}
												checked={claims[rn]}
											></input>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className="form-btns">
						{/* <FormBtn isPending={false} btnName="reset" /> */}
						<button
							className="form-btn"
							onClick={handleReset}
						>
							reset
						</button>
						<FormBtn
							// isPending={response.isPending}
							btnName="submit"
							disabled={claimsChanged}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserRoleSelection;
