const getSubjectDetailsFromList = (list: any[], id: string) =>
    list.find((subject) => subject.id === id);

export default getSubjectDetailsFromList;
