import queryString from 'query-string'

/**
 * 将请求参数转换为x-www-form-urlencoded格式
 * 如{ a: 1, b:2 }转为 'a=1&b=2'
 * @param {object} obj 
 * @returns string
 */
export function formatFormParams(obj) {
  if(!obj) {
    return ''
  }
  let s = ''
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const val = obj[key]
      s += `${key}=${val}&`
    }
  }
  if(s.endsWith('&')) s = s.slice(0, s.length - 1)
  return s
}

/**
 * 获取url上特定的参数值，如没传key，则默认返回所有参数组成的对象
 * @param {string} key 参数名
 * @returns {string|undefined|object}
 */	
export const getUrlQuery = (key) => {
  const query = queryString.parse(location.href.split('?')[1] || '')
  if(!key) {
    return query
  }
  if(typeof key !== 'string') {
    console.error('key must be a string')
    return
  }
  return query[key]
}
