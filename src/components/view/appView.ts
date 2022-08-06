import News from './news/news';
import Sources from './sources/sources';
import { ISource, INews } from 'src/types';

class AppView {
    private news: News = new News();
    private sources: Sources = new Sources();

    drawNews(data: INews | undefined): void {
        this.news.draw(data?.articles || []);
    }

    drawSources(data: ISource | undefined): void {
        this.sources.draw(data?.sources || []);
    }
}

export default AppView;
