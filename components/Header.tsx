import React from 'react';
import styled from 'styled-components';

import AvatarButton from './AvatarButton';
import IconButton from './IconButton';
import NotificationIcon from '../styles/icons/NotificationIcon';

interface HeaderProps {
  /**
   * URL to Avatar Image
   */
  avatarImageURL?: string;
  /**
   * User's name
   */
  userName: string;
  /**
   * Is there a notification present?
   */
  isNotificationPresent?: boolean;
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
  isNotificationPresent,
  userName,
  profileOnClick,
  notificationsOnClick,
  className,
}: HeaderProps) => {
  return (
    <Wrapper className={className}>
      <AvatarButton
        imageURL={avatarImageURL}
        userName={userName}
        onClick={profileOnClick}
      />
      <IconButton
        size='medium'
        backgroundColor='#272727'
        hasNotificationBadge={isNotificationPresent}
        onClick={notificationsOnClick}
        ariaLabel='Notifications'
      >
        <NotificationIcon color='#FFFFFF'/>
      </IconButton>
    </Wrapper>
  );
};

export default Header;
