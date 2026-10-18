// import Header from 'components/Header';
import PageNotFound from 'pages/PageNotFound';
import './AdminPage.styles.scss';

const AdminPage = () => (
    <PageNotFound
        code={503}
        mssg="Admin page is under development. Please come back after some time."
        title="Under Development"
    />

    // <div>
    //     <Header />
    //     <h2>Admin Page</h2>
    // </div>
);

export default AdminPage;
