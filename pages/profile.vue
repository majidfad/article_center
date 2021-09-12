<template>
	<v-container>
		<v-progress-circular
			v-if="!currentUser"
			class="circle-progress"
			:size="60"
			color="primary"
			indeterminate
		/>
		<v-form
			v-else
			v-model="valid"
		>
			<v-text-field
				v-model="request.email"
				:rules="rules"
				label="email"
			/>

			<v-text-field
				v-model="request.username"
				:rules="rules"
				label="username"
			/>

			<v-file-input
				v-model="request.image"
				accept="image/*"
				label="File input"
			/>

			<v-textarea
				v-model="request.bio"
				name="input-7-1"
				label="bio"
				:rules="rules"
			/>

			<v-btn
				:disabled="!valid"
				color="success"
				class="mr-4"
				:loading="loading"
				@click="updateUser"
			>
				Update
			</v-btn>
		</v-form>
	</v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import AuthModule from '~/store/modules/AuthModule';
import { UpdateUser, User } from '~/lib/Api';

// mixin
import Authonticated from '~/mixins/authonticated';

export default Vue.extend({
	mixins: [Authonticated],
	data () {
		return new class {
			request: UpdateUser = {
				email: '',
				username: '',
				bio: '',
				image: '',
				token: ''
			};

			tagItems: string[] = ['test1', 'test2'];

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
			return this.authModule.updateCurrentUserLoadingEnabled;
		},
		currentUser (): User | null {
			return this.authModule.currentUser;
		}
	},

	watch: {
		currentUser (user) {
			if (user) {
				this.request = { ...user };
			}
		}
	},

	mounted () {
		this.authModule.getCurrentUser();
	},

	methods: {
		updateUser () {
			this.authModule.updateCurrentUser({ user: this.request });
		}
	}
});
</script>
<style scoped>
.circle-progress {
	margin: 50px auto;
    display: block;
}
</style>
