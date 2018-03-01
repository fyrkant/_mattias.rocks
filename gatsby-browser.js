// "use strict";
// /**
//  * Implement Gatsby's Browser APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/browser-apis/
//  */
// var __extends = (this && this.__extends) || (function () {
//     var extendStatics = Object.setPrototypeOf ||
//         ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
//         function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
//     return function (d, b) {
//         extendStatics(d, b);
//         function __() { this.constructor = d; }
//         d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
//     };
// })();
// var __assign = (this && this.__assign) || Object.assign || function(t) {
//     for (var s, i = 1, n = arguments.length; i < n; i++) {
//         s = arguments[i];
//         for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
//             t[p] = s[p];
//     }
//     return t;
// };
// // exports.__esModule = true;
// // You can delete this file if you're not using it
// /* eslint-disable react/prop-types */
// /* globals window CustomEvent */
// var createBrowserHistory_1 = require("history/createBrowserHistory");
// var React = require("react");
// var react_transition_group_1 = require("react-transition-group");
// var getTransitionStyle_1 = require("./src/utils/getTransitionStyle");
// var timeout = 150;
// var historyExitingEventType = "history::exiting";
// function _customEvent(event, params) {
//     params = params || { bubbles: false, cancelable: false, detail: undefined };
//     var evt = document.createEvent('CustomEvent');
//     evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
//     return evt;
// }
// var hasCustomEvent = function (window) { return typeof window.CustomEvent === 'function'; };
// var getUserConfirmation = function (pathname, callback) {
//     var event = hasCustomEvent(window)
//         ? new CustomEvent(historyExitingEventType, {
//             detail: { pathname: pathname }
//         })
//         : _customEvent(historyExitingEventType, { detail: { pathname: pathname } });
//     window.dispatchEvent(event);
//     setTimeout(function () {
//         callback(true);
//     }, timeout);
// };
// var history = createBrowserHistory_1["default"]({ getUserConfirmation: getUserConfirmation });
// // block must return a string to conform
// history.block(function (location, action) { return location.pathname; });
// exports.replaceHistory = function () { return history; };
// var ReplaceComponentRenderer = /** @class */ (function (_super) {
//     __extends(ReplaceComponentRenderer, _super);
//     function ReplaceComponentRenderer(props) {
//         var _this = _super.call(this, props) || this;
//         _this.state = { exiting: false, nextPageResources: {} };
//         _this.listenerHandler = _this.listenerHandler.bind(_this);
//         return _this;
//     }
//     ReplaceComponentRenderer.prototype.listenerHandler = function (event) {
//         var _this = this;
//         var nextPageResources = this.props.loader.getResourcesForPathname(event.detail.pathname, 
//         // tslint:disable-next-line:no-shadowed-variable
//         function (nextPageResources) { return _this.setState({ nextPageResources: nextPageResources }); }) || {};
//         this.setState({ exiting: true, nextPageResources: nextPageResources });
//     };
//     ReplaceComponentRenderer.prototype.componentDidMount = function () {
//         window.addEventListener(historyExitingEventType, this.listenerHandler);
//     };
//     ReplaceComponentRenderer.prototype.componentWillUnmount = function () {
//         window.removeEventListener(historyExitingEventType, this.listenerHandler);
//     };
//     ReplaceComponentRenderer.prototype.componentWillReceiveProps = function (nextProps) {
//         if (this.props.location.key !== nextProps.location.key) {
//             this.setState({ exiting: false, nextPageResources: {} });
//         }
//     };
//     ReplaceComponentRenderer.prototype.render = function () {
//         var _this = this;
//         var transitionProps = {
//             timeout: {
//                 enter: 0,
//                 exit: timeout
//             },
//             appear: true,
//             "in": !this.state.exiting,
//             key: this.props.location.key
//         };
//         return (<react_transition_group_1.Transition {...transitionProps}>
//         {function (status) {
//             return React.createElement(_this.props.pageResources.component, __assign({}, _this.props, _this.props.pageResources.json, { transition: {
//                     status: status,
//                     timeout: timeout,
//                     style: getTransitionStyle_1["default"]({ status: status, timeout: timeout }),
//                     nextPageResources: _this.state.nextPageResources
//                 } }));
//         }}
//       </react_transition_group_1.Transition>);
//     };
//     return ReplaceComponentRenderer;
// }(React.Component));
// // eslint-disable-next-line react/display-name
// exports.replaceComponentRenderer = function (_a) {
//     var props = _a.props, loader = _a.loader;
//     if (props.layout) {
//         return undefined;
//     }
//     return React.createElement(ReplaceComponentRenderer, __assign({}, props, { loader: loader }));
// };
