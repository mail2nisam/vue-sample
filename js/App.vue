<template>
    <main style="position: relative;">
        <div class="loader" v-if="loader">
            <i class="loading"></i>
        </div>
        <notifications group="foo" position="top center"/>
        <router-view/>
    </main>
</template>

<script>
    import NavBar from "./components/common/NavBar";

    import Raven from 'raven-js';
    import RavenVue from 'raven-js/plugins/vue';
    import Vue from 'vue';

    export default {
        name: "App",
        components: {NavBar},
        computed: {
            loader: function () {
                return this.$store.state.sidePanel.loader;
            }
        },
        created() {
            //todo: un comment this once moving to production
            // if (process.env.NODE_ENV === 'production') {
            //     Raven
            //         .config('https://d62f91e1a8b642fbb58b8db2613d4bd4@sentry.io/1735806')
            //         .addPlugin(RavenVue, Vue)
            //         .install();
            // }
        }
    }
</script>

<style scoped>

</style>
