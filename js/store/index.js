import Vue from 'vue';
import Vuex from 'vuex';
import auth from "./modules/auth";
import form from "./modules/form";
import data from "./modules/data";
import sidePanel from "./modules/sidePanel";
import filter from "./modules/filter";


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        form,
        data,
        sidePanel,
        filter
    },
});
