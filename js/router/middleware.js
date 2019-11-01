import {store} from "../store";

export default function (router) {
    router.beforeEach((to, from, next) => {
        // if the route is not public
        if (!to.meta.public) {
            // if the user authenticated
            if (store.state.auth.isAuth) {
                // continue to the route
                next();
            } else {
                let redirect = {};
                if (to.name !== 'abstracts') {
                    redirect = {redirect: to.path};
                }
                // redirect to login
                next({name: 'login', query: redirect});
            }
        }
        // if the user is authenticated and the route is disabled for authenticated window
        if (store.state.auth.isAuth && to.meta.disableIfLoggedIn) {
            // redirect to home
            next({name: 'home'});
        }
        next();
    })
}
