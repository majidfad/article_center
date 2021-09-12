<template>
	<div>
		<v-app-bar
			color="deep-purple accent-4"
			dense
			dark
		>
			<v-app-bar-nav-icon @click="openMenu" />

			<v-toolbar-title>Article center <span v-if="isLoggedIn && userName">/ Hi {{ userName }}</span></v-toolbar-title>

			<v-spacer />
			<nuxt-link v-show="isLoggedIn" to="/profile">
				<v-btn icon>
					<v-icon>mdi-account</v-icon>
				</v-btn>
			</nuxt-link>

			<nuxt-link v-show="!isLoggedIn && $route.path !== '/auth/login'" to="/auth/login">
				<v-btn icon>
					<v-icon>mdi-account-key-outline</v-icon>
				</v-btn>
			</nuxt-link>

			<v-btn v-show="isLoggedIn" icon @click="logOut">
				<v-icon>mdi-location-exit</v-icon>
			</v-btn>
		</v-app-bar>
	</div>
</template>
<script lang="ts">
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
		},
		userName (): string | null {
			return this.authModule.userName;
		}
	},

	methods: {
		openMenu () {
			this.$emit('open-menu', true);
		},

		logOut () {
			this.authModule.logOut();
		}
	}
});
</script>
