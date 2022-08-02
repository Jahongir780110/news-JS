import AppLoader from './appLoader';
import { INews, ISource } from 'src/types';

class AppController extends AppLoader {
    getSources(): Promise<ISource | undefined> {
        return super.getResp<ISource>({
            endpoint: 'sources',
        });
    }

    getNews(sourceId: string): Promise<INews | undefined> | undefined {
        return super.getResp<INews>({
            endpoint: 'everything',
            options: {
                sources: sourceId,
            },
        });
    }
}

export default AppController;
