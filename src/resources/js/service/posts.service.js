import {apiClient} from "../clients/api.client";

class Posts {
    get(params = {}) {
        return apiClient.get('/posts', {
            params
        })
    }

    destroy(id) {
        return apiClient.delete(`/posts/${id}`);
    }

    show(id) {
        return apiClient.get(`/posts/${id}`)
    }

    update(id, data) {
        return apiClient.put(`/posts/${id}`, data)
    }

    store(data) {
        return apiClient.post(`/posts`, data)
    }
}

export const PostsService = new Posts();
