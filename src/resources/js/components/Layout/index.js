import {inject, observer} from "mobx-react";

const LayoutRaw = ({
    AppStore,
    children
                   }) => {
    if(AppStore.loading) {
        return "...loading";
    }

    return <div>
        {children}
    </div>
}

export const Layout = inject('AppStore')(observer(LayoutRaw));
