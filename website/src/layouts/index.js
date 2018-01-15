import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from '../components/Header';

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 0 1.45rem;
  padding-top: 50px;
`;

const TemplateWrapper = ({ children }) => (
  <Fragment>
    <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
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
