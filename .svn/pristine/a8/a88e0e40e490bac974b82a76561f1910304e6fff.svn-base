<!-- example -->
<template>
	<div class="table">
		<i-table :list="list" :columns="columns" :operates="operates" :total="total" @handlePageChange="handlePageChange"></i-table>
	</div>
</template>

<script>
	import iTable from './iTable.vue';
	export default {
		components: {
			iTable
		},
		data () {
			return {
                //  总行数
				total: 0,
                //  数据表
        		list: [],
                //  数据列
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
            			minwidth: 50
          			},
          			{
            			prop: 'stock',
            			label: '库存',
            			minwidth: 50
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
                //  功能点
       			operates: {
       				minwidth: 100,
       				list: [
       					{
       						label: '编辑',
       						callback: (row) => {
       							console.log('编辑', row);
       						}
       					},
       					{
       						label: '停用',
       						show: (row) => {
       							if (row.isUsed === 0) {
       								return false;
       							}
       							return true;
       						},
       						callback: (row) => {
       							console.log('停用', row);
       						}
       					},
       					{
       						label: '启用',
       						show: (row) => {
       							if (row.isUsed === 1) {
       								return false;
       							}
       							return true;
       						},
       						callback: (row) => {
       							console.log('启用', row);
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
       							console.log('库存管理', row);
       						}
       					}
       				]
       			},
                //  页面查询参数
       			vipSearch: {
					startTime: '1970-01-01 00:00:00',
					endTime : '',
					supplierNum: '',
					productName:'',
					dockingType: '',
					rechargeType: '',
					isUsed:'',
					pageIndex: 1,
					pageSize: 10,
					userSessionTime: sessionStorage.userSessionTime
				}
			}
		},
		mounted () {
			this.handleGetData()
		},
		methods: {
            //  获取页面数据
			handleGetData () {
				const self = this;
				let url = '/ccsp/upStream/getProductList';
				let _obj = self.vipSearch;
				self.API.GetEntity(url, _obj)
				.then((res) => {
					self.list = res.data.data;
					self.total = res.data.totalCount;
				})
			},
            //  页面发生改变(页面条数/当前页)
			handlePageChange (pagination) {
				this.vipSearch.pageIndex = (pagination.Pcurrent - 1) * pagination.Psizes + 1;
				this.vipSearch.pageSize = pagination.Psizes;
				this.handleGetData();
			}
		}
	}
</script>

<style scoped>
	.table {
		padding: 40px;
	}
</style>