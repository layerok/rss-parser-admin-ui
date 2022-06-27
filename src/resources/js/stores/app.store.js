class App {
    loading = true;
    setLoading(state) {
        this.loading = state;
    }
}

export const AppStore = new App();
