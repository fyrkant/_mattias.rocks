import * as React from 'react';

// Components
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';

const Tags = (props) => {
  const { pageContext, data } = props;
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;

  return (
    <Layout location={props.location}>
      <div>
        <header className="back-link">
          <Link to="/">{'<<'} Back</Link>
        </header>
        <h1>{tagHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
            const { path, title } = node.frontmatter;
            return (
              <li key={path}>
                <Link to={path}>{title}</Link>
              </li>
            );
          })}
        </ul>
        {/*
          This links to a page that does not yet exist.
          We'll come back to it!
        */}
        <Link to="/tags">All tags</Link>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagPage($tag: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;

export default Tags;
