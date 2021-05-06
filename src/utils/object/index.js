// ? 对象方法

// * 1. 过滤对象中无意义的值
export function filterParams(params = {}) {
  const _params = JSON.parse(JSON.stringify(params))
  for (let k in _params) {
    if (!_params[k] || _params[k] === '') {
      delete _params[k]
    }
  }
  return _params
}

// * 2. 对象的深拷贝
export function deepCopyObj(params = {}) {
  return JSON.parse(JSON.stringify(params))
}

// * 3. 对象