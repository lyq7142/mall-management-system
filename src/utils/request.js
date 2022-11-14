import axios from 'axios'

// 创建axios实例
const http = axios.create({
    // 通用请求地址，前缀
    baseURL:'/api',
    timeout: 10000,   //请求超时时间
})

//添加请求拦截器
http.interceptors.request.use(function(config){
    //发送请求前做什么
    return config;
},function(error){
    return Promise.reject(error);
});

//添加响应拦截器
http.interceptors.response.use(function(response){
    //对响应数据做什么
    return response;
},function(error){
    return Promise.reject(error);
});

export default http
