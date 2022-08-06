import './sources.css';
import { ISourceData } from 'src/types';

enum Selectors {
    temp = '#sourceItemTemp',
    sources = '.sources',
    name = '.source__item-name',
    item = '.source__item',
    dataId = 'data-source-id',
}

const drawSourceElement = (item: ISourceData, fragment: DocumentFragment, template: HTMLTemplateElement) => {
    const sourceClone = template.content.cloneNode(true) as HTMLElement;
    const name = sourceClone.querySelector(Selectors.name) as Element;

    sourceClone.querySelector(Selectors.item)?.setAttribute(Selectors.dataId, item.id);
    name.textContent = item.name;

    fragment.append(sourceClone);
};

class Sources {
    draw(data: ISourceData[]) {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector(Selectors.temp) as HTMLTemplateElement;

        data.forEach((item) => drawSourceElement(item, fragment, sourceItemTemp));

        document.querySelector(Selectors.sources)?.append(fragment);
    }
}

export default Sources;
