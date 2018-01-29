import Link from 'gatsby-link';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Helmet from 'react-helmet';

import './index.css';
import './prism.css';

const Header = () => (
  <div>
    <div>
      <h1>
        <Link to='/'>mattias.rocks</Link>
      </h1>
    </div>
  </div>
);

const fruitDB = {
	bananas: 3,
	apples: 7,
	coconuts: 1,
	persimmons: 3,
};

const getFruitSupply = (fruit) => {
    const amount = fruitDB[fruit];

    const returnString = `You have ${amount} ${fruit}.`;

    return returnString;
};

const TemplateWrapper = ({ children }: any) => (
  <div>
    <Helmet
      title='mattias.rocks'
      meta={[
        { name: 'description', content: 'mattias.rocks' },
        { name: 'keywords', content: 'mattias wikström, developer, padawan' }, , ,
      ]}
    />
    <div>{children()}</div>
  </div>
);

export default TemplateWrapper;
