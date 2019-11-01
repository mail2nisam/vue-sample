<template>
    <div class="container container-small block-second">
        <div class="box-white">
            <header class="content-header box-item with-icons">
                <h2><span>Abstract</span>
                    <button class="btn-export" @click="exportData" v-if="$store.getters.isAdmin"><i
                        class="icon-export"></i></button>
                </h2>
                <div class="right-side control-box" v-if="$route.name==='preview' || $route.name==='admin-preview'">
                    <a href="" class="edit-btn btn-with-bg" @click.prevent="editAbstract"><i class="icon-edit"></i>Edit</a>
                </div>
                <div v-else-if="abstract.edit_requested && !this.$store.getters.isAdmin">
                    <a href="" class="edit-btn btn-with-bg" @click.prevent.stop>Edit Request Sent</a>
                </div>
                <div v-else-if="!abstract.edit_requested && abstract.submitter_id===this.$store.getters.user.id">
                    <a href="" class="edit-btn btn-with-bg" @click.prevent="sendEditRequest">
                        <i class="icon-edit"></i>Request Edit</a>
                </div>
                <div v-else-if="this.$store.getters.isAdmin">
                    <a href="" class="edit-btn btn-with-bg" @click.prevent="editAbstract">
                        <i class="icon-edit"></i>Edit</a>
                </div>
            </header>
            <!-- box item -->
            <div class="box-item">
                <!-- top content -->
                <div class="top-section">
                    <div class="section-left">
                        <h5>Status</h5>
                    </div>
                    <div class="section-right">
                        <p v-if="abstract.stream">{{abstract.status}}</p>
                        <p v-if="$store.getters.isAdmin"><a href=""
                                                            @click.prevent.stop="changeAbstractStatus">Change</a></p>
                    </div>
                </div>
            </div>
            <div class="box-item">
                <!-- top content -->
                <div class="top-section">
                    <div class="section-left">
                        <h5>Title</h5>
                    </div>
                    <div class="section-right">
                        <p v-if="abstract.title">{{abstract.title}}</p>
                    </div>
                </div>
            </div>
            <div class="box-item">
                <!-- top content -->
                <div class="top-section">
                    <div class="section-left">
                        <h5>Stream</h5>
                    </div>
                    <div class="section-right">
                        <p v-if="abstract.stream">{{abstract.stream}}</p>
                    </div>
                </div>
            </div>
            <!-- box item -->
            <div class="box-item">
                <!-- top content -->
                <div class="top-section">
                    <div class="section-left">
                        <h5>Topic</h5>
                    </div>
                    <div class="section-right">
                        <p v-if="abstract.topic==='Other'">{{abstract.topic_other||''}}</p>
                        <p v-else>{{abstract.topic||''}}</p>
                    </div>
                </div>
            </div>
            <!-- box item -->
            <div class="box-item">
                <!-- top content -->
                <div class="top-section">
                    <div class="section-left">
                        <h5>Abstract</h5>
                    </div>

                </div>
                <!-- bottom content -->
                <div class="bottom-section">
                    <p v-if="abstract.abstract">{{abstract.abstract}}</p>
                </div>
            </div>

            <!-- box item -->
            <div class="box-item">
                <!-- top content -->
                <div class="top-section">
                    <div class="section-left">
                        <h5>Permissions</h5>
                    </div>
                    <div class="section-right">
                        <p v-if="parseInt(abstract.company_permission)">Yes</p>
                        <p v-else>No</p>
                    </div>
                </div>
                <!-- bottom content -->
                <div class="bottom-section bg-grey" v-if="abstract.company_permission_details">
                    <p>{{abstract.company_permission_details}}</p>
                </div>
            </div>

            <!-- box item -->
            <div class="box-item">
                <!-- top content -->
                <div class="top-section">
                    <div class="section-left">
                        <h5>Submitted Elsewhere?</h5>
                    </div>
                    <div class="section-right">
                        <p v-if="parseInt(abstract.submitted_else)">Yes</p>
                        <p v-else>No</p>
                    </div>
                </div>
                <div class="bottom-section bg-grey" v-if="abstract.submitted_else_details">
                    <p>{{abstract.submitted_else_details}}</p>
                </div>
            </div>
            <!-- box item -->
            <div class="box-item">
                <!-- top content -->
                <div class="top-section">
                    <div class="section-left">
                        <h5>Previously published ?</h5>
                    </div>
                    <div class="section-right">
                        <p v-if="parseInt(abstract.previously_published)">Yes</p>
                        <p v-else>No</p>
                    </div>
                </div>
                <div class="bottom-section bg-grey" v-if="abstract.previously_published_details">
                    <p>{{abstract.previously_published_details}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AbstractPreview",
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
             * Show page for editing the abstract
             */
            editAbstract: function () {
                if (this.$store.getters.isAdmin) {
                    this.$router.push({name: 'admin-edit-abstract', params: {id: this.$route.params.id}});
                } else {
                    this.$router.push({name: 'edit-abstract', params: {id: this.$route.params.id}});
                }
            },
            /**
             * Request admin for edit permission if already submitted
             */
            sendEditRequest: function () {
                this.$store.commit("setLoader", true);
                this.$store.dispatch("requestAbstractEdit", this.$route.params.id)
                    .then(() => this.$store.commit("setLoader", false))
                    .catch(() => this.$store.commit("setLoader", false))
            },
            /**
             * Change status of the abstract
             * Only admin can perform this.
             * Will show confirmation page if all fields are valid
             */
            changeAbstractStatus: function () {
                if (this.abstract.status === 'Submitted' || (this.abstract.status === 'Draft' && this.isValid())) {
                    this.$store.commit("setConfirm", true);
                    this.$store.commit("setRemoveData", {type: this.abstract.status.toLowerCase(), id: null});
                }
            },
            /**
             * Check if the abstract data is valid for submitting
             */
            isValid: function () {
                let isValidAbstract = this.isValidAbstract();
                let isValidUserCount = this.isValidUserCount();
                if (!isValidAbstract) {
                    this.$notify({
                        group: 'foo',
                        title: 'Error',
                        type: 'error',
                        text: 'Some fields are missing in the abstract form. Please complete the form to submit!'
                    });
                } else if (!isValidUserCount) {
                    this.$notify({
                        group: 'foo',
                        title: 'Error',
                        type: 'error',
                        text: 'Please add authors and presenters to submit the abstract'
                    });
                }
                return isValidAbstract && isValidUserCount;
            },
            /**
             * Check if the abstract form is valid
             */
            isValidAbstract: function () {
                let isValid = true;
                // check if the abstract is valid
                if (!this.abstract.stream) {
                    isValid = false;
                }
                if (!this.abstract.topic) {
                    isValid = false;
                }
                if (this.abstract.topic === 'Other' && !this.abstract.topic_other) {
                    isValid = false;
                }
                if (!this.abstract.title || this.abstract.title.split(" ").length > 50) {
                    isValid = false;
                }
                if (!this.abstract.abstract || this.abstract.abstract.split(" ").length > 500) {
                    isValid = false;
                }
                if (this.abstract.company_permission === 'null') {
                    isValid = false;
                }
                if (this.abstract.submitted_else === 'null') {
                    isValid = false;
                }
                if (this.abstract.previously_published === 'null') {
                    isValid = false;
                }
                return isValid;
            },
            /**
             * Check if the abstract user count is valid
             */
            isValidUserCount: function () {
                let count = this.userCount;
                let isValid = true;

                if (count.presenter <= 0 && count.author <= 0) {
                    isValid = false;
                } else if (count.presenter <= 0) {
                    isValid = false;
                } else if (count.author <= 0) {
                    isValid = false;
                } else if (count.presenter > 3) {
                    isValid = false;
                }
                return isValid;
            },
            exportData: function () {
                this.$store.dispatch("exportAbstracts", [this.$route.params.id]);
            }
        }
    }
</script>

<style scoped>

</style>
