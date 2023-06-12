/*
 * @Author: Y
 * @Date: 2022-11-22
 * @Description:
 */
/**
 * @description:
 * 判断对象为空
 */
export const isEmpty = (obj) => {
  return Reflect.ownKeys(obj).length === 0
}

/**
 * @description: 将字符串中汉字视为 2 字符, 字母视为 1 字符
 */
export const gblen = (str) => {
  // 1汉字=2字符，1字母=1字符
  var len = 0
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      len += 2
    } else {
      len++
    }
  }
  return len
}

// 数组嵌套展开
export const arr = [
  [
    [1, 2],
    [1, 2, 3, 'a']
  ],
  [1, 2, 'b']
].flat(Infinity)

// 数组
