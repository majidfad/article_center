<template>
	<div>
		<v-progress-circular
			v-show="!articles"
			class="circle-progress"
			:size="60"
			color="primary"
			indeterminate
		/>
		<v-row
			v-for="(article, index) in articles"
			:key="index"
			justify="center"
			align="center"
		>
			<v-card
				class="mb-2"
				width="100%"
			>
				<nuxt-link style="width: 100%" :to="`/article/${article.slug}`">
					<v-card-title>
						{{ article.title }}
					</v-card-title>
				</nuxt-link>

				<v-card-subtitle>
					{{ article.description }}
				</v-card-subtitle>

				<v-spacer />

				<v-chip
					v-if="isLoggedIn"
					class="ma-2 star"
					:color="article.favorited ? 'orange' : 'gray'"
					text-color="white"
					@click="setFavorite(article.favorited, article.slug)"
				>
					<v-icon>
						mdi-star
					</v-icon>
				</v-chip>
			</v-card>
		</v-row>
		<div class="text-center">
			<v-pagination
				v-if="articles"
				v-model="pageNumber"
				class="mt-5"
				:length="pageCount"
				total-visible="5"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import ArticleModule from '~/store/modules/ArticleModule';
import AuthModule from '~/store/modules/AuthModule';
import { Article } from '~/lib/Api';

export default Vue.extend({
	data () {
		return new class {
			pageNumber: number = 1;
		}();
	},

	computed: {
		articleModule (): ArticleModule {
			return getModule(ArticleModule, this.$store);
		},
		authModule (): AuthModule {
			return getModule(AuthModule, this.$store);
		},
		isLoggedIn (): boolean {
			return this.authModule.isLoggedIn;
		},
		articles (): Article[] | null {
			return this.articleModule.articles;
		},
		pageCount (): number {
			return this.articleModule.pageCount;
		}
	},

	watch: {
		pageNumber (val) {
			this.articleModule.getArticles({ limit: 20, offset: val });
		}
	},

	mounted () {
		this.articleModule.getArticles({ limit: 20, offset: this.pageNumber });
	},

	methods: {
		setFavorite (favorited: boolean, slug: string) {
			if (favorited) {
				this.articleModule.deleteArticleFavorite(slug);
			} else {
				this.articleModule.createArticleFavorite(slug);
			}
		}
	}
});
</script>
<style scoped>
.circle-progress {
	margin: 50px auto;
    display: block;
}

.star {
	position: absolute;
    top: 0;
    right: 0;
}
</style>
