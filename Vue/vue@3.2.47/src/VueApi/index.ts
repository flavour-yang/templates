export const myProxy = () => {
  const person = {
    name: '张三'
  }

  const proxy = new Proxy(person, {
    get: (target: { [k: string]: any }, propKey: string) => {
      if (propKey in target) {
        console.log({ target })
        return target[propKey]
      } else {
        throw new ReferenceError('Prop name "' + propKey + '" does not exist.')
      }
    },
    set: function (obj, prop: string, value) {
      console.log({ obj, prop, value })
      // 对于满足条件的 age 属性以及其他属性，直接保存
      obj[prop] = value
      return true
    }
  })
  proxy.name = '李四'
  console.log({ 'proxy.name': proxy.name })
}
