import React from 'react';
import styled from 'styled-components';
import GenericTransactionIcon from '../styles/icons/GenericTransactionIcon';
import dateStringifier from '../utils/dateStringifier';

type TransactionType =
  | 'Crypto Top Up'
  | 'Card Top Up'
  | 'Invest'
  | 'Withdraw'
  | 'Transfer';

export interface TransactionProps {
  /**
   * Transaction ID
   */
  id: number;
  /**
   * Transaction name
   */
  name: string;
  /**
   * Transaction type
   */
  type: TransactionType;
  /**
   * Transaction time and date (UTC Epoch in seconds)
   */
  timestamp: number;
  /**
   * Transaction amount
   */
  amount: number;
};

const incomeOrOutcome = ( type: TransactionType) => {
  if (
    type === 'Crypto Top Up' ||
    type === 'Card Top Up' ||
    type === 'Withdraw'
  ) {
    return 'income';
  };
  if (
    type === 'Invest' ||
    type === 'Transfer'
  ) {
    return 'outcome';
  }
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.125rem;
  width: 100%;
`;

const DataContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: center;
  row-gap: 0.313rem;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  width: 2.5rem;
  flex-shrink: 0;
  border-radius: 4px;
  background-color: #272727;
  overflow: hidden;
`;

const NameText = styled.h3`
  font-style: normal;
  font-weight: 300;
  font-size: 0.875rem;
  color: #FFFFFF;
  // word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  min-width: 0;
`;

const TypeText = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 0.75rem;
  color: #F8F8F8;
  opacity: 0.5;
  margin: 0;
  min-width: 0;
`;

const AmountText = styled(TypeText)<{type: ReturnType<typeof incomeOrOutcome>}>`
  ${(props) =>
    props.type === 'income' && `color: ${props.theme.colors.success}`};
  ${(props) => props.type === 'outcome' && `color: #FFFFFF`};
  opacity: 1;
  justify-self: end;
`;

const TimestampText = styled(TypeText)`
  justify-self: end;
`;

const Transaction = ({
  id,
  name,
  type,
  timestamp,
  amount,
}: TransactionProps) => {
  const incomeOrOutcomeType = incomeOrOutcome(type);

  return (
    <Wrapper>
      <IconContainer>
        <GenericTransactionIcon color='#ffffff' css='opacity: 0.5;'/>
      </IconContainer>
      <DataContainer>
        <NameText>
          {name}
        </NameText>
        <AmountText type={incomeOrOutcomeType}>
          {incomeOrOutcomeType === 'income' && '+'}
          {incomeOrOutcomeType === 'outcome' && '-'}
          ${amount}
        </AmountText>
        <TypeText>
          {type}
        </TypeText>
        <TimestampText>
          {dateStringifier(timestamp)}
        </TimestampText>
      </DataContainer>
    </Wrapper>
  );
};

export default Transaction;
