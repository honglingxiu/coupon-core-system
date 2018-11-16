import Vue from 'vue';

export default {
  install(Vue, options) {
    Vue.prototype.API = this;
    /*VKC*/
  },
  VkcServer: null,

  //	获取VKC中转服务，需要引入JunBoUI.min.js和JQuery.min.js
  GetVkcServer() {
    if (!this.VkcServer) {
      var servicePara = {
        key: "jbfly",
        containKey: true,
        defExt: "",
        url: VM.VKC_URL
      };
      if (window['jc']) {
        this.VkcServer = window['jc'].createService(servicePara);
      }
    }
    return this.VkcServer;
  },

  //	VKC POST请求
  VkcPost(Url, Entity) {
    return new Promise((resolve, reject) => {
      let PostUrl = VM.URL_PREFIX + Url;
      this.GetVkcServer().ajax(PostUrl, Entity)
        .done(res => {
          if (res.Code === 100) {
            resolve(res.Result);
          } else {
            reject({Code: res.Code, Msg: res.Msg})
          }
        })
    });
  },

  /**
   * 获取页面实体 (VKC加解密)
   * @param {string} Url    请求地址
   * @param {object} Entity 请求给后台的实体
   */
  GetEntity(Url, Entity) {
    let _timeObj = {}
    if (window.sessionStorage.getItem('Coupon_Login')) {
      _timeObj.userSessionTime = JSON.parse(window.sessionStorage.getItem('Coupon_Login'))['userSessionTime'];
    } else {
      _timeObj.userSessionTime = '';
    }
    let _obj = Object.assign(_timeObj, Entity);
    return new Promise((resolve, reject) => {
      this.VkcPost(Url, _obj)
        .then((res) => {
          if (res.code === '0') {
            resolve(res);
          } else if (res.code === '2031') {
            VM.$message.error(res.msg);
            VM.$router.push('/Login');
          } else {
            VM.$message.error(res.msg);
          }
        })
        .catch((msg) => {
          VM.$message.error('服务器错误，错误代码：' + msg.Code + '，错误信息：' + msg.Msg);
        })
    })
  },

  /**
   * 获取页面实体 (不走VKC加解密)
   * @param {string} Url    请求地址
   * @param {object} Entity 请求给后台的实体
   */
  FetchEntity(Url, Entity) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: VM.URL_PREFIX + Url,
        type: 'POST',
        dataType: 'json',
        data: Entity,
      })
        .done(function (res) {
          if (res.code === '0') {
            resolve(res);
          } else if (res.code === '2031') {
            VM.$message.error(res.msg);
            VM.$router.push('/Login');
          } else {
            VM.$message.error(res.msg);
          }
        })
        .fail(function (msg) {
          VM.$message.error(msg);
        });
    })
  },

  /**
   * 发送页面实体
   * @param {string} Url    请求地址
   * @param {object} Entity 请求给后台的实体
   * 跟GetEntity方法的区别在于$loading的使用，GetEntity没有
   */
  PostEntity(Url, Entity) {
    VM.$loading({fullscreen: true});
    let _timeObj = {}
    if (window.sessionStorage.getItem('Coupon_Login')) {
      _timeObj.userSessionTime = JSON.parse(window.sessionStorage.getItem('Coupon_Login'))['userSessionTime'];
    } else {
      _timeObj.userSessionTime = '';
    }
    let _obj = Object.assign(_timeObj, Entity);
    return new Promise((resolve, reject) => {
      this.VkcPost(Url, _obj)
        .then((res) => {
          VM.$loading().close();
          if (res.code === '0') {
            resolve(res);
          } else if (res.code === '2031') {
            VM.$message.error(res.msg);
            VM.$router.push('/Login');
          } else if(res.code === '2029'){
            resolve(res);//2029是重新发送失败的状态码
          }
          else {
            VM.$message.error(res.msg);
            resolve(res);
          }
        })
        .catch((msg) => {
          VM.$loading().close();
          VM.$message.error('服务器错误，错误代码：' + msg.Code + '，错误信息：' + msg.Msg);
        })
    })
  },

  /**
   * 获取当前时间前N天的日期字符串
   * @param  {number} n 当前时间的前N天，0表示当天
   * @return {string}   返回当前时间前N天的日期字符串，格式为“YYYY-MM-dd”
   */
  getBeforeDate(n) {
    let today = new Date();
    today.setDate(today.getDate() - n);
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
  },
}
