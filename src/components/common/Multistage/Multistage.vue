<template>
	<div class="channel">
		<el-select v-model="item.testmodal" filterable v-for="item in channelOptions" :key="item.level" @change='handleSelectChange' class='mR20'>
			<el-option v-for="tt in item.testData" :key='tt.orgId' :label="tt.orgName" :value="tt.orgId"></el-option>
		</el-select> 
	</div>
</template>

<script>
	export default {
		data () {
			return {
				channelOptions: []
			}
		},
		created () {
			this.handleGetAllOrg();
		},

		methods: {
			handleGetAllOrg(){
				const self = this;
				let customerUrl = self.URL_PREFIX + self.URL.DownStreamCustomer.CustomerList.getCustomerAllOrg;
				$.ajax({
		            url: customerUrl,
		            type: "post", 
		            dataType: "json",
		            success: (result) => {
		            	if (result.code == 0){
		            		self.channelOptions.push({testData: result.data, level: 1})
						}else{
						 	self.$message.error(result.msg)
						}				
		            },
		            error: (data) => {
		                self.$message.error('服务器异常，请稍后重试！');
		            }
		        });
			},

			handleSelectChange (val) {
				const self = this;
				let item = self.channelOptions.filter(o_item => {
					let inner = o_item.testData;
					let inner_item = inner.filter(i_item => {
						return i_item.orgId === val;
					});
					if (inner_item.length > 0) {
						return o_item;
					}
				});
				if (item[0].level < self.channelOptions.length) {
					self.channelOptions.splice(item[0].level, self.channelOptions.length - 1);
				}
				self.handleFetchData({orgId: val, level: item[0].level});
				self.$emit("handleThrowSelected", item)
			},

			handleFetchData (obj) {
				const self = this;
				let url = self.URL.DownStreamCustomer.CustomerList.getCustomerOrg;
				let entity = {orgId: obj.orgId};
				self.API.GetEntity(url, entity)
				.then((res) => {
					if (!res.data) {
						return;
					}
					self.channelOptions.push({
						testData: res.data,
						level: obj.level + 1
					})
				})
			}
		}
	}
</script>