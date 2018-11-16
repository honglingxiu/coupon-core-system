<template>
	<div class="addCustomer">
		<div class="pageTitleWrap">
			<page-address></page-address>
			<div class="backBtn"><span class='halfCircular' @click='HandleCancel'>返回上一页</span></div>
		</div>
		<div class="pageContentWrap">
			<div class="pageContentWrap-title">下游客户信息配置</div>
			<div class="pageContentWrap-content">
				<el-form ref="FormAdd" :model="FormAdd" label-position='left' label-width='110px'>
					<el-form-item label="客户渠道：" v-if="!EditCustomer">
						<i-select @handleThrowSelected='handleThrowSelected'></i-select>
					</el-form-item>
					<el-form-item label="客户渠道："  v-else>
						<el-select v-model="FormAdd.orgId" disabled>
							 <el-option :label="FormAdd.orgName" :value="FormAdd.orgId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="渠道ID：">
						<span>{{ FormAdd.orgId }}</span>
					</el-form-item>
					<el-form-item label="合作方式：">
						 <el-checkbox v-model="dockingType" :disabled="EditCustomer">API对接</el-checkbox>
					</el-form-item>
					<el-form-item label="API公钥：">
					    <el-input type="textarea" :rows="6" v-model="FormAdd.rsaPublicKey" class="add-textarea"></el-input>
					</el-form-item>
					<el-form-item label="回调地址：">
					    <el-input v-model="FormAdd.backUrl" class='add-textarea' placeholder='请输入下游提供的回调地址（通知下游结果，非必填）'></el-input>
					</el-form-item>
					<el-form-item>
						<div class="flex-center">
							<el-button type="info" @click='HandleCancel'>取消</el-button>
					   		<el-button type="primary" @click='HandleSave'>保存</el-button>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import iSelect from '../../../common/Multistage/Multistage.vue';
	export default {
		data () {
			return {
				FormAdd: {
					orgId: '',
					orgName: '',
					dockingType: '',
					rsaPublicKey: '',
					backUrl: ''
				},
				dockingType: true,
				EditCustomer: false
			}
		},
		components: {
			iSelect
		},
		created () {
			let url = this.$route.name;
			if (url === 'EditCustomer') {
				this.EditCustomer = true;
				this.FormAdd = JSON.parse(window.sessionStorage.getItem('JB_Customer_Edit'));
			} else {
				this.EditCustomer = false;
			}
		},

		methods: {
			handleThrowSelected (item) {
				const self = this;
				self.FormAdd.orgId = item[0].testmodal;
				self.FormAdd.orgName = item[0].testData.filter(o => o.orgId === item[0].testmodal)[0].orgName;
			},

			HandleCancel () {
				this.$router.push('/CustomerList')
			},

			HandleSave () {
				const self = this;
				if (self.FormAdd.orgId === '') {
					self.$message.error('请选择客户渠道');
					return;
				} else if (self.dockingType === false) {
					self.$message.error('请选择合作方式');
					return;
				} else if (self.FormAdd.rsaPublicKey === '') {
					self.$message.error('请输入API公钥');
					return;
				} else {
					let title = '';
					if (self.EditCustomer) {
						title = '您确定编辑该下游客户？';
					} else {
						title = '您确定新增该下游客户？';
					}
					self.$confirm(title, '确认提示', {
			          	confirmButtonText: '确定',
			          	cancelButtonText: '取消'
			        })
			        .then(() => {
			        	self.FormAdd.dockingType = 'api';
			        	let url = '';
			        	if (self.EditCustomer) {
			        		url = self.URL.DownStreamCustomer.CustomerList.editCustomer;
			        	} else {
			        		url = self.URL.DownStreamCustomer.CustomerList.addCustomer;
			        	}
						let obj = {...self.FormAdd};
						self.API.PostEntity(url, obj)
						.then(() => {
							self.$router.push('/CustomerList');
						})
			        })
			        .catch(() => {

			        })
				}
			}
		}
	}
</script>

<style scoped>
	.add-textarea {
		width: 620px;
		margin-right: 20px;
	}
	.flex-center {
		display: flex;
		justify-content: center;
	}
</style>