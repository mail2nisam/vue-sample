<template>
    <main>
        <div class="main-wrapper  aligned-middle">
            <article class="main-contents-wrap boxed boxed-lg">
                <div class="container container-medium">
                    <div class="box-white login-flex-container registeration">
                        <div class="left-side">
                        </div>
                        <div class="right-side">
                            <div class="register-content">
                                <div class="logo-wrap">
                                    <a @click.stop><img src="../../../images/gastech-logo.jpg" alt="Gastech"></a>
                                </div>
                                <header class="content-header box-item">
                                    <h2>Register</h2>
                                </header>


                                <form class="content_form clearfix">
                                    <div class="vertically-aligned form-row">
                                        <div class="form-group half-width">
                                            <label for="name" class="form-label">First Name</label>
                                            <div class="form-element">
                                                <input id="name" type="text" class="form-control" v-model="form.name"
                                                       :class="{'error-border':errors.name}" autocomplete="false"
                                                       autofocus>
                                            </div>
                                        </div>

                                        <div class="form-group half-width">
                                            <label for="name" class="form-label">Last Name</label>
                                            <div class="form-element">
                                                <input id="last_name" type="text" class="form-control"
                                                       v-model="form.last_name"
                                                       :class="{'error-border':errors.last_name}">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="vertically-aligned form-row">
                                        <div class="form-group half-width">
                                            <label for="name" class="form-label">Job Title</label>
                                            <div class="form-element">
                                                <input id="job_title" type="text" class="form-control"
                                                       v-model="form.job_title"
                                                       :class="{'error-border':errors.job_title}">
                                            </div>
                                        </div>

                                        <div class="form-group half-width">
                                            <label for="name" class="form-label">Company Name</label>
                                            <div class="form-element">
                                                <v-select id="company" class="form-control" v-model="form.company"
                                                          :options="companies" :taggable="true"
                                                          :class="{'error-border':errors.company}">
                                                </v-select>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="vertically-aligned form-row">
                                        <div class="form-group half-width">
                                            <label for="country" class="form-label">Country</label>
                                            <div class="form-element">
                                                <select id="country" v-model="form.country"
                                                        :class="{'error-border':errors.country}">
                                                    <option v-for="country in countries" :value="country.label">
                                                        {{country.label}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group half-width">
                                            <label for="name" class="form-label">Phone Number</label>
                                            <div class="form-element">
                                                <input id="phone" type="text" class="form-control"
                                                       v-model="form.phone"
                                                       :class="{'error-border':errors.phone}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="vertically-aligned form-row">
                                        <div class="form-group half-width">
                                            <label for="email" class="form-label">Email</label>
                                            <div class="form-element">
                                                <input id="email" type="text" class="form-control" v-model="form.email"
                                                       :class="{'error-border':errors.email}" autocomplete="false">
                                            </div>
                                        </div>

                                        <div class="form-group half-width ">
                                            <label for="industry_area" class="form-label">Industry Area</label>
                                            <div class="form-element">
                                                <select id="industry_area" v-model="form.industry_code"
                                                        :class="{'error-border':errors.industry_code}">
                                                    <option v-for="industry_code in industry_codes"
                                                            :value="industry_code.value">
                                                        {{industry_code.value}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>


                                    </div>
                                    <div class="vertically-aligned form-row">
                                        <div class="form-group half-width ">
                                            <label for="password" class="form-label">Password</label>
                                            <div class="form-element">
                                                <input id="password" type="password" class="form-control"
                                                       v-model="form.password" :class="{'error-border':errors.password}"
                                                       autocomplete="false">
                                            </div>
                                        </div>
                                        <div class="form-group half-width">
                                            <label for="password-confirm" class="form-label">Confirm
                                                password</label>
                                            <div class="form-element">
                                                <input id="password-confirm" type="password" class="form-control"
                                                       v-model="form.password_confirmation"
                                                       :class="{'error-border':errors.password_confirmation}">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="vertically-aligned form-row">
                                        <div class="form-group full-width">
                                            <label for="password" class="form-label lead">From time to time we would
                                                like to
                                                contact you about our products and services, as well as other content
                                                that
                                                may be of interest to you. By submitting this form, you consent to allow
                                                dmg
                                                events to store and process your personal information. If you agree,
                                                please
                                                tick the boxes below.</label>
                                            <div class="form-element">
                                                <div class="checkbox">
                                                    <input type="checkbox" id="receive_program_updates"
                                                           v-model="form.receive_program_updates">
                                                    <label for="receive_program_updates" class="form-label">I agree to
                                                        receive updates from Gastech
                                                        Event which include programme updates, promotions and
                                                        more.</label>
                                                </div>
                                            </div>
                                            <div class="form-element">
                                                <div class="checkbox">
                                                    <input type="checkbox" id="receive_article_updates"
                                                           v-model="form.receive_article_updates">
                                                    <label for="receive_article_updates" class="form-label">I agree to
                                                        receive updates from Gastech
                                                        Insights on the gas and LNG industry including articles, eBooks,
                                                        webinars and more.</label>
                                                </div>
                                            </div>
                                            <div class="form-element">
                                                <div class="checkbox">
                                                    <input type="checkbox" id="receive_event_updates"
                                                           v-model="form.receive_event_updates">
                                                    <label for="receive_event_updates" class="form-label">I agree to
                                                        receive
                                                        updates of all the
                                                        events by dmg events as well as products & services by 3rd
                                                        parties
                                                        related to those events.</label>
                                                </div>
                                            </div>
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
                                                <button type="button" class="btn-primary" @click="register">
                                                    Register
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
    import vSelect from 'vue-select'
    import "vue-select/src/scss/vue-select.scss";
    import {countries} from "../../settings/countries";
    import industryCode from "../../settings/industryCode";


    export default {
        name: "Register",
        mixins: [validate],
        components: {
            vSelect
        },
        data: () => {
            return {
                form: {
                    name: null,
                    last_name: null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                    role: "Submitter",
                    job_title: null,
                    company: null,
                    country: null,
                    phone: null,
                    industry_code: null,
                    receive_program_updates: null,
                    receive_article_updates: null,
                    receive_event_updates: null,
                },
                errors: {
                    name: false,
                    last_name: false,
                    email: false,
                    password: false,
                    password_confirmation: false,
                    job_title: false,
                    company: false,
                    country: false,
                    phone: false,
                    industry_code: false,
                    receive_program_updates: false,
                    receive_article_updates: false,
                    receive_event_updates: false,
                },
                companies: [],
                industry_codes: industryCode,
                countries: countries
            }
        },
        beforeMount() {
            this.getCompanies();
        },
        methods: {
            /**
             * Request to get the list of companies
             */
            getCompanies() {
                this.$store.dispatch("fetchCompanies")
                    .then(
                        response => {
                            if (response.data.status && response.data.company_names && response.data.company_names.length > 0) {
                                response.data.company_names.map((company) => {
                                    this.companies.push(company.company);
                                });
                            }
                        }
                    )
            },
            /**
             * Submit the register form
             * Check validation
             */
            register: function () {
                if (this.isValid()) {
                    this.$store.commit("setLoader", true);
                    this.$store.dispatch('register', this.form)
                        .then(
                            response => {
                                if (response.data.status) {
                                    this.$store.commit('setAuth', true);
                                    this.$store.commit('setUser', response.data.user);
                                    if (response.data.have_abstracts) {
                                        window.location = 'abstracts?register=1';
                                    } else {
                                        window.location = 'abstract/create/1?register=1';
                                    }
                                } else {
                                    this.showErrorNotification(response.data.errors);
                                    this.$store.commit("setLoader", false);
                                }
                            },
                            error => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Registration failed',
                                    type: 'error',
                                    text: 'Something went wrong!'
                                });
                                this.$store.commit("setLoader", false);
                            }
                        ).catch(
                        reason => console.log(reason)
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
                    name: false,
                    last_name: false,
                    email: false,
                    password: false,
                    password_confirmation: false,
                    job_title: false,
                    company: false,
                    country: false,
                    phone: false
                };
                let errorMessages = [];
                if (!this.isValidField(this.form.name)) {
                    isValid = false;
                    this.errors.name = true;
                    errorMessages.push('Please enter your first name');
                }
                if (!this.isValidField(this.form.last_name)) {
                    isValid = false;
                    this.errors.last_name = true;
                    errorMessages.push('Please enter your last name');
                }
                if (!this.isValidEmail(this.form.email)) {
                    isValid = false;
                    this.errors.email = true;
                    errorMessages.push('Please enter your email');
                }
                if (!this.isValidField(this.form.job_title)) {
                    isValid = false;
                    this.errors.job_title = true;
                    errorMessages.push('Please enter the job title');
                }

                if (!this.isValidField(this.form.company)) {
                    isValid = false;
                    this.errors.company = true;
                    errorMessages.push('Please select company from the list or create one');
                }
                if (!this.isValidField(this.form.country)) {
                    isValid = false;
                    this.errors.country = true;
                    errorMessages.push('Please select a country');
                }
                if (!this.isValidField(this.form.industry_code)) {
                    isValid = false;
                    this.errors.industry_code = true;
                    errorMessages.push('Please select the industry area');
                }
                if (!this.isValidPhone(this.form.phone)) {
                    if (!this.form.phone) {
                        errorMessages.push('Please enter the phone number');
                    } else {
                        errorMessages.push('Please enter valid phone number');
                    }
                    isValid = false;
                    this.errors.phone = true;
                }
                if (!this.isValidField(this.form.password)) {
                    isValid = false;
                    this.errors.password = true;
                    errorMessages.push('Please enter the password');
                } else if (!this.isValidPassword(this.form.password)) {
                    isValid = false;
                    this.errors.password = true;
                    errorMessages.push('Please enter valid password');
                }
                if (!this.isValidField(this.form.password_confirmation)) {
                    isValid = false;
                    this.errors.password_confirmation = true;
                    errorMessages.push('Please confirm the password');
                }
                if (!this.errors.password && !this.errors.password_confirmation && this.form.password !== this.form.password_confirmation) {
                    isValid = false;
                    this.errors.password = true;
                    this.errors.password_confirmation = true;
                    errorMessages.push('Password not matching');
                }

                if (errorMessages.length > 0) {
                    this.$notify({
                        group: 'foo',
                        title: 'Registration failed',
                        type: 'error',
                        text: errorMessages[0]
                    });
                }

                return isValid;
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

    .form-row .form-group.full-width {
        margin-left: 10px;
        margin-right: 10px;
    }
</style>
