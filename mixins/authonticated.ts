import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
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
		if (!this.isLoggedIn) {
			this.$router.push('/auth/login');
		}
	}

});
