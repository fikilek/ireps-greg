import moment from "moment";
import "./UserProfile.css";
import "./UserDetails.css";
import React from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useDocumentSync } from "../../hooks/useDocumentSync";
import userPicPlaceHolder from "../../images/userPics/userPicPlaceHolder.png";
import { MdAddAPhoto, MdPhoto } from "react-icons/md";

const UserDetails = () => {
	// console.log(`props`, props)

	// get user data from userContext
	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { email, emailVerified, photoUrl, uid } = user;
	// const { createdAtDatetime } = metaData;

	// get user details from firestore on snapshot
	const { document } = useDocumentSync("users", uid);
	// console.log(`error`, error)
	// console.log(`document`, document)

	return (
		<div className="user-data user-details">
			<div className="header">
        <h3>User Details</h3>
        <p>Acc Status :<span className="data-emphasis">Active</span> </p>
				<div>
					online:{" "}
					<span className="data-emphasis">
						{document?.online ? "online" : "offline"}
					</span>
				</div>
			</div>
			<div className="body user-details-body">
				<div className="body-section body-left">
					<p>
						Surname:
						<span className="data-emphasis">
							{document?.displayName.split(" ")[1]}
						</span>
					</p>
					<p>
						Name:
						<span className="data-emphasis">
							{document?.displayName.split(" ")[0]}
						</span>
					</p>
					{/* <div>Nickname (aka) : {displayName}</div> */}
					<p>
						Email:<span className="data-emphasis">{email}</span>{" "}
					</p>
					<p>
						Email Verified :{" "}
						<span className="data-emphasis">{emailVerified ? "Yes" : "No"}</span>
					</p>
					<p>
						Phone No : <span className="data-emphasis">{document?.phoneNumber}</span>
					</p>
					<p>
						Created At :
						<span className="data-emphasis">
							{moment(document?.metaData?.createdAtDatetime.toDate()).format(
								"YYYY-MM-DD HH:mm:ss"
							)}
						</span>
					</p>
					<p>
						Last used :
						<span className="data-emphasis">
							{moment(document?.metaData?.updatedAtDatetime.toDate()).format(
								"YYYY-MM-DD HH:mm:ss"
							)}
						</span>
					</p>
				</div>
				<div className="body-section body-right ">
					<div className="user-photo">
						<img
							src={photoUrl || userPicPlaceHolder}
							alt="user profile pic"
							width="150"
							height={"150"}
						/>
					</div>
					<div className="photo-btns">
						<button title='take a photo'>
							<MdAddAPhoto />
						</button>
						<button title='get saved photo' >
							<MdPhoto />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
