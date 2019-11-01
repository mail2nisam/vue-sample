<template>
    <div class="abstract-list-wrap">
        <table class="table abstract-list-table admin-table">
            <thead>
            <tr>
                <th></th>
                <th class="point-order" @click="setSort('id')">ID
                    <div class="count" v-if="sort.id!==undefined">
                        <div class="count-num">{{Object.keys(sort).indexOf('id')+1}}</div>
                    </div>
                    <div class="incr-dec">
                        <div class="inc-area" :class="{'active':typeof sort.id!=='undefined' && sort.id==='asc'}"></div>
                        <div class="dec-area"
                             :class="{'active':typeof sort.id!=='undefined' && sort.id==='desc'}"></div>
                    </div>

                </th>
                <th class="point-order" @click="setSort('status')">Status
                    <div class="count" v-if="sort.status!==undefined">
                        <div class="count-num">{{Object.keys(sort).indexOf('status')+1}}</div>
                    </div>
                    <div class="incr-dec">
                        <div class="inc-area"
                             :class="{'active':typeof sort.status!=='undefined' && sort.status==='asc'}"></div>
                        <div class="dec-area"
                             :class="{'active':typeof sort.status!=='undefined' && sort.status==='desc'}"></div>

                    </div>
                </th>
                <th class="point-order" @click="setSort('submitter')">Submitter
                    <div class="count" v-if="sort.submitter!==undefined">
                        <div class="count-num">{{Object.keys(sort).indexOf('submitter')+1}}</div>
                    </div>
                    <div class="incr-dec">
                        <div class="inc-area"
                             :class="{'active':typeof sort.submitter!=='undefined' && sort.submitter==='asc'}"></div>
                        <div class="dec-area"
                             :class="{'active':typeof sort.submitter!=='undefined' && sort.submitter==='desc'}"></div>

                    </div>
                </th>
                <th class="point-order" @click="setSort('company')">Submitter Company
                    <div class="count" v-if="sort.company!==undefined">
                        <div class="count-num">{{Object.keys(sort).indexOf('company')+1}}</div>
                    </div>
                    <div class="incr-dec">
                        <div class="inc-area"
                             :class="{'active':typeof sort.company!=='undefined' && sort.company==='asc'}"></div>
                        <div class="dec-area"
                             :class="{'active':typeof sort.company!=='undefined' && sort.company==='desc'}"></div>
                    </div>
                </th>
                <th class="point-order" @click="setSort('job_title')">Submitter Job Title
                    <div class="count" v-if="sort.job_title!==undefined">
                        <div class="count-num">{{Object.keys(sort).indexOf('job_title')+1}}</div>
                    </div>
                    <div class="incr-dec">
                        <div class="inc-area"
                             :class="{'active':typeof sort.job_title!=='undefined' && sort.job_title==='asc'}"></div>
                        <div class="dec-area"
                             :class="{'active':typeof sort.job_title!=='undefined' && sort.job_title==='desc'}"></div>
                    </div>
                </th>
                <th class="point-order" @click="setSort('title')">Abstract Title
                    <div class="count" v-if="sort.title!==undefined">
                        <div class="count-num">{{Object.keys(sort).indexOf('title')+1}}</div>
                    </div>
                    <div class="incr-dec">
                        <div class="inc-area"
                             :class="{'active':typeof sort.title!=='undefined' && sort.title==='asc'}"></div>
                        <div class="dec-area"
                             :class="{'active':typeof sort.title!=='undefined' && sort.title==='desc'}"></div>
                    </div>
                </th>
                <th class="point-order" @click="setSort('stream')">Abstract Stream
                    <div class="count" v-if="sort.stream!==undefined">
                        <div class="count-num">{{Object.keys(sort).indexOf('stream')+1}}</div>
                    </div>
                    <div class="incr-dec">
                        <div class="inc-area"
                             :class="{'active':typeof sort.stream!=='undefined' && sort.stream==='asc'}"></div>
                        <div class="dec-area"
                             :class="{'active':typeof sort.stream!=='undefined' && sort.stream==='desc'}"></div>
                    </div>
                </th>
                <th class="point-order" @click="setSort('abstract_topic')">Abstract Topic
                    <div class="count" v-if="sort.abstract_topic!==undefined">
                        <div class="count-num">{{Object.keys(sort).indexOf('abstract_topic')+1}}</div>
                    </div>
                    <div class="incr-dec">
                        <div class="inc-area"
                             :class="{'active':typeof sort.abstract_topic!=='undefined' && sort.abstract_topic==='asc'}"></div>
                        <div class="dec-area"
                             :class="{'active':typeof sort.abstract_topic!=='undefined' && sort.abstract_topic==='desc'}"></div>
                    </div>
                </th>
                <th class="point-order" @click="setSort('created_at')">Created Date
                    <div class="count" v-if="sort.created_at!==undefined">
                        <div class="count-num">{{Object.keys(sort).indexOf('created_at')+1}}</div>
                    </div>
                    <div class="incr-dec">
                        <div class="inc-area"
                             :class="{'active':typeof sort.created_at!=='undefined' && sort.created_at==='asc'}"></div>
                        <div class="dec-area"
                             :class="{'active':typeof sort.created_at!=='undefined' && sort.created_at==='desc'}"></div>
                    </div>
                </th>

                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(abstract,index) in paginatedAbstracts">
                <td data-column="">{{pageRowCount *(page-1)+index+1}}</td>
                <td data-column="ID">{{abstract.id}}</td>
                <td data-column="Status">{{abstract.status}}</td>
                <td data-column="Submitter">{{abstract.submitter}}</td>
                <td data-column="Submitter Company">{{abstract.company}}</td>
                <td data-column="Submitter Job Title">{{abstract.job_title}}</td>
                <td data-column="Abstract Title">{{abstract.title}}</td>
                <td data-column="Abstract Stream">{{abstract.stream}}</td>
                <td data-column="Abstract Topic">{{abstract.topic==='Other'?abstract.topic_other:abstract.topic||''}}
                <td data-column="Created Date">{{abstract.created_at}}</td>
                <td>
                    <a href="" class="view-btn" @click.prevent.stop="preview(abstract.id)">
                        <i class="icon-view"></i><span>View</span></a>
                    <a href="" class="delete-btn" @click.prevent.stop="deleteAbstract(abstract.id)">
                        <i class="icon-delete"></i><span>Delete</span></a>
                </td>
            </tr>
            <tr v-if="abstracts.length<=0">
                <td colspan="10" class="empty-row">No Abstracts yet.</td>
            </tr>
            <tr v-else-if="paginatedAbstracts<=0">
                <td colspan="10" class="empty-row">No results found</td>
            </tr>
            </tbody>
        </table>
        <paginate v-if="paginatedAbstracts && filteredAbstracts.length>pageRowCount"
                  :page-count="pageCount"
                  prev-class="prev-pagination"
                  next-class="next-pagination"
                  :click-handler="clickCallBack"
                  :prev-text="''"
                  :next-text="''"
                  ref="paginateRef"
                  container-class="pagination-container">
        </paginate>
    </div>
