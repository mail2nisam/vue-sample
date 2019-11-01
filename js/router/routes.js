import Home from "../components/Home";
// import HomeDemo from "../components/HomeDemo";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Abstracts from "../components/dashboard/Abstracts";
import Profile from "../components/dashboard/Profile";
import AbstractForms from "../components/dashboard/AbstractForms";
import Abstract from "../components/dashboard/abstract-forms/Abstract";
import Author from "../components/dashboard/abstract-forms/Author";
import FinalPreview from "../components/dashboard/abstract-forms/FinalPreview";
import Verify from "../components/auth/Verify";
import ForgotPassword from "../components/auth/ForgotPassword";
import UpdatePassword from "../components/auth/UpdatePassword";
import AdminAbstracts from "../components/admin/AdminAbstracts";
import PageNotFound from "../components/common/PageNotFound";
import AdminAbstractForm from "../components/admin/AdminAbstractForm";
import AdminHome from "../components/AdminHome";
import AdminAbstract from "../components/admin/abstract-forms/AdminAbstract";
import AdminAuthor from "../components/admin/abstract-forms/AdminAuthor";
import AdminFinalPreview from "../components/admin/abstract-forms/AdminFinalPreview";
import Reports from "../components/admin/Reports";

export const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            public: true,
            disableIfLoggedIn: true
        }
    },
    {
        path: '/forgot/password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            public: true,
            disableIfLoggedIn: true
        }
    },
    {
        path: '/reset/password',
        name: 'update-password',
        component: UpdatePassword,
        meta: {
            public: true,
            disableIfLoggedIn: true
        }
    },
    {
        path: '/verify/email',
        name: 'verify',
        component: Verify,
        meta: {
            public: true,
            disableIfLoggedIn: true
        }
    },
    // {
    //     path: '/demo',
    //     name: 'demo',
    //     component: HomeDemo,
    //     meta: {
    //         public: true,
    //         disableIfLoggedIn: true
    //     }
    // },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            public: true,
            disableIfLoggedIn: true
        }
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        redirect: {name: "abstracts"},
        children: [
            {
                path: 'abstracts',
                name: 'abstracts',
                component: Abstracts,
            },
            {
                path: 'profile',
                name: 'profile',
                component: Profile
            },
            {
                path: 'abstract',
                name: 'form',
                component: AbstractForms,
                redirect: {name: "new-abstract"},
                children: [
                    {
                        path: 'create/1',
                        name: 'new-abstract',
                        component: Abstract,
                        meta: {
                            parent: 'abstract'
                        }
                    },
                    {
                        path: ':id/update/1',
                        name: 'edit-abstract',
                        component: Abstract,
                        meta: {
                            parent: 'abstract'
                        }
                    },
                    {
                        path: ':id/update/2',
                        name: 'author',
                        component: Author,
                        meta: {
                            parent: 'abstract'
                        }
                    },
                    {
                        path: ':id/update/3',
                        name: 'preview',
                        component: FinalPreview,
                        meta: {
                            parent: 'abstract'
                        }
                    },
                    {
                        path: ':id/preview',
                        name: 'abstract-preview',
                        component: FinalPreview,
                        meta: {
                            parent: 'abstract'
                        }
                    },
                ]
            },
        ]
    },
    //===================Admin======================//
    {
        path: '/admin',
        name: 'admin-home',
        component: AdminHome,
        redirect: {name: "admin-abstracts"},
        children: [
            {
                path: 'abstracts',
                name: 'admin-abstracts',
                component: AdminAbstracts,
            },
            {
                path: 'abstract',
                name: 'admin-form',
                component: AdminAbstractForm,
                children: [
                    {
                        path: ':id/update/1',
                        name: 'admin-edit-abstract',
                        component: AdminAbstract,
                        meta: {
                            parent: 'admin-abstract'
                        }
                    },
                    {
                        path: ':id/update/2',
                        name: 'admin-author',
                        component: AdminAuthor,
                        meta: {
                            parent: 'admin-abstract'
                        }
                    },
                    {
                        path: ':id/update/3',
                        name: 'admin-preview',
                        component: AdminFinalPreview,
                        meta: {
                            parent: 'admin-abstract'
                        }
                    },
                    {
                        path: ':id/preview',
                        name: 'admin-abstract-preview',
                        component: AdminFinalPreview,
                        meta: {
                            parent: 'admin-abstract'
                        }
                    }
                ]
            },
            {
                path: 'reports',
                name: 'reports',
                component: Reports,
                meta: {
                    parent: 'reports'
                }
            },
            {
                path: "/page/not-found",
                component: PageNotFound,
                name: '404'
            },
        ]
    },
    {path: "*", component: PageNotFound}
];
