import VotingSubject from 'components/VotingSubject';
import useAppSelector from 'hooks/useAppSelector';
import LoadingScreen from 'components/LoadingScreen';
import { ISubjectData } from 'types/subjectDetails';

interface IPaginationContent {
    sortedData: any[];
}

const PaginationContent = ({ sortedData }: IPaginationContent) => {
    // const sortedList = useAppSelector(({ sortedSubjects }) => sortedSubjects.list);
    const { currentPage } = useAppSelector(({ currPaginationPage }) => currPaginationPage);

    return (
        <div>
            {sortedData.length > 0 ? (
                sortedData[currentPage].map((subject: ISubjectData) => (
                    <VotingSubject key={subject.id} subject={subject} />
                ))
            ) : (
                <LoadingScreen />
            )}
        </div>
    );
};

export default PaginationContent;
