<template>
    <div class="abstract_block">

        <abstract-preview/>

        <div class="container container-small block-second">
            <div class="box-white">
                <header class="content-header box-item">
                    <h2>Author / Presenter</h2>
                    <div class="right-side control-box" v-if="$route.name==='admin-preview' || $route.name==='admin-abstract-preview'">
                        <a href="#" class="edit-btn btn-with-bg" @click.prevent="editPeople"><i
                            class="icon-edit"></i>Edit</a>
                    </div>
                </header>
                <div class="box-item">
                    <div class="card-holder-wrap">
                        <template v-for="(person,index) in people">
                            <admin-user-card :people="person" :key="index" :index="index"/>
                        </template>
                    </div>
                </div>
            </div>
            <footer class="content-footer" v-if="$route.name==='admin-preview'">
                <div class="nav-controls">
                    <a href="" class="nav-prev" @click.prevent="previous">Previous</a>
                    <a href="" class="nav-next" @click.prevent="draft">Save as draft</a>
                </div>
                <a href="" class="btn-secondary" @click.prevent.stop="submit">Submit</a>
            </footer>
        </div>

        <abstract-action-box/>
    </div>
</template>

<script>
    import AbstractPreview from "../../common/AbstractPreview";
    import AbstractActionBox from "../../admin/AbstractActionBox";
    import AdminUserCard from "./AdminUserCard";

    export default {
        name: "AdminFinalPreview",
        components: {AdminUserCard, AbstractActionBox, AbstractPreview},
        computed: {
            /**
             * Get all the users in the abstract
             * @returns {*}
             */
            people: function () {
                return this.$store.state.form.people;
            },
            step: function () {
                return this.$store.state.form.step;
            }
        },
        methods: {
            editPeople: function () {
                this.$router.push({name: 'admin-author', params: {id: this.$route.params.id}});
            },
            submit: function () {
                if (this.step < 3) {
                    this.$notify({
                        group: 'foo',
                        title: 'Missing data!',
                        type: 'error',
                        text: 'Please add all details'
                    });
                } else {
                    this.$store.commit("setConfirm", true);
                    this.$store.commit("setRemoveData", {type: 'submit', id: null});
                }
            },
            previous: function () {
                this.$router.push({name: 'admin-author', params: {id: this.$route.params.id}});
            },
            draft: function () {
                this.$store.commit("setStatus", 'Draft');
                this.$store.commit('setStep', 3);
                this.$store.commit('setLoader', true);
                this.$store.dispatch("addAdminPeople", this.$route.params.id)
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
    .content-footer {
        border-top: 0;
    }
    .container.block-second {
        margin-bottom: 30px;
    }
</style>
