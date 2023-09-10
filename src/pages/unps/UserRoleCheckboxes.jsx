import React, { useState } from "react";
import "./UserRoleCheckboxes.css";
import useCollection from "../../hooks/useCollection";
import useModal from "../../hooks/useModal";

const UserRoleCheckboxes = params => {
	// console.log(`params`, params);

	const { openModal } = useModal();

	// get user roles
	const claims = params.data.customClaims.roles;
	// console.log(`claims`, claims);

	const [userClaims, setUserClaims] = useState(claims);
	// console.log(`userClaims`, userClaims);

	// get displayName
	const displayName = params.data.displayName;
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
		// console.log(`claims`, claims);

		openModal({
			modalName: "userRoleSelection",
			payload: { data: params.data, selectedRole: e.target.id },
		});
	};

	// console.log(`claims`, claims);

	return (
		<div className="user-role">
			{roles?.map((role, index) => {
				const rn = role.userRoleName.toLowerCase().trim();
				// console.log(`rn`, rn);
				// console.log(`claims[${rn}]`, claims[rn]);
				const userHasRole = claims[rn] ? "user-has-role" : "";
				return (
					<div className="role" key={index}>
						<button
							className={`role-btn ${userHasRole}`}
							id={role.userRoleName}
							onClick={handleClick}
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
