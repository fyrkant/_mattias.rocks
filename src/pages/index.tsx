import Link from 'gatsby-link'
import * as React from 'react'

export interface IFrontmatter {
  title: string
  date: string
  path: string
  tags: string[]
  excerpt: string
}

export interface IPost {
  id: string
  html: string
  frontmatter: IFrontmatter,
}

interface INode {
  node: IPost
}

interface IProps {
  data: {
    allMarkdownRemark: {
      totalCount: number
      edges: INode[],
    },
  }
}

const IndexPage: React.SFC<IProps> = ({data}) => {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div>
      {posts.map(({node: post}) => {
        const {frontmatter} = post

        return (
          <div key={frontmatter.path}>
            <h2><Link to={frontmatter.path}>{frontmatter.title}</Link></h2>
            <p>{frontmatter.date}</p>
            <p>{frontmatter.excerpt}</p>
          </div>
        )
      })}
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
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
`

export default IndexPage
