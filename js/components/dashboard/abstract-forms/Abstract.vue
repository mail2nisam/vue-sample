<template>
    <div class="container container-small">
        <div class="box-white">
            <header class="content-header box-item">
                <h2>Abstract Details</h2>
            </header>

            <div class="form-container">
                <form class="square-input-form">
                    <div class="form-group">
                        <label for="stream" class="form-label">Please select the stream that your submission belongs
                            to <span class="required">*</span></label>
                        <select class="custom-select" :class="{'error-border':errors.stream}" id="stream"
                                v-model="stream">
                            <option value="Strategic">Strategic</option>
                            <option value="Technical">Technical</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="topic" class="form-label">Please select the topic that your abstract
                            best
                            belongs to <span class="required">*</span></label>
                        <select class="custom-select" id="topic" v-model="topic" :class="{'error-border':errors.topic}">

                            <template v-for="topic in topics">
                                <!--                                <optgroup v-if="typeof topic ==='object'" :label="topic.label">-->
                                <!--                                    <option v-for="option in topic.options" :value="option">{{option}}</option>-->
                                <!--                                </optgroup>-->
                                <!--                                <option v-else :value="topic">{{topic}}</option>-->
                                <option class="optionGroup" :value="topic.label" v-if="typeof topic ==='object'">
                                    {{topic.label}}
                                </option>
                                <option class="optionChild" v-for="option in topic.options" :value="option" disabled>
                                    {{option}}
                                </option>
                                <option :value="topic" class="optionGroup" v-if="typeof topic !=='object'">{{topic}}
                                </option>
                            </template>
                        </select>
                    </div>


                    <!--show when other choosed-->
                    <div class="form-group" v-if="topic && topic==='Other'">
                        <label for="topic_other" class="form-label">Please nominate a new track name that better
                            represents the area your submission is linked to <span class="required">*</span></label>
                        <input type="text" class="form-control" id="topic_other" v-model="topic_other"
                               :class="{'error-border':errors.topic_other}">
                    </div>


                    <div class="form-group">
                        <label for="title" class="form-label">Please enter the title of your abstract in 50 words or
                            less
                            <span class="required">*</span></label>
                        <input type="text" class="form-control" id="title" v-model="title"
                               :class="{'error-border':errors.title}">
                    </div>


                    <div class="form-group">
                        <label for="abstract" class="form-label">Please enter your abstract in 500 words or
                            less <span class="required">*</span></label>
                        <textarea class="form-control" id="abstract" rows="6"
                                  v-model="abstract" :class="{'error-border':errors.abstract}"></textarea>
                        <small id="passwordHelpBlock" class="form-text text-muted">
                            Note that the proposals must not exceed 500 words. If the abstract is selected, the
                            information submitted in this form will be used on the Gastech exhibition and conference
                            website and corresponding printed materials associated with the conference. Gastech will
                            communicate with the main contact person on all occasions.
                        </small>
                    </div>


                    <div class="form-group">
                        <label class="form-label">Have you received permission from your company/educational institute
                            to submit and present this abstract at Gastech Conference? <span
                                class="required">*</span></label>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="company_permission_yes" v-model="company_permission"
                                   value="1" class="custom-control-input">
                            <label class="custom-control-label" for="company_permission_yes">Yes</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="company_permission_no" v-model="company_permission"
                                   value="0" class="custom-control-input">
                            <label class="custom-control-label" for="company_permission_no">No</label>
                        </div>
                        <p class="radio-error-text" v-if="errors.company_permission">Please select an option</p>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Is this material being submitted elsewhere? <span
                            class="required">*</span></label>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="submitted_else_yes" v-model="submitted_else"
                                   value="1" class="custom-control-input">
                            <label class="custom-control-label" for="submitted_else_yes">Yes</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="submitted_else_no" v-model="submitted_else"
                                   value="0" class="custom-control-input">
                            <label class="custom-control-label" for="submitted_else_no">No</label>
                        </div>
                        <p class="radio-error-text" v-if="errors.submitted_else">Please select an option</p>
                    </div>


                    <div class="form-group">
                        <label for="submitted_else_details">If you selected Yes to the above, please specify.</label>
                        <input type="text" class="form-control" id="submitted_else_details"
                               v-model="submitted_else_details">
                    </div>


                    <div class="form-group">
                        <label class="form-label">Has this material been previously published or presented before?
                            <span class="required">*</span></label>

                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="previously_published_yes" value="1"
                                   class="custom-control-input" v-model="previously_published">
                            <label class="custom-control-label" for="previously_published_yes">Yes</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="previously_published_no" v-model="previously_published"
                                   value="0" class="custom-control-input">
                            <label class="custom-control-label" for="previously_published_no">No</label>
                        </div>
                        <p class="radio-error-text" v-if="errors.previously_published">Please select an option</p>
                    </div>


                    <div class="form-group">
                        <label for="previously_published_details">If you selected Yes to the above, please
                            specify.</label>
                        <input type="text" class="form-control" id="previously_published_details"
                               v-model="previously_published_details">
                    </div>
                </form>
            </div>
        </div>
        <footer class="content-footer">
            <div class="nav-controls">
                <a href="" class="nav-next" @click.prevent.stop="showPreview">Preview</a>
                <a href="" class="nav-next" @click.prevent="draft">Save as draft</a>
            </div>
            <div>
                <a href="" class="btn-secondary" @click.prevent="next">Next</a>
            </div>
        </footer>
    </div>
