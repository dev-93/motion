import { BaseComponents } from "../components.js";

export class PageCoponent extends BaseComponents<HTMLUListElement>{
    constructor() {
        super('<ul class="page">This is PageComponent</ul>');
    }
}