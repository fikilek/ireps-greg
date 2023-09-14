import React, { useContext, useEffect, useState } from "react";
import "./UserRoleCheckboxes.css";
import useCollection from "../../hooks/useCollection";
import useModal from "../../hooks/useModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig/fbConfig";
import { ClaimsContext } from "../../contexts/ClaimsContext";
import useAuthContext from "../../hooks/useAuthContext";

const UserRoleCheckboxes = params => {
	// console.log(`UserRoleCheckboxes params`, params);

	const { user } = useAuthContext();
	// console.log(`user`, user);

	// get user uid 
	const userUid = user.uid
	// console.log(`userUid`, userUid);

	const { customClaims, setCustomClaims } = useContext(ClaimsContext);
	// console.log(`customClaims`, customClaims);

	const uidFromUpdatedCclaim = customClaims?.uid;
	// console.log(`uidFromUpdatedCclaim`, uidFromUpdatedCclaim);

	const uidFromParams = params.data?.uid;
	// console.log(`uidFromParams`, uidFromParams);

	const { openModal } = useModal();

	const controllerRow = (userUid === uidFromParams) ? 'controller-row' : ''
	const controllerBtn = (userUid === uidFromParams) ? 'controller-btn' : ''

	// get user roles
	const claims = params.data.customClaims.roles;
	// console.log(`claims`, claims);

	// const unsub = onAuthStateChanged(auth, user => {
	// 	// console.log(`user`, user);

	// 	auth.currentUser.getIdTokenResult().then(userIdToken => {
	// 		console.log(
	// 			`userIdToken.claims.roles`,
	// 			userIdToken.claims.roles
	// 		);
	// 	});
	// })

	const [userClaims, setUserClaims] = useState(claims);
	// console.log(`userClaims`, userClaims);

	useEffect(() => {
		if (customClaims && uidFromUpdatedCclaim === uidFromParams) {
			setUserClaims(customClaims.customClaims.roles);
		}
	}, [customClaims]);

	// get displayName
	// const displayName = params.data.displayName;
	// console.log(`displayName`, displayName);

	const {
		data: roles,
		error: astsError,
		isPending: astsPending,
		success: astsSuccess,
	} = useCollection("admin", "systt", "user-roles");
	// console.log(`roles`, roles);

	const handleClick = e => {
		e.preventDefault();

		// console.log(`e.target.id`, e.target.id);
		// console.log(`params.data`, params.data);

		const roleData = {
			...params.data,
			customClaims: {
				...params.data.customClaims,
				roles: userClaims,
			},
		};

		openModal({
			modalName: "userRoleSelection",
			payload: { data: roleData, selectedRole: e.target.id },
		});
	};

	// console.log(`claims`, claims);

	return (
		<div className={`user-role ${controllerRow}`}>
			{roles?.map((role, index) => {
				const rn = role.userRoleName.toLowerCase().trim();
				// console.log(`rn`, rn);
				// console.log(`claims[${rn}]`, claims[rn]);
				const userHasRole = userClaims[rn] ? "user-has-role" : "";
				return (
					<div className="u-role" key={index}>
						<button
							className={`role-btn ${userHasRole} ${controllerBtn} `}
							id={role.userRoleName}
							onClick={handleClick}
							title={role.userRoleName}
						>
							{role.userRoleCode}
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default UserRoleCheckboxes;
