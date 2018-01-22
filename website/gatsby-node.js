/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const markupPageTemplate = path.resolve('src/templates/markupPage.js');

  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___sidebarLinkTitle] }
    ) {
      edges {
        node {
          html
          id
          frontmatter {
            pageType
            path
            sidebarLinkTitle
            title
          }
        }
      }
    }
  }`)
    .then((result) => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      result.data.allMarkdownRemark.edges
        .forEach(({ node }) => {
          createPage({
            path: node.frontmatter.path,
            component: markupPageTemplate,
            context: {}, // additional data can be passed via context
          });
        });
    });
};
