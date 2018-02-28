import Link from 'gatsby-link';
import * as React from 'react';

import '../less/ripple.less';

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

class IndexPage extends React.Component<IProps> {
  public ripple: HTMLDivElement | undefined;
  public rippleWrap: HTMLDivElement | undefined;
  public monitor(div: HTMLDivElement) {
    // const computed = window.getComputedStyle(div);
    // const borderwidth = parseFloat(computed.getPropertyValue('border-left-width'));
    // if (!this.state.finish && borderwidth >= 1500) {
    //   div.style.webkitAnimationPlayState = 'paused';
    //   div.style.animationPlayState = 'paused';
    // }
    // if (this.state.finish) {
    //   div.style.webkitAnimationPlayState = 'running';
    //   div.style.animationPlayState = 'running';
    //   return;
    // } else {
    //   window.requestAnimationFrame(function() {
    //     monitor(div);
    //   });
    // }
  }
  public linkClick(e: any) {
    if (this.ripple && this.rippleWrap) {
      this.ripple.style.left = e.clientX + 'px';
      this.ripple.style.top = e.clientY + 'px';
      this.rippleWrap.classList.add('goripple');
      window.requestAnimationFrame(() => {
        if (this.ripple) {
          this.monitor(this.ripple);
        }
      });
    }
  }
  public render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;
    return (
      <div>
        {posts.map(({ node: post }) => {
          const { frontmatter } = post;

          return (
            <div className="post-card" key={frontmatter.path}>
              <h2>
                <Link to={frontmatter.path} onClick={(e) => this.linkClick(e)}>
                  {frontmatter.title}
                </Link>
              </h2>
              <time>{frontmatter.date}</time>
              <p>{frontmatter.excerpt}</p>
              <div className="post-tags">
                Tags: <ul>{frontmatter.tags.map(tagLink)}</ul>
              </div>
            </div>
          );
        })}
        <div className="ripple-wrap" ref={(rippleWrap) => (this.rippleWrap = rippleWrap ? rippleWrap : undefined)}>
          <div className="ripple" ref={(ripple) => (this.ripple = ripple ? ripple : undefined)} />
        </div>
      </div>
    );
  }
}

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
