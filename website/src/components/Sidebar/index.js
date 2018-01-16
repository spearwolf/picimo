import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';
import oc from 'open-color/open-color.json';

import siteConfig from '../../../site-config';

const SidebarContainer = styled.div`
  position: fixed;
  top: ${siteConfig.styles.headerHeight};
  left: 0;
  bottom: 0;
  width: ${siteConfig.styles.sidebarWidth};
  z-index: 100;
  margin: 0;
  padding: 0;
  border-right: 1px solid ${oc.gray[2]};
  background: ${oc.gray[0]};
`;

const SidebarContent = styled.header`
  padding: 0 1rem;
`;

const SidebarLink = ({ title, path }) => (
  <Link to={path}>{ title }</Link>
);

SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const Sidebar = ({ links }) => (
  <SidebarContainer>
    <SidebarContent>
      <h4>GUIDES</h4>
      <h4>TAGS</h4>
      { links.map(({ id, title, path }) => (
        <SidebarLink key={id} title={title} path={path} />
      ))}
      <h4>COMPONENTS</h4>
    </SidebarContent>
  </SidebarContainer>
);

Sidebar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
};

export default Sidebar;
