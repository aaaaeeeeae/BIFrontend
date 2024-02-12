// 全局管理请求
import axios from "axios";
import Vue from 'vue';
import requestCode from "../const/requestCode";
import router from "../router";

const base_url = 'http://localhost:8081/api';

const service = axios.create({
    baseURL: base_url,
    timeout: 5000,
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
            return data;
        }
    },
    // 请求失败(状态码不为200)
    error => {
        Vue.prototype.$messageService.errorMessage(error.message);
        // if (error.response) {
        //     const status = error.response.status;
        //     if (status === 401) {
        //         alert('请登录后操作')
        //         localStorage.clear();
        //         router.push('/');
        //     } else if (status === 408) {
        //         alert('登录过期重新登录')
        //         localStorage.clear();//删除过期的token
        //         console.error('登录过期重新登录')
        //         router.push('/');

        //     } else {
        //         console.error(`请求错误，状态码：${status}`, error.message);
        //     }
        // } else {
        //     console.error('请求失败，未收到响应:', error.message);
        // }

        // // 返回一个 Promise.reject()，确保错误继续向外传递
        return Promise.reject(error);
    }
)


export default service;