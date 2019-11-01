<template>
    <div class="container">
        <!--        Submitted abstracts-->
        <header class="content-header with-icons">
            <h2><span> Abstracts</span>
                <button class="btn-export" @click="exportData" v-if="filteredIds.length > 0"><i class="icon-export"></i>
                </button>
            </h2>

            <div class="right-side control-box">
                <div class="counter-text">
                    <p>Showing {{currentPageOffset}} to {{currentPageLimit}} of {{filteredIds.length}} entries</p>
                </div>
                <div class="page-count-container">
                    <select class="page-count-list" v-model="pageRowCount">
                        <option v-for="count in pageCountOptions" :value="count">{{count}}</option>
                    </select>
                </div>
                <div class="search-container">
                    <form @submit.prevent.stop>
                        <input type="text" placeholder="Search.." name="search" class="search-item" v-model="searchKey">
                    </form>
                </div>
                <div class="filter">
                    <div class="count" v-if="filterCount>0">
                        <div class="count-num">{{filterCount}}</div>
                    </div>
                    <span class="filter-block" @click.prevent.stop="$store.commit('setFilterPanelStatus',true)"></span>
                </div>

                <div class="sort-block" :class="{'current':showSortList}" v-outsideClick="hideList">
                    <span class="sort-filter" @click="showSortList=!showSortList"></span>
                    <table-sort-list/>
                </div>
            </div>
        </header>
        <admin-abstract-table @filtered="filteredAbstracts" @paginate="paginatedAbstracts"/>
    </div>
</template>

<script>
    import AdminAbstractTable from "./AdminAbstractTable";
    import AbstractTable from "../dashboard/AbstractTable";
    import filter from "../../mixins/filter";
    import TableSortList from "./TableSortList";
    import directives from "../../mixins/directives";

    export default {
        name: "AdminAbstracts",
        components: {TableSortList, AbstractTable, AdminAbstractTable},
        mixins: [filter, directives],
        data: () => {
            return {
                timer: null,
                pageCountOptions: [10, 20, 50, 100],
                showSortList: false,
                filteredIds: [],
                paginatedEntries: []
            }
        },

        computed: {
            /**
             * Get the current page from store
             */
            page: function () {
                return this.$store.state.filter.keys.page;
            },
            /**
             * Get the count of filters applied from the store
             */
            filterCount: function () {
                let filter = this.$store.state.filter.keys.filter;
                return Object.keys(filter).length
            },
            /**
             * model bind for search
             */
            searchKey: {
                get: function () {
                    return this.$store.state.filter.keys.search;
                },
                set: function (value) {
                    // set the value to store with a timeout
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.addRouteQuery('search', value);
                        this.$store.commit("setSearch", value);
                    }, 500);
                }
            },
            pageRowCount: {
                get: function () {
                    return this.$store.state.filter.keys.page_row_count;
                },
                set: function (value) {
                    this.addRouteQuery('count', value);
                    this.$store.commit("setPageRowCount", value);
                }
            },
            currentPageLimit: function () {
                return this.paginatedEntries.length + ((this.page - 1) * this.pageRowCount);
            },
            currentPageOffset: function () {
                return this.currentPageLimit - this.paginatedEntries.length + 1;
            }
        },
        beforeMount() {
            this.fetchAbstracts();
        },
        methods: {
            fetchAbstracts: function () {
                this.$store.commit("setLoader", true);
                this.$store.dispatch("fetchAdminAbstracts")
                    .then(() => this.$store.commit("setLoader", false))
                    .catch(() => this.$store.commit("setLoader", false))
            },
            hideList: function () {
                this.showSortList = false;
            },
            exportData: function () {
                this.$store.dispatch("exportAbstracts", this.filteredIds);
            },
            filteredAbstracts: function (data) {
                this.filteredIds = data.map(d => d.id);
            },
            paginatedAbstracts: function (data) {
                this.paginatedEntries = data;
            }
        }
    }
</script>

<style scoped>
    .page-count-container {
        display: inline-block;
        vertical-align: middle;
    }

    .page-count-list {
        height: 36px;
    }
</style>
