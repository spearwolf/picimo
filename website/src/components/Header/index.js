import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import siteConfig from '../../../site-config';

import Logo from './picimo-512.png';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${siteConfig.styles.headerHeight};
  z-index: 9999;
  margin: 0;
  padding: 0;
  background: rgba(250, 250, 250, 0.95);
  box-shadow: 0 1px 0 rgba(12,13,14,0.1), 0 1px 3px rgba(12,13,14,0.1), 0 4px 20px rgba(12,13,14,0.035), 0 1px 1px rgba(12,13,14,0.025);
`;

const HeaderContent = styled.header`
  max-width: 960px;
  height: ${siteConfig.styles.headerHeight};
  margin: 0 auto;
  padding: 0 ${siteConfig.styles.pageMarginH};
  display: flex;
  align-items: center;
`;

const TitleLink = styled(Link)`
  height: ${siteConfig.styles.headerHeight};
  margin: 0;
`;

const TitleImage = styled.img`
  height: ${siteConfig.styles.headerHeight};
  margin: 0;
`;

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <TitleLink to="/">
        <TitleImage src={Logo} alt="picimo" />
      </TitleLink>
    </HeaderContent>
  </HeaderContainer>
);

export default Header;
