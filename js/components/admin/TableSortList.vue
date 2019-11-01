<template>
    <div class="sort-drpdwn">
        <template v-for="(title,sortKey) in titles">
            <div class="sort-list point-order" @click="setSort(sortKey)">{{title}}
                <div class="count" v-if="sort[sortKey]!==undefined">
                    <div class="count-num">{{Object.keys(sort).indexOf(sortKey)+1}}</div>
                </div>
                <div class="sort-order">
                    <div class="sort-increase"
                         :class="{'active':typeof sort[sortKey]!=='undefined' && sort[sortKey]==='asc'}">
                    </div>
                    <div class="sort-decrease"
                         :class="{'active':typeof sort[sortKey]!=='undefined' && sort[sortKey]==='desc'}">
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "TableSortList",
        data: () => {
            return {
                titles: {
                    id: 'ID',
                    status: 'Status',
                    submitter: 'Submitter',
                    company: 'Submitter Companay',
                    job_title: 'Submitter Job Title',
                    title: 'Abstract Title',
                    stream: 'Abstract Stream',
                    topic: 'Abstract Topic',
                    created_at: 'Created Date'
                }
            }
        },
        computed: {
            sort: function () {
                return this.$store.state.filter.keys.sort;
            },
        },
        methods: {
            setSort: function (key) {
                this.$store.commit("setSort", key);
            }
        }
    }
</script>

<style scoped>
    .sort-drpdwn .count {
        top: 2px;
        right: 20px;
    }
</style>
