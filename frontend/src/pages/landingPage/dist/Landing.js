"use strict";
exports.__esModule = true;
exports.loader = void 0;
var react_1 = require("react");
require("./landing.css");
var blue_drone_png_1 = require("../../assets/Images/blue_drone.png");
var blue_blog_png_1 = require("../../assets/Images/blue_blog.png");
var blue_heartbeat_png_1 = require("../../assets/Images/blue_heartbeat.png");
var blue_remote_png_1 = require("../../assets/Images/blue_remote.png");
// import drone from "../../assets/Images/blue_drone.png"
function loader(_a) {
    var request = _a.request;
    var pathname = new URL(request.url).searchParams.get("message") || null;
    if (pathname) {
        console.log("logged out");
    }
    return request;
}
exports.loader = loader;
var LogoSvg = function () {
    return (react_1["default"].createElement("div", { className: "text-xl" }, "logo"));
};
var Landing = function () {
    return (react_1["default"].createElement("div", { className: "h-screen w-screen landing_page" },
        react_1["default"].createElement("div", { className: "h-16  px-4 w-screen flex justify-between items-center" },
            react_1["default"].createElement("div", { className: " text-white" },
                react_1["default"].createElement(LogoSvg, null)),
            react_1["default"].createElement("div", { className: "" },
                react_1["default"].createElement("button", { className: "px-7 py-2 bg-sky-600  rounded-3xl hover:bg-sky-700 text-gray-200 border-2  transition-all duration-200 border-gray-800 outline-none" }, "Login"),
                react_1["default"].createElement("button", { className: "px-3 py-2  text-white hover:text-zinc-400 font-mono text-xl transition-all duration-200  outline-none" }, "Sign Up"))),
        react_1["default"].createElement("div", { className: "w-full text-white text-center flex flex-col justify-center items-center gap-y-4 mt-14" },
            react_1["default"].createElement("h1", { className: "text-4xl" }, "Publish your passions, your way"),
            react_1["default"].createElement("div", { className: "text-sm" }, "Create a unique and beatiful blog easily"),
            react_1["default"].createElement("button", { className: "px-3 py-2  text-white shadow-lg bg-orange-400 mt-10 rounded-sm hover:text-zinc-400 font-mono text-xl transition-all duration-200  outline-none" }, "CREATE YOUR BLOG")),
        react_1["default"].createElement("img", { src: blue_drone_png_1["default"], alt: "log1", className: "blue_drone" }),
        react_1["default"].createElement("img", { src: blue_blog_png_1["default"], alt: "log1", className: "blue_blog" }),
        react_1["default"].createElement("img", { src: blue_heartbeat_png_1["default"], alt: "log1", className: "blue_heartbeat" }),
        react_1["default"].createElement("img", { src: blue_remote_png_1["default"], alt: "log1", className: "blue_remote" })));
};
exports["default"] = Landing;
