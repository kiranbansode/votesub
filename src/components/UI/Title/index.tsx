import Separator from 'components/UI/Separator';
import './PageTitle.styles.scss';

interface IPageTitle {
    title?: string;
}

const PageTitle = ({ title = 'Page Title' }: IPageTitle) => (
    <div>
        <h1 className="page-title">~x {title} x~</h1>
        <Separator />
    </div>
);

export default PageTitle;
