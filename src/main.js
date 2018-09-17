// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick';
import api from '@/api/server';
import wyboot from '@/libs/wyboot';
import store from './vuex/index.js';
import VueClipboard from 'vue-clipboard2';
import DatetimePlugin from './plugin/datetime/index.js';
import {Loading, ConfirmPlugin, AlertPlugin, LoadingPlugin, ToastPlugin} from 'vux'
import VueDB from "@/libs/vue-db/vue-db-long";


// plugin
[ConfirmPlugin, AlertPlugin, LoadingPlugin, ToastPlugin, DatetimePlugin, VueClipboard].forEach(item => {
  Vue.use(item)
});
Vue.component('x-loading', Loading);

Vue.use(VueLazyload);

Vue.prototype.$api = api;
Vue.prototype.$Global = wyboot;
Vue.prototype.$VueDB = new VueDB();

// 点击延迟
FastClick.attach(document.body);

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  loading: '',
  attempt: 1
});

router.beforeEach((to, from, next) => {
  store.commit('nowStatus', 'loading');
  next();
});

router.afterEach((to, from, next) => {
  store.commit('nowStatus', 'end');

  setTimeout(() => {
    store.commit('nowStatus', 'hide')
  }, 900);

  setTimeout(() => {
    store.commit('nowStatus', 'normal')
  }, 1000)

});


Vue.config.productionTip = false;

// hack for active mobile
document.addEventListener("touchstart", function () {
}, true);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});


