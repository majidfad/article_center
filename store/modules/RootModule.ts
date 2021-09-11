
import {
	Module,
	Mutation,
	VuexModule
} from 'vuex-module-decorators';

// types
export type AlertType = { status: string, message: string } | null;

@Module({
	name: 'modules/RootModule',
	stateFactory: true,
	namespaced: true
})

export default class RootModule extends VuexModule {
// state
alert: AlertType = null;

@Mutation
setAlert (data: AlertType) {
	this.alert = data;
}
}
