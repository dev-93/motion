import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";
import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";

class App {
    private readonly page: Component & Composable;

    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
        this.page.addChild(image);

        const note = new NoteComponent('Note Title', 'Note body');
        this.page.addChild(note);

        const todo = new TodoComponent('Todo Title', 'i will go home');
        this.page.addChild(todo);

        const video = new VideoComponent('video Title', 'https://youtu.be/JKURpy-lVAI');
        this.page.addChild(video);

        const ImageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
        ImageBtn.addEventListener('click', () => {
            const dialog = new InputDialog();

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(document.body);
            });

            dialog.setOnSubmitListener(() => {
                dialog.removeFrom(document.body);
            });

            dialog.attachTo(document.body);
        }); 
    }
};

new App(document.querySelector('.document')! as HTMLElement);