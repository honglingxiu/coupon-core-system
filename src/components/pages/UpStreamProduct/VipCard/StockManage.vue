<!-- 库存管理 -->
<template>
  <div class="stock">
    <div class="pageTitleWrap">
      <page-address></page-address>
      <div class="backBtn">
        <span class='halfCircular' @click='HandleBack'>返回上一页</span>
      </div>
    </div>
    <div class="pageContentWrap">
      <div class="pageContentWrap-title">
        <div class="title-content">
          <div class="title-msg">
            <div>产品编码：{{ stock.productCode }}</div>
            <div class="mL40">产品名称：{{ stock.productName }}</div>
            <div class="mL40">库存数量：{{ stock.productName }}</div>
            <div class="mL40" v-if="stock.productName">库存预警值：{{ stock.productName }}</div>
            <div class="mL40" v-else>库存预警值：未设置</div>
          </div>
          <el-button size="mini" type='primary' @click='addStockWarningDialog = true'>设置库存预警值</el-button>
          <el-button size="mini" type='primary' @click='addStockDialog = true'>添加库存</el-button>
        </div>
      </div>
      <div class="mT20">
        <i-table :list="tableLists" :columns="columns" :operates="operates" :total="totalCount"
                 @handlePageChange="handlePageChange"></i-table>
      </div>
    </div>

    <!-- 添加库存弹框 - 开始 -->
    <el-dialog title="添加库存" :visible.sync="addStockDialog" width="30%" center :close-on-click-modal="false"
               :close-on-press-escape="false" @close="handleAddStockDiaClose">
      <el-row class="mB20">
        <el-col :span="5">产品编码：</el-col>
        <el-col :span="19">{{ stock.productCode }}</el-col>
      </el-row>
      <el-row class="mB20">
        <el-col :span="5">产品名称：</el-col>
        <el-col :span="19">{{ stock.productName }}</el-col>
      </el-row>
      <el-row class="mB20">
        <el-col :span="5">卡密有效期：</el-col>
        <el-col :span="19">
          <el-date-picker type="date" placeholder="选择有效日期" v-model="activeTime" value-format="yyyy-MM-dd"
                          :picker-options="pickerOptions"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="mB20">
        <el-col :span="5">卡密数据文件：</el-col>
        <el-col :span="19">
          <el-upload ref="upload" :action="uploadFileUrl" :file-list="uploadfileList" :data="uploadObj"
                     accept=".xls,.xlsx" :auto-upload="false" :on-success="handleUploadSuccess"
                     :on-error="handleUploadError" :limit='1'>
            <el-button size="small" type="success">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">
              请按
              <el-button type="text" size='mini' @click="handleDownLoad">卡密文件模板</el-button>
              编辑要上传的文件
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
	    			<el-button @click="addStockDialog = false">取 消</el-button>
	    			<el-button type="primary" @click="HandleAddStock">确 定</el-button>
	  			</span>
    </el-dialog>
    <!-- 添加库存弹框 - 结束 -->

    <!-- 设置库存预警值弹框 - 开始 -->
    <el-dialog :title="stockWarningTitle" :visible.sync="addStockWarningDialog" width="22%" @close="HandleDiaFormClose">
      <el-form :model="stockWarningDiaForm" ref="stockWarningDiaForm" @close="handleStockWarningDiaClose" :inline="true"
               :disabled="diaForm.flag123">
        <el-form-item label="是否开启预警：" class='CustomerRecharge f-right'>
          <el-checkbox label="开启" v-model="stockWarningDiaForm.flag123"></el-checkbox>
        </el-form-item>
        <el-form-item label="当库存数量低于：" class='CustomerRecharge f-right'>
          <el-input v-model="stockWarningDiaForm.stockNum123" size="mini" placeholder="预警值一"></el-input>
          <el-input v-model="stockWarningDiaForm.stockNum2123" size="mini" placeholder="预警值二（可为空）"></el-input>
          <span>进行预警</span>
        </el-form-item>
        <el-form-item class="center">
          <el-button size="small" @click="handleStockWarningDiaClose">取 消</el-button>
          <el-button size="small" type="primary" @click="HandleSettingWarningStockLine">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 设置库存预警值弹框 - 结束 -->

    <!-- 导出未用库存弹框 - 开始 -->
    <!-- <el-dialog title="导出库存" :visible.sync="exportStockDialog" width="30%" center :close-on-click-modal="false" :close-on-press-escape="false" @close="exportStock.exportNum = ''">
              <el-row class="mB20">
                    <el-col :span="4">产品编码：</el-col>
                    <el-col :span="20">{{ stock.productCode }}</el-col>
              </el-row>
              <el-row class="mB20">
                    <el-col :span="4">产品名称：</el-col>
                    <el-col :span="20">{{ stock.productName }}</el-col>
              </el-row>
              <el-row class="mB20">
                    <el-col :span="4">库存批次号：</el-col>
                    <el-col :span="20">{{ exportStock.batchNum }}</el-col>
              </el-row>
              <el-row class="mB20">
                    <el-col :span="4">可用数量：</el-col>
                    <el-col :span="20">{{ surplusNum }}</el-col>
              </el-row>
              <el-row>
                    <el-col :span="4">导出数量：</el-col>
                    <el-col :span="20">
                        <el-input type="number" size="mini" v-model.number="exportStock.exportNum" class="w150"></el-input>
                    </el-col>
              </el-row>
              <span slot="footer" class="dialog-footer">
                              <el-button @click="exportStockDialog = false">取 消</el-button>
                              <el-button type="primary" @click="HandleExport">确 定</el-button>
                            </span>
          </el-dialog> -->
    <!-- 导出未用库存弹框 - 结束 -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stock: {},
        tableLists: [],
        totalCount: 0,
        columns: [
          {
            prop: 'batchNum',
            label: '批次号'
          },
          {
            prop: 'importNum',
            label: '导入数量'
          },
          {
            prop: 'surplusNum',
            label: '可用数量'
          },
          {
            prop: 'soldNum',
            label: '已售数量'
          },
          {
            prop: 'exportNum',
            label: '导出数量'
          },
          {
            prop: 'invalidNum',
            label: '作废数量'
          },
          {
            prop: 'activeTime',
            label: '卡密有效期'
          },
          {
            prop: 'importTime',
            label: '导入时间'
          }
        ],
        operates: {
          minwidth: 100,
          list: [
            /*{
                            label: '导出未用库存',
                            callback: (row) => {
                                   this.exportStockDialog = true;
                                   this.exportStock.batchNum = row.batchNum;
                                   this.surplusNum = row.surplusNum;
                               }
                        },*/
            {
              label: '作废未用库存',
              callback: (row) => {
                this.HandleUnused(row)
              }
            }
          ]
        },

        /*===添加库存===*/
        addStockDialog: false,
        addStockWarningDialog: false,//库存预警对话框
        uploadFileUrl: this.URL_PREFIX + this.URL.UpStreamProduct.VipCard.addStock,
        activeTime: '',
        uploadfileList: [],
        uploadObj: {},
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        stockWarningDiaForm:{//预警库存表单
          flag123:false,
          stockNum123:852,
          stockNum2123:900
        }
        /*===导出未用库存===*/
        /*exportStockDialog: false,
                surplusNum: '',	//	可用数量
                exportStock: {
                    batchNum: '',	//	库存批次号
                    exportNum: '',	//	导出数量
                }*/
      }
    },
    computed: {
      stockWarningTitle() {
        return `设置（{stock.productName}）库存预警值`;
      }
    },

    created() {
      this.stock = JSON.parse(window.sessionStorage.getItem('JB_VipCard_Stock'));
      this.HandleGetStock();
    },

    methods: {
      //	返回上一页
      HandleBack() {
        this.$router.push("/VipCard");
      },

      //	获取库存列表
      HandleGetStock(index, size) {
        const self = this;
        let url = self.URL.UpStreamProduct.VipCard.getStock;
        let obj = {
          supplierNum: self.stock.supplierNum,
          productCode: self.stock.productCode,
          pageIndex: index || 1,
          pageSize: size || 10,
        }
        self.API.GetEntity(url, obj)
          .then((res) => {
            self.tableLists = res.data.data;
            self.totalCount = res.data.totalCount;
          })
      },

      //	页码/页面条数改变时
      handlePageChange(pagination) {
        let pageIndex = (pagination.Pcurrent - 1) * pagination.Psizes + 1;
        let pageSize = pagination.Psizes;
        this.HandleGetStock(pageIndex, pageSize);
      },

      //	添加库存 - 上传文件成功
      handleUploadSuccess(response, file, fileList) {
        this.$loading().close();
        this.addStockDialog = false;
        this.HandleGetStock();
      },

      //	添加库存 - 上传文件失败
      handleUploadError() {
        this.$loading().close();
        this.$message.error('上传失败，请稍后重试！');
        this.addStockDialog = false;
      },

      //	确定添加库存
      HandleAddStock() {
        const self = this;
        if (self.activeTime === '') {
          self.$message.error('请选择卡密有效期');
          return;
        } else if (self.$refs.upload.uploadFiles.length === 0) {
          self.$message.error('请选择要上传的文件');
          return;
        }
        let time = '';
        if (JSON.parse(window.sessionStorage.getItem('Coupon_Login'))) {
          time = JSON.parse(window.sessionStorage.getItem('Coupon_Login'))['userSessionTime'];
        } else {
          time = '';
        }
        let obj = {
          supplierNum: self.stock.supplierNum,
          productCode: self.stock.productCode,
          productName: self.stock.productName,
          activeTime: self.activeTime + ' 23:59:59',
          userSessionTime: time
        }
        self.uploadObj.param = JSON.stringify(obj);
        self.$loading({
          text: '上传中，请稍后',
          spinner: 'el-icon-loading',
          fullscreen: true
        })
        self.$refs.upload.submit();
      },

      //	添加库存 - 关闭对话框，重置条件
      handleAddStockDiaClose() {
        this.activeTime = '';
        this.$refs.upload.uploadFiles = [];
      },
      checkStockWarningDiaForm(){
        if(this.stockWarningDiaForm.warningLine123==""||this.stockWarningDiaForm.stockNum123<0||this.stockWarningDiaForm.stockNum123>this.stock.stockNum){//stockNum为总的库存
          throw "预警库存需大于0且小于总库存";
        }
        if(this.stockWarningDiaForm.stockNum2123!=""&&(this.stockWarningDiaForm.stockNum2123<0||this.stockWarningDiaForm.stockNum2123>this.stock.stockNum)){
          //warningLineTwo123 为非必填项
          throw "预警库存需大于0且小于总库存";
        }
        return true;
      },
      HandleSettingWarningStockLine(){
        try{
          if(this.checkStockWarningDiaForm()){
            this.$confirm('您确定新增该预警金额？', '确认提示', {
              distinguishCancelAndClose: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            })
              .then(() => {
                this.updateStockWarningLine();
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
      updateStockWarningLine(){
        //真正更新库存预警的请求
      },

      //	下载上传模板
      handleDownLoad() {
        let url = this.URL_PREFIX + this.URL.UpStreamProduct.VipCard.exportTemplate;
        window.open(url, '_blank');
      },

      //	导出未用库存
      /*HandleExport () {
                const self = this;
                if (String(self.exportStock.exportNum).includes('.')) {
                    self.$message.error('请输入整数');
                    return;
                } else if (self.exportStock.exportNum > self.exportStock.popAvailableQua) {
                    self.$message.error('导出数量不能大于可用数量');
                    return;
                }
                let url = self.URL.UpStreamProduct.VipCard.exportStock;
                let obj = {
                    productCode: self.stock.productCode,
                    productName: self.stock.productName
                }
                let _obj = Object.assign(obj, self.exportStock);
                self.API.PostEntity(url, _obj)
                .then((res) => {
                    window.open(res.data, '_blank');
                    self.exportStockDialog = false;
                    self.HandleGetStock();
                })
            },*/

      //	作废该批次库存
      HandleUnused(row) {
        const self = this;
        self.$confirm('您确定要作废该批次库存？', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          let url = self.URL.UpStreamProduct.VipCard.invalidStock;
          let entity = {
            productCode: self.stock.productCode,
            batchNum: row.batchNum,
          };
          self.API.PostEntity(url, entity)
            .then((res) => {
              self.HandleGetStock();
            })
        }).catch(() => {
          //	取消/关闭按钮
        });
      },
      handleStockWarningDiaClose() {
        this.$refs.stockWarningDiaForm.resetFields();
      }
    }
  }
</script>

<style scoped>
  .title-content {
    display: flex;
    justify-content: space-between;
  }

  .title-msg {
    display: flex;
    line-height: 28px;
  }

  .w150 {
    width: 150px;
  }
</style>
