// ! request: 采用axios
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal, Message } from 'view-design';

import { urls, cookies, local } from '@/config';
import { localGet } from '@/utils';
import router from '@/router';

// const baseURL = urls.getUrlByEnv('dev');

const baseURL = urls.getUrlByEnv('test');

// ? GET
export function getRequest(config) {
  // get请求实例
  const instance = axios.create({
    baseURL,
    timeout: 10000
  });
  // get请求-请求拦截器--拦截请求错误
  instance.interceptors.request.use(config => {
    const token = Cookies.get(cookies.TOKEN);
    // console.log(token)
    const { url } = config;
    if (url.indexOf('pub') === -1) { // ? 权限路径需要判断token和路由
      if (token && localGet(local.HOME_MENUS)) {
        config.headers.token = token;
        return config;
      } else {
        Modal.error({
          title: '提示',
          content: '您的用户信息已过期, 请重新登录'
        });
        router.replace('/user/login');
        setTimeout(() => {
          location.reload();
        }, 800);
        return config;
      }
    } else { // ? 非权限路径不需要判断
      return config;
    }
  }, error => {
    Message.error('服务器繁忙, 请稍后重试');
    return Promise.reject(error);
  });
  // get请求-响应拦截器--拦截响应错误
  instance.interceptors.response.use(res => {
    const { data } = res;
    if (data.msg === 'token无效，请重新登录！') {
      Modal.error({
        title: '提示',
        content: '您的用户信息已过期, 请重新登录'
      });
      Cookies.remove('token');
      router.replace('/user/login');
      setTimeout(() => {
        location.reload();
      }, 800);
    }
    return res.data;
  }, error => {
    // console.warn(error, config);
    Message.error('服务器繁忙, 请稍后重试');
    return Promise.reject(error);
  });
  return instance(config);
}

// ? POST
export function postRequest(url, data = {}) {
  const token = Cookies.get(cookies.TOKEN);
  if (token && token !== '') {
    return new Promise((resolve, reject) => {
      return axios({
        method: 'POST',
        url: `${baseURL}${url}`,
        data,
        headers: {
          token
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          Message.error('服务器繁忙, 请稍后重试');
          reject(err);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      axios.post(baseURL + url, data)
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          Message.error('服务器繁忙, 请稍后重试');
          reject(error);
        });
    });
  }
}
// ? POST-Qn
export function postQn(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        Message.error('服务器繁忙, 请稍后重试');
        reject(error);
      });
  });
  // const token = Cookies.get(cookies.TOKEN)
  // if (token) {
  //   return axios({
  //     method: 'POST',
  //     url: `${baseURL}${url}`,
  //     data,
  //     headers: {
  //       token
  //     }
  //   })
  // }
}

// ? PUT
export function putRequest(url, data = {}) {
  const token = Cookies.get(cookies.TOKEN);
  if (token && token !== '') {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `${baseURL}${url}`,
        data,
        headers: {
          token
        }
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          Message.error('服务器繁忙, 请稍后重试');
          reject(err);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `${baseURL}${url}`,
        data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          Message.error('服务器繁忙, 请稍后重试');
          reject(err);
        });
    });
  }
  // return new Promise((resolve, reject) => {
  //   axios.put(baseURL + url, data)
  //     .then(result => {
  //       resolve(result.data)
  //     })
  //     .catch(error => {
  //       reject(error)
  //     })
  // })
}

// ? DELETE
export function deleteRequest(config) {
  // delete
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    method: 'delete',
  });
  // ! get请求-请求拦截器--拦截请求错误
  instance.interceptors.request.use(config => {
    const token = Cookies.get(cookies.TOKEN);
    if (token) {
      config.headers.token = token;
      return config;
    } else {
      return config;
    }
  }, error => {
    Message.error('服务器繁忙, 请稍后重试');
    return Promise.reject(error);
  });
  // ! get请求-响应拦截器--拦截响应错误
  instance.interceptors.response.use(result => {
    return result.data;
  }, error => {
    Message.error('服务器繁忙, 请稍后重试');
    return Promise.reject(error);
  });
  return instance(config);
}