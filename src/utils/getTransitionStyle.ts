export interface TransitionStyle {
  opacity: number;
  transition?: string;
}

interface TransitionStyles {
  [key: string]: TransitionStyle;
}

const getTransitionStyles = (timeout: number): TransitionStyles => {
  return {
    entering: {
      opacity: 0
    },
    entered: {
      transition: `opacity ${timeout}ms ease-in-out`,
      opacity: 1
    },
    exiting: {
      transition: `opacity ${timeout}ms ease-in-out`,
      opacity: 0
    }
  };
};

const getTransitionStyle = ({ timeout, status }: { timeout: number; status: string }) => getTransitionStyles(timeout)[status];

export default getTransitionStyle;
