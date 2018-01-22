import React from 'react';
import styled from 'styled-components';

import Link from 'gatsby-link';
import LogoImage from './picimo-logo-640x248.png';

const Image = styled.img`
  max-width: 100%;
`;

const Logo = () => (
  <Link to="/">
    <Image src={LogoImage} alt="picimo" />
  </Link>
);

export default Logo;
