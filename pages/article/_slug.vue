<template>
	<div>
		<v-progress-circular
			v-if="!article"
			class="circle-progress"
			:size="60"
			color="primary"
			indeterminate
		/>
		<v-card
			v-else
			class="mx-auto"
			width="100%"
		>
			<v-card-title class="pb-0">
				{{ article.title }}
			</v-card-title>
			<br>
			<v-card-text class="text--primary">
				{{ article.body }}
			</v-card-text>
		</v-card>
		<comment v-show="isLoggedIn" :slug="$route.params.slug" />
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import ArticleModule from '~/store/modules/ArticleModule';
import AuthModule from '~/store/modules/AuthModule';
import { Article } from '~/lib/Api';

// component
import Comment from '~/components/Comment.vue';

export default Vue.extend({
	components: {
		Comment
	},

	data () {
		return new class {
			show: boolean[] = [];
			pageNumber: number = 1;
		}();
	},

	computed: {
		articleModule (): ArticleModule {
			return getModule(ArticleModule, this.$store);
		},
		article (): Article | null {
			return this.articleModule.article;
		},
		isLoggedIn (): boolean {
			return getModule(AuthModule, this.$store).isLoggedIn;
		}
	},

	mounted () {
		this.articleModule.getArticle(this.$route.params.slug);
	}
});
</script>
<style scoped>
.circle-progress {
	margin: 50px auto;
    display: block;
}
</style>
