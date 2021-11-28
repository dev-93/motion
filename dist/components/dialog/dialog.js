var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseComponents } from "../component.js";
;
var InputDialog = (function (_super) {
    __extends(InputDialog, _super);
    function InputDialog() {
        var _this = _super.call(this, "\n            <dialog class=\"dialog\">\n                <div class=\"dialog__container\">\n                    <button class=\"close\">&times;</button>\n                    <div id=\"dialog__body\"></div>\n                    <button class=\"dialog__submit\">ADD</button>\n                </div>\n            </dialog>\n        ") || this;
        var closeBtn = _this.element.querySelector('.close');
        closeBtn.onclick = function () {
            _this.closeListener && _this.closeListener();
        };
        var submitBtn = _this.element.querySelector('.dialog__submit');
        submitBtn.onclick = function () {
            _this.submitListener && _this.submitListener();
        };
        return _this;
    }
    InputDialog.prototype.setOnCloseListener = function (listener) {
        this.closeListener = listener;
    };
    InputDialog.prototype.setOnSubmitListener = function (listener) {
        this.submitListener = listener;
    };
    InputDialog.prototype.addChild = function (child) {
        var body = this.element.querySelector('#dialog__body');
        child.attachTo(body);
    };
    return InputDialog;
}(BaseComponents));
export { InputDialog };
