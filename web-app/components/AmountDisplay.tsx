import React from 'react';
import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';
import {
  formatStringAmount,
  getIntegerAndDecimalParts,
  checkIfStringAmountIsZero,
} from '../utils/stringAmountUtils';

type sizeType = 'small' | 'medium';
type inactiveType = boolean;

interface AmountDisplayProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading?: false;
  /**
   * Currency amount
   */
  amount: string;
  /**
   * Amount Display Size (small: 40px, medium: 48px)
   */
  size?: sizeType;
  /**
   * Is component inactive?
   */
  inactive?: inactiveType;
  /**
   * Should grouping separator be displayed?
   */
  useGrouping?: boolean;
  /**
   * Max number of decimals for display
   */
  maxDecimals?: number;
  /**
   * Should trailing zeros be added to always match the desired
   * number of decimals?
   */
  shouldAddTrailingZeros?: boolean;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
};

interface LoadingProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading: true;
  /**
   * Amount Display Size (small: 40px, medium: 48px)
   */
  size?: sizeType;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
  amount?: never;
  inactive?: never;
  useGrouping?: never;
  maxDecimals?: never;
  shouldAddTrailingZeros?: never;
};

type Props = LoadingProps | AmountDisplayProps;

const calculateAmountTextSizeCSS = (size: sizeType) => {
  if (size === 'small') {
    return (`
      font-size: 2.5rem;
      margin-left: 1px;
    `);
  };
  if (size === 'medium') {
    return (`
      font-size: 3rem;
      margin-left: -2px
    `);
  };
};

const calculateCurrencySymbolSizeCSS = (size: sizeType) => {
  if (size === 'small') {
    return (`top: 7px;`);
  };
  if (size === 'medium') {
    return (`top: 0`);
  };
};

const Container = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  };
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const AmountText = styled.h3<{size: sizeType, inactive?: inactiveType}>`
  font-style: normal;
  font-weight: 400;
  ${(props) => calculateAmountTextSizeCSS(props.size)};
  margin-block-start: 0px;
  margin-block-end: 0px;
  color: #FFFFFF;
  ${(props) => props.inactive && `opacity: 0.5 !important`};
`;

const CurrencySymbol = styled(AmountText)`
  position: relative;
  ${(props) => calculateCurrencySymbolSizeCSS(props.size)};
  margin-left: 0;
  font-size: 1.125rem;
  opacity: 0.7;
  flex-shrink: 0;
`;

const DecimalText = styled.span`
  color: #F8F8F8;
  opacity: 0.3;
`;

const AmountDisplay = ({
  amount,
  size = 'small',
  inactive = false,
  useGrouping = true,
  maxDecimals = 2,
  shouldAddTrailingZeros = true,
  className,
  isLoading,
  ...props
}: Props) => {
  if (isLoading) {
    return (
      <Container className={ className }>
        <Skeleton
          variant='text'
          width='12rem'
          sx={{
            bgcolor: 'grey.800',
            textTransform: 'uppercase',
            fontSize: size === 'medium' ? '3rem' : '2.5rem',
          }}
          data-testid='skeleton'
        />
      </Container>
    );
  };

  const formattedAmount = formatStringAmount(amount, {
    useGrouping,
    maxDecimals,
    shouldAddTrailingZeros,
  });
  const {
    integerPart,
    decimalPart,
  } = getIntegerAndDecimalParts(formattedAmount);

  return (
    <Container className={ className }>
      <CurrencySymbol size={ size } inactive={ inactive }>$</CurrencySymbol>
      <AmountText size={ size } inactive={ inactive } { ...props }>
        <span>
          { integerPart }
        </span>
        {
          checkIfStringAmountIsZero(amount) || decimalPart.length === 0 ||
          <>
            <span>.</span>
            <DecimalText>{ decimalPart }</DecimalText>
          </>
        }
      </AmountText>
    </Container>
  );
};

export default AmountDisplay;
