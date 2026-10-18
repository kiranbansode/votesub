// import Header from 'components/Header';
import PageNotFound from 'pages/PageNotFound';
import './AboutMePage.styles.scss';

const AboutMePage = () => (
    <PageNotFound
        code={503}
        mssg="About Me page is under development. Please come back after some time."
        title="Under Development"
    />

    // <div className="about-me-page">
    //     <Header />

    //     <div className="page-view">
    //         {/* <h2>About Me Page</h2> */}

    //         <div className="dev-image__container">
    //             <img
    //                 alt="Developer-Profile_Picture"
    //                 className="dev-image"
    //                 src="/src/assets/dev_image.png"
    //             />
    //         </div>

    //         <div className="dev-name__container">
    //             <h1 className="dev-name">Kiran Bansode</h1>
    //         </div>

    //         <div className="dev-email__container">
    //             <h1 className="dev-email">
    //                 <span>
    //                     <img
    //                         alt="gmail-icon"
    //                         className="gmail-icon icon"
    //                         src="/src/assets/gmail-icon.png"
    //                     />
    //                 </span>
    //                 <a href="mailto:czar.kiran@gmail.com">czar.kiran@gmail.com</a>
    //             </h1>
    //         </div>

    //         <div className="dev-intro__container">
    //             <p className="dev-intro">
    //                 Hi, I&#39;m Kiran. A Self-Taught 👨🏻‍💻 Full-Stack Web developer based in India.
    //                 <br />
    //                 <br />
    //                 If you like this project, please give your feedback using Feedback page. It is
    //                 very important for me.
    //             </p>
    //         </div>
    //     </div>
    // </div>
);

export default AboutMePage;
