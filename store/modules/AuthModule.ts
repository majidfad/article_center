import {
	Module,
	Mutation,
	VuexModule,
	Action
} from 'vuex-module-decorators';
import {
	UserAndAuthenticationApi,
	LoginUserRequest,
	NewUserRequest,
	UpdateUserRequest,
	User
} from '~/lib/Api/api';

// types
export type AlertType = { status: string; message: string } | null

@Module({
	name: 'modules/AuthModule',
	stateFactory: true,
	namespaced: true
})
export default class AuthModule extends VuexModule {
// States
public loginLoadingEnabled: boolean = false;
public signUpLoadingEnabled: boolean = false;
public updateCurrentUserLoadingEnabled: boolean = false;
public currentUser: User | null = null;
public token: string | null = null;
public userName: string | null = null;

// Mutations
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
	localStorage.token = token;
	this.token = token;
}

@Mutation
setUserName (userName: string | null) {
	localStorage.userName = userName;
	this.userName = userName;
}

@Mutation
setUser (user: User | null) {
	this.currentUser = user;
}

@Mutation
initial () {
	if (localStorage.token) {
		this.token = localStorage.token;
	}

	if (localStorage.userName) {
		this.userName = localStorage.userName;
	}
}

@Mutation
logOut () {
	this.token = null;
	this.userName = null;
	localStorage.removeItem('token');
	localStorage.removeItem('userName');
}

// Getters
get isLoggedIn (): boolean {
	return !!this.token;
}

// Actions
@Action
async login (request: LoginUserRequest) {
	this.setLoginLoadingEnabled(true);
	try {
		this.setLoginLoadingEnabled(false);
		const res = await new UserAndAuthenticationApi().login(request);
		if (res.data.user && res.data.user.token) {
			this.setToken(res.data.user.token);
			this.setUserName(res.data.user.username);
			this.context.commit('modules/RootModule/setAlert', {
				status: 'success',
				message: 'successfully done!'
			}, { root: true });
		}
	} catch (e) {
		this.setLoginLoadingEnabled(false);
		this.context.commit('modules/RootModule/setAlert', {
			status: 'error',
			message: e
		}, { root: true });
	}
}

@Action
async signUp (request: NewUserRequest) {
	this.setSignUpLoadingEnabled(true);
	try {
		this.setSignUpLoadingEnabled(false);
		await new UserAndAuthenticationApi().createUser(request);
		this.context.commit('modules/RootModule/setAlert', {
			status: 'success',
			message: 'successfully done!'
		}, { root: true });
	} catch (e) {
		this.setSignUpLoadingEnabled(false);
		this.context.commit('modules/RootModule/setAlert', {
			status: 'error',
			message: e
		}, { root: true });
	}
}

@Action
async updateCurrentUser (request: UpdateUserRequest) {
	this.setUpdateCurrentUserLoadingEnabled(true);
	try {
		const res = await new UserAndAuthenticationApi().updateCurrentUser(
			request
		);
		this.setUpdateCurrentUserLoadingEnabled(false);
		if (res.data) {
			this.setUser(res.data.user);
			this.setUserName(res.data.user.username);
		}
		this.context.commit('modules/RootModule/setAlert', {
			status: 'success',
			message: 'successfully done!'
		}, { root: true });
	} catch (e) {
		this.setUpdateCurrentUserLoadingEnabled(false);
		this.context.commit('modules/RootModule/setAlert', {
			status: 'error',
			message: e
		}, { root: true });
	}
}

@Action
async getCurrentUser () {
	try {
		const res = await new UserAndAuthenticationApi().getCurrentUser();
		if (res.data) {
			this.setUser(res.data.user);
		}
	} catch (e) {
		this.context.commit('modules/RootModule/setAlert', {
			status: 'error',
			message: e
		}, { root: true });
	}
}
}
