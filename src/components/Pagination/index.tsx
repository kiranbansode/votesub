import PaginationFooter from 'components/Pagination/PaginationFooter';
import PaginationHeader from 'components/Pagination/PaginationHeader';
import PaginationContent from 'components/Pagination/PaginationContent/';

import './Pagination.styles.scss';

interface IPagination {
    sortedData: any[][];
    unSortedData: any[];
}

// eslint-disable-next-line arrow-body-style
const Pagination = ({ sortedData, unSortedData }: IPagination) => {
    return (
        <div className="pagination">
            <PaginationHeader unsortedData={unSortedData} />

            <PaginationContent sortedData={sortedData} />

            <PaginationFooter sortedData={sortedData} />
        </div>
    );
};

export default Pagination;
