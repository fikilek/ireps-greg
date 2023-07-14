import React, { useContext, useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { FaRubleSign } from "react-icons/fa";
import "./Header.css";
import { NavLink, Outlet } from "react-router-dom";
import SignedInMenu from "../../components/navbar/signedIn/SignedInMenu";
import SignedOutMenu from "../../components/navbar/signedOut/SignedOutMenu";
import Modal from "../../components/modals/Modal";
import { UserContext } from "../../contexts/UserContext";
import { MenuContext } from "../../contexts/MenuContext";
import useAuthContext from "../../hooks/useAuthContext";
import { PropagateLoader } from "react-spinners";
import { isPending } from "@reduxjs/toolkit";

const Header = () => {
	const { menuStatus, setMenuStatus } = useContext(MenuContext);
	const { user, isAuthReady } = useAuthContext();
	// console.log(`user`, user);

	return (
		<div className="header-container">
			<header>
				{/* <div className="container"> */}
				<nav>
					<div className="logo">
						<NavLink to="/">
							<FaRubleSign />
						</NavLink>
					</div>

					{isAuthReady ? (
						user ? (
							<SignedInMenu />
						) : (
							<SignedOutMenu />
						)
					) : (
						// <div className="test-nav">navbar</div>
						<div className="loading-spinner">
							<PropagateLoader
								color="#36d7b7"
								loading={!isAuthReady}
								size={15}
								aria-label="Loading Spinner"
								data-testid="loader"
							/>
						</div>
					)}

					<div className="menu-icons" onClick={() => setMenuStatus(!menuStatus)}>
						{menuStatus ? <MdMenu /> : <MdClose />}
					</div>
				</nav>
			</header>
			<div className="pages">
				<Outlet />
			</div>
		</div>
	);
};

export default Header;

// TODO: Introduce React Router
