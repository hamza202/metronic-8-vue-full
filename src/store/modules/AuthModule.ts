import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

export interface User {
    id: number;
    name: string;
    email: string;
    mobile: number;
    image: string;
    token: string;
}

export interface UserAuthInfo {
    errors: unknown;
    user: User;
    isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
    errors = {};
    user = {} as User;
    permissions = {};
    isAuthenticated = !!JwtService.getToken();

    /**
     * Get current user object
     * @returns User
     */
    get currentUser(): User {
        return this.user;
    }

    get permission() {
        return this.permissions;
    }

    /**
     * Verify user authentication
     * @returns boolean
     */
    get isUserAuthenticated(): boolean {
        return this.isAuthenticated;
    }

    /**
     * Get authentification errors
     * @returns array
     */
    get getErrors() {
        return this.errors;
    }

    @Mutation
    [Mutations.SET_ERROR](error) {
        this.errors = {...error};
    }

    @Mutation
    [Mutations.SET_AUTH](data) {
        this.isAuthenticated = true;
        this.user = data.data.user;
        this.errors = {};
        JwtService.saveToken(this.user.token);
        JwtService.saveLocalesServer(data.data.locales);
        this.permissions = data.data.permissions;
        JwtService.savePermissions(this.permissions)
    }

    @Mutation
    [Mutations.SET_USER](user) {
        this.user = user.data;
    }


    @Mutation
    [Mutations.PURGE_AUTH]() {
        this.isAuthenticated = false;
        this.user = {} as User;
        this.errors = [];
        JwtService.destroyToken();
        JwtService.destroyPermissions();
    }

    @Action
    [Actions.LOGIN](credentials) {
        return ApiService.post("login", credentials)
            .then(({data}) => {
                this.context.commit(Mutations.SET_AUTH, data);
            })
            .catch(({response}) => {
                this.context.commit(Mutations.SET_ERROR, response.data.errors);
            });
    }

    @Action
    [Actions.LOGOUT]() {
        this.context.commit(Mutations.PURGE_AUTH);
    }

    @Action
    [Actions.REGISTER](credentials) {
        return ApiService.post("register", credentials)
            .then(({data}) => {
                this.context.commit(Mutations.SET_AUTH, data);
            })
            .catch(({response}) => {
                this.context.commit(Mutations.SET_ERROR, response.data.errors);
            });
    }


    @Action
    [Actions.VERIFY_AUTH]() {
        if (JwtService.getToken()) {
            ApiService.setHeader();
            ApiService.get("users/all-permission")
                .then(({data}) => {
                    this.context.commit(Mutations.SET_AUTH, data);
                })
                .catch(() => {
                    // this.context.commit(Mutations.SET_ERROR, response.data.errors);
                    this.context.commit(Mutations.PURGE_AUTH);
                });
        } else {
            this.context.commit(Mutations.PURGE_AUTH);
        }
    }
}
