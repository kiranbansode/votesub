import styled from 'styled-components';

const ColoredRemainingVotes = styled.span<{ remainingVotes: number }>`
    color: ${({ remainingVotes }) => {
        const colors: { [x: string]: string } = {
            75: '#2979ff;',
            50: '#69f0ae;',
            25: '#ffb74d;',
            0: '#d50000',
        };

        if (remainingVotes > 75) return colors[75];
        if (remainingVotes > 50) return colors[50];
        if (remainingVotes > 25) return colors[25];
        if (remainingVotes > 0) return colors[0];
        return '#e0e0e0';
    }};
`;

export default ColoredRemainingVotes;
