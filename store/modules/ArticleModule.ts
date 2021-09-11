
import {
	Module,
	Mutation,
	VuexModule,
	Action
} from 'vuex-module-decorators';

import { ArticlesApi, Article } from '~/lib/Api/api';

// types
export type AlertType = { status: string, message: string } | null;

@Module({
	name: 'modules/ArticleModule',
	stateFactory: true,
	namespaced: true
})

export default class ArticlesModule extends VuexModule {
// state
public articles: Article[] | null = null;
public pageCount: number = 0;
public pageOffset: number = 0;

@Mutation
setArticle (data: Article[] | null) {
	this.articles = data;
}

@Mutation
setPageCount (count: number) {
	this.pageCount = count;
}

@Mutation
setPageOffset (count: number) {
	this.pageOffset = count;
}

@Action
async getArticlesFeed (params: { limit: number, offset: number }) {
	try {
		const res = await new ArticlesApi().getArticlesFeed(params.limit, params.offset * params.limit);
		if (res.data) {
			this.setArticle(res.data.articles);
			this.setPageCount(res.data.articlesCount / params.limit);
		}
	} catch (e) {
		console.log(e);
	}
}

@Action
async getArticles (params: { limit: number, offset: number }) {
	try {
		const res = await new ArticlesApi().getArticles(undefined, undefined, undefined, params.limit, params.offset * params.limit);
		if (res.data) {
			this.setArticle(res.data.articles);
			this.setPageCount(res.data.articlesCount / params.limit);
		}
	} catch (e) {
		console.log(e);
	}
}
}
