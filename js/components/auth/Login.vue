<template>
    <main>
        <div class="main-wrapper aligned-middle">
            <article class="main-contents-wrap">
                <div class="container container-medium">
                    <div class="box-white login-flex-container">
                        <div class="left-side">
                            <div class="content">

                                <h2>Welcome to Gastech 2020 Call for Paper Submissions Portal.</h2>
                                <p>To begin your abstract submission, please register and create an account. You will be
                                    able to save and return to your submission form for editing at any time.
                                </p>
                                <p>The deadline for all submissions is 24 January 2020 23:00 GMT</p>
                                <p>If you have any questions or queries please feel free to contact
                                    <a href="emailto:gastechsubmissions@gastechevent.com">gastechsubmissions@gastechevent.com</a>
                                </p>
                            </div>
                        </div>
                        <div class="right-side">
                            <div class="login-content">
                                <div class="logo-wrap">
                                    <a @click.stop><img src="../../../images/gastech-logo.jpg" alt="Gastech"></a>
                                </div>
                                <div class="btn-block-wrap">
                                    <router-link tag="a" :to="{name: 'register'}" class="register-link btn-block">Create
                                        a new
                                        account
                                    </router-link>
                                </div>
                                <header class="content-header box-item">
                                    <h2>Login</h2>
                                </header>
                                <form @submit.prevent="login" class="content_form clearfix">
                                    <div class="form-group">
                                        <label for="email" class="form-label">Email</label>
                                        <div class="form-element">
                                            <input id="email" type="text" class="form-control"
                                                   :class="{'error-border':errors.email}" name="email" autofocus
                                                   v-model="form.email">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="password" class="form-label">Password</label>
                                        <div class="form-element">
                                            <input id="password" type="password" class="form-control"
                                                   :class="{'error-border':errors.password}" v-model="form.password">
                                        </div>
                                    </div>

                                    <div class="vertically-aligned form-row">

                                        <div class="form-group half-width">
                                            <div class="form-element">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="remember"
                                                           v-model="form.remember">
                                                    <label class="form-check-label" for="remember"> Remember me</label>
                                                </div>
                                                <div class="form-group form-link-box">

                                                    <router-link tag="a" :to="{name: 'forgot-password'}"
                                                                 class="register-link">
                                                        Forgot password? <i class="icon-right">
                                                        <img src="../../../images/nav-arrow.png" alt="Arrow">
                                                    </i></router-link>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group half-width text-right">
                                            <div class="form-element">
                                                <button type="submit" class="btn-primary">Login</button>
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
        name: "Login",
        mixins: [validate],
        data: () => {
            return {
                form: {
                    email: '',
                    password: '',
                    remember: false
                },
                errors: {
                    email: false,
                    password: false,
                }
            }
        },
        methods: {
            /**
             * Submit form data
             */
            login: function () {
                // if the form data is valid
                if (this.isValid()) {
                    this.$store.commit("setLoader", true);
                    // request login
                    this.$store.dispatch('login', this.form)
                        .then(
                            response => {
                                if (response.data.status) {
                                    // is authentication success
                                    // set auth values
                                    this.$store.commit('setAuth', true);
                                    this.$store.commit('setUser', response.data.user);
                                    // if there's query redirect
                                    if (this.$route.query && this.$route.query.redirect && this.$route.query.redirect !== "/") {
                                        // redirect to the path in query
                                        this.$router.push({
                                            path: this.$route.query.redirect
                                        });
                                    } else if (response.data.user.role === "Admin") { // if the current user is admin
                                        this.$router.push({
                                            name: 'admin-home'
                                        });
                                    } else if (response.data.have_abstracts) { // if the user not admin and have abstracts
                                        this.$router.push({
                                            name: 'home'
                                        });
                                    } else { // if user have no abstracts then redirect to form
                                        this.$router.push({
                                            name: 'form'
                                        });
                                    }
                                } else {
                                    // show auth error notifications
                                    this.showErrorNotification(response.data.errors);
                                }
                                this.$store.commit("setLoader", false);
                            },
                            error => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Authentication failed',
                                    type: 'error',
                                    text: 'Something went wrong!'
                                });
                                this.$store.commit("setLoader", false);
                            }
                        );
                }
            },
            /**
             * Check if the form is valid
             * @returns {boolean}
             */
            isValid: function () {
                let isValid = true;
                this.errors = {
                    email: false,
                    password: false,
                };
                if (!this.isValidEmail(this.form.email)) {
                    this.errors.email = true;
                    isValid = false;
                }
                if (!this.form.password.trim()) {
                    this.errors.password = true;
                    isValid = false;
                }
                return isValid;
            },
            /**
             * Show error message and validation on the field
             * @param message
             */
            showErrorNotification: function (message) {
                _.forEach(message, (value, key) => {
                    this.errors[key] = true;
                    this.$notify({
                        group: 'foo',
                        title: 'Authentication failed',
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
