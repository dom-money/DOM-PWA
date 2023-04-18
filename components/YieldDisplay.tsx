import React from 'react';
import styled, { useTheme } from 'styled-components';
import TriangleIcon from '../styles/icons/TriangleIcon';
import { ThemeType } from '../styles/theme';

type YieldDisplayProps =
  ({
  /**
   * Type of Yield Display
   */
  type?: 'short';
  /**
   * Average Annual percentage yield value
   */
  averageAPY?: never;
} | {
  /**
   * Type of Yield Display
   */
  type: 'long';
  /**
   * Average Annual percentage yield value
   */
  averageAPY?: number;
}) & {
  /**
   * Yield value
   */
  yieldValue: number;
  /**
   * Yield percentage
   */
  yieldValuePercentage: number;
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

const Text = styled.p`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  margin: 0;
  color: #ffffff;
`;

const SuccessText = styled(Text)`
  font-weight: 500;
  color: ${(props) => props.theme.colors.success};
`;

const StyledTriangleIcon = styled(TriangleIcon)`
  position: relative;
  top: 4px;
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
      <Wrapper { ...props }>
        <SuccessText>
          +${ yieldValue }
        </SuccessText>
        <Text>
          +{ yieldValuePercentage }%
        </Text>
      </Wrapper>
    );
  };

  return (
    <Wrapper { ...props }>
      <YieldContainer>
        <StyledTriangleIcon color={ theme.colors.success } />
        <SuccessText>
          ${ yieldValue } (+{ yieldValuePercentage }%)
        </SuccessText>
      </YieldContainer>
      <Text>
        Average APY { averageAPY }%
      </Text>
    </Wrapper>
  );
};

export default YieldDisplay;
