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
                                    <h2>Find Your Account</h2>
                                </header>
                                <form class="content_form clearfix">
                                    <div class="form-group">
                                        <label for="email" class="form-label">
                                            Please enter your email address to search for your account.
                                        </label>
                                        <div class="form-element">
                                            <input id="email" type="text" class="form-control"
                                                   name="email" autofocus
                                                   v-model="form.email" :class="{'error-border':error}">
                                        </div>
                                    </div>


                                    <div class="vertically-aligned form-row">

                                        <div class="form-group half-width">
                                            <router-link tag="a" :to="{name: 'login'}" class="back-btn"><i
                                                class="icon-left"><img
                                                src="../../../images/nav-arrow.png" alt="Arrow"></i>Back to Login
                                            </router-link>
                                        </div>

                                        <div class="form-group half-width text-right">
                                            <div class="form-element">
                                                <button type="submit" class="btn-primary" @click.prevent="submit">Submit
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
        name: "ForgotPassword",
        mixins: [validate],
        data: () => {
            return {
                form: {
                    email: null
                },
                error: false
            }
        },
        methods: {
            submit: function () {
                this.error = false;
                if (this.isValidEmail(this.form.email)) {
                    this.$store.commit("setLoader", true);
                    this.$store.dispatch("forgetPassword", this.form)
                        .then(
                            response => {
                                if (response.data.status) {
                                    this.$notify({
                                        group: 'foo',
                                        title: 'Submitted!',
                                        type: 'success',
                                        text: 'An email with a link to update password has been sent to your Email Id.'
                                    });
                                    this.$store.commit("setLoader", false);
                                } else {
                                    this.$notify({
                                        group: 'foo',
                                        title: 'Error!',
                                        type: 'error',
                                        text: 'The email you are searching for is not found'
                                    });
                                    this.$store.commit("setLoader", false);
                                }
                            },
                            error => {
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
                    this.error = true;
                    this.$notify({
                        group: 'foo',
                        title: 'Validation error',
                        type: 'error',
                        text: 'Please enter a valid email'
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .error-border {
        border: 1px solid red;
    }
</style>
