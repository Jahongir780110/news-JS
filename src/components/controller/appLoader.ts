import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: process.env.API_KEY || '', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
