<template>
    <div class="container container-small" v-if="abstract.status==='Submitted' && abstract.edit_requested">
        <div class="box-white">
            <header class="content-header box-item">
                <h2>Actions</h2>
            </header>
            <!-- box item -->
            <div class="box-item">
                <!-- top content -->
                <div class="top-section">
                    <div class="section-left">
                        <h5>Submitter requested for editing abstract</h5>
                    </div>
                    <div class="section-right">
                        <button @click.stop="changeStatus('accept')" class="btn-primary btn-action">Accept
                        </button>
                        <button @click.stop="changeStatus('reject')" class="btn-primary btn-delete btn-action">
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import validate from "../../mixins/validate";

    export default {
        name: "AbstractActionBox",
        mixins: [validate],
        computed: {
            abstract: function () {
                return this.$store.state.form.abstract;
            },
            /**
             * Get all the users in the abstract
             * @returns {*}
             */
            abstractUsers: function () {
                return this.$store.state.form.people;
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
        methods: {
            /**
             * Send request to change the current status of the abstract
             */
            changeStatus: function (status) {
                let data = {
                    abstract_id: this.$route.params.id,
                    status: status
                };
                this.$store.commit("setLoader", true);
                this.$store.dispatch("changeAbstractStatus", data)
                    .then(() => {
                        this.$store.commit("setLoader", false);
                        this.$notify({
                            group: 'foo',
                            title: 'Success',
                            type: 'success',
                            text: 'Abstract status changed successfully.'
                        });
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            title: 'Error',
                            type: 'error',
                            text: 'Something went wrong!'
                        });
                        this.$store.commit("setLoader", false)
                    })
            }
        }
    }
</script>

<style scoped>
    .btn-action.btn-primary {
        padding: 6px 17px;
        font-size: 12px;
    }
</style>
