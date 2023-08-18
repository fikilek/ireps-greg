import React from 'react'

const TrnStats = (props) => {
  // console.log(`props`, props)
  const {stats} = props
  return (
			<div className="trns-stats">
				<table>
					<thead>
						<tr>
							<th>Transaction</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{stats?.map(trn => {
							return (
								<tr key={trn.name}>
									<td>{trn.name}</td>
									<td><span className="data-emphasis">{trn.total}</span></td>
								</tr>
							);
            })}
          
					</tbody>
				</table>
			</div>
		);
}

export default TrnStats