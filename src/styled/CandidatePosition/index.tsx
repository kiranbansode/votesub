import styled from 'styled-components';

/**
 * CandidatesPosition is styled component which will return `<p>` element, but with some styles.
 * Depending upon the number of candidates and position number the background-color property and
 * color property of `<p>` element will be different
 *
 * @param {number} position position of candidate in sorted array
 * @return  `<p>` element which shows position of candidate
 */
const CandidatePosition = styled.p<{ position: number }>`
    margin: 0px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px 10px;
    -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ position }) => {
        const colors: { [x: string]: string } = {
            1: '#FAFF00;',
            2: '#EAF6FF;',
            3: '#D16400;',
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
