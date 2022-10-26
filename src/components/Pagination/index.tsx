import PaginationHeader from 'components/Pagination/PaginationHeader';
import PaginationFooter from 'components/Pagination/PaginationFooter';
import './Pagination.styles.scss';

// eslint-disable-next-line arrow-body-style
const Pagination = () => {
    return (
        <div className="pagination">
            <PaginationHeader />
            <PaginationFooter />
        </div>
    );
};

export default Pagination;
