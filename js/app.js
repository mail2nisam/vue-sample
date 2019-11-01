/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import App from "./App";

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import 'es6-promise/auto';
import {routes} from "./router/routes";
import {store} from "./store"
import middleware from "./router/middleware";
import axios from 'axios';
import Notifications from 'vue-notification';

Vue.use(VueRouter);
Vue.use(Notifications);

export const router = new VueRouter({
    mode: "history",
    routes: routes,
    scrollBehavior() {
        return {x: 0, y: 0}
    }
});

middleware(router);

window.globalFunctions = {
    /**
     * Set browser cookie
     * @param name
     * @param value
     * @param days
     */
    setCookie: function (name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    /**
     * Get browser cookie
     * @param name
     * @returns {*}
     */
    getCookie: function (name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    /**
     * Remove cookie
     * @param name
     */
    eraseCookie: function (name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
};

axios.interceptors.response.use(null, function (error) {
    // if auth error, redirect to login and set auth to false
    if (error.response.status === 401) {
        store.commit("setAuth", false);
        router.push({name: "login"});
        return Promise.reject(error);
    } else if (error.response.status === 404) {
        router.push({name: "404"});
        return Promise.reject(error);
    }
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
