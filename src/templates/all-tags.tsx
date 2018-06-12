import { Link } from 'gatsby';
import * as React from 'react';
import Layout from '../components/Layout';

const AllTags = (props) => {
  const { tags } = props.pageContext;

  if (tags) {
    return (
      <Layout location={props.location}>
        <div>
          <header className="back-link">
            <Link to="/">{'<<'} Back</Link>
          </header>
          <ul>
            {tags.map((tag) => {
              return (
                <li key={tag}>
                  <Link to={`/tags/${tag}`}>{tag}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    );
  }
};

export default AllTags;
