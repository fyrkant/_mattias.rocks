// import Link from 'gatsby-link';
import { graphql, Link } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';
import { IPost } from '../pages/index';

import Layout from '../components/Layout';
import '../less/prism.less';

interface IProps {
  data: {
    markdownRemark: IPost;
  };
  location: string;
}

const Template: React.SFC<IProps> = (props) => {
  return (
    <Layout location={props.location}>
      <div>
        <Helmet title={props.data.markdownRemark.frontmatter.title} />
        <header className="back-link">
          <Link to="/">{'<<'} Back</Link>
        </header>
        <div className="post-container">
          <h1 className="title">{props.data.markdownRemark.frontmatter.title}</h1>
          <p className="date">{props.data.markdownRemark.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
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
`;

export default Template;
