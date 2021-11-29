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
var PageItemComponent = (function (_super) {
    __extends(PageItemComponent, _super);
    function PageItemComponent() {
        var _this = _super.call(this, "\n            <li draggable=\"true\" class=\"page-item\">\n                <section class=\"page-item__body\"></section>\n                <div class=\"page-item__controls\">\n                    <button class=\"close\">&times;</button>\n                </div>\n            </li>\n        ") || this;
        var closeBtn = _this.element.querySelector('.close');
        closeBtn.onclick = function () {
            _this.closeListener && _this.closeListener();
        };
        _this.element.addEventListener('dragstart', function (event) {
            _this.onDragStart(event);
        });
        _this.element.addEventListener('dragend', function (event) {
            _this.onDragEnd(event);
        });
        _this.element.addEventListener('dragenter', function (event) {
            _this.onDragEnter(event);
        });
        _this.element.addEventListener('dragleave', function (event) {
            _this.onDragLeave(event);
        });
        return _this;
    }
    PageItemComponent.prototype.onDragStart = function (_) {
        this.notifyDragObservers('start');
        this.element.classList.add("lifted");
    };
    PageItemComponent.prototype.onDragEnd = function (_) {
        this.notifyDragObservers('stop');
        this.element.classList.remove("lifted");
    };
    PageItemComponent.prototype.onDragEnter = function (_) {
        this.notifyDragObservers('enter');
        this.element.classList.add("drop-area");
    };
    PageItemComponent.prototype.onDragLeave = function (_) {
        this.notifyDragObservers('leave');
        this.element.classList.remove("drop-area");
    };
    PageItemComponent.prototype.onDropped = function () {
        this.element.classList.remove('drop-area');
    };
    PageItemComponent.prototype.notifyDragObservers = function (state) {
        this.dragStateListener && this.dragStateListener(this, state);
    };
    PageItemComponent.prototype.addChild = function (child) {
        var container = this.element.querySelector('.page-item__body');
        child.attachTo(container);
    };
    PageItemComponent.prototype.setOnCloseListener = function (listener) {
        this.closeListener = listener;
    };
    PageItemComponent.prototype.setOnDragStateListener = function (listener) {
        this.dragStateListener = listener;
    };
    PageItemComponent.prototype.getBoundRect = function () {
        return this.element.getBoundingClientRect();
    };
    PageItemComponent.prototype.muteChildren = function (state) {
        if (state === "mute") {
            this.element.classList.add('mute-children');
        }
        else {
            this.element.classList.remove('mute-children');
        }
    };
    return PageItemComponent;
}(BaseComponents));
export { PageItemComponent };
var PageComponent = (function (_super) {
    __extends(PageComponent, _super);
    function PageComponent(pageItemConstructor) {
        var _this = _super.call(this, '<ul class="page"></ul>') || this;
        _this.pageItemConstructor = pageItemConstructor;
        _this.children = new Set();
        _this.element.addEventListener('dragover', function (event) {
            _this.onDragOver(event);
        });
        _this.element.addEventListener('drop', function (event) {
            _this.onDrop(event);
        });
        return _this;
    }
    PageComponent.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    PageComponent.prototype.onDrop = function (event) {
        event.preventDefault();
        if (!this.dropTarget) {
            return;
        }
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            var dropY = event.clientY;
            var srcElement = this.dragTarget.getBoundRect();
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : "afterend");
        }
        this.dropTarget.onDropped();
    };
    PageComponent.prototype.addChild = function (section) {
        var _this = this;
        var item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(function () {
            item.removeFrom(_this.element);
            _this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragStateListener(function (target, state) {
            switch (state) {
                case 'start':
                    _this.dragTarget = target;
                    _this.updateSections('mute');
                    break;
                case 'stop':
                    _this.dragTarget = undefined;
                    _this.updateSections('unmute');
                    break;
                case 'enter':
                    _this.dropTarget = target;
                    break;
                case 'leave':
                    _this.dropTarget = undefined;
                    break;
                default:
                    throw new Error("unsupported state: ".concat(state));
            }
        });
    };
    PageComponent.prototype.updateSections = function (state) {
        this.children.forEach(function (section) {
            section.muteChildren(state);
        });
    };
    ;
    return PageComponent;
}(BaseComponents));
export { PageComponent };
