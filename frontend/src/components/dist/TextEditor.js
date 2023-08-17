"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_quill_1 = require("react-quill");
require("react-quill/dist/quill.snow.css");
var TextEditor = function () {
    var _a = react_1.useState(''), editorHtml = _a[0], setEditorHtml = _a[1];
    // Handle Quill changes
    var handleQuillChange = function (html) {
        setEditorHtml(html);
    };
    // Handle saving the content
    var saveContent = function () {
        // You can send `editorHtml` to your backend for storage
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_quill_1["default"], { value: editorHtml, onChange: handleQuillChange, placeholder: "Compose your blog...", modules: {
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                ]
            } }),
        react_1["default"].createElement("button", { onClick: saveContent }, "Save")));
};
exports["default"] = TextEditor;