</template>

<script>
    import Paginate from 'vuejs-paginate'
    import filter from "../../mixins/filter";

    export default {
        name: "AdminAbstractTable",
        components: {Paginate},
        mixins: [filter],
        beforeMount() {
            // axios.post('http://phases.gastech-cfp.local/api/admin/export/excel', null);
        },
        computed: {
            /**
             * Get the current page from store
             */
            page: function () {
                return this.$store.state.filter.keys.page;
            },
            /**
             * Get the search key from store
             */
            search: function () {
                return this.$store.state.filter.keys.search;
            },
            /**
             * Get the sort data from store
             */
            sort: function () {
                return this.$store.state.filter.keys.sort;
            },
            /**
             * List of all abstracts
             */
            abstracts: function () {
                return this.$store.state.data.abstracts;
            },
            /**
             * Get the filters applied from the store
             */
            filters: function () {
                return this.$store.state.filter.keys.filter;
            },
            /**
             * List of abstracts after applying the search
             */
            searchedAbstracts: function () {
                let abstracts = this.abstracts;
                let searchKey = this.search;
                if (searchKey && abstracts && abstracts.length > 0) {
                    return abstracts.filter((abstract) => {
                        return abstract.title && abstract.title.toLowerCase().includes(searchKey.toLowerCase())
                            || abstract.id === parseInt(searchKey)
                            || abstract.abstract && abstract.abstract.toLowerCase().includes(searchKey.toLowerCase())
                            || abstract.status && abstract.status.toLowerCase().includes(searchKey.toLowerCase())
                            || abstract.stream && abstract.stream.toLowerCase().includes(searchKey.toLowerCase())
                            || abstract.topic && abstract.topic.toLowerCase().includes(searchKey.toLowerCase())
                            || abstract.job_title && abstract.job_title.toLowerCase().includes(searchKey.toLowerCase())
                            || abstract.submitter && abstract.submitter.toLowerCase().includes(searchKey.toLowerCase())
                            || abstract.company && abstract.company.toLowerCase().includes(searchKey.toLowerCase());
                    });
                }
                return abstracts;
            },
            /**
             * Apply filter on the sorted abstracts
             */
            filteredAbstracts: function () {
                let appliedFilters = this.filters;
                let abstracts = this.searchedAbstracts;
                let query = {};
                for (let keys in appliedFilters) {
                    if (appliedFilters[keys].constructor === Array && appliedFilters[keys].length > 0) {
                        query[keys] = appliedFilters[keys];
                    }
                }
                return abstracts.filter((item) => {
                    for (let key in query) {
                        if (item[key] === undefined || !query[key].includes(item[key] + '')) {
                            return false;
                        }
                    }
                    return true;
                });
            },
            /**
             * Apply sort on searched abstract list
             */
            sortedAbstracts: function () {
                let abstracts = this.filteredAbstracts;
                let sort = this.sort;
                if (!_.isEmpty(sort)) {
                    let sortList = [];
                    for (let key in sort) {
                        if (sort.hasOwnProperty(key)) {
                            if (sort[key] === 'desc') {
                                sortList.push('-' + key);
                            } else {
                                sortList.push(key);
                            }
                        }
                    }
                    return abstracts.sort(this.dynamicSortMultiple(sortList));
                }
                return abstracts;
            },
            /**
             * List of abstracts for the current page
             * @returns {Array}
             */
            paginatedAbstracts: function () {
                let abstracts = this.sortedAbstracts;
                let offset = this.pageRowCount * (this.page - 1);
                let limit = offset + this.pageRowCount;
                return abstracts.length > 0 ? abstracts.slice(offset, limit) : [];
            },
            /**
             * Calculate the page count for the abstracts
             */
            pageCount: function () {
                let total = this.filteredAbstracts.length;
                let count = Math.floor(total / this.pageRowCount);
                if ((total % this.pageRowCount) > 0) {
                    count += 1;
                }
                return count;
            },
            pageRowCount: function () {
                return this.$store.state.filter.keys.page_row_count;
            },
        },
        mounted() {
            // set the filters if any on mount
            setTimeout(() => {
                this.setFilter();
            }, 200);
        },
        methods: {
            /**
             * Show the abstract preview on click
             * Redirect to admin preview path
             * @param id
             */
            preview: function (id) {
                this.$router.push({name: 'admin-abstract-preview', params: {id: id}})
            },
            /**
             * Call back function on clicking the pagination numbers
             * Set page number to store and update the route query
             * @param page
             */
            clickCallBack: function (page) {
                // update the value in query string
                this.addRouteQuery('page', page);
                // update store
                this.$store.commit("setPage", page);
            },
            /**
             * Check if any fitlers or pagination applied
             * Add this to the currnet view
             * Fetch the details form the route
             */
            setFilter: function () {
                // get queries in the route
                let query = this.$route.query;
                // if page is in the query
                if ('page' in query) {
                    this.$store.commit("setPage", query.page);
                    this.$refs.paginateRef.selected = query.page;
                }
                // if search is in the query
                if ('search' in query) {
                    this.$store.commit("setSearch", query.search);
                }

                // if count of rows is in the query
                if ('count' in query) {
                    this.$store.commit("setPageRowCount", query.count);
                }

                // if filter is in the query
                if ('filter' in query) {
                    try {
                        let filter = JSON.parse(atob(query.filter));
                        this.$store.commit("setFilter", filter);
                    } catch (e) {
                        throw new Error(e);
                    }
                }
            },
            /**
             * Reset the pagination to 1
             */
            resetPagination: function () {
                // change the page number in store
                this.$store.commit("setPage", 1);
                // update the selected value in the plugin
                this.$refs.paginateRef.selected = 1;
                // update the query
                this.addRouteQuery('page', 1);
            },
            /**
             * Set sort key
             */
            setSort: function (key) {
                this.$store.commit("setSort", key);
            },
            deleteAbstract: function (id) {
                this.$store.commit("setConfirm", true);
                this.$store.commit("setRemoveData", {type: 'abstract', id: id});
            }
        },
        watch: {
            /**
             * Watch if searching
             */
            search: function () {
                // if the current page not 1
                if (this.page > 1) {
                    // init pagination
                    this.resetPagination();
                }
            },
            pageRowCount: function () {
                if (this.page > 1) {
                    // init pagination
                    this.resetPagination();
                }
            },
            filters: function () {
                if (this.page > 1) {
                    // init pagination
                    this.resetPagination();
                }
            },
            filteredAbstracts: {
                deep: true,
                handler: function (data) {
                    this.$emit('filtered', data)
                }
            },
            paginatedAbstracts: {
                deep: true,
                handler: function (data) {
                    this.$emit('paginate', data)
                }
            }
        }
    }
</script>

<style scoped>
    .empty-row {
        text-align: center;
    }
</style>
