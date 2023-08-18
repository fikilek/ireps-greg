import React from "react";
import "./DatetimeFilter.css";

const DatetimeFilter = () => {
	return (
		<div className="datetime-filter">
			{/* <div className="dt-filter timestamp-filter"> */}
				{/* <h4>Datetime</h4> */}
				<div className="from">From<span className="data-emphasis">
					<p>2023/02/23</p>
					<p>11H34</p> </span>
				</div>
				<div className="to">
					<p>To</p><span className="data-emphasis">
					<p>2023/02/24</p>
					<p>09H41</p></span>
				</div>
			{/* </div> */}
		</div>
	);
};

export default DatetimeFilter;
