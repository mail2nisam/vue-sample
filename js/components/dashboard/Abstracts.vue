<template>
    <div class="container">
        <!--        Submitted abstracts-->
        <header class="content-header">
            <h2>Abstracts</h2>
            <div class="right-side control-box">
                <a href="" @click.prevent="redirectToAbstractForm" class="btn-primary">Create Abstract</a>
            </div>
        </header>
        <abstract-table :abstracts="abstracts"/>
    </div>
</template>

<script>
    import AbstractTable from "./AbstractTable";

    export default {
        name: "Abstracts",
        components: {AbstractTable},
        computed: {
            abstracts: function () {
                return this.$store.state.data.abstracts;
            }
        },
        beforeMount() {
            this.fetchAbstractList();
        },
        methods: {
            /**
             * Get the list of forms
             */
            fetchAbstractList: function () {
                this.$store.commit("setLoader", true);
                this.$store.dispatch('fetchAbstracts')
                    .then(() => this.$store.commit("setLoader", false))
                    .catch(() => this.$store.commit("setLoader", false))
            },
            redirectToAbstractForm: function () {
                this.$router.push({name: "form"});
            }
        }
    }
</script>

<style scoped>
</style>