</template>

<script>
    import validate from "../../../mixins/validate";
    import topics from "../../../settings/topics";

    export default {
        name: "Abstract",
        mixins: [validate],
        data: () => {
            return {
                errors: {
                    stream: false,
                    topic: false,
                    topic_other: false,
                    title: false,
                    abstract: false,
                    company_permission: false,
                    submitted_else: false,
                    previously_published: false,
                },
                errorMessages: [],
                topicList: topics
            }
        },
        computed: {
            topics: function () {
                return this.stream ? this.topicList[this.stream.toLowerCase()] : []
            },
            /**
             * Bind the model with store
             */
            submitter_id: {
                get: function () {
                    return this.$store.state.form.abstract.submitter_id;
                },
                set: function (value) {
                    this.$store.commit('setSubmitterId', value);
                }
            },
            stream: {
                get: function () {
                    return this.$store.state.form.abstract.stream;
                },
                set: function (value) {
                    this.$store.commit('setStream', value);
                }
            },
            topic: {
                get: function () {
                    return this.$store.state.form.abstract.topic;
                },
                set: function (value) {
                    this.$store.commit('setTopic', value);
                }
            },
            topic_other: {
                get: function () {
                    return this.$store.state.form.abstract.topic_other;
                },
                set: function (value) {
                    this.$store.commit('setTopicOther', value);
                }
            },
            title: {
                get: function () {
                    return this.$store.state.form.abstract.title;
                },
                set: function (value) {
                    this.$store.commit('setTitle', value);
                }
            },
            abstract: {
                get: function () {
                    return this.$store.state.form.abstract.abstract;
                },
                set: function (value) {
                    this.$store.commit('setAbstract', value);
                }
            },
            company_permission: {
                get: function () {
                    return this.$store.state.form.abstract.company_permission + '';
                },
                set: function (value) {
                    this.$store.commit('setCompanyPermission', value);
                }
            },
            company_permission_details: {
                get: function () {
                    return this.$store.state.form.abstract.company_permission_details;
                },
                set: function (value) {
                    this.$store.commit('setCompanyPermissionDetails', value);
                }
            },
            submitted_else: {
                get: function () {
                    return this.$store.state.form.abstract.submitted_else + '';
                },
                set: function (value) {
                    this.$store.commit('setSubmittedElse', value);
                }
            },
            submitted_else_details: {
                get: function () {
                    return this.$store.state.form.abstract.submitted_else_details;
                },
                set: function (value) {
                    this.$store.commit('setSubmittedElseDetails', value);
                }
            },
            previously_published: {
                get: function () {
                    return this.$store.state.form.abstract.previously_published + '';
                },
                set: function (value) {
                    this.$store.commit('setPreviouslyPublished', value);
                }
            },
            previously_published_details: {
                get: function () {
                    return this.$store.state.form.abstract.previously_published_details;
                },
                set: function (value) {
                    this.$store.commit('setPreviouslyPublishedDetails', value);
                }
            },
            formId: function () {
                return this.$store.state.form.id;
            }
        },
        methods: {
            /**
             * Show preview of current form data
             */
            showPreview: function () {
                this.$store.commit("setModal", true);
            },
            /**
             * Save the data as draft
             * No need to check validation
             */
            draft: function () {
                if (this.isValidDraft()) {
                    this.sendDraftToServer();
                } else {
                    this.showValidationMessage();
                }
            },
            /**
             * Check if the fields are valid on submitting as draft
             */
            isValidDraft: function () {
                let isValid = true;
                this.errors = {
                    stream: false,
                    topic: false,
                    title: false,
                    abstract: false,
                };
                this.errorMessages = [];
                if (!this.isValidField(this.title) || this.title.split(" ").length > 50) {
                    if (!this.title) {
                        this.errorMessages.push('Please enter the title');
                    } else {
                        this.errorMessages.push('Title cannot have more than 50 words');
                    }
                    this.errors.title = true;
                    isValid = false;
                }
                // abstract cannot be more than 500 words if added
                if (this.isValidField(this.abstract) && this.abstract.split(" ").length > 500) {
                    this.errorMessages.push('Abstract cannot have more than 500 words');
                    this.errors.abstract = true;
                    isValid = false;
                }
                return isValid;
            },
            /**
             * Save the current data and go to next step
             * Check validation
             */
            next: function () {
                this.$store.commit("setStep", 2);
                this.$store.commit("setStatus", 'Draft');
                if (this.isValid()) {
                    this.sendFormDataToServer();
                } else {
                    this.showValidationMessage();
                }
            },
            /**
             * Check if the abstract form data is valid
             */
            isValid: function () {
                let isValid = true;
                this.errors = {
                    stream: false,
                    topic: false,
                    topic_other: false,
                    title: false,
                    abstract: false,
                    company_permission: false,
                    submitted_else: false,
                    previously_published: false,
                };
                this.errorMessages = [];
                if (!this.isValidField(this.stream)) {
                    this.errorMessages.push('Please select the stream');
                    this.errors.stream = true;
                    isValid = false;
                }
                if (!this.isValidField(this.topic)) {
                    this.errorMessages.push('Please select the topic');
                    this.errors.topic = true;
                    isValid = false;
                }
                if (this.topic === 'Other' && !this.isValidField(this.topic_other)) {
                    this.errorMessages.push('Please enter a new topic');
                    this.errors.topic_other = true;
                    isValid = false;
                }
                if (!this.isValidField(this.title) || this.title.split(" ").length > 50) {
                    if (!this.title) {
                        this.errorMessages.push('Please enter the title');
                    } else {
                        this.errorMessages.push('Title cannot have more than 50 words');
                    }
                    this.errors.title = true;
                    isValid = false;
                }

                if (!this.isValidField(this.abstract) || this.abstract.split(" ").length > 500) {
                    if (!this.abstract) {
                        this.errorMessages.push('Please enter the abstract');
                    } else {
                        this.errorMessages.push('Abstract cannot have more than 500 words');
                    }
                    this.errors.abstract = true;
                    isValid = false;
                }

                if (this.company_permission === 'null') {
                    this.errorMessages.push('Please select the company permission option');
                    this.errors.company_permission = true;
                    isValid = false;
                }
                if (this.submitted_else === 'null') {
                    this.errorMessages.push('Please select the submitted elsewhere');
                    this.errors.submitted_else = true;
                    isValid = false;
                }
                if (this.previously_published === 'null') {
                    this.errorMessages.push('Please select the presented before');
                    this.errors.previously_published = true;
                    isValid = false;
                }
                return isValid;
            },
            /**
             * Pop the first message in the list and show as notification
             */
            showValidationMessage: function () {
                if (this.errorMessages.length > 0) {
                    this.$notify({
                        group: 'foo',
                        title: 'Validation error!',
                        type: 'error',
                        text: this.errorMessages[0]
                    });
                }
            },
            /**
             * Send current data to server after validation check
             * Check the response to redirect to the next page
             */
            sendFormDataToServer: function () {
                // if no form id
                if (!this.formId) {
                    this.$store.commit("setLoader", true);
                    this.$store.dispatch("createFormEntry")
                        .then(
                            response => {
                                this.redirectToNextStep(response.data.abstract_id);
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
                        )
                } else {
                    this.$store.commit("setLoader", true);
                    this.$store.dispatch("updateFormEntry")
                        .then(
                            response => {
                                this.redirectToNextStep(this.formId);
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
            /**
             * Set the next step value
             * Redirect to next step
             */
            redirectToNextStep: function (id) {
                this.$store.commit('setStep', 2);
                this.$router.push({name: 'author', params: {id: id}});
            },
            /**
             * Send form data to server as draft
             */
            sendDraftToServer: function () {
                this.$store.commit("setStatus", 'Draft');
                this.$store.commit('setStep', 1);
                // if no form id
                if (!this.formId) {
                    this.$store.commit("setLoader", true);
                    this.$store.dispatch("createFormEntry")
                        .then(
                            response => {
                                this.$store.commit("setLoader", false);
                                this.$router.push({name: 'edit-abstract', params: {id: response.data.abstract_id}});
                                this.$notify({
                                    group: 'foo',
                                    title: 'Success',
                                    type: 'success',
                                    text: 'Form is submitted as draft'
                                });
                            },
                            error => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Error',
                                    type: 'error',
                                    text: 'Something went wrong!'
                                });
                            }
                        )
                } else {
                    this.$store.commit("setLoader", true);
                    this.$store.dispatch("updateFormEntry")
                        .then(
                            response => {
                                setTimeout(() => {
                                    this.$store.commit("setLoader", false);
                                }, 1000);
                                this.$notify({
                                    group: 'foo',
                                    title: 'Success',
                                    type: 'success',
                                    text: 'Form is submitted as draft'
                                });
                            },
                            error => {
                                this.$store.commit("setLoader", false);
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
        },
        destroyed() {
            this.$store.commit('initFormData');
        }
    }
</script>

<style scoped>
    .error-border {
        border: 1px solid red;
    }

    span.required {
        color: red;
    }

    .radio-error-text {
        color: red;
        font-size: 12px;
    }

    .content-footer {
        border-top: 0;
    }

    .optionGroup {
        font-weight: bold;
        font-style: italic;
    }

    .optionChild {
        padding-left: 15px;
    }
</style>
