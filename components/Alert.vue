<template>
	<v-snackbar
		:value="alert"
		:timeout="5000"
		:color="(alert && alert.status === 'success' && 'deep-purple accent-4') || alert && alert.status"
		top
	>
		{{ alert && alert.message }}
	</v-snackbar>
</template>
<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';

import RootModule, { AlertType } from '~/store/modules/RootModule';

export default Vue.extend({
	name: 'Alert',
	data () {
		return new (class {})();
	},
	computed: {
		alert (): AlertType {
			return getModule(RootModule, this.$store).alert;
		}
	}
});
</script>

<style scoped>
.alert p {
  width: 100%;
}
.alert-icon {
  font-size: 100px;
  text-align: center;
  width: 100%;
}
.error-icon {
  color: #c62828;
}
.success-icon {
  color: green;
}
.content p {
  padding-top: 30px;
  font-size: 20px;
  text-align: center;
  font-weight: 700;
}
</style>
