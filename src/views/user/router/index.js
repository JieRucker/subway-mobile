import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

Router.prototype.openPage = function(link, query) {
  this.push({
    path: link,
    query: _.assignIn({
      time: new Date().getTime()
    }, query || {})
  })
};

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    redirect: '/userInfo'
  },
    {
      path: '/IntegralRecord',
      name: 'IntegralRecord',
      component: resolve => require(['@/views/user/page/IntegralRecord/IntegralRecord.vue'], resolve),
      meta: {
        title: '积分记录'
      },
    },
    {
      path: '/ExchangeRecord',
      name: 'ExchangeRecord',
      component: resolve => require(['@/views/user/page/ExchangeRecord/ExchangeRecord.vue'], resolve),
      meta: {
        title: '兑换记录'
      },
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: resolve => require(['@/views/user/page/userInfo/userInfo.vue'], resolve),
      meta: {
        title: '员工信息'
      },
    },
    {
      path: '/SwitchProject',
      name: 'SwitchProject',
      component: resolve => require(['@/views/user/page/SwitchProject/SwitchProject.vue'], resolve),
      meta: {
        title: '切换项目'
      },
    }
  ]
})
