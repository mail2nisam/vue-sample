<template>
    <table class="table abstract-list-table">
        <thead>
        <tr>
            <th>Abstract ID</th>
            <th>Title</th>
            <th>Stream</th>
            <th>Topic</th>
            <th>Status</th>
            <th>Submitted Date</th>
            <th>Role</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="abstract in abstracts">
            <td data-column="Abstract ID">{{abstract.id}}</td>
            <td data-column="Title">{{abstract.title}}</td>
            <td data-column="Stream">{{abstract.stream}}</td>
            <td data-column="Topic">{{abstract.topic==='Other'?abstract.topic_other:abstract.topic||''}}</td>
            <td data-column="Status">{{abstract.status}}</td>
            <td data-column="Submitted Date">{{abstract.created_at}}</td>
            <td data-column="Submitted Date">{{abstract.abstract_role?abstract.abstract_role.join(', '):''}}</td>
            <td v-if="abstract.abstract_role && abstract.abstract_role.indexOf(submitter)>-1 && abstract.status!=='Submitted'">
                <a href="" class="edit-btn" @click.prevent="editAbstract(abstract.id)"><i class="icon-edit"></i><span>Edit</span></a>
                <a href="" class="delete-btn" @click.prevent.stop="deleteAbstract(abstract.id)"><i
                    class="icon-delete"></i><span>Delete</span></a>
            </td>
            <td v-else>
                <a href="" class="view-btn" @click.prevent.stop="preview(abstract.id)"><i
                    class="icon-view"></i><span>View</span></a>
            </td>
        </tr>
        <tr v-if="abstracts.length<=0">
            <td colspan="6" class="empty-row">You have not created or not part of any Abstracts yet. Please click <a
                href="" @click.prevent="$router.push({name: 'form'})">Create Abstract</a> button to get started.
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "AbstractTable",
        props: {
            abstracts: Array,
            submitted: {
                type: Boolean,
                default: false
            }
        },
        data: () => {
            return {
                submitter: 'Submitter'
            }
        },
        methods: {
            /**
             * Trigger on clicking edit button
             * Get the full data of the form
             * @param id
             */
            editAbstract: function (id) {
                this.$store.dispatch('fetchSingleFormData', id)
                    .then(
                        response => {
                            switch (response.abstract.step) {
                                case 1:
                                    this.$router.push({name: 'edit-abstract', params: {id: id}});
                                    break;
                                case 2:
                                    this.$router.push({name: 'author', params: {id: id}});
                                    break;
                                case 3:
                                    this.$router.push({name: 'preview', params: {id: id}});
                                    break;
                            }
                        }
                    )
            },
            /**
             * Remove the abstract from list
             * @param id
             */
            deleteAbstract: function (id) {
                this.$store.commit("setConfirm", true);
                this.$store.commit("setRemoveData", {type: 'abstract', id: id});
            },
            /**
             * Preview current abstract
             * @param id
             */
            preview: function (id) {
                this.$store.commit("setLoader", true);
                this.$store.dispatch('fetchSingleFormData', id)
                    .then(
                        () => {
                            this.$store.commit("setLoader", false);
                        }
                    )
                    .catch(
                        () => {
                            this.$store.commit("setLoader", false);
                        }
                    );
                this.$router.push({name: 'abstract-preview', params: {id: id}});
                // this.$store.commit("setModal", true);
            }
        }
    }
</script>

<style scoped>
    .empty-row {
        text-align: center;
    }
</style>
