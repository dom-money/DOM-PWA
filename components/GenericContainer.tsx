import React from 'react';
import styled from 'styled-components';
import Title from './Title';

interface GenericContainerProps {
  /**
   * Label text
   */
  label: string;
  /**
   * The content to be displayed
   */
  content: React.ReactNode;
}

const Wrapper = styled.div`
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

const GenericContainer = ({ label, content }: GenericContainerProps) => {
  return (
    <Wrapper>
      <Header>
        <Title text={label} />
      </Header>
      <Contents>
        {content}
      </Contents>
    </Wrapper>
  );
};

export default GenericContainer;
