<template>
	<v-card
		class="mx-auto mt-10 mb-10"
		width="500"
		outlined
	>
		<v-card-title>
			login page
		</v-card-title>
		<v-card-text>
			<v-form v-model="valid">
				<v-text-field
					v-model="request.user.email"
					class="ml-2"
					outlined
					dense
					single-line
					type="email"
					append-icon="mdi-account"
					:rules="rules"
					label="email"
					@keyup.enter="login"
				/>
				<v-text-field
					v-model="request.user.password"
					class="ml-2"
					outlined
					dense
					single-line
					type="password"
					append-icon="mdi-lock"
					:rules="rules"
					label="password"
					@keyup.enter="login"
				/>
			</v-form>
		</v-card-text>

		<v-card-actions>
			<v-btn
				depressed
				color="primary"
				block
				:loading="loginLoadingEnabled"
				@click="login"
			>
				login
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import AuthModule from '~/store/modules/AuthModule';
import { LoginUserRequest } from '~/lib/Api';

export default Vue.extend({
	data () {
		return new class {
			request: LoginUserRequest = {
				user: {
					email: '',
					password: ''
				}
			}
		}();
	},
	computed: {
		authModule (): AuthModule {
			return getModule(AuthModule, this.$store);
		},
		loginLoadingEnabled (): boolean {
			return this.authModule.loginLoadingEnabled;
		}
	},

	methods: {
		login () {
			this.authModule.login(this.request);
		}
	}
});
</script>
