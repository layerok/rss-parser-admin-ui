import {AuthStore} from "../stores/auth.store";
import {AuthContext} from "./AuthContext";
import {observer} from "mobx-react-lite";
import {inject} from "mobx-react";

const AuthProviderRaw = ({ children, AuthStore }) => {

    let value = AuthStore;

    if(!AuthStore.initialized) {
        return "...Loading";
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthProvider = inject('AuthStore')(observer(AuthProviderRaw));
