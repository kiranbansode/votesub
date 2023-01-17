import standardOptions from 'utils/menuOptions/standards';

const findStudentStandard = (stdValue: number) => {
    const studentStd = standardOptions.filter((std) => std.value === stdValue);
    return studentStd[0].option;
};

export default findStudentStandard;
