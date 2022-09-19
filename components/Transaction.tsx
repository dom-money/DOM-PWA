import React from 'react';
import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';
import GenericTransactionIcon from '../styles/icons/GenericTransactionIcon';
import dateStringifier from '../utils/dateStringifier';
import formatAmountString from '../utils/formatAmountString';

type TransactionType =
  | 'Crypto Top Up'
  | 'Card Top Up'
  | 'Invest'
  | 'Withdraw'
  | 'Transfer';

export interface TransactionProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading?: false;
  /**
   * Transaction ID
   */
  id: string;
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
  amount: string;
};

interface LoadingProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading: true;
  id?: never;
  name?: never;
  type?: never;
  timestamp?: never;
  amount?: never;
};

type Props = LoadingProps | TransactionProps;

interface TextSkeletonProps {
  type?: 'nameText';
};

const incomeOrOutcome = (type: TransactionType) => {
  const income = [ 'Crypto Top Up', 'Card Top Up', 'Withdraw' ];
  const outcome = [ 'Invest', 'Transfer' ];
  if (income.includes(type)) return 'income';
  if (outcome.includes(type)) return 'outcome';
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

// eslint-disable-next-line max-len
const AmountText = styled(TypeText)<{type?: ReturnType<typeof incomeOrOutcome>}>`
  ${(props) =>
    props.type === 'income' && `color: ${props.theme.colors.success}`};
  ${(props) => props.type === 'outcome' && `color: #FFFFFF`};
  ${(props) => props.type || `color: #FFFFFF`};
  opacity: 1;
  justify-self: end;
`;

const TimestampText = styled(TypeText)`
  justify-self: end;
`;

const IconSkeleton = () =>
  <Skeleton
    variant='rectangular'
    width='2.5rem'
    height='2.5rem'
    sx={{ bgcolor: 'grey.800' }}
  />;

const TextSkeleton = ({ type }: TextSkeletonProps) =>
  <Skeleton
    variant='text'
    width={type === 'nameText' ? '8rem' : '4rem'}
    sx={{ bgcolor: 'grey.800' }}
  />;

const Transaction = ({
  id,
  name,
  type,
  timestamp,
  amount,
  isLoading,
}: TransactionPropsWithLoading) => {
  if (isLoading) {
    return (
      <Wrapper>
        <IconContainer>
          <IconSkeleton />
        </IconContainer>
        <DataContainer>
          <NameText>
            <TextSkeleton type='nameText' />
          </NameText>
          <AmountText>
            <TextSkeleton />
          </AmountText>
          <TypeText>
            <TextSkeleton />
          </TypeText>
          <TimestampText>
            <TextSkeleton />
          </TimestampText>
        </DataContainer>
      </Wrapper>
    );
  };

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
          <>
            {incomeOrOutcomeType === 'income' && '+'}
            {incomeOrOutcomeType === 'outcome' && '-'}
            ${formatAmountString(amount, 2)}
          </>
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
