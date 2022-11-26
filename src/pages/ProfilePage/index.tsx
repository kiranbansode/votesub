import PageNotFound from 'pages/PageNotFound';

import './ProfilePage.styles.scss';

const ProfilePage = () => (
    <PageNotFound
        code={503}
        mssg="The page you are looking for is under development. Please come back again after some time."
        title="Under Development"
    />
);

export default ProfilePage;
