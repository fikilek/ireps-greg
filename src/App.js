import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

import "./App.css";

// import pages
import Header from "./pages/header/Header";
import Home from "./pages/home/Home";
import Dbd from "./pages/dbd/Dbd";
import Erfs from "./pages/erfs/Erfs";
import Bok from "./pages/bok/Bok";
import Admin from "./pages/admin/Admin";
import Unp from "./pages/unps/UserProfile";
import NoPageFound from "./pages/errors/NoPageFound";
import Stores from "./pages/stores/Stores";

// import components
import Signout from "./components/forms/authForms/Signout";
import Modal from "./components/modals/Modal";

// import ModalContext and UserContext
import ModalContextProvider from "./contexts/ModalContext.js";
import { UserContextProvider } from "./contexts/UserContext";
import { MenuContextProvider } from "./contexts/MenuContext";

// import redux store
import store from "./store/irepsStore";
import { Provider } from "react-redux";
import Sch from "./pages/sch/Sch";
import { PoContextProvider } from "./contexts/PoContext";
import PgDbdMl2Meter from "./pages/dbd/dbdMeters/DbdMeters";
import DbdBoxes from "./pages/dbd/dbdBoxes/DbdBoxes";
import DbdMeters from "./pages/dbd/dbdMeters/DbdMeters";
import DbdPoles from "./pages/dbd/dbdPoles/DbdPoles";
import AuthContextProvider from "./contexts/AuthContextProvider";
import Signin from "./components/forms/authForms/Signin";
import RequireAuth from "./components/requireAuth/RequireAuth";
import SigninPage from "./pages/signinPage/SigninPage";
import { ToastContainer } from "react-toastify";
import TableWithAddRecordBtn from "./components/table/TableWithAddRecordBtn";
import Sch1 from "./pages/sch/Sch1";
import Asts from "./pages/asts/Asts";
import Trns from "./pages/trns/Trns";
import FormStateContextProvider from "./contexts/FormStateContextProvider";
import MediaViewContextProvider from "./contexts/MediaViewContext";
import PhotoAppContextProvider from "./contexts/PhotoAppContext";
import GeocodingContextProvider from "./contexts/GeocodingContext";
import ErfsContextProvider from "./contexts/ErfsContext";
import ReverseGeocodingContextProvider from "./contexts/ReverseGeocodingContext";
import CliamsContextProvider from "./contexts/ClaimsContext";
import LandingPage from "./pages/home/LandingPage";
import AdminMain from "./pages/admin/AdminMain";
import NotAuthenticated from "./pages/auth/NotAuthenticated";

// console.log(`store`, store)
// console.log(`UserContextProvider`, UserContextProvider)

function App() {
	return (
		<>
			<CliamsContextProvider>
				<ErfsContextProvider>
					<ReverseGeocodingContextProvider>
						<GeocodingContextProvider>
							<PhotoAppContextProvider>
								<MediaViewContextProvider>
									<Provider store={store}>
										<FormStateContextProvider>
											<ModalContextProvider>
												<AuthContextProvider>
													<MenuContextProvider>
														<PoContextProvider>
															<div className="app">
																<BrowserRouter>
																	{/* <Header /> */}

																	{/* <div className="pages"> */}
																	{/* <div className="header-container"> */}
																	<Routes>
																		<Route path={"/"} element={<Header />}>
																			<Route index element={<LandingPage />} />
																			<Route path={"landing-page"} element={<LandingPage />} />

																			<Route path="/dbd" element={<Home />} />

																			{/* <Route
																				element={
																					<RequireAuth>
																						<Trns />
																					</RequireAuth>
																				}
																			> */}
																			{/* assets section -----------------------------------------------------*/}
																			{/* path to assets main page [ml1 = asts] */}
																			<Route path="/asts">
																				<Route
																					index
																					element={
																						<RequireAuth>
																							<Asts />
																						</RequireAuth>
																					}
																				/>
																				<Route
																					path=":ml2"
																					element={
																						<RequireAuth>
																							<Asts />
																						</RequireAuth>
																					}
																				>
																					<Route
																						path=":ml3"
																						element={
																							<RequireAuth>
																								<Asts />
																							</RequireAuth>
																						}
																					/>
																				</Route>
																			</Route>

																			{/* transactions section -----------------------------------------------------*/}
																			{/* path to assets main page [ml1 = trns] */}
																			<Route path="/trns">
																				<Route
																					index
																					element={
																						<RequireAuth>
																							<Trns />
																						</RequireAuth>
																					}
																				/>
																				<Route
																					path=":ml2"
																					element={
																						<RequireAuth>
																							<Trns />
																						</RequireAuth>
																					}
																				>
																					<Route
																						path=":ml3"
																						element={
																							<RequireAuth>
																								<Trns />
																							</RequireAuth>
																						}
																					/>
																				</Route>
																			</Route>

																			{/* erfs section -----------------------------------------------------*/}
																			{/* path to assets main page [ml1 = erfs] */}
																			<Route
																				path="/erfs"
																				element={
																					<RequireAuth>
																						<Erfs />
																					</RequireAuth>
																				}
																			></Route>

																			{/* admin section -----------------------------------------------------*/}
																			<Route path="/admin">
																				<Route
																					index
																					element={
																						<RequireAuth allowedRoles={["manager", "superuser"]}>
																							<AdminMain />
																						</RequireAuth>
																					}
																				/>
																				<Route
																					path=":ml2"
																					element={
																						<RequireAuth allowedRoles={["manager", "superuser"]}>
																							<Admin />
																						</RequireAuth>
																					}
																				>
																					<Route
																						path=":ml3"
																						element={
																							<RequireAuth allowedRoles={["manager", "superuser"]}>
																								<Admin />
																							</RequireAuth>
																						}
																					/>
																				</Route>
																			</Route>
																			{/* </Route> */}

																			{/* TODO: Attend to the issue of displaying Unp for a signedin user */}
																			{/* unp section (signedin user)-----------------------------------------------------*/}
																			{/* path to unp main page [ml1 = unp] */}
																			<Route
																				path="/unp"
																				element={
																					<RequireAuth>
																						<Unp />
																					</RequireAuth>
																				}
																			>
																				{/* ml2 = ''[] or ''[] or ''[] or ''[] */}
																				<Route
																					path=":ml2"
																					element={
																						<RequireAuth>
																							<Unp />
																						</RequireAuth>
																					}
																				/>
																			</Route>

																			{/* unauthorised section -----------------------------------------------------*/}
																			{/* path to unauthhorised  */}
																			<Route path="/unauthorised" element={<NotAuthenticated />} />

																			{/* signout section -----------------------------------------------------*/}
																			{/* path to signout main page [ml1 = signout] */}
																			<Route path="/signout" element={<Signout />} />

																			<Route path="*" element={<NoPageFound />} />
																		</Route>
																	</Routes>

																	<Modal />
																	{/* </div> */}
																</BrowserRouter>
															</div>
														</PoContextProvider>
													</MenuContextProvider>
												</AuthContextProvider>
											</ModalContextProvider>
										</FormStateContextProvider>
									</Provider>
								</MediaViewContextProvider>
							</PhotoAppContextProvider>
						</GeocodingContextProvider>
					</ReverseGeocodingContextProvider>
				</ErfsContextProvider>
			</CliamsContextProvider>
			<ToastContainer />
		</>
	);
}

export default App;

// TODO: introduce BrouseRouter and do all pages and components
// TODO: All forms must have isPending spinners
// TODO: Each component must have own CSS acoped accordingly
// TODO: Protect all routes against signin and role access
