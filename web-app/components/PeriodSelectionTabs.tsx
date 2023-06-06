import React from 'react';
import styled from 'styled-components';

export type Period = 'Today' | 'Week' | 'Month' | 'Year' | 'All Time';

interface PeriodSelectionTabsProps {
  /**
   * Selected Period
   */
  selectedPeriod: Period;
  /**
   * Tab button click handler
   */
  onClick: (period: Period) => void;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
};

interface ButtonElementProps {
  selected: boolean;
};

export const PERIODS: Period[] = [
  'Today', 'Week', 'Month', 'Year', 'All Time',
];

const Wrapper = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const ButtonElement = styled.button<ButtonElementProps>`
  font-style: normal;
  font-weight: 300;
  font-size: 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: ${( props ) => props.selected ? '#272727' : 'transparent'} ;
  padding:
    ${( props ) => props.selected ? '0.5rem 1.25rem' : '0.5rem 0.625rem'};
  color: ${( props ) => props.selected ? '#ffffff' : '#F8F8F8'} ;
  ${( props ) => !props.selected && 'opacity: 0.5'} ;
  text-transform: capitalize;
  overflow: auto;
  cursor: pointer;
`;

const PeriodSelectionTabs = ({
  selectedPeriod,
  onClick,
  ...props
}: PeriodSelectionTabsProps) => {
  return (
    <Wrapper { ...props }>
      { PERIODS.map((period) =>
        <ButtonElement
          key={ period }
          selected={ selectedPeriod === period }
          onClick={ () => onClick(period) }
        >
          { period }
        </ButtonElement>,
      ) }
    </Wrapper>
  );
};

export default PeriodSelectionTabs;
