import React from 'react';
import styled from 'styled-components';

interface PeriodSelectionTabsProps {
  /**
   * Selected Button ID which represents a time period
   */
  selectedButtonID: number;
  /**
   * Tab button click handler
   */
  onClick: (buttonID: number) => void;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
};

interface ButtonElementProps {
  selected: boolean;
}

const PERIODS = [
  {
    id: 0,
    name: 'Today',
  },
  {
    id: 1,
    name: 'Week',
  },
  {
    id: 2,
    name: 'Month',
  },
  {
    id: 3,
    name: 'Year',
  },
  {
    id: 4,
    name: 'All Time',
  },
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
  selectedButtonID,
  onClick,
  ...props
}: PeriodSelectionTabsProps) => {
  return (
    <Wrapper {...props}>
      {PERIODS.map((period) =>
        <ButtonElement
          key={period.id}
          selected={selectedButtonID === period.id}
          onClick={() => onClick(period.id)}
        >
          {period.name}
        </ButtonElement>,
      )}
    </Wrapper>
  );
};

export default PeriodSelectionTabs;
