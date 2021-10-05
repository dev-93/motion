import { ImageComponent } from "./components/page/item/image.js";
import { PageCoponent } from "./components/page/page.js";

class App {
    private readonly page: PageCoponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageCoponent();
        this.page.attachTo(appRoot);

        const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
        image.attachTo(appRoot, 'beforeend');
    }
};

new App(document.querySelector('.document')! as HTMLElement);