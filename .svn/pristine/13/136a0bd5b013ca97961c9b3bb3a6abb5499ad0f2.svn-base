import Vue from 'vue';
export default {
	install (Vue, options) {
    	Vue.prototype.URL = this;
	},

	//	登录/退出相关接口
	Login: {
		getVerificationCode: '/ccsp/login/getVerificationCode',	//	获取验证码
		login: '/ccsp/login',	//	登录接口
		signOut: '/ccsp/login/signOut'	//	安全退出
	},

	/*===上游产品管理相关接口 - 开始===*/
		UpStreamProduct: {
			//	会员卡管理
			VipCard: {
				/*===列表页面===*/
				getProductList: '/ccsp/upStream/getProductList',	//	5.2.4获取会员卡列表信息
				getOperators: '/ccsp/upStream/getOperators',	//	5.2.1获取供应商信息
				addProduct: '/ccsp/upStream/addProduct',	//	5.2.6新增产品
				editProduct: '/ccsp/upStream/editProduct',	//	5.2.7编辑产品

				/*===列表页面 - 停用/启用===*/
				disableOrEnableUpStreamProduct: '/ccsp/upStream/disableOrEnableUpStreamProduct',	//	5.2.8将产品置为停用/启用

				/*===列表页面 - 库存管理===*/
				getStock: '/ccsp/upStream/getStock',	//	5.2.9库存查询
				invalidStock: '/ccsp/upStream/invalidStock',	//	5.2.10作废批次库存
				exportStock: '/ccsp/upStream/exportStock',	//	5.2.11导出未使用库存
				exportTemplate: '/ccsp/upStream/exportTemplate',	//	5.2.13库存模板
				addStock: '/ccsp/upStream/addStock',	//	5.2.12添加库存
			}
		},
	/*===上游产品管理相关接口 - 结束===*/

	/*===下游客户列表相关接口 - 开始===*/
		DownStreamCustomer: {
			//	客户列表
			CustomerList: {
				/*列表页面*/
				getCustomerList: '/ccsp/downStream/getCustomerList',	//	5.3.1获取客户列表
				getCustomerAllOrg: '/ccsp/downStream/getCustomerAllOrg',	//	5.3.2获取客户全部渠道
				getCustomerOrg: '/ccsp/downStream/getCustomerOrg',	//	5.3.3获取客户渠道、及其子渠道
				addCustomer: '/ccsp/downStream/addCustomer',	//	5.3.5新增下游客户
				editCustomer: '/ccsp/downStream/editCustomer',	//	5.3.6编辑下游客户
				disableOrEnableProduct: '/ccsp/downStream/disableOrEnableProduct',	//	5.3.13下游渠道停用/启用

				/*充值页面*/
				getOrgBalance: '/ccsp/downStream/getOrgBalance',	//	5.3.7获取渠道可用余额、实际余额
				setCreditAmount: '/ccsp/downStream/setCreditAmount',	//	5.3.8设置授信额度
				customerRechange: '/ccsp/downStream/customerRechange',	//	5.3.9客户充值（余额充值、余额扣减）
				getOperationRecord: '/ccsp/downStream/getOperationRecord',	//	5.3.10获取登录用户操作记录

				/*配置会员卡页面*/
				getVIPList: '/ccsp/downStream/getVIPList',	//	5.3.11获取会员卡列表
				updateProductStatus: '/ccsp/downStream/updateProductStatus',	//	5.3.13下游渠道停用/启用
				removeProduct: '/ccsp/downStream/removeProduct',	//	5.3.16从列表中移除产品
				setTemplate: '/ccsp/downStream/setTemplate',	//	5.3.15下游产品定制短信模板
				getProductListByAdd: '/ccsp/upStream/getProductListByAdd',	//	获取下游产品
				addOrUpdateVIP: '/ccsp/downStream/addOrUpdateVIP',	//	5.3.12下游添加产品
			}
		},
	/*===下游客户列表相关接口 - 结束===*/

	/*===下游订单管理相关接口 - 开始===*/
		DownStreamOrder: {
			//	会员卡订单
			VipCardOrders: {
				/*===列表页面===*/
				getCurrentAllOrg: '/ccsp/order/getCurrentAllOrg',	//	5.4.3获取当前所有下游客户渠道
				getOrderInfo: '/ccsp/order/getOrderInfo',	//	5.4.1获取订单信息

				/*===列表页面 - 导出订单===*/
				exportOrderInfo: '/ccsp/order/exportOrderInfo',	//	5.4.4导出订单

				/*===列表页面 - 重新发送===*/
				retransmission: '/ccsp/order/retransmission',	//	5.4.5重新发送

				/*===列表页面 - 退款===*/
				balanceRefund: '/ccsp/order/balanceRefund',	//	5.46退款
        orderQuery: '/ccsp/order/orderQuery',	//	5.4.7手动查询
        manualBack: '/ccsp/order/manualBack',	//	5.4.8手动回调
        continueSend: '/ccsp/order/continueSend',	//	5.4.9继续发送、发送短信、重试
        sendSMS: '/ccsp/order/sendSMS',	//	5.4.10发送短信
			}
		}
	/*===下游订单管理相关接口 - 结束===*/
}
