<template>
	<v-container>
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
				<v-card-title>
					{{ article.title }}
				</v-card-title>

				<v-card-subtitle>
					{{ article.description }}
				</v-card-subtitle>

				<v-card-actions>
					<v-btn
						icon
						@click="show[index] = !show"
					>
						<v-icon>{{ show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
					</v-btn>
				</v-card-actions>

				<v-expand-transition>
					<div v-show="show[index]">
						<v-divider />

						<v-card-text>
							{{ article.body }}
						</v-card-text>
					</div>
				</v-expand-transition>
			</v-card>
		</v-row>
		<div class="text-center">
			<v-pagination
				v-model="pageNumber"
				class="mt-5"
				:length="pageCount"
				total-visible="5"
			/>
		</div>
	</v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import ArticleModule from '~/store/modules/ArticleModule';
import { Article } from '~/lib/Api';

export default Vue.extend({
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
		articles (): Article[] | null {
			return this.articleModule.articles;
		},
		...mapState('modules/ArticleModule', {
			pageCount: (state: any) => state.pageCount
		})
	},

	watch: {
		pageNumber (val) {
			this.articleModule.getArticles({ limit: 20, offset: val });
		}
	},

	mounted () {
		this.articleModule.getArticles({ limit: 20, offset: this.pageNumber });
	}
});
</script>
