import BaseModule from "./BaseModule";

class ExchangeInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }

  // 兑换积分
  scoreExchange(data = {}){
    return this.post(`/exchange/scoreExchange`, data)
  }
}

export default new ExchangeInterface()
