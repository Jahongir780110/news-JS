import { Endpoints } from 'src/types';

type configs = {
    endpoint: Endpoints.EVERYTHING | Endpoints.SOURCES;
    options?: { sources?: string };
};

enum Methods {
    GET = 'GET',
}

class Loader {
    constructor(public baseLink: string, public options: { apiKey: string }) {}

    getResp<T>({ endpoint, options = {} }: configs): Promise<T | undefined> {
        return this.load<T>(Methods.GET, endpoint, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { sources?: string }, endpoint: Endpoints.EVERYTHING | Endpoints.SOURCES): URL {
        const urlOptions: URLSearchParams = new URLSearchParams({ ...this.options, ...options });
        const url: URL = new URL(`${this.baseLink}${endpoint}`);

        url.search = urlOptions.toString();
        return url;
    }

    async load<T>(
        method: Methods,
        endpoint: Endpoints.EVERYTHING | Endpoints.SOURCES,
        options = {}
    ): Promise<T | undefined> {
        try {
            const res: Response = await fetch(this.makeUrl(options, endpoint), { method });
            return await this.errorHandler(res).json();
        } catch (err) {
            console.error(err);
        }
    }
}

export default Loader;
