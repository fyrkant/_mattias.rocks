import Link from 'gatsby-link';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Helmet from 'react-helmet';

import './index.css';

const Header = () => (
  <div>
    <div>
      <h1>
        <Link
          to='/'
        >
          mattias.rocks
        </Link>
      </h1>
    </div>
  </div>
);

const TemplateWrapper = ({ children }: any) => (
  <div>
    <Helmet
      title='mattias.rocks'
      meta={[
        { name: 'description', content: 'mattias.rocks' },
        { name: 'keywords', content: 'mattias wikström, developer, padawan' },
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
);

export default TemplateWrapper;
