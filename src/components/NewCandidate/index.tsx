/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import useAppDispatch from 'hooks/useAppDispatch';
import './NewCandidate.styles.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICandidate } from 'types/addNewSubject';
import { DELETE_CANDIDATE } from 'store/addNewSubject';

interface INewCandidate {
    /**
     *  `candidate` object
     */
    newCandidate: ICandidate;
    /**
     * @type {number}
     * `index` from array method
     */
    indexNumber: number;
    /**
     * `edit` button handler function
     */
    editBtnHandler: (id: string) => void;
}

const NewCandidate = ({ newCandidate, indexNumber, editBtnHandler }: INewCandidate) => {
    const dispatch = useAppDispatch();
    const { candidateName, id } = newCandidate;

    return (
        <div className="candidate-container" key={id}>
            <span className="candidate-position">{indexNumber + 1}</span>
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
