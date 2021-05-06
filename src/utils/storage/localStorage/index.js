/**
 * @description
 * * 将数据保存到本地缓存中
 */
export function localSave(key = '', value) {
  if (key !== '' && JSON.stringify(value) !== '') {
    localStorage.setItem(key, JSON.stringify(value));
    console.log('存储数据成功');
  } else {
    console.log('本地存储失败, key / value 不得为空');
  }
}

/**
 * @description 
 * * 获取本地缓存中的数据
 */
export function localSet(key = '', initValue = {}) {
  if (key !== '' && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    console.log('暂无内容');
    return initValue;
    // return []
  }
}

export function localRemove(key = '') {
  if (key !== '') {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }
}

// ? 判断是否存在本地字段数据
export function localGet(key = '') {
  if (key !== '') {
    if (localStorage.getItem(key)) {
      return true
    }
  }
  return false
}