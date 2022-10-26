import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './PaginationFooter.styles.scss';

// eslint-disable-next-line arrow-body-style
const PaginationFooter = () => {
    return (
        <div className="pagination-footer-container">
            <div>
                <ArrowBackIosIcon />
            </div>

            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>

            <div>
                <ArrowForwardIosIcon />
            </div>
        </div>
    );
};

export default PaginationFooter;
