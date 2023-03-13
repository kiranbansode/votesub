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
    fullScreenPlus?: boolean;
    className?: string;
}

/**
 * `LoadingScreen` component will return a circular progress bar right in the middle of parent div
 * @param  {string} color  set color to progress bar
 * @return Circular Progress bar
 */

const LoadingScreen = ({
    color = 'primary',
    size = 25,
    fullScreen = false,
    fullScreenPlus = false,
    className = '',
}: ILoadingScreen) => (
    <div
        className={`${className} loading-screen-container`}
        style={
            // eslint-disable-next-line no-nested-ternary
            fullScreen
                ? { height: 'calc(100vh - 80px)' }
                : fullScreenPlus
                ? { height: '100vh' }
                : { height: '100%' }
        }
    >
        <CircularProgress color={color} size={size} />
    </div>
);

export default LoadingScreen;
