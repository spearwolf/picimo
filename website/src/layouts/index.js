import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import 'prismjs/themes/prism.css';

import siteConfig from '../../site-config';

import Header from '../components/Header';

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 ${siteConfig.styles.pageMarginH};
  padding-top: calc(${siteConfig.styles.headerHeight} + 1.5rem);
  padding-bottom: 8rem;
`;

const TemplateWrapper = ({ children }) => (
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
    <Content>{ children() }</Content>
  </Fragment>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default TemplateWrapper;
