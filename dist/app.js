import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent, PageItemComponent } from "./components/page/page.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
var App = (function () {
    function App(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindElementToDialog('#new-image', MediaSectionInput, function (input) { return new ImageComponent(input.title, input.url); });
        this.bindElementToDialog('#new-video', MediaSectionInput, function (input) { return new VideoComponent(input.title, input.url); });
        this.bindElementToDialog('#new-note', TextSectionInput, function (input) { return new NoteComponent(input.title, input.body); });
        this.bindElementToDialog('#new-todo', TextSectionInput, function (input) { return new TodoComponent(input.title, input.body); });
        this.page.addChild(new ImageComponent('random image 1', 'https://picsum.photos/600/300'));
        this.page.addChild(new NoteComponent('today note', 'work hard'));
        this.page.addChild(new TodoComponent('i have to do today', 'work out'));
        this.page.addChild(new VideoComponent('quiet music', 'https://youtu.be/JKURpy-lVAI'));
        this.page.addChild(new ImageComponent('random image 2', 'https://picsum.photos/300/600'));
        this.page.addChild(new NoteComponent('today feeling', 'pretty good'));
        this.page.addChild(new TodoComponent('i have to do today', 'love my self repeatedly'));
        this.page.addChild(new VideoComponent('cozy music', 'https://www.youtube.com/watch?v=gKnG2WKtvgc'));
    }
    App.prototype.bindElementToDialog = function (selector, InputComponent, makeSection) {
        var _this = this;
        var element = document.querySelector(selector);
        element.addEventListener('click', function () {
            var dialog = new InputDialog();
            var input = new InputComponent();
            dialog.addChild(input);
            dialog.attachTo(_this.dialogRoot);
            dialog.setOnCloseListener(function () {
                dialog.removeFrom(_this.dialogRoot);
            });
            dialog.setOnSubmitListener(function () {
                var makeInput = makeSection(input);
                _this.page.addChild(makeInput);
                dialog.removeFrom(_this.dialogRoot);
            });
        });
    };
    return App;
}());
;
new App(document.querySelector('.document'), document.body);
