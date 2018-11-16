<template>
	<div class="customer">
		<div class="pageTitleWrap">
			<page-address></page-address>
			<div><router-link to="/CustomerList/AddCustomer" class='halfCircular'><i class="el-icon-plus mR10"></i>新增下游客户</router-link></div>
		</div>
		<div class="pageContentWrap">
			<div class="pageContent-search">
				<el-form :model="Customer" ref="Customer" :inline="true">
					<el-form-item label="创建时间：" class='mB0'>
						<el-date-picker v-model="DateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change='HandleGetDate'></el-date-picker>
					</el-form-item>
					<el-form-item label="客户渠道：" class='mB0'>
						<el-input size="medium" v-model="Customer.orgName" class="w350" placeholder="请输入客户渠道名称"></el-input>
					</el-form-item>
					<el-form-item label="客户状态：" class='mB0'>
						<el-select v-model="Customer.isUsed" class="w350">
							<el-option v-for="item in customerOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class='mB0'>
						<el-button type="primary" size="medium" @click='HandleGetTableData'>查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="mT20">
				<i-table ref="itable" :index="index" :list="tableLists" :columns="columns" :operates="operates" :total="totalCount" @handlePageChange="handlePageChange"></i-table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				Customer: {
					startTime: '',
					endTime : '',
					orgName: '',
					isUsed: '',
					pageIndex: 1,
					pageSize: 10
				},
				DateRange: '',
				customerOptions: [
					{
						label: '全部',
						value: ''
					},
					{
						label: '使用中',
						value: 0,
					},
					{
						label: '已停用',
						value: 1,
					},
					{
						label: '余额不足',
						value: 2,
					}
				],
				tableLists: [],
				totalCount: 0,
				index: {show: true},
				columns: [
					{
						prop: 'orgName',
						label: '客户渠道'
					},
          {
            prop:"balance",
            label:"可用总额"
          },
					{
						prop: 'creditBalance',
						label: '实际余额（元）'
					},
					{
						prop: 'rechangeAmount',
						label: '充值总额（元）'
					},
					{
						prop: 'totalConsumption',
						label: '消费总额（元）'
					},
					{
						prop: 'productNum',
						label: '会员卡数量'
					},
					/*{
						prop: 'couponNumber',
						label: '优惠券数量'
					},*/
					{
						prop: 'createTime',
						label: '创建时间',
            minwidth:90
					},
					{
						prop: 'updateTime',
						label: '更新时间',
            minwidth:90
					},
					{
						prop: 'isUsedStatus',
						label: '状态'
					}
				],
				operates: {
					minwidth: 150,
					list: [
						{
							label: '充值',
							callback: (row) => {
								window.sessionStorage.setItem('JB_Customer_Recharge', JSON.stringify(row));
								this.$router.push('/CustomerList/CustomerRecharge');
							}
						},
						{
							label: '编辑',
							callback: (row) => {
								window.sessionStorage.setItem('JB_Customer_Edit', JSON.stringify(row))
								this.$router.push('/CustomerList/EditCustomer');
							}
						},
						{
							label: '停用',
							show: (row) => {
								if (row.isUsed === 0) {
									return true;
								} else {
									return false;
								}
							},
							callback: (row) => {
								this.HandleDisableOrEnable(row);
							}
						},
						{
							label: '启用',
							show: (row) => {
								if (row.isUsed === 1) {
									return true;
								} else {
									return false;
								}
							},
							callback: (row) => {
								this.HandleDisableOrEnable(row);
							}
						},
						{
							label: '配置会员卡',
							callback: (row) => {
								window.sessionStorage.setItem('JB_Customer_Membership', JSON.stringify(row))
								this.$router.push('/CustomerList/MembershipCard');
							}
						}
					]
				}
			}
		},

		created () {
			this.HandleFetchTableData();
		},

		activated () {
			this.HandleFetchTableData();
		},

		methods: {
			/*===获取日期===*/
			HandleGetDate (dateArr) {
				if (!dateArr) {
					this.Customer.startTime = this.Customer.endTime  = '';
				} else {
					this.Customer.startTime = dateArr[0] + ' 00:00:00';
					this.Customer.endTime  = dateArr[1] + ' 23:59:59';
				}
			},

			/*===获取页面数据===*/
			HandleFetchTableData () {
				const self = this;
				let url = self.URL.DownStreamCustomer.CustomerList.getCustomerList;
				let obj = {...self.Customer};
				self.API.GetEntity(url, obj)
				.then((res) => {
					self.tableLists = res.data.data;
					self.totalCount = res.data.totalCount;
				})
			},

			/*===查询===*/
			HandleGetTableData () {
				const self = this;
				self.Customer.pageIndex = 1;
				self.$refs.itable.tableCurrentPagination.Pcurrent = 1;
				self.Customer.pageSize = 10;
				self.$refs.itable.tableCurrentPagination.Psizes = 10;
				self.HandleFetchTableData();
			},

			/*===页码/页面条数改变时===*/
			handlePageChange (pagination) {
				this.Customer.pageIndex = (pagination.Pcurrent - 1) * pagination.Psizes + 1;
				this.Customer.pageSize = pagination.Psizes;
				this.HandleFetchTableData();
			},

			/*===停用/启用===*/
			HandleDisableOrEnable (row) {
				const self = this;
				let url = self.URL.DownStreamCustomer.CustomerList.disableOrEnableProduct;
				let obj = {
					orgId: row.orgId,
					isUsed: row.isUsed === 0 ? 1 : 0
				}
				let title = row.isUsed === 1 ? '您确定启用该下游客户？' : '您确定停用该下游客户？';
				self.$confirm(title, '确认提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        })
		        .then(() => {
		        	self.API.PostEntity(url ,obj)
					.then((res) => {
						self.HandleFetchTableData();
					})
		        })
		        .catch(() => {

		        })
			},
		}
	}
</script>

<style scoped></style>
