<!-- 列表页 -->
<template>
	<div class="vipCard">
		<div class="pageTitleWrap">
			<page-address></page-address>
			<div>
				<router-link to="/VipCard/AddProduct" class='halfCircular'>
					<i class="el-icon-plus mR10"></i>新增产品
				</router-link>
			</div>
		</div>
		<div class="pageContentWrap">
			<div class="pageContent-search">
				<el-form :model="vipSearch" ref="vipSearch" :inline="true">
					<el-form-item label="创建时间：">
						<el-date-picker size="medium" v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change='HandleGetDate'></el-date-picker>
					</el-form-item>
					<el-form-item label="产品名称：">
						<el-input size="medium" placeholder='请输入产品名称' v-model="vipSearch.productName" class='w350'></el-input>
					</el-form-item>
					<el-form-item label="供 应 商 ：">
						<el-select size="medium" v-model="vipSearch.supplierNum" class='w350'>
							<el-option v-for="item in supplierOptions" :key="item.supplierNum" :label="item.supplier" :value="item.supplierNum"></el-option>
						</el-select>
					</el-form-item>
					<br>
					<el-form-item label="接入方式：" class='mB0'>
						<el-select size="medium" v-model="vipSearch.dockingType" class='w350'>
							<el-option v-for="item in dockingOptions" :key="item.dockingType" :label="item.dockingTypeName" :value="item.dockingType"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="充值方式：" class='mB0'>
						<el-select size="medium" v-model="vipSearch.rechargeType" class='w350'>
							<el-option v-for="item in rechargOptions" :key="item.rechangeType" :label="item.rechangeTypeName" :value="item.rechangeType"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="产品状态：" class='mB0'>
						<el-select size="medium" v-model="vipSearch.isUsed" class='w150'>
							<el-option v-for="item in isUsedOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class='mB0'>
						<el-button type="primary" size="medium" @click='HandleSearch'>查询</el-button>
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
				vipSearch: {
					startTime: '1970-01-01 00:00:00',
					endTime: '', 
					supplierNum: '',
					productName: '',
					dockingType: '',
					rechargeType: '',
					isUsed: '',
					pageIndex: 1,
					pageSize: 10
				},
				dateRange: '',
				supplierOptions: [],
				dockingOptions: [
					{
						dockingType: '',
						dockingTypeName: '全部'
					},
					{
						dockingType: 'api',
						dockingTypeName: 'API对接'
					},
					{
						dockingType: 'page',
						dockingTypeName: "自有库存"
					}
				],
				rechargOptions: [
					{
						rechangeType: '',
						rechangeTypeName: '全部'
					},
					{
						rechangeType: 'direct',
						rechangeTypeName: '自动充值'
					},
					{
						rechangeType: 'pwd',
						rechangeTypeName: '卡密充值'
					}
				],
				isUsedOptions: [
					{
						label: '全部',
						value: ''
					},
					{
						label: '使用中',
						value: '0',
					},
					{
						label: '已停用',
						value: '1',
					}
				],
				tableLists: [],
				totalCount: 0,
				index: {show: true},
				columns: [
					{
		            	prop: 'productName',
		            	label: '上游产品名称'
		          	},
         			{
            			prop: 'productCode',
            			label: '上游产品编码'
          			},
          			{
            			prop: 'supplier',
            			label: '供应商'
          			},
          			{
            			prop: 'dockingTypeName',
            			label: '接入方式',
            			minwidth: 50
          			},
          			{
            			prop: 'rechargeTypeName',
            			label: '充值方式',
            			minwidth: 50
          			},
          			{
            			prop: 'price',
            			label: '原价（元）',
            			minwidth: 50
          			},
          			{
            			prop: 'supplierDiscount',
            			label: '供应商折扣',
            			minwidth: 50,
            			formatter: (row) => {
            				return row.supplierDiscount + '%';
            			}
          			},
          			{
            			prop: 'stock',
            			label: '库存',
            			minwidth: 50,
            			formatter: (row) => {
            				if (row.dockingType === 'page' && row.rechargeType === 'pwd') {
            					return row.stock;
            				} else {
            					return '--';
            				}
            			}
          			},
          			{
            			prop: 'createTime',
            			label: '创建时间',
            			minwidth: 93
          			},
          			{
          				prop: 'updateTime',
            			label: '更新时间',
            			minwidth: 93
          			},
          			{
          				prop: 'isUsedStatus',
            			label: '产品状态',
            			minwidth: 48
          			}
				],
				operates: {
					minwidth: 100,
					list: [
	   					{
	   						label: '编辑',
	   						callback: (row) => {
	   							window.sessionStorage.setItem('JB_VipCard_Edit', JSON.stringify(row));
	   							this.$router.push("/VipCard/EditProduct")
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
	   							this.HandleEnableOrStop(row)
	   						}
	   					},
	   					{
	   						label: '启用',
	   						show: (row) => {
	   							if (row.isUsed === 0) {
	   								return false;
	   							} else {
	   								return true;
	   							}
	   						},
	   						callback: (row) => {
	   							this.HandleEnableOrStop(row)
	   						}
	   					},
	   					{
	   						label: '库存管理',
	   						disabled: (row) => {
	   							if (row.dockingTypeName === 'API对接') {
	   								return true;
	   							}
	   							return false;
	   						},
	   						callback: (row) => {
	   							window.sessionStorage.setItem('JB_VipCard_Stock', JSON.stringify(row))
	   							this.$router.push("/VipCard/StockManage");
	   						}
	   					}
	   				]
				}
			}
		},

		mounted () {
			//	获取供应商列表
			this.HandleGetSuppliers();
			//	获取表格数据
			this.HandleFetchData();
		},

		activated () {
			this.HandleFetchData();
		},

		methods: {
			/*===获取供应商列表===*/
			HandleGetSuppliers () {
				const self = this;
				let url = self.URL.UpStreamProduct.VipCard.getOperators;
				self.API.GetEntity(url, {})
				.then((res) => {
					res.data.unshift({supplier: '全部', supplierNum: ''});
					self.supplierOptions = res.data;
				})
			},

			/*===获取日期===*/
			HandleGetDate (dateArr) {
				if (!dateArr) {
					this.vipSearch.startTime = '1970-01-01 00:00:00';
					this.vipSearch.endTime = '';
				} else {
					this.vipSearch.startTime = dateArr[0] + " 00:00:00";
					this.vipSearch.endTime = dateArr[1] + " 23:59:59";
				}
			},

			/*===查询===*/
			HandleSearch () {
				const self = this;
				self.vipSearch.pageIndex = 1;
				self.$refs.itable.tableCurrentPagination.Pcurrent = 1;
				self.vipSearch.pageSize = 10;
				self.$refs.itable.tableCurrentPagination.Psizes = 10;
				self.HandleFetchData();
			},

			/*===获取表格数据===*/
			HandleFetchData () {
				const self = this;
				let _url = self.URL.UpStreamProduct.VipCard.getProductList;
				let _obj = {...self.vipSearch};
				self.API.GetEntity(_url, _obj)
				.then((res) => {
					self.totalCount = res.data.totalCount;
					self.tableLists = res.data.data;
				});
			},

			/*===页码/页面条数改变时===*/
			handlePageChange (pagination) {
				this.vipSearch.pageIndex = (pagination.Pcurrent - 1) * pagination.Psizes + 1;
				this.vipSearch.pageSize = pagination.Psizes;
				this.HandleFetchData();
			},

			/*===编辑===*/
			HandleEdit (row) {
				const self = this;
				self.$router.push("/VipCard/EditProduct");
			},

			/*===停用/启用===*/
			HandleEnableOrStop (row) {
				const self = this;
				let url = self.URL.UpStreamProduct.VipCard.disableOrEnableUpStreamProduct;
				let obj = {
					supplierNum: row.supplierNum,
					productCode: row.productCode,
					isUsed: (row.isUsed == 0 ? 1 : 0)
				}
				let title = '';
				if (row.isUsed === 1) {
					//	启用
					title = '您确定启用该上游产品？';
				} else {
					//	停用
					title = '您确定停用该上游产品？';
				}
				self.$confirm(title, '确认提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(() => {
		        	//	确定
		        	self.API.PostEntity(url, obj)
					.then((res) => {
						self.HandleFetchData();
					})
		        }).catch(() => {
		        	//	取消/关闭按钮
		        });
			}
		}
	}
</script>

<style scoped>
	.w150 {
		width: 150px;
	}
</style>