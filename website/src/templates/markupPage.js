import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import oc from 'open-color/open-color.json';

import siteConfig from '../../site-config';

import './markupPage.scss';

const DocTitle = styled.h1`
  margin-top: 0;
  padding-top: 2rem;
  color: ${siteConfig.colors.text.tagTitle};
  box-shadow: 0 2px 0 ${oc.gray[4]};
`;

const Template = ({ data: { markdownRemark: { frontmatter: { title }, html } } }) => (
  <Fragment>
    <Helmet title={title} />
    <DocTitle>{ title }</DocTitle>
    <div className="markupPage" dangerouslySetInnerHTML={{ __html: html }} />
  </Fragment>
);

Template.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }).isRequired,
};

export const pageQuery = graphql`
  query MarkupPageByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;

export default Template;
