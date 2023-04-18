import React from 'react';
import styled from 'styled-components';
import Collapse from '@mui/material/Collapse';
import Title from './Title';
import IconButtonCircular from './IconButtonCircular';
import ArrowDownIcon from '../styles/icons/ArrowDownIcon';

interface CollapsibleContainerProps {
  /**
   * Label text
   */
  label: string;
  /**
   * Is container collapsed?
   */
  isCollapsed?: boolean;
  /**
   * Collapse Click Handler Function
   */
  onCollapseClick?: () => void;
  /**
   * Main Content (will be always displayed)
   */
  primaryContent: React.ReactNode;
  /**
   * Secondary Content (will be hidden on collapsed state)
   */
  secondaryContent?: React.ReactNode;
  /**
   * Should Collapse Button be active even without Secondary Content?
   */
  shouldCollapseButtonBeAlwaysActive?: boolean;
  /**
   * Should secondary content be outside of container?
   */
  shouldSecondaryContentBeOutside?: boolean;
  /**
   * Duration of the transition (in ms), defaults to 300ms
   */
  transitionDuration?: number;
};

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

const SecondaryContentElement = styled.div<{isCollapsed: boolean}>`
  overflow-x: hidden;
  overflow-y: hidden;
  margin-bottom: 0.313rem;
  ${(props) => !props.isCollapsed && `
    margin-bottom: 0;
  `}
`;

const IconWrapper = styled(IconButtonCircular)<{isCollapsed?: boolean}>`
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  ${(props) => props.isCollapsed && `
    transform: rotate(180deg);
  `}
`;

const CollapsibleContainer = ({
  label,
  isCollapsed = false,
  onCollapseClick,
  primaryContent,
  secondaryContent,
  shouldCollapseButtonBeAlwaysActive = false,
  shouldSecondaryContentBeOutside = false,
  transitionDuration = 300,
}: CollapsibleContainerProps) => {
  return (
    <Wrapper>
      <CollapsibleWrapper>
        <Header>
          <Title text={ label } />
          {
            secondaryContent || shouldCollapseButtonBeAlwaysActive ?
            <IconWrapper
              ariaLabel={ `Collapse ${label} Container` }
              data-testid={ `${label}OpenCloseIcon`.replace(/ /g, '') }
              onClick={ onCollapseClick }
              isCollapsed={ isCollapsed }
            >
              <ArrowDownIcon color="#F8F8F8" opacity="0.3"/>
            </IconWrapper> :
            <IconWrapper
              ariaLabel={ `Disabled Button` }
              disabled
            >
              <ArrowDownIcon color="#F8F8F8" opacity="0.3"/>
            </IconWrapper>
          }
        </Header>
        <Contents data-testid='collapsible-container-contents'>
          { primaryContent }
          { !shouldSecondaryContentBeOutside && secondaryContent &&
          <Collapse in={ isCollapsed } timeout={ transitionDuration }>
            <SecondaryContentElement isCollapsed={ isCollapsed }>
              { secondaryContent }
            </SecondaryContentElement>
          </Collapse>
          }
        </Contents>
      </CollapsibleWrapper>
      { shouldSecondaryContentBeOutside && secondaryContent &&
      <Collapse in={ isCollapsed } timeout={ transitionDuration }>
        <SecondaryContentElement isCollapsed={ isCollapsed }>
          { secondaryContent }
        </SecondaryContentElement>
      </Collapse>
      }
    </Wrapper>
  );
};

export default CollapsibleContainer;
