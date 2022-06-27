import {AuthService} from "../service/auth.service";
import {autorun, makeAutoObservable} from "mobx"
import Cookies from 'js-cookie'


class Auth {
    constructor() {
        makeAutoObservable(this)

        autorun(() => {
            Cookies.set('access_token', this.accessToken);
        })

        this.init();
    }
    initialized = false;
    loading = false;
    accessToken = Cookies.get('access_token');
    expiresIn = null;
    user = null;

    setAccessToken = (token) => {
        this.accessToken = token;
    }

    setExpiresIn = (value) => {
        this.expiresIn = value;
    }

    setUser = (user) => {
        this.user = user;
    }

    login(email, password) {
        this.setLoading(true);
        return AuthService.login(email, password).then(res => {
            console.log(res.data);
            this.setAccessToken(res.data?.access_token)
            this.setExpiresIn(res.data?.expires_in);
            this.setUser(res.data?.user)
            this.setLoading(false);

            return res.data;
        }).catch(e => {
            this.setLoading(false);
            return Promise.reject(e);
        })
    }

    logout() {
        this.setLoading(true);
        return AuthService.logout().then(res => {
            this.setLoading(false);
            this.setUser(null);
            this.setExpiresIn(null);
            this.setAccessToken(null);
            return res;
        })
    }

    register = (data) => {
        this.setLoading(true);
        return AuthService.register(data).then(res => {
            this.setLoading(false);
        })
    }


    init() {
        this.setLoading(true);
        this.getUserProfile().then(() => {
            this.setInitialized(true);
            this.setLoading(false);
        }).catch((e) => {
            // we are unauthenticated
            this.setInitialized(true);
            this.setLoading(false);
        })

    }

    getUserProfile() {
        this.setLoading(true);
        return AuthService.getUserProfile().then(res => {
            console.log('user profile', res.data);
            this.setLoading(false);
            this.setUser(res.data);
        })
    }


    setLoading = (state) => {
        this.loading = state;
    }

    setInitialized = (state) => {
        this.initialized = state;
    }
}

export const AuthStore = new Auth();
