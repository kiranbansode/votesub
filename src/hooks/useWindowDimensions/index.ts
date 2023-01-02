import { useState, useEffect } from 'react';

/**
 *  Credit : Hurt Hedgehog [Dennis Muensterer]
 *  {@link}[https://www.grepper.com/profile/dennis-muensterer]
 */
const useWindowDimensions = () => {
    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        // I moved this function declaration out of if block
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        if (hasWindow) {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

    return windowDimensions;
};

export default useWindowDimensions;
