import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import oc from 'open-color/open-color.json';

const HeaderContainer = styled.div`
  margin: 0;
  padding: 0;
  background: ${oc.gray[9]};
  height: 50px;
`;

const HeaderContent = styled.header`
  max-width: 960px;
  height: 50px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1;
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
