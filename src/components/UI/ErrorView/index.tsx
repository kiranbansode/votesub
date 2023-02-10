import { Alert, AlertTitle } from '@mui/material';
import InputFieldWrapper from 'styled/InputFieldWrapper';

import('./ErrorView.styles.scss');

interface IErrorView {
    errorTitle: string;
    mssg: string;
}

const ErrorView = ({ errorTitle, mssg }: IErrorView) => (
    <InputFieldWrapper className="error-view__container">
        <Alert severity="error" variant="filled">
            <AlertTitle>{errorTitle.toUpperCase()}</AlertTitle>
            {mssg}
        </Alert>
    </InputFieldWrapper>
);

export default ErrorView;
