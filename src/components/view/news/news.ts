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

class News {
    draw(data: INewsData[]): void {
        const news: readonly INewsData[] = data.length >= 10 ? data.slice(0, 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector(Selectors.temp);
        const newsWrapper: Element | null = document.querySelector(Selectors.news);

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as HTMLElement;

            const photo: HTMLImageElement | null = newsClone.querySelector(Selectors.photo);
            const author: Element | null = newsClone.querySelector(Selectors.author);
            const date: Element | null = newsClone.querySelector(Selectors.date);
            const title: Element | null = newsClone.querySelector(Selectors.title);
            const source: Element | null = newsClone.querySelector(Selectors.source);
            const content: Element | null = newsClone.querySelector(Selectors.content);

            if (idx % 2) newsClone.querySelector(Selectors.item)?.classList.add('alt');

            if (photo) {
                photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            if (author) {
                author.textContent = item.author || item.source.name;
            }

            if (date) {
                date.textContent = item.publishedAt.toString().slice(0, 10).split('-').reverse().join('-');
            }

            if (title) {
                title.textContent = item.title;
            }

            if (source) {
                source.textContent = item.source.name;
            }

            if (content) {
                content.textContent = item.content;
            }

            newsClone.querySelector(Selectors.readMore)?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        if (newsWrapper) {
            newsWrapper.innerHTML = '';
        }

        newsWrapper?.appendChild(fragment);
    }
}

export default News;
