import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

Router.prototype.openPage = function (link, query) {
  this.push({
    path: link,
    query: _.assignIn({
      time: new Date().getTime()
    }, query || {})
  })
};

Vue.use(Router);

export default new Router({
  routes: [
    // {
    // path: '/',
    // redirect: '/wxIndex'
    // },
    {
      path: '/wxIndex',
      name: 'wxIndex',
      component: resolve => require(['@/views/wxIndex/wxIndex.vue'], resolve),
      meta: {
        title: '首页',
        mainPage: true
      },
    },
    {
      path: '/blank',
      name: 'blank',
      component: resolve => require(['@/views/Blank/Blank.vue'], resolve),
      meta: {
        title: ''
      },
    },
    {
      path: '/wxBind',
      name: 'wxBind',
      component: resolve => require(['@/views/wxBind/wxBind.vue'], resolve),
      meta: {
        title: '绑定手机号码'
      },
    },
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require(['@/views/Login/Login.vue'], resolve),
      meta: {
        title: 'login'
      },
    },
    {
      path: '/Operate',
      name: 'Operate',
      component: resolve => require(['@/views/Operate/Operate.vue'], resolve),
      meta: {
        title: '加减'
      },
    },
    {
      path: '/Rank',
      name: 'Rank',
      component: resolve => require(['@/views/Rank/Rank.vue'], resolve),
      meta: {
        title: '排名'
      },
    },
    {
      path: '/My',
      name: 'My',
      component: resolve => require(['@/views/My/My.vue'], resolve),
      meta: {
        title: '我的'
      },
    },
    {
      path: '/SearchMember',
      name: 'SearchMember',
      component: resolve => require(['@/views/SearchMember/SearchMember.vue'], resolve),
      meta: {
        title: '搜索员工'
      },
    },
    {
      path: '/MyData',
      name: 'MyData',
      component: resolve => require(['@/views/MyData/MyData.vue'], resolve),
      meta: {
        title: '我的资料'
      },
    },
    {
      path: '/MyRelease',
      name: 'MyRelease',
      component: resolve => require(['@/views/MyRelease/MyRelease.vue'], resolve),
      meta: {
        title: '我的发布'
      },
    },
    {
      path: '/SetRules',
      name: 'SetRules',
      component: resolve => require(['@/views/SetRules/SetRules.vue'], resolve),
      meta: {
        title: '设置规则'
      },
    },
    {
        path: '/IndexExchange',
        name: 'IndexExchange',
        component: resolve => require(['@/views/IndexExchange/IndexExchange.vue'], resolve),
        meta: {
            title: '兑换与查询'
        },
    },
    {
      path: '/AllExchange',
      name: 'AllExchange',
      component: resolve => require(['@/views/AllExchange/AllExchange.vue'], resolve),
      meta: {
        title: '兑换记录'
      },
    },
    {
      path: '/Exchange',
      name: 'Exchange',
      component: resolve => require(['@/views/Exchange/Exchange.vue'], resolve),
      meta: {
        title: '兑换记录'
      },
    },
    {
      path: '/PhoneNumber',
      name: 'PhoneNumber',
      component: resolve => require(['@/views/PhoneNumber/PhoneNumber.vue'], resolve),
      meta: {
        title: '手机号码'
      },
    },
    {
      path: '/ChangePhoneNumber',
      name: 'ChangePhoneNumber',
      component: resolve => require(['@/views/ChangePhoneNumber/ChangePhoneNumber.vue'], resolve),
      meta: {
        title: '更换手机号码'
      },
    },
    {
      path: '/AddStaff',
      name: 'AddStaff',
      component: resolve => require(['@/views/AddStaff/AddStaff.vue'], resolve),
      meta: {
        title: '添加员工'
      },
    },
    {
      path: '/IntegralExchange',
      name: 'IntegralExchange',
      component: resolve => require(['@/views/IntegralExchange/IntegralExchange.vue'], resolve),
      meta: {
        title: '积分兑换'
      },
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: resolve => require(['@/views/userInfo/userInfo.vue'], resolve),
      meta: {
        title: '员工信息'
      },
    },
    {
      path: '/SwitchProject',
      name: 'SwitchProject',
      component: resolve => require(['@/views/SwitchProject/SwitchProject.vue'], resolve),
      meta: {
        title: '切换项目'
      },
    },
  ]
})
