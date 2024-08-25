import Res from '@/composables/utils/request'

export const useUserStore = defineStore('user', () => {
  const id = ref(0)
  const name = ref('')
  const userInfo = ref({})

  // 不需要权限的路由
  const noAuthlist = ref(['404'])

  // {label, key, icon, children, component, actions}
  const menu = computed(() => {
    return userInfo.value.menu || []
  })

  // {path, label, key, icon, children, component, actions}
  const menuFlat = computed(() => {
    const flat = (arr: any, path: string = '') => {
      if (
        Array.isArray(arr) ||
        (arr && typeof arr === 'object' && 'value' in arr && Array.isArray(arr.value))
      ) {
        const targetArr = Array.isArray(arr) ? arr : arr.value
        return targetArr.reduce((acc, curr) => {
          const clone = JSON.parse(JSON.stringify(curr))
          delete clone.children
          clone.path = path ? `${path}-${clone.key}` : clone.key
          acc.push(clone)
          if (curr.children) {
            acc.push(...flat(curr.children, clone.path))
          }
          return acc
        }, [])
      }
      return []
    }
    console.log('menu.value', flat(menu.value))
    return flat(menu.value)
  })

  // 异步拉取用户信息
  const checkUserInfo = async () => {
    const res = (await request.get('/user/info')) as Res
    id.value = res.data.id
    name.value = res.data.name
    userInfo.value = res.data
  }

  // 比对是否有权限
  const checkAuth = (path: string) => {
    if (noAuthlist.value.includes(path)) {
      return true
    }
    console.log('menuFlat.value', path, menuFlat.value)
    return menuFlat.value.some((item) => item.path === path)
  }
  return { userInfo, checkUserInfo, menu, menuFlat, checkAuth }
})
