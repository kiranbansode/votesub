import { MenuItem, Select, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SortIcon from '@mui/icons-material/Sort';
import useAppDispatch from 'hooks/useAppDispatch';
import { SHOW_ONLY_FIVE, SHOW_ONLY_TEN, SHOW_ONLY_TWENTY } from 'store/dashboard/sortedSubjectList';
import { RESET_CURRENT_PAGE } from 'store/pagination/pageTracker';
import './PaginationHeader.styles.scss';

interface IPaginationHeader {
    unsortedData: any[];
}

// eslint-disable-next-line arrow-body-style
const PaginationHeader = ({ unsortedData }: IPaginationHeader) => {
    const dispatch = useAppDispatch();

    return (
        <div className="pagination-header">
            <div className="func-wrapper">
                <span>Subjects: </span>
                <span>
                    <FormControl>
                        <Select className="per-page-selector" defaultValue={5}>
                            <MenuItem
                                value={5}
                                onClick={() => {
                                    dispatch(RESET_CURRENT_PAGE());
                                    dispatch(SHOW_ONLY_FIVE(unsortedData));
                                }}
                            >
                                5
                            </MenuItem>
                            <MenuItem
                                value={10}
                                onClick={() => {
                                    dispatch(RESET_CURRENT_PAGE());
                                    dispatch(SHOW_ONLY_TEN(unsortedData));
                                }}
                            >
                                10
                            </MenuItem>
                            <MenuItem
                                value={20}
                                onClick={() => {
                                    dispatch(RESET_CURRENT_PAGE());
                                    dispatch(SHOW_ONLY_TWENTY(unsortedData));
                                }}
                            >
                                20
                            </MenuItem>
                        </Select>
                    </FormControl>
                </span>
            </div>

            <div className="func-wrapper">
                <span>
                    <SearchIcon />
                </span>
            </div>

            {/* 
            <div className="func-wrapper">
                <span>
                    <FilterAltOutlinedIcon />
                </span>
            </div> */}

            <div className="func-wrapper">
                <span>
                    <SortIcon />
                </span>
            </div>
        </div>
    );
};

export default PaginationHeader;
