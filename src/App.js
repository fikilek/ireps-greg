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
import Unp from "./pages/unps/Unp";
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

// console.log(`store`, store)
// console.log(`UserContextProvider`, UserContextProvider)

function App() {
	return (
		<>
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
												<Route path="/" element={<Header />}>
													<Route index element={<Home />} />

													<Route element={<RequireAuth />}>
														{/* dashboard section -----------------------------------------------------*/}
														{/* path to dashboard main page [ml1 = dbd] */}
														<Route path="/dbd">
															<Route index element={<Dbd />} />
															{/* ml2 = 'asts' or 'trns' or 'unps' */}
															{/* PgDbdMl2Meter - Page Dashboard Menu Lelel 2 Meter */}
															<Route path="meters" element={<DbdMeters />} />
															<Route path="boxs" element={<DbdBoxes />} />
															<Route path="poles" element={<DbdPoles />} />
															{/* <Route path="/dbd/meter" element={<PgDbdMl2Meter />} /> */}
															{/* <Route path="meter" element={<DbdSub />} /> */}
														</Route>
														{/* assets section -----------------------------------------------------*/}
														{/* path to assets main page [ml1 = asts] */}
														<Route path="/asts">
															<Route index element={<Asts />} />
															<Route path=":ml2" element={<Asts />}>
																<Route path=":ml3" element={<Asts />} />
															</Route>
														</Route>

														{/* transactions section -----------------------------------------------------*/}
														{/* path to assets main page [ml1 = trns] */}
														<Route path="/trns">
															<Route index element={<Trns />} />
															<Route path=":ml2" element={<Trns />}>
																<Route path=":ml3" element={<Trns />} />
															</Route>
														</Route>

														{/* supply chain section -----------------------------------------------------*/}
														{/* path to assets main page [ml1 = erfs] */}
														<Route path="/sch">
															<Route index element={<Sch1 />} />
															<Route path=":ml2" element={<Sch1 />}>
																<Route path=":ml3" element={<Sch1 />} />
															</Route>
														</Route>

														<Route path="/admin">
															<Route index element={<Admin />} />
															<Route path=":ml2" element={<Admin />}>
																<Route path=":ml3" element={<Admin />} />
															</Route>
														</Route>

														{/* TODO: Attend to the issue of displaying Unp for a signedin user */}
														{/* unp section (signedin user)-----------------------------------------------------*/}
														{/* path to unp main page [ml1 = unp] */}
														<Route path="/unp" element={<Unp />}>
															{/* ml2 = ''[] or ''[] or ''[] or ''[] */}
															<Route path=":ml2" element={<Unp />} />
														</Route>

														{/* signout section -----------------------------------------------------*/}
														{/* path to signout main page [ml1 = signout] */}
														<Route path="/signout" element={<Signout />} />
													</Route>

													{/* erfs section -----------------------------------------------------*/}
													{/* path to assets main page [ml1 = erfs] */}
													<Route path="/erfs" element={<Erfs />}></Route>

													{/* body of knowledge section -----------------------------------------------------*/}
													{/* path to assets bok page [ml1 = bok] */}
													<Route path="/bok" element={<Bok />}></Route>

													{/* admin section -----------------------------------------------------*/}
													{/* path to admin main page [ml1 = admin] */}

													{/* signup section -----------------------------------------------------*/}
													{/* path to signup main page [ml1 = signup] */}
													{/* <Route path="/signup" element={<Signup />} /> */}

													{/* signin section -----------------------------------------------------*/}
													{/* path to signin main page [ml1 = signin] */}
													<Route path="/signinPage" element={<SigninPage />} />

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
			<ToastContainer />
		</>
	);
}

export default App;

// TODO: introduce BrouseRouter and do all pages and components
// TODO: All forms must have isPending spinners
// TODO: Each component must have own CSS acoped accordingly
// TODO: Protect all routes against signin and role access
