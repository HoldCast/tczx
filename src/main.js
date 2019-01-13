import Vue from 'vue';
import Qs from 'qs';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import 'iview/dist/styles/iview.css';
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill";

// http request 拦截器（所有发送的请求都要从这儿过一次）
axios.defaults.baseURL='/api'; //生产环境再做判断和修改
axios.interceptors.request.use(
    config => {
        const Token = localStorage.getItem("token"); //获取存储在本地的token
        // config.data = qs.stringify(config.data);
        // console.log(config.data)
        // config.headers = {
        //     'Content-Type': 'application/x-www-form-urlencoded', //参数格式设置
        // };
        if (Token) {
            config.headers.token = Token; //携带权限参数
        }
        config.headers.imei = '000000000000000';
        config.headers.appId = 'tczxjtoa';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// http response 拦截器（所有接收到的请求都要从这儿过一次）
axios.interceptors.response.use(
    response => {
        let token = response.headers.token;
        if(token){
            localStorage.setItem("token",token);
        }
        let data = response.data;
        let code = data.code;
        if (code.indexOf('C0') != -1){
            alert(JSON.stringify(data));
        }
        return response.data;
    },
    error => {
        return Promise.reject(error)
    }
);

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
Vue.prototype.$qs = Qs;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');