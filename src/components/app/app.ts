import AppController from '../controller/controller';
import AppView from '../view/appView';
import { INews, ISource } from 'src/types';

const isClickedSource = (target: HTMLElement): boolean | undefined => {
    return target.classList.contains('source__item') || target.parentElement?.classList.contains('source__item');
};

class App {
    private controller: AppController = new AppController();
    private view: AppView = new AppView();

    async start() {
        document.querySelector('.sources')?.addEventListener('click', async (e: Event) => {
            const currentTarget = e.currentTarget as HTMLElement;
            const target = e.target as HTMLElement;

            if (isClickedSource(target)) {
                const sourceId =
                    target.getAttribute('data-source-id') || target.parentElement?.getAttribute('data-source-id');
                if (sourceId === currentTarget.getAttribute('data-source')) return;

                currentTarget.setAttribute('data-source', sourceId || '');
                const data: INews | undefined = await this.controller.getNews(sourceId || '');
                if (data) {
                    this.view.drawNews(data);
                }
            }
        });

        const data: ISource | undefined = await this.controller.getSources();
        if (data) {
            this.view.drawSources(data);
        }
    }
}

export default App;
