const DocMenuConfig = [
    {
        pages: [
            {
                heading: 'dashboard',
                permission: 'dashboard',
                route: '/dashboard',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
        ],
    },
    {
        heading: 'Create Real estate Management',
        route: '/general',
        pages: [
            {
                heading: 'name.features',
                permission: 'features',
                route: '/general/features',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
            {
                heading: 'name.categories',
                permission: 'categories',
                route: '/general/categories',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
            {
                heading: 'name.real_estates',
                permission: 'real-estates',
                route: '/general/real-estates',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
        ]
    },
    {
        heading: 'Create agent Management',
        route: '/general',
        pages: [
            {
                heading: 'name.agents',
                permission: 'agents',
                route: '/general/agents',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
        ]
    },
    {
        heading: 'Request Management',
        route: '/general',
        pages: [
            {
                heading: 'name.bookings',
                permission: 'bookings',
                route: '/general/bookings',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
            {
                heading: 'name.funding-requests',
                permission: 'funding-requests',
                route: '/general/funding-requests',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
            {
                heading: 'name.contact-us',
                permission: 'contact-us',
                route: '/general/contact-us',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
        ]
    },
    {
        heading: 'general',
        route: '/general',
        pages: [
            {
                heading: 'name.countries',
                permission: 'countries',
                route: '/general/countries',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
            {
                heading: 'name.newsletters',
                permission: 'newsletters',
                route: '/general/newsletters',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
            {
                heading: 'name.faqs',
                permission: 'faqs',
                route: '/general/faqs',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
            {
                heading: 'name.pages',
                permission: 'pages',
                route: '/general/pages',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
            {
                heading: 'name.testimonials',
                permission: 'testimonials',
                route: '/general/testimonials',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
            {
                heading: 'name.partners',
                permission: 'partners',
                route: '/general/partners',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
        ],
    },
    {
        heading: 'ROLES & USERS',
        route: '/roles',
        pages: [
            {
                heading: 'name.roles',
                permission: 'roles',
                route: '/roles/roles',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
            {
                heading: 'name.users',
                permission: 'users',
                route: '/roles/users',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            },
        ],
    },
    {
        heading: 'settings',
        route: '/general',
        pages: [
            {
                heading: 'name.settings',
                permission: 'settings',
                route: '/general/settings',
                svgIcon: 'media/icons/duotune/art/art002.svg',
                fontIcon: 'bi-app-indicator',
            }
        ]
    },
];

export default DocMenuConfig;
