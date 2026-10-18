// import Header from 'components/Header';
import PageNotFound from 'pages/PageNotFound';
import './CreditsPage.styles.scss';

const CreditsPage = () => (
    <PageNotFound
        code={503}
        mssg="Credits page is under development. Please come back after some time."
        title="Under Development"
    />

    // <div>
    //     <Header />
    //     <h2>Credit Page</h2>
    // </div>
);

export default CreditsPage;
