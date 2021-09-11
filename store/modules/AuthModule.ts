import {
	Module,
	Mutation,
	VuexModule,
	Action,
	getModule
} from 'vuex-module-decorators';
import RootModule from './RootModule';
import {
	UserAndAuthenticationApi,
	LoginUserRequest,
	NewUserRequest,
	UpdateUserRequest
} from '~/lib/Api/api';
// types
export type AlertType = { status: string; message: string } | null

@Module({
	name: 'modules/AuthModule',
	stateFactory: true,
	namespaced: true
})
export default class AuthModule extends VuexModule {
// state
public loginLoadingEnabled: boolean = false;
public signUpLoadingEnabled: boolean = false;
public updateCurrentUserLoadingEnabled: boolean = false;
public token: string | null = null;

@Mutation
setLoginLoadingEnabled (status: boolean) {
	this.loginLoadingEnabled = status;
}

@Mutation
setSignUpLoadingEnabled (status: boolean) {
	this.signUpLoadingEnabled = status;
}

@Mutation
setUpdateCurrentUserLoadingEnabled (status: boolean) {
	this.updateCurrentUserLoadingEnabled = status;
}

@Mutation
setToken (token: string | null) {
	this.token = token;
}

@Mutation
initial (token: string | null) {
	if (localStorage.token) {
		this.token = token;
	}
}

@Action
async login (request: LoginUserRequest) {
	this.setLoginLoadingEnabled(true);
	try {
		this.setLoginLoadingEnabled(false);
		const res = await new UserAndAuthenticationApi().login(request);
		if (res.data.user && res.data.user.token) {
			localStorage.token = res.data.user.token;
			this.setToken(res.data.user.token);
		}
	} catch (e: any) {
		this.setLoginLoadingEnabled(false);
		getModule(RootModule).setAlert({
			status: 'error',
			message: e.data.message
		});
	}
}

@Action
async signUp (request: NewUserRequest) {
	this.setSignUpLoadingEnabled(true);
	try {
		this.setSignUpLoadingEnabled(false);
		const res = await new UserAndAuthenticationApi().createUser(request);
		console.log(res);
	} catch (e) {
		this.setSignUpLoadingEnabled(false);
		console.log(e);
	}
}

@Action
async updateCurrentUser (request: UpdateUserRequest) {
	try {
		const res = await new UserAndAuthenticationApi().updateCurrentUser(
			request
		);
		console.log(res);
	} catch (e) {
		console.log(e);
	}
}
}
