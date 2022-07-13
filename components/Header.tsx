import React from 'react';
import styled from 'styled-components';

import AvatarButton from './AvatarButton';
import IconButton from './IconButton';
import NotificationIcon from '../styles/icons/NotificationIcon';

interface HeaderProps {
  /**
   * URL to Avatar Image
   */
  avatarImageURL: string;
  /**
   * Is there a notification present?
   */
  notification?: boolean;
  /**
   * Profile Avatar Button Click handler
   */
  profileOnClick?: () => void;
  /**
   * Notifications Icon Button Click handler
   */
  notificationsOnClick?: () => void;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Header = ({
  avatarImageURL,
  notification,
  profileOnClick,
  notificationsOnClick,
  className,
}: HeaderProps) => {
  return (
    <Wrapper className={className}>
      <AvatarButton imageURL={avatarImageURL} onClick={profileOnClick}/>
      <IconButton
        size='medium'
        backgroundColor='#272727'
        notificationBadge={notification}
        onClick={notificationsOnClick}
      >
        <NotificationIcon color='#FFFFFF'/>
      </IconButton>
    </Wrapper>
  );
};

export default Header;
