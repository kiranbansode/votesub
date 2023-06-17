/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MenuItem, Select, FormControl, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
// import SortIcon from '@mui/icons-material/Sort';
import useAppDispatch from 'hooks/useAppDispatch';
import getSubjectsFromFirestore from 'features/getSubjectsFromFirestore';
import './PaginationHeader.styles.scss';

import {
    RESET_SORTED_SUBJECTS_LIST,
    SHOW_ONLY_FIVE,
    SHOW_ONLY_TEN,
    SHOW_ONLY_TWENTY,
} from 'store/dashboard/sortedSubjectList';
import {
    RESET_UNSORTED_SUBJECTS_LIST,
    SAVE_UNSORTED_SUBJECTS_LIST,
    ERROR_SAVE_UNSORTED_SUBJECTS_LIST,
} from 'store/dashboard/subjectsListSlice';
import { RESET_CURRENT_PAGE } from 'store/pagination/pageTracker';
import { useNavigate } from 'react-router-dom';

interface IPaginationHeader {
    unsortedData: any[];
}

// eslint-disable-next-line arrow-body-style
const PaginationHeader = ({ unsortedData }: IPaginationHeader) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div className="pagination-header__container">
            <div className="func-wrapper">
                <span>Subjects: </span>
                <span>
                    <FormControl>
                        <Tooltip title="No. of subjects should be shown">
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
                        </Tooltip>
                    </FormControl>
                </span>
            </div>

            <div
                className="func-wrapper"
                onClick={() => {
                    navigate('/dashboard/search');
                }}
            >
                <span>
                    <Tooltip title="Search a Subject">
                        <SearchIcon />
                    </Tooltip>
                </span>
            </div>

            <div
                className="func-wrapper"
                onClick={() => {
                    dispatch(RESET_UNSORTED_SUBJECTS_LIST());
                    dispatch(RESET_SORTED_SUBJECTS_LIST());
                    getSubjectsFromFirestore()
                        .then((data) => dispatch(SAVE_UNSORTED_SUBJECTS_LIST(data)))
                        .catch((err) => dispatch(ERROR_SAVE_UNSORTED_SUBJECTS_LIST(err)));
                }}
            >
                <span>
                    <Tooltip title="Refresh Subjects">
                        <RefreshIcon />
                    </Tooltip>
                </span>
            </div>
        </div>
    );
};

export default PaginationHeader;
