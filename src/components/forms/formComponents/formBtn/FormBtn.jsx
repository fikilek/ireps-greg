import React from "react";
import { ClipLoader } from "react-spinners";

const FormBtn = ({ isPending, btnName, disabled }) => {
	// console.log(`isPending`, isPending)
	return (
		<div className={`${btnName}-btn`}>
			{isPending ? (
				<button type="button" className="form-btn submit pending" disabled>
					<ClipLoader
						color="orange"
						loading={isPending}
						size={20}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</button>
			) : (
				<button type={`${btnName}`} className={`form-btn ${btnName}`} disabled={disabled}>
					{btnName}
				</button>
			)}
		</div>
	);
};

export default FormBtn;
