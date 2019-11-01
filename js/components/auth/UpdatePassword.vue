<template>
    <main>
        <div class="main-wrapper aligned-middle">
            <article class="main-contents-wrap">
                <div class="container container-small">
                    <div class="box-white">

                        <div class="centered-content">
                            <div class="login-content">
                                <div class="logo-wrap">
                                    <a @click.stop><img src="../../../images/gastech-logo.jpg" alt="Gastech"></a>
                                </div>
                                <header class="content-header box-item">
                                    <h2>Change Password</h2>
                                </header>
                                <form class="content_form clearfix">

                                    <div class="form-group">
                                        <label for="password" class="form-label">Password</label>
                                        <div class="form-element">
                                            <input id="password" type="password" class="form-control"
                                                   :class="{'error-border':errors.password}" v-model="form.password">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="password" class="form-label">Confirm password</label>
                                        <div class="form-element">
                                            <input id="password_confirmation" type="password"
                                                   class="form-control"
                                                   :class="{'error-border':errors.password_confirmation}"
                                                   v-model="form.password_confirmation">
                                        </div>
                                    </div>

                                    <div class="vertically-aligned form-row">

                                        <div class="form-group half-width"></div>

                                        <div class="form-group half-width text-right">
                                            <div class="form-element">
                                                <button class="btn-primary" v-if="valid" @click.prevent="submit">Change
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </main>
</template>

<script>
    import validate from "../../mixins/validate";

    export default {
        name: "UpdatePassword",
        mixins: [validate],
        data: () => {
            return {
                form: {
                    password: null,
                    password_confirmation: null,
                    token: null
                },
                errors: {
                    password: false,
                    password_confirmation: false,
                },
                errorMessages: [],
                valid: false,
                data: {}
            }
        },
        created() {
            this.handleToken()
        },
        methods: {
            handleToken: function () {
                let route = this.$route;
                if (route.query && route.query.token) {
                    this.$store.commit("setLoader", true);
                    this.data = {token: route.query.token};
                    this.$store.dispatch("verifyToken", this.data)
                        .then(
                            response => {
                                this.valid = !!response.data.status;
                                this.$store.commit("setLoader", false);
                                if (!response.data.status) {
                                    this.$notify({
                                        group: 'foo',
                                        title: 'Error!',
                                        type: 'error',
                                        text: 'This URL is expired!'
                                    });
                                }
                            }
                        )
                        .catch(
                            reason => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Error!',
                                    type: 'error',
                                    text: 'Something went wrong!'
                                });
                                this.$store.commit("setLoader", false);
                            }
                        );
                }
            },
            isValid: function () {
                let isValid = true;
                this.errors = {
                    password: false,
                    password_confirmation: false,
                };
                this.errorMessages = [];
                if (!this.isValidField(this.form.password)) {
                    isValid = false;
                    this.errors.password = true;
                    this.errorMessages.push('Password is required');
                } else if (!this.isValidPassword(this.form.password)) {
                    isValid = false;
                    this.errors.password = true;
                    this.errorMessages.push('Please enter valid password');
                }
                if (!this.isValidField(this.form.password_confirmation)) {
                    isValid = false;
                    this.errors.password_confirmation = true;
                    this.errorMessages.push('Please confirm the password');
                }
                if (!this.errors.password && !this.errors.password_confirmation && this.form.password !== this.form.password_confirmation) {
                    isValid = false;
                    this.errors.password = true;
                    this.errors.password_confirmation = true;
                    this.errorMessages.push('Password not matching');
                }
                return isValid;
            },
            submit: function () {
                if (this.isValid()) {
                    this.$store.commit("setLoader", true);
                    this.form.token = this.data.token;
                    this.$store.dispatch("resetPassword", this.form)
                        .then(
                            response => {
                                if (response.data.status) {
                                    this.$notify({
                                        group: 'foo',
                                        title: 'Success!',
                                        type: 'success',
                                        text: 'Password updated successfully!'
                                    });
                                    this.$router.push({name: 'login'});
                                } else {
                                    this.showErrorNotification(response.data.errors);
                                }
                                this.$store.commit("setLoader", false);
                            }
                        )
                        .catch(
                            reason => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Error!',
                                    type: 'error',
                                    text: 'Something went wrong!'
                                });
                                this.$store.commit("setLoader", false);
                            }
                        )
                } else {
                    this.$notify({
                        group: 'foo',
                        title: 'Error!',
                        type: 'error',
                        text: this.errorMessages[0]
                    });
                }
            },
            /**
             * Show error validation with message
             * @param message
             */
            showErrorNotification: function (message) {
                _.forEach(message, (value, key) => {
                    this.errors.password_confirmation = key === 'password';
                    this.errors[key] = true;
                    this.$notify({
                        group: 'foo',
                        title: 'Registration failed',
                        type: 'error',
                        text: value[0]
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .error-border {
        border: 1px solid red;
    }
</style>
