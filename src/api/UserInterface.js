import BaseModule from "./BaseModule";

class UserInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }

  // 获取Weixin JsApi 参数
  createJsapiSignature(data = {}) {
    return this.post(`/wx/createJsapiSignature`, data)
  }

  // 查询所有组
  listGroup(data = {}) {
    return this.post(`/user/listGroup`, data)
  }

  // 添加员工
  saveUser(data = {}) {
    return this.post(`/user/saveUser`, data)
  }

  // 查询所有规则信息(分页)
  listRule(data = {}) {
    return this.post(`/userScore/listUserScoreRule`, data)
  }

  // 加减分提交
  operateScore(data = {}) {
    return this.post(`/userScore/operateScore`, data)
  }

  // 查询工号
  getUserByLoginName(data = {}) {
    return this.post(`/user/getUserByLoginName`, data)
  }

  // 查询员工
  getUser(data = {}) {
    return this.post(`/user/getUser`, data)
  }
  // 查询员工
  getOpenUser(data = {}) {
    return this.post(`/open/getUser`, data)
  }

  //普通员工的积分记录页面
  listUserScoreOperate(data = {}) {
    return this.post('/open/listUserScoreOperate', data)
  }

  //普通员工的兑换记录页面
  listUserDbPageExchangeResult(data = {}) {
    return this.post('/open/listUserDbPageExchangeResult', data)
  }

  //切换项目页面
  getUserProjectList(data = {}) {
    return this.post(`/user/getUserProjectList`, data)
  }

  //切换项目页面确认切换
  updateUser(data = {}) {
    return this.post(`/user/updateUser`, data)
  }



  //普通员工切换项目页面
  getOpenUserProjectList(data = {}) {
    return this.post(`/open/getUserProjectList`, data)
  }


}

export default new UserInterface()
