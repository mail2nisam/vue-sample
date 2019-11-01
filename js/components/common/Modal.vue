<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container abstract-preview" v-outside-click="closeModal">
                    <i class="icon-close" @click="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 51.976 51.976">
                            <path
                                d="M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z"/>
                        </svg>
                    </i>
                    <abstract-preview></abstract-preview>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import AbstractPreview from "./AbstractPreview";
    import UserCard from "../dashboard/abstract-forms/UserCard";

    export default {
        name: "Modal",
        components: {UserCard, AbstractPreview},
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
            people: function () {
                return this.$store.state.form.people;
            },
            modalStatus: function () {
                return this.$store.state.sidePanel.modal;
            }
        },
        methods: {
            /**
             * Close modal if open
             */
            closeModal: function () {
                if (this.modalStatus) {
                    this.$store.commit("setModal", false);
                }
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

    .abstract-preview {
        width: 737.99px;
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
</style>
