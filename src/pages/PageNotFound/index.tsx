import Header from 'components/Header';
import useAppSelector from 'hooks/useAppSelector';
import Logo from 'components/Logo';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import './PageNotFound.styles.scss';

interface IPageNotFound {
    code?: number;
    title?: string;
    mssg?: string;
}

const PageNotFound = ({ code, mssg, title }: IPageNotFound) => {
    const userId = useAppSelector(({ user }) => user.userDetails.uid);

    return (
        <div className="page-not-found">
            {userId ? <Header /> : null}

            <div className="page-not-found-container">
                <h1 className="status">{code}</h1>
                <p className="title">
                    {title} <SentimentVeryDissatisfiedIcon className="smiley-sad" />
                </p>
                <p className="message">{mssg}</p>
            </div>

            {!userId ? <Logo goHere="/" /> : null}
        </div>
    );
};

PageNotFound.defaultProps = {
    code: 404,
    title: 'Page Not Found',
    mssg: 'Looks like the page you are looking for is not found or it might be deleted.',
};

export default PageNotFound;
