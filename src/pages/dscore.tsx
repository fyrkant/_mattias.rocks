import * as React from 'react';

import { Highscore } from '../components/Highscore';
import { Television } from '../components/Television';

import '../less/dscore.less';

const DScore = () => (
  <div className="dscore">
    <div>
      <Television />
      <div>
        <Highscore />
      </div>
    </div>
  </div>
);

export default DScore;
