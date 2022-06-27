import Cookies from 'js-cookie'

export const apiClient = axios.create({
    baseURL: '/api'
})

apiClient.interceptors.request.use((config = {}) => {
    const {method} = config;

    const params = method === 'post' ? config.data || {} : config.params || {};

    params.XDEBUG_SESSION_START = true

    const headers = config.headers || {};
    const token = Cookies.get('access_token');

    if(token) {
        headers.Authorization = 'Bearer ' + token
    }

    return config;
})

apiClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if([401].includes(error?.response?.status)) {
        Cookies.remove('access_token');
    }
    return Promise.reject(error);
});
