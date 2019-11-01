<template>
    <aside class="side-panel-right" :class="{'active':status}">
        <div class="inner-content">
            <header class="clearfix">
                <div class="close-btn" @click="closeSidePanel">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.976 51.976">
                        <path
                            d="M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z"/>
                    </svg>
                </div>
            </header>

            <div class="content">
                <form>
                    <div class="form-group">
                        <label for="email" class="form-label">Email <span class="required">*</span></label>
                        <div class="form-element">
                            <input id="email" type="text" autocomplete="false" class="form-control"
                                   v-model="form.email" :class="{'error-border':errors.email}" @change="fetchEmails">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="form-label">First Name <span class="required">*</span></label>
                        <div class="form-element">
                            <input id="name" type="text" autocomplete="false" class="form-control" autofocus
                                   v-model="form.name" :class="{'error-border':errors.name}"
                                   :disabled="hideFields && form.name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="last_name" class="form-label">Last Name <span class="required">*</span></label>
                        <div class="form-element">
                            <input id="last_name" type="text" class="form-control" v-model="form.last_name"
                                   :class="{'error-border':errors.last_name}" :disabled="hideFields && form.last_name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="job_title" class="form-label">Job Title <span class="required">*</span></label>
                        <div class="form-element">
                            <input id="job_title" type="text" class="form-control" v-model="form.job_title"
                                   :class="{'error-border':errors.job_title}" :disabled="hideFields && form.job_title">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="company_name" class="form-label">Company Name <span
                            class="required">*</span></label>
                        <div class="form-element">
                            <v-select id="company_name" class="form-control" v-model="form.company"
                                      :disabled="!!(hideFields && form.company)"
                                      :options="companies" :taggable="true"
                                      :class="{'error-border':errors.company}">
                            </v-select>
                        </div>
                    </div>
                    <div class="form-group"
                         v-if="!hideFields|| !(hideFields && disabledFields.indexOf('company_address')<=-1)">
                        <label for="company_address" class="form-label">Company Address <span
                            class="required">*</span></label>
                        <div class="form-element">
                            <input id="company_address" type="text" autocomplete="false" class="form-control"
                                   v-model="form.company_address" :class="{'error-border':errors.company_address}">
                        </div>
                    </div>
                    <div class="form-group"
                         v-if="!hideFields|| !(hideFields && disabledFields.indexOf('company_country')<=-1)">
                        <label for="company_country" class="form-label">Company Country</label>
                        <div class="form-element">
                            <select id="company_country" v-model="form.company_country"
                                    :class="{'error-border':errors.company_country}">
                                <option v-for="country in countries" :value="country.label">{{country.label}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group" v-if="!hideFields|| !(hideFields && disabledFields.indexOf('city')<=-1)">
                        <label for="city" class="form-label">Town/City</label>
                        <div class="form-element">
                            <input id="city" type="text" autocomplete="false" class="form-control" v-model="form.city"
                                   :class="{'error-border':errors.city}">
                        </div>
                    </div>
                    <div class="form-group" v-if="!hideFields|| !(hideFields && disabledFields.indexOf('state')<=-1)">
                        <label for="state" class="form-label">State/Province</label>
                        <div class="form-element">
                            <input id="state" type="text" autocomplete="false" class="form-control"
                                   v-model="form.state" :class="{'error-border':errors.state}">
                        </div>
                    </div>
                    <div class="form-group" v-if="!hideFields|| !(hideFields && disabledFields.indexOf('country')<=-1)">
                        <label for="country" class="form-label">Country <span class="required">*</span></label>
                        <div class="form-element">
                            <select id="country" v-model="form.country" :class="{'error-border':errors.country}">
                                <option v-for="country in countries" :value="country.label">{{country.label}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group" v-if="!hideFields|| !(hideFields && disabledFields.indexOf('phone')<=-1)">
                        <label for="phone" class="form-label">Phone Number <span class="required">*</span></label>
                        <div class="form-element">
                            <input id="phone" type="text" autocomplete="false" class="form-control"
                                   v-model="form.phone" :class="{'error-border':errors.phone}">
                        </div>
                    </div>
                    <div class="form-group"
                         v-if="!hideFields|| !(hideFields && disabledFields.indexOf('industry_code')<=-1)">
                        <label for="industry_code" class="form-label">Industry Area <span
                            class="required">*</span></label>
                        <div class="form-element">
                            <select id="industry_code" v-model="form.industry_code"
                                    :class="{'error-border':errors.industry_code}">
                                <option v-for="industry_code in industry_codes" :value="industry_code.value">
                                    {{industry_code.value}}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group role-container">
                        <label class="form-label">Choose Your Role <span
                            class="required">*</span></label>
                        <div class="form-element">
                            <div class="checkbox">
                                <input type="checkbox" v-model="form.author" :class="{'error-border':errors.author}"
                                       :value="true" id="author" @change="handleAuthorValue('author')">
                                <label for="author">Author</label>
                            </div>
                            <div class="checkbox">
                                <input type="checkbox" v-model="form.co_author"
                                       :class="{'error-border':errors.co_author}"
                                       :value="true" id="co_author" @change="handleAuthorValue('co_author')">
                                <label for="co_author">Co-author</label>
                            </div>
                        </div>
                        <br>
                        <p class="radio-error-text" v-if="errors.author">Please select an option</p>
                    </div>

                    <div class="form-group">
                        <div class="form-element">
                            <label class="form-label">Are you the presenter of this abstract?</label>
                            <div class="radio">
                                <input type="radio" v-model="form.presenter" :class="{'error-border':errors.presenter}"
                                       :value="true" id="presenter_yes">
                                <label for="presenter_yes">Yes</label>
                                <input type="radio" v-model="form.presenter" :class="{'error-border':errors.presenter}"
                                       :value="false" id="presenter_no">
                                <label for="presenter_no">No</label>
                            </div>
                            <p class="radio-error-text" v-if="errors.presenter">Please select an option</p>
                            <small class="note">Please note that only one complimentary pass to the conference
                                will be issued per abstract</small>
                        </div>
                    </div>
                    <template v-if="form.presenter">
                        <div class="form-group"
                             v-if="!hideFields || !(hideFields && disabledFields.indexOf('biography')<=-1)">
                            <label for="biography" class="form-label">Biography <span class="required">*</span></label>
                            <div class="form-element">
                                <textarea id="biography" cols="30" rows="5" v-model="form.biography"
                                          :class="{'error-border':errors.biography}"></textarea>
                            </div>
                        </div>
                        <div class="form-group"
                             v-if="!hideFields || !(hideFields && disabledFields.indexOf('avatar')<=-1)">
                            <label for="phone" class="form-label">Headshot - Size 300px-300px <span
                                class="required">*</span></label>
                            <div class="form-element file-upload" v-show="!form.avatar"
                                 :class="{'error-border':errors.avatar}">
                                <label for="avatar" class="custom-file-upload">Upload image</label>
                                <input id="avatar" type="file" @change="handleAvatarUpload" ref="avatar"
                                       accept=".jpeg,.jpg,.png,"/>
                            </div>
                            <div v-if="form.avatar" style="position: relative;">
                                <i class="icon-close" @click.prevent.stop="removeAvatar">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 51.976 51.976">
                                        <path
                                            d="M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z"/>
                                    </svg>
                                </i>
                                <img :src="avatarPreview" alt="test">
                            </div>
                        </div>
                        <div class="form-group"
                             v-if="!hideFields || !(hideFields && disabledFields.indexOf('company_logo')<=-1)">
                            <label for="phone" class="form-label">Company Logo - Size 300px-300px <span
                                class="required">*</span></label>
                            <div class="form-element file-upload" v-show="!form.company_logo"
                                 :class="{'error-border':errors.company_logo}">
                                <label for="company_logo" class="custom-file-upload">Upload image</label>
                                <input id="company_logo" type="file" accept=".jpeg,.jpg,.png,"
                                       @change="handleCompanyLogoUpload" ref="logo"/>
                            </div>
                            <div v-if="form.company_logo" style="position: relative;">
                                <i class="icon-close" @click.prevent.stop="removeLogo">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 51.976 51.976">
                                        <path
                                            d="M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z"/>
                                    </svg>
                                </i>
                                <img :src="logoPreview" alt="test">
                            </div>
                        </div>
                    </template>


                    <div class="form-group">
                        <div class="form-element">
                            <button class="btn-primary" @click.prevent="addToList">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </aside>
</template>

<script>
    import validate from "../../mixins/validate";
    import {countries} from "./../../settings/countries";
    import industryCode from "../../settings/industryCode";
    import vSelect from 'vue-select'

    export default {
        name: "SidePanel",
        mixins: [validate],
        components: {
            vSelect
        },
        data: () => {
            return {
                form: {
                    id: null,
                    name: null,
                    last_name: null,
                    job_title: null,
                    email: null,
                    company: null,
                    company_address: null,
                    company_country: null,
                    country: null,
                    phone: null,
                    city: null,
                    state: null,
                    zip: null,
                    industry_code: null,
                    biography: null,
                    avatar: null,
                    company_logo: null,
                    author: false,
                    co_author: false,
                    presenter: null
                },
                errors: {
                    name: false,
                    email: false,
                    last_name: false,
                    job_title: false,
                    company: false,
                    company_address: false,
                    company_country: false,
                    country: false,
                    phone: false,
                    city: false,
                    state: false,
                    zip: false,
                    industry_code: false,
                    biography: false,
                    avatar: false,
                    company_logo: false,
                    author: false,
                    presenter: false

                },
                disabledFields: [],
                errorMessages: [],
                companies: [],
                countries: countries,
                industry_codes: industryCode,
                acceptedFileTypes: [
                    "jpeg",
                    "jpg",
                    "png",
                ],
                avatarPreview: null,
                logoPreview: null,
                editUserIndex: null,
                isEdit: false,
                hideFields: false,
                timeout: null
            }
        },
        computed: {
            /**
             * Side panel status; if open or closed
             */
            status: function () {
                return this.$store.state.sidePanel.status;
            },
            /**
             * Flag to check if the form should fill with the current user
             */
            fillWithUser: function () {
                return this.$store.state.sidePanel.fillWithUser;
            },
            /**
             * Current user
             */
            user: function () {
                return this.$store.state.auth.user;
            },
            /**
             * Flag to check if the form opening for editing existing user
             */
            editUser: function () {
                return this.$store.state.sidePanel.editUser;
            },
            /**
             * List of all people already added to the list
             */
            people: function () {
                return this.$store.state.form.people;
            },
            /**
             * Check if the user with email is already in the list
             */
            isUserInList: function () {
                return this.people.find(p => p.email === this.form.email);
            },
            isPresenter: function () {
                return this.$store.state.sidePanel.isPresenter;
            }
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
             * Update the status to close the side panel
             */
            closeSidePanel: function () {
                this.$store.commit("setSidePanelStatus", false);
                this.$store.commit("setFullWithUser", false);
            },
            /**
             * Set the form fields with current user data
             */
            initFormData: function () {
                this.form = {
                    id: null,
                    name: null,
                    last_name: null,
                    job_title: null,
                    email: null,
                    company: null,
                    company_address: null,
                    company_country: null,
                    country: null,
                    phone: null,
                    city: null,
                    state: null,
                    zip: null,
                    industry_code: null,
                    biography: null,
                    avatar: null,
                    company_logo: null,
                    author: false,
                    co_author: false,
                    presenter: null
                };
            },
            /**
             * Add the form data into the list of poeple
             */
            addToList: function () {
                // if form valid
                if (this.isValid()) {
                    // clone the current form data
                    let form = _.cloneDeep(this.form);
                    // if the email entered is matching with the current user, then set as submitter
                    form.submitter = form.email === this.user.email;
                    // if the form opening for editing existing user
                    if (this.editUserIndex || this.editUserIndex === 0) {
                        // update the existing data in the list using the id
                        this.$store.commit("updateUserData", {id: this.editUserIndex, value: form});
                    } else {
                        // add new entry to the list
                        this.$store.commit("addUserToPeople", form);
                    }
                    // init the form data
                    this.initFormData();
                    // close side panel
                    this.closeSidePanel();
                } else {
                    // notification
                    this.$notify({
                        group: 'foo',
                        title: 'Validation error!',
                        type: 'error',
                        text: this.errorMessages[0]
                    });
                }
            },
            /**
             * Check if the form is valid
             */
            isValid: function () {
                let isValid = true;
                this.errors = {
                    name: false,
                    email: false,
                    last_name: false,
                    job_title: false,
                    company: false,
                    company_address: false,
                    country: false,
                    phone: false,
                    industry_code: false,
                    biography: false,
                    avatar: false,
                    company_logo: false,
                    author: false,
                    presenter: false
                };
                this.errorMessages = [];
                let form = this.form;

                if (this.isUserInList && !this.isEdit) {
                    this.errorMessages.push('The user is already added to the list');
                    this.errors.email = true;
                    isValid = false;
                }
                if (!this.isValidField(form.name)) {
                    this.errorMessages.push('Please enter the first name');
                    this.errors.name = true;
                    isValid = false;
                }
                if (!this.isValidField(form.last_name)) {
                    this.errorMessages.push('Please enter the last name');
                    this.errors.last_name = true;
                    isValid = false;
                }
                if (!this.isValidField(form.job_title)) {
                    this.errorMessages.push('Please enter the job title');
                    this.errors.job_title = true;
                    isValid = false;
                }
                if (!this.isValidField(form.company)) {
                    this.errorMessages.push('Please enter the company name');
                    this.errors.company = true;
                    isValid = false;
                }
                if (!this.isValidField(form.company_address)) {
                    this.errorMessages.push('Please enter the company address');
                    this.errors.company_address = true;
                    isValid = false;
                }
                if (!this.isValidField(form.country)) {
                    this.errorMessages.push('Please select a country');
                    this.errors.country = true;
                    isValid = false;
                }
                if (!this.isValidPhone(form.phone)) {
                    this.errorMessages.push('Please enter a valid phone number');
                    this.errors.phone = true;
                    isValid = false;
                }
                if (!this.isValidField(form.industry_code)) {
                    this.errorMessages.push('Please enter the industry area');
                    this.errors.industry_code = true;
                    isValid = false;
                }

                // required to select any of the user type
                if (!form.author && !form.presenter && !form.co_author) {
                    this.errorMessages.push('Please select your role');
                    this.errors.author = true;
                    isValid = false;
                }

                if (form.presenter === null) {
                    this.errorMessages.push('Please select an option');
                    this.errors.presenter = true;
                    isValid = false;
                }

                // if presenter, then following fields are mandatory
                if (form.presenter) {
                    if (!this.isValidField(form.biography) || form.biography.split(" ").length > 100) {
                        if (!this.isValidField(form.biography)) {
                            this.errorMessages.push('Please enter the biography');
                        } else {
                            this.errorMessages.push('Biography should not exceeds more than 100 words');
                        }
                        this.errors.biography = true;
                        isValid = false;
                    }
                    if (!form.avatar) {
                        this.errorMessages.push('Please upload image');
                        this.errors.avatar = true;
                        isValid = false;
                    }
                    if (!form.company_logo) {
                        this.errorMessages.push('Please upload company logo');
                        this.errors.company_logo = true;
                        isValid = false;
                    }
                }

                return isValid;
            },
            /**
             * Handle field value change event on changing file
             */
            handleAvatarUpload: function () {
                if (this.$refs.avatar.files && this.$refs.avatar.files.length > 0) {
                    let file = this.$refs.avatar.files[0];
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
                        this.form.avatar = file;
                        // read the file uploaded as data url
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.addEventListener("load", () => {
                            this.avatarPreview = fileReader.result;
                        }, false);
                    }
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
            /**
             * Cannot check both author and co-author
             * @param field
             */
            handleAuthorValue: function (field) {
                if (field === 'author' && this.form[field]) {
                    this.form.co_author = false;
                }
                if (field === 'co_author' && this.form[field]) {
                    this.form.author = false;
                }
            },
            /**
             * Check if email already exists
             */
            fetchEmails: function () {
                console.log("fetching email");
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    if (this.isValidEmail(this.form.email) && !this.isUserInList) {
                        this.$store.dispatch("checkEmail", this.form.email)
                            .then(
                                response => {
                                    let user =response.data.user;
                                    if (_.isEmpty(user)||user.role==='Submitter'){
                                        this.handleUserData(user);
                                    }else{
                                        this.$notify({
                                            group: 'foo',
                                            title: 'Error!',
                                            type: 'error',
                                            text: 'This user cannot be added'
                                        });
                                    }
                                },
                                error => {
                                    console.log(error);
                                }
                            )
                    } else if (this.isUserInList) {
                        this.$notify({
                            group: 'foo',
                            title: 'Warning!',
                            type: 'warn',
                            text: 'The user is already added to the list'
                        });
                    }
                }, 200);
            },
            /**
             * Handle user data to fill the form
             * @param user
             */
            handleUserData: function (user) {
                // if user data present
                if (!_.isEmpty(user)) {
                    // can edit fields if the user is created by the current session user
                    this.hideFields = user.created_by !== this.user.id;
                    // map all fields to form
                    Object.keys(user).map((key) => {
                        // find the matching keys if exist and append the value in it
                        if (typeof this.form[key] != 'undefined') {
                            this.form[key] = user[key];
                            if (!this.form[key]) {
                                this.disabledFields.push(key);
                            }
                        }
                    });
                    // generate image previews
                    this.generateImagePreview();

                } else {
                    // check if the data if filled before
                    // value is true implies that the fields are pre-filled on the last action
                    if (this.hideFields) {
                        // clone the typed email
                        let email = _.cloneDeep(this.form.email);
                        // init the form data
                        this.initFormData();
                        // set the email back
                        this.form.email = email;
                    }
                    // set the value false
                    this.hideFields = false;
                }
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
                    this.avatarPreview = `${document.location.origin}/storage/media/${this.form.id}/${this.form.avatar}`
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
            removeAvatar: function () {
                this.form.avatar = null;
            },
            removeLogo: function () {
                this.form.company_logo = null;
            }
        },
        watch: {
            fillWithUser: function (value) {
                if (value) {
                    this.handleUserData(this.user);
                }
            },
            status: function (value) {
                // reset all values on closing the side panel
                if (!value) {
                    this.initFormData();
                    this.editUserIndex = null;
                    this.hideFields = false;
                    this.disabledFields = [];
                    this.isEdit = false;
                    this.companies = [];
                } else {
                    // request for fetching the companies on opening the side panel
                    this.getCompanies();
                }
            },
            editUser: function (value) {
                // if editing user
                if (value || value === 0) {
                    // set value to data
                    this.editUserIndex = value;
                    this.isEdit = true;
                    // clone the data
                    let people = _.cloneDeep(this.people);
                    // get the editing user
                    this.form = people[this.editUserIndex];
                    if (this.isPresenter) {
                        this.form.presenter = true;
                        this.$store.commit("setIsPresenter", false);
                    }

                    this.generateImagePreview();


                    // set the edit index as null
                    this.$store.commit("setEditUser", null);
                }
            }
        }
    }
</script>

<style scoped>

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

    .radio-error-text {
        color: red;
        font-size: 12px;
    }
</style>
