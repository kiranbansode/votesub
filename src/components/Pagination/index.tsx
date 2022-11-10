import PaginationFooter from 'components/Pagination/PaginationFooter';
import PaginationHeader from 'components/Pagination/PaginationHeader';
import VotingSubject from 'components/VotingSubject';

import './Pagination.styles.scss';

interface IPagination {
    data: [];
}

// eslint-disable-next-line arrow-body-style
const Pagination = ({ data }: IPagination) => {
    return (
        <div className="pagination">
            <PaginationHeader />

            {data.map((subject) => (
                <VotingSubject subject={subject} />
            ))}

            <PaginationFooter />
        </div>
    );
};

export default Pagination;
