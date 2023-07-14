import React from 'react'
import './UserSignature.css'
import UserSignatureForm from './UserSignatureForm'
import UserSignatureStatus from './UserSignatureStatus'

const UserSignature = ({ formData }) => {
	// console.log(`UserSignature formData`, formData)
	const {user} = formData
  return (
			<div className="signature-container">
				{user ? <UserSignatureStatus formData={formData} /> : <UserSignatureForm formData={formData} />}
			</div>
		);
}

export default UserSignature