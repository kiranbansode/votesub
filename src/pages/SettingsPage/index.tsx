/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { FieldValues, useForm } from 'react-hook-form';
import Header from 'components/Header';
import SwitchInputField from 'components/SwitchInputField';
import PageNotFound from 'pages/PageNotFound';
import './SettingsPage.styles.scss';

const settingPageDefaultValues = {
    enableDarkMode: false,
};

const SettingsPage = () => {
    const { handleSubmit, control } = useForm<FieldValues>({
        defaultValues: settingPageDefaultValues,
    });
    return (
        <PageNotFound
            code={503}
            mssg="The page you are looking for is under development. Please come back again after some time."
            title="Under Development"
        />
    );

    // (
    //     <div>
    //         <Header />
    //         <h2>Settings Page</h2>

    //         <form onClick={handleSubmit((data) => console.log(data))}>
    //             <SwitchInputField control={control} fieldName="enableDarkMode" helperText="" />
    //         </form>
    //     </div>
    // );
};

export default SettingsPage;
