import React, { useState } from 'react';
import styled from 'styled-components';
import Title from './Title';
import IconButtonCircular from './IconButtonCircular';
import ArrowDownIcon from '../styles/icons/ArrowDownIcon';
import ArrowUpIcon from '../styles/icons/ArrowUpIcon';

type isCollapsedType = boolean;

interface CollapsibleContainerProps {
  /**
   * Open / Closed State
   */
  isCollapsed: isCollapsedType;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * Label text
   */
  label: string;
  /**
   * Contents
   */
  children: React.ReactChild;
}

interface HeaderProps {
  isCollapsed: isCollapsedType;
}

const Wrapper = styled.div`
  width: 100%;
  background-color: #1A1A1A;
  border-radius: 28px;
`;

const Header = styled.div<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1F1F1F;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: ${(props) => props.isCollapsed ? '28px 28px 0px 0px' : '28px'};
  padding: 0.875rem 1.25rem;
`;

const Contents = styled.div`
  padding: 1.25rem;
  min-height: 6rem;
`;

const CollapsibleContainer = ({
  backgroundColor,
  label,
  children,
  ...props
}: CollapsibleContainerProps) => {
  const [ isCollapsed, setIsCollapsed ] = useState(true);

  return (
    <Wrapper>
      <Header isCollapsed={isCollapsed}>
        <Title text={label} />
        <IconButtonCircular
          data-testid="openCloseIcon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ?
            <ArrowDownIcon color="#F8F8F8" opacity="0.3"/> :
            <ArrowUpIcon color="#F8F8F8" opacity="0.3"/>
          }
        </IconButtonCircular>
      </Header>
      {isCollapsed &&
        <Contents>
          {children}
        </Contents>
      }
    </Wrapper>
  );
};

export default CollapsibleContainer;
