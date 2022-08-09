import AppLoader from './appLoader';
import { INews, ISource, Endpoints } from 'src/types';

class AppController extends AppLoader {
    getSources(): Promise<ISource | undefined> {
        return super.getResp<ISource>({
            endpoint: Endpoints.SOURCES,
        });
    }

    getNews(sourceId: string): Promise<INews | undefined> {
        return super.getResp<INews>({
            endpoint: Endpoints.EVERYTHING,
            options: {
                sources: sourceId,
            },
        });
    }
}

export default AppController;
