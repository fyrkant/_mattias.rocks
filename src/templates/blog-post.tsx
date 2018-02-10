// import Link from 'gatsby-link';
import * as React from 'react';
import Helmet from 'react-helmet';
import { IPost } from '../pages/index';

import '../less/prism.less';
import { TransitionStyle } from '../utils/getTransitionStyle';

interface IProps {
  data: {
    markdownRemark: IPost;
  };
  location: string;
  transition?: { style: TransitionStyle };
}

const Template: React.SFC<IProps> = ({ data, location, transition }) => {
  const { markdownRemark: post } = data;
  const { frontmatter, html } = post;
  const { title, date } = frontmatter;
  return (
    <div style={transition && transition.style}>
      <Helmet title={title} />
      <div className="post-container">
        <h1 className="title">{title}</h1>
        <p className="date">{date}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
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
