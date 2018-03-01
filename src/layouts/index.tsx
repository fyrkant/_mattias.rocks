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

const Header: React.SFC<Props> = (props) => {
  const { title, tagline } = props;
  return (
    <header className="first-page">
      <h1>
        <Link to="/">{title}</Link>
      </h1>
      <p>{tagline}</p>
    </header>
  );
};

const isAnchorTag = (element: HTMLElement) => element && element.nodeName && element.nodeName === 'A';

class TemplateWrapper extends React.Component<any, any> {
  public ripple: HTMLDivElement | undefined;
  public rippleWrap: HTMLDivElement | undefined;
  public componentDidMount() {
    if (this.rippleWrap) {
      this.rippleWrap.addEventListener('animationend', () => this.rippleWrap && this.rippleWrap.classList.remove('goripple'));
    }
  }
  public clickHandler(e: any) {
    if (isAnchorTag(e.target) && this.ripple && this.rippleWrap) {
      this.ripple.style.left = e.clientX + 'px';
      this.ripple.style.top = e.clientY + 'px';
      this.rippleWrap.classList.add('goripple');
    }
  }
  public render() {
    const { children, location }: any = this.props;
    return (
      <div className="wrapper" onClick={(e) => this.clickHandler(e)}>
        <Helmet
          title="mattias.rocks"
          meta={[{ name: 'description', content: 'mattias.rocks' }, { name: 'keywords', content: 'mattias wikström, developer, padawan' }]}
        />
        {location.pathname === '/' && <Header title="mattias.rocks" tagline="programming padawan" />}
        {children()}
        <div className="ripple-wrap" ref={(rippleWrap) => (this.rippleWrap = rippleWrap ? rippleWrap : undefined)}>
          <div className="ripple" ref={(ripple) => (this.ripple = ripple ? ripple : undefined)} />
        </div>
      </div>
    );
  }
}

export default TemplateWrapper;
