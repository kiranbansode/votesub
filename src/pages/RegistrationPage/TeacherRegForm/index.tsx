import TextInputField from 'components/TextInputField';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface ITeacherRegForm {
    /**
     * error object from useForm().[formState](https://react-hook-form.com/api/useform/formstate).
     */
    errors: FieldErrors;
    /**
     * register() from useForm().[register](https://react-hook-form.com/api/useform/register)
     */
    register: (fieldName: string) => UseFormRegisterReturn;
}

const TeacherRegForm = ({ errors, register }: ITeacherRegForm) => (
    <>
        <TextInputField
            separateLabel
            errors={errors}
            formRegister={register('schoolName')}
            inputLabel="School Name"
        />

        <TextInputField
            separateLabel
            errors={errors}
            formRegister={register('mobileNo')}
            inputLabel="Mobile No."
        />
    </>
);

export default TeacherRegForm;
