import React, { useContext, useEffect } from "react";
import MenuBlock from "../MenuBlock";
import "../navbar.css";
import { dataBok } from "../../../data/menuData/dataMenuBox";
import { dataErfs } from "../../../data/menuData/dataMenuErfs";
import { MenuContext } from "../../../contexts/MenuContext";
import useOpenModal from "../../../hooks/useModal";

const SignedOutMenu = () => {
	const { openModal } = useOpenModal();
	const { menuStatus, setMenuStatus } = useContext(MenuContext);
	// console.log(`menuStatus`, menuStatus);

	const handleClick = e => {
		// modalOpened a modal window
		openModal({ modalName: e.target.id });
	};

	const handleClickOnNavList = e => {
		// console.log(`nav-list clicked : menuStatus : ${menuStatus}` )
		if (menuStatus) {
			// console.log(`about to change menyStatus`)
			setMenuStatus(true);
			// console.log(`menuStatus changed to : ${menuStatus}`)
		} else {
			setMenuStatus(false);
		}
	};

	return (
		<ul
			className={`nav-list ${menuStatus ? "hide-nav-list" : "show-nav-list"}`}
			onClick={handleClickOnNavList}
		>
			<div className="nav-list-left">
				{/* Erfs */}
				{/* <MenuBlock menuData={dataErfs} /> */}
				{/* Body of Knowledge (Bok) */}
				{/* <MenuBlock menuData={dataBok} classes={"expand"} /> */}
			</div>

			<div className="nav-list-right">
				{/* Sign up */}
				<li className="nav-list-btn">
					<a href="#" onClick={handleClick} id="signup">
						Sign up
					</a>
				</li>
				{/* Sign in */}
				{/* <MenuBlock menuData={dataSignIn} classes={"btn  move-right"} /> */}
				<li className="nav-list-btn ">
					<a href="#" onClick={handleClick} id="signin">
						Sign in
					</a>
				</li>
			</div>
		</ul>
	);
};

export default SignedOutMenu;
