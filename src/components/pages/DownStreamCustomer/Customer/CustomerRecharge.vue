<template>
  <div class="recharge">
    <div class="pageTitleWrap">
      <page-address></page-address>
      <div class="backBtn"><span class='halfCircular' @click='HandleBack'>返回上一页</span></div>
    </div>
    <div class="detail">
      <div class="detail-title">
        <div class="title-name"><i class="coupon-icon-ren"></i>客户名称：{{ rechargeObj.orgName }}</div>
        <div class="title-money"><i class="coupon-icon-qian mT20"></i>可用总额（元）：{{ Balance.balance }}</div>
        <div class="title-money" v-if="Balance.balance"><i class="coupon-icon-qian mT20"></i>预警金额（元）：{{ Balance.balance }}</div><!--有两个预警金额，显示哪个，应是先显示最高-->
        <div class="title-money" v-else><i class="coupon-icon-qian mT20"></i>未设置</div>
        <el-button size="small" type='primary' @click='showWarningDialog = true'>设置预警金额</el-button>
      </div>
      <div class="detail-money">
        <div class="actual-money mB10">实际余额（元）：{{ Balance.creditBalance }}</div>
        <div class="credit-line mB10">授信额度（元）：{{ Balance.creditAmount }}</div>
        <el-button size="small" type='primary' @click='dialog = true'>设置授信额度</el-button>
      </div>
    </div>
    <div class="pageContentWrap">
      <div class="pageContentWrap-title">客户充值</div>
      <div class="pageContentWrap-content">
        <el-form ref="FormRecharge" :model="FormRecharge" label-position='left' label-width='100px'>
          <el-form-item label="充值类型：">
            <el-radio-group v-model="FormRecharge.rechangeType">
              <el-radio :label="0">余额充值</el-radio>
              <el-radio :label="1">余额扣减</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="充值金额：" class='CustomerRecharge'>
            <el-input v-model="FormRecharge.rechangeAmount" class='add-input'></el-input>
            <div class="tips">元</div>
          </el-form-item>
          <el-form-item label="操作说明：">
            <el-input type="textarea" class='add-textarea' :autosize="{minRows: 5, maxRows: 8}"
                      placeholder="不限制字符类型，支持1000以内的字符" v-model="FormRecharge.operationDescribe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size='small' class='mL40' @click="HandleRecharge">确定充值</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="pageContentWrap-title mT20">操作记录</div>
      <div class="pageContentWrap-content">
        <i-table ref="itable" :index="index" :list="tableLists" :columns="columns" :total="totalCount"
                 @handlePageChange="handlePageChange"></i-table>
      </div>
    </div>
    <el-dialog title="设置授信额度" :visible.sync="dialog" width="22%" @close="HandleDiaFormClose">
      <el-form :model="diaForm" :inline="true">
        <el-form-item label="授信额度：" class='CustomerRecharge f-right'>
          <el-input size="mini" v-model="diaForm.creditAmount"></el-input>
          <div>&nbsp;&nbsp;元</div>
        </el-form-item>
        <el-form-item class="center">
          <el-button size="small" @click="HandleDiaFormClose">取 消</el-button>
          <el-button size="small" type="primary" @click="HandleSettingCreditLine">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="showWarningTitle" :visible.sync="showWarningDialog" width="22%" @close="HandleDiaFormClose">
      <el-form :model="warningDiaForm" ref="warningDiaForm" @close="handleWarningDiaClose" :inline="true" :disabled="diaForm.flag123">
        <el-form-item label="是否开启预警金额：" class='CustomerRecharge f-right'>
          <el-checkbox label="开启"v-model="diaForm.flag123"></el-checkbox>
        </el-form-item>
        <el-form-item label="当客户渠道可用总额低于：" class='CustomerRecharge f-right'>
          <el-input v-model="diaForm.warningLine123" size="mini" placeholder="预警金额一"></el-input>
          <el-input v-model="diaForm.warningLineTwo123" size="mini" placeholder="预警金额二（可为空）"></el-input>
          <span>进行预警</span>
        </el-form-item>
        <el-form-item label="接收预警短信手机号码：" class='CustomerRecharge f-right'>
          <el-input v-model="diaForm.telePhoneStr123" size="medium" placeholder="最多可设置两条，以逗号分开"></el-input>
        </el-form-item>
        <el-form-item label="接收预警邮件邮箱账号：" class='CustomerRecharge f-right'>
          <el-input v-model="diaForm.emailStr123" size="medium" placeholder="最多可设置两条，以逗号分开"></el-input>
        </el-form-item>
        <el-form-item class="center">
          <el-button size="small" @click="handleWarningDiaClose">取 消</el-button>
          <el-button size="small" type="primary" @click="HandleSettingWarningLine">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        FormRecharge: {
          orgId: '',
          rechangeType: 0,
          rechangeAmount: '',
          operationDescribe: '',
          operator: ''
        },
        rechargeObj: {},
        Balance: {},
        UserName: '',
        Reg_price: /^[1-9]\d{0,}([.]\d{1,2})?$/,

        /*===表格===*/
        tableLists: [],
        totalCount: 0,
        index: {show: true},
        columns: [
          {
            prop: 'createTime',
            label: '操作时间'
          },
          {
            prop: 'operationType',
            label: '操作类型'
          },
          {
            prop: 'operationAmount',
            label: '操作金额（元）'
          },
          {
            prop: 'balanceChange',
            label: '可用总额'/*,
            formatter:(row)=>{
              return "<span style='font-size:16px'>row.balance</span>"+'(操作前：'+row.preBalance+'+元)';
            }*/
          },
          {
            prop: 'operationUser',
            label: '操作账号'
          },
          {
            prop: 'operationDescribe',
            label: '操作说明'
          }
        ],

        /*===设置授信额度===*/
        dialog: false,
        diaForm: {
          creditAmount: ''
        },
        /*===设置预警金额===*/
        showWarningDialog:false,
        showWarningTitle:"设置预警金额（"+this.rechargeObj.orgName+"）",//看一下是data的数据先执行还是create方法的代码先执行
        warningDiaForm:{
          flag123:false,
          warningLine123:122,//名字方便替换
          warningLineTwo123:500,
          telePhoneStr123:"",
          emailStr123:""
        }
      }
    },
    computed:{
      /*showWarningTitle(){
        return "设置预警金额（"+this.rechargeObj.orgName+"）";
      }*/
    },
    created() {
      this.rechargeObj = JSON.parse(window.sessionStorage.getItem('JB_Customer_Recharge'));
      if (window.sessionStorage.getItem('Coupon_Login')) {
        this.UserName = JSON.parse(window.sessionStorage.getItem('Coupon_Login'))['userName']
      } else {
        this.UserName = 'admin';
      }
      this.FormRecharge.orgId = this.rechargeObj.orgId;
      this.FormRecharge.operator = this.UserName;
      this.HandleGetOrgBalance();
      this.HandleFetchTableData();
    },

    methods: {
      /*===返回上一页===*/
      HandleBack() {
        this.$router.push('/CustomerList')
      },

      /*===获取渠道可用余额、实际余额===*/
      HandleGetOrgBalance() {
        const self = this;
        let url = self.URL.DownStreamCustomer.CustomerList.getOrgBalance;
        let obj = {
          orgId: self.rechargeObj.orgId
        }
        self.API.PostEntity(url, obj)
          .then((res) => {
            self.Balance = res.data;
          })
      },

      /*===设置授信额度===*/
      HandleSettingCreditLine() {
        const self = this;
        let reg = /^[0-9][0-9]{0,}$/;
        if (!reg.test(self.diaForm.creditAmount)) {
          self.$message.error('授信额度只能输入整数');
          return;
        } else if (Number(self.diaForm.creditAmount) > 5000000) {
          self.$message.error('授信额度上限不能超过500W');
          return;
        }
        else {
          let url = self.URL.DownStreamCustomer.CustomerList.setCreditAmount;
          let obj = {
            orgId: self.rechargeObj.orgId,
            rechangeType: 3,
            creditAmount: Number(self.diaForm.creditAmount),
            //operator: "admin",
            operator: self.UserName
          }
          self.API.PostEntity(url, obj)
            .then((res) => {
              self.dialog = false;
              self.HandleGetOrgBalance();
              self.HandleFetchTableData();
            })
        }
      },

      /*===授信额度对话框关闭==*/
      HandleDiaFormClose() {
        this.dialog = false;
        this.diaForm.creditAmount = '';
      },

      /*===确定充值===*/
      HandleRecharge() {
        const self = this;
        let obj = {...self.FormRecharge};
        if (obj.rechangeAmount === '') {
          self.$message.error("请输入充值金额");
          return
        } else if (!self.Reg_price.test(obj.rechangeAmount)) {
          self.$message.error("输入金额有误，支持最多到小数点后2位");
          return;
        }
        self.$confirm('您确认要给该客户进行充值操作？', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            obj.rechangeAmount = Number(obj.rechangeAmount);
            let url = self.URL.DownStreamCustomer.CustomerList.customerRechange;
            self.API.PostEntity(url, obj)
              .then((res) => {
                self.FormRecharge.rechangeType = 0;
                self.FormRecharge.rechangeAmount = '';
                self.FormRecharge.operationDescribe = '';
                this.HandleGetOrgBalance();
                this.HandleFetchTableData();
              })
          })
          .catch(() => {

          })
      },
      handleWarningDiaClose(){
        this.$refs.warningDiaForm.resetFields();
      },
      //对话框校验
      checkWarningDiaForm(){
        if(isNaN(this.warningDiaForm.warningLine12)){//必须为数字
          throw "请输入数字";//空字符串若是非数字，下面的需要改一下
        }
        if(this.warningDiaForm.warningLine123==""||this.warningDiaForm.warningLine123<0||this.warningDiaForm.warningLine123>this.Balance.preBalance){//preBalance为预警金额
          throw "预警金额需大于0且小于可用额度";
        }
        if(this.warningDiaForm.warningLineTwo123!=""&&(this.warningDiaForm.warningLineTwo123<0||this.warningDiaForm.warningLineTwo123>this.Balance.preBalance)){
          //warningLineTwo123 为非必填项
          throw "预警金额需大于0且小于可用额度";
        }
        if(this.warningDiaForm.telePhoneStr123!=""){
          //对手机号进行拆分，复合的才通过验证，否则返回false
          var reg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
          if(this.warningDiaForm.telePhoneStr123.indexOf(",")>-1||this.warningDiaForm.telePhoneStr123.indexOf("，")>-1){//如果有逗号，两种逗号
            var phoneArr;
            if(this.warningDiaForm.telePhoneStr123.indexOf(",")>-1){
               phoneArr=this.warningDiaForm.telePhoneStr123.split(",");
            }else {
               phoneArr=this.warningDiaForm.telePhoneStr123.split(",");
            }
            if(phoneArr.length>2){
              throw "手机号仅能输入两条"
            }else {
              phoneArr.forEach(function (item) {
                if(!reg.test(item)){
                  throw "请检查手机号码的输入是否正确"
                }
              })

            }
          }else {
            if(!reg.test(this.warningDiaForm.telePhoneStr123)){
              throw "请检查手机号码的输入是否正确"
            }
          }
        }else {
          throw "手机号必填";
        }
        if(this.warningDiaForm.emailStr123!=""){
          //对邮箱进行拆分，复合的才通过验证，否则返回false
          var reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          if(this.warningDiaForm.emailStr123.indexOf(",")>-1){//如果有逗号
            var emailArr=this.warningDiaForm.emailStr123.split(",");
            if(emailArr.length>2){
              throw "仅能输入两个邮箱";
            }else {
              emailArr.forEach(function (item) {
                if(!reg.test(item)){
                  throw "请检查邮箱的输入是否正确"
                }
              })
            }

          }else {
            if(!reg.test(this.warningDiaForm.emailStr123)){
              throw "请检查邮箱的输入是否正确"
            }
          }
        }else {
          throw "邮箱必填";
        }
        return true;
      },
      /*===设置预警金额===*/
      HandleSettingWarningLine(){
        try{
          if(this.checkWarningDiaForm()){
            this.$confirm('您确定新增该预警金额？', '确认提示', {
              distinguishCancelAndClose: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            })
              .then(() => {
                this.updateWarningLine();
              })
              .catch(action => {
                this.$message({
                  type: 'info',
                  message: action === 'cancel'//看一下这个action对应的值，关闭按钮、取消按钮对应的值
                    ? '放弃保存并离开页面'
                    : '停留在当前页面'
                })
              });
          }
        }catch (errMsg) {
          this.$message.error(errMsg);
        }
      },
      updateWarningLine(){

      },

      /*===获取页面表格数据===*/
      HandleFetchTableData(entity) {
        const self = this;
        let obj = entity || {
          orgId: self.rechargeObj.orgId,
          pageIndex: 1,
          pageSize: 10
        }
        let url = self.URL.DownStreamCustomer.CustomerList.getOperationRecord;
        self.API.GetEntity(url, obj)
          .then((res) => {
            self.tableLists = res.data.data;
           // console.log(self.tableLists);
            self.totalCount = res.data.totalCount;
          })
      },

      /*===页码/页面条数发生改变===*/
      handlePageChange(pagination) {
        let obj = {
          orgId: this.rechargeObj.orgId,
          pageIndex: 1,
          pageSize: 10
        }
        obj.pageIndex = (pagination.Pcurrent - 1) * pagination.Psizes + 1;
        obj.pageSize = pagination.Psizes;
        this.HandleFetchTableData(obj);
      }
    }
  }
</script>

<style scoped>
  .detail {
    background: #3b485b;
    color: #fff;
    margin: 20px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }

  .detail-title {
    font-size: 20px;
  }

  .detail-title i {
    font-size: 30px;
    margin-right: 10px;
  }

  .title-name {
    margin-bottom: 10px;
  }

  .detail-money {
    margin-top: 30px;
    align-self: flex-end;
  }

  .add-input {
    width: 300px;
    margin-right: 20px;
  }

  .add-textarea {
    width: 300px;
    margin-right: 20px;
  }

  .center {
    width: 100%;
    text-align: center;
  }

  .flex {
    display: flex;
    justify-content: space-between;
  }
</style>
