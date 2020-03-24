// import API from '@/api/api'
import axios from 'axios'
// import vm from './main';
// 创建axios实例
const service = axios.create()
let axiosCount = 0;

// function changeGlobalLoading(flag) {
// 	if(flag) {
// 		vm.$Spin.show()
// 	} else {
// 		vm.$Spin.hide();
// 	}
// }

// 添加请求拦截器
service.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	// if(axiosCount == 0) changeGlobalLoading(true)
	// axiosCount+=1;
	return config;
}, function (error) {
	// 对请求错误做些什么
	// axiosCount-=1;
	// if(axiosCount == 0) changeGlobalLoading(false)
	return Promise.reject(error);
});

// response 拦截器
service.interceptors.response.use(
	(response) => {
		const { data, status, url } = response
		// Spin.hide() // 不建议开启，因为界面不友好
		axiosCount-=1;
		if(axiosCount == 0) changeGlobalLoading(false)
		return {
			data,
			status
		}
	},
	(error) => {
		// Spin.hide() // 不建议开启，因为界面不友好
		axiosCount-=1;
		if(axiosCount == 0) changeGlobalLoading(false)
		return Promise.reject(error)
	}
)
export default {
	//get请求
	get(url, param = {}) {
		return new Promise((resolve, reject) => {
			service({
				method: 'get',
				url,
				params: param,
			})
				.then((res) => {
					if (!res.data) {
						resolve(res)
						return
					}
					if (res.status == 200 || res.data instanceof Array) {
						resolve(res)
					} else {
						reject(res)
					}
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	//post请求
	post(url, param = {}, headers = {}) {
		return new Promise((resolve, reject) => {
			service({
				method: 'post',
				url,
				data: param,
				headers
			})
				.then((res) => {
					if ((res.status == 200 && res.data) || (res.status == 200 && res.data == null)) {
						resolve(res)
					} else {
						Message.error(res.data.msg || '错误')
						reject(res)
					}
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
}
