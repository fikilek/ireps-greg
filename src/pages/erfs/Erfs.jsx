import React from "react";
import { useParams } from "react-router-dom";
import TableErfs from "../../components/table/TableErfs";
import useAuthContext from "../../hooks/useAuthContext";
import NotAuthenticated from "../auth/NotAuthenticated";
import { PropagateLoader } from "react-spinners";

const Erfs = () => {
	// console.log(`Erfs rendering`);
	const { ml2, ml3 } = useParams();
	// console.log(`ml2`, ml2))
	// console.log(`ml3`, ml3

	const { user, isAuthReady } = useAuthContext();
	// console.log(`user`, user);
	return  (isAuthReady ? ( 
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
	))	: (
		<div className="users-list-loader">
			<PropagateLoader
				color="orange"
				loading={!isAuthReady}
				size={13}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	))
};

export default Erfs;
