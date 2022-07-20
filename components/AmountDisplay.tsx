import React from 'react';
import styled from 'styled-components';

type sizeType = 'small' | 'medium';
type inactiveType = boolean;

interface AmountDisplayProps {
  /**
   * Currency amount
   */
  amount: number;
  /**
   * Amount Display Size (small: 40px, medium: 48px)
   */
  size?: sizeType;
   /**
   * Is component inactive?
   */
  inactive?: inactiveType;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
}

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
      margin-left: -4px
    `);
  };
};

const calculateCurrencySymbolSizeCSS = (size: sizeType) => {
  if (size === 'small') {
    return (`top: 7px;`);
  };
  if (size === 'medium') {
    return (`top: 4px;`);
  };
};

const Container = styled.div`
  display: flex;
`;

const AmountText = styled.h3<{size: sizeType, inactive: inactiveType}>`
  font-style: normal;
  font-weight: 400;
  ${(props) => calculateAmountTextSizeCSS(props.size)};
  margin-block-start: 0px;
  margin-block-end: 0px;
  color: #FFFFFF;
  overflow: hidden;
  ${(props) => props.inactive && `opacity: 0.5 !important`};
`;

const CurrencySymbol = styled(AmountText)`
  position: relative;
  ${(props) => calculateCurrencySymbolSizeCSS(props.size)};
  margin-left: 0;
  font-size: 1.125rem;
  opacity: 0.7;
`;

const DecimalText = styled.span`
  color: #F8F8F8;
  opacity: 0.3;
`;

const AmountDisplay = ({
  amount,
  size = 'small',
  inactive = false,
  className,
  ...props
}: AmountDisplayProps) => {
  const amountLocaleString = amount.toLocaleString(
      'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  );
  const integerPart = amountLocaleString.match(/[^\.]*/);
  const decimalPart = amountLocaleString.match(/[^\.]*$/);
  return (
    <Container className={className}>
      <CurrencySymbol size={size} inactive={inactive}>$</CurrencySymbol>
      <AmountText size={size} inactive={inactive} {...props}>
        <span>
          {integerPart}
        </span>
        {amount === 0 ||
          <>
            <span>.</span>
            <DecimalText>{decimalPart}</DecimalText>
          </>
        }
      </AmountText>
    </Container>
  );
};

export default AmountDisplay;
