import Link from 'gatsby-link';
// import * as PropTypes from 'prop-types';
import * as React from 'react';
import Helmet from 'react-helmet';

// import '../../node_modules/modern-normalize/modern-normalize.css';
import '../less/base.less';
import '../less/layout.less';

interface Props {
  title: string;
  tagline: string;
}

class Header extends React.Component<Props> {
  public render() {
    const { title, tagline } = this.props;
    return (
      <header className="first-page">
        <h1>
          <Link to="/">{title}</Link>
        </h1>
        <p>{tagline}</p>
      </header>
    );
  }
}

const TemplateWrapper = ({ children, location }: any) => (
  <div className="wrapper">
    <Helmet
      title="mattias.rocks"
      meta={[{ name: 'description', content: 'mattias.rocks' }, { name: 'keywords', content: 'mattias wikström, developer, padawan' }]}
    />
    {location.pathname === '/' && <Header title="mattias.rocks" tagline="programming padawan" />}
    {children()}
  </div>
);

export default TemplateWrapper;
