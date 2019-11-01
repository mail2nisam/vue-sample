<template>
    <aside class="side-panel-right " :class="{'active':panelStatus}">
        <div class="inner-content">
            <header class="clearfix">
                <div class="close-btn" @click="$store.commit('setFilterPanelStatus',false)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.976 51.976">
                        <path
                            d="M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z"/>
                    </svg>
                </div>
            </header>
            <div class="content">
                <!--                <h4>Filters</h4>-->
                <div class="filter-apply">
                    <h5>Filters</h5>
                    <span class="close">
                    <a href="" @click.prevent="clearFilters">Clear all</a>
                    </span>
                </div>
            </div>

            <form>
                <div class="form-group">
                    <label for="stream" class="form-label">Stream</label>
                    <div class="form-element">
                        <v-select id="stream" class="form-control" :options="streamOptions" :multiple="true"
                                  v-model="filter.stream">
                        </v-select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="topic" class="form-label">Topic</label>
                    <div class="form-element">
                        <v-select id="topic" class="form-control" :options="topicOptions" :multiple="true"
                                  v-model="filter.topic">
                        </v-select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="companies" class="form-label">Company</label>
                    <div class="form-element">
                        <v-select id="companies" class="form-control" :options="companies" :multiple="true"
                                  v-model="filter.company">
                        </v-select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="status" class="form-label">Status</label>
                    <div class="form-element">
                        <v-select id="status" class="form-control" :options="statusOptions" :multiple="true"
                                  v-model="filter.status">
                        </v-select>
                    </div>
                </div>

<!--                <div class="form-group">-->
<!--                    <label for="permissions" class="form-label">Permissions</label>-->
<!--                    <div class="form-element">-->
<!--                        <v-select id="permissions" class="form-control" :options="radioOptions" :multiple="true"-->
<!--                                  v-model="filter.company_permission">-->
<!--                        </v-select>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="form-group">-->
<!--                    <label for="submitted" class="form-label">Submitted Elsewhere?</label>-->
<!--                    <div class="form-element">-->
<!--                        <v-select id="submitted" class="form-control" :options="radioOptions" :multiple="true"-->
<!--                                  v-model="filter.submitted_else">-->
<!--                        </v-select>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="form-group">-->
<!--                    <label for="published" class="form-label">Previously published ?</label>-->
<!--                    <div class="form-element">-->
<!--                        <v-select id="published" class="form-control" :options="radioOptions" :multiple="true"-->
<!--                                  v-model="filter.previously_published">-->
<!--                        </v-select>-->
<!--                    </div>-->
<!--                </div>-->


                <div class="form-group apply-btn">
                    <div class="form-element">
                        <button class="btn-primary" @click.prevent="applyFilters" @keydown.enter.prevent.stop>Apply
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </aside>
</template>

<script>
    import vSelect from 'vue-select'
    import topics from "../../settings/topics";
    import filter from "../../mixins/filter";

    export default {
        name: "FilterPanel",
        components: {vSelect},
        mixins: [filter],
        data: () => {
            return {
                streamOptions: [
                    'Technical',
                    'Strategic'
                ],
                statusOptions: [
                    'Submitted',
                    'Draft'
                ],
                radioOptions: [
                    'Yes',
                    'No'
                ],
                topics: topics,
                filter: {
                    stream: [],
                    topic: [],
                    status: [],
                    company_permission: [],
                    submitted_else: [],
                    previously_published: [],
                    company: []
                },
                companies: []
            }
        },
        computed: {
            /**
             * Get the current filter panel status
             * @returns {*}
             */
            panelStatus: function () {
                return this.$store.state.filter.status;
            },
            /**
             * Get topics labels from the list
             * @returns {Array}
             */
            topicOptions: function () {
                // list of all topics
                let topics = this.topics;
                // init options array
                let options = [];
                // get the stream selected
                let stream = this.filter.stream;
                // if no stream selected or both options
                if (stream.length < 1 || stream.length > 1) {
                    // create option array with all topics
                    for (let type in topics) {
                        topics[type].map((topicGroup) => {
                            if (topicGroup.label) {
                                options.push(topicGroup.label);
                            }
                        })
                    }
                } else {
                    // if any of the stream is selected, then find the options under the selected stream
                    topics[stream[0].toLowerCase()].map((topicGroup) => {
                        if (topicGroup.label) {
                            options.push(topicGroup.label);
                        }
                    })
                }
                options.push('Other');
                return options;
            }
        },
        methods: {
            /**
             * Get all the filter added in the store and apply
             */
            applyFilters: function () {
                let filter = _.cloneDeep(this.filter);


                filter.company_permission = filter.company_permission.length > 0 ? filter.company_permission.join(',').replace('Yes', '1').replace('No', '0').split(',') : filter.company_permission;
                filter.submitted_else = filter.submitted_else.length > 0 ? filter.submitted_else.join(',').replace('Yes', '1').replace('No', '0').split(',') : filter.submitted_else;
                filter.previously_published = filter.previously_published.length > 0 ? filter.previously_published.join(',').replace('Yes', '1').replace('No', '0').split(',') : filter.previously_published;

                let query = {};
                for (let keys in filter) {
                    if (filter[keys].constructor === Array && filter[keys].length > 0) {
                        query[keys] = filter[keys];
                    }
                }

                this.$store.commit("setFilter", query);
                let filterQuery = btoa(JSON.stringify(query));
                this.addRouteQuery('filter', filterQuery);
                this.$store.commit('setFilterPanelStatus', false);
            },
            /**
             * Copy the filters in route to the current data values
             */
            setFilter: function () {
                let query = this.$route.query;
                if ('filter' in query) {
                    try {
                        // decode filter
                        let filter = JSON.parse(atob(query.filter));
                        filter.company_permission = filter.company_permission && filter.company_permission.length > 0 ? filter.company_permission.join(',').replace('1', 'Yes').replace('0', 'No').split(',') : [];
                        filter.submitted_else = filter.submitted_else && filter.submitted_else.length > 0 ? filter.submitted_else.join(',').replace('1', 'Yes').replace('0', 'No').split(',') : [];
                        filter.previously_published = filter.previously_published && filter.previously_published.length > 0 ? filter.previously_published.join(',').replace('1', 'Yes').replace('0', 'No').split(',') : [];
                        for (let key in filter) {
                            if (filter.hasOwnProperty(key)) {
                                if (this.filter.hasOwnProperty(key)) {
                                    // copy to data
                                    this.filter[key] = filter[key];
                                }
                            }
                        }
                    } catch (e) {
                        throw new Error(e);
                    }
                }
            },
            /**
             * Clear filters in the data section
             */
            clearFilters: function () {
                for (let key in this.filter) {
                    if (this.filter.hasOwnProperty(key)) {
                        this.filter[key] = [];
                    }
                }
            },
            getCompanies: function () {
                this.companies = [];
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
            }
        },
        watch: {
            /**
             * Set existing filters on opening the filter panel
             * @param status
             */
            panelStatus: function (status) {
                if (status) {
                    this.setFilter();
                    this.getCompanies();
                }
            }
        }
    }
</script>

<style scoped>

</style>
