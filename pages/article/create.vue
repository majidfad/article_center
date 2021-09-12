<template>
	<div>
		<v-form
			v-model="valid"
		>
			<v-text-field
				v-model="request.title"
				:rules="rules"
				label="title"
			/>

			<v-text-field
				v-model="request.description"
				:rules="rules"
				label="description"
			/>

			<v-autocomplete
				v-model="request.tagList"
				:items="tagItems"
				:rules="rules"
				label="tag list"
				multiple
			/>

			<v-textarea
				v-model="request.body"
				name="input-7-1"
				label="body"
				:rules="rules"
			/>

			<v-btn
				:disabled="!valid"
				color="success"
				class="mr-4"
				:loading="loading"
				@click="crearteArticle"
			>
				Create
			</v-btn>
		</v-form>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import ArticleModule from '~/store/modules/ArticleModule';
import { NewArticle } from '~/lib/Api';

// mixin
import Authonticated from '~/mixins/authonticated';

export default Vue.extend({
	mixins: [Authonticated],
	data () {
		return new class {
			request: NewArticle = {
				title: '',
				tagList: [],
				description: '',
				body: ''
			};

			tagItems: string[] = ['test1', 'test2'];

			rules: any = [
				(value: any) => !!value || false
			];

			valid: boolean = false;
		}();
	},

	computed: {
		articleModule (): ArticleModule {
			return getModule(ArticleModule, this.$store);
		},
		loading (): boolean {
			return this.articleModule.addArticleLoadingEnabaled;
		}
	},

	methods: {
		crearteArticle () {
			this.articleModule.createArticle(this.request);
		}
	}
});
</script>
