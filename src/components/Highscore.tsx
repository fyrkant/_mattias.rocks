import * as differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import * as React from 'react';

interface Score {
  nick: string;
  start: Date;
  days?: number;
  end?: Date;
}

const data: Score[] = [
  {
    nick: 'vol714',
    start: new Date(1983, 8, 20),
    end: new Date(2014, 8, 12)
  },
  {
    nick: 'fyrkant',
    start: new Date(1987, 3, 31)
  }
];

const scoreLine = (s: Score) => (
  <li key={s.nick}>
    {s.nick}: {s.days}
  </li>
);

const addDays = (s: Score) => {
  return Object.assign(s, {
    days: differenceInCalendarDays(s.end || new Date(), s.start)
  });
};

export class Highscore extends React.Component<any, any> {
  public ol: Element | null;

  public componentDidMount() {
    import('webfontloader').then((WebFont) => {
      if (!document.documentElement.classList.contains('wf-active')) {
        WebFont.load({
          google: {
            families: ['VT323']
          },
          active: () => {
            if (this.ol) {
              this.ol.classList.add('active');
            }
          }
        });
      }
    });
  }

  public render() {
    return (
      <ol ref={(ol) => (this.ol = ol)}>
        {data
          .map(addDays)
          .sort((a, b) => b.days - a.days)
          .map(scoreLine)}
      </ol>
    );
  }
}
