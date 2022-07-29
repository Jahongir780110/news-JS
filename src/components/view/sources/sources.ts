import './sources.css';
import { ISourceData } from '../../controller/types';

class Sources {
    draw(data: ISourceData[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLElement;
            const name = sourceClone.querySelector('.source__item-name');

            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
            if (name) {
                name.textContent = item.name;
            }

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
