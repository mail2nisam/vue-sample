<template>
    <transition name="modal">
        <div class="modal-mask" v-if="removeData.type==='submit'">
            <div class="modal-wrapper">
                <div class="modal-container confirm-modal-container" v-outside-click="closeConfirm">
                    <div class="modal-header">
                        <h4>Confirm</h4>
                    </div>
                    <div class="modal-body">
                        <p>The Abstract cannot be updated or removed once submitted.</p>
                        <button @click.stop="closeConfirm" class="btn-primary btn-cancel">Cancel</button>
                        <button @click.stop="draft" class="btn-primary">Save as Draft</button>
                        <button @click.stop="submit" class="btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-mask" v-else>
            <div class="modal-wrapper">
                <div class="modal-container" v-outside-click="closeConfirm">
                    <div class="modal-header">
                        <h4> Are you sure?</h4>
                    </div>
                    <div class="modal-body">
                        <p> It will permanently deleted !</p>
                        <button @click.stop="closeConfirm" class="btn-primary">Cancel</button>
                        <button @click.stop="deleteItem" class="btn-primary btn-delete">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Confirmation",
        directives: {
            outsideClick: {
                bind: function (el, binding, vnode) {
                    el.clickOutsideEvent = function (event) {
                        // here I check that click was outside the el and his children
                        if (!(el === event.target || el.contains(event.target))) {
                            // and if it did, call method provided in attribute value
                            vnode.context[binding.expression](event);
                        }
                    };
                    document.body.addEventListener('click', el.clickOutsideEvent);
                },
                unbind: function (el) {
                    document.body.removeEventListener('click', el.clickOutsideEvent);
                },
            }
        },
        computed: {
            removeData: function () {
                return this.$store.state.form.remove;
            },
            confirmStatus: function () {
                return this.$store.state.sidePanel.confirm;
            }
        },
        methods: {
            closeConfirm: function () {
                if (this.confirmStatus) {
                    this.$store.commit("setConfirm", false);
                }
            },
            deleteItem: function () {
                let type = this.removeData.type;
                let id = this.removeData.id;
                switch (type) {
                    case 'abstract':
                        this.$store.dispatch("deleteAbstract", id);
                        break;
                    case 'people':
                        this.$store.commit("removePerson", id);
                        break;
                }
                this.$store.commit("setConfirm", false);
                this.$store.commit("setRemoveData", {});
            },
            submit: function () {
                this.closeConfirm();
                this.$store.commit("setLoader", true);
                this.$store.dispatch("finalAbstractSubmit")
                    .then(
                        response => {
                            this.$store.commit("setLoader", false);
                            this.$notify({
                                group: 'foo',
                                title: 'Success',
                                type: 'success',
                                text: 'Abstract is submitted successfully'
                            });
                            this.$router.push({name: 'abstracts'});
                        },
                        error => {
                            this.$store.commit("setLoader", false);
                            this.$notify({
                                group: 'foo',
                                title: 'Error!',
                                type: 'error',
                                text: 'Something went wrong!'
                            });
                        }
                    )
            },
            draft: function () {
                this.closeConfirm();
                this.$store.commit("setStatus", 'Draft');
                this.$store.commit('setStep', 3);
                this.$store.commit('setLoader', true);
                this.$store.dispatch("addPeople", this.$route.params.id)
                    .then(
                        response => {
                            this.$notify({
                                group: 'foo',
                                title: 'Success',
                                type: 'success',
                                text: 'Form is submitted as draft'
                            });
                            setTimeout(() => {
                                this.$store.commit('setLoader', false);
                            }, 500);
                        },
                        error => {
                            setTimeout(() => {
                                this.$store.commit('setLoader', false);
                            }, 500);
                            this.$notify({
                                group: 'foo',
                                title: 'Error',
                                type: 'error',
                                text: 'Something went wrong!'
                            });
                        }
                    );
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    .confirm-modal-container {
        width: 425px;
    }
</style>
