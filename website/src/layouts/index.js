import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

// import 'prismjs/themes/prism-okaidia.css';
// import 'prism-themes/themes/prism-xonokai.css';
// import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-twilight.css';
// import 'prism-themes/themes/prism-vs.css';
// import 'prism-themes/themes/prism-ghcolors.css';
import './prism-overrides.css';

import './index.scss';

import siteConfig from '../../site-config';

// import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Page = styled.div`
  background-color: ${siteConfig.colors.page.background};
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: ${siteConfig.styles.mainContentMaxWidth};
  padding-top: 0;
  padding-left: calc(${siteConfig.styles.sidebarWidth} + ${siteConfig.styles.pageMarginH});
  padding-right: ${siteConfig.styles.pageMarginH};
  padding-bottom: 8rem;
`;
  // padding-top: ${siteConfig.styles.headerHeight};

const allPages = data => data.allMarkdownRemark.edges.map(({ node }) => ({
  id: node.id,
  pageType: node.frontmatter.pageType,
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
    <Page>
      <Sidebar links={allPages(data)} />
      <Content>{ children() }</Content>
    </Page>
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
            pageType
            path
            sidebarLinkTitle
          }
        }
      }
    }
  }
`;

export default TemplateWrapper;
