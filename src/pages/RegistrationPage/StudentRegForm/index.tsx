import { UseFormRegisterReturn, FieldErrors, Control } from 'react-hook-form';
import TextInputField from 'components/TextInputField';
import SelectInputField from 'components/SelectInputField';
import { standardOptions } from 'utils/menuOptions/standards';
import { divisionOptions } from 'utils/menuOptions/divisions';

interface IStudentRegForm {
    /**
     * error object from useForm().[formState](https://react-hook-form.com/api/useform/formstate).
     */
    errors: FieldErrors;
    /**
     * register() from useForm().[register](https://react-hook-form.com/api/useform/register)
     */
    control: Control;
    register: (fieldName: string) => UseFormRegisterReturn;
}

const StudentRegForm = ({ errors, control, register }: IStudentRegForm) => (
    <>
        <TextInputField
            separateLabel
            errors={errors}
            formRegister={register('schoolName')}
            inputLabel="School Name"
        />

        <SelectInputField
            showSeparateLabel
            control={control}
            fieldName="std"
            inputErrors={errors}
            inputLabel="Standard"
            options={standardOptions}
        />

        <SelectInputField
            showSeparateLabel
            control={control}
            fieldName="div"
            inputErrors={errors}
            inputLabel="Division"
            options={divisionOptions}
        />

        <TextInputField
            separateLabel
            errors={errors}
            formRegister={register('mobileNo')}
            inputLabel="Mobile No. (WhatsApp)"
        />

        <TextInputField
            separateLabel
            errors={errors}
            formRegister={register('altMobileNo')}
            inputLabel="Alternate Mobile No."
        />
    </>
);

export default StudentRegForm;
