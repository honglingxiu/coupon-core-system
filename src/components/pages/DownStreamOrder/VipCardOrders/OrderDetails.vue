<template>
  <div class="details">
    <div class="pageTitleWrap">
      <page-address></page-address>
      <div class="backBtn"><span class='halfCircular' @click='HandleBack'>返回上一页</span></div>
    </div>
    <div class="pageContentWrap">
      <div class="table">
        <table>
          <tr>
            <td class="tr-title">订购号码</td>
            <td class="tr-value">{{ Orders.phoneNo }}</td>
          </tr>
          <tr>
            <td class="tr-title">订购产品</td>
            <td class="tr-value">{{ Orders.productName }}</td>
          </tr>
          <!--<tr>
            <td class="tr-title">产品供应商</td>
            <td class="tr-value">{{ Orders.supplier }}</td>
          </tr>-->
          <tr>
            <td class="tr-title">接入方式</td>
            <td class="tr-value">{{ Orders.dockingTypeName }}</td>
          </tr>
          <tr>
            <td class="tr-title">充值方式</td>
            <td class="tr-value">{{ Orders.rechargeTypeName }}</td>
          </tr>
          <tr>
            <td class="tr-title">采购价（元）</td>
            <td class="tr-value">{{ Orders.purchasePrice }}</td>
          </tr>
          <tr>
            <td class="tr-title">批发价（元）</td>
            <td class="tr-value">{{ Orders.wholesalePrice }}</td>
          </tr>
          <tr>
            <td class="tr-title">下游渠道</td>
            <td class="tr-value">{{ Orders.orgName }}</td>
          </tr>
          <tr>
            <td class="tr-title">下游订单号</td>
            <td class="tr-value">{{ Orders.orderSEQ }}</td>
          </tr>
          <tr>
            <td class="tr-title">骏伯订单号</td>
            <td class="tr-value">{{ Orders.orderId }}</td>
          </tr>
          <tr>
            <td class="tr-title">上游订单号</td>
            <td class="tr-value">{{ Orders.transferId }}</td>
          </tr>
          <tr>
            <td class="tr-title">下游订购时间</td>
            <td class="tr-value">{{ Orders.downReqTime }}</td>
          </tr>
          <tr>
            <td class="tr-title">上游回调时间</td>
            <td class="tr-value">{{ Orders.upCallbackTime }}</td>
          </tr>
          <tr>
            <td class="tr-title">回调下游时间</td>
            <td class="tr-value">{{ Orders.backDownTime }}</td>
          </tr>
          <tr>
            <td class="tr-title">请求上游响应结果</td>
            <td class="tr-value">{{ Orders.upResStatus }}</td>
          </tr>
          <tr>
            <td class="tr-title">手动回调信息</td>
            <td class="tr-value">{{ Orders.manualBackInfo }}</td>
          </tr>
          <tr>
            <td class="tr-title">订单状态</td>
            <td class="tr-value">{{ Orders.orderStatusDesc }}
              <el-button type="primary" size="small" class="mL10" @click="checkStatus" v-if="Orders.isQuery=='Y'">手动查询</el-button>
            </td>
          </tr>
          <tr v-if="Orders.exchangeCode !== ''">
            <td class="tr-title">会员卡密</td>
            <td class="tr-value">{{ Orders.exchangeCode }}</td>
          </tr>
          <tr>
            <td class="tr-title">备注</td>
            <td class="tr-value">{{ Orders.remark }}</td>
          </tr>
          <!--<tr>
                        <td class="tr-title">下游渠道</td>
                        <td class="tr-value">{{ Orders.orgName }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">下游订单号</td>
                        <td class="tr-value">{{ Orders.orderSEQ }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">骏伯订单号</td>
                        <td class="tr-value">{{ Orders.orderId }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">上游订单号</td>
                        <td class="tr-value">{{ Orders.transferId }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">订购手机号码</td>
                        <td class="tr-value">{{ Orders.phoneNo }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">订购产品名称</td>
                        <td class="tr-value">{{ Orders.productName }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">产品供应商</td>
                        <td class="tr-value">{{ Orders.supplier }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">接入方式</td>
                        <td class="tr-value">{{ Orders.dockingTypeName }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">充值方式</td>
                        <td class="tr-value">{{ Orders.rechargeTypeName }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">采购价（元）</td>
                        <td class="tr-value">{{ Orders.purchasePrice }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">批发价（元）</td>
                        <td class="tr-value">{{ Orders.wholesalePrice }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">订购时间</td>
                        <td class="tr-value">{{ Orders.createTime }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">订单状态</td>
                        <td class="tr-value">{{ Orders.orderStatusDesc }}</td>
                    </tr>
                    <tr v-if="Orders.exchangeCode !== ''">
                        <td class="tr-title">会员卡密</td>
                        <td class="tr-value">{{ Orders.exchangeCode }}</td>
                    </tr>
                    <tr>
                        <td class="tr-title">备注</td>
                        <td class="tr-value">{{ Orders.remark }}</td>
                    </tr>-->
        </table>
        <div class="mT40">
          <!--<el-button type="primary" size="medium" @click='HandleBack'>返回订单列表</el-button>
                    <el-button type="info" size="medium" :disabled="Orders.returnCode !== '0'" @click='HandleRefund'>申请退款</el-button>-->
          <el-button type="primary" size="medium" v-if="callbackBtnFlag.successFlag"
                      @click='handleCallback("成功")'>手动回调成功
          </el-button>
          <el-button type="primary" size="medium" v-if="callbackBtnFlag.failFlag"
                     @click='handleCallback("失败")'>手动回调失败
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Orders: {}
      }
    },
    computed: {
      callbackBtnFlag() {//显示手动回调成功和手动回调失败按钮
        /*if(this.Orders.reqTimes==1&&this.Orders.dockingType=="api"){*///api对接方式，且已经重新发送过的话就不能再手动回调
        if(this.Orders.reqTimes==1){
          return {//失败状态且已经重新发送过的话就不能再手动回调
            successFlag: false,
            failFlag: false
          }
        }
        else if (this.Orders.orderStatusDesc == '发送中' || this.Orders.orderStatusDesc == '异常') {
          return {
            successFlag: true,
            failFlag: true
          }
        } else if (this.Orders.orderStatusDesc == '成功') {
          return {
            successFlag: true,
            failFlag: false
          }
        } else if (this.Orders.orderStatusDesc == '失败') {
          return {
            successFlag: false,
            failFlag: true
          }
        } else {//已退款时，无回调按钮
          return {
            successFlag: false,
            failFlag: false
          }
        }
      }
    },
    methods: {
      /*===返回上一页/返回订单列表===*/
      HandleBack() {
        this.$router.push('/VipCardOrders')
      },

      /*===申请退款===*/
      /* HandleRefund() {
         const self = this;
         let url = self.URL.DownStreamOrder.VipCardOrders.balanceRefund;
         let obj = {
           supplierNum: self.Orders.supplierNum,
           orgId: self.Orders.orgId,
           wholesalePrice: self.Orders.wholesalePrice,
           orderId: self.Orders.orderId,
         }
         self.API.PostEntity(url, obj)
           .then(() => {
             self.Orders.returnCode = '3';
             self.Orders.orderStatusDesc = '已退款';
           })
       },*/
      handleCallback(msg) {
        var message = "您确定要回调【" + msg + "】结果给下游客户";
        this.$confirm(message, '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //进行具体的回调操作
          //直接改状态并提示操作成功，再向后台发送请求
          /*const self = this;
          self.Orders.returnCode = msg=="成功" ? '0': '1';
          self.Orders.orderStatusDesc = msg=="成功" ? '成功': '失败';
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          var backOrderStatus="0";//回调成功
          if (msg == "失败") {
            backOrderStatus="1111";//回调失败
          }
          let url = self.URL.DownStreamOrder.VipCardOrders.manualBack;
          let obj = {
            orderId: this.Orders.orderId,
            backOrderStatus: backOrderStatus,
            orgId: this.Orders.orgId,
            //operator: JSON.parse(window.sessionStorage.getItem('Coupon_Login'))['userName'],
            operator: "admin",//打包的时候记得去掉*!/
            rechargeType: this.Orders.rechargeType
          };
          self.API.GetEntity(url, obj)
            .then((res) => {
              this.Orders.manualBackInfo=res.manualBackInfo;
              window.sessionStorage.setItem('JB_VipCardOrders_Details', JSON.stringify(this.Orders));//更新缓存manualBackInfo字段
            })*/
          const self = this;
          var backOrderStatus="0";//回调成功
          if (msg == "失败") {
            backOrderStatus="1111";//回调失败
          }
          let url = self.URL.DownStreamOrder.VipCardOrders.manualBack;
          let obj = {
            orderId: this.Orders.orderId,
            backOrderStatus: backOrderStatus,
            orgId: this.Orders.orgId,
            operator: JSON.parse(window.sessionStorage.getItem('Coupon_Login'))['userName'],
            //operator: "admin",//打包的时候记得去掉*/
            rechargeType: this.Orders.rechargeType
          };
          self.API.PostEntity(url, obj)
            .then((res) => {
              self.Orders.returnCode = msg=="成功" ? '0': '1';
              self.Orders.orderStatusDesc = msg=="成功" ? '成功': '失败';
              this.Orders.manualBackInfo=res.manualBackInfo;
              window.sessionStorage.setItem('JB_VipCardOrders_Details', JSON.stringify(this.Orders));//更新缓存manualBackInfo字段
              this.$message({
                type: 'success',
                //message: '回调' + msg + '操作结束'
                message: res.msg
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消回调' + msg + '操作'
          });
        });
      },
      checkStatus() {
        //向上游供应商的查询接口发起查询请求，以便实时查询订单状态，如果查询到的状态与当前订单状态不同，则以查询结果为准，更新订单状态，更新订单状态后，无需自动回调给下游
        const self = this;
        let url = self.URL.DownStreamOrder.VipCardOrders.orderQuery;
        let obj = {
          orderId: this.Orders.orderId
        };
        self.API.PostEntity(url, obj)
          .then((res) => {
            this.Orders.orderStatusDesc=res.orderStatusDesc;
            window.sessionStorage.setItem('JB_VipCardOrders_Details', JSON.stringify(this.Orders));//更新缓存orderStatusDesc字段
            this.$message({
              type:"success",
              message:"手动查询结束"
            });
          })
      }
    },
    created() {
      this.Orders = JSON.parse(window.sessionStorage.getItem('JB_VipCardOrders_Details'));
    }
  }
</script>

<style scoped>
  .table {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .table table {
    width: 1094px;
  }

  .table table td {
    border: 1px solid #ccc;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
  }

  .table table td.tr-title {
    width: 250px;
    text-align: right;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .table table td.tr-value {
    text-align: left;
    box-sizing: border-box;
    padding: 0 10px;
  }
</style>
