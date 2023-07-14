import React, { useState } from 'react'

const DbdHeader = ({ title }) => {
	const [country, setCountry] = useState("SouthAfrica");
  return (
			<div className="dbd-heading">
      <div className="dbd-title">{title}</div>
				<div className="dbd-filters">
					<div className="country-names">
						<select value={country} onChange={e => setCountry(e.target.value)}>
							<option value="South Africa">South Africa</option>
							<option value="Russia">Russia</option>
							<option value="China">China</option>
							<option value="India">India</option>
							<option value="Brazil">Brazil</option>
						</select>
					</div>
					<div className="province-names">Eastern Cape</div>
					<div className="district-names">Chris Hani DM</div>
					<div className="local-municipality-names">Enock Mgijima LM</div>
					<div className="town-names">All</div>
					<div className="ward-names">All</div>
				</div>
			</div>
		);
}

export default DbdHeader