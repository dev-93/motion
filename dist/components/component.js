var BaseComponents = (function () {
    function BaseComponents(htmlString) {
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild;
    }
    BaseComponents.prototype.attachTo = function (parent, position) {
        if (position === void 0) { position = "afterbegin"; }
        parent.insertAdjacentElement(position, this.element);
    };
    BaseComponents.prototype.removeFrom = function (parent) {
        if (parent !== this.element.parentElement) {
            throw new Error('parent mismatch!');
        }
        parent.removeChild(this.element);
    };
    return BaseComponents;
}());
export { BaseComponents };
