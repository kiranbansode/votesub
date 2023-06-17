import styled from 'styled-components';

/**
 * CandidatesPosition is styled component which will return `<p>` element, but with some styles.
 * Depending upon the number of candidates and position number the background-color property and
 * color property of `<p>` element will be different
 *
 * @param {number} position position of candidate in sorted array
 * @return  `<p>` element which shows position of candidate
 */
const CandidatePosition = styled.p.attrs({ className: 'candidate-position' })<{ position: number }>`
    background-color: ${({ position }) => {
        const colors: { [x: string]: string } = {
            1: '#FAFF00 !important;',
            2: '#EAF6FF !important;',
            3: '#D16400 !important;',
        };
        // eslint-disable-next-line no-prototype-builtins
        if (colors.hasOwnProperty(position)) {
            return colors[position];
        }
        return '#fff';
    }};
    color: ${({ position }) => position === 3 && '#fff'};
`;

export default CandidatePosition;
