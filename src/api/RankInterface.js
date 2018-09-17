const path = require('path');
import BaseModule from "./BaseModule";

class RankInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }


  listUserByScore(data = {}) {
    return this.post('/rank/listUserByScore', data)
  }
}
export default new RankInterface()
