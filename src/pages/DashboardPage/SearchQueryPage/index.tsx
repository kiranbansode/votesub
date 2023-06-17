/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectInputField from 'components/InputFields/SelectInputField';
import './SearchQuery.styles.scss';
import TextInputField from 'components/InputFields/TextInputField';
import Button from 'components/UI/Button';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { ISubjectData } from 'types/subjectDetails';
import Header from 'components/layouts/Header';
import Separator from 'components/UI/Separator';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VotingSubject from 'components/core/VotingSubject';
import ErrorView from 'components/UI/ErrorView';
import {
    RESET_FILTERED_SUBJECTS,
    SAVE_FILTERED_SUBJECTS,
    SAVE_ERROR_FILTERED_SUBJECTS,
} from 'store/saveFilteredSubjects';

interface ISearchForm {
    queryType: 'subjectName' | 'candidateName' | 'submittedBy';
    query: string;
}

const searchFormDefaultValues: ISearchForm = {
    queryType: 'subjectName',
    query: '',
};

export type ConditionalSchema<T> = T extends string
    ? yup.StringSchema
    : T extends number
    ? yup.NumberSchema
    : T extends boolean
    ? yup.BooleanSchema
    : T extends Record<any, any>
    ? yup.AnyObjectSchema
    : T extends Array<any>
    ? yup.ArraySchema<any, any>
    : yup.AnySchema;

export type Shape<Fields> = {
    [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};

const searchFormValidations = yup.object<Shape<ISearchForm>>({
    queryType: yup
        .string()
        .trim()
        .required('Please choose a appropriate query type')
        .default('subjectName'),
    query: yup.string().trim().required('Please Enter a valid query').default(''),
});

const SearchQueryPage = () => {
    const { control, handleSubmit, resetField, formState } = useForm<ISearchForm>({
        defaultValues: searchFormDefaultValues,
        resolver: yupResolver(searchFormValidations),
    });
    const subjects: ISubjectData[] | [] = useAppSelector(({ subjectsList }) => subjectsList.list);
    const filteredSubjects = useAppSelector((state) => state.filteredSubjects);
    const dispatch = useAppDispatch();

    const searchQueryOnSubmit: SubmitHandler<ISearchForm> = ({ query, queryType }) => {
        if (query === '') return;

        const filteredArray = subjects.filter((subject) => {
            /**
             * if user only types a part of subjectName or submitter name(submittedBy)
             * then following if check will search for that specific part and return only
             * that particular subject
             */
            if (queryType === 'subjectName' || queryType === 'submittedBy') {
                const queryTypeResult: string = subject[queryType].toLowerCase();
                if (queryTypeResult.includes(query.toLowerCase())) return subject;
            }

            if (queryType === 'candidateName') {
                const candidatesName = subject.candidates.map(({ candidateName }) =>
                    candidateName.toLowerCase(),
                );

                // eslint-disable-next-line no-restricted-syntax
                for (const candidate of candidatesName) {
                    if (candidate.includes(query.toLowerCase())) {
                        return subject;
                    }
                }

                /* ------ This is not working even though the logic is same as for loop ----- */
                // candidatesName.forEach((candidate) => {
                //     if (candidate.includes(query.toLowerCase())) {
                //         return subject;
                //     }
                //     return null;
                // });
            }

            /**
             * If query is not satisfied it will return run and eventually an empty array
             */
            return null;
        });

        if (filteredArray.length === 0) {
            dispatch(SAVE_ERROR_FILTERED_SUBJECTS(filteredArray));
            return;
        }

        dispatch(SAVE_FILTERED_SUBJECTS(filteredArray));
    };

    useEffect(
        () => () => {
            dispatch(RESET_FILTERED_SUBJECTS());
        },
        [],
    );

    return (
        <div className="search-query__page">
            <Header />
            <div className="search-subject__container page-view">
                <h1 className="page-title">-x Search a Subject x-</h1>

                <Separator />
                <form
                    className="default_shadow"
                    onSubmit={handleSubmit((formData) => {
                        searchQueryOnSubmit(formData);
                    })}
                >
                    <SelectInputField
                        separateLabel
                        control={control}
                        fieldName="queryType"
                        inputErrors={formState.errors}
                        inputHelperText="Choose appropriate type based on query"
                        inputLabel="Query Type"
                        options={[
                            {
                                id: 'b20aebf6-e0ea-11ed-b5ea-0242ac120002',
                                option: 'Subject Name',
                                value: 'subjectName',
                            },
                            {
                                id: 'b20af47a-e0ea-11ed-b5ea-0242ac120002',
                                option: 'Submitter Name',
                                value: 'submittedBy',
                            },
                            {
                                id: 'b20af8ee-e0ea-11ed-b5ea-0242ac120002',
                                option: 'Candidate Name',
                                value: 'candidateName',
                            },
                        ]}
                    />

                    <TextInputField
                        required
                        separateLabel
                        showAdornment
                        adornmentButtonHandler={() => {
                            resetField('query', { defaultValue: '' });
                            dispatch(RESET_FILTERED_SUBJECTS());
                        }}
                        control={control}
                        fieldName="query"
                        inputErrors={formState.errors}
                        inputHelperText="Enter a query like name of Subject or Submitter name"
                        inputLabel="Search"
                        inputPlaceholder="Chicken and Egg? or Elon Musk"
                    />

                    <Button type="submit">Submit</Button>
                </form>

                <div className="filtered-subjects__container">
                    {filteredSubjects.list !== null && filteredSubjects.list.length > 0 ? (
                        <>
                            <p className="subject-text">-x Subjects List x-</p>
                            <div className="filtered-subjects__header">
                                <div>Found Subjects : {filteredSubjects.list.length}</div>
                                <div onClick={() => dispatch(RESET_FILTERED_SUBJECTS())}>
                                    <DeleteForeverIcon />
                                </div>
                            </div>
                            {filteredSubjects.list.map((subject: ISubjectData) => (
                                <VotingSubject key={subject.id} subject={subject} />
                            ))}
                        </>
                    ) : filteredSubjects.error ? (
                        <ErrorView
                            errorTitle="Error"
                            mssg="No Subjects found that matches your search query."
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SearchQueryPage;
