export const constentRoute = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            icon: 'StarFilled',
            hidden: true
        },
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/',
        name: 'layout',
        meta: {
            title: '',
            icon: ''
        },
        redirect: '/home',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }

        ]
    },
    {
        path: '/system',
        component: () => import('@/layout/index.vue'),
        name: 'System',
        meta: {
            title: '系统管理',
            icon: 'Setting',
        },
        redirect: '/system/user',
        children: [
            {
                path: '/system/user',
                component: () => import('@/views/systemManage/user/index.vue'),
                name: 'SysUser',
                meta: {
                    icon: 'UserFilled',
                    title: '用户管理'
                }
            },
            {
                path: '/system/post',
                component: () => import('@/views/systemManage/post/index.vue'),
                name: 'Post',
                meta: {
                    icon: 'Postcard',
                    title: '岗位管理',
                }
            }
        ]
    },
    {
        path: '/apartment',
        component: () => import('@/layout/index.vue'),
        name: 'Apartment',
        meta: {
            title: '公寓管理',
            icon: 'OfficeBuilding',
        },
        redirect: '/apartment/apart',
        children: [
            {
                path: '/apartment/apart',
                component: () => import('@/views/apartManage/apartment/index.vue'),
                name: 'Apart',
                meta: {
                    icon: 'OfficeBuilding',
                    title: '公寓管理',
                },
            },
            {
                path: '/apartment/apart/addOrUpdatePage',
                name: "addOrUpdatePage",
                component: () => import('@/views/apartManage/apartment/component/index.vue'),
                meta: {
                    icon: 'OfficeBuilding',
                    title: '公寓管理',
                    hidden: true,
                    activeMenu: "/apartment/apart"
                },
            },
            {
                path: '/apartment/room',
                component: () => import('@/views/apartManage/room/index.vue'),
                name: 'Room',
                meta: {
                    icon: 'House',
                    title: '房间管理',
                }
            },
            {
                path: '/apartment/apart/AddOrUpdateRoom',
                name: "AddOrUpdateRoom",
                component: () => import('@/views/apartManage/room/component/index.vue'),
                meta: {
                    icon: 'House',
                    title: '公寓管理',
                    hidden: true,
                    activeMenu: '/apartment/room'
                },
            },
            {
                path: '/apartment/attribute',
                component: () => import('@/views/apartManage/attribute/index.vue'),
                name: 'Attribute',
                meta: {
                    icon: 'Tickets',
                    title: '属性管理',
                }
            }
        ]

    },
    {
        path: '/leasement',
        component: () => import('@/layout/index.vue'),
        name: 'Leasement',
        meta: {
            title: '租赁管理',
            icon: 'Management',
        },
        redirect: '/leasement/reservation',
        children: [
            {
                path: '/leasement/reservation',
                component: () => import('@/views/leaseManage/reservation/index.vue'),
                name: 'Reservation',
                meta: {
                    icon: 'Clock',
                    title: '看房预约管理',
                }
            },
            {
                path: '/leasement/lease',
                component: () => import('@/views/leaseManage/lease/index.vue'),
                name: 'Lease',
                meta: {
                    icon: 'DocumentRemove',
                    title: '租约管理',
                }
            },
        ]
    },
    {
        path: '/usermanage',
        name: 'Usermanage',
        meta: {
            title: '',
            icon: 'User'
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/user',
                name: 'User',
                meta: {
                    title: '用户管理',
                    icon: 'User'
                },
                component: () => import('@/views/userManage/index.vue'),
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
        meta: {
            title: '404',
            hidden: true,
            icon: 'DCaret'
        }
    },
    {
        // 捕获所有未匹配的路径
        path: '/:patchMatch(.*)',
        name: 'any',
        redirct: '/404',
        component: () => import('@/views/404/index.vue'),
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'Rank'
        }
    }
]