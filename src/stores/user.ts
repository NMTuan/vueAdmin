import Res from '@/composables/utils/request'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const userInfo = ref({})
  const id = ref(0)
  const name = ref('')
  const token = ref('')
  if (localStorage.getItem('vueAdminToken')) {
    token.value = localStorage.getItem('vueAdminToken') as string
  }

  // 不需要权限的路由
  const noAuthlist = ref(['login', '404'])

  // {label, key, icon, children, component, actions}
  const menu = computed(() => {
    return userInfo.value.menu || []
  })

  // {path, label, key, icon, children, component, actions}
  const menuFlat = computed(() => {
    const flat = (arr: any, name: string = '') => {
      if (
        Array.isArray(arr) ||
        (arr && typeof arr === 'object' && 'value' in arr && Array.isArray(arr.value))
      ) {
        const targetArr = Array.isArray(arr) ? arr : arr.value
        return targetArr.reduce((acc, curr) => {
          const clone = JSON.parse(JSON.stringify(curr))
          delete clone.children
          clone.name = name ? `${name}-${clone.key}` : clone.key
          acc.push(clone)
          if (curr.children) {
            acc.push(...flat(curr.children, clone.name))
          }
          return acc
        }, [])
      }
      return []
    }
    console.log('menu.value', flat(menu.value))
    return flat(menu.value)
  })

  // 登录
  const login = async (formData: any) => {
    const res = (await request.post('/user/login', formData, {
      headers: {
        useToken: false
      }
    })) as Res
    if (res.code !== 200) {
      return
    }
    id.value = res.data.user.id
    name.value = res.data.user.name
    token.value = res.data.token
    localStorage.setItem('vueAdminToken', token.value)
    if (token.value) {
      const res = await checkUserInfo(false)
      if (res.code !== 200) {
        return
      }
      router.push('/')
    }
  }

  // 异步拉取用户信息
  const checkUserInfo = async (mute: boolean = true) => {
    if (!token.value) {
      return false
    }
    return new Promise((resolve, reject) => {
      request
        .get(
          '/user/info',
          {},
          {
            headers: {
              mute: mute
            }
          }
        )
        .then((res) => {
          userInfo.value = res.data
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 比对是否有权限
  const checkAuth = (path: string) => {
    if (noAuthlist.value.includes(path)) {
      return true
    }
    console.log('menuFlat.value', path, menuFlat.value)
    return menuFlat.value.some((item) => item.name === path)
  }
  return {
    userInfo,
    menu,
    menuFlat,
    login,
    checkAuth,
    checkUserInfo
  }
})
