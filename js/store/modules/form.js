import url from "../../settings/url";

const state = {
    step: 1,
    id: null,
    abstract: {
        submitter_id: null,
        stream: null,
        topic: null,
        topic_other: null,
        title: null,
        abstract: null,
        company_permission: null,
        company_permission_details: null,
        submitted_else: null,
        submitted_else_details: null,
        previously_published: null,
        previously_published_details: null,
        status: null,
        edit_requested: null
    },
    people: [],
    remove: {
        type: null,
        id: null
    },
    removed_people: []
};
const getters = {};
const mutations = {
    setStep: (state, value) => state.step = value,
    setId: (state, value) => state.id = value,
    setSubmitterId: (state, value) => state.abstract.submitter_id = value,
    setStream: (state, value) => {
        let abstract = _.cloneDeep(state.abstract);
        abstract.stream = value;
        abstract.topic = null;
        state.abstract = abstract;
    },
    setTopic: (state, value) => state.abstract.topic = value,
    setTopicOther: (state, value) => state.abstract.topic_other = value,
    setTitle: (state, value) => state.abstract.title = value,
    setAbstract: (state, value) => state.abstract.abstract = value,
    setCompanyPermission: (state, value) => state.abstract.company_permission = value,
    setCompanyPermissionDetails: (state, value) => state.abstract.company_permission_details = value,
    setSubmittedElse: (state, value) => state.abstract.submitted_else = value,
    setSubmittedElseDetails: (state, value) => state.abstract.submitted_else_details = value,
    setPreviouslyPublished: (state, value) => state.abstract.previously_published = value,
    setPreviouslyPublishedDetails: (state, value) => state.abstract.previously_published_details = value,
    setStatus: (state, value) => state.abstract.status = value,
    // init the form with the existing data
    setAbstractFormValues: (state, data) => {
        // set the form id
        state.id = data.abstract.id;
        state.step = data.abstract.step;
        // clone the abstract data
        let abstract = _.cloneDeep(state.abstract);
        let people = _.cloneDeep(state.people);
        // copy all data into store by comparing the key and value
        Object.keys(abstract).forEach((key) => {
            if ((data.abstract[key] || data.abstract[key] === 0) && typeof data.abstract[key] != 'undefined') {
                abstract[key] = data.abstract[key];
            }
        });
        abstract.topic = data.abstract.topic;
        // set the value to store
        state.abstract = abstract;


        // if people set
        if (data.abstract.people && data.abstract.people.length > 0) {
            people = data.abstract.people;
        } else {
            people = [];
        }
        state.people = people;
    },
    /**
     * Set form data null
     * @param state
     */
    initFormData: (state) => {
        // set the form id
        state.id = null;
        // clone the abstract data
        let abstract = _.cloneDeep(state.abstract);
        // copy all data into store by comparing the key and value
        Object.keys(abstract).forEach((key) => {
            abstract[key] = null;
        });
        abstract.topic = null;
        // set the value to store
        state.abstract = abstract;
    },
    addUserToPeople: (state, data) => {
        let people = _.cloneDeep(state.people);
        people.push(data);
        state.people = people;
    },
    /**
     * Find the user from the list of people and set as presenter
     * @param state
     * @param data
     */
    setUserPresenterStatus: (state, data) => {
        let people = _.cloneDeep(state.people);
        people[data.id].presenter = data.value;
        state.people = people;
    },
    /**
     * Find the user from the list and set as author
     * @param state
     * @param data
     */
    setUserAuthorStatus: (state, data) => {
        let people = _.cloneDeep(state.people);
        people[data.id].author = data.value;
        state.people = people;
    },
    setUserCoAuthorStatus: (state, data) => {
        let people = _.cloneDeep(state.people);
        people[data.id].co_author = data.value;
        state.people = people;
    },
    /**
     * Remove tag from the people
     * @param state
     * @param data
     */
    removeTagFromPeople: (state, data) => {
        let people = _.cloneDeep(state.people);
        people[data.index][data.tag] = false;
        state.people = people;
    },
    updateUserData: function (state, data) {
        let people = _.cloneDeep(state.people);
        people[data.id] = data.value;
        state.people = people;
    },
    /**
     * Set data for remove action
     * @param state
     * @param data
     */
    setRemoveData: (state, data) => {
        state.remove = data;
    },
    /**
     * Remove single person from the people list
     * If the person is already saved in the storage, then send the id as request
     * @param state
     * @param index
     */
    removePerson: (state, index) => {
        let people = _.cloneDeep(state.people);
        if (people[index].id) {
            state.removed_people.push(people[index].id);
        }
        people.splice(index, 1);
        state.people = people;
    },
    emptyRemovedPeople: state => state.removed_people = []
};
const actions = {
    /**
     * Get the list of topics corresponding to the selected stream
     * @param commit
     * @param stream
     * @returns {Promise<unknown>}
     */
    fetchTopics: function ({commit}, stream) {
        return new Promise(resolve => {
            axios.get(`${url.get_topics}/${stream}`).then(response => resolve(response))
        })
    },
    /**
     * Create new form entry
     * @param commit
     * @param state
     */
    createFormEntry: function ({commit, state}) {
        let data = _.cloneDeep(state);
        return new Promise((resolve, reject) => {
            axios.post(url.post_form_create, data)
                .then(
                    response => {
                        if (response.data.status) {
                            commit('setId', response.data.abstract_id);
                            resolve(response);
                        } else {
                            reject(false);
                        }
                    }
                ).catch(reason => reject(reason));
        });
    },

    /**
     * Create form entry for admin
     * @param commit
     * @param state
     * @returns {Promise<unknown>}
     */
    createAdminFormEntry: function ({commit, state}) {
        let data = _.cloneDeep(state);
        return new Promise((resolve, reject) => {
            axios.post(url.post_admin_form_create, data)
                .then(
                    response => {
                        if (response.data.status) {
                            commit('setId', response.data.abstract_id);
                            resolve(response);
                        } else {
                            reject(false);
                        }
                    }
                ).catch(reason => reject(reason));
        });
    },
    /**
     * Update the existing form data
     */
    updateFormEntry: function ({state, getters}) {
        let data = _.cloneDeep(state);
        return new Promise((resolve, reject) => {
            axios.post(url.post_form_update, data)
                .then(
                    response => {
                        if (response.data.status) {
                            resolve(response);
                        } else {
                            reject(false);
                        }
                    }
                ).catch(reason => reject(reason));
        });
    },
    /**
     * Update existing form data for admin
     * @param state
     * @param getters
     * @returns {Promise<unknown>}
     */
    adminUpdateFormEntry: function ({state, getters}) {
        let data = _.cloneDeep(state);
        return new Promise((resolve, reject) => {
            axios.post(url.post_admin_form_update, data)
                .then(
                    response => {
                        if (response.data.status) {
                            resolve(response);
                        } else {
                            reject(false);
                        }
                    }
                ).catch(reason => reject(reason));
        });
    },
    /**
     * Get single form data.
     * Commit data to update the current form initialization
     * @param commit
     * @param id
     * @returns {Promise<unknown>}
     */
    fetchSingleFormData: function ({commit}, id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url.get_abstract}${id}`)
                .then(
                    response => {
                        if (response.data.status) {
                            commit("setAbstractFormValues", response.data);
                            resolve(response.data);
                        } else {
                            reject(response.data)
                        }
                    }
                )
        });
    },
    /**
     * Single abstract for admin
     * @param commit
     * @param id
     * @returns {Promise<unknown>}
     */
    fetchAdminSingleFormData: function ({commit}, id) {
        return new Promise((resolve, reject) => {
            axios.get(`${url.get_admin_abstract}${id}`)
                .then(
                    response => {
                        if (response.data.status) {
                            commit("setAbstractFormValues", response.data);
                            resolve(response.data);
                        }
                    }
                )
        });
    },
    /**
     * Add people to the list
     * Convert the data into formData object
     * @param state
     * @param commit
     * @param id
     * @returns {Promise<unknown>}
     */
    addPeople: function ({commit, state}, id) {
        let data = _.cloneDeep(state);
        let formData = new FormData();
        formData.append('people', JSON.stringify(data.people));
        formData.append('step', data.step);
        formData.append('status', data.abstract.status);
        formData.append('removed_people', JSON.stringify(data.removed_people));
        data.people.map((user, key) => {
            if (user.presenter) {
                if (typeof user.avatar === 'object') {
                    formData.append('avatar[' + key + ']', user.avatar);
                }
                if (typeof user.company_logo === 'object') {
                    formData.append('company_logo[' + key + ']', user.company_logo);
                }
            }
        });
        return new Promise((resolve, reject) => {
            axios.post(url.post_abstract_people + id + '/add/people', formData)
                .then(
                    response => {
                        if (response.data.status) {
                            commit('emptyRemovedPeople');
                            commit("setAbstractFormValues", response.data);
                            resolve(response);
                        } else {
                            reject(response)
                        }
                    }
                ).catch(reason => reject(reason));
        });
    },
    /**
     * Add people to the list by admin
     * @param commit
     * @param state
     * @param id
     * @returns {Promise<unknown>}
     */
    addAdminPeople: function ({commit, state}, id) {
        let data = _.cloneDeep(state);
        let formData = new FormData();
        formData.append('people', JSON.stringify(data.people));
        formData.append('step', data.step);
        formData.append('status', data.abstract.status);
        formData.append('removed_people', JSON.stringify(data.removed_people));
        data.people.map((user, key) => {
            if (user.presenter) {
                if (typeof user.avatar === 'object') {
                    formData.append('avatar[' + key + ']', user.avatar);
                }
                if (typeof user.company_logo === 'object') {
                    formData.append('company_logo[' + key + ']', user.company_logo);
                }
            }
        });
        return new Promise((resolve, reject) => {
            axios.post(url.post_admin_abstract_people + id + '/add/people', formData)
                .then(
                    response => {
                        if (response.data.status) {
                            commit('emptyRemovedPeople');
                            commit("setAbstractFormValues", response.data);
                            resolve(response);
                        } else {
                            reject(response)
                        }
                    }
                ).catch(reason => reject(reason));
        });
    },
    /**
     * Fetch data related to the email
     * @param email
     * @returns {Promise<unknown>}
     */
    checkEmail: function ({}, email) {
        return new Promise((resolve, reject) => {
            axios.get(url.get_user_email + email)
                .then(
                    response => {
                        if (response.data.status) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }
                ).catch(reason => reject(reason));
        });
    },
    /**
     * Update user profile
     * @param form
     * @param commit
     * @returns {Promise<unknown>}
     */
    updateProfile: function ({commit}, form) {
        let formData = new FormData();
        if (typeof form.avatar === 'object') {
            formData.append('avatar', form.avatar);
        }
        if (typeof form.company_logo === 'object') {
            formData.append('company_logo', form.company_logo);
        }
        formData.append('user', JSON.stringify(form));
        return new Promise((resolve, reject) => {
            axios.post(url.post_profile, formData)
                .then(
                    response => {
                        if (response.data.status) {
                            commit('setUser', response.data.user);
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }
                ).catch(reason => reject(reason));
        });
    },
    /**
     * Final submit of the abstract form
     * @param state
     * @returns {Promise<unknown>}
     */
    finalAbstractSubmit: function ({state}) {
        return new Promise((resolve, reject) => {
            let data = {id: state.id};
            axios.post(url.post_abstract_final_submit, data)
                .then(
                    response => {
                        if (response.data.status) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }
                ).catch(reason => reject(reason));
        })
    },
    adminFinalAbstractSubmit: function ({state}) {
        return new Promise((resolve, reject) => {
            let data = {id: state.id};
            axios.post(url.post_abstract_final_submit, data)
                .then(
                    response => {
                        if (response.data.status) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }
                ).catch(reason => reject(reason));
        })
    },
    /**
     * Request for editing the abstract
     * @param commit
     * @param id
     * @returns {Promise<unknown>}
     */
    requestAbstractEdit: function ({commit}, id) {
        return new Promise((resolve, reject) => {
            axios.get(url.request_abstract_edit + id + '/edit-request')
                .then(
                    response => {
                        if (response.data.status) {
                            commit("setAbstractFormValues", response.data.abstract);
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
     * Response to the request to edit the abstract
     * @param commit
     * @param data
     * @returns {Promise<unknown>}
     */
    changeAbstractStatus: function ({commit}, data) {
        return new Promise((resolve, reject) => {
            axios.post(url.post_change_abstract_status, data)
                .then(
                    response => {
                        if (response.data.status) {
                            commit("setAbstractFormValues", response.data.abstract);
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
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
