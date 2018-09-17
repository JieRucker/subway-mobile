const path = require('path');
import BaseModule from "./BaseModule";

class MainInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }

  // 测试专用
  test(data = {}) {
    return this.get(`../../static/server/test.json`, data)
  }

  // 获取uploadId
  createUploadId(data = {}) {
    return this.post(`/common/createUploadId`, data)
  }

  // 获取所有省份信息
  listProvinceAndCity() {
    return this.post(`/user/listProvinceAndCity`)
  }

  subway(data = {}) {
    return this.get(path.resolve(__dirname, '../../../static/server/subway.json'), data)
  }

  qrcode(data = {}) {
    return this.get(path.resolve(__dirname, '../../../static/server/qrcode.json'), data)
  }

  memberList(data = {}) {
    return this.get(path.resolve(__dirname, '../../../static/server/memberList.json'), data)
  }

  rankList(data = {}) {
    return this.get(path.resolve(__dirname, '../../../static/server/rankList.json'), data)
  }

  //首页撤销
  revokeOperate(data = {}) {
    return this.post('/userScore/revocation', data)
  }

  //兑换记录撤销
  revokeExchange(data = {}) {
    return this.post('/exchange/revocation', data)
  }

  //首页页面
  listUserScoreOperate(data = {}) {
    return this.post('/userScore/listUserScoreOperate', data)
  }

  //兑换记录页面
  listUserDbPageExchangeResult(data = {}) {
    return this.post('/exchange/listUserDbPageExchangeResult', data)
  }

  //发送验证码[需要登陆]
  sendWxUnbindVerifyCode(data = {}) {
    return this.post('/bind/sendWxUnbindVerifyCode', data)
  }
  //更换手机号码
  unbindPhoneNum(data = {}) {
    return this.post('/bind/unbindPhoneNum', data)
  }
}

export default new MainInterface()
