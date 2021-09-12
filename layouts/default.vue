<template>
	<v-app class="theme--light">
		<main-menu @open-menu="openMenu" />
		<v-navigation-drawer
			v-model="drawer"
			absolute
			temporary
		>
			<v-list
				nav
				dense
			>
				<nuxt-link to="/">
					<v-list-item>
						<v-list-item-icon>
							<v-icon>mdi-home</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Home</v-list-item-title>
					</v-list-item>
				</nuxt-link>
				<nuxt-link v-show="isLoggedIn" to="/article/create">
					<v-list-item>
						<v-list-item-icon>
							<v-icon>mdi-notebook-edit</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Create Article</v-list-item-title>
					</v-list-item>
				</nuxt-link>
				<nuxt-link to="/auth/signUp">
					<v-list-item>
						<v-list-item-icon>
							<v-icon>mdi-account-multiple-plus-outline</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Create User</v-list-item-title>
					</v-list-item>
				</nuxt-link>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<v-container>
				<nuxt-child class="mt-5" />
			</v-container>
		</v-main>
		<alert />
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import AuthModule from '~/store/modules/AuthModule';

// components
import MainMenu from '~/components/Menu.vue';

export default Vue.extend({
	components: {
		MainMenu
	},
	data () {
		return new class {
			drawer: boolean = false;
		}();
	},

	computed: {
		authModule (): AuthModule {
			return getModule(AuthModule, this.$store);
		},
		isLoggedIn (): boolean {
			return this.authModule.isLoggedIn;
		}
	},

	beforeMount () {
		this.authModule.initial();
	},

	methods: {
		openMenu (status: boolean) {
			this.drawer = status;
		}
	}

});
</script>
<style>
	.v-application a {
		text-decoration: none !important;
	}
</style>
