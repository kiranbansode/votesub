/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './PaginationFooter.styles.scss';
import useAppDispatch from 'hooks/useAppDispatch';
import { SAVE_CURRENT_PAGE, NEXT_PAGE, PREVIOUS_PAGE } from 'store/pagination/pageTracker';

interface IPaginationFooter {
    sortedData: any[][];
}

// eslint-disable-next-line arrow-body-style
const PaginationFooter = ({ sortedData }: IPaginationFooter) => {
    const dispatch = useAppDispatch();
    // const sortedSubjectList = useAppSelector(({ sortedSubjects }) => sortedSubjects.list);

    return (
        <div className="pagination-footer-container">
            <div onClick={() => dispatch(PREVIOUS_PAGE())}>
                <ArrowBackIosIcon />
            </div>

            <div className="pagination-pages-container">
                {sortedData.map((subject, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={idx} onClick={() => dispatch(SAVE_CURRENT_PAGE(idx))}>
                        {idx + 1}
                    </div>
                ))}
            </div>

            <div onClick={() => dispatch(NEXT_PAGE(sortedData.length))}>
                <ArrowForwardIosIcon />
            </div>
        </div>
    );
};

export default PaginationFooter;
