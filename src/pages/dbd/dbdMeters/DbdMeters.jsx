import React from 'react'
import { useParams } from 'react-router-dom';

const DbdMeters = () => {
	const { ml2, ml3 } = useParams();
	console.log(`ml2`, ml2);
	console.log(`ml3`, ml3);
	return <div>DbdMeters</div>;
}

export default DbdMeters