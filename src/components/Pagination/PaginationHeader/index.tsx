import { MenuItem, Select, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SortIcon from '@mui/icons-material/Sort';
import './PaginationHeader.styles.scss';

// eslint-disable-next-line arrow-body-style
const PaginationHeader = () => {
    return (
        <div className="pagination-header">
            <div className="func-wrapper">
                <span>Subjects: </span>
                <span>
                    <FormControl>
                        <Select className="per-page-selector" defaultValue={5}>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                        </Select>
                    </FormControl>
                </span>
            </div>

            <div className="func-wrapper">
                <span>
                    <SearchIcon />
                </span>
            </div>

            <div className="func-wrapper">
                <span>
                    <FilterAltOutlinedIcon />
                </span>
            </div>

            <div className="func-wrapper">
                <span>
                    <SortIcon />
                </span>
            </div>
        </div>
    );
};

export default PaginationHeader;
