import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageCoponent } from "./components/page/page.js";

class App {
    private readonly page: PageCoponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageCoponent();
        this.page.attachTo(appRoot);

        const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
        image.attachTo(appRoot, 'beforeend');

        const note = new NoteComponent('Note Title', 'Note body');
        note.attachTo(appRoot, 'beforeend');

        const todo = new TodoComponent('Todo Title', 'i will go home');
        todo.attachTo(appRoot, 'beforeend');

        const video = new VideoComponent('video Title', 'https://youtu.be/JKURpy-lVAI');
        video.attachTo(appRoot, 'beforeend');
    }
};

new App(document.querySelector('.document')! as HTMLElement);