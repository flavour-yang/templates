export const access: string[] = ['page.button1', 'page.button2']

export const vPermission = {
  mounted(el, binding) {
    const { value } = binding
    const hasPermission = access.includes(value) // 根据传入的权限值检查用户是否有权限
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el) // 如果没有权限，则从DOM中移除该元素
    }
  }
}
