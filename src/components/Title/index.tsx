import './PageTitle.styles.scss';

interface IPageTitle {
    title?: string;
}

const PageTitle = ({ title }: IPageTitle) => (
    <header>
        <h2 className="page-title">{title}</h2>
    </header>
);

PageTitle.defaultProps = {
    title: 'Page Title',
};

export default PageTitle;
