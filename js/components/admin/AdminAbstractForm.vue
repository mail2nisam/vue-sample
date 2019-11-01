<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "AdminAbstractForm",
        beforeMount() {
            if (this.$route.params && this.$route.params.id) {
                this.$store.dispatch('fetchAdminSingleFormData', this.$route.params.id);
            }else{
                this.$store.commit("initFormData");
            }
        },
        watch:{
            $route:function () {
                if (this.$route.params && this.$route.params.id) {
                    this.$store.dispatch('fetchAdminSingleFormData', this.$route.params.id);
                }else{
                    this.$store.commit("initFormData");
                }
            }
        }
    }
</script>

<style scoped>

</style>
