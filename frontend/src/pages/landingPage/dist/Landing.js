"use strict";
exports.__esModule = true;
exports.loader = void 0;
var react_1 = require("react");
require("./landing.css");
// blue background
var blue_drone_png_1 = require("../../assets/Images/blue_drone.png");
var blue_blog_png_1 = require("../../assets/Images/blue_blog.png");
var blue_heartbeat_png_1 = require("../../assets/Images/blue_heartbeat.png");
var blue_remote_png_1 = require("../../assets/Images/blue_remote.png");
// red background
var red_blog_png_1 = require("../../assets/Images/red_blog.png");
var red_apple_png_1 = require("../../assets/Images/red_apple.png");
var red_belen_png_1 = require("../../assets/Images/red_belen.png");
var red_fette_png_1 = require("../../assets/Images/red_fette.png");
var red_spoon_png_1 = require("../../assets/Images/red_spoon.png");
var red_plate_png_1 = require("../../assets/Images/red_plate.png");
var red_plate2_png_1 = require("../../assets/Images/red_plate2.png");
var red_cup_png_1 = require("../../assets/Images/red_cup.png");
//green background
var green_blog_png_1 = require("../../assets/Images/green_blog.png");
var green_a_png_1 = require("../../assets/Images/green_a.png");
var green_b_png_1 = require("../../assets/Images/green_b.png");
var green_c_png_1 = require("../../assets/Images/green_c.png");
var green_chappal_png_1 = require("../../assets/Images/green_chappal.png");
var green_coffee_png_1 = require("../../assets/Images/green_coffee.png");
var green_flowers_png_1 = require("../../assets/Images/green_flowers.png");
var green_image_png_1 = require("../../assets/Images/green_image.png");
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
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "h-screen w-screen landing_page" },
            react_1["default"].createElement("div", { className: "h-16  px-4 w-screen flex justify-between items-center" },
                react_1["default"].createElement("div", { className: " text-white" },
                    react_1["default"].createElement(LogoSvg, null)),
                react_1["default"].createElement("div", { className: "" },
                    react_1["default"].createElement("button", { className: "px-6 py-1 bg-orange-400 text-lg shadow-md rounded-3xl hover:text-xl text-gray-200 transition-all duration-200 outline-none" }, "Login"),
                    react_1["default"].createElement("button", { className: "px-3 py-2  text-white hover:text-xl text-lg transition-all duration-200  outline-none" }, "Sign Up"))),
            react_1["default"].createElement("div", { className: "w-full text-white text-center flex flex-col justify-center items-center gap-y-4 mt-14" },
                react_1["default"].createElement("h1", { className: "text-4xl" }, "Publish your passions, your way"),
                react_1["default"].createElement("div", { className: "text-sm" }, "Create a unique and beatiful blog easily"),
                react_1["default"].createElement("button", { className: "px-3 py-2  text-white shadow-sm bg-orange-400 mt-9 rounded-xl hover:text-xl font-mono text-lg transition-all duration-200  outline-none" }, "CREATE YOUR BLOG")),
            react_1["default"].createElement("img", { src: blue_drone_png_1["default"], alt: "log1", className: "_img_ _blue_animate  blue_drone" }),
            react_1["default"].createElement("img", { src: blue_blog_png_1["default"], alt: "log1", className: " _img_ _blue_animate _img_blog blue_blog" }),
            react_1["default"].createElement("img", { src: blue_heartbeat_png_1["default"], alt: "log1", className: "_img_ _blue_animate blue_heartbeat" }),
            react_1["default"].createElement("img", { src: blue_remote_png_1["default"], alt: "log1", className: "_img_ _blue_animate blue_remote" }),
            react_1["default"].createElement("img", { src: green_blog_png_1["default"], alt: "log1", className: "_img_ _green_animate _img_blog green_blog   " }),
            react_1["default"].createElement("img", { src: green_a_png_1["default"], alt: "log1", className: "_img_ _green_animate green_a      " }),
            react_1["default"].createElement("img", { src: green_b_png_1["default"], alt: "log1", className: "_img_ _green_animate green_b      " }),
            react_1["default"].createElement("img", { src: green_c_png_1["default"], alt: "log1", className: "_img_ _green_animate green_c      " }),
            react_1["default"].createElement("img", { src: green_chappal_png_1["default"], alt: "log1", className: "_img_ _green_animate green_chappal" }),
            react_1["default"].createElement("img", { src: green_coffee_png_1["default"], alt: "log1", className: "_img_ _green_animate green_coffe  " }),
            react_1["default"].createElement("img", { src: green_flowers_png_1["default"], alt: "log1", className: "_img_ _green_animate green_flowers" }),
            react_1["default"].createElement("img", { src: green_image_png_1["default"], alt: "log1", className: "_img_ _green_animate green_image  " }),
            react_1["default"].createElement("img", { src: red_blog_png_1["default"], alt: "log1", className: "_img_ _red_animate  _img_blog red_blog  " }),
            react_1["default"].createElement("img", { src: red_apple_png_1["default"], alt: "log1", className: "_img_ _red_animate red_apple " }),
            react_1["default"].createElement("img", { src: red_belen_png_1["default"], alt: "log1", className: "_img_ _red_animate red_belen " }),
            react_1["default"].createElement("img", { src: red_fette_png_1["default"], alt: "log1", className: "_img_ _red_animate red_fette " }),
            react_1["default"].createElement("img", { src: red_spoon_png_1["default"], alt: "log1", className: "_img_ _red_animate red_spoon " }),
            react_1["default"].createElement("img", { src: red_plate_png_1["default"], alt: "log1", className: "_img_ _red_animate red_plate " }),
            react_1["default"].createElement("img", { src: red_plate2_png_1["default"], alt: "log1", className: "_img_ _red_animate red_plate2" }),
            react_1["default"].createElement("img", { src: red_cup_png_1["default"], alt: "log1", className: "_img_ _red_animate red_cup   " }))));
};
exports["default"] = Landing;
