import { Alert, AlertTitle } from '@mui/material';
import InputFieldWrapper from 'styled/InputFieldWrapper';

import('./ErrorView.styles.scss');

interface IErrorView {
    errorTitle: string;
    mssg: string;
    makeItNormalCase?: boolean;
}

const ErrorView = ({ errorTitle, mssg, makeItNormalCase = false }: IErrorView) => (
    <InputFieldWrapper className="error-view__container">
        <Alert severity="error" variant="filled">
            <AlertTitle>{makeItNormalCase ? errorTitle : errorTitle.toUpperCase()}</AlertTitle>
            {mssg}
        </Alert>
    </InputFieldWrapper>
);

export default ErrorView;
