import url from "../../settings/url";
import axios from 'axios'

const state = {
    isAuth: (window.localStorage && window.localStorage.isAuth === "true") || false,
    user: {}
};
const getters = {
    isAuth: state => state.isAuth,
    user: state => state.user,
    isAdmin: state => state.user.role === 'Admin',
    isSubmitter: state => state.user.role === 'Submitter'
};
const mutations = {
    /**
     * Set user auth status
     * @param state
     * @param value
     */
    setAuth: (state, value) => {
        state.isAuth = value;
        window.localStorage.isAuth = value;
    },
    /**
     * Set current user
     * @param state
     * @param data
     * @returns {*}
     */
    setUser: (state, data) => state.user = data,
};
const actions = {
    /**
     * Request login
     * @param commit
     * @param data
     * @returns {Promise<unknown>}
     */
    login: function ({commit}, data) {
        return new Promise((resolve, reject) => {
            axios.get(url.login, {
                params: data
            })
                .then(response => resolve(response))
                .catch(reason => reject(reason))
            ;
        })
    },
    /**
     * Logout the current session
     * @param commit
     * @returns {Promise<unknown>}
     */
    logout: function ({commit}) {
        return new Promise((resolve, reject) => {
            axios.get(url.logout)
                .then(response => resolve(response))
                .catch(reason => reject(reason))
        });
    },
    /**
     * Send register request to server
     * @param commit
     * @param data
     * @returns {Promise<unknown>}
     */
    register: function ({commit}, data) {
        return new Promise((resolve, reject) => {
            axios.post(url.register, data)
                .then(response => resolve(response))
                .catch(reason => reject(reason))
            ;
        })
    },
    /**
     * Fetch the current user details
     * @param commit
     */
    fetchUser: function ({commit}) {
        return new Promise((resolve, reject) => {
            axios.get(url.get_user)
                .then(
                    response => {
                        if (response.data) {
                            commit('setUser', response.data);
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    },
                    error => {
                        reject(error);
                    }
                )
        });
    },
    /**
     * Fetch the list of companies to show in the register form
     * @returns {Promise<unknown>}
     */
    fetchCompanies: function () {
        return new Promise((resolve, reject) => {
            axios.get(url.companies_api)
                .then(response => resolve(response))
                .catch(reason => reject(reason));
        });
    },
    /**
     * Verify user email after registration
     * @param commit
     * @param token
     * @returns {Promise<unknown>}
     */
    verifyUserEmail: function ({commit}, token) {
        return new Promise((resolve, reject) => {
            let data = {token: token};
            axios.post(url.verify, data)
                .then(response => resolve(response))
                .catch(reason => reject(reason));
        });
    },
    /**
     * Send forget password request to server
     * @param data
     * @returns {Promise<unknown>}
     */
    forgetPassword: function ({}, data) {
        return new Promise((resolve, reject) => {
            axios.post(url.forget_password, data)
                .then(response => resolve(response))
                .catch(reason => reject(reason));
        });
    },
    /**
     * Verify the token
     * @param data
     * @returns {Promise<unknown>}
     */
    verifyToken: function ({}, data) {
        return new Promise((resolve, reject) => {
            axios.post(url.token_verify, data)
                .then(response => resolve(response))
                .catch(reason => reject(false));
        });
    },
    /**
     * Update the current password by sending request to server
     * @param data
     * @returns {Promise<unknown>}
     */
    resetPassword: function ({}, data) {
        return new Promise((resolve, reject) => {
            axios.post(url.reset_password, data)
                .then(response => resolve(response))
                .catch(reason => reject(false));
        });
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}
