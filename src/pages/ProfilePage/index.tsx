import { useEffect, useState } from 'react';
import Header from 'components/layouts/Header';
import LoadingScreen from 'components/UI/LoadingScreen';
import useGetUserDetails from 'hooks/useGetUserDetails';
import GmailColor from 'assets/svg/gmail_color.svg';
import LinkedInColor from 'assets/svg/linkedIn_color.svg';
import PhoneBlack from 'assets/svg/phone_black.svg';
import RemainingVotes from 'components/core/RemainingVotes';

import './ProfilePage.styles.scss';
import findStudentStandard from 'utils/helperFunctions/findStudentStandard';

const ProfilePage = () => {
    const [showView, setShowView] = useState(false);
    const { userDetails, userRole } = useGetUserDetails();

    useEffect(() => {
        const clearShowViewTimeout = setTimeout(() => {
            if (userDetails.uid) {
                setShowView(true);
            }
        }, 1000);

        return () => clearTimeout(clearShowViewTimeout);
    }, [userDetails.uid]);

    return (
        <div className="profile-page">
            <Header />

            {!showView ? (
                <LoadingScreen fullScreen />
            ) : (
                <div className="page-view">
                    <RemainingVotes />
                    <div className="profile-basic">
                        {/* <img alt="" className="profile-picture" src="src/assets/dev_image.png" /> */}

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

                    <div className="profile-deep">
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
                                        <p className="detail single-detail capitalize">
                                            {userDetails.gender}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Birth Date</p>
                                        <p className="detail single-detail">-</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="detail sect-2">
                            <p className="profile-deep__header">
                                {userDetails.category === 'st' || userDetails.category === 'tr'
                                    ? 'School Details'
                                    : 'Work Details'}
                            </p>
                            <div className="profile-details__container">
                                <div>
                                    <p>
                                        {userDetails.category === 'st' ||
                                        userDetails.category === 'tr'
                                            ? 'School Name'
                                            : 'Company Name'}
                                    </p>
                                    <p className="detail single-detail capitalize">
                                        {/* @ts-ignore */}
                                        {userDetails.companyName || userDetails.schoolName}
                                    </p>
                                </div>

                                <div className="small-details">
                                    <div>
                                        <p>Role</p>
                                        <p className="detail single-detail capitalize">
                                            {userRole}
                                        </p>
                                    </div>

                                    {/* {userDetails.category === 'st' ? (
                        <div>
                            <p>Division</p>
                            <p className="detail single-detail capitalize">-</p>
                        </div>
                    ) : null} */}
                                </div>

                                {userDetails.category === 'st' ? (
                                    <div className="small-details">
                                        <div>
                                            <p>Standard</p>
                                            <p className="detail single-detail capitalize">
                                                {userDetails.uid
                                                    ? // @ts-ignore
                                                      findStudentStandard(userDetails.std)
                                                    : null}
                                            </p>
                                        </div>
                                        <div>
                                            <p>Division</p>
                                            <p className="detail single-detail">
                                                {/* @ts-ignore */}
                                                {userDetails.div}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="detail sect-3">
                            <p className="profile-deep__header">Contact Details</p>
                            <div className="profile-details__container">
                                <div>
                                    <p>Email ID</p>
                                    <p className="detail-with-icon detail">
                                        <span>
                                            <img
                                                alt="Gmail Icon"
                                                className="contact-icon"
                                                src={GmailColor}
                                            />
                                        </span>
                                        <span>{userDetails.emailId}</span>
                                    </p>
                                </div>

                                <div>
                                    {userDetails.category === 'dev' ||
                                    userDetails.category === 'hr' ? (
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
                                                <span>{userDetails.linkedIn || '-'}</span>
                                            </p>
                                        </>
                                    ) : null}
                                </div>

                                <div>
                                    <p>Mobile No.</p>
                                    <p className="detail-with-icon detail">
                                        <span>
                                            <img
                                                alt="Phone Icon"
                                                className="contact-icon"
                                                src={PhoneBlack}
                                            />
                                        </span>
                                        <span>{`${userDetails.countryCode}  ${userDetails.mob1}`}</span>
                                    </p>
                                </div>

                                <div>
                                    <p>Alternate Mobile No.</p>
                                    <p className="detail-with-icon detail">
                                        <span className="contact-icon__container">
                                            <img
                                                alt="Phone Icon"
                                                className="contact-icon"
                                                src={PhoneBlack}
                                            />
                                        </span>
                                        <span>{`${userDetails.countryCode}  ${userDetails.mob2}`}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
