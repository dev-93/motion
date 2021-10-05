import { PageCoponent } from "./components/page.js";

class App {
    private readonly page: PageCoponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageCoponent();
        this.page.attachTo(appRoot);
    }
};

new App(document.querySelector('.document')! as HTMLElement);