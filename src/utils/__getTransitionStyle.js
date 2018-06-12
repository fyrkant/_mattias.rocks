"use strict";
exports.__esModule = true;
var getTransitionStyles = function (timeout) {
    return {
        entering: {
            opacity: 0
        },
        entered: {
            transition: "opacity " + timeout + "ms ease-in",
            opacity: 1
        },
        exiting: {
            transition: "opacity " + timeout + "ms ease-in",
            opacity: 0
        }
    };
};
var getTransitionStyle = function (_a) {
    var timeout = _a.timeout, status = _a.status;
    return getTransitionStyles(timeout)[status];
};
exports["default"] = getTransitionStyle;
