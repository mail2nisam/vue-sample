<template>
    <div class="container container-small">
        <div class="box-white">
            <header class="content-header box-item">
                <h2>My Profile</h2>
            </header>
            <section class="contents">
                <form class="content_form clearfix">

                    <div class="form-row">
                        <div class="form-group">
                            <label for="phone" class="form-label">Headshot - Size min 1 MB</label>
                            <div class="form-element file-upload" v-show="!this.form.avatar">
                                <label for="avatar" class="custom-file-upload">Upload image</label>
                                <input id="avatar" type="file" @change="handleAvatarUpload" ref="avatar"
                                       accept=".jpeg,.jpg,.png,"/>
                            </div>
                            <div v-if="form.avatar">
                                <i class="icon-close" @click="removeAvatar">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 51.976 51.976">
                                        <path
                                            d="M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z"/>
                                    </svg>
                                </i>
                                <img :src="avatarPreview" alt="test">
                            </div>
                        </div>
                    </div>
                    <div class=" form-row">
                        <div class="form-group">
                            <label for="name" class="form-label">First Name <span class="required">*</span></label>
                            <div class="form-element">
                                <input id="name" type="text" class="form-control" autocomplete="false" autofocus
                                       v-model="form.name" :class="{'error-border':errors.name}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="name" class="form-label">Last Name <span class="required">*</span></label>
                            <div class="form-element">
                                <input id="last_name" type="text" class="form-control" autocomplete="false"
                                       v-model="form.last_name" :class="{'error-border':errors.last_name}">
                            </div>
                        </div>
                    </div>

                    <div class=" form-row">
                        <div class="form-group">
                            <label for="email" class="form-label">Email</label>
                            <div class="form-element">
                                <input id="email" type="text" class="form-control" autocomplete="false"
                                       v-model="form.email" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="name" class="form-label">Job Title <span class="required">*</span></label>
                            <div class="form-element">
                                <input id="job_title" type="text" class="form-control" autocomplete="false"
                                       v-model="form.job_title" :class="{'error-border':errors.job_title}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="country" class="form-label">Country <span class="required">*</span></label>
                            <div class="form-element">
                                <select id="country" v-model="form.country"
                                        :class="{'error-border':errors.country}">
                                    <option v-for="country in countries" :value="country.label">{{country.label}}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="city" class="form-label">Town/City</label>
                            <div class="form-element">
                                <input id="city" type="text" class="form-control" autocomplete="false"
                                       v-model="form.city">
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="state" class="form-label">State/Province</label>
                            <div class="form-element">
                                <input id="state" type="text" class="form-control" autocomplete="false"
                                       v-model="form.state">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="zip" class="form-label">Zip Code</label>
                            <div class="form-element">
                                <input id="zip" type="text" class="form-control" autocomplete="false"
                                       v-model="form.zip">
                            </div>
                        </div>
                    </div>
                    <div class=" form-row">
                        <div class="form-group">
                            <label for="phone" class="form-label">Phone Number <span class="required">*</span></label>
                            <div class="form-element">
                                <input id="phone" type="text" class="form-control" autocomplete="false"
                                       v-model="form.phone" :class="{'error-border':errors.phone}">
                            </div>
                        </div>
                    </div>

                    <div class=" form-row">
                        <div class="form-group">
                            <label for="name" class="form-label">Company Name <span class="required">*</span></label>
                            <div class="form-element">
                                <v-select id="company" class="form-control" :options="companies" :taggable="true"
                                          v-model="form.company" :class="{'error-border':errors.company}">
                                </v-select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="company_address" class="form-label">Company Address</label>
                            <div class="form-element">
                                <input id="company_address" type="text" class="form-control" autocomplete="false"
                                       v-model="form.company_address">
                            </div>
                        </div>
                    </div>


                    <div class=" form-row">
                        <div class="form-group">
                            <label for="company_country" class="form-label">Company Country</label>
                            <div class="form-element">
                                <select id="company_country" v-model="form.company_country">
                                    <option v-for="country in countries" :value="country.label">{{country.label}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="phone" class="form-label">Company Logo - Size min 1 MB</label>
                            <div class="form-element file-upload" v-show="!form.company_logo">
                                <label for="company_logo" class="custom-file-upload">Upload image</label>
                                <input id="company_logo" type="file" accept=".jpeg,.jpg,.png,"
                                       @change="handleCompanyLogoUpload" ref="logo"/>
                            </div>
                            <div v-if="form.company_logo">
                                <i class="icon-close" @click="removeLogo">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 51.976 51.976">
                                        <path
                                            d="M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z"/>
                                    </svg>
                                </i>
                                <img :src="logoPreview" alt="test">
                            </div>
                        </div>

                    </div>

                    <div class=" form-row">
                        <div class="form-group">
                            <label for="industry_code" class="form-label">Industry Area</label>
                            <div class="form-element">
                                <select id="industry_code" v-model="form.industry_code"
                                        :class="{'error-border':errors.industry_code}">
                                    <option v-for="industry_code in industry_codes" :value="industry_code.value">
                                        {{industry_code.value}}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="biography" class="form-label">Biography</label>
                            <div class="form-element">
                                <textarea id="biography" cols="30" rows="5" v-model="form.biography"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class=" form-row">
                        <div class="form-group text-right">
                            <div class="form-element">
                                <button class="btn-primary" @click.prevent="submit">Update Profile</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select'
    import "vue-select/src/scss/vue-select.scss";
    import {countries} from "../../settings/countries";
    import validate from "../../mixins/validate";
    import industryCode from "../../settings/industryCode";

    export default {
        name: "Profile",
        components: {
            vSelect
        },
        mixins: [validate],
        data: () => {
            return {
                companies: [],
                countries: countries,
                industry_codes: industryCode,
                form: {
                    id: null,
                    name: null,
                    last_name: null,
                    email: null,
                    job_title: null,
                    country: null,
                    city: null,
                    state: null,
                    zip: null,
                    phone: null,
                    company: null,
                    company_address: null,
                    company_country: null,
                    industry_code: null,
                    biography: null,
                    avatar: null,
                    company_logo: null,
                },
                errors: {
                    name: false,
                    last_name: false,
                    job_title: false,
                    country: false,
                    phone: false,
                    company: false
                },
                errorMessages: [],
                avatarPreview: null,
                logoPreview: null,
                acceptedFileTypes: [
                    "jpeg",
                    "jpg",
                    "png",
                ],
            }
        },
        computed: {
            user: function () {
                return this.$store.state.auth.user;
            }
        },
        beforeMount() {
            this.$store.dispatch("fetchUser");
            this.getCompanies();
            this.initFormData();
        },
        methods: {
            initFormData: function () {
                let user = _.cloneDeep(this.user);
                Object.keys(user).map((key) => {
                    if (typeof this.form[key] != 'undefined') {
                        // find the matching keys if exist and append the value in it
                        this.form[key] = user[key];
                    }
                });
                this.generateImagePreview();
            },
            submit: function () {
                if (this.isValid()) {
                    this.$store.commit("setLoader", true);
                    this.$store.dispatch('updateProfile', this.form)
                        .then(
                            response => {
                                if (response.data.status) {
                                    this.$notify({
                                        group: 'foo',
                                        title: 'Success',
                                        type: 'success',
                                        text: 'Profile updated successfully'
                                    });
                                } else {
                                    this.$notify({
                                        group: 'foo',
                                        title: 'Error!',
                                        type: 'error',
                                        text: 'Something went wrong!'
                                    });
                                }
                                setTimeout(() => {
                                    this.$store.commit("setLoader", false);
                                }, 500);
                            },
                            error => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Error!',
                                    type: 'error',
                                    text: 'Something went wrong!'
                                });
                                setTimeout(() => {
                                    this.$store.commit("setLoader", false);
                                }, 500);
                            }
                        )
                } else {
                    this.$notify({
                        group: 'foo',
                        title: 'Validation error',
                        type: 'error',
                        text: this.errorMessages[0]
                    });
                }
            },
            isValid: function () {
                let isValid = true;
                this.errors = {
                    name: false,
                    last_name: false,
                    job_title: false,
                    country: false,
                    phone: false,
                    company: false
                };
                this.errorMessages = [];
                if (!this.isValidField(this.form.name)) {
                    this.errorMessages.push("Please enter the first name");
                    this.errors.name = true;
                    isValid = false;
                }
                if (!this.isValidField(this.form.last_name)) {
                    this.errorMessages.push("Please enter the last name");
                    this.errors.last_name = true;
                    isValid = false;
                }
                if (!this.isValidField(this.form.job_title)) {
                    this.errorMessages.push("Please enter the job title");
                    this.errors.job_title = true;
                    isValid = false;
                }
                if (!this.isValidField(this.form.country)) {
                    this.errorMessages.push("Please select a country");
                    this.errors.country = true;
                    isValid = false;
                }
                if (!this.isValidPhone(this.form.phone)) {
                    this.errorMessages.push("Please enter a valid phone number");
                    this.errors.phone = true;
                    isValid = false;
                }
                if (!this.isValidField(this.form.company)) {
                    this.errorMessages.push("Please select a company name from list or create one");
                    this.errors.company = true;
                    isValid = false;
                }
                return isValid;
            },
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
             * Handle field value change event on changing file
             */
            handleAvatarUpload: function () {
                if (this.$refs.avatar.files && this.$refs.avatar.files.length > 0) {
                    let file = this.$refs.avatar.files[0];
                    let extension = file.name.split('.').pop();
                    let size = file.size / 1024 / 1024; // in MB
                    // check if the file size is more than 1 MB
                    if (size < 1) {
                        this.$notify({
                            group: 'foo',
                            title: 'Image size error',
                            type: 'error',
                            text: 'Upload image with size more than 1 MB'
                        });
                    }
                    if (this.acceptedFileTypes.indexOf(extension.toLowerCase()) > -1 && size >= 1) {
                        this.form.avatar = file;
                        // read the file uploaded as data url
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.addEventListener("load", () => {
                            // this.validateImageDimension(fileReader.result, 'avatars');
                            this.avatarPreview = fileReader.result;
                        }, false);
                    }
                }
            },
            /**
             * Check file dimension and validate
             * Dimension 300px - 300px
             */
            validateImageDimension: function (file, type) {
                let imageReader = new Image;
                imageReader.addEventListener("load", () => {
                    if (imageReader.width !== 300 || imageReader.height !== 300) {
                        this.$notify({
                            group: 'foo',
                            title: 'Image size error',
                            type: 'error',
                            text: 'Upload image with size 300px - 300px'
                        });
                    }
                });
                imageReader.src = file;
            },
            /**
             * Check if file is added
             * Then, generate preview for the files
             */
            generateImagePreview: function () {
                // if the field value is object then file is uploaded now
                // otherwise it is saved in the database and fetched
                if (this.form.avatar && typeof this.form.avatar === 'object') {
                    // create file reader to generate the preview from data url
                    let fileReader = new FileReader();
                    fileReader.readAsDataURL(this.form.avatar);
                    fileReader.addEventListener("load", () => {
                        this.avatarPreview = fileReader.result;
                    }, false);
                } else if (this.form.avatar) {
                    // file is uploaded already and generate preview by appending the full path
                    this.avatarPreview = `${document.location.origin}/storage/media/${this.form.id}/${this.form.avatar}`;
                }

                if (this.form.company_logo && typeof this.form.company_logo === 'object') {
                    let fileReader = new FileReader();
                    fileReader.readAsDataURL(this.form.company_logo);
                    fileReader.addEventListener("load", () => {
                        this.logoPreview = fileReader.result;
                    }, false);
                } else if (this.form.company_logo) {
                    this.logoPreview = `${document.location.origin}/storage/media/${this.form.id}/${this.form.company_logo}`
                }
            },
            /**
             * Handle file changes in the company logo field
             */
            handleCompanyLogoUpload: function () {
                if (this.$refs.logo.files && this.$refs.logo.files.length > 0) {
                    let file = this.$refs.logo.files[0];
                    let extension = file.name.split('.').pop();
                    let size = file.size / 1024 / 1024; // in MB
                    if (size < 1) {
                        this.$notify({
                            group: 'foo',
                            title: 'Image size error',
                            type: 'error',
                            text: 'Upload image with size more than 1 MB'
                        });
                    }
                    if (this.acceptedFileTypes.indexOf(extension.toLowerCase()) > -1 && size >= 1) {
                        this.form.company_logo = file;
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.addEventListener("load", () => {
                            this.logoPreview = fileReader.result;
                        }, false);
                    }
                }
            },
            removeAvatar: function () {
                this.form.avatar = null;
            },
            removeLogo: function () {
                this.form.company_logo = null
            }
        },
        watch: {
            user: {
                handler: function (user, prev) {
                    this.initFormData();
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    span.required {
        color: red;
    }

    .form-element.file-upload {
        position: relative;
    }

    input[type="file"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100px;
        opacity: 0;
        cursor: pointer;
    }

    .custom-file-upload {
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
        width: 100%;
        height: 100px;
        border-style: dashed;
        text-align: center;
        padding-top: 15%;
    }

    .error-border {
        border: 1px solid red;
    }

    span.required {
        color: red;
    }
</style>
