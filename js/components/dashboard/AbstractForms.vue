<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "AbstractForms",
        beforeMount() {
            if (this.$route.params && this.$route.params.id) {
                this.$store.commit("setLoader", true);
                this.$store.dispatch('fetchSingleFormData', this.$route.params.id)
                    .then(
                        () => {
                            this.$store.commit("setLoader", false);
                        }
                    )
                    .catch(
                        () => {
                            this.$store.commit("setLoader", false);
                        }
                    )
            } else {
                this.$store.commit("initFormData");
            }
        },
        watch: {
            $route: function () {
                if (this.$route.params && this.$route.params.id) {
                    this.$store.dispatch('fetchSingleFormData', this.$route.params.id);
                } else {
                    this.$store.commit("initFormData");
                }
            }
        }
    }
</script>

<style scoped>

</style>
