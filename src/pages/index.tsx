import { Link, StaticQuery } from 'gatsby';
import * as React from 'react';
import Layout from '../components/Layout';

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

const tagLink = (tag: string) => (
  <li key={tag}>
    <Link to={`/tags/${tag}`}>{tag}</Link>
  </li>
);

const IndexPage: React.SFC<any> = (props) => (
  <StaticQuery
    query={graphql`
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
    `}
    render={(data) => {
      return (
        <Layout location={props.location}>
          <div>
            {data.allMarkdownRemark.edges.map(({ node: post }) => {
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
        </Layout>
      );
    }}
  />
);

export default IndexPage;
