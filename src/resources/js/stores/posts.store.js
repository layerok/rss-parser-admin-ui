import {PostsService} from "../service/posts.service";
import {makeAutoObservable} from "mobx";

class Posts {
    constructor() {
        makeAutoObservable(this);
    }
    loading = false;
    items = [];
    item = null;
    limits = [5, 10, 25, 50];
    selectedLimit = 5;
    count = 0;
    page = 1;
    search = "";
    orderDirection = "asc";
    orderProperty = "id";

    get totalPages() {
        return Math.ceil(this.count / this.selectedLimit);
    }

    get offset() {
        return this.selectedLimit * (this.page - 1)
    }

    fetch = () => {
        this.setLoading(true);
        return PostsService.get({
            limit: this.selectedLimit,
            offset: this.offset,
            search: this.search,
            order_direction: this.orderDirection,
            order_property: this.orderProperty,
        }).then(res => {
            this.setItems(res.data.data);
            this.setCount(res.data.count);
            this.setLoading(false);
        })
    }

    destroy = (id) => {
        this.setLoading(true);
        return PostsService.destroy(id).then(res => {
            this.setLoading(false);
        })
    }

    store = (data) => {
        this.setLoading(true);
        return PostsService.store(data).then(res => {
            this.setLoading(false);
        })
    }

    show = (id) => {
        this.setLoading(true);
        return PostsService.show(id).then(res => {
            this.setItem(res.data.data);
            this.setLoading(false);
            return this.item;
        })
    }

    update = (id, data) => {
        this.setLoading(true)
        return PostsService.update(id, data).then(res => {
            this.setLoading(false);
            console.log(res);
        })
    }

    setItems(items) {
        this.items = items;
    }

    setItem(item) {
        this.item = item;
    }

    setLoading = state => {
        this.loading = state;
    }

    setSelectedLimit = limit => {
        this.selectedLimit = limit;
    }

    setCount = count => {
        this.count = count;
    }

    setPage = page => {
        this.page = page;
    }

    setSearch = value => {
        this.search = value;
    }

    setOrderDirection = direction => {
        this.orderDirection = direction;
    }

    setOrderProperty = property => {
        this.orderProperty = property;
    }


}

export const PostsStore = new Posts();
