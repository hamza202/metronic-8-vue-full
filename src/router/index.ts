import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import store from '@/store';
import {Actions, Mutations} from '@/store/enums/StoreEnums';
import JwtService from "@/core/services/JwtService";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/dashboard',
        component: () => import('@/layout/Layout.vue'),
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    resource: 'dashboard',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/Dashboard.vue'),
            },
            {
                path: '/general/countries',
                name: 'countries',
                meta: {
                    resource: 'countries',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/countries/list.vue'),
            },
            {
                path: '/countries/add',
                name: 'add-country',
                meta: {
                    resource: 'countries',
                    permission: {
                        parent: 'countries',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/countries/Add.vue'),
            },
            {
                path: '/countries/:resourceId/edit',
                name: 'edit-country',
                meta: {
                    resource: 'countries',
                    permission: {
                        parent: 'countries',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/countries/Add.vue'),
            },

            {
                path: '/general/features',
                name: 'features',
                meta: {
                    resource: 'features',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/features/list.vue'),
            },
            {
                path: '/features/add',
                name: 'add-feature',
                meta: {
                    resource: 'features',
                    permission: {
                        parent: 'features',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/features/Add.vue'),
            },
            {
                path: '/features/:resourceId/edit',
                name: 'edit-feature',
                meta: {
                    resource: 'features',
                    permission: {
                        parent: 'features',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/features/Add.vue'),
            },
            {
                path: '/general/categories',
                name: 'categories',
                meta: {
                    resource: 'categories',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/categories/list.vue'),
            },
            {
                path: '/categories/add',
                name: 'add-category',
                meta: {
                    resource: 'categories',
                    permission: {
                        parent: 'categories',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/categories/Add.vue'),
            },
            {
                path: '/categories/:resourceId/edit',
                name: 'edit-category',
                meta: {
                    resource: 'categories',
                    permission: {
                        parent: 'categories',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/categories/Add.vue'),
            },

            {
                path: '/general/agents',
                name: 'agents',
                meta: {
                    resource: 'agents',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/agents/list.vue'),
            },
            {
                path: '/agents/add',
                name: 'add-agent',
                meta: {
                    resource: 'agents',
                    permission: {
                        parent: 'agents',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/agents/Add.vue'),
            },
            {
                path: '/agents/:resourceId/edit',
                name: 'edit-agent',
                meta: {
                    resource: 'agents',
                    permission: {
                        parent: 'agents',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/agents/Add.vue'),
            },

            {
                path: '/general/real-estates',
                name: 'real-estates',
                meta: {
                    resource: 'real-estates',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/real-estates/list.vue'),
            },
            {
                path: '/real-estates/add',
                name: 'add-real-estate',
                meta: {
                    resource: 'real-estates',
                    permission: {
                        parent: 'real-estates',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/real-estates/Add.vue'),
            },
            {
                path: '/real-estates/:resourceId/edit',
                name: 'edit-real-estate',
                meta: {
                    resource: 'real-estates',
                    permission: {
                        parent: 'real-estates',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/real-estates/Add.vue'),
            },
            {
                path: '/general/real-estates/details/:resourceId',
                name: 'details-real-estate',
                meta: {
                    resource: 'real-estates',
                    permission: {
                        parent: 'real-estates',
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/real-estates/details.vue'),
            },
            {
                path: '/countries/:country_id/regions/',
                name: 'regions',
                meta: {
                    resource: 'regions',
                    pageTitle: 'Regions',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/countries/regions/list.vue'),
            },
            {
                path: '/countries/:country_id/regions/add',
                name: 'add-region',
                meta: {
                    resource: 'regions',
                    pageTitle: 'Add Regions',
                    type: 'add',
                    permission: {
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/countries/regions/Add.vue'),
            },
            {
                path: '/countries/:country_id/regions/:resourceId/edit',
                name: 'edit-region',
                meta: {
                    resource: 'regions',
                    permission: {
                        parent: 'regions',
                        action: 'can_create',
                        type: 'edit',
                    },
                },
                component: () => import('@/views/general/countries/regions/Add.vue'),
            },
            {
                path: '/countries/:country_id/cities/:region_id',
                name: 'cities',
                meta: {
                    resource: 'cities',
                    pageTitle: 'Cities',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/countries/cities/list.vue'),
            },
            {
                path: '/countries/:country_id/cities/:region_id/add',
                name: 'add-city',
                meta: {
                    resource: 'cities',
                    pageTitle: 'Add Cities',
                    type: 'add',
                    permission: {
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/countries/cities/Add.vue'),
            },
            {
                path: '/countries/:country_id/cities/:region_id/:resourceId/edit',
                name: 'edit-city',
                meta: {
                    resource: 'cities',
                    pageTitle: 'Edit Cities',
                    type: 'edit',
                    permission: {
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/countries/cities/Add.vue'),
            },
            {
                path: '/general/settings',
                name: 'settings',
                meta: {
                    resource: 'settings',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/settings/form.vue'),
            },
            {
                path: '/general/bookings',
                name: 'bookings',
                meta: {
                    resource: 'bookings',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/bookings/list.vue'),
            },
            {
                path: '/general/bookings/details/:resourceId',
                name: 'details-booking',
                meta: {
                    resource: 'bookings',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/bookings/details.vue'),
            },
            {
                path: '/bookings/:resourceId/edit',
                name: 'edit-booking',
                meta: {
                    resource: 'bookings',
                    permission: {
                        parent: 'bookings',
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/bookings/list.vue'),
            },

            {
                path: '/general/faqs',
                name: 'faqs',
                meta: {
                    resource: 'faqs',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/faqs/list.vue'),
            },
            {
                path: '/faqs/add',
                name: 'add-faq',
                meta: {
                    resource: 'faqs',
                    permission: {
                        parent: 'faqs',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/faqs/Add.vue'),
            },
            {
                path: '/faqs/:resourceId/edit',
                name: 'edit-faq',
                meta: {
                    resource: 'faqs',
                    permission: {
                        parent: 'faqs',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/faqs/Add.vue'),
            },

            {
                path: '/general/funding-requests',
                name: 'funding-requests',
                meta: {
                    resource: 'funding-requests',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/funding-requests/list.vue'),
            },
            {
                path: '/general/funding-requests/details/:resourceId',
                name: 'details-funding-request',
                meta: {
                    resource: 'funding-requests',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/funding-requests/details.vue'),
            },
            {
                path: '/general/contact-us',
                name: 'contact-us',
                meta: {
                    resource: 'contact-us',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/contact-us/list.vue'),
            },
            {
                path: '/general/contact-us/details/:resourceId',
                name: 'details-contact-us',
                meta: {
                    resource: 'contact-us',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/contact-us/details.vue'),
            },
            {
                path: '/general/newsletters',
                name: 'newsletters',
                meta: {
                    resource: 'newsletters',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/newsletters/list.vue'),
            },
            {
                path: '/general/pages',
                name: 'pages',
                meta: {
                    resource: 'pages',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/pages/list.vue'),
            },
            {
                path: '/pages/add',
                name: 'add-page',
                meta: {
                    resource: 'pages',
                    permission: {
                        parent: 'pages',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/pages/Add.vue'),
            },
            {
                path: '/pages/:resourceId/edit',
                name: 'edit-page',
                meta: {
                    resource: 'pages',
                    permission: {
                        parent: 'pages',
                        action: 'can_update',
                    },
                },
                component: () => import('@/views/general/pages/Add.vue'),
            },

            {
                path: '/general/testimonials',
                name: 'testimonials',
                meta: {
                    resource: 'testimonials',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/testimonials/list.vue'),
            },
            {
                path: '/testimonials/add',
                name: 'add-testimonial',
                meta: {
                    resource: 'testimonials',
                    permission: {
                        parent: 'testimonials',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/testimonials/Add.vue'),
            },
            {
                path: '/testimonials/:resourceId/edit',
                name: 'edit-testimonial',
                meta: {
                    resource: 'testimonials',
                    permission: {
                        parent: 'testimonials',
                        action: 'can_update',
                    },
                },
                component: () => import('@/views/general/testimonials/Add.vue'),
            },

            {
                path: '/general/partners',
                name: 'partners',
                meta: {
                    resource: 'partners',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/general/partners/list.vue'),
            },
            {
                path: '/partners/add',
                name: 'add-partner',
                meta: {
                    resource: 'partners',
                    permission: {
                        parent: 'partners',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/general/partners/Add.vue'),
            },
            {
                path: '/partners/:resourceId/edit',
                name: 'edit-partner',
                meta: {
                    resource: 'partners',
                    permission: {
                        parent: 'partners',
                        action: 'can_update',
                    },
                },
                component: () => import('@/views/general/partners/Add.vue'),
            },

            {
                path: 'roles/roles',
                name: 'roles',
                meta: {
                    resource: 'roles',
                    pageTitle: 'Roles',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/roles/roles/list.vue'),
            },
            {
                path: '/roles/add',
                name: 'add-roles',
                meta: {
                    resource: 'roles',
                    permission: {
                        parent: 'roles',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/roles/roles/Add.vue'),
            },
            {
                path: '/roles/:resourceId/edit',
                name: 'edit-roles',
                meta: {
                    resource: 'roles',
                    permission: {
                        parent: 'roles',
                        action: 'can_update',
                    },
                },
                component: () => import('@/views/roles/roles/Add.vue'),
            },
            {
                path: 'roles/users',
                name: 'users',
                meta: {
                    resource: 'users',
                    pageTitle: 'Users',
                    permission: {
                        action: 'can_view',
                    },
                },
                component: () => import('@/views/roles/users/list.vue'),
            },
            {
                path: '/users/add',
                name: 'add-user',
                meta: {
                    resource: 'users',
                    permission: {
                        parent: 'roles',
                        action: 'can_create',
                    },
                },
                component: () => import('@/views/roles/users/Add.vue'),
            },
            {
                path: '/users/:resourceId/edit',
                name: 'edit-user',
                meta: {
                    resource: 'users',
                    permission: {
                        parent: 'users',
                        action: 'can_update',
                    },
                },
                component: () => import('@/views/roles/users/Add.vue'),
            }
        ],
    },
    {
        path: '/',
        component: () => import('@/components/page-layouts/Auth.vue'),
        children: [
            {
                path: '/sign-in',
                name: 'sign-in',
                meta: {
                    permission: {
                        action: 'allow',
                    },
                },
                component: () => import('@/views/authentication/SignIn.vue'),
            },
        ],
    },
    {
        // the 404 route, when none of the above matches
        path: '/404',
        name: '404',
        component: () => import('@/views/authentication/Error404.vue'),
    },
    {
        path: '/500',
        name: '500',
        component: () => import('@/views/authentication/Error500.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to) => {
    const permissions = JSON.parse(JwtService.getPermissions() as string) || {};
    if (permissions && Object.keys(permissions).length != 0) {
        const metaPermissions = to.meta?.permission as object || {};
        const action = metaPermissions['action'] || '';
        if (action != 'allow') {
            const resource = to.meta.resource as string || ''
            if (resource != '') {
                const access = permissions[resource][action] as boolean || false
                if (!access && Object.keys(metaPermissions).length != 0) {
                    router.push("/404")
                }
            }
        } else {
            router.push("/dashboard")
        }
    }
    // reset config to initial state
    store.commit(Mutations.RESET_LAYOUT_CONFIG);
    store.dispatch(Actions.VERIFY_AUTH);

    // Scroll page to top on every route change
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

export default router;
