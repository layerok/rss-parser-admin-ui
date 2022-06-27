import {apiClient} from "../clients/api.client";

class Auth {
    login(email, password) {
        return apiClient.post('/auth/login', {
            email,
            password
        });
    }

    logout() {
        return apiClient.post('/auth/logout');
    }

    register(data) {
        return apiClient.post('/auth/register', data);
    }

    getUserProfile() {
        return apiClient.get('/auth/user-profile');
    }
}

export const AuthService = new Auth();
