<template>
    <main>
        <div class="main-wrapper aligned-middle">
            <article class="main-contents-wrap">
                <div class="container container-small">
                    <div class="box-white">
                        <header class="box-center box-content">
                            <h2 v-if="error">This URL is expired.</h2>
                            <h2 v-else-if="serverError">Invalid token!</h2>
                            <h2 v-else-if="!success">Verifying user..</h2>
                            <h2 v-else-if="success">Verified, redirecting.</h2>
                        </header>
                    </div>
                </div>
            </article>
        </div>
    </main>
</template>

<script>
    export default {
        name: "Verify",
        data: () => {
            return {
                error: false,
                success: false,
                serverError: false
            }
        },
        created() {
            this.verify();
        },
        methods: {
            /**
             * Verify the url
             */
            verify: function () {
                if (this.$route.query && this.$route.query.token) {
                    this.$store.dispatch("verifyUserEmail", this.$route.query.token)
                        .then(
                            response => {
                                if (response.data.status) {
                                    this.success = true;
                                    setTimeout(() => {
                                        this.$notify({
                                            group: 'foo',
                                            title: 'Success',
                                            type: 'success',
                                            text: 'Successfully verified email!'
                                        });
                                        this.$router.push({name: 'login'})
                                    }, 1000);
                                } else {
                                    this.serverError = true;
                                }
                            }
                        )
                } else {
                    this.error = true;
                }
            }
        }
    }
</script>

<style scoped>
    .box-center {
        text-align: center;
    }

    .box-content h2 {
        padding: 100px;
        color: #007dc1;
    }
</style>
