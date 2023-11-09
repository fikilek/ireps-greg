import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import TableErfs from "../../components/table/TableErfs";
import useAuthContext from "../../hooks/useAuthContext";
import NotAuthenticated from "../auth/NotAuthenticated";
import { PropagateLoader } from "react-spinners";
import "../../components/table/TableUsersList.css";

const Erfs = () => {
	// console.log(`Erfs rendering`);
	const { ml2: m2, ml3: m3 } = useParams();
	// console.log(`ml2`, ml2))
	// console.log(`ml3`, ml3
	const ml2 = useMemo(() => m2, [m2]);
	const ml3 = useMemo(() => m3, [m3]);

	const { user: u, isAuthReady: is } = useAuthContext();
	// console.log(`user`, user);

	const user = useMemo(() => u, [u]);
	const isAuthReady = useMemo(() => is, [is]);

	return isAuthReady ? (
		user ? (
			<TableErfs
				ml1="erfs"
				tn={ml2}
				ml3={ml3}
				nfd="newErfsFormData"
				fn="erfsForm" //ErfsForm
			/>
		) : (
			<NotAuthenticated />
		)
	) : (
		<div className="users-list-loader">
			<PropagateLoader
				color="orange"
				loading={!isAuthReady}
				size={13}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};

export default Erfs;
