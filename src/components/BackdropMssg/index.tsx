import { Backdrop as BackdropMUI } from '@mui/material';

import './Backdrop.styles.scss';

interface IBackdropMssg {
    header: string;
    mssg: string;
    open: boolean;
}

const BackdropMssg = ({ header, mssg, open }: IBackdropMssg) => (
    <BackdropMUI open={open}>
        <div className="backdrop-mssg-container">
            <div className="img-container">
                {/* Credits - Lee Porter (https://codepen.io/elevaunt/pen/JYRBzJ) */}
                <svg version="1.1" viewBox="0 0 130.2 130.2" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        className="path circle"
                        cx="65.1"
                        cy="65.1"
                        fill="none"
                        r="62.1"
                        stroke="#73AF55"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                    />
                    <polyline
                        className="path check"
                        fill="none"
                        points="100.2,40.2 51.5,88.8 29.8,67.5 "
                        stroke="#73AF55"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                    />
                </svg>
                {/* Credit End */}
            </div>

            <h2 className="backdrop-header">{header}</h2>
            <p className="backdrop-mssg">
                {mssg} <span className="blink-it">...</span>
            </p>
        </div>
    </BackdropMUI>
);

export default BackdropMssg;
