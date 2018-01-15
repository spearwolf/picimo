import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import siteConfig from '../../../site-config';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${siteConfig.header.height};

  margin: 0;
  padding: 0;
  background: rgba(250, 250, 250, 0.95);
  box-shadow: 0 1px 0 rgba(12,13,14,0.1), 0 1px 3px rgba(12,13,14,0.1), 0 4px 20px rgba(12,13,14,0.035), 0 1px 1px rgba(12,13,14,0.025);
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
  color: ${siteConfig.colors.text.normal};
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
