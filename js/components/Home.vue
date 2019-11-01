<template>
    <div class="main-wrapper">
        <!--nav button for small windowa-->
        <header class="mobile-header">
            <div class="container">
                <div class="hamburger hamburger--spring" @click.stop="isOpen=true">
                    <div class="hamburger-box">
                        <div class="hamburger-inner"></div>
                    </div>
                </div>
                <div class="logo-holder">
                    <a href="#" aria-label="Gastech logo">
                        <img src="./../../images/gastech-logo.jpg" alt="Gastech Abstracts">
                    </a>
                </div>
            </div>
        </header>
        <!--nav bar-->
        <nav-bar :open="isOpen" v-outside-click="closeNav"></nav-bar>
        <article class="main-contents-wrap">
            <router-view/>
        </article>
        <side-panel/>
        <modal v-show="modal"/>
        <confirmation v-show="confirm"/>
    </div>
</template>

<script>
    import NavBar from "./common/NavBar";
    import SidePanel from "./common/SidePanel";
    import Modal from "./common/Modal";
    import Confirmation from "./common/Confirmation";
    import FilterPanel from "./common/FilterPanel";

    export default {
        name: "Home",
        components: {FilterPanel, Confirmation, Modal, SidePanel, NavBar},
        data: () => {
            return {
                toggleStatus: false,
                isOpen: false
            }
        },
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
            /**
             * Get the user data from the store
             */
            user: function () {
                return this.$store.state.auth.user;
            },
            sidePanelStatus: function () {
                return this.$store.state.sidePanel.status;
            },
            modal: function () {
                return this.$store.state.sidePanel.modal;
            },
            confirm: function () {
                return this.$store.state.sidePanel.confirm;
            }
        },
        beforeMount() {
            // get the current user data before mounting the component
            this.getUser();
        },
        mounted() {
            this.showRegisterNotification();
        },
        methods: {
            /**
             * Check if the user already in the store and fetch if not
             */
            getUser: function () {
                if (_.isEmpty(this.user)) {
                    this.$store.dispatch("fetchUser")
                        .then(
                            response => {
                                // redirect to paths if reloading from home component only
                                if (this.$route.name === 'home') {
                                    // if the user is admins
                                    if (response.data.role === "Admin") {
                                        this.$router.push({
                                            name: 'admin-abstracts'
                                        });
                                    } else {
                                        this.$router.push({
                                            name: 'abstracts'
                                        });
                                    }
                                }
                            }
                        );
                }
            },
            closeNav: function () {
                this.isOpen = false;
            },
            closeSidePanel: function () {
                if (this.sidePanelStatus) {
                    this.$store.commit("setSidePanelStatus", false);
                    this.$store.commit("setFullWithUser", false);
                }
            },
            showRegisterNotification: function () {
                if (this.$route.query.register && parseInt(this.$route.query.register) === 1) {
                    this.$notify({
                        group: 'foo',
                        title: 'Registration successful',
                        type: 'success',
                        text: "You have successfully registered with Gastech-CFP portal"
                    });
                    let query = Object.assign({}, this.$route.query);
                    delete query.register;
                    this.$router.replace({query});
                }
            }
        },
        watch: {
            $route: function () {
                this.closeSidePanel();
            }
        }
    }
</script>

<style scoped>
</style>
