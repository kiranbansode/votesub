import Header from 'components/layouts/Header';
import useAppSelector from 'hooks/useAppSelector';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ConstructionIcon from '@mui/icons-material/Construction';
import './PageNotFound.styles.scss';
import { Link } from 'react-router-dom';

interface IPageNotFound {
    code?: number;
    title?: string;
    mssg?: string;
}

const PageNotFound = ({ code, mssg, title }: IPageNotFound) => {
    const userId = useAppSelector(({ user }) => user.userDetails.uid);
    const emoji: any = {
        404: <SentimentVeryDissatisfiedIcon className="smiley-sad" />,
        503: <ConstructionIcon className="construction" />,
    };
    const classCodes: { [x: string]: string } = {
        404: 'pnd',
        503: 'uc',
    };

    return (
        <div className="page-not-found">
            {userId ? <Header /> : null}

            <div className="page-not-found-container">
                <h1 className={`status ${classCodes[code!]}`}>{code}</h1>
                <p className="title">
                    {title} {emoji[code!]}
                </p>
                <p className="message">{mssg}</p>
                <div className="dashboard-link">
                    <Link to="/dashboard">Go To Dashboard</Link>
                </div>
            </div>
        </div>
    );
};

PageNotFound.defaultProps = {
    code: 404,
    title: 'Page Not Found',
    mssg: 'Looks like the page or subject that you are looking for is not found or it might be deleted.',
};

export default PageNotFound;
