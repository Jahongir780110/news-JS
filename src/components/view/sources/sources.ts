import './sources.css';
import { ISourceData } from 'src/types';

enum Selectors {
    temp = '#sourceItemTemp',
    sources = '.sources',
    name = '.source__item-name',
    item = '.source__item',
    dataId = 'data-source-id',
}

class Sources {
    draw(data: ISourceData[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector(Selectors.temp);

        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLElement;
            const name: Element | null = sourceClone.querySelector(Selectors.name);

            sourceClone.querySelector(Selectors.item)?.setAttribute(Selectors.dataId, item.id);
            if (name) {
                name.textContent = item.name;
            }

            fragment.append(sourceClone);
        });

        document.querySelector(Selectors.sources)?.append(fragment);
    }
}

export default Sources;
