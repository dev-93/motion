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
import { BaseComponents } from "../../component.js";
var VideoComponent = (function (_super) {
    __extends(VideoComponent, _super);
    function VideoComponent(title, url) {
        var _this = _super.call(this, "\n            <section class=\"video\">\n                <div class=\"video__player\">\n                    <iframe class=\"video__iframe\"></iframe>\n                    <h3 class=\"page-item__title video__title\"></h3>\n                </div>\n            </section>\n        ") || this;
        var iframe = _this.element.querySelector('.video__iframe');
        iframe.src = _this.convertToEmbeddedURL(url);
        var titleElement = _this.element.querySelector('.video__title');
        titleElement.textContent = title;
        return _this;
    }
    VideoComponent.prototype.convertToEmbeddedURL = function (url) {
        var regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
        var match = url.match(regExp);
        var videoId = match ? match[1] || match[2] : undefined;
        if (videoId) {
            return "https://www.youtube.com/embed/".concat(videoId);
        }
        return url;
    };
    return VideoComponent;
}(BaseComponents));
export { VideoComponent };
