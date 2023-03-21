/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import Header from 'components/layouts/Header';
import LoadingScreen from 'components/UI/LoadingScreen';
import ContactDetails from 'pages/ProfilePage/subComponents/ContactDetails';
import PersonalDetails from 'pages/ProfilePage/subComponents/PersonalDetails';
import InstitutionalDetails from 'pages/ProfilePage/subComponents/InstitutionalDetails';
import ProfileBasic from 'pages/ProfilePage/subComponents/ProfileBasic';
import useGetUserDetails from 'hooks/useGetUserDetails';
import RemainingVotes from 'components/core/RemainingVotes';

import './ProfilePage.styles.scss';

const ProfilePage = () => {
    const [showView, setShowView] = useState(false);
    const { userDetails, userRole } = useGetUserDetails();
    // @ts-ignore
    const { name, gender, emailId, mob1, linkedIn, category, companyName, schoolName } =
        userDetails;

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

                    <ProfileBasic userDetails={{ emailId, name }} userRole={userRole} />

                    <div className="profile-deep">
                        <PersonalDetails userDetails={{ name, gender }} />

                        <InstitutionalDetails
                            userDetails={{ category, companyName, schoolName }}
                            userRole={userRole}
                        />

                        <ContactDetails userDetails={{ emailId, mob1, linkedIn, category }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
