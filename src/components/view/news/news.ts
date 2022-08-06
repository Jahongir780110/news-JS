import './news.css';
import { INewsData } from 'src/types';

enum Selectors {
    temp = '#newsItemTemp',
    news = '.news',
    photo = '.news__meta-photo',
    author = '.news__meta-author',
    date = '.news__meta-date',
    title = '.news__description-title',
    source = '.news__description-source',
    content = '.news__description-content',
    item = '.news__item',
    readMore = '.news__read-more a',
}

const drawNewsElement = (item: INewsData, index: number, fragment: DocumentFragment, template: HTMLTemplateElement) => {
    const newsClone = template.content.cloneNode(true) as HTMLElement;

    const photo = newsClone.querySelector(Selectors.photo) as HTMLElement;
    const author = newsClone.querySelector(Selectors.author) as HTMLElement;
    const date = newsClone.querySelector(Selectors.date) as HTMLElement;
    const title = newsClone.querySelector(Selectors.title) as HTMLElement;
    const source = newsClone.querySelector(Selectors.source) as HTMLElement;
    const content = newsClone.querySelector(Selectors.content) as HTMLElement;

    if (index % 2) newsClone.querySelector(Selectors.item)?.classList.add('alt');

    photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
    author.textContent = item.author || item.source.name;
    date.textContent = item.publishedAt.toString().slice(0, 10).split('-').reverse().join('-');
    title.textContent = item.title;
    source.textContent = item.source.name;
    content.textContent = item.content;
    newsClone.querySelector(Selectors.readMore)?.setAttribute('href', item.url);

    fragment.append(newsClone);
};

class News {
    draw(data: INewsData[]): void {
        const news: readonly INewsData[] = data.length >= 10 ? data.slice(0, 10) : data;

        const fragment = document.createDocumentFragment() as DocumentFragment;
        const newsItemTemp = document.querySelector(Selectors.temp) as HTMLTemplateElement;
        const newsWrapper = document.querySelector(Selectors.news) as Element;

        news.forEach((item, index) => drawNewsElement(item, index, fragment, newsItemTemp));

        newsWrapper.innerHTML = '';

        newsWrapper.appendChild(fragment);
    }
}

export default News;
