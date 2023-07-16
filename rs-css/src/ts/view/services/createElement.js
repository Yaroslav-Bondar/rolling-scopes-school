"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createElement(data) {
    var tag = data.tag, id = data.id, classes = data.classes, attributeName = data.attributeName, attributeValue = data.attributeValue;
    var element = document.createElement(tag);
    if (id === null || id === void 0 ? void 0 : id.length) {
        element.id = id;
    }
    function addClass(className) {
        if (className.length) {
            element.classList.add(className);
        }
    }
    if (classes === null || classes === void 0 ? void 0 : classes.length) {
        classes.forEach(addClass);
    }
    if ((attributeName === null || attributeName === void 0 ? void 0 : attributeName.length) && (attributeValue === null || attributeValue === void 0 ? void 0 : attributeValue.length)) {
        element.setAttribute(attributeName, attributeValue);
    }
    return element;
}
exports.default = createElement;
