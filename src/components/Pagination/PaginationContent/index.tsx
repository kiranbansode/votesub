import VotingSubject from 'components/VotingSubject';
import useAppSelector from 'hooks/useAppSelector';
import LoadingScreen from 'components/LoadingScreen';
import { ISubjectData } from 'types/subjectDetails';

import './PaginationContent.styles.scss';
import ErrorView from 'components/ErrorView';

interface IPaginationContent {
    sortedData: any[];
}

const PaginationContent = ({ sortedData }: IPaginationContent) => {
    const subjectList = useAppSelector(({ subjectsList }) => subjectsList);
    const { error: subjectsError, loading: subjectsLoading } = subjectList;
    const { currentPage } = useAppSelector(({ currPaginationPage }) => currPaginationPage);

    if (subjectsLoading === false && subjectsError === true && sortedData.length === 0)
        return (
            <ErrorView
                errorTitle="Error"
                mssg="No Subjects Found!. You can add your own new subjects in Add New Subject page"
            />
        );

    return sortedData.length > 0 ? (
        <div className="pagination-content__container">
            {sortedData[currentPage].map((subject: ISubjectData) => (
                <VotingSubject key={subject.id} subject={subject} />
            ))}
        </div>
    ) : (
        <LoadingScreen className="pagination-content__loading" />
    );
};

export default PaginationContent;
