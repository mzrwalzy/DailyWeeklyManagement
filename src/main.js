import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import vuex from 'vuex'
import moment from 'moment'; //导入模块
import echarts from 'echarts'

// import { Button, Aside, Container, Header, Main, Menu, MenuItem, MenuItemGroup, Submenu } from 'element-ui';

let token = ''

axios.defaults.baseURL = 'http://127.0.0.1:5000/'
axios.defaults.headers.common['token'] = token

axios.interceptors.request.use(
  config => {
    let user = JSON.parse(window.localStorage.getItem('access-user'));
    if (user) {
      token = user.access_token;
    }
    config.headers.common['token'] = token;
    //console.dir(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
  if (response.data && response.data.code) {
    if (parseInt(response.data.code) === 4001 || response.data.msg === 'token验证失败') {
      //未登录
      response.data.msg = "登录信息已失效，请重新登录";
      ElementUI.Message({
        message: response.data.msg,
        type: "error",
      });
      window.localStorage.setItem('access-user', null)
      router.push('/');
    }
    if (parseInt(response.data.code) === -1) {
      // road.$message.error("请求失败");
    }
  }
  return response;
}, function (error) {
  // Do something with response error
  console.dir(error);
  road.$message.error("服务器连接失败");
  return Promise.reject(error);
})

moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
Vue.prototype.$moment = moment;//赋值使用
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.use(vuex)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
