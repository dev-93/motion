import { BaseComponents } from "../../components.js";

export class ImageComponent extends BaseComponents<HTMLElement> {
    constructor(title: string, url: string) {
        super (`<section class="image">
                    <div class="image__holder"><img class="image__thumbnail"></div>
                    <p class="page-item__title image__title"></p>
                </section>`);

        const imageElement = this.element.querySelector(".image__thumbnail")! as HTMLImageElement;
        imageElement.src = url;
        imageElement.alt = title;

        const titleElement = this.element.querySelector(".image__title ")! as HTMLParagraphElement;
        titleElement.textContent = title;
    }
}