<template>
    <div class="card card-white">
        <div class="avatar">
            <img :src="avatarPreview||'../../../../images/avatar.jpg'" alt="avatar">
        </div>
        <div class="card-inner">
            <div class="card-inner-details">
                <h4>{{fullName}}</h4>
                <span class="company">{{people.company}}</span>

                <!-- dropdown -->
                <div class="dropdown-wrap">
                    <span class="dropdown-toggler" @click.stop="toggleDropdown()">
                    <img src="../../../../images/dropdown-dots.png" alt="Click for dropdown">
                    </span>
                    <!-- Dropdown box -->
                    <div :class="(toggleStatus)?'dropdown-content': 'dropdown-content hide'"
                         v-outsideClick="setStatusFalse">
                        <ul>
                            <li v-if="!people.presenter" @click.prevent.stop="addAsPresenter">Add as presenter</li>
                            <li v-if="!people.author && !people.co_author" @click.prevent.stop="addAsAuthor">Add as
                                author
                            </li>
                            <li v-if="!people.author && !people.co_author" @click.prevent.stop="addAsCoAuthor">Add as
                                co-author
                            </li>
                            <li @click.stop="edit">Edit</li>
                            <li @click.stop="removeUser">Delete</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div class="tag-cloud">
                <span class="tag tag-submitter" v-if="people.submitter">Submitter</span>
                <span class="tag tag-author" v-if="people.author">Author <i class="close-icon" @click.prevent="removeTag('author')"></i></span>
                <span class="tag tag-author" v-if="people.co_author">Co-author <i class="close-icon" @click.prevent="removeTag('co_author')"></i></span>
                <span class="tag tag-presenter" v-if="people.presenter">Presenter <i class="close-icon"  @click.prevent="removeTag('presenter')"></i></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdminUserCard",
        props: ["people", "index"],
        data: () => {
            return {
                toggleStatus: false,
                avatarPreview: null
            }
        },
        computed: {
            /**
             * Get the full name of the user
             * @returns {*}
             */
            fullName: function () {
                let name = this.people.name;
                name += this.people.last_name ? ' ' + this.people.last_name : '';
                return name;
            }
        },
        directives: {
            outsideClick: {
                bind: function (el, binding, vnode) {
                    el.clickOutsideEvent = function (event) {
                        // here I check that click was outside the el and his children
                        if (!(el === event.target || el.contains(event.target))) {
                            // and if it did, call method provided in attribute value
                            vnode.context[binding.expression](event);
                        }
                    };
                    document.body.addEventListener('click', el.clickOutsideEvent);
                },
                unbind: function (el) {
                    document.body.removeEventListener('click', el.clickOutsideEvent);
                },
            }
        },
        methods: {
            /**
             * Toggle dropdown status
             */
            toggleDropdown: function () {
                this.toggleStatus = !this.toggleStatus
            },
            /**
             * Set the dropdown status to false
             */
            setStatusFalse: function () {
                this.toggleStatus = false
            },
            /**
             * Set the card user as presenter
             */
            addAsPresenter: function () {
                // if all the required fields are added, directly add to list
                if (this.people.biography && this.people.avatar && this.people.company_logo) {
                    this.$store.commit('setUserPresenterStatus', {id: this.index, value: true});
                } else {
                    // set edit data
                    this.$store.commit("setIsPresenter", true);
                    this.edit();
                }
            },
            /**
             * Add the card user as author
             */
            addAsAuthor: function () {
                this.$store.commit('setUserAuthorStatus', {id: this.index, value: true});
            },
            /**
             *
             */
            addAsCoAuthor: function () {
                this.$store.commit('setUserCoAuthorStatus', {id: this.index, value: true});
            },
            /**
             * Edit the user
             */
            edit: function () {
                // set the edit user id as the index of the user
                this.$store.commit("setEditUser", this.index);
                // open the side panel
                this.$store.commit("setSidePanelStatus", true);
            },
            /**
             * Set the preview data of the avatarN
             */
            addAvatarPreview: function () {
                // if the file object if present
                if (this.people.avatar && typeof this.people.avatar === 'object') {
                    // read the file object as data url
                    let fileReader = new FileReader();
                    fileReader.readAsDataURL(this.people.avatar);
                    fileReader.addEventListener("load", () => {
                        this.avatarPreview = fileReader.result;
                    }, false);
                } else if (this.people.avatar) {
                    // else get the full path of the file
                    this.avatarPreview = `${document.location.origin}/storage/media/${this.people.id}/${this.people.avatar}`
                }
            },
            /**
             * Remove the tag from the card and user
             * @param tag
             */
            removeTag: function (tag) {
                if (this.$route.name !== 'admin-preview' && this.$route.name !== 'abstract-preview') {
                    this.$store.commit("removeTagFromPeople", {index: this.index, tag: tag});
                }
            },
            removeUser: function () {
                this.$store.commit("setConfirm", true);
                this.$store.commit("setRemoveData", {type: 'people', id: this.index});
            }
        },
        updated() {
            this.addAvatarPreview();
        },
        mounted() {
            this.addAvatarPreview();
        }
    }
</script>

<style scoped>
    .tag-cloud .tag {
        cursor: default;
    }

    i.close-icon {
        cursor: pointer;
    }
</style>
