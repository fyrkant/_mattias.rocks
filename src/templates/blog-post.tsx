import Link from 'gatsby-link';
import * as React from 'react';
import Helmet from 'react-helmet';
import { IPost } from '../pages/index';

interface IProps {
  data: {
    markdownRemark: IPost,
  };
  location: string;
}

const Template: React.SFC<IProps> = ({data, location}) => {
  const {markdownRemark: post} = data;
  const {frontmatter, html} = post;
  const {title, date} = frontmatter;
  return (
    <div>
      <Helmet title={title} />
      <div>
        <h1>{title}</h1>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </div>
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
