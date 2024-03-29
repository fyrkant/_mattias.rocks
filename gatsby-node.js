/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const Arr = require('@ephox/katamari').Arr

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve('./src/templates/blog-post.tsx');
  const tagTemplate = path.resolve('./src/templates/tags.tsx');
  const allTagsTemplate = path.resolve(`./src/templates/all-tags.tsx`)

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              date
              path
              title
              excerpt
              tags
              draft
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;
    const filteredPosts = Arr.filter(posts, ({node}) => node.frontmatter.draft !== true);

      
    Arr.each(filteredPosts, ({ node }) =>
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate
      })
    );

    const tags = Arr.foldl(filteredPosts,
      (acc, el) =>
        el.node.frontmatter.tags
          ? [...new Set([...acc, ...el.node.frontmatter.tags])] // Fancy way to get unique values of array.
          : acc,
      []
    );

    createPage({
      path: `/tags`,
      component: allTagsTemplate,
      context: {
        tags: tags.sort()
      }
    })

    tags.forEach(tag => {
      createPage({
        path: `/tags/${tag}/`,
        component: tagTemplate,
        context: {
          tag
        }
      });
    });
  });
};