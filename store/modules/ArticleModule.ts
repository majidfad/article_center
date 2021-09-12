
import {
	Module,
	Mutation,
	VuexModule,
	Action
} from 'vuex-module-decorators';

import vue from 'vue';

import { ArticlesApi, CommentsApi, FavoritesApi, Article, Comment, NewComment, NewArticle } from '~/lib/Api/api';

// types
export type AlertType = { status: string, message: string } | null;

@Module({
	name: 'modules/ArticleModule',
	stateFactory: true,
	namespaced: true
})

export default class ArticlesModule extends VuexModule {
// States
public articles: Article[] | null = null;
public article: Article | null = null;
public pageCount: number = 0;
public pageOffset: number = 0;
public comments: Comment[] | null = null;
public addCommentLoadingEnabaled: boolean = false;
public addArticleLoadingEnabaled: boolean = false;

// Mutatios
@Mutation
setArticle (data: Article | null) {
	this.article = data;
}

@Mutation
setArticles (data: Article[] | null) {
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

@Mutation
setComments (data: Comment[] | null) {
	this.comments = data;
}

@Mutation
setAddCommentLoadingEnabaled (status: boolean) {
	this.addCommentLoadingEnabaled = status;
}

@Mutation
setAddArticleLoadingEnabaled (status: boolean) {
	this.addArticleLoadingEnabaled = status;
}

@Mutation
setFavorite (params: { status: boolean, slug: string }) {
	const obj = this.articles?.find(a => a.slug === params.slug);
	if (obj) {
		vue.set(obj, 'favorited', params.status);
	}
}

@Mutation
setComment (comment: Comment) {
	this.comments?.push(comment);
}

@Action
async getArticle (slug: string) {
	try {
		const res = await new ArticlesApi().getArticle(slug);
		if (res.data) {
			this.setArticle(res.data.article);
		}
	} catch (e) {
		console.log(e);
	}
}

// Actions
@Action
async getArticles (params: { limit: number, offset: number }) {
	this.setArticles(null);
	try {
		const res = await new ArticlesApi().getArticles(undefined, undefined, undefined, params.limit, params.offset * params.limit);
		if (res.data) {
			this.setArticles(res.data.articles);
			this.setPageCount(res.data.articlesCount / params.limit);
		}
	} catch (e) {
		console.log(e);
	}
}

@Action
async createArticle (request: NewArticle) {
	this.setAddArticleLoadingEnabaled(true);
	try {
		await new ArticlesApi().createArticle({ article: request });
		this.setAddArticleLoadingEnabaled(false);
		this.context.commit('modules/RootModule/setAlert', {
			status: 'success',
			message: 'successfully done!'
		}, { root: true });
	} catch (e) {
		this.setAddArticleLoadingEnabaled(false);
		console.log(e);
	}
}

@Action
async getArticleComments (slug: string) {
	this.setComments(null);
	try {
		const res = await new CommentsApi().getArticleComments(slug);
		if (res.data) {
			this.setComments(res.data.comments);
		}
	} catch (e) {
		console.log(e);
	}
}

@Action
async createArticleComment (params: { slug: string, comment: NewComment }) {
	this.setAddCommentLoadingEnabaled(true);
	try {
		const res = await new CommentsApi().createArticleComment(params.slug, { comment: params.comment });
		this.setAddCommentLoadingEnabaled(false);
		if (res.data) {
			this.setComment(res.data.comment);
			this.context.commit('modules/RootModule/setAlert', {
				status: 'success',
				message: 'successfully done!'
			}, { root: true });
		}
	} catch (e) {
		this.setAddCommentLoadingEnabaled(false);
		console.log(e);
	}
}

@Action
async createArticleFavorite (slug: string) {
	try {
		const res = await new FavoritesApi().createArticleFavorite(slug);
		if (res.data) {
			this.setFavorite({ slug: res.data.article.slug, status: true });
		}
	} catch (e) {
		console.log(e);
	}
}

@Action
async deleteArticleFavorite (slug: string) {
	try {
		const res = await new FavoritesApi().deleteArticleFavorite(slug);
		if (res.data) {
			this.setFavorite({ slug: res.data.article.slug, status: false });
		}
	} catch (e) {
		console.log(e);
	}
}
}
