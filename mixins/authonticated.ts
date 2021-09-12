import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import Axios from 'axios';
import AuthModule from '~/store/modules/AuthModule';

export default Vue.extend({

	computed: {
		authModule (): AuthModule {
			return getModule(AuthModule, this.$store);
		},
		isLoggedIn (): boolean {
			return this.authModule.isLoggedIn;
		}
	},

	watch: {
		isLoggedIn (status) {
			if (!status) {
				this.$router.push('/auth/login');
			}
		}
	},

	beforeMount () {
		this.authModule.initial();
		if (!this.isLoggedIn) {
			this.$router.push('/auth/login');
		}
		const that = this;
		Axios.interceptors.request.use(
			(config) => {
				const token = that.authModule.token;
				if (token) {
					config.headers.Authorization = 'Token ' + token;
				}
				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);
	}

});
