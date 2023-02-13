import styled from 'styled-components';

const colors: { [x: string]: string } = {
    75: '#2979ff;',
    50: '#00e676;',
    25: '#ffb74d;',
    0: '#d50000',
};

const ColoredRemainingVotes = styled.span<{ remainingVotes: number }>`
    color: ${({ remainingVotes }) => {
        if (remainingVotes > 75) return colors[75];
        if (remainingVotes > 50) return colors[50];
        if (remainingVotes > 25) return colors[25];
        if (remainingVotes > 0) return colors[0];
        return '#e0e0e0';
    }};

    outline: 1px solid
        ${({ remainingVotes }) => {
            if (remainingVotes > 75) return colors[75];
            if (remainingVotes > 50) return colors[50];
            if (remainingVotes > 25) return colors[25];
            if (remainingVotes > 0) return colors[0];
            return '#787878';
        }};
`;

export default ColoredRemainingVotes;
