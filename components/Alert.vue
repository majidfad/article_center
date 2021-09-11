<template>
	<v-snackbar
		v-model="alert"
		:timeout="5000"
		:color="(alert && alert.status) || ''"
		top
	>
		{{ alert && alert.message }}

		<template v-slot:action="{ attrs }">
			<v-btn color="blue" text v-bind="attrs" @click="alert = null">
				بستن
			</v-btn>
		</template>
	</v-snackbar>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import RootModule, { AlertType } from '~/store/modules/RootModule';

export default Vue.extend({
	name: 'Alert',
	data () {
		return new (class {})();
	},
	computed: {
		alert: {
			get (): AlertType {
				return getModule(RootModule, this.$store).alert;
			},
			set (data: AlertType) {
				getModule(RootModule, this.$store).setAlert(data);
			}
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
