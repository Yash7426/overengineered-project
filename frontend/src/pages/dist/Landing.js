"use strict";
exports.__esModule = true;
exports.loader = void 0;
var react_1 = require("react");
function loader(_a) {
    var request = _a.request;
    var pathname = new URL(request.url).searchParams.get("message") || null;
    if (pathname) {
        console.log("logged out");
    }
    return request;
}
exports.loader = loader;
var Landing = function () {
    return (react_1["default"].createElement("div", null, "Landing"));
};
exports["default"] = Landing;
