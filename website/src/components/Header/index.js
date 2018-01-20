import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import oc from 'open-color/open-color.json';

import siteConfig from '../../../site-config';

// import Logo from './picimo-512.png';
import Logo from './picimo-logo-640x248.png';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${siteConfig.styles.headerHeight};
  z-index: 9999;
  margin: 0;
  padding: 0;
  background: ${oc.gray[2]};
`;
  // background: ${oc.gray[8]};
  // background: rgba(197, 246, 250, 0.95);
  // box-shadow: 0 3px 0 ${oc.cyan[4]};
  // box-shadow: 0 3px 0 ${oc.cyan[4]}, 0 4px 10px ${oc.cyan[0]}, 0 4px 20px ${oc.cyan[0]};
  // background: rgba(153, 233, 242, 0.95);
  // background: rgba(196, 212, 218, 0.95);

const HeaderContent = styled.header`
  height: ${siteConfig.styles.headerHeight};
  margin: 0 auto;
  padding: 0 ${siteConfig.styles.pageMarginH};
  display: flex;
  align-items: center;
`;

const TitleLink = styled(Link)`
  height: ${siteConfig.styles.headerHeight};
`;

const TitleImage = styled.img`
  height: ${siteConfig.styles.headerHeight};
  box-sizing: border-box;
  padding-top: 4px;
  padding-bottom: 4px;
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
