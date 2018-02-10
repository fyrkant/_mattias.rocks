import Link from 'gatsby-link';
// import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Fragment, SFC } from 'react';
import Helmet from 'react-helmet';

// import '../../node_modules/modern-normalize/modern-normalize.css';
import '../less/base.less';
import '../less/layout.less';

const Header: SFC<{
  title: string;
  tagline: string;
  isPostPage: boolean;
}> = ({ title, tagline, isPostPage }) => {
  if (!isPostPage) {
    return (
      <header>
        <h1>
          <Link to="/">{title}</Link>
        </h1>
        <p>{tagline}</p>
      </header>
    );
  } else {
    return (
      <header className="back-link">
        <Link to="/">{'<<'} Back</Link>
      </header>
    );
  }
};

const TemplateWrapper = ({ children, location }: any) => (
  <div className="wrapper">
    <Helmet
      title="mattias.rocks"
      meta={[
        { name: 'description', content: 'mattias.rocks' },
        { name: 'keywords', content: 'mattias wikström, developer, padawan' }
      ]}
    />
    {location.pathname !== '/dscore' ? (
      <Header
        isPostPage={location.pathname !== '/'}
        title="mattias.rocks"
        tagline="programming padawan"
      />
    ) : (
      ''
    )}
    {children()}
  </div>
);

export default TemplateWrapper;
