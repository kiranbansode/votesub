/* eslint-disable react/require-default-props */
import { Backdrop as BackdropMUI } from '@mui/material';

import './Backdrop.styles.scss';

interface IBackdropMssg {
    header: string;
    mssg: string;
    open: boolean;
    type: 'success' | 'failed';
    footer?: string;
}

// Credit - Lee Porter (https://codepen.io/elevaunt/pen/JYRBzJ)
const SuccessSVG = () => (
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
);

const FailedSVG = () => (
    <svg version="1.1" viewBox="0 0 130.2 130.2" xmlns="http://www.w3.org/2000/svg">
        <circle
            className="path circle"
            cx="65.1"
            cy="65.1"
            fill="none"
            r="62.1"
            stroke="#D06079"
            strokeMiterlimit="10"
            strokeWidth="6"
        />
        <line
            className="path line"
            fill="none"
            stroke="#D06079"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="6"
            x1="34.4"
            x2="95.8"
            y1="37.9"
            y2="92.3"
        />
        <line
            className="path line"
            fill="none"
            stroke="#D06079"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="6"
            x1="95.8"
            x2="34.4"
            y1="38"
            y2="92.2"
        />
    </svg>
);
// Credit END

const BackdropMssg = ({ header, mssg, open, footer = '', type }: IBackdropMssg) => (
    <BackdropMUI open={open}>
        <div className="backdrop-mssg-container darker_shadow">
            <div className="img-container">
                {type === 'failed' ? <FailedSVG /> : <SuccessSVG />}
            </div>

            <h2 className="backdrop-header">{header}</h2>
            <p className="backdrop-mssg">{mssg}</p>
            <p className="backdrop-footer">
                <span className="blink-it">{footer}</span>
            </p>
        </div>
    </BackdropMUI>
);

export default BackdropMssg;
