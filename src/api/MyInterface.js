const path = require('path');
import BaseModule from "./BaseModule";

class MyInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }


  getUser(data = {}) {
    return this.post('/user/getUser', data)
  }
}
export default new MyInterface()
