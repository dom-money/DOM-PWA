import React, { useState } from 'react';
import styled from 'styled-components';

import CollapsibleContainer from './CollapsibleContainer';
import AmountDisplay from './AmountDisplay';
import PeriodSelectionTabs from './PeriodSelectionTabs';
import IconButton from './IconButton';
import WithdrawIcon from '../styles/icons/WithdrawIcon';
import YieldDisplay from './YieldDisplay';

interface WealthProps {
  /**
   * Currency amount
   */
  amount: number;
  /**
   * Yield value
   */
  yieldValue?: number;
  /**
   * Yield percentage
   */
  yieldValuePercentage?: number;
  /**
   * Average Annual percentage yield value
   */
  averageAPY?: number;
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AmountAndIconContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const PeriodSelectionTabsWithMargin = styled(PeriodSelectionTabs)`
  margin-top: 1.938rem;
`;

const YieldDisplayWithMargin = styled(YieldDisplay)`
  align-self: flex-start;
  margin-top: 0.563rem;
`;

const Wealth = ({
  amount,
  yieldValue = 0,
  yieldValuePercentage = 0,
  averageAPY = 0,
}: WealthProps) => {
  const [ selectedPeriodTabID, setSelectedPeriodTabID ] = useState(0);

  const handleChangeTabClick = (buttonID: number) => {
    setSelectedPeriodTabID(buttonID);
  };

  const inactive = amount === 0;

  if (inactive) {
    return (
      <CollapsibleContainer
        label='Wealth'
        primaryContent={
          <ContentContainer>
            <AmountAndIconContainer>
              <AmountDisplay
                amount={amount}
                size='small'
                inactive={true}
              />
              <IconButton
                size='large'
                backgroundColor='#020202'
                disabled={true}
                ariaLabel='Withdraw Button'
              >
                <WithdrawIcon color='#FFFFFF'/>
              </IconButton>
            </AmountAndIconContainer>
          </ContentContainer>
        }
      />
    );
  };

  return (
    <CollapsibleContainer
      label='Wealth'
      primaryContent={
        <ContentContainer>
          <AmountAndIconContainer>
            <AmountDisplay
              amount={amount}
              size='small'
            />
            <IconButton
              size='large'
              backgroundColor='#020202'
              href={'/'}
              ariaLabel='Withdraw Button'
            >
              <WithdrawIcon color='#FFFFFF'/>
            </IconButton>
          </AmountAndIconContainer>
          <YieldDisplayWithMargin
            yieldValue={yieldValue}
            yieldValuePercentage={yieldValuePercentage}
            averageAPY={averageAPY}
          />
          <PeriodSelectionTabsWithMargin
            selectedButtonID={selectedPeriodTabID}
            onClick={handleChangeTabClick}
          />
        </ContentContainer>
      }
    />
  );
};

export default Wealth;
