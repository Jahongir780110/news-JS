import AppLoader from './appLoader';
import { INews, ISource } from 'src/types';

enum Endponsts {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}

class AppController extends AppLoader {
    getSources(): Promise<ISource | undefined> {
        return super.getResp<ISource>({
            endpoint: Endponsts.SOURCES,
        });
    }

    getNews(sourceId: string): Promise<INews | undefined> {
        return super.getResp<INews>({
            endpoint: Endponsts.EVERYTHING,
            options: {
                sources: sourceId,
            },
        });
    }
}

export default AppController;
