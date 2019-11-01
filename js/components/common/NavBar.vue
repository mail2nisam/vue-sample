<template>
    <!-- Side navigation -->
    <aside class="sidenav-wrap" :class="{'active':open}">
        <div class="logo-holder" v-if="$store.getters.isAdmin">
            <router-link :to="{name:'admin-abstracts'}" aria-label="Gastech logo">
                <img src="../../../images/gastech-logo.jpg" alt="Gastech Abstracts">
            </router-link>
        </div>
        <div class="logo-holder" v-else>
            <router-link :to="{name:'home'}" aria-label="Gastech logo">
                <img src="../../../images/gastech-logo.jpg" alt="Gastech Abstracts">
            </router-link>
        </div>


        <!--Admin nav-->
        <nav class="primary-nav" v-if="$store.getters.isAdmin">
            <ul>
                <li :class="{'active': $route.name ==='admin-abstracts' || $route.meta.parent==='admin-abstract'}">
                    <router-link :to="{name:'admin-abstracts'}">
                        <i class="icon icon-abstract">
                        </i>Abstracts
                    </router-link>
                </li>
                <li :class="{'active': $route.meta.parent==='reports'}">
                    <router-link :to="{name:'reports'}"><i class="icon icon-report"></i>Reports</router-link>
                </li>
            </ul>
        </nav>


        <!--User nav-->
        <nav class="primary-nav" v-else>
            <ul>
                <li :class="{'active':$route.meta.parent==='abstract' || $route.name ==='abstracts'}">
                    <router-link :to="{name:'abstracts'}">
                        <i class="icon icon-abstract">
                        </i>Abstracts
                    </router-link>
                    <ul v-if="$route.meta.parent==='abstract' && $route.name!=='abstract-preview'">
                        <li>
                            <a @click.prevent>
                                <i class="icon"
                                   :class="$route.name==='new-abstract' || $route.name==='edit-abstract'?'icon-tick':'icon-number'">1</i>Step
                                One</a>
                        </li>
                        <li>
                            <a @click.prevent>
                                <i class="icon"
                                   :class="$route.name==='author'?'icon-tick':'icon-number'">2</i>Step Two</a>
                        </li>
                        <li>
                            <a @click.prevent>
                                <i class="icon"
                                   :class="$route.name==='preview'?'icon-tick':'icon-number'">3</i>Step Three</a>
                        </li>
                    </ul>
                </li>
                <li :class="{'active':$route.name==='profile'}">
                    <router-link :to="{name:'profile'}">
                        <i class="icon icon-profile">
                        </i>My profile
                    </router-link>
                </li>
            </ul>
            <div class="aside-sub-row">
                <p style="margin-bottom: 5px;">If you have any questions around your submission please email us at
                    <a href="mailto:gastechsubmissions@gastechevent.com" target="_blank">gastechsubmissions@gastechevent.com</a>
                </p>
                <p style="margin-top:0;margin-bottom: 5px;">
                    <a href="https://www.gastechevent.com/conference/call-for-paper-brochure/" target="_blank">Download
                        Brochure</a>
                </p>
                <p style="margin-top:0;"><a href="https://www.gastechevent.com/conference/call-for-paper-brochure/"
                                            target="_blank">FAQs</a>
                </p>
            </div>

        </nav>
        <div class="nav-footer">
            <a href="#" @click.prevent="logout" class="btn-logout"><i>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
            </i>logout</a>
        </div>
    </aside>
</template>

<script>
    export default {
        name: "NavBar",
        props: ["open"],
        data: () => {
            return {
                root: document.location.origin
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch("logout")
                    .then(
                        response => {
                            this.$store.commit('setAuth', false);
                            this.$router.push({name: 'login'});
                        },
                        error => {
                            console.log('something went wrong');
                        }
                    )
            }
        }
    }
</script>

<style scoped>

</style>
