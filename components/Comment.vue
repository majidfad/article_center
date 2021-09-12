<template>
	<div class="mt-5">
		<v-list v-if="comments && comments.length !== 0" three-line>
			<template v-for="(comment, index) in comments">
				<v-list-item
					:key="index"
				>
					<v-list-item-avatar>
						<v-img :src="comment.author.image" />
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title v-html="comment.author.username" />
						<v-list-item-subtitle v-html="comment.body" />
					</v-list-item-content>
				</v-list-item>
			</template>
		</v-list>
		<div v-else>
			NO Comment!
		</div>
		<v-form v-model="valid" class="comment-form mt-2">
			<v-textarea
				v-model="commentText"
				prepend-inner-icon="mdi-comment"
				class="mx-2"
				label="leave a comment "
				rows="1"
				:rules="rules"
				@keyup.enter="createComment"
			/>
			<v-btn
				:disabled="!valid"
				color="success"
				class="mr-4 mt-5"
				:loading="addCommentLoadingEnabaled"
				@click="createComment"
			>
				Send
			</v-btn>
		</v-form>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import ArticleModule from '~/store/modules/ArticleModule';
import { Comment } from '~/lib/Api';

export default Vue.extend({

	props: {
		slug: {
			type: String,
			default: null
		}
	},
	data () {
		return new class {
			commentText: string = '';
			valid: boolean = false;
			rules: any = [
				(value: any) => !!value || false
			];
		}();
	},

	computed: {
		articleModule (): ArticleModule {
			return getModule(ArticleModule, this.$store);
		},
		comments (): Comment[] | null {
			return this.articleModule.comments;
		},
		addCommentLoadingEnabaled (): boolean {
			return this.articleModule.addCommentLoadingEnabaled;
		}
	},

	mounted () {
		this.articleModule.getArticleComments(this.slug);
	},

	methods: {
		createComment () {
			this.articleModule.createArticleComment({ slug: this.slug, comment: { body: this.commentText } });
		}
	}
});
</script>
<style scoped>
.comment-form {
	display: flex;
}
</style>
