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

export function formatTime(date, fmt = 'yyyy-MM-dd') {
  if (!date) {
    return ''
  } else if (typeof date === 'number') {
    date = new Date(date)
  }
  const formatObj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return fmt.replace(/(y|M|d|H|m|s|a)+/g, (result, key) => {
    const value = formatObj[key]
    if (key === 'a' && value !== 0) return ['一', '二', '三', '四', '五', '六'][value - 1]
    if (key === 'a' && value === 0) return ['日'][value]
    return result.length > 0 && value < 10 ? '0' + value : String(value)
  })
}
