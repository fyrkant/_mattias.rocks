import Link from 'gatsby-link';
// import * as PropTypes from 'prop-types';
import * as React from 'react';
import { SFC } from 'react';
import Helmet from 'react-helmet';

import './index.styl';
import './layout.styl';
import './prism.styl';

const Header: SFC<{
  title: string;
  tagline: string;
}> = (props) => (
  <header>
    <h1>
      <Link to="/">{props.title}</Link>
    </h1>
    <p>{props.tagline}</p>
  </header>
);

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
      <Header title="mattias.rocks" tagline="programming padawan" />
    ) : (
      ''
    )}
    {children()}
  </div>
);

export default TemplateWrapper;
