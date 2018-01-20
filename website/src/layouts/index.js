import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

// import 'prismjs/themes/prism-okaidia.css';
// import 'prism-themes/themes/prism-xonokai.css';
// import 'prismjs/themes/prism.css';
// import 'prism-themes/themes/prism-vs.css';
import 'prism-themes/themes/prism-ghcolors.css';
import './prism-overrides.css';

import siteConfig from '../../site-config';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Content = styled.div`
  margin: 0 auto;
  max-width: ${siteConfig.styles.mainContentMaxWidth};
  padding-top: calc(${siteConfig.styles.headerHeight} + 1.5rem);
  padding-left: calc(${siteConfig.styles.sidebarWidth} + ${siteConfig.styles.pageMarginH});
  padding-right: ${siteConfig.styles.pageMarginH};
  padding-bottom: 8rem;
`;

const allPages = data => data.allMarkdownRemark.edges.map(({ node }) => ({
  id: node.id,
  path: node.frontmatter.path,
  title: node.frontmatter.sidebarLinkTitle,
}));

const TemplateWrapper = ({ data, children }) => (
  <Fragment>
    <Helmet
      title={siteConfig.page.htmlTitle}
      meta={[
        { name: 'description', content: siteConfig.page.description },
        { name: 'keywords', content: siteConfig.page.keywords.join(', ') },
        { name: 'author', content: siteConfig.page.author },
      ]}
    />
    <Header />
    <Sidebar links={allPages(data)} />
    <Content>{ children() }</Content>
  </Fragment>
);

TemplateWrapper.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object,
  }).isRequired,
  children: PropTypes.func.isRequired,
};

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            sidebarLinkTitle
            path
          }
        }
      }
    }
  }
`;

export default TemplateWrapper;
