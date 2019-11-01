import url from "../../settings/url";

const state = {
    status: false,
    keys: {
        page: 1,
        search: null,
        sort: {
            // created_at: "asc"
        },
        filter: {},
        page_row_count: 10
    }
};
const mutations = {
    setFilterPanelStatus: (state, value) => state.status = value,
    setPage: (state, page) => state.keys.page = page,
    setSearch: (state, search) => state.keys.search = search,
    setPageRowCount: (state, value) => state.keys.page_row_count = value,
    /**
     * Set sort value to state
     * if no sort applied to the given key, then assign asc
     * if asc then desc
     * if desc then clear the sort
     * @param state
     * @param key
     */
    setSort: (state, key) => {
        let sort = _.cloneDeep(state.keys.sort);
        if (typeof sort[key] === 'undefined') {
            sort[key] = 'asc';
        } else if (sort[key] === 'asc') {
            sort[key] = 'desc';
        } else {
            delete sort[key];
        }
        state.keys.sort = sort;
    },
    /**
     * Directly assign all the filter values into store
     * Using when reload and fetch filter data fetching from url
     * @param state
     * @param filter
     * @returns {*}
     */
    setFilter: (state, filter) => state.keys.filter = filter,
};
const actions = {
    exportAbstracts: function ({state}, data) {
        return new Promise((resolve, reject) => {
            axios.post(url.post_admin_export_table, {ids: data}, {
                responseType: 'blob'
            }).then(
                response => {
                    let disposition = response.headers['content-disposition'];
                    let filename = "";
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        let matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) {
                            filename = matches[1].replace(/['"]/g, '');
                        }
                    }
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    resolve(response);
                },
                error => {
                    reject(error)
                }
            );
        });
    }
};
export default {
    state,
    mutations,
    actions
}
