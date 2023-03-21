import GmailColor from 'assets/svg/gmail_color.svg';

interface IUserProfileBasic {
    userDetails: {
        name: {
            firstName: string;
            lastName: string;
        };
        emailId: string;
    };
    userRole: string | null;
}

const ProfileBasic = ({ userDetails, userRole }: IUserProfileBasic) => (
    <div className="profile-basic">
        <p className="profile-username">{`${userDetails.name.firstName} ${userDetails.name.lastName}`}</p>
        <p className="profile-email__container">
            <span className="profile-email__img-container">
                <img
                    alt="Gmail Icon"
                    className="profile-email__img contact-icon"
                    src={GmailColor}
                />
            </span>
            <span className="profile-email__email-id">{userDetails.emailId}</span>
        </p>
        <p className="profile-user-role capitalize">{userRole}</p>
    </div>
);

export default ProfileBasic;
