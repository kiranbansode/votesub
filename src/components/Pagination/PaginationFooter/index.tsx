/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './PaginationFooter.styles.scss';
import useAppDispatch from 'hooks/useAppDispatch';
import { SAVE_CURRENT_PAGE, NEXT_PAGE, PREVIOUS_PAGE } from 'store/pagination/pageTracker';
import { nanoid } from 'nanoid';
import useAppSelector from 'hooks/useAppSelector';

interface IPaginationFooter {
    sortedData: any[][];
}

// eslint-disable-next-line arrow-body-style
const PaginationFooter = ({ sortedData }: IPaginationFooter) => {
    const dispatch = useAppDispatch();
    const { currentPage } = useAppSelector(({ currPaginationPage }) => currPaginationPage);
    // const sortedSubjectList = useAppSelector(({ sortedSubjects }) => sortedSubjects.list);

    /**
     * `scrollActivePageInView` function will move active page into parent
     * container's visible part
     */
    const scrollActivePageInView = () => {
        const pageNo = document.getElementById(`page-no-${currentPage + 1}`);
        pageNo?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    };

    return (
        <div className="pagination-footer-container">
            <div
                onClick={() => {
                    dispatch(PREVIOUS_PAGE());
                    scrollActivePageInView();
                }}
            >
                <ArrowBackIosIcon />
            </div>

            <div className="pagination-pages-container">
                {sortedData.map((subject, idx) => (
                    <div
                        className={currentPage === idx ? 'active-page' : ''}
                        id={`page-no-${idx + 1}`}
                        key={nanoid()}
                        onClick={() => {
                            dispatch(SAVE_CURRENT_PAGE(idx));
                            scrollActivePageInView();
                        }}
                    >
                        {idx + 1}
                    </div>
                ))}
            </div>

            <div
                onClick={() => {
                    dispatch(NEXT_PAGE(sortedData.length));
                    scrollActivePageInView();
                }}
            >
                <ArrowForwardIosIcon />
            </div>
        </div>
    );
};

export default PaginationFooter;
