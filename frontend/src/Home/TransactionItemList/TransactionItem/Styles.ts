import { color } from '../../../shared/utils/styles';
import styled from 'styled-components';

export type TransactionProps = {
    item?: any;
};

export const StyledTransactionItem = styled.div`
    display: flex;
    background: #fff;
    padding: 1rem;
    border-radius: 1rem;
`;

export const TransactionName = styled.div`
    color: ${color.textSecondary};
    font-size: 0.9rem;
`;
export const TransactionDate = styled.div`
    color: ${color.textSecondary};
    font-size: 0.9rem;
    text-align: right;
`;
export const TransactionCategory = styled.div`
    font-weight: bold;
    margin-bottom: 1rem;
`;
export const TransactionAmount = styled.div`
    text-align: right;
    font-weight: bold;
    margin-bottom: 1rem;
`;
