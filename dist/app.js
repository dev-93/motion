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
        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/600/300'));
        this.page.addChild(new NoteComponent('Note Title', 'Note body'));
        this.page.addChild(new TodoComponent('Todo Title', 'Todo body'));
        this.page.addChild(new VideoComponent('video Title', 'https://youtu.be/JKURpy-lVAI'));
        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/600/300'));
        this.page.addChild(new NoteComponent('Note Title', 'Note body'));
        this.page.addChild(new TodoComponent('Todo Title', 'Todo body'));
        this.page.addChild(new VideoComponent('video Title', 'https://youtu.be/JKURpy-lVAI'));
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
