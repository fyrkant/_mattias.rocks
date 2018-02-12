/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

/* eslint-disable react/prop-types */
/* globals window CustomEvent */
import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import { Transition } from 'react-transition-group';

import getTransitionStyle from './src/utils/getTransitionStyle';

const timeout = 250;
const historyExitingEventType = `history::exiting`;

const getUserConfirmation = (pathname, callback) => {
  const event = new CustomEvent(historyExitingEventType, {
    detail: { pathname }
  });
  window.dispatchEvent(event);
  setTimeout(() => {
    callback(true);
  }, timeout);
};
const history = createHistory({ getUserConfirmation });
// block must return a string to conform
history.block((location, action) => location.pathname);
exports.replaceHistory = () => history;

class ReplaceComponentRenderer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { exiting: false, nextPageResources: {} };
    this.listenerHandler = this.listenerHandler.bind(this);
  }

  public listenerHandler(event) {
    const nextPageResources =
      this.props.loader.getResourcesForPathname(
        event.detail.pathname,
        // tslint:disable-next-line:no-shadowed-variable
        (nextPageResources) => this.setState({ nextPageResources })
      ) || {};
    this.setState({ exiting: true, nextPageResources });
  }

  public componentDidMount() {
    window.addEventListener(historyExitingEventType, this.listenerHandler);
  }

  public componentWillUnmount() {
    window.removeEventListener(historyExitingEventType, this.listenerHandler);
  }

  public componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.setState({ exiting: false, nextPageResources: {} });
    }
  }

  public render() {
    const transitionProps = {
      timeout: {
        enter: 0,
        exit: timeout
      },
      appear: true,
      in: !this.state.exiting,
      key: this.props.location.key
    };
    return (
      <Transition {...transitionProps}>
        {(status) =>
          React.createElement(this.props.pageResources.component, {
            ...this.props,
            ...this.props.pageResources.json,
            transition: {
              status,
              timeout,
              style: getTransitionStyle({ status, timeout }),
              nextPageResources: this.state.nextPageResources
            }
          })
        }
      </Transition>
    );
  }
}

// eslint-disable-next-line react/display-name
exports.replaceComponentRenderer = ({ props, loader }) => {
  if (props.layout) {
    return undefined;
  }
  return React.createElement(ReplaceComponentRenderer, { ...props, loader });
};
