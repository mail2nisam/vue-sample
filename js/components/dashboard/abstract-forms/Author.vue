<template>
    <div class="container">
        <header class="content-header">
            <h2>Author / Presenter</h2>
            <div class="right-side control-box">
                <a href="" class="btn-default" @click.prevent.stop="addUserToList" v-if="!isAlreadyAdded">Add me as
                    author /
                    presenter</a>
                <a href="" class="btn-primary" @click.prevent.stop="openSidePanel">Add author or presenter</a>
            </div>
        </header>
        <!-- contents -->
        <section class="contents" v-if="abstractUsers.length>0">
            <div class="card-holder-wrap">
                <!-- single card -->
                <template v-for="(people,index) in abstractUsers">
                    <user-card :people="people" :key="index" :index="index"/>
                </template>
            </div>
        </section>
        <section v-else>
            <p>Add authors and presenters</p>
        </section>

        <!-- footer -->
        <footer class="content-footer">
            <div class="nav-controls">
                <a href="" class="nav-prev" @click.prevent="previous">Previous</a>
                <a href="" class="nav-next" @click.prevent="draft">Save as draft</a>
            </div>
            <a href="" class="btn-secondary" @click.prevent="next">Next</a>
        </footer>
    </div>
</template>

<script>
    import validate from "../../../mixins/validate";
    import UserCard from "./UserCard";

    export default {
        name: "Author",
        mixins: [validate],
        data: () => {
            return {
                root: document.location.origin,
            }
        },
        components: {UserCard},
        computed: {
            /**
             * Current user
             */
            user: function () {
                return this.$store.state.auth.user;
            },
            /**
             * Get all the users in the abstract
             * @returns {*}
             */
            abstractUsers: function () {
                return this.$store.state.form.people;
            },
            /**
             * Check if the current user already added as presenter or author
             * @returns {boolean}
             */
            isAlreadyAdded: function () {
                let users = _.cloneDeep(this.abstractUsers);
                return !!users.find(u => u.id === this.user.id);
            },
            /**
             * Count of type of users
             */
            userCount: function () {
                let people = this.abstractUsers;
                return {
                    'author': people.filter(p => p.author).length || 0,
                    'presenter': people.filter(p => p.presenter).length || 0,
                    'co_author': people.filter(p => p.co_author).length || 0,
                };
            }
        },
        beforeMount() {
            this.$store.dispatch("fetchUser");
        },
        methods: {
            /**
             * Navigate to next step
             */
            previous: function () {
                this.$router.push({name: 'edit-abstract', params: {id: this.$route.params.id}});
            },
            /**
             * Navigate to the preview section
             * Allow next navigation if author and presenter are added
             */
            next: function () {
                let count = this.userCount;
                let errorMessage = null;

                if (count.presenter <= 0 && count.author <= 0) {
                    errorMessage = "There must be at least one author and presenter";
                } else if (count.presenter <= 0) {
                    errorMessage = "There must be at least one presenter";
                } else if (count.author <= 0) {
                    errorMessage = "There must be at least one author";
                } else if (count.presenter > 3) {
                    errorMessage = "Cannot add more than three presenters";
                }
                if (errorMessage) {
                    this.$notify({
                        group: 'foo',
                        title: 'Error!',
                        type: 'error',
                        text: errorMessage
                    });
                } else {
                    this.$store.commit("setStatus", 'Draft');
                    this.$store.commit('setStep', 3);
                    this.$store.commit("setLoader", true);
                    this.$store.dispatch("addPeople", this.$route.params.id)
                        .then(
                            response => {
                                this.$router.push({name: 'preview', params: {id: this.$route.params.id}});
                                this.$store.commit("setLoader", false);
                            },
                            error => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Error',
                                    type: 'error',
                                    text: 'Something went wrong!'
                                });
                                this.$store.commit("setLoader", false);
                            }
                        );
                }
            },
            openSidePanel: function () {
                this.$store.commit("setSidePanelStatus", true);
            },
            /**
             * Set the current user into the list of people
             * Open the side panel with filled data
             */
            addUserToList: function () {
                this.$store.commit("setSidePanelStatus", true);
                this.$store.commit("setFullWithUser", true);
            },
            /**
             * Save data to server as draft
             */
            draft: function () {
                this.$store.commit("setStatus", 'Draft');
                this.$store.commit('setStep', 2);
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
    .author-list {
        padding-right: 10px;
    }

    @media (max-width: 991px) {
        .padding-10 {
            padding-right: 0;
            padding-left: 0;
        }
    }

    .card.card-square {
        border-radius: 0;
        margin-bottom: 10px;
    }

</style>
