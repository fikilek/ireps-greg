import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// import pages
import Header from "./pages/header/Header";
import Home from "./pages/home/Home";
// import Erfs from "./pages/erfs/Erfs";
// import Trns from "./pages/trns/Trns";
// import Asts from "./pages/asts/Asts";
// import Admin from "./pages/admin/Admin";
// import AdminMain from "./pages/admin/AdminMain";
// import Unp from "./pages/unps/UserProfile";
// import NoPageFound from "./pages/errors/NoPageFound";
// import NotAuthenticated from "./pages/auth/NotAuthenticated";

// import Dbd from "./pages/dbd/Dbd";
// import Bok from "./pages/bok/Bok";
// import Stores from "./pages/stores/Stores";
// import Sch from "./pages/sch/Sch";
// import Sch1 from "./pages/sch/Sch1";
// import PgDbdMl2Meter from "./pages/dbd/dbdMeters/DbdMeters";
// import DbdBoxes from "./pages/dbd/dbdBoxes/DbdBoxes";
// import DbdMeters from "./pages/dbd/dbdMeters/DbdMeters";
// import DbdPoles from "./pages/dbd/dbdPoles/DbdPoles";

// import custom components
import Signout from "./components/forms/authForms/Signout";
import Modal from "./components/modals/Modal";
import RequireAuth from "./components/requireAuth/RequireAuth";

// import ModalContext and UserContext
import ModalContextProvider from "./contexts/ModalContext.js";
import { MenuContextProvider } from "./contexts/MenuContext";
import { PoContextProvider } from "./contexts/PoContext";
import AuthContextProvider from "./contexts/AuthContextProvider";
import FormStateContextProvider from "./contexts/FormStateContextProvider";
import MediaViewContextProvider from "./contexts/MediaViewContext";
import PhotoAppContextProvider from "./contexts/PhotoAppContext";
import GeocodingContextProvider from "./contexts/GeocodingContext";
import ErfsContextProvider from "./contexts/ErfsContext";
import ReverseGeocodingContextProvider from "./contexts/ReverseGeocodingContext";
import CliamsContextProvider from "./contexts/ClaimsContext";
import { AreaTreeContextProvider } from "./contexts/AreaTreeContext";

// import npm and other cpmponents modules
import { ToastContainer } from "react-toastify";
import store from "./store/irepsStore";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import { ClockLoader } from "react-spinners";

const Erfs = lazy(() => import("./pages/erfs/Erfs"));
const Trns = lazy(() => import("./pages/trns/Trns"));
const Asts = lazy(() => import("./pages/asts/Asts"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const Unp = lazy(() => import("./pages/unps/UserProfile"));
const NoPageFound = lazy(() => import("./pages/errors/NoPageFound"));
const NotAuthenticated = lazy(() => import("./pages/auth/NotAuthenticated"));

const cssProperties = {
	margin: "auto",
};

const loader = (
	<ClockLoader
		color="blue"
		loading={true}
		size={150}
		aria-label="Loading Spinner"
		data-testid="loader"
		cssOverride={cssProperties}
	/>
);

function App() {
	return (
		<>
			<AreaTreeContextProvider>
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
																				<Route index element={<Home />} />
																				<Route path={"landing-page"} element={<Home />} />

																				{/* assets section -----------------------------------------------------*/}
																				{/* path to assets main page [ml1 = asts] */}
																				<Route path="/asts">
																					<Route
																						index
																						element={
																							<Suspense fallback={loader}>
																								<RequireAuth>
																									<Asts />
																								</RequireAuth>
																							</Suspense>
																						}
																					/>
																					<Route
																						path=":ml2"
																						element={
																							<Suspense fallback={loader}>
																								<RequireAuth>
																									<Asts />
																								</RequireAuth>
																							</Suspense>
																						}
																					>
																						<Route
																							path=":ml3"
																							element={
																								<Suspense fallback={loader}>
																									<RequireAuth>
																										<Asts />
																									</RequireAuth>
																								</Suspense>
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
																							<Suspense fallback={loader}>
																								<RequireAuth>
																									<Trns />
																								</RequireAuth>
																							</Suspense>
																						}
																					/>
																					<Route
																						path=":ml2"
																						element={
																							<Suspense fallback={loader}>
																								<RequireAuth>
																									<Trns />
																								</RequireAuth>
																							</Suspense>
																						}
																					>
																						<Route
																							path=":ml3"
																							element={
																								<Suspense fallback={loader}>
																									<RequireAuth>
																										<Trns />
																									</RequireAuth>
																								</Suspense>
																							}
																						/>
																					</Route>
																				</Route>

																				{/* erfs section -----------------------------------------------------*/}
																				{/* path to assets main page [ml1 = erfs] */}
																				<Route
																					path="/erfs"
																					element={
																						<Suspense fallback={loader}>
																							<RequireAuth>
																								<Erfs />
																							</RequireAuth>
																						</Suspense>
																					}
																				></Route>

																				{/* admin section -----------------------------------------------------*/}
																				<Route path="/admin">
																					{/* <Route
																					index
																					element={
																						<RequireAuth allowedRoles={["manager", "superuser"]}>
																							<AdminMain />
																						</RequireAuth>
																					}
																				/> */}
																					<Route
																						path=":ml2"
																						element={
																							<Suspense fallback={loader}>
																								{/* <RequireAuth allowedRoles={["manager", "superuser"]}> */}
																								<Admin />
																								{/* </RequireAuth> */}
																							</Suspense>
																						}
																					>
																						<Route
																							path=":ml3"
																							element={
																								// <RequireAuth allowedRoles={["manager", "superuser"]}>
																								<Admin />
																								// </RequireAuth>
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
																						<Suspense fallback={loader}>
																							<RequireAuth>
																								<Unp />
																							</RequireAuth>
																						</Suspense>
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
																				<Route
																					path="/unauthorised"
																					element={<NotAuthenticated />}
																				/>

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
			</AreaTreeContextProvider>
			<ToastContainer />
		</>
	);
}

export default App;

// TODO: introduce BrouseRouter and do all pages and components
// TODO: All forms must have isPending spinners
// TODO: Each component must have own CSS acoped accordingly
// TODO: Protect all routes against signin and role access
