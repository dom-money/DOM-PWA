import React from 'react';
import styled, { useTheme } from 'styled-components';
import TriangleIcon from '../styles/icons/TriangleIcon';
import { ThemeType } from '../styles/theme';

interface YieldDisplayProps {
  /**
   * Type of Yield Display
   */
  type?: 'short' | 'long';
  /**
   * Yield value
   */
  yieldValue: number;
  /**
   * Yield percentage
   */
  yieldValuePercentage: number;
  /**
   * Average Annual percentage yield value
   */
  averageAPY?: number;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  gap: 1.25rem;
`;

const YieldContainer = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const SuccessText = styled.p`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  margin: 0;
  color: ${(props) => props.theme.colors.success};
`;

const StyledTriangleIcon = styled(TriangleIcon)`
  position: relative;
  top: 4px;
`;

const WhiteText = styled(SuccessText)`
  color: #ffffff;
  font-weight: 400;
`;

const YieldDisplay = ({
  type = 'short',
  yieldValue,
  yieldValuePercentage,
  averageAPY = 0,
  ...props
}: YieldDisplayProps) => {
  const theme = useTheme() as ThemeType;
  if (type === 'short') {
    return (
      <Wrapper {...props}>
        <SuccessText>
          +${yieldValue}
        </SuccessText>
        <WhiteText>
          +{yieldValuePercentage}%
        </WhiteText>
      </Wrapper>
    );
  }
  return (
    <Wrapper {...props}>
      <YieldContainer>
        <StyledTriangleIcon color={theme.colors.success} />
        <SuccessText>
          ${yieldValue} (+{yieldValuePercentage}%)
        </SuccessText>
      </YieldContainer>
      <WhiteText>
        Average APY {averageAPY}%
      </WhiteText>
    </Wrapper>
  );
};

export default YieldDisplay;
