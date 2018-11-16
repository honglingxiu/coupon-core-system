import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const vueRouter = new Router({
	routes: [
		{
            path: '/',
            redirect: '/Login'		// 重定向login
        },
        {
            path: '/Login',
            name: 'Login',
            component: resolve => require(['../components/pages/Login.vue'], resolve)       // 登录
        },
        {
            path: '/',
            component: resolve => require(['../components/pages/Container.vue'], resolve),      // 公共部分(顶部和左侧菜单)
            children: [
                {
                    path: '/VipCard',
                    component: resolve => require(['../components/pages/UpStreamProduct/VipCard/Index.vue'], resolve),
                    children: [
                        {
                            path: '/VipCard',
                            name: 'VipCard',
                            meta: {
                                address: '上游产品管理 / 会员卡管理',
                                keepAlive: true,
                                level: 'VipCard'
                            },
                            component: resolve => require(['../components/pages/UpStreamProduct/VipCard/VipCard.vue'], resolve)   // 上游管理 - 会员卡管理
                        },
                        {
                            path: '/VipCard/AddProduct',
                            name: 'AddProduct',
                            meta: {
                                address: '上游产品管理 / 会员卡管理 / 新增产品',
                                keepAlive: false,
                                level: 'VipCard'
                            },
                            component: resolve => require(['../components/pages/UpStreamProduct/VipCard/AddProduct.vue'], resolve)   // 上游管理 - 会员卡管理 - 新增产品
                        },
                        {
                            path: '/VipCard/EditProduct',
                            name: 'EditProduct',
                            meta: {
                                address: '上游产品管理 / 会员卡管理 / 编辑产品',
                                keepAlive: false,
                                level: 'VipCard'
                            },
                            component: resolve => require(['../components/pages/UpStreamProduct/VipCard/AddProduct.vue'], resolve)   // 上游管理 - 会员卡管理 - 编辑产品
                        },
                        {
                            path: '/VipCard/StockManage',
                            name: 'StockManage',
                            meta: {
                                address: '上游产品管理 / 会员卡管理 / 库存管理',
                                keepAlive: false,
                                level: 'VipCard'
                            },
                            component: resolve => require(['../components/pages/UpStreamProduct/VipCard/StockManage.vue'], resolve)   // 上游管理 - 会员卡管理 - 库存管理
                        },
                    ]
                },
                {
                    path: '/CustomerList',
                    component: resolve => require(['../components/pages/DownStreamCustomer/Customer/Index.vue'], resolve),
                    children: [
                        /*===下游客户管理 - 客户列表===*/
                        {
                            path: '/CustomerList',
                            name: 'CustomerList',
                            meta: {
                                address: '下游客户管理 / 客户列表',
                                keepAlive: true,
                                level: 'CustomerList'
                            },
                            component: resolve => require(['../components/pages/DownStreamCustomer/Customer/CustomerList.vue'], resolve)   // 下游客户管理 - 客户列表
                        },
                        {
                            path: '/CustomerList/CustomerRecharge',
                            name: 'CustomerRecharge',
                            meta: {
                                address: '下游客户管理 / 客户列表 / 客户充值',
                                keepAlive: false,
                                level: 'CustomerList'
                            },
                            component: resolve => require(['../components/pages/DownStreamCustomer/Customer/CustomerRecharge.vue'], resolve)   // 下游客户管理 - 客户列表 - 客户充值
                        },
                        {
                            path: '/CustomerList/AddCustomer',
                            name: 'AddCustomer',
                            meta: {
                                address: '下游客户管理 / 客户列表 / 新增下游客户',
                                keepAlive: false,
                                level: 'CustomerList'
                            },
                            component: resolve => require(['../components/pages/DownStreamCustomer/Customer/AddCustomer.vue'], resolve)   // 下游客户管理 - 客户列表 - 新增下游客户
                        },
                        {
                            path: '/CustomerList/EditCustomer',
                            name: 'EditCustomer',
                            meta: {
                                address: '下游客户管理 / 客户列表 / 编辑下游客户',
                                keepAlive: false,
                                level: 'CustomerList'
                            },
                            component: resolve => require(['../components/pages/DownStreamCustomer/Customer/AddCustomer.vue'], resolve)   // 下游客户管理 - 客户列表 - 编辑下游客户
                        },
                        {
                            path: '/CustomerList/MembershipCard',
                            name: 'MembershipCard',
                            meta: {
                                address: '下游客户管理 / 客户列表 / 配置会员卡',
                                keepAlive: false,
                                level: 'CustomerList'
                            },
                            component: resolve => require(['../components/pages/DownStreamCustomer/Customer/MembershipCard.vue'], resolve)   // 下游客户管理 - 客户列表 - 配置会员卡
                        },
                    ]
                },
                {
                    path: '/VipCardOrders',
                    component: resolve => require(['../components/pages/DownStreamOrder/VipCardOrders/Index.vue'], resolve),
                    children: [
                        /*===下游订单管理 - 会员卡订单===*/
                        {
                            path: '/VipCardOrders',
                            name: 'VipCardOrders',
                            meta: {
                                address: '下游订单管理 / 会员卡订单',
                                keepAlive: true,
                                level: 'VipCardOrders'
                            },
                            component: resolve => require(['../components/pages/DownStreamOrder/VipCardOrders/VipCardOrders.vue'], resolve)   // 下游订单管理 - 会员卡订单
                        },
                        {
                            path: '/VipCardOrders/OrderDetails',
                            name: 'OrderDetails',
                            meta: {
                                address: '下游订单管理 / 会员卡订单 / 订单详情',
                                keepAlive: false,
                                level: 'VipCardOrders'
                            },
                            component: resolve => require(['../components/pages/DownStreamOrder/VipCardOrders/OrderDetails.vue'], resolve)   // 下游订单管理 - 会员卡订单 - 订单详情
                        }
                    ]
                }
            ]
        }
	]
});

vueRouter.beforeEach((to, from, next) => {
    next();
});

export default vueRouter;
