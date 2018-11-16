<template>
	<div class="addPro">
		<!-- 添加商品-弹窗start -->
		<el-dialog :title="addPro.orgName + '/添加产品'" :visible.sync="addDia" width="78%" :close-on-click-modal='false' :close-on-press-escape="false" :before-close="HandleCancel" @open="HandleOpenDia">
			<div class="line"></div>
			<div class="pageContentWrap">
				<div class="pageContent-search">
					<el-form :model="UpStream" ref="UpStream" :inline="true">
						<el-form-item label="产品名称：" class='mB0'>
							<el-input size="small" v-model="UpStream.productName" placeholder='请输入产品名称'></el-input>
						</el-form-item>
						<el-form-item label="接入方式：" class='mB0'>
							<el-select v-model="UpStream.dockingType" size="small">
								<el-option v-for="item in dockingOptions" :key="item.dockingType" :label="item.dockingTypeName" :value="item.dockingType"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="充值方式：" class='mB0'>
							<el-select v-model="UpStream.rechargeType" size="small">
								<el-option v-for="item in rechargeOptions" :key="item.rechangeType" :label="item.rechangeTypeName" :value="item.rechangeType"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="供应商：" class='mB0'>
							<el-select v-model="UpStream.supplierNum" placeholder="全部" size="small">
								<el-option v-for="item in supplierOptions" :key="item.supplierNum" :label="item.supplier" :value="item.supplierNum">
							</el-option>
							</el-select>						
						</el-form-item> 
						<el-form-item class='mB0'>
							<el-button type="primary" size="medium" @click="HandleSearch">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="mT10 mB10">
					<label>筛选结果列表(共{{ totalCount }}个)</label>
				</div>
				<i-table ref="itable" :index="index" :selection="selection" :list="tableLists" :columns="columns" :total="totalCount" @handlePageChange="handlePageChange" @handleSelect="handleSelect"></i-table>
			</div>
			<div class="center">
		      <el-button @click="HandleCancel" size="medium">取 消</el-button>
		      <el-button type="primary" size="medium" @click="HandleAddPro">添 加</el-button>
		    </div>
		</el-dialog>
		<!-- 添加商品-弹窗end -->
	</div>
</template>

<script>
	export default {
		props: ['addDia'],
		data () {
			return {
				addPro: {},
				UpStream: {
					supplierNum: '',
					productName: '',
					dockingType: '',
					rechargeType: '',
					pageIndex: 1,
					pageSize: 10
				},

				//	下拉列表
				supplierOptions: [],
				dockingOptions: [],
				rechargeOptions: [],

				//	表格
				totalCount: 0,
				tableLists: [],
				index: {show: true},
				selection: {
					show: true,
					callback: (selections) => {
						
					}
				},
				columns: [
					{
						prop: 'productName',
						label: '产品名称'
					},
					{
						prop: 'orgProductCode',
						label: '下游产品编码'
					},
					{
						prop: 'supplier',
						label: '供应商'
					},
					{
						prop: 'dockingTypeName',
						label: '接入方式'
					},
					{
						prop: 'rechargeTypeName',
						label: '充值方式'
					},
					{
						prop: 'price',
						label: '原价（元）',
						formatter: (row) => {
							return row.price.toFixed(2);
						}
					},
					{
						prop: 'supplierDiscount',
						label: '供应商折扣',
						formatter: (row) => {
							return row.supplierDiscount + '%';
						}
					},
					{
						prop: 'purchasePrice',
						label: '采购价',
						formatter: (row) => {
							return row.purchasePrice.toFixed(2);
						}
					}
				],
				selectedData: []
			}
		},

		created () {
			this.addPro = {...this.$parent.membership};
			this.dockingOptions = this.$parent.dockingOptions;
			this.rechargeOptions = this.$parent.rechargeOptions;
			this.HandleGetSuppliers();
		},

		watch: {
			addDia () {
				if (this.addDia) {
					this.HandleFetchData();
				}
			}
		},

		methods: {

			//	获取供应商列表
			HandleGetSuppliers () {
				const self = this;
				let url = self.URL.UpStreamProduct.VipCard.getOperators;
				self.API.GetEntity(url, {})
				.then((res) => {
					res.data.unshift({supplier: '全部', supplierNum: ''})
					self.supplierOptions = res.data;
				})
			},

			//	取消
			HandleCancel () {
				const self = this;
				self.$parent.addDia = false;
				self.$refs.itable.tableCurrentPagination.Pcurrent = 1;
				self.$refs.itable.tableCurrentPagination.Psizes = 10;
			},

			//	打开弹框
			HandleOpenDia () {
				this.UpStream = {
					supplierNum: '',
					productName: '',
					dockingType: '',
					rechargeType: '',
					pageIndex: 1,
					pageSize: 10
				}
				this.HandleFetchData();
			},

			//	查询
			HandleSearch () {
				const self = this;
				self.UpStream.pageIndex = 1;
				self.$refs.itable.tableCurrentPagination.Pcurrent = 1;
				self.UpStream.pageSize = 10;
				self.$refs.itable.tableCurrentPagination.Psizes = 10;
				self.HandleFetchData();
			},

			//	获取数据
			HandleFetchData () {
				const self = this;
				let _obj = {
					orgId: self.addPro.orgId,
					isUsed: 0
				}
				let obj = Object.assign(_obj, {...self.UpStream});
				let url = self.URL.DownStreamCustomer.CustomerList.getProductListByAdd;
				self.API.GetEntity(url, obj)
				.then((res) => {
					self.totalCount = res.data.totalCount;
					self.tableLists = res.data.data.map(o => {
						o.wholesaleDiscount = o.supplierDiscount;
						o.wholesalePrice = (o.supplierDiscount / 100 * o.price).toFixed(2);
						return o;
					})
				})
			},

			//	添加产品
			HandleAddPro () {
				this.$parent.addDia = false;
				let len = this.$parent.tableData.length;
				this.$parent.tableData = this.$parent.tableData.concat(this.selectedData);
				this.$parent.insertData = this.$parent.insertData.concat(this.selectedData);
			},

			//	页面条数/页码改变
			handlePageChange (pagination) {
				this.UpStream.pageIndex = (pagination.Pcurrent - 1) * pagination.Psizes + 1;
				this.UpStream.pageSize = pagination.Psizes;
				this.HandleFetchData();
			},

			//	选择
			handleSelect (selections) {
				if (selections.length === 0) {
					return;
				}
				this.selectedData = selections;
			}
		}
	}
</script>

<style scoped>
	.line {
		background-color: blue;
		height: 1px;
	}
	.center {
		text-align: center;
	}
</style>