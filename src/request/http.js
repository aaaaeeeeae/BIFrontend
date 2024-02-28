// 全局管理请求
import axios from "axios";
import Vue from 'vue';
import requestCode from "../const/requestCode";
import router from "../router";

// axios默认不带cookie，让其带上，不然每次session值都不一样
axios.defaults.withCredentials = true;
const base_url = 'http://localhost:8081/api';

const service = axios.create({
    baseURL: base_url,
    // AI分析得慢，稍微设置大点
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// response 拦截器
// 可以在接口响应后统一处理结果
service.interceptors.response.use(
    // 请求成功但后端处理失败
    response => {
        const data = response.data;
        // 未登录直接跳转到登陆页面
        if (data.code === requestCode.NOT_LOGIN) {
            router.push('/login');
            Vue.prototype.$messageService.errorMessage(data.message);
            return Promise.reject(data);
        } else if (data.code !== requestCode.SUCCESS) {
            // 其他类型失败暂时直接打印结果
            Vue.prototype.$messageService.errorMessage(data.message);
            return Promise.reject(data);
        } else {
            return data.data;
        }
    },
    // 请求失败(状态码不为200)
    error => {
        Vue.prototype.$messageService.errorMessage(error.message);
        // 返回一个 Promise.reject()，确保错误继续向外传递
        return Promise.reject(error);
    }
)


export default service;