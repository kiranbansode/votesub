/* eslint-disable no-nested-ternary */
import findStudentStandard from 'utils/helperFunctions/findStudentStandard';

interface IUserInstitutionalDetails {
    userDetails: {
        category: string;
        companyName: string;
        schoolName: string;
    };
    userRole: string | null;
}

const InstitutionalDetails = ({ userDetails, userRole }: IUserInstitutionalDetails) => (
    <div className="detail sect-2">
        <p className="profile-deep__header">
            {userDetails.category === 'st' || userDetails.category === 'tr'
                ? 'School Details'
                : 'Work Details'}
        </p>
        <div className="profile-details__container">
            <div>
                <p>
                    {userDetails.category === 'st' || userDetails.category === 'tr'
                        ? 'School Name'
                        : 'Company Name'}
                </p>
                <p className="detail single-detail capitalize">
                    {/* @ts-ignore */}
                    {userDetails.companyName /* @ts-ignore */
                        ? userDetails.companyName /* @ts-ignore */
                        : userDetails.schoolName /* @ts-ignore */
                        ? userDetails.schoolName
                        : 'N/A'}
                    {}
                </p>
            </div>

            <div className="small-details">
                <div>
                    <p>Role</p>
                    <p className="detail single-detail capitalize">{userRole}</p>
                </div>
            </div>

            {userDetails.category === 'st' ? (
                <div className="small-details">
                    <div>
                        <p>Standard</p>
                        <p className="detail single-detail capitalize">
                            {
                                // @ts-ignore
                                userDetails.uid && userDetails.std
                                    ? // @ts-ignore
                                      findStudentStandard(userDetails.std)
                                    : 'N/A'
                            }
                        </p>
                    </div>
                    <div>
                        <p>Division</p>
                        <p className="detail single-detail">
                            {/* @ts-ignore */}
                            {userDetails.div || 'N/A'}
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    </div>
);

export default InstitutionalDetails;
