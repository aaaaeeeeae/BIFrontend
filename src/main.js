import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入通知和提示组件
import message from './config/message.js';
import notification from './config/notification.js';

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 全局注册通知和提示组件
Vue.prototype.$messageService = message;
Vue.prototype.$noticeService = notification;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
