import { Store } from 'vuex';
import ArticlesModule from '~/store/modules/ArticleModule';
import RootModule from '~/store/modules/RootModule';
import AuthModule from '~/store/modules/AuthModule';

export function createStore () {
	return new Store({
		modules: {
			ArticlesModule,
			RootModule,
			AuthModule
		}
	});
}
