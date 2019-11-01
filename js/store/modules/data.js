import url from "../../settings/url";
import idbs from './../../api/indexedDBService';

const state = {
    abstracts: []
};
const getters = {};
const mutations = {
    /**
     * Set all abstracts to list
     * @param state
     * @param data
     * @returns {*}
     */
    setAbstracts: (state, data) => state.abstracts = data.abstracts,
    /**
     * Remove the abstract from list using id
     * @param state
     * @param id
     */
    removeAbstractFromList: (state, id) => {
        // clone the list
        let abstracts = _.cloneDeep(state.abstracts);
        // find the index of abstract using id
        let key = _.findKey(abstracts, (a) => {
            return a.id === id;
        });
        // remove from list
        abstracts.splice(key, 1);
        // put back the data
        state.abstracts = abstracts;
    }
};
const actions = {
    /**
     * Fetch all abstracts
     * @param commit
     * @returns {Promise<unknown>}
     */
    fetchAbstracts: function ({commit}) {
        return new Promise((resolve, reject) => {
            axios.get(url.get_abstracts)
                .then(response => {
                    if (response.data.status) {
                        commit('setAbstracts', response.data);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }).catch(reason => reject(reason))
        });
    },
    /**
     * Delete the abstract from server using the given id
     * @param commit
     * @param id - abstract id
     */
    deleteAbstract: function ({commit}, id) {
        axios.delete(url.delete_abstract + id + '/delete')
            .then(response => {
                if (response.data.status) {
                    commit('removeAbstractFromList', id);
                }
            })
    },
    /**
     * Delete request by admin
     * @param commit
     * @param id
     */
    deleteAdminAbstract: function ({commit}, id) {
        axios.delete(url.delete_admin_abstract + id + '/delete')
            .then(response => {
                if (response.data.status) {
                    commit('removeAbstractFromList', id);
                }
            })
    },
    /**
     * Fetch abstract list for admin
     * @param commit
     * @param id
     * @returns {Promise<unknown>}
     */
    fetchAdminAbstracts: function ({commit}, id) {
        return new Promise((resolve, reject) => {
            axios.get(url.get_admin_abstracts)
                .then(response => {
                    if (response.data.status) {
                        commit('setAbstracts', response.data);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }).catch(reason => reject(reason))
        });
    },
    /**
     * Fetch data for country chart
     * @returns {Promise<unknown>}
     */
    fetchCountryChartData: function () {
        return new Promise((resolve, reject) => {
            axios.get(url.get_chart_country)
                .then(response => resolve(response))
                .catch(reason => reject(reason))
        });
    },
    fetchCompanyChartData: function () {
        return new Promise((resolve, reject) => {
            axios.get(url.get_chart_company)
                .then(response => resolve(response))
                .catch(reason => reject(reason))
        });
    },
    fetchAbstractStatusChartData: function () {
        return new Promise((resolve, reject) => {
            axios.get(url.get_chart_abstract_status)
                .then(response => resolve(response))
                .catch(reason => reject(reason))
        });
    },
    fetchAbstractStreamCount: function () {
        return new Promise((resolve, reject) => {
            axios.get(url.get_chart_abstract_stream_count)
                .then(response => resolve(response))
                .catch(reason => reject(reason))
        });
    },
    fetchTechnicalStreamData: function () {
        return new Promise((resolve, reject) => {
            axios.get(url.get_chart_technical)
                .then(response => resolve(response))
                .catch(reason => reject(reason))
        });
    },
    fetchStrategicStreamData: function () {
        return new Promise((resolve, reject) => {
            axios.get(url.get_chart_strategic)
                .then(response => resolve(response))
                .catch(reason => reject(reason))
        });
    },
    fetchTopicData: function () {
        return new Promise((resolve, reject) => {
            axios.get(url.get_chart_topic)
                .then(response => resolve(response))
                .catch(reason => reject(reason))
        });
    },


    // ================ testing=============== //
    checkStorage({state, commit}) {
        state.dataFields.forEach(async field => {
            try {
                let data = await idbs.checkStorage(field);
                // LocalStorage did not find the data, reset it
                if (data === null) data = []
                commit('setState', {field, data})
            } catch (e) {
                // The value in storage was invalid or corrupt so just set it to blank
                commit('setState', {field, data: []})
            }
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
