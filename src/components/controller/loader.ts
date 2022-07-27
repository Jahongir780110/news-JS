interface ISourceData {
    status: string;
    sources: Array<{
        category: string;
        country: string;
        description: string;
        id: string;
        language: string;
        name: string;
        url: string;
    }>;
}
interface INewsData {
    status: string;
    totalResults: number;
    articles: Array<{
        author: string;
        content: string;
        description: string;
        publishedAt: Date;
        source: {
            id: string;
            name: string;
        };
        title: string;
        url: string;
        urlToImage: string;
    }>;
}

class Loader {
    baseLink: string;
    options: { apiKey: string };

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: { sources?: string } },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { sources?: string }, endpoint: string) {
        const urlOptions: { apiKey: string } & { sources?: string; [key: string]: string | undefined } = {
            ...this.options,
            ...options,
        };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: string,
        callback: (data: INewsData | ISourceData) => void,
        options: { sources?: string }
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
