import React from 'react';
import styled from 'styled-components';

interface TitleProps {
  /**
   * Title Text
   */
  text: string;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
}

const TitleElement = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.063rem;
  margin-block-start: 0px;
  margin-block-end: 0px;
  text-transform: uppercase;
  color: #F8F8F8;
  opacity: 0.3;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = ({ text, className, ...props }: TitleProps) => {
  return (
    <TitleElement className={className} {...props}>
      {text}
    </TitleElement>
  );
};

export default Title;
