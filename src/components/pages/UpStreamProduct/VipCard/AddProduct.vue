<!-- 新增产品 -->
<template>
	<div class="add">
		<div class="pageTitleWrap">
			<page-address></page-address>
			<div class="backBtn"><span class='halfCircular' @click='HandleCancel'>返回上一页</span></div>
		</div>
		<div class="pageContentWrap">
			<div class="pageContentWrap-title">会员卡产品信息</div>
			<div class="pageContentWrap-content">
				<el-form ref="FormAdd" :model="FormAdd" label-position='left' label-width='110px' class='FormAdd'>
					<el-form-item label="产品名称：">
					    <el-input v-model="FormAdd.productName" class='add-input' placeholder='请输入产品名称' :disabled="EditProduct"></el-input>
					    <div class="tips">支持中文、英文、数字，30个字以内</div>
					</el-form-item>
					<el-form-item label="上游产品编码：">
					    <el-input v-model="FormAdd.productCode" class='add-input' placeholder='请输入上游产品编码' :disabled="EditProduct"></el-input>
					    <div class="tips">注：根据上游供应商提供的产品编码（或者产品ID）配置，无产品编码的可按开发提供的规则填写</div>
					</el-form-item>
					<el-form-item label="下游产品编码：">
					    <el-input v-model="FormAdd.orgProductCode" class='add-input' placeholder='请输入下游产品编码' :disabled="EditProduct"></el-input>
					    <div class="tips">注：根据开发提供对应的产品编码（ID）配置；上游无产品编码的，则上下游产品编码填写同一个</div>
					</el-form-item>
					<el-form-item label="接入方式：">
					    <el-select v-model="FormAdd.dockingType" class='add-input' @change='HandleDocking' :disabled="EditProduct">
					    	<el-option v-for="item in dockingOptions" :key="item.dockingType" :label="item.dockingTypeName" :value="item.dockingType"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="充值方式：">
					    <el-select v-model="FormAdd.rechargeType" class='add-input' @change='HandleRechargeMode' :disabled="EditProduct">
					    	<el-option v-for="item in rechargOptions" :key="item.rechargeType" :label="item.rechargeTypeName" :value="item.rechargeType"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="供应商：">
					    <el-select v-model="FormAdd.supplierNum" placeholder="请选择上游供应商" class='add-input' @change='HandleUpStreamSupplier' :disabled="EditProduct">
					    	<el-option v-for="item in supplierOptions" :key="item.supplierNum" :label="item.supplier" :value="item.supplierNum"></el-option>
					    </el-select>
					    <el-input v-model="newSuplierName" class='add-input' placeholder='请输入新增上游供应商的名称' v-if='OwnStock'></el-input>
					    <div class="tips">注：API对接，需开发预先录入已对接的上游，其他可自行录入供应商</div>
					</el-form-item>
					<el-form-item label="产品原价：">
					    <el-input v-model.number="FormAdd.price" class='add-input' placeholder='请输入产品原价'></el-input>
					    <div class="tips">元</div>
					</el-form-item>
					<el-form-item label="供应商折扣：">
					    <el-input v-model.number="FormAdd.supplierDiscount" class='add-input' placeholder='请输入供应商折扣'></el-input>
					    <div class="tips">%</div>
					</el-form-item>
					<el-form-item label="订购账号类型：" class='last'>
					    <el-radio-group v-model="FormAdd.accountType" :disabled="EditProduct">
					    	<el-radio v-for="item in accountOptions" :label="item.accountType" :key="item.accountType">{{ item.accountName }}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="购买成功后是否下发通知短信：" class='last'>
					    <el-radio-group v-model="FormAdd.isSend">
						    <el-radio label="false">否</el-radio>
						    <el-radio label="true">是</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="通知短信模板：" v-if="FormAdd.isSend === 'true'">
						<el-input type="textarea" class='add-textarea' :autosize="{minRows: 5, maxRows: 8}" placeholder="请输入短信模板" v-model="FormAdd.sms"></el-input>
					</el-form-item>
					<el-form-item class='center'>
						<el-button type="info" @click='HandleCancel'>取消</el-button>
					    <el-button type="primary" @click='HandleConfirm'>提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				FormAdd: {
					productName: '',
					productCode: '',
					orgProductCode: '',
					rechargeType: 'direct',
					dockingType: 'api',
					supplier: '',
					supplierNum: '',
					price: '',
					supplierDiscount: '',
					accountType: 'Phone',
					isSend: 'false',
					sms: ''
				},
				newSuplierName: '',
				dockingOptions: [
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
						rechargeType: 'direct',
						rechargeTypeName: '自动充值'
					},
					{
						rechargeType: 'pwd',
						rechargeTypeName: '卡密充值'
					}
				],
				supplierOptions: [],
				accountOptions: [
					{
						accountName: '手机号码',
						accountType: 'Phone'
					},
					{
						accountName: 'QQ',
						accountType: 'QQ'
					}
				],
				OwnStock: false,
				CompareObj: {},
				Reg: {
					Reg_pro_code: /^[0-9a-zA-Z]+$/,
					Reg_price:  /^[1-9]\d{0,}([.]\d{1,2})?$/,
				},
				EditProduct: false
			}
		},

		created () {
			let url_name = this.$route.name;
			if (url_name === 'AddProduct') {
				this.EditProduct = false;
			} else {
				this.EditProduct = true;
				let obj = JSON.parse(window.sessionStorage.getItem('JB_VipCard_Edit'));
				this.FormAdd = obj;
				if (obj.rechargeType === 'pwd') {
					this.accountOptions = [
						{
							accountName: '手机号码',
							accountType: 'Phone'
						}
					]
				} else {
					this.accountOptions = [
						{
							accountName: '手机号码',
							accountType: 'Phone'
						},
						{
							accountName: 'QQ',
							accountType: 'QQ'
						}
					]
				}
			}
			this.CompareObj = {...this.FormAdd};
			this.HandleGetSuppliers();
		},

		methods: {
			/*===获取上游供应商列表===*/
			HandleGetSuppliers () {
				const self = this;
				let url = self.URL.UpStreamProduct.VipCard.getOperators;
				self.API.GetEntity(url, {})
				.then((res) => {
					self.supplierOptions = res.data;
				})
			},

			/*===选择上游供应商时===*/
			HandleUpStreamSupplier (val) {
				const self = this;
				if (val === -1) {
					self.OwnStock = true;
				} else {
					self.OwnStock = false;
					let arr = self.supplierOptions.filter((item) => {
						return item.supplierNum === val;
					});
					self.FormAdd.supplier = arr[0].supplier;
				}
				self.newSuplierName = '';
			},

			/*===处理接入方式改变的时候改变充值方式选项===*/
			HandleDocking (mode) {
				const self = this;
				// 两种情况（API，自有库存），都有卡密充值方式
				self.rechargOptions = [{rechargeType: 'pwd',rechargeTypeName: '卡密充值'}];
				self.FormAdd.supplierNum = '';
				// self.FormAdd.sms = '';
				self.newSuplierName = '';
				self.OwnStock = false;
				if (mode === 'api') {
					// API对接
					self.rechargOptions.unshift({rechargeType: 'direct',rechargeTypeName: '自动充值'})
					self.FormAdd.rechargeType = 'direct';
					self.FormAdd.isSend = 'false';
					self.HandleRechargeMode('direct');
					if (self.supplierOptions[0].supplierNum === -1) {
						self.supplierOptions.shift();
					}
				} else {
					//	自有库存
					self.OwnStock = true;
					self.FormAdd.supplierNum = -1;
					self.FormAdd.rechargeType = 'pwd';
					self.FormAdd.isSend = 'true';
					self.HandleRechargeMode('pwd');
					self.supplierOptions.unshift({supplierNum: -1, supplier: '新增上游供应商'});
				}
			},

			/*===处理充值方式改变的时候重置订购账号类型选项===*/
			HandleRechargeMode (mode) {
				const self = this;
				if (mode === 'pwd') {
					//	卡密充值
					self.accountOptions = [
						{
							accountName: '手机号码',
							accountType: 'Phone'
						}
					]
				} else {
					//	自动充值
					self.accountOptions = [
						{
							accountName: '手机号码',
							accountType: 'Phone'
						},
						{
							accountName: 'QQ',
							accountType: 'QQ'
						}
					]
				}
				self.FormAdd.accountType = 'Phone';
			},

			/*===取消新增产品===*/
			HandleCancel () {
				const self = this;
				let com_obj_str = JSON.stringify(self.CompareObj);
				let obj_str = JSON.stringify({...self.FormAdd});
				if (com_obj_str === obj_str) {
					self.$router.push("/VipCard");
				} else {
					let title = self.EditProduct ? '未提交信息将不生效，您确定取消修改产品？' : '未提交信息将不生效，您确定取消新增产品？';
					self.$confirm(title, '确认提示', {
			          	confirmButtonText: '确定',
			          	cancelButtonText: '取消'
			        }).then(() => {
			        	self.$router.push("/VipCard");
			        }).catch(() => {
			        });
				}
			},

			/*===确定新增产品===*/
			HandleConfirm () {
				const self = this;
				if (!self.HandleJudgeMsg()) {
					return;
				} else {
					let title = '';
					if (self.EditProduct) {
						title = '您确定要修改该产品？';
					} else {
						title = '您确定要新增该产品？';
					}
					self.$confirm(title, '确认提示', {
			          	confirmButtonText: '确定',
			          	cancelButtonText: '取消'
			        }).then(() => {
			        	//	确定
			        	let url = '';
			        	if (self.EditProduct) {
			        		url = self.URL.UpStreamProduct.VipCard.editProduct;
			        	} else {
			        		url = self.URL.UpStreamProduct.VipCard.addProduct;
			        	}
						let obj = {...self.FormAdd};
						// console.log(obj);
						self.API.PostEntity(url, obj)
						.then((res) => {
							self.$router.push('/VipCard');
						})
			        }).catch((error) => {
			        	//	取消
			        });
				}
			},

			/*===判断页面信息是否填写完整===*/
			HandleJudgeMsg () {
				const self = this;
				let obj = self.FormAdd;

				//	新增/编辑产品
				if (!self.EditProduct) {	//	新增产品 - 
					//	产品名称
					if (obj.productName === '') {
						self.$message.error('产品名称不能为空');
						return false;
					} else if (obj.productName.length > 30) {
						self.$message.error('产品名称支持中文、英文、数字，30个字以内');
						return false;
					}

					//	上游产品编码
					if (obj.productCode.length > 1024) {
						self.$message.error('上游产品编码长度上限为1024个字符');
						return false;
					} else if (obj.productCode === '') {
						self.$message.error('上游产品编码不能为空');
						return false;
					} else if (!self.Reg.Reg_pro_code.test(obj.productCode)) {
						self.$message.error('上游产品编码支持大小写英文、数字');
						return false;
					}

					//	下游产品编码
					if (obj.orgProductCode.length > 1024) {
						self.$message.error('下游产品编码长度上限为1024个字符');
						return false;
					} else if (obj.orgProductCode === '') {
						self.$message.error('下游产品编码不能为空');
						return false;
					} else if (!self.Reg.Reg_pro_code.test(obj.orgProductCode)) {
						self.$message.error('下游产品编码支持大小写英文、数字');
						return false;
					}

					//	接入方式
					if (obj.dockingType === 'api') {	//	API对接
						if (obj.supplierNum === '') {
							self.$message.error('上游供应商不能为空');
							return false;
						}
					} else {	//	自有库存
						if (obj.rechargeType === 'pwd') {	//	卡密充值
							if (obj.supplierNum === -1) {	//	如果选择新增供应商，需要检测新增供应商是否正确
								if (obj.newSuplierName === '') {	//	没有填写新增供应商的名称
									self.$message.error('请输入新增供应商的名称');
									return false;
								} else {	//	填写了新增供应商的名称，检测是否已存在
									let sup = self.newSuplierName;
									for (let item of self.supplierOptions) {
										if (item.supplier === sup) {
											self.$message.error('新增上游供应商名称与已有上游供应商相同');
											return false;
										} else {
											continue;
										}
									}
									obj.supplier = sup;
								}
							} else {	//	选择了某个供应商
								
							}
						} else {
							//	其他充值方式（暂无）
						}
					}
				} else {	//	编辑产品 - 除产品原价、供应商折扣、购买后是否下发通知短信开关及通知短信模板可修改外，其他均不可修改
				}

				//	产品价格
				if (obj.price === '') {
					self.$message.error('产品原价不能为空');
					return false;
				} else if (obj.price === 0) {
					self.$message.error('产品原价支持大于零的数字');
					return false;
				} else if (!self.Reg.Reg_price.test(obj.price)) {
					self.$message.error('产品原价支持数字与小数点录入，最多保留至小数点后两位');
					return false;
				}

				//	供应商折扣
				if (obj.supplierDiscount === '') {
					self.$message.error('供应商折扣不能为空');
					return false;
				} else if (obj.supplierDiscount === 0) {
					self.$message.error('供应商折扣支持大于零的数字');
					return false;
				} else if (!self.Reg.Reg_price.test(obj.supplierDiscount)) {
					self.$message.error('供应商折扣支持数字与小数点录入，最多保留至小数点后两位');
					return false;
				}
				
				//	是否下发通知短信开关
				if (obj.isSend === 'true') {
					//	下发短信
					if (obj.sms === '') {
						self.$message.error('通知短信模板不能为空');
						return false;
					}
				}
				return true;
			}
		}
	}
</script>

<style scoped>
	.add-input {
		width: 300px;
		margin-right: 20px;
	}
	.add-textarea {
		width: 400px;
		margin-right: 20px;
	}
	.center {
		display: flex;
		justify-content: center;
	}
</style>