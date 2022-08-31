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
  /**
   * Transaction ID
   */
  id?: never;
  /**
   * Transaction name
   */
  name?: never;
  /**
   * Transaction type
   */
  type?: never;
  /**
   * Transaction time and date (UTC Epoch in seconds)
   */
  timestamp?: never;
  /**
   * Transaction amount
   */
  amount?: never;
};

type TransactionPropsWithLoading = LoadingProps | TransactionProps;

interface TextSkeletonProps {
  type?: 'nameText';
};

const incomeOrOutcome = (type: TransactionType | null) => {
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
  };
  return null;
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
    sx={{
      bgcolor: 'grey.800',
      fontSize: type === 'nameText' ? '0.875rem' : '0.75rem',
    }}
  />;

const Transaction = ({
  id,
  name,
  type,
  timestamp,
  amount,
  isLoading,
}: TransactionPropsWithLoading) => {
  const incomeOrOutcomeType = incomeOrOutcome(type ?? null);

  return (
    <Wrapper>
      <IconContainer>
        {
          isLoading ?
          <IconSkeleton /> :
          <GenericTransactionIcon color='#ffffff' css='opacity: 0.5;'/>
        }
      </IconContainer>
      <DataContainer>
        <NameText>
          {isLoading ? <TextSkeleton type='nameText' /> : name}
        </NameText>
        <AmountText type={incomeOrOutcomeType}>
          {
            isLoading ?
            <TextSkeleton /> :
            <>
              {incomeOrOutcomeType === 'income' && '+'}
              {incomeOrOutcomeType === 'outcome' && '-'}
              ${formatAmountString(amount, 2)}
            </>
          }
        </AmountText>
        <TypeText>
          {isLoading ? <TextSkeleton /> : type}
        </TypeText>
        <TimestampText>
          {isLoading ? <TextSkeleton /> : dateStringifier(timestamp)}
        </TimestampText>
      </DataContainer>
    </Wrapper>
  );
};

export default Transaction;
