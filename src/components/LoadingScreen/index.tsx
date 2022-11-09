import { CircularProgress, CircularProgressProps } from '@mui/material';
import './LoadingScreen.styles.scss';

interface ILoadingScreen {
    /**
     * `color` choose one the following color palette
     * [here](https://mui.com/material-ui/customization/palette/#default-values)
     *
     * @default 'error'
     */
    color?: CircularProgressProps['color'];
}

/**
 * `LoadingScreen` component will return a circular progress bar right in the middle of screen
 * @param  {string} color  set color to progress bar
 * @return Circular Progress bar
 */

const LoadingScreen = ({ color }: ILoadingScreen) => (
    <div className="loading-screen-container">
        <CircularProgress color={color} />
    </div>
);

LoadingScreen.defaultProps = {
    color: 'error',
};

export default LoadingScreen;
