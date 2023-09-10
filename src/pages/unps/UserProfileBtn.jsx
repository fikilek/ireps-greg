import React from "react";
import { MdEdit } from "react-icons/md";
import useModal from "../../hooks/useModal";

const UserProfileBtn = params => {
	const { openModal } = useModal();
  // console.log(`params`, params)
  
  // get user data
  const {displayName} = params.data
	const { data, disabled } = params;
	// const color = disabled ? "lightgrey" : `green`;
	// const iconStyles = { color, fontSize: "1.8rem" };

	const handleClick = e => {
		e.preventDefault();
		if (!disabled) {
			openModal({ modalName: "userProfile", payload: data });
		}
	};

	return (
		<button className="form-edit-btn table-row-btn" onClick={handleClick}>
      <p>{`${displayName.split(" ")[0]}`}'s Profile</p>
		</button>
	);
};

export default UserProfileBtn;
