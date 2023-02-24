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
    className = '',
}: ILoadingScreen) => (
    <div
        className={`${className} loading-screen-container`}
        style={fullScreen ? { height: 'calc(100vh - 80px)' } : { height: '100%' }}
    >
        <CircularProgress color={color} size={size} />
    </div>
);

export default LoadingScreen;
