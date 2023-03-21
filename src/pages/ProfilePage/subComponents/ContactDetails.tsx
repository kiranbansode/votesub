import LinkedInColor from 'assets/svg/linkedIn_color.svg';
import PhoneBlack from 'assets/svg/phone_black.svg';
import GmailColor from 'assets/svg/gmail_color.svg';

interface IUserContactDetails {
    userDetails: {
        emailId: string;
        category: string;
        linkedIn: string;
        mob1: string;
    };
}

const ContactDetails = ({ userDetails }: IUserContactDetails) => (
    <div className="detail sect-3">
        <p className="profile-deep__header">Contact Details</p>
        <div className="profile-details__container">
            <div>
                <p>Email ID</p>
                <p className="detail-with-icon detail">
                    <span>
                        <img alt="Gmail Icon" className="contact-icon" src={GmailColor} />
                    </span>
                    <span>{userDetails.emailId}</span>
                </p>
            </div>

            <div>
                {userDetails.category === 'dev' || userDetails.category === 'hr' ? (
                    <>
                        <p>LinkedIn</p>
                        <p className="detail-with-icon detail">
                            <span>
                                <img
                                    alt="LinkedIn Icon"
                                    className="contact-icon"
                                    src={LinkedInColor}
                                />
                            </span>
                            {/* @ts-ignore */}
                            <span>{userDetails.linkedIn || 'N/A'}</span>
                        </p>
                    </>
                ) : null}
            </div>

            <div>
                <p>Mobile No.</p>
                <p className="detail-with-icon detail">
                    <span>
                        <img alt="Phone Icon" className="contact-icon" src={PhoneBlack} />
                    </span>
                    <span>{userDetails.mob1 ? `${userDetails.mob1}` : 'N/A'}</span>
                </p>
            </div>
        </div>
    </div>
);

export default ContactDetails;
