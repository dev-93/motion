export interface Component {
    attachTo(parent: HTMLElement, position?: InsertPosition): void;
    removeFrom(parent: HTMLElement): void;
}

export class BaseComponents<T extends HTMLElement> implements Component {
    protected element: T;

    constructor(htmlString: string) {
        const template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild! as T;
    } 

    attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
        parent.insertAdjacentElement(position, this.element);
    }

    removeFrom(parent: HTMLElement) {
        if(parent !== this.element.parentElement) {
            throw new Error('parent mismatch!');
        }

        parent.removeChild(this.element);
    }
}