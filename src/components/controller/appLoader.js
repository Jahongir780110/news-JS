import Loader from './loader.ts';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'b64dedafbfd24933ba33f95d2c3826d2', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
