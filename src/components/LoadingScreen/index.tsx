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
    size?: number;
    fullScreen?: boolean;
}

/**
 * `LoadingScreen` component will return a circular progress bar right in the middle of screen
 * @param  {string} color  set color to progress bar
 * @return Circular Progress bar
 */

const LoadingScreen = ({ color, size, fullScreen }: ILoadingScreen) => (
    <div
        className="loading-screen-container"
        style={fullScreen ? { height: '100vh' } : { height: '100%' }}
    >
        <CircularProgress color={color} size={size} />
    </div>
);

LoadingScreen.defaultProps = {
    color: 'primary',
    size: 40,
    fullScreen: false,
};

export default LoadingScreen;
