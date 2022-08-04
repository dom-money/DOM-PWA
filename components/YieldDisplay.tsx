import React from 'react';
import styled, { useTheme } from 'styled-components';
import TriangleIcon from '../styles/icons/TriangleIcon';
import { ThemeType } from '../styles/theme';

interface YieldDisplayProps {
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
  averageAPY: number;
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

const YieldText = styled.p`
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

const AverageAPYText = styled(YieldText)`
  color: #ffffff;
  font-weight: 400;
`;

const YieldDisplay = ({
  yieldValue,
  yieldValuePercentage,
  averageAPY,
  ...props
}: YieldDisplayProps) => {
  const theme = useTheme() as ThemeType;
  return (
    <Wrapper {...props}>
      <YieldContainer>
        <StyledTriangleIcon color={theme.colors.success} />
        <YieldText>
          ${yieldValue} (+{yieldValuePercentage}%)
        </YieldText>
      </YieldContainer>
      <AverageAPYText>
        Average APY {averageAPY}%
      </AverageAPYText>
    </Wrapper>
  );
};

export default YieldDisplay;
