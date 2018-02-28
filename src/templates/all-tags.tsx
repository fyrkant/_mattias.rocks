import Link from 'gatsby-link';
import * as React from 'react';

const AllTags = ({ pathContext }: { pathContext: { tags: string[] } }) => {
  const { tags } = pathContext;

  if (tags) {
    return (
      <div>
        <ul>
          {tags.map((tag) => {
            return (
              <li>
                <Link to={`/tags/${tag}`}>{tag}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default AllTags;
