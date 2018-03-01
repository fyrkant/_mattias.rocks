import Link from 'gatsby-link';
import * as React from 'react';

export interface IFrontmatter {
  title: string;
  date: string;
  path: string;
  tags: string[];
  excerpt: string;
}

export interface IPost {
  id: string;
  html: string;
  frontmatter: IFrontmatter;
}

interface INode {
  node: IPost;
}

interface IProps {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: INode[];
    };
  };
}

const tagLink = (tag: string) => (
  <li key={tag}>
    <Link to={`/tags/${tag}`}>{tag}</Link>
  </li>
);

const IndexPage: React.SFC<IProps> = (props) => {
  const { edges: posts } = props.data.allMarkdownRemark;
  return (
    <div>
      {posts.map(({ node: post }) => {
        const { frontmatter } = post;

        return (
          <div className="post-card" key={frontmatter.path}>
            <h2>
              <Link to={frontmatter.path}>{frontmatter.title}</Link>
            </h2>
            <time>{frontmatter.date}</time>
            <p>{frontmatter.excerpt}</p>
            <div className="post-tags">
              Tags: <ul>{frontmatter.tags.map(tagLink)}</ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { draft: { ne: true } } }) {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`;

export default IndexPage;
