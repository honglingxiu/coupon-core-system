<template>
	<div class="itable">
		<!-- 表格 -->
	    <el-table :data='list' :stripe="options.stripe ? options.stripe : true" :border="options.border ? options.border : true" :size="options.medium ? options.medium : 'medium'" @selection-change="handleSelectionChange">
	    	<!-- 序号列 -->
	    	<el-table-column type="index" v-if="index.show ? index.show : false" :width="index.minwidth ? index.minwidth : ''" :label="index.label ? index.label : '序号'" :align="index.align ? index.align : 'center'" :index="indexMethod"></el-table-column>

	    	<!-- 数据列 -->
	    	<template v-for="(column, index) in columns">
	    		<el-table-column :prop="column.prop" :label="column.label" :align="column.align ? column.align : 'center'" :min-width="column.minwidth ? column.minwidth : ''">
	    			<template slot-scope="scope">
	    				<template v-if="column.formatter">
		    				<span v-html="column.formatter(scope.row)"></span>
		    			</template>
		    			<template v-else>
		    				<span>{{ scope.row[column.prop] }}</span>
		    			</template>
	    			</template>
	    		</el-table-column>
	    	</template>

	    	<!-- 操作列 -->
	    	<el-table-column v-if="operates.list.length > 0" :label="operates.label ? operates.label : '操作'" :min-width="operates.minwidth ? operates.minwidth : ''" :align="operates.align ? operates.align : 'center'" :show-overflow-tooltip='true'>
    			<template slot-scope="scope">
    				<template v-for="(btn, key) in operates.list">
			            <el-button :type="btn.type ? btn.type : 'text'" :plain="btn.plain ? btn.plain : false" :disabled="btn.disabled ? btn.disabled(scope.row) : false" v-if="btn.show ? btn.show(scope.row) : true"  @click.native.prevent="btn.callback(scope.row)">{{ handleLabel(btn.label,scope.row)}}</el-button>
					</template>
    			</template>
    		</el-table-column>

    		<!-- 选择列 -->
	    	<el-table-column type="selection" v-if="selection.show ? selection.show : false" :width="index.minwidth ? index.minwidth : ''" :align="index.align ? index.align : 'center'"></el-table-column>

	    </el-table>

	    <!-- 分页 -->
	    <div class="pagination" v-if="list.length > 0">
	    	<el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="pageArray" :page-size="tableCurrentPagination.Psizes" :current-page="tableCurrentPagination.Pcurrent"  @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
	    </div>
	</div>
</template>

<script>
	export default {
		props: {
			/*===表格配置开始===*/
				//	table === 表头绑定的地段：label：表头名称，align：每列数据展示形式（left, center, right, 默认center），minwidth:列最小宽(默认表格自适应)

				//	table数据
				list: {
					type: Array,
					default: []
				},

				//	需要展示的列 === 列数据对应的属性：label：列名，align：对齐方式（默认center），minwidth：列最小宽(默认表格自适应)
				columns: {
					type: Array,
					default: []
				},

				//	操作功能点 === minwidth:按钮列最小宽，fixed：是否固定（left,right）,按钮集合 === label: 文本，type :类型（primary / success / warning / danger / info / text， 默认为text），show：是否显示（function，默认显示），plain：是否朴素按钮（默认false），disabled：是否禁用（function，默认不禁止），method：回调方法
				operates: {
					type: Object,
					default: function () {
						return {
							list: []
						}
					}
				},

				//	表格索引列
				index: {
					type: Object,
					default: function () {
						return {}
					}
				},

				//	多选列
				selection: {
					type: Object,
					default: function () {
						return {}
					}
				},

				//	表格其他配置
				options: {
					type: Object,
					default: function () {
						return {}
					}
				},
			/*===表格配置结束===*/


			/*===分页参数配置开始===*/
				//	表格总条数
				total: {
					type: Number,
					default: 0
				}
			/*===分页参数配置结束===*/
		},
		data () {
			return {
				pageArray: [10, 30, 50],
				tableCurrentPagination: {
					Pcurrent: 1,
					Psizes: 10
				}
			}
		},

		methods: {
			//	页面条数改变
			handleSizeChange (size) {
				this.tableCurrentPagination.Psizes = size;
				this.tableCurrentPagination.Pcurrent = 1;
				this.$emit('handlePageChange', this.tableCurrentPagination);
			},

			//	当前页面改变
			handleCurrentChange (current) {
				this.tableCurrentPagination.Pcurrent = current;
				this.$emit('handlePageChange', this.tableCurrentPagination);
			},

			//	页面序号格式化
			indexMethod (index) {
				let pIndex = this.tableCurrentPagination.Pcurrent;
				let pRowCount = this.tableCurrentPagination.Psizes;
		        return (pIndex - 1) * pRowCount + index + 1;
			},

			handleSelectionChange (val) {
				this.$emit('handleSelect', val);
			},
      handleLabel(label,row){//根据状态显示的按钮名称不一致
        if(typeof label=="string"){
          return label;
        }else {
			    return label(row);
        }
      }
		}
	}
</script>

<style scoped>
	.pagination {
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	}
</style>
