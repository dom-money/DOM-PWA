import React from 'react';
import styled from 'styled-components';

type TitleProps = {
  /**
   * Title Text
   */
  text: string;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
  /**
   * HTML id attribute
   */
  id?: string;
} & ({
  /**
   * Optionally render title as another HTML element (renders as h2 by default)
   */
   as?: Exclude<React.ElementType, 'label'>;
   /**
    * Input ID if rendering as a \<label\> element
    */
   inputID?: never;
} | {
   as: 'label';
   inputID: string;
});

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

const Title = ({ text, className, as, inputID, ...props }: TitleProps) => {
  return (
    <TitleElement
      as={ as }
      className={ className }
      htmlFor={ inputID }
      { ...props }
    >
      { text }
    </TitleElement>
  );
};

export default Title;
