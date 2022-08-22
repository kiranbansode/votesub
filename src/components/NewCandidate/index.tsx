/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import useAppDispatch from 'hooks/useAppDispatch';
import './NewCandidate.styles.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_CANDIDATE } from 'store/addNewTopic';

type Candidate = {
    id: string;
    candidateName: string;
};

interface INewCandidate {
    /**
     *  `canidadate` object
     */
    newCandidate: Candidate;
    /**
     * @type {number}
     * `index` from array method
     */
    idx: number;
    /**
     * `edit` button handler function
     */
    editBtnHandler: (id: string) => void;
}

const NewCandidate = ({ newCandidate, idx, editBtnHandler }: INewCandidate) => {
    const dispatch = useAppDispatch();
    const { candidateName, id } = newCandidate;

    return (
        <div className="candidate-container" key={id}>
            <span className="candidate-position">{idx + 1}</span>
            <p className="candidate-name">{candidateName}</p>
            <span className="edit-button" title="Edit" onClick={() => editBtnHandler(id)}>
                <EditIcon fontSize="small" />
            </span>
            <span
                className="delete-button"
                title="Delete"
                onClick={() => dispatch(DELETE_CANDIDATE(newCandidate.id))}
            >
                <DeleteIcon fontSize="small" />
            </span>
        </div>
    );
};

export default NewCandidate;
