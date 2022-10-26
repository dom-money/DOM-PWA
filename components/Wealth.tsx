import React, { useState } from 'react';
import styled from 'styled-components';

import CollapsibleContainer from './CollapsibleContainer';
import AmountDisplay from './AmountDisplay';
import PeriodSelectionTabs, { Period } from './PeriodSelectionTabs';
import IconButton from './IconButton';
import WithdrawIcon from '../styles/icons/WithdrawIcon';
import YieldDisplay from './YieldDisplay';
import Chart from './Chart';
import { checkIfStringAmountIsZero } from '../utils/stringAmountUtils';

interface WealthProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading?: false;
  /**
   * Currency amount
   */
  amount: string;
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
};

interface LoadingProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading: true;
  amount?: never;
  yieldValue?: never;
  yieldValuePercentage?: never;
  averageAPY?: never;
};

type Props = LoadingProps | WealthProps;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AmountTopContainer = styled.div`
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

const chartData = Array.from(Array(7 * 8), (_, index) => {
  const randomValue = Math.round(Math.random() * 100);
  return {
    // Every 3 hours for the last week
    date: new Date(new Date().getTime() - 3600 * 3 * 1000 * index),
    value: randomValue,
    label: `+$${ randomValue }`,
  };
});

const Wealth = ({
  amount,
  yieldValue = 0,
  yieldValuePercentage = 0,
  averageAPY = 0,
  isLoading,
}: Props) => {
  const [ isContainerCollapsed, setIsContainerCollapsed ] = useState(false);

  const [ selectedPeriod, setSelectedPeriod ] = useState<Period>('Today');

  if (isLoading) {
    return (
      <CollapsibleContainer
        label='Wealth'
        isCollapsed={false}
        primaryContent={
          <ContentContainer>
            <AmountTopContainer>
              <AmountDisplay isLoading size='small' />
            </AmountTopContainer>
          </ContentContainer>
        }
      />
    );
  };

  const handleCollapseClick = () => {
    setIsContainerCollapsed(!isContainerCollapsed);
  };

  const handleChangeTabClick = (period: Period) => {
    setSelectedPeriod(period);
  };

  const PrimaryContentCollapsed = () => {
    return (
      <ContentContainer>
        <AmountTopContainer>
          <AmountDisplay
            amount={amount}
            size='small'
          />
          <IconButton
            size='large'
            backgroundColor='#020202'
            asAnchor={true}
            href={'/withdraw'}
            ariaLabel='Withdraw Button'
          >
            <WithdrawIcon color='#FFFFFF'/>
          </IconButton>
        </AmountTopContainer>
        <YieldDisplayWithMargin
          type={'long'}
          yieldValue={yieldValue}
          yieldValuePercentage={yieldValuePercentage}
          averageAPY={averageAPY}
        />
        <PeriodSelectionTabsWithMargin
          selectedPeriod={selectedPeriod}
          onClick={handleChangeTabClick}
        />
      </ContentContainer>
    );
  };

  const PrimaryContentNotCollapsed = () => {
    return (
      <ContentContainer>
        <AmountTopContainer>
          <AmountDisplay
            amount={amount}
            size='small'
          />
          <YieldDisplay
            type={'short'}
            yieldValue={yieldValue}
            yieldValuePercentage={yieldValuePercentage}
          />
        </AmountTopContainer>
        <PeriodSelectionTabsWithMargin
          selectedPeriod={selectedPeriod}
          onClick={handleChangeTabClick}
        />
      </ContentContainer>
    );
  };

  const inactive = checkIfStringAmountIsZero(amount);

  if (inactive) {
    return (
      <CollapsibleContainer
        label='Wealth'
        isCollapsed={false}
        primaryContent={
          <ContentContainer>
            <AmountTopContainer>
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
            </AmountTopContainer>
          </ContentContainer>
        }
      />
    );
  };

  return (
    <CollapsibleContainer
      label='Wealth'
      isCollapsed={isContainerCollapsed}
      onCollapseClick={handleCollapseClick}
      primaryContent={isContainerCollapsed ?
        <PrimaryContentCollapsed /> : <PrimaryContentNotCollapsed />
      }
      secondaryContent={
        <Chart
          data={chartData}
        />
      }
    />
  );
};

export default Wealth;
