<template>
	<v-card class="mx-auto mt-10 mb-10" width="500" outlined>
		<v-card-title> signup page </v-card-title>
		<v-card-text>
			<v-form v-model="valid">
				<v-text-field
					v-model="request.user.username"
					class="ml-2"
					outlined
					dense
					single-line
					type="text"
					append-icon="mdi-account"
					:rules="rules"
					label="username"
					@keyup.enter="login"
				/>
				<v-text-field
					v-model="request.user.email"
					class="ml-2"
					outlined
					dense
					single-line
					type="email"
					append-icon="mdi-email"
					:rules="rules"
					label="email"
					@keyup.enter="signUp"
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
					@keyup.enter="signUp"
				/>
			</v-form>
		</v-card-text>

		<v-card-actions>
			<v-btn
				:disabled="!valid"
				depressed
				color="primary"
				block
				:loading="loading"
				@click="signUp"
			>
				sign up
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import AuthModule from '~/store/modules/AuthModule';
import { NewUserRequest } from '~/lib/Api';

export default Vue.extend({
	data () {
		return new class {
			request: NewUserRequest = {
				user: {
					username: '',
					email: '',
					password: ''
				}
			}

			rules: any = [
				(value: any) => !!value || false
			];

			valid: boolean = false;
		}();
	},
	computed: {
		authModule (): AuthModule {
			return getModule(AuthModule, this.$store);
		},
		loading (): boolean {
			return this.authModule.signUpLoadingEnabled;
		}
	},

	methods: {
		signUp () {
			this.authModule.signUp(this.request);
		}
	}
});

</script>
