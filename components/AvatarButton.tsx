/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

interface AvatarButtonProps {
  /**
   * URL to Avatar Image
   */
  imageURL?: string;
  /**
   * User's name
   */
  userName: string,
  /**
   * Click handler
   */
  onClick?: () => void;
}

const Wrapper = styled.button`
  position: relative;
  width: 2.75rem;
  height: 2.75rem;
  background-color: transparent;
  border-radius: 50%;
  overflow: hidden;
  padding: 0;
  border: none;
  cursor: pointer;
`;

const Avatar = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  height: 2.5rem;
  width: 2.5rem;
`;

const TextAvatar = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #bdbdbd;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  font-size: 1.25rem;
  text-transform: uppercase;
  color: white;
  height: 2.5rem;
  width: 2.5rem;
`;

const AvatarButton = ({ imageURL, userName, ...props }: AvatarButtonProps) => {
  return (
    <Wrapper aria-label='Profile' { ...props }>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.9607 4.12722C10.6726 3.66072 10.8162 3.04683 11.2952 2.78002C15.1869 0.612412 19.653 -0.326549 24.1028 0.100726C28.8826 0.559692 33.381 2.56987 36.9115 5.82449C40.442 9.07912 42.8108 13.3995 43.6563 18.1262C44.5018 22.853 43.7776 27.7266 41.5943 32.0033C39.4109 36.28 35.8883 39.7249 31.564 41.8124C27.2397 43.8998 22.3512 44.5152 17.6444 43.5645C12.9377 42.6139 8.67125 40.1494 5.49612 36.5472C2.54024 33.1938 0.681315 29.0257 0.154447 24.6024C0.0895963 24.0579 0.50259 23.5815 1.04942 23.5413C1.59625 23.5011 2.06963 23.9123 2.13691 24.4565C2.63042 28.4475 4.3164 32.206 6.98568 35.2343C9.87423 38.5113 13.7556 40.7534 18.0376 41.6182C22.3195 42.4831 26.7668 41.9233 30.7008 40.0242C34.6348 38.1251 37.8395 34.9911 39.8258 31.1004C41.8121 27.2097 42.4709 22.776 41.7017 18.4758C40.9325 14.1757 38.7775 10.2453 35.5657 7.28441C32.3538 4.32353 28.2614 2.49478 23.913 2.07724C19.8947 1.6914 15.8617 2.53022 12.3398 4.47128C11.8595 4.73594 11.2488 4.59372 10.9607 4.12722Z" fill="url(#paint0_linear_165_231)"/>
        <defs>
          <linearGradient id="paint0_linear_165_231" x1="40" y1="17.3333" x2="3" y2="3.33333" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE31E"/>
            <stop offset="1" stopColor="#EEFF00" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
      {
      imageURL ?
      <Avatar src={ imageURL } alt={ `${userName}\'s Avatar` }/> :
      <TextAvatar>{ userName.match(/\b[a-z]/gi)?.slice(0, 2) }</TextAvatar>
      }
    </Wrapper>
  );
};

export default AvatarButton;
