
import type { Middleware } from '@nuxt/types';
// import { getModule } from 'vuex-module-decorators';
// import AuthModule from '~/store/modules/AuthModule';

const userAgentMiddleware: Middleware = () => {
	// if (!getModule(AuthModule, context.store).token) {
	// 	return context.redirect('/auth/login');
	// }
};

export default userAgentMiddleware;
