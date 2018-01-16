import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import siteConfig from '../../site-config';

const DocTitle = styled.h1`
  color: ${siteConfig.colors.text.tagTitle};
`;

const Template = ({ data: { markdownRemark: { frontmatter: { title }, html } } }) => (
  <Fragment>
    <Helmet title={title} />
    <DocTitle>{ title }</DocTitle>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </Fragment>
);

Template.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
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
