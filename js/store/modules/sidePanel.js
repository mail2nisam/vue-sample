const state = {
    status: false,
    fillWithUser: false,
    editUser: null,
    loader: false,
    modal: false,
    confirm: false,
    isPresenter: false
};
const mutations = {
    setSidePanelStatus: (state, value) => state.status = value,
    setFullWithUser: (state, value) => state.fillWithUser = value,
    setEditUser: (state, value) => state.editUser = value,
    setLoader: (state, value) => state.loader = value,
    setModal: (state, value) => state.modal = value,
    setConfirm: (state, value) => state.confirm = value,
    setIsPresenter: (state, value) => state.isPresenter = value
};
const actions = {};
export default {
    state,
    mutations,
    actions
}
