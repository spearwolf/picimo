import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import oc from 'open-color/open-color.json';

const HeaderContainer = styled.div`
  margin: 0;
  padding: 0;
  background: ${oc.gray[9]};
  min-height: 50px;
`;

const HeaderContent = styled.header`
  max-width: 960px;
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
`;

const Title = styled.h1`
  margin: 0;
`;

const TitleLink = styled(Link)`
  color: ${oc.gray[0]};
  text-decoration: none;
`;

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <Title>
        <TitleLink to="/">picimo</TitleLink>
      </Title>
    </HeaderContent>
  </HeaderContainer>
);

export default Header;
