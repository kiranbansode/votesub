interface IUserPersonalDetails {
    userDetails: {
        name: {
            firstName: string;
            middleName: string;
            lastName: string;
        };
        gender: 'male' | 'female';
    };
}

const PersonalDetails = ({ userDetails }: IUserPersonalDetails) => (
    <div className="detail sect-1">
        <p className="profile-deep__header">Personal Details</p>
        <div className="profile-details__container">
            <div>
                <p>Full Name</p>
                <p className="detail single-detail">{`${userDetails.name.firstName} ${userDetails.name.middleName} ${userDetails.name.lastName}`}</p>
            </div>

            <div className="small-details">
                <div>
                    <p>Gender</p>
                    <p className="detail single-detail capitalize">{userDetails.gender}</p>
                </div>
                <div>
                    <p>Birth Date</p>
                    <p className="detail single-detail">N/A</p>
                </div>
            </div>
        </div>
    </div>
);

export default PersonalDetails;
