import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

interface Props {
    amount: number;
}
export const StyledTransactionItem = styled.div`
    display: flex;
    color: ${({ theme }) => theme.color};
    padding: 1rem;
    border-radius: 1rem;
`;

export const TransactionName = styled.div`
    font-size: 0.9rem;
    font-weight: 400;
    color: ${colors.N900};
`;
export const TransactionDate = styled.div`
    color: ${colors.N600};
    font-size: 0.9rem;
    text-align: right;
`;
export const TransactionCategory = styled.div`
    margin-bottom: 1rem;
`;
export const TransactionAmount = styled('div')<Props>`
    text-align: right;
    font-weight: bold;
    margin-bottom: 1rem;
    color: ${({ amount }) => (amount > 0 ? colors.R400 : colors.G400)};
`;
