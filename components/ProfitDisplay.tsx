import React from 'react';
import styled, { useTheme } from 'styled-components';
import TriangleIcon from '../styles/icons/TriangleIcon';
import { ThemeType } from '../styles/theme';

interface ProfitDisplayProps {
  /**
   * Profit value
   */
  profit: number;
  /**
   * Profit percentage
   */
  profitPercentage: number;
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

const ProfitContainer = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const ProfitText = styled.p`
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

const AverageAPYText = styled(ProfitText)`
  color: #ffffff;
  font-weight: 400;
`;

const ProfitDisplay = ({
  profit,
  profitPercentage,
  averageAPY,
  ...props
}: ProfitDisplayProps) => {
  const theme = useTheme() as ThemeType;
  return (
    <Wrapper {...props}>
      <ProfitContainer>
        <StyledTriangleIcon color={theme.colors.success} />
        <ProfitText>
          ${profit} (+{profitPercentage}%)
        </ProfitText>
      </ProfitContainer>
      <AverageAPYText>
        Average APY {averageAPY}%
      </AverageAPYText>
    </Wrapper>
  );
};

export default ProfitDisplay;
