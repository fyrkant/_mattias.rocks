import * as React from 'react';
import { Fragment } from 'react';

import { Highscore } from '../components/Highscore';
import { Television } from '../components/Television';

import '../layouts/dscore.css';

const DScore = () => (
  <div className='dscore'>
    <div>
      <Television />
      <div>
        <Highscore />
      </div>
    </div>
  </div>
);

export default DScore;
