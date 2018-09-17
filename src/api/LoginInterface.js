const path = require('path');
import BaseModule from "./BaseModule";

class LoginInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }

  sendWxBindVerifyCode(data = {}) {
    return this.post('/bind/open/sendWxBindVerifyCode', data)
  }
  bindPhoneNum(data = {}) {
    return this.post('/bind/open/bindPhoneNum', data)
  }
}
export default new LoginInterface()
