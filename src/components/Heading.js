import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  max-width: 70rem;
  margin: 2rem auto;
  text-align: center;
`;

const H1 = styled.h1`
  font-family: 'Oswald', sans-serif;
  margin-bottom: 1em;
`;

export const Heading = () => {

  return (
    <Header>
      <H1><b>Yellow Class Task</b></H1>
      <p><b>Using Unsplash Api with infinite-scroll.</b></p>
    </Header>
  )
}