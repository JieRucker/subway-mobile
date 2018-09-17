class WxConfig {
  constructor() {
  }

  init(data = {}) {
    wx.config({
      debug: false, // 开启调试模式
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名，见附录1
      jsApiList: [ // 必填，需要使用的JS接口列表
        'checkJsApi',
        'scanQRCode',
        'chooseImage',
        'uploadImage',
        'downloadImage'
      ]
    });

    // config信息验证失败会执行error函数
    wx.error((res) => {
      alert("errorMSG：" + res);
    });

    /*wx.ready(function() {
      wx.checkJsApi({
        jsApiList : ['scanQRCode'],
        success : function(res) {

        }
      });

      //点击按钮扫描二维码
      document.querySelector('#scanQRCode').onclick = function() {
        wx.scanQRCode({
          needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType : [ "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success : function(res) {
            let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
          }
        });
      };

    });*/
  }
}

export default new WxConfig()
