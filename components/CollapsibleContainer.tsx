import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Title from './Title';
import IconButtonCircular from './IconButtonCircular';
import ArrowDownIcon from '../styles/icons/ArrowDownIcon';

interface CollapsibleContainerProps {
  /**
   * Label text
   */
  label: string;
  /**
   * Main Content (will be always displayed)
   */
  mainContent: React.ReactNode;
  /**
   * Secondary Content (will be hidden on collapsed state)
   */
  secondaryContent: React.ReactNode;
  /**
   * Should secondary content be outside of container?
   */
  outside: boolean;
}

type SecondaryContentHeight = undefined | 'auto' | number;

interface SecondaryContentProps {
  isCollapsed: boolean,
  contentHeight: SecondaryContentHeight
}

const Wrapper = styled.div`
  width: 100%;
`;

const CollapsibleWrapper = styled.div`
  width: 100%;
  background-color: #1A1A1A;
  border-radius: 28px;
  margin-bottom: 0.313rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1F1F1F;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 28px 28px 0px 0px;
  padding: 0.875rem 1.25rem;
`;

const Contents = styled.div`
  padding: 1.25rem;
`;

const SecondaryContentElement = styled.div<SecondaryContentProps>`
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  height: ${(props) =>
    props.contentHeight ? `${props.contentHeight}px` : 'auto'};
  overflow-x: hidden;
  overflow-y: hidden;
  margin-bottom: 0.313rem;
  ${(props) => !props.isCollapsed && `
  // visibility: hidden;
  height: 0;
  margin-bottom: 0;
  `}
`;

const IconWrapper = styled(IconButtonCircular)<{isCollapsed: boolean}>`
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  ${(props) => !props.isCollapsed && `
  transform: rotate(180deg);
  `}
`;

const CollapsibleContainer = ({
  label,
  mainContent,
  secondaryContent,
  outside = false,
}: CollapsibleContainerProps) => {
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  const [ contentHeight, setContentHeight ] =
    useState<SecondaryContentHeight>('auto');

  const secondaryContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContentHeight(secondaryContentRef.current?.scrollHeight);
  }, []);

  return (
    <Wrapper>
      <CollapsibleWrapper>
        <Header>
          <Title text={label} />
          <IconWrapper
            data-testid="openCloseIcon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            isCollapsed={isCollapsed}
          >
            <ArrowDownIcon color="#F8F8F8" opacity="0.3"/>
          </IconWrapper>
        </Header>
        <Contents>
          {mainContent}
          {outside ||
          <SecondaryContentElement
            ref={secondaryContentRef}
            isCollapsed={isCollapsed}
            contentHeight={contentHeight}
          >
            {secondaryContent}
          </SecondaryContentElement>
          }
        </Contents>
      </CollapsibleWrapper>
      {outside &&
      <SecondaryContentElement
        ref={secondaryContentRef}
        isCollapsed={isCollapsed}
        contentHeight={contentHeight}
      >
        {secondaryContent}
      </SecondaryContentElement>
      }
    </Wrapper>
  );
};

export default CollapsibleContainer;
