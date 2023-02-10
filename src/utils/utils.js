/* 请求参数合并 */
export function mergeParams(object) {
  let url = '?'

  for (let i = 0; i < Object.keys(object).length; i += 1) {
    if (object[Object.keys(object)[i]] !== '' && object[Object.keys(object)[i]] !== null && object[Object.keys(object)[i]] !== undefined) {
      url += `${Object.keys(object)[i]}=${object[Object.keys(object)[i]]}&`
    }
  }

  url = url.slice(0, url.length - 1)

  return url
}

/* 解析url中get形式?拼接的参数 */
export const parsingParams = (params) => {
  let obj = {}
  const par = params.slice(1).split('&')
  for (let i = 0; i < par.length; i += 1) {
    obj = Object.assign({}, obj, { [par[i].split('=')[0]]: par[i].split('=')[1] })
  }
  return obj
}

/* 数据过滤 */
export const filterParams = data => {
  const obj = {}
  if (data) {
    Object.keys(data).forEach(key => {
      if (data[key] !== 'undefined' && data[key] !== '' && data[key] !== null && data[key] !== 0 && JSON.stringify(data[key]) !== '{}' && JSON.stringify(data[key]) !== '[]') {
        obj[key] = typeof data[key] === 'string' ? data[key].trim() : data[key]
      }
    })
    return obj
  }
  return data
}

/* 获取随机长度字符串 */
export const randomString = (len) => {
  const lenth = len || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = chars.length
  let random = ''
  for (let i = 0; i < lenth; i += 1) {
    random += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return 'a' + random
}

/* 截取文件类型 */
export const getSuffix = (filename) => {
  const pos = filename.indexOf('.')
  if (pos !== -1) {
    return filename.substring(pos)
  }
  return false
}

// 获取页面title
export function getPageTitle(pageTitle) {
  const title = 'HARVARD ManageMenter'

  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${title}`
}

// 获取字节数
export function getStringlenth(str) {
  var len = 0
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i)
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len
}

//list 是已有的数据，search 是模糊搜索的关键字
export const fuzzySearch = (list, search) => {
  let data = null;
  if (list.length != 0 && search) {
    let str = `\S*${search}\S*`;
    let reg = new RegExp(str, 'i');//不区分大小写
    list.map(item => {
      if (reg.test(JSON.stringify(item))) {
        data = item
      }
    })
  }
  return data;
}

/** vite的特殊性, 需要处理图片 */
export const require = (imgPath) => {
  try {
    const handlePath = imgPath.replace('@', '..');
    // https://vitejs.cn/guide/assets.html#the-public-directory
    return new URL(handlePath, import.meta.url).href;
  } catch (error) {
    console.warn(error);
  }
};



