import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Template = ({ data }) => {
  const { markdownRemark: post } = data; // data.markdownRemark holds our post data
  return (
    <div className="blog-post-container">
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  );
};

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
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;

export default Template;
