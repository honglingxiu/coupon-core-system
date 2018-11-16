// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

//	引入normalize-css，初始化整个HTML的样式
require('normalize-css');

//	引入element-ui及样式文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//	引入icon文件
import icon from './assets/CouponIcon/iconfont.css'
Vue.use(icon);

//	引入公共组件 - 页面地址
import PageAddress from './components/common/PageAddress/PageAddress.js';
Vue.use(PageAddress);

//	引入公共组件 - 分页表格
import ITable from './components/common/TablePagination/iTable.js';
Vue.use(ITable);

//	引入自定义公共API方法
import Api from './api/CommonApi.js';
Vue.use(Api);

//	引入接口文件
import Url from './api/CommonUrl.js';
Vue.use(Url);

//	引入侧边栏
import Sliders from './api/SliderBarLists.js';
Vue.use(Sliders);

Vue.config.productionTip = false;

//	引入公共css样式
import CSS from '../static/css/app.css'
Vue.use(CSS);

//	接口基地址
//http://192.168.218.123:8088/Junbo.CCSP.Api是洋洋机器地址
//	现网开发
//Vue.prototype.URL_PREFIX = process.env.NODE_ENV === 'development' ? "http://192.168.218.123:8088/Junbo.CCSP.Api" : "http://test-ccsp.kaquan001.com";
//Vue.prototype.URL_PREFIX = process.env.NODE_ENV === 'development' ? "http://192.168.218.123:8088/Junbo.CCSP.Api" : "http://testccsp.kaquan001.com";
Vue.prototype.URL_PREFIX = process.env.NODE_ENV === 'development' ? "http://192.168.218.123:8088/Junbo.CCSP.Api" : "http://ccsp.kaquan001.com";
//Vue.prototype.URL_PREFIX = process.env.NODE_ENV === 'development' ? "http://testccsp.kaquan001.com" : "http://ccsp.kaquan001.com";

// VKC服务基地址
//Vue.prototype.VKC_URL = "http://192.168.218.227:8081/ServiceProxy.aspx";
//Vue.prototype.VKC_URL = "http://transfer.liulianglf.com/ServiceProxy.aspx";//线上
//http://test-transfer.liulianglf.com/ServiceProxy.aspx 测试
//Vue.prototype.VKC_URL = process.env.NODE_ENV === 'development' ? "http://192.168.218.227:8081/ServiceProxy.aspx" : "http://test-transfer.liulianglf.com/ServiceProxy.aspx";
Vue.prototype.VKC_URL = process.env.NODE_ENV === 'development' ? "http://192.168.218.227:8081/ServiceProxy.aspx" : "http://transfer.liulianglf.com/ServiceProxy.aspx";

/* eslint-disable no-new */
window.VM = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
