// import Header from 'components/Header';
import PageNotFound from 'pages/PageNotFound';
import './AdminPage.styles.scss';

const AdminPage = () => (
    <PageNotFound
        code={503}
        mssg="The page you are looking for is under development. Please come back again after some time."
        title="Under Development"
    />

    // <div>
    //     <Header />
    //     <h2>Admin Page</h2>
    // </div>
);

export default AdminPage;
