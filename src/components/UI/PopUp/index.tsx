import { useEffect, useState } from 'react';
import { Snackbar, Alert, AlertProps } from '@mui/material';

interface IPopUp {
    mssg: string;
    duration: number;
    positionH: 'left' | 'center' | 'right';
    positionV: 'top' | 'bottom';
    type: AlertProps['severity'];
    popUpCondition: boolean;
}

const PopUp = ({ mssg, duration, positionH, positionV, type, popUpCondition }: IPopUp) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        if (popUpCondition) {
            setShow(true);
        }
    }, []);

    return (
        <Snackbar
            anchorOrigin={{ horizontal: positionH, vertical: positionV }}
            autoHideDuration={duration}
            open={show}
            onClose={handleClose}
        >
            <Alert severity={type} sx={{ width: '100%' }} onClose={handleClose}>
                {mssg}
            </Alert>
        </Snackbar>
    );
};

export default PopUp;
